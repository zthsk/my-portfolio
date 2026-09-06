# Portfolio security review

Reviewed September 6, 2026 against the working tree. Verification was performed locally; production deployment was not verified as part of this review.

## Result

The dependency audit initially reported two vulnerable transitive packages: one high and one low. Both were updated within their existing major versions. The final full-tree and production-only npm audits report **zero known vulnerabilities** as of this review.

| Package | Before | After | Advisory severity | Finding |
| --- | --- | --- | --- | --- |
| `nanoid` | 3.3.16 | 3.3.18 | High | Certain custom generators can loop indefinitely with a size of zero. [GHSA-2v37-7h3g-55p8](https://github.com/advisories/GHSA-2v37-7h3g-55p8) |
| `postcss-selector-parser` | 6.1.1 | 6.1.4 | Low | Uncontrolled recursion in selector AST serialization can cause denial of service. [GHSA-w9m9-85wc-3x92](https://github.com/advisories/GHSA-w9m9-85wc-3x92) |

These severities describe the upstream packages, not demonstrated exploits against this portfolio. The installed PostCSS code uses `nanoid/non-secure` with a fixed size of 6, rather than the affected custom-generator input. The selector parser is used by Tailwind/PostCSS to process repository-controlled CSS. No visitor-supplied CSS or ID-generation endpoint was found. The packages were patched regardless. Only these two installed package versions changed during this review; the earlier Giscus dependency additions were preserved. Package lifecycle scripts were disabled during the update.

## Additional hardening

- Added `script-src-attr 'none'` to block inline HTML event handlers without breaking React's event listeners.
- Changed `base-uri` to `'none'` because the site does not use a `<base>` element. Injected base URLs can no longer redirect relative URL resolution.
- Expanded Git ignore rules to cover `.env` and `.env.*`, with explicit exceptions for sanitized example files. Ignore rules do not protect files already tracked in Git; none of the checked environment or private-key file patterns were tracked.
- Added six repeatable security regression tests and separate test/audit commands. Existing anti-framing, MIME-sniffing, referrer, permissions, opener/resource isolation, and Giscus restrictions were retained.

## Application review

- Blog slugs are restricted to lowercase letters, digits, and hyphens before accessing the filesystem. Encoded traversal paths and unknown posts were checked against the local production server and returned 404.
- Markdown is rendered through React text nodes/components rather than inserted as raw HTML. Link parsing accepts HTTP(S) or slash-prefixed paths; it does not render `javascript:` or `data:` links.
- JSON-LD output escapes `<` before insertion into script elements. The theme bootstrap is a fixed source-code string, not request-supplied content.
- The portfolio's Giscus error-message handler checks both the sender origin and the expected iframe window. The embedding allowlist rejects unrelated and lookalike origins.
- No application API routes, Server Actions, database, file-upload handler, or visitor-controlled server-side fetch endpoint were found. Next.js image optimization rejected unapproved remote and loopback image URLs with 400 responses.
- A targeted scan of current source/content/public files found no matches for the checked private-key, AWS access-key ID, GitHub token, and OpenAI key formats. This was a pattern-based working-tree check, not an exhaustive secret or Git-history audit.
- The public directory contains no environment files or Git metadata. Requests for `.env`, `.env.production`, `.git/config`, `package.json`, and the private data-file path returned 404 locally. The previously removed CV remains unavailable.

## Verification

- `npm run audit:security`: zero reported vulnerabilities across the full dependency tree.
- `npm audit --omit=dev`: zero reported vulnerabilities in the production dependency tree.
- `npm run test:security`: six tests passed.
- `npm run lint`: no warnings or errors from ESLint; Next.js emits its existing notice that `next lint` is deprecated.
- `npm run build`: succeeded, preserving static generation.
- Browser checks: all 13 public content routes loaded with the expected security headers and no observed runtime errors or accidental CSP blocks.
- Harmless browser probes confirmed that a synthetic inline click handler could not execute and an injected `<base>` could not change the document base URL. The normal theme toggle and contact link still worked.
- Comment checks passed for lazy loading, separate article threads, theme switching, mobile fit, wrong-window message rejection, provider-error fallback, and the no-JavaScript fallback link. Failure cases used a simulated provider; a real Giscus widget request also returned HTTP 200. No comments were posted and GitHub authorization was not exercised.

Browser checks were run against the local production preview at `http://127.0.0.1:3017`, not against the deployed website.

## Remaining limitations

- The CSP still permits inline script elements and inline styles for the existing statically generated Next.js application. Blocking event-handler attributes narrows the exposure but does not provide a strict nonce/hash-based script policy. A nonce-based change would require dynamic rendering and affect static/CDN caching; that architecture change was not made. See the [Next.js CSP guidance](https://nextjs.org/docs/app/guides/content-security-policy) and [script-src-attr documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/script-src-attr).
- A clean npm audit only covers advisories known to its database at the time of the scan. It is not a guarantee that the application or its dependencies have no undiscovered vulnerabilities.
- Hosting settings, deployment secrets, GitHub account/repository permissions, DNS/TLS configuration, third-party service internals, and the unused Python CV generator's installed dependencies were outside this review. No load testing, external penetration test, or authenticated comment submission was performed.
- The live site receives these fixes only after the updated code and lockfile are deployed. Giscus reads its origin allowlist from the discussion repository's default branch; local allowlist changes alone do not update that external service.

## Repeating the checks

After installing the locked dependencies, run:

```sh
npm run audit:security
npm audit --omit=dev
npm run test:security
npm run lint
npm run build
```

Start the production preview and verify the homepage, an article's comment section, and the response headers. Confirm that the theme toggle works, comments remain usable, and private/config paths return 404. Recheck the same behavior after deployment.

## GoatCounter integration follow-up — September 6, 2026

The subsequent analytics integration adds two narrowly scoped CSP exceptions: the script `https://gc.zgo.at/count.js` and collection endpoint `https://kshtz.goatcounter.com/count`. Existing image, iframe, inline-event-handler, base-URL, and other security restrictions are unchanged. This introduces a trusted third-party script on the production portfolio; the provider's infrastructure and script supply chain were not audited.

Analytics are restricted to production builds on the two exact portfolio origins. Do Not Track and Global Privacy Control disable script loading, and the provider's own opt-out/filter remains in use. Page paths exclude query strings and fragments, referrers are reduced to their HTTP(S) origin, and collection requests omit cookies and the HTTP referrer. The provider's automatically appended query field is removed before sending, so URL parameters such as Giscus sign-in values are not included. The integration does not retry blocked requests or add a public counter. No dependency was added.

Verification completed before committing the integration:

- Six analytics tests and the six updated security tests passed. Lint and the production build passed; all 19 generated pages remained static.
- A fresh full-tree dependency audit reported zero known vulnerabilities.
- Browser checks used the actual provider script with production-origin requests served from the local build. Every analytics submission was intercepted; no synthetic visits or test sign-in values were sent to the account.
- The initial view, client-side navigation, article titles, and back/forward visits were counted once each. Theme/query/fragment changes did not add visits. Navigation during delayed script loading retained the visited paths.
- Localhost, preview domains, Do Not Track, Global Privacy Control, GoatCounter opt-out, blocked scripts, and restricted storage all sent no visits while leaving navigation and theme switching functional.
- Collection requests used the intended endpoint, contained no raw query data, and omitted cookies and the HTTP referrer. The production CSP permitted the intended requests without accidental violations.
- The existing 13-route security browser checks and blog-comment regressions passed again, including a successful real Giscus widget request. No comment was posted or authenticated flow exercised.

These checks verify the integration, not receipt of a real visitor in the account dashboard. That still requires a deployed production page and an eligible live visit. Repeat `npm run test:analytics` alongside the security checks after future changes.
