# PARK Filtration

Next.js website based on the supplied PARK Nonwoven filtration presentation, with a visual direction inspired by the existing Park Geosynthetics website.

## Run locally

```powershell
cd C:\Users\lenovo\OneDrive\Documents\GitHub\park-filtration
npm install
npm run dev
```

Open http://localhost:3000. For a production build, run `npm run build`, then `npm start`.

## Content

- `lib/products.ts`: 13 products and 5 industries.
- `components/Home.tsx`: homepage sections.
- `app/globals.css`: responsive styling.
- `public/images`: images extracted from the supplied presentation, with optimized WebP variants.
- `reference/park-filtration-products.pptx`: internal reference only; not publicly served.

The enquiry form opens the visitor's email app with a prepared message addressed to sales@parknonwoven.com, as listed on the main PARK website. It does not submit to a server or store enquiries. A mail service would be needed for direct website submissions.

Product specifications were summarized from the presentation. Repeated HEPA specifications on the swimming pool slide were excluded pending confirmation. Review technical claims and asset rights before publication. No deployment has been made.

Hero photograph: https://images.unsplash.com/photo-1448375240586-882707db888b (Unsplash). Product imagery is from the supplied presentation.

## Product content and buyer experience

The internal extraction retains all 36 source slides, 499 text runs and 411 readable paragraphs, including the SmartArt diagram text. All 56 original media files are available under `public/catalogue-media`; JPEG XR images have browser-compatible WebP previews. Speaker-note text, duplicated entries and the three external references on the last slide are retained. `catalogue-audit.json` records the source hash and extraction checks.

- `/catalogue`: redirects to `/products`; presentation slides are not displayed to customers.
- `/products`: industry/material/grade search, comparison of up to three product families and a downloadable shortlist.
- `/products/[slug]`: definitions, operation, benefits, variants, full applications, technical options, selection considerations, FAQs, a contextual quote form.
- `/filtration-media`: the materials, technologies, enhancements and three performance parameters described in slide 30.
- `/resources/filter-selection`: product differences and a practical enquiry/specification checklist.
- Homepage: source-product visuals, interactive industry/application finder, performance-parameter explorer and access to the product range.

The finder returns a catalogue shortlist, not a confirmed technical recommendation. The quote forms prepare an email in the visitor's mail app; they do not submit to a server or store an enquiry. Prices, delivery promises, certifications, reviews and checkout have not been invented. Pool specifications, copied bag/cartridge descriptions and catalogue efficiency claims retain explicit clarification.

Source text can be regenerated and checked with:

```powershell
python scripts/extract-catalogue.py
python scripts/audit-catalogue.py
npm run build
npm run start -- --port 3030
node sales-experience-check.cjs
```

The browser check verifies the full original paragraph/notes content in the rendered DOM, search, product discovery, comparison, shortlist download, explained product routes, variants, enquiry-field handling, mobile widths and the preserved click-only navigation. Use `TEST_ORIGIN` for another local server origin.

Fonts are served locally from `public/fonts` with their OFL licences. Configure the approved `NEXT_PUBLIC_SITE_URL` before deployment: canonicals, sitemap and entity/page schema use that origin. No production domain has been assumed and no deployment or live Search Console check is part of this local implementation.

## Catalogue navigation and SEO configuration

Both navigation menus include all five catalogue industries and their application groups. Automobiles and Railways have separate product sets; two-wheelers show engine filters. Industry pages provide crawlable application sections without creating duplicate thin pages.

Product pages include catalogue variants, technical options, related products, descriptive metadata and breadcrumbs. Specifications are catalogue ranges, not independently certified performance claims. The swimming-pool slide repeats HEPA text; those specifications remain excluded. Industry catalogue ranges are shown as candidate options requiring system-specific confirmation.

Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS production origin before building. Canonicals, Organization/WebSite/Breadcrumb schema and sitemap URLs use this origin. Until it is set, absolute URLs and schema are omitted and the sitemap is empty rather than identifying an invented domain. See `.env.example`.

The supplied PPT contains no video. An optional accessible video section is supported through `NEXT_PUBLIC_FILTRATION_VIDEO` and `NEXT_PUBLIC_FILTRATION_CAPTIONS`. Add the approved MP4 and matching captions to `public/videos` and configure those paths before building. The section remains hidden until a video is supplied; it does not download third-party footage.

Run `node catalogue-check.cjs` against the production server on port 3010, or set `TEST_ORIGIN` to another local origin. It checks every application group in both menus on desktop/mobile, vehicle filtering, detail routes, metadata, images, overflow and status codes.


## Interactive product studio and banner film

All 13 product pages retain their original product photo and offer an on-demand Three.js model with rotation, zoom, layer separation and reset controls. Models are illustrative, photo-informed geometry, not CAD drawings or confirmed assembly dimensions. Browsers without WebGL receive the original photo. Reduced-motion preferences disable automatic rotation.

The homepage uses quiet sunlight-and-forest footage for the fresh-air brand theme. Source: [Sunlight through Trees in Forest](https://www.pexels.com/video/sunlight-through-trees-in-forest-11265968/) by Ozgur Surmeli under the [Pexels license](https://www.pexels.com/license/). The earlier factory video has been replaced. This is contextual imagery, not a filter-performance demonstration. The locally optimized clip is 1600 x 900 at 25 fps and half speed. Provenance is retained in `reference/banner-footage.json`.

The previous procedural animation script is retained for offline illustration work; it does not generate the active homepage footage. Test the product studio using `node product-motion-check.cjs` against the local production server on port 3030, or set TEST_ORIGIN.


## Site motion

`SiteMotion` observes content across the homepage, product and industry pages, media library and buyer guide. Short upward reveals run once per visit, with capped delays for neighbouring cards. Client navigation resets observation and new filter results are detected automatically. Content is visible in the server HTML and remains available without JavaScript. Reduced-motion preferences prevent reveals and cancel active motion. A slim progress indicator, restrained card and arrow hover effects, menu fades and expandable-content transitions complete the interaction style.

Run `node site-motion-check.cjs` against the local production preview to verify scroll triggers, client navigation, dynamic filters, mobile layout and motion/accessibility fallbacks.

The nonwoven media section uses a large sticky desktop stage. Actual scroll position draws the material, technology and enhancement rings in sequence; reverse scrolling reverses the drawing. Pause freezes the drawing. Mobile uses normal document flow with drawing tied to the diagram's viewport position. Reduced-motion and JavaScript-free views show the complete diagram without pinning. Run `node media-scroll-check.cjs` against port 3030 to verify forward/reverse drawing, viewport fit, all 14 selections and accessibility fallbacks.

## Buyer content and industrial visual direction

The homepage includes the “Cleaner flow. Stronger performance.” proposition, four interactive application stories, catalogue-derived range counts, buying-guide cards and a visible buyer FAQ. The original product catalogue, comparison, enquiry and scroll-controlled media diagram remain available. `app/industrial.css` adds navy, teal, lime and amber accents with responsive layouts and reduced-motion support.

`lib/buyer-resources.ts` contains three catalogue-based guides for air-filtration stages, industrial bag versus cartridge assemblies, and liquid bag selection. `/resources` provides their hub; relevant product pages link to their guides. No unsupported company metrics, certification, price, testimonial or performance guarantees are added. See [SEO-PLAN.md](SEO-PLAN.md) for page topics, implemented work and production/measurement requirements. Run `node buyer-experience-check.cjs` against the local preview to check discovery, resource routes, metadata, product links and responsive layouts.
