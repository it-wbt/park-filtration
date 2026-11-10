import type { MetadataRoute } from 'next';
import {siteUrl} from '../lib/seo';
const sitemapUrl = `${siteUrl}/sitemap.xml`;
export default function robots():MetadataRoute.Robots {
 return {rules:{userAgent:'*',allow:'/'},sitemap:sitemapUrl};
}
