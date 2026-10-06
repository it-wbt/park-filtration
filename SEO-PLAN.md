# PARK Filtration: content, discovery and enquiry plan

Updated: 3 October 2026. Scope: local implementation. No live ranking, traffic, Search Console, conversion or search-volume data has been provided for this filtration website.

## Customer and commercial intent

The site serves engineers, procurement teams, OEM buyers and facility operators selecting air filters, dust-collection assemblies, liquid bags and nonwoven filtration media. The enquiry needs to identify the application, fit, medium, grade, operating conditions and quantity. A visit or a long session is not evidence of a qualified lead.

The homepage introduces the range; product pages answer product-specific buying questions; industry pages provide application context; the selection guide and three focused resources explain different decisions. The application studio connects each challenge to the relevant products and guide. Existing catalogue comparison and enquiry flows remain available.

## Page ownership of topics

These topics are inferred from actual PARK catalogue products and customer questions. They are not claims of measured keyword volume, competition or ranking opportunity.

| Page | Primary customer topic | Purpose |
| --- | --- | --- |
| `/` | Industrial air and liquid filtration | Introduce range and lead to product discovery |
| `/products` | Filter range and comparison | Shortlist product families |
| `/products/panel-filter` | Pleated panel air filters | HVAC format, fit and listed options |
| `/products/pocket-filter` | Pocket filters for air handling | Extended-surface format and dimensions |
| `/products/hepa-filter` | Fine air filtration and HEPA options | Exact grade, seal and supporting evidence |
| `/products/cabin-air-filter` | Vehicle cabin air filtration | Particle, carbon and finer-filtration variants |
| `/products/engine-air-filter` | Engine intake air filters | Intake assembly and media options |
| `/products/battery-air-filter` | EV battery cooling-air filters | Air-path filtration and installation fit |
| `/products/car-purifier-filter` | In-car air purifier filters | Purifier assembly and particulate/carbon options |
| `/products/filter-mats` | Nonwoven pre-filter mats | Roll goods, cuts and pre-filtration applications |
| `/products/ceiling-filter` | Paint-booth ceiling filters | Booth role and available supply formats |
| `/products/bag-filter` | Industrial dust-collection bag filters | Collector fit and media options |
| `/products/cartridge-filter` | Industrial dust-collection cartridge filters | Pleated assembly and process conditions |
| `/products/liquid-filter` | Polypropylene liquid bag filters | Particle rating, fluid conditions and ring fit |
| `/products/swimming-pool-filter` | Pool cartridge filter enquiry | Confirm pool-specific format and specifications |
| `/filtration-media` | Nonwoven filtration media | Materials, technologies and enhancements |
| `/resources/filter-selection` | General filter specification checklist | Initial selection method across product families |
| `/resources/panel-pocket-hepa-air-filters` | Choosing air filtration stages | Compare construction, grade, airflow and sealing |
| `/resources/bag-vs-cartridge-dust-collection` | Bag versus cartridge dust collection | Distinguish collector formats and required information |
| `/resources/liquid-bag-filter-selection` | Specifying a liquid bag assembly | Fluid, rating, housing and sealing checklist |

Do not create multiple near-identical pages for manufacturer, supplier, price and city variations. Add new pages only for genuinely different offerings or buying decisions. Do not copy the unrelated geosynthetics project's keyword map or Search Console evidence into this filtration project.

## Implemented locally

- Clearer homepage proposition: “Cleaner flow. Stronger performance.” Air, liquid and nonwoven offerings remain explicit in nearby visible text.
- Four interactive application stories with original catalogue images, useful specification prompts and product links.
- Visible catalogue-derived counts: 13 product families, five industry groups and 14 media-design options. No invented capacity, customer counts or certifications.
- Three practical buying guides and a resources hub, unique titles and descriptions, genuine breadcrumb hierarchy and conditional WebPage markup.
- Relevant product-to-guide links, homepage guide cards and footer access. New resource URLs are included in the conditional production sitemap.
- Visible buyer FAQ and clearer paths to comparison and enquiry. No fabricated ratings, prices, testimonials or Product rich-result offers.
- Navy, teal, lime and amber accents; lightweight interaction and scroll effects; responsive layouts and reduced-motion support.

## Production requirements still pending

1. Confirm the preferred HTTPS production domain and set `NEXT_PUBLIC_SITE_URL` before the production build. Until then the sitemap is intentionally empty and absolute canonicals/entity markup are omitted. No guessed domain is published.
2. Publish the approved build on that domain, verify its HTTPS/redirects and check real HTTP responses, canonicals, sitemap, robots and structured data.
3. Verify the domain in Google Search Console and submit the production sitemap. Live indexing inspection cannot be done against localhost.
4. The current enquiry forms prepare an email in the visitor's email app. They do not directly deliver, store or confirm a sales lead. Add an authorized mail service if direct submissions are required.
5. Review the exact selected product documentation and approved business evidence before publishing numerical performance, certification or customer claims.

## Measure useful outcomes

Track a consistent Search Console query/page/country/device scope: indexation, relevant impressions, organic clicks, CTR and average position. Compare equivalent periods; retain dated snapshots rather than overwriting prior evidence. Separately track product discovery, comparison usage and qualified enquiries with an approved analytics setup. No tracking or third-party analytics collection was added in this update.

A top-five or first-position result is not guaranteed by metadata, content volume, colourful design or dwell time. Reassess the page and query relationships using actual performance data after launch.

## Guidance

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google guidance on helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- Internal source: the supplied PARK filtration presentation and existing product explanations. The presentation remains an internal reference, not a public slide viewer.

Validation commands: `npm run build`, `node buyer-experience-check.cjs`, `node media-scroll-check.cjs`. The browser checks use the local production preview on port 3030.
