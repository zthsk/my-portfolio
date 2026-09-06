import assert from "node:assert/strict";
import test from "node:test";
import {GOATCOUNTER_ENDPOINT, getPageViewUrl, getReferrerOrigin, shouldLoadAnalytics} from "../src/lib/analytics.mjs";

const production = {production: true, origin: "https://kshitiztiwari.com"};

test("analytics loads only on exact production origins in production builds", () => {
    assert.equal(shouldLoadAnalytics(production), true);
    assert.equal(shouldLoadAnalytics({...production, origin: "https://www.kshitiztiwari.com"}), true);
    assert.equal(shouldLoadAnalytics({...production, production: false}), false);
    for (const origin of ["http://127.0.0.1:3017", "http://localhost:3000", "https://preview.vercel.app", "https://kshitiztiwari.com.evil.example", "http://kshitiztiwari.com", "https://kshitiztiwari.com:444"]) {
        assert.equal(shouldLoadAnalytics({...production, origin}), false, origin);
    }
});

test("Do Not Track and Global Privacy Control prevent tracking", () => {
    assert.equal(shouldLoadAnalytics({...production, doNotTrack: "1"}), false);
    assert.equal(shouldLoadAnalytics({...production, doNotTrack: "yes"}), false);
    assert.equal(shouldLoadAnalytics({...production, globalPrivacyControl: true}), false);
    assert.equal(shouldLoadAnalytics({...production, doNotTrack: "0", globalPrivacyControl: false}), true);
});

test("referrers contain only an HTTP(S) origin, never a path, query, or fragment", () => {
    assert.equal(getReferrerOrigin("https://www.linkedin.com/in/private?token=secret#fragment"), "https://www.linkedin.com");
    for (const value of ["", "not a url", "javascript:alert(1)", "data:text/plain,secret"]) {
        assert.equal(getReferrerOrigin(value), "");
    }
});

test("page views remove query data, fragments, and unexpected provider fields", () => {
    let parameters;
    const goatcounter = {
        filter: () => false,
        url: (view) => {
            parameters = view;
            return `${GOATCOUNTER_ENDPOINT}?p=wrong&q=%3Fgiscus%3Dsecret&t=Blog&s=1440&b=0&r=https%3A%2F%2Fexample.com%2Fprivate&rnd=abc&unexpected=secret#fragment`;
        },
    };
    const url = new URL(getPageViewUrl(goatcounter, {
        path: "/blog/example?giscus=secret#comments",
        title: "Blog",
        referrer: "https://www.linkedin.com/path?token=secret",
    }));
    assert.deepEqual(parameters, {path: "/blog/example", title: "Blog", referrer: "https://www.linkedin.com"});
    assert.equal(url.searchParams.get("p"), "/blog/example");
    assert.equal(url.searchParams.get("r"), "https://www.linkedin.com");
    assert.equal(url.searchParams.get("t"), "Blog");
    assert.equal(url.searchParams.get("s"), "1440");
    assert.equal(url.searchParams.get("b"), "0");
    assert.equal(url.searchParams.has("q"), false);
    assert.equal(url.searchParams.has("unexpected"), false);
    assert.equal(url.hash, "");
    assert.ok(!url.href.includes("secret"));
});

test("the provider's opt-out and filtering decisions are preserved", () => {
    const view = {path: "/", title: "Home", referrer: ""};
    assert.equal(getPageViewUrl(undefined, view), null);
    assert.equal(getPageViewUrl({filter: () => "disabled", url: () => {throw new Error("Must not send");}}, view), null);
    assert.equal(getPageViewUrl({filter: () => false, url: () => undefined}, view), null);
});

test("only the configured collection endpoint and local paths can be used", () => {
    const view = {path: "/", title: "Home", referrer: ""};
    for (const url of ["https://evil.example/count", "https://kshtz.goatcounter.com/other", "http://kshtz.goatcounter.com/count", "https://user:password@kshtz.goatcounter.com/count"]) {
        assert.equal(getPageViewUrl({filter: () => false, url: () => url}, view), null);
    }
    for (const path of ["https://evil.example", "//evil.example"]) {
        assert.equal(getPageViewUrl({filter: () => false, url: () => GOATCOUNTER_ENDPOINT}, {...view, path}), null);
    }
});
