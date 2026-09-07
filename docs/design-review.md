# Editorial redesign review

Reviewed on September 7, 2026. Baseline: `31b905b84b355013c2332e251e22e5948142b751`.

## Direction and taste review

The design-taste-frontend skill informed both the initial direction and the final rendered review. Settings: design variance 5, motion intensity 2, visual density 3. The user’s static architecture and real-product evidence requirements take precedence over the skill’s framework and image-generation defaults.

- One graphite theme, off-white text and one restrained lime accent. Native sans-serif typography keeps the identity close to software.
- Real product imagery replaces abstract covers and decorative UI. Screenshots are not dimmed, redrawn or placed inside invented device frames.
- Four comparable editorial product entries remain deliberately consistent for scanning. Product details, FAQ disclosures and guide articles use different structures; there is no card grid or ornamental animation.
- Product/game/platform copy and official-installer context are retained where they clarify a download, even when that exceeds the skill’s generic hero text-element limit.
- Review fixes included removing redundant section labels, making the Roblox title two lines, correcting tablet headline scale, bringing guide downloads forward on mobile, and removing an unnecessary accessible-name override on the brand link.

## Rendered checks

All seven pages were inspected in Chromium at 1366 × 768, 390 × 844 and 320 × 740. Additional layout checks covered 360, 768, 820, 1024, 1440 and 1920 pixel widths. No horizontal overflow, failed image loads or page JavaScript errors were found in the final page sweep.

On 390 × 844, the four product download buttons begin approximately 407–466 pixels from the top, compared with 876–1058 pixels in the original site. All four primary product CTAs fit the first viewport at 320 × 740 as well. The homepage prioritizes choosing an app; product and guide pages prioritize installation.

Keyboard checks covered the skip link, app navigation, FAQ opening/closing and installer activation. All seven pages expose content and download links with JavaScript disabled. The optional conversion hook was checked with a mocked installer response, without running an installer.

## Technical checks

- All seven documents: one H1, canonical, description, valid JSON-LD JSON, consistent developer/game references and working internal links/fragments.
- Sitemap contains the seven canonical URLs. Robots directives continue to allow search crawlers, including OAI-SearchBot and PerplexityBot. `llms.txt` is a factual supplemental index, not a ranking mechanism.
- All four installer URLs exactly match the baseline, including their existing UTM parameters. HEAD requests returned 302 redirects to official `download.overwolf.com` installer executables.
- Local Lighthouse mobile runs scored 100 for performance, accessibility and SEO on the homepage, Roblox page and CS2 guide. LCP was 1.5 s, 1.2 s and 1.0 s respectively; CLS was 0 and TBT was 0 ms. These are lab observations, not field Core Web Vitals or a guarantee of real-user performance. The additional brand accessible-name finding was corrected and checked on the shared markup.
- No ratings or reviews were fabricated. Structured data establishes entities; it does not establish rich-result eligibility or guarantee retrieval by an LLM.

## Measurement boundary

The site preserves Overwolf attribution, but no analytics property was supplied. The browser event hook has no collector and does not record traffic or clicks. Search Console verification, a real analytics configuration and the Overwolf installation report remain account-level work. See [measurement](measurement.md).
