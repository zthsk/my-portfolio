import assert from "node:assert/strict";
import {execFileSync, spawnSync} from "node:child_process";
import {readFileSync, readdirSync} from "node:fs";
import {fileURLToPath} from "node:url";
import path from "node:path";
import test from "node:test";
import {GOATCOUNTER_ENDPOINT, GOATCOUNTER_SCRIPT_URL} from "../src/lib/analytics.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const configUrl = new URL("../next.config.mjs", import.meta.url).href;

function readSecurityConfig(environment) {
    const script = `
        import config from ${JSON.stringify(configUrl)};
        console.log(JSON.stringify({
            poweredByHeader: config.poweredByHeader,
            rules: await config.headers(),
        }));
    `;
    const output = execFileSync(process.execPath, ["--input-type=module", "-e", script], {
        cwd: root,
        encoding: "utf8",
        env: {...process.env, NODE_ENV: environment},
    });
    const config = JSON.parse(output);
    const rule = config.rules.find(({source}) => source === "/(.*)");
    assert.ok(rule, "Security headers must apply to every route.");
    const headers = new Map(rule.headers.map(({key, value}) => [key.toLowerCase(), value]));
    const directives = new Map(headers.get("content-security-policy").split(";").map((directive) => {
        const [name, ...sources] = directive.trim().split(/\s+/);
        return [name, sources];
    }));
    return {config, headers, directives};
}

test("production blocks inline event handlers, eval, plugins, and injected base URLs", () => {
    const {config, headers, directives} = readSecurityConfig("production");
    assert.equal(config.poweredByHeader, false);
    assert.deepEqual(directives.get("default-src"), ["'self'"]);
    assert.deepEqual(directives.get("script-src-attr"), ["'none'"]);
    assert.deepEqual(directives.get("object-src"), ["'none'"]);
    assert.deepEqual(directives.get("base-uri"), ["'none'"]);
    assert.ok(!directives.get("script-src").includes("'unsafe-eval'"));
    assert.deepEqual(directives.get("script-src"), ["'self'", "'unsafe-inline'", GOATCOUNTER_SCRIPT_URL]);
    assert.deepEqual(directives.get("connect-src"), ["'self'", GOATCOUNTER_ENDPOINT]);
    assert.deepEqual(directives.get("img-src"), ["'self'", "data:", "blob:"]);
    assert.equal(headers.get("x-content-type-options"), "nosniff");
});

test("anti-framing and outbound restrictions retain the Giscus exception", () => {
    const {headers, directives} = readSecurityConfig("production");
    assert.deepEqual(directives.get("frame-ancestors"), ["'none'"]);
    assert.equal(headers.get("x-frame-options"), "DENY");
    assert.deepEqual(directives.get("frame-src"), ["'self'", "https://giscus.app"]);
    assert.deepEqual(directives.get("form-action"), ["'self'"]);
    assert.equal(headers.get("referrer-policy"), "strict-origin-when-cross-origin");
    assert.equal(headers.get("cross-origin-opener-policy"), "same-origin");
    assert.equal(headers.get("cross-origin-resource-policy"), "same-origin");
    assert.match(headers.get("strict-transport-security"), /max-age=63072000/);
    for (const feature of ["camera", "microphone", "geolocation", "payment", "usb"]) {
        assert.ok(headers.get("permissions-policy").includes(`${feature}=()`));
    }
});

test("development keeps only the additional script and connection permissions it needs", () => {
    const {directives} = readSecurityConfig("development");
    assert.ok(directives.get("script-src").includes("'unsafe-eval'"));
    assert.deepEqual(directives.get("connect-src"), ["'self'", GOATCOUNTER_ENDPOINT, "ws:", "wss:"]);
    assert.deepEqual(directives.get("script-src-attr"), ["'none'"]);
    assert.deepEqual(directives.get("base-uri"), ["'none'"]);
});

test("Git ignores environment secrets but permits sanitized examples", () => {
    const secrets = [".env", ".env.production", ".env.development", ".env.local", ".env.production.local", "nested/.env"];
    const output = execFileSync("git", ["check-ignore", "--no-index", "--", ...secrets], {
        cwd: root,
        encoding: "utf8",
    });
    assert.deepEqual(output.trim().split("\n").sort(), [...secrets].sort());
    const examples = spawnSync("git", ["check-ignore", "--no-index", "--", ".env.example", ".env.production.example"], {
        cwd: root,
        encoding: "utf8",
    });
    assert.equal(examples.status, 1, examples.stderr);
    assert.equal(examples.stdout, "");
});

test("the discussion allowlist rejects unrelated and lookalike origins", () => {
    const config = JSON.parse(readFileSync(path.join(root, "giscus.json"), "utf8"));
    const allowed = (origin) => config.origins.includes(origin)
        || config.originsRegex.some((pattern) => new RegExp(pattern).test(origin));
    for (const origin of ["https://kshitiztiwari.com", "https://www.kshitiztiwari.com", "http://localhost:3017", "http://127.0.0.1:3017"]) {
        assert.equal(allowed(origin), true, origin);
    }
    for (const origin of ["https://example.com", "https://kshitiztiwari.com.example.com", "http://localhost.example.com", "http://127.0.0.1.example.com", "http://localhost:3017@example.com"]) {
        assert.equal(allowed(origin), false, origin);
    }
});

test("the public directory contains no environment files or Git metadata", () => {
    function inspect(directory) {
        for (const entry of readdirSync(directory, {withFileTypes: true})) {
            assert.ok(!/^\.env(?:\.|$)/.test(entry.name), `Environment file in public: ${entry.name}`);
            assert.notEqual(entry.name, ".git", "Git metadata must never be publicly served.");
            if (entry.isDirectory()) inspect(path.join(directory, entry.name));
        }
    }
    inspect(path.join(root, "public"));
});
