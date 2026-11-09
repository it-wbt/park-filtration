import type { MetadataRoute } from 'next';
const sitemapUrl = 'https://raw.githubusercontent.com/it-wbt/park-filtration/main/public/sitemap.txt';
export default function robots():MetadataRoute.Robots {
 return {rules:{userAgent:'*',allow:'/'},sitemap:sitemapUrl};
}
