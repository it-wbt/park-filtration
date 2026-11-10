import type {MetadataRoute} from 'next';
import {siteUrl} from '../lib/seo';

const paths = [
  '/',
  '/about',
  '/products',
  '/filtration-media',
  '/resources',
  '/resources/filter-selection',
  '/resources/panel-pocket-hepa-air-filters',
  '/resources/bag-vs-cartridge-dust-collection',
  '/resources/liquid-bag-filter-selection',
  '/products/hepa-filter',
  '/products/swimming-pool-filter',
  '/products/panel-filter',
  '/products/pocket-filter',
  '/products/cabin-air-filter',
  '/products/engine-air-filter',
  '/products/battery-air-filter',
  '/products/car-purifier-filter',
  '/products/filter-mats',
  '/products/ceiling-filter',
  '/products/bag-filter',
  '/products/cartridge-filter',
  '/products/liquid-filter',
  '/industries/mobility',
  '/industries/manufacturing',
  '/industries/heavy-duty-industry',
  '/industries/living',
  '/industries/liquid',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({url: `${siteUrl}${path}`}));
}
