import type { Metadata } from 'next';
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
if (siteUrl && (!URL.canParse(siteUrl) || new URL(siteUrl).protocol !== 'https:' || new URL(siteUrl).pathname !== '/')) throw new Error('NEXT_PUBLIC_SITE_URL must be an HTTPS origin without a path');
export function pageMetadata(title: string, description: string, path: string, image = '/images/image24.webp'): Metadata {
 return { title, description, ...(siteUrl ? {alternates:{canonical:siteUrl + path}} : {}), openGraph:{title,description,type:'website',...(siteUrl ? {url:siteUrl + path,images:[{url:siteUrl + image,alt:title}]} : {})}, twitter:{card:'summary_large_image',title,description,...(siteUrl ? {images:[siteUrl + image]} : {})} };
}
export function breadcrumb(items: {name:string;path:string}[]) {
 return siteUrl ? {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name,item:siteUrl+item.path}))} : null;
}
export function webPageSchema(name: string, description: string, path: string) {
 return siteUrl ? {'@context':'https://schema.org','@type':'WebPage','@id':siteUrl+path+'#webpage',url:siteUrl+path,name,description,isPartOf:{'@id':siteUrl+'/#website'}} : null;
}
