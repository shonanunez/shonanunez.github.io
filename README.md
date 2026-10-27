# Shóna Nunez Apps — snapps.ie

A static HTML, CSS and JavaScript site for GitHub Pages. `CNAME` sets `snapps.ie`;
`.nojekyll` serves the files as written. No build step or runtime dependencies are
needed. No deployment workflow is checked in. Confirm the remote repository’s
Pages source/branch settings before pushing: a push may trigger a deployment.

Preview with `python3 -m http.server 8000`, then open `http://localhost:8000/`.

After changing `styles.css` or `script.js`, run
`python3 scripts/version-assets.py` before committing. It puts content-based cache
keys into every page’s shared asset URLs, including nested privacy pages. GitHub
Pages serves these assets with a ten-minute cache lifetime; changing the URL
prevents a newly deployed page from using an older cached stylesheet or script.

## Pages

| URL | Content |
| --- | --- |
| `/` | Home, with a scrollable Apps showcase: Poppello 01/02 and Coming Soon 02/02 |
| `/project/` | Apps overview with Poppello and Coming Soon tabs; Poppello is selected by default |
| `/poppello/` (`/poppello/index.html`) | Dedicated Poppello page: screenshots, video, App Store and privacy links |
| `/about/` | Two-column story: approach/details, then first release/Coming soon |
| `/contact/` | Email contact options and social profiles |
| `/poppello/privacy-policy/` | Existing app privacy policy, with a link back to Poppello |

All six page introductions share the same top spacing and title baseline.
The dedicated Poppello page has a Back to Apps link. Home’s counter and arrow
controls share one toolbar, and buttons/tabs use the pink–purple–teal border.
Home and Apps use Poppello’s full title. Duplicate badges are removed, and neither
Coming Soon card links elsewhere. Both previews share a 560px minimum height on
desktop and 760px on mobile to keep their proportions consistent.

The upcoming project stays anonymous. Its warm, abstract preview is on Home and
Apps; no product name or unreleased details appear in the public copy. The
`/project/#coming-soon` URL selects the Coming Soon tab directly.

The Home showcase uses native horizontal scrolling and scroll snapping, enhanced
with buttons, arrow keys, Home/End and a polite status. Apps tabs support pointer,
Enter, arrow keys and Home/End, with proper tab/tabpanel roles and focus order.
Without JavaScript, both panels remain visible and linked, and Home still scrolls.
The full Poppello page remains ordinary crawlable HTML.

## Screenshots and asset names

All 16 gallery screenshots come from
`/Users/shonanunez/workspace/SN/SNBubble/Screenshots/Poppello-App-Store October 2026/`:
`iPhone/en-IE/01…07`, `iPad/en-IE/01…07`, and `Watch/en-IE/02-watch.png` and
`03-watch.png`. The first iPhone spread (`00-spread-01-02.png`) is the main
Poppello picture on Home, Apps and the dedicated product page, as well as the
local video poster. It is displayed in full, without cropping.

Names such as `ipad-01-480.webp` and `ipad-01-960.webp` mean:

- `ipad`: the device shown in the original artwork.
- `01`: the screenshot’s original sequence number.
- `480` / `960`: export width in pixels, not additional screenshots.

The paired WebP exports let the browser choose an appropriate image through
`srcset` and `sizes`. It normally downloads one candidate per image, rather than
both. This balances mobile download size with sharpness on larger or denser
screens. Gallery images load lazily and have descriptions, intrinsic dimensions
and links to the larger export. Native gallery scrolling also works without
JavaScript; enhancements add buttons, keyboard controls and visible status.
Motion respects the reduced-motion preference, and there is no automatic rotation.

The Watch originals are only 422px wide. Their two earlier exports were identical,
so they have been consolidated into one file per screenshot. The main spread has
480, 960 and 1440px exports. A separate 1200×630 JPEG uses contain scaling for
social sharing. Exports use quality 85 (WebP) or 88 (JPEG), without upscaling.
Original screenshot files are untouched. Image assets total roughly 1.5 MB.

## Social links and icons

Social handles come from the user’s “Set up Poppello social accounts” chat.
Poppello’s Instagram, X and YouTube destinations returned Poppello page titles.
Personal profiles and the LinkedIn company slug use the supplied handles; LinkedIn
blocks automated inspection. The corrected Facebook Apps Page is
`https://www.facebook.com/profile.php?id=61593748113016`; the personal-profile URL
is excluded. Final signed-in review remains useful for platform restrictions.

Six icons (Instagram, X, LinkedIn, YouTube, TikTok and Facebook) are rendered as
inline SVGs with unique per-page gradient IDs. This avoids depending on external
SVG symbol/gradient resolution in Safari. The original authoring sprite remains
in `assets/social-icons.svg`, but pages no longer request it. Visible text labels remain;
the decorative icons are hidden from assistive technology. Icons use the site’s
pink–purple–teal gradient; labels/arrows are white, with a gradient underline on
hover, keyboard focus and touch press rather than a permanent purple underline. The icons come from
[Bootstrap Icons v1.13.1](https://github.com/twbs/icons/tree/v1.13.1), with the MIT
license preserved in `assets/social-icons-LICENSE.txt`. No icon font, external
icon service or additional browser script is used.

## Video

The dedicated Poppello page embeds the user-selected YouTube Short
`https://www.youtube.com/shorts/YYjLGkWVrwc`. YouTube oEmbed confirms the Poppello
channel and title “Poppello: Coming Soon”. This is a **single video, not a feed**:
new uploads will not appear automatically. A future playlist/channel integration
would be a separate change.

The local poster links directly to YouTube when JavaScript is unavailable. With
JavaScript, activation creates a responsive portrait `youtube-nocookie.com`
iframe, gives it a descriptive title and moves focus to it. Playback begins only
after the visitor selects Play; there is no third-party request on page load.
A visible notice links Google’s privacy policy and explains that YouTube may
process playback/device information. Privacy-enhanced mode does not eliminate
third-party processing. The app privacy policy is linked only from the dedicated
product page, rather than from every footer.

Native MP4 remains an alternative for greater player styling control, but requires
compressed exports and uses hosting bandwidth. A managed video host/CDN is another
option for a growing library, with additional setup and possible fees. GitHub
Pages has a 1 GB published-site limit and a soft 100 GB/month bandwidth limit.
No raw sibling-project videos have been uploaded or published.

References: [YouTube embeds and privacy-enhanced mode](https://support.google.com/youtube/answer/171780?hl=en),
[YouTube player parameters](https://developers.google.com/youtube/player_parameters),
[GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

## SEO and publishing

All six pages are indexable in local source. The former `noindex, nofollow` tags
on the old app preview and privacy policy were removed. Every page has a unique
content-based title/description, HTTPS self-canonical, Open Graph sharing data,
large-image card and `en-IE` language. Navigation uses directory URLs. `/project/`
is retained as the Apps overview; the Poppello canonical and SoftwareApplication
JSON-LD now point to `/poppello/`. Poppello’s title and descriptions identify it
as a bubble-popping game, and the product page explains the actual four modes,
colour customisation and statistics in plain HTML. Mode descriptions were checked
against the app’s en-IE onboarding strings. The approved opening paragraph remains
unchanged.

The home page identifies the developer as a Person and the site as a WebSite.
The product page links WebPage, SoftwareApplication and VideoObject data with
stable IDs. The video name, publisher/channel, upload timestamp and thumbnail were
verified against YouTube’s public channel feed and oEmbed response. No ratings,
reviews, prices or unverified release claims are invented. Click-to-play remains
in place; Google does not interact with play controls, so video-search indexing
is not guaranteed by adding VideoObject data. A dedicated watch-page strategy
would be a separate choice if video search becomes a priority.

The favicon uses the same artwork at 96×96px, reducing the browser download from
251,803 to 9,631 bytes. Its public URL remains stable. For Safari compatibility, every page also declares
`favicon.ico` with 16, 32 and 48px entries, plus `apple-touch-icon.png` at 180px.
Both use the original artwork and root-relative URLs. Screenshot export sizes are
unchanged.

`robots.txt` allows crawling and references `sitemap.xml`, which lists all six
canonical URLs. Static HTML exposes app links, tabs, galleries and product copy
without JavaScript. Structured data is descriptive, with no promise of eligibility
for a Google rich result.

On 27 October 2026 the live home, old app preview and privacy pages returned
HTTP 200 without an `X-Robots-Tag` block; live `robots.txt` returned 404. Commit `ab58644` was verified live on 27 October 2026: all six pages, robots.txt,
sitemap, and all 39 shared/image assets matched the committed files. HTTPS and
alternate-host redirects worked, missing pages returned 404, and YouTube playback
worked in Chrome. A stale stylesheet in an existing Chrome session caused giant
images; a hard refresh resolved it. The subsequent content-based asset-URL fix
must be committed and pushed separately. After future deployments, check the six
pages, assets, canonical tags, sitemap and HTTP headers again. Then submit
`https://snapps.ie/sitemap.xml` in the owner’s Google Search Console property and
request indexing for Home and Poppello. Search engines control indexing/ranking.

References: [Google’s noindex guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing),
[canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls),
[sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## Validation

All six pages passed local Chrome checks at 320, 390, 768 and 1440px, including
Apps tab selection/keyboard navigation/direct links, Home carousel controls,
rendered social icons, footer cleanup, links, metadata,
image loading, screenshot carousel endpoints/keyboard controls and no-JavaScript
fallbacks. Mobile emulation has also checked native swiping, normal-motion gallery
animation and resize behavior. `node --check script.js`, XML parsing and
`git diff --check` are used for static checks.

The video launch has been tested with Enter: no third-party request before
activation, then the intended privacy-enhanced iframe receives focus. The iframe
was intercepted for that deterministic UI check; YouTube oEmbed separately
confirmed embed support. Actual playback depends on YouTube and browser/network
conditions. Physical iOS Safari and screen-reader review remain useful before
release, as do signed-in social-link and published-header checks.

The October follow-up also fixes missing gradient icons reproduced in a fresh
WebKit session: SVG paths and unique gradient definitions are now inline in the
Contact and Poppello pages. The YouTube watch link uses the same gradient icon;
Google’s privacy link is white with a tilted external arrow. Both were checked in
Chrome and WebKit at 390px and 1440px. Native Safari interaction was unavailable,
so the cross-browser checks used an isolated WebKit 26.5 test runtime.
