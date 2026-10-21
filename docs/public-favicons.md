# Public-site favicons

The three public websites use the original brand symbol from each existing
homepage logo. Its geometry and colours are preserved; the icon artwork is
also kept as SVG source. PNG and ICO are rasterizations of that source.

- Cenlo: /favicon-96x96.png, /favicon.ico, /apple-touch-icon.png
- Food: /food/favicon-96x96.png, /food/favicon.ico, /food/apple-touch-icon.png
- Beauty: /beauty/favicon-96x96.png, /beauty/favicon.ico, /beauty/apple-touch-icon.png

The landing project also resolves the conventional root favicon and Apple icon
paths according to the hostname. All six landing pages advertise their own
brand assets in the initial HTML. The main site's Next.js metadata advertises
its public files. Do not replace these links with data URLs: search crawlers
need a stable, independently crawlable resource.

PNG icons are 96×96; Apple touch icons are 180×180. ICO contains 16, 32, 48 and
96 pixel images. Keep URLs stable for future logo updates.

Publish Food and Beauty with the complete deploy/official-lps/deployment.json
manifest, which references every existing asset and includes the new icons.
The older deploy/food-lp directory is incomplete and must not be deployed.

Checks on 2026-10-21: build and type check on the isolated VPS checkout;
actual browser inspection of the three rendered icon files at 96/48/32/16
pixels; preview HTTP type, dimensions and exact file hash verification.
Googlebot and Googlebot-Image must be allowed by robots.txt and receive the
image itself, not an HTML fallback.

Google search results update separately after recrawling the homepage and icon;
appearance is not immediate or guaranteed by Google.
https://developers.google.com/search/docs/appearance/favicon-in-search

