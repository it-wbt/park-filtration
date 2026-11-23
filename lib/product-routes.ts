const productLandingByBaseSlug: Record<string, string> = {
  'pocket-filter': 'pocket-filters',
  'bag-filter': 'dust-collector-bag-filters',
  'hepa-filter': 'hepa-filters',
  'cabin-air-filter': 'cabin-air-filters',
  'liquid-filter': 'liquid-bag-filters',
};

export const baseProductSlugByLandingSlug = Object.fromEntries(
  Object.entries(productLandingByBaseSlug).map(([baseSlug, landingSlug]) => [landingSlug, baseSlug]),
) as Record<string, string>;

export function productHref(baseSlug: string) {
  return `/products/${productLandingByBaseSlug[baseSlug] ?? baseSlug}`;
}

export function allCanonicalProductSlugs(slugs: string[]) {
  return slugs.map((slug) => productLandingByBaseSlug[slug] ?? slug);
}
