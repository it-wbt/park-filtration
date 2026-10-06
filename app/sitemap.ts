import type { MetadataRoute } from 'next';
import { products, industries, toSlug } from '../lib/products';
import { siteUrl } from '../lib/seo';
import { buyerResources } from '../lib/buyer-resources';
export default function sitemap():MetadataRoute.Sitemap { return siteUrl ? ['','/products','/filtration-media','/resources','/resources/filter-selection',...buyerResources.map(r=>'/resources/'+r.slug),...products.map(p=>'/products/'+p.slug),...industries.map(i=>'/industries/'+toSlug(i.name))].map(path=>({url:siteUrl+path})) : []; }
