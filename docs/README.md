# Site maintenance

## Structure

- `index.html`: app index and developer information.
- Four product directories: feature overviews, factual limitations and official downloads.
- `deeprivals/marvel-rivals-hero-switch-recommendations/` and `economy-tool/cs2-safe-drop-calculator/`: distinct practical guides, linked from their products.
- `styles.css`: graphite/off-white palette, restrained lime accent, native system typography and responsive layouts.
- `assets/screenshots/`: real Overwolf screenshots, responsive WebP derivatives and provenance.
- `site.js`: optional conversion event hooks. It does not load an analytics service.

## Editing

Edit the HTML directly; there is no generation or build step. Keep the shared header, footer and metadata consistent across seven pages. Product information lives in visible copy, JSON-LD and `llms.txt`; update all affected representations together. Do not add dates unless content was actually changed.

Keep app and developer `@id` values stable. The developer is a `Person`, not an invented studio team. `SoftwareApplication` links each app to its game and official Overwolf listing. Never invent ratings, reviews, pricing or automatic capabilities. Visible FAQs use semantic `details`/`summary`; FAQ rich results are not part of the strategy.

For a new guide, require a distinct user problem and substantial first-party explanation. Add a parent link, canonical, description, Article/BreadcrumbList data and a sitemap entry. Avoid near-duplicate keyword pages.

## Images and performance

Keep intrinsic dimensions and accurate alt text. Use `srcset`/`sizes`, prioritize only the hero image, and lazy-load below the fold. Link to the original when showing a crop. Optimize derivatives with an image tool; no runtime image service is needed. Do not redraw product UI or darken screenshots with CSS filters.

## Before publishing

Run `git diff --check`. Serve the root over HTTP and check every page at desktop, mobile and narrow widths. Inspect screenshots, horizontal overflow, keyboard focus, FAQ toggles, downloads and all internal links. Parse JSON-LD and verify canonical, sitemap and Open Graph image paths.

Compare official installer parameters against [the download reference](direct-download-links.md). Validate endpoint redirects without executing an installer. A click is not an installation; see [measurement](measurement.md).

Preserve `.nojekyll`. GitHub Pages serves the files directly from `main`.
