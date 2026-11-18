import type { Metadata } from 'next';
import type { Product } from './products';

const standaloneOrigin = 'https://www.parknonwoven-filtration.com';
const configuredSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || standaloneOrigin).replace(/\/$/, '');
if (!URL.canParse(configuredSiteUrl) || new URL(configuredSiteUrl).origin !== standaloneOrigin || new URL(configuredSiteUrl).pathname !== '/' || new URL(configuredSiteUrl).search || new URL(configuredSiteUrl).hash) {
 throw new Error('NEXT_PUBLIC_SITE_URL must be the standalone PARK Filtration HTTPS origin.');
}
export const siteUrl = standaloneOrigin;

function absoluteUrl(path: string) {
 const url = new URL(path, siteUrl);
 if (url.origin !== siteUrl || url.search || url.hash) throw new Error(`SEO URLs must be canonical paths on ${siteUrl}.`);
 return url.toString();
}

export function pageMetadata(title: string, description: string, path: string, image = '/images/products/panel-filter.webp'): Metadata {
 const url = absoluteUrl(path);
 return {
  title,
  description,
  alternates:{canonical:url},
  openGraph:{title,description,type:'website',url,images:[{url:absoluteUrl(image),alt:title}]},
  twitter:{card:'summary_large_image',title,description,images:[absoluteUrl(image)]},
 };
}

export function breadcrumb(items: {name:string;path:string}[]) {
 return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name,item:absoluteUrl(item.path)}))};
}

export function webPageSchema(name: string, description: string, path: string) {
 const url = absoluteUrl(path);
 return {'@context':'https://schema.org','@type':'WebPage','@id':url+'#webpage',url,name,description,isPartOf:{'@id':siteUrl+'/#website'}};
}

export function organizationSchema() {
 return {
  '@context':'https://schema.org',
  '@type':['Organization','LocalBusiness'],
  '@id':siteUrl+'/#organization',
  name:'Park Nonwoven Filtration',
  legalName:'Park Industries Pvt. Ltd.',
  url:siteUrl,
  logo:absoluteUrl('/images/park-nonwoven-logo.png'),
  description:'Industrial nonwoven filtration media and air, dust-collection and liquid-filtration products for commercial and industrial applications.',
  address:{'@type':'PostalAddress',addressLocality:'Panipat',addressRegion:'Haryana',addressCountry:'IN'},
 };
}

export function websiteSchema() {
 return {'@context':'https://schema.org','@type':'WebSite','@id':siteUrl+'/#website',name:'Park Nonwoven Filtration',url:siteUrl,publisher:{'@id':siteUrl+'/#organization'}};
}

export function faqPageSchema(faqs: {question:string;answer:string}[]) {
 return {'@context':'https://schema.org','@type':'FAQPage','mainEntity':faqs.map(faq=>({'@type':'Question',name:faq.question,acceptedAnswer:{'@type':'Answer',text:faq.answer}}))};
}

export function productSchema(product: Product) {
 const url = absoluteUrl('/products/'+product.slug);
 return {
  '@context':'https://schema.org',
  '@type':'Product',
  '@id':url+'#product',
  name:product.name,
  url,
  description:product.description,
  image:absoluteUrl('/images/'+product.image+'.webp'),
  category:product.categories,
  material:product.material,
  brand:{'@type':'Brand',name:'Park Nonwoven Filtration'},
  manufacturer:{'@id':siteUrl+'/#organization'},
  ...(product.specifications?.length ? {additionalProperty:product.specifications.map(specification=>({'@type':'PropertyValue',name:specification.label,value:specification.value}))} : {}),
 };
}

export function filtrationMediaCollectionSchema() {
 const url = absoluteUrl('/filtration-media');
 const media = [
  ['PET / polyester','pet-polyester'],
  ['PP / polypropylene','pp-polypropylene'],
  ['Glass fibre','glass-fibre'],
  ['Activated carbon','activated-carbon'],
 ];
 return {
  '@context':'https://schema.org',
  '@type':'CollectionPage',
  '@id':url+'#webpage',
  url,
  name:'Nonwoven Filtration Media',
  description:'PARK nonwoven filtration media materials, technologies and treatment options for industrial air filtration and related filter applications.',
  isPartOf:{'@id':siteUrl+'/#website'},
  mainEntity:{'@type':'ItemList',itemListElement:media.map(([name,slug],index)=>({'@type':'ListItem',position:index+1,name,url:url+'#media-'+slug}))},
 };
}
