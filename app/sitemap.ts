import type { MetadataRoute } from 'next';
import { buyerResources } from '../lib/buyer-resources';
import { industries, products, toSlug } from '../lib/products';
import { siteUrl } from '../lib/seo';
import { allCanonicalProductSlugs } from '../lib/product-routes';

const fixedPaths = [
  '/',
  '/about',
  '/certifications',
  '/contact',
  '/products',
  '/filtration-media',
  '/resources',
  '/resources/filter-selection',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const productPaths = allCanonicalProductSlugs(products.map((product) => product.slug)).map((slug) => `/products/${slug}`);
  const resourcePaths = buyerResources.map((resource) => `/resources/${resource.slug}`);
  const industryPaths = industries.map((industry) => `/industries/${toSlug(industry.name)}`);

  return [...new Set([...fixedPaths, ...productPaths, ...resourcePaths, ...industryPaths])]
    .map((path) => ({
      url: path === '/' ? siteUrl : `${siteUrl}${path}`,
      changeFrequency: path.startsWith('/products/') ? 'monthly' : 'weekly',
      priority: path === '/' ? 1 : path.startsWith('/products/') ? 0.8 : 0.6,
    }));
}
