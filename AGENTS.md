<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Product content

Use `reference/park-filtration-products.pptx` (the user-supplied `Product ppt._AF.pptx`) as the sole source for PARK's product range, specifications, materials, variants and listed applications. `lib/catalogue-source.json` contains its extracted text and slide references.

The range has 13 product families across 5 industry groups. Repeated slides and cabin-filter variants do not add separate product families. Competitor websites may inform writing style, but must not supply PARK product facts, certifications or performance claims. Write original, simple, customer-focused copy within the presentation's scope.

The swimming-pool slide repeats HEPA text; do not use those air-filter specifications as pool-filter facts. Confirm unclear details rather than inventing them. Validate content changes with `node scripts/audit-product-range.cjs` and `python scripts/audit-catalogue.py`.
