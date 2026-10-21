# Official Food and Beauty landing pages

This manifest preserves the exact source of the SEO release on 2026-10-21. The two domains share the cenlo-food-lp Vercel project. Do not deploy the older deploy/food-lp folder over this release.

`deployment.json` contains all deployment files. Small changed files are inline UTF-8 data. Existing unchanged assets reference the immutable SHA values already stored in the same Vercel team. These are Vercel file hashes, not Git blob hashes. Use the authenticated Vercel deployment API with this files array and the existing project. Validate a preview before publishing production.

The release adds host-specific robots.txt and sitemaps, verified Google ownership, descriptive search titles, large search previews, WebSite structured data, permanent redirects for duplicate landing URLs and noindex headers for configuration, checkout, API and demo routes. Existing routing, assets, scripts and forms are retained.

The main cenlo.pt site is the Next.js source at the repository root and deploys separately through Git integration.
