# Site Pizzaria — Meta tracking, 2026-10-21

## Verified diagnosis

- `cenlofood.cenlo.pt/site-pizzaria` is a reverse proxy to the Next.js `cenlo-next` project (`pedrocvm/cenlo-website`). `/shared/*` comes from the separate `cenlo-food-lp` static project. Both need the same runtime.
- Before the fix, a real browser request already contained `dl=https://cenlofood.cenlo.pt/site-pizzaria`; the OpenBridge request also contained that full `website_context.location`. The CRM outbox contained two sent PageViews for the full landing URL since October 20. The Meta stats connector returned origin-only URL buckets. It does not establish that the application sent the root URL; the reason for Meta's reporting normalization remains outside the verified application evidence.
- The inline Pixel bootstrap sent a PageView without our event ID. The CRM generated a different UUID for its copy. Meta's browser/OpenBridge auto-generated ID therefore could not deduplicate against CRM CAPI. The acquisition client also initialized the same Pixel a second time.
- The inline bootstrap and noscript image ignored preview/test exclusion.
- The form manufactured `food-contact:<submissionId>` whenever any success response lacked `leadEventId`. That could turn honeypot success, unmeasured requests or existing contacts into a browser-only Lead.
- Production CRM read-only check: zero SiteOfferRequest records, Food Pixel enabled, no last delivery error. Historic dataset Leads include other sources and cannot be attributed to this landing.

## Contract after the fix

- One PageView per landing visit, with a UUID shared by `fbq(..., {eventID})` and `food_funnel_viewed.eventId`. The existing CRM maps `site_offer` to `https://cenlofood.cenlo.pt/site-pizzaria`.
- Browser PageView uses the actual location, including the path; the code does not replace the URL with its origin. The CRM uses its existing allowlisted landing URL, excluding query strings/PII.
- CAPI remains conditional on an existing acquisition consent receipt. No consent is fabricated or silently granted. A saved request without a confirmed `leadEventId` is successful for the customer but is not counted as a Meta Lead by this client.
- Lead only after the API returns the CRM's `food-contact:<uuid>` receipt. No click, modal, validation attempt, failure, honeypot or success without that receipt emits Lead. Replays return the same receipt. The browser suppresses repeat delivery in the same tab; Meta also deduplicates by name and ID.
- No landing Pixel on non-production hosts, HTTP, `?test=1`, or a marked Food test journey. No noscript beacon that bypasses those checks.
- No campaign, ad, budget, CRM business rule, notification or landing copy/style change.

## Deployment

Deploy the Next.js project through its existing Git integration. Deploy the exact `deploy/official-lps/deployment.json` files through the Vercel API for `cenlo-food-lp`. The manifest preserves the current SEO release, routes and Beauty assets. Do not deploy the older `deploy/food-lp` directory.

The static release changes only `shared/food-acquisition.js`, `shared/food-acquisition-core.js`, and adds `shared/site-pizzaria-pixel.js`. Both project previews must pass before publication. A short cross-project transition may have mixed runtimes; publish the two tested versions together and verify the public domain, not only cenlo.pt.

## Validation

- `npm run test:site-pizzaria`: seven checks for lead validation, shared UUID, preview/local/test exclusion, per-tab Lead deduplication and visit identity.
- TypeScript and production build passed. Targeted lint has no errors (three existing image warnings).
- Intercepted browser scenarios passed for invalid form, CRM failure, success without a receipt, confirmed receipt, duplicate receipt, localhost, preview and explicit test mode. All submission and Meta traffic was mocked.
- The API is exercised against a local mock CRM: invalid body, honeypot, upstream failure, confirmed receipt, replay and no measurement receipt. No real contacts or Leads are created.
- The existing broad configurator suite has four unrelated failures concerning catalog tiers, base-module count and pricing. Those source/test files are unchanged.

A real landing Lead and Meta's final deduplication/reporting remain to be verified after an actual eligible customer submission. Do not generate a fake lead for validation.
