# Measuring acquisition and installations

## Current implementation

Official installer links preserve `Channel=website`, `utm_source=albericod_github_pages`, `utm_medium=owned_site` and each existing `utm_campaign`. See [installer identifiers](direct-download-links.md).

The site now sends lightweight analytics to the existing PostHog project. The public project token is client-side configuration; no private API key is embedded. Tracking is intentionally narrow:

- one manual `$pageview` per page load;
- explicit `download_click` and `store_click` events;
- no autocapture;
- no session replay;
- no surveys, product tours or web experiments;
- no user identification;
- IP capture disabled in the client configuration.

Website events carry `site_surface=albericod_github_pages` so they can be separated from the existing app analytics in the same PostHog project. Page views also include `page_path`, `page_type` (`home`, `product` or `guide`) and `app_slug` when the route belongs to an app.

## Event contract

`site.js` listens for clicks on links with `data-event` and `data-app`, dispatches the local `site:conversion` browser event, and forwards it to PostHog. Its detail contains:

| Field | Meaning |
| --- | --- |
| `event` | `download_click` or `store_click` |
| `app_slug` | Product route slug |
| `placement` | `hero`, `app-list`, `facts`, `final`, `guide`, `guide-intro` or `guide-final` |
| `page_path` | Landing/content path without query string |
| `link_url` | Official destination, including its existing attribution |

The hook never prevents navigation or rewrites URLs. It does not imply a completed installation.

## Reporting plan

1. Keep `https://albericod.github.io/` verified in Google Search Console and Bing Webmaster Tools and submit `/sitemap.xml`.
2. Export Google impressions, clicks, queries and landing pages weekly. Separate app-name searches from problem queries and group guides with their parent app.
3. In PostHog, filter website analytics with `site_surface = albericod_github_pages`. Track `$pageview`, `download_click` and `store_click`, then segment by `app_slug`, `page_path`, `page_type`, `placement`, referrer and referring domain where available.
4. Segment identifiable ChatGPT/Perplexity referrals when referrer data exists. Referrers can be missing; an unrecognized visit is not proof of no LLM traffic.
5. In the Overwolf Developer Console, inspect installs attributed to this site's source, medium, campaign and channel. Confirm which dimensions and install definitions are available in the actual report before building a dashboard.
6. Compare weekly installer clicks with attributed installs by app. Use consistent date ranges and allow for reporting delay. Do not assume a person-level join or exact channel attribution after the installer redirect.

## Suggested PostHog views

A minimal website dashboard is enough:

- `$pageview` by `page_path`;
- `$pageview` by `$referring_domain`;
- `download_click` by `app_slug`;
- `download_click` by `placement`;
- funnel: `$pageview` → `download_click`, filtered to `site_surface = albericod_github_pages`.

Because the website shares the existing PostHog project, always use the `site_surface` filter for website-specific reporting.

## Outcomes, not just traffic

- **Leading indicators:** impressions, query coverage, organic/identifiable LLM visits, product-page engagement and installer clicks.
- **Business outcome:** Overwolf-attributed installations. The website cannot independently confirm a completed native installation.
- **Useful ratios:** installer clicks per relevant landing-page visit; attributed installs relative to installer clicks, with reporting and attribution caveats.

Keep installer campaign names stable. Website events distinguish content pages without replacing the established Overwolf campaign. A static site plus PostHog and a small reporting spreadsheet is sufficient; a backend and complex analytics stack are unnecessary.
