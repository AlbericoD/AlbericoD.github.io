# Measuring acquisition and installations

## Current implementation

Official installer links preserve `Channel=website`, `utm_source=albericod_github_pages`, `utm_medium=owned_site` and each existing `utm_campaign`. See [installer identifiers](direct-download-links.md).

No GA4 property, tracking ID, external analytics service or consent configuration is supplied. **This release does not collect page views or download clicks.** `site.js` only dispatches local browser events for a future measurement adapter; nothing is stored or transmitted. Do not describe analytics as active.

## Event contract

An adapter can listen for `site:conversion` on `window`. Its `detail` contains:

| Field | Meaning |
| --- | --- |
| `event` | `download_click` or `store_click` |
| `app_slug` | Product route slug |
| `placement` | `hero`, `app-list`, `facts`, `final`, `guide`, `guide-intro` or `guide-final` |
| `page_path` | Landing/content path without query string |
| `link_url` | Official destination, including its existing attribution |

The hook never prevents navigation or rewrites URLs. A configured adapter should transmit without delaying the installer navigation and avoid duplicate automatic/custom outbound events. Add the same adapter once on every page. Do not put credentials in the site; a GA4 Measurement ID is public configuration.

## Reporting plan

1. Verify `https://albericod.github.io/` in Google Search Console and Bing Webmaster Tools, using the actual account-issued verification value. Submit `/sitemap.xml`.
2. Export Google impressions, clicks, queries and landing pages weekly. Separate app-name searches from problem queries and group guides with their parent app.
3. Once a measurement service is configured, record `page_view` with normal source/referrer attribution and the conversion event above. Segment organic search and identifiable ChatGPT/Perplexity referrals. Referrers can be missing; an unrecognized visit is not proof of no LLM traffic.
4. In the Overwolf Developer Console, inspect installs attributed to this site's source, medium, campaign and channel. Confirm which dimensions and install definitions are available in the actual report before building a dashboard.
5. Compare weekly installer clicks with attributed installs by app. Use consistent date ranges and allow for reporting delay. Do not assume a person-level join or exact channel attribution after the installer redirect.

## Outcomes, not just traffic

- **Leading indicators:** impressions, query coverage, organic/identifiable LLM visits, product-page engagement and installer clicks.
- **Business outcome:** Overwolf-attributed installations. The website cannot independently confirm a completed native installation.
- **Useful ratios:** installer clicks per relevant landing-page visit; attributed installs relative to installer clicks, with reporting and attribution caveats.

Keep installer campaign names stable. Website events can distinguish content pages without replacing the established Overwolf campaign. A static site plus a small reporting spreadsheet is sufficient; a backend and complex analytics stack are unnecessary.
