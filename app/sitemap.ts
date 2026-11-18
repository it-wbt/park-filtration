import type { MetadataRoute } from 'next';
import { buyerResources } from '../lib/buyer-resources';
import { industries, products, toSlug } from '../lib/products';
import { siteUrl } from '../lib/seo';

const fixedPaths = [
  '/',
  '/about',
  '/products',
  '/filtration-media',
  '/resources',
  '/resources/filter-selection',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const productPaths = products.map((product) => `/products/${product.slug}`);
  const resourcePaths = buyerResources.map((resource) => `/resources/${resource.slug}`);
  const industryPaths = industries.map((industry) => `/industries/${toSlug(industry.name)}`);

  return [...new Set([...fixedPaths, ...productPaths, ...resourcePaths, ...industryPaths])]
    .map((path) => ({ url: path === '/' ? siteUrl : `${siteUrl}${path}` }));
}
