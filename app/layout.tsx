import type { Metadata } from 'next';
import './fonts.css';
import './globals.css';
import './catalogue.css';
import './product-studio.css';
import './motion.css';
import './contact.css';
import './industrial.css';
import './media-architecture.css';
import './discovery.css';
import './compact.css';
import './engagement.css';
import './product-presentation.css';
import './corporate.css';
import './readability.css';
import SiteEngagement from '../components/SiteEngagement';
import SiteMotion from '../components/SiteMotion';
import ProductNavigationScroll from '../components/ProductNavigationScroll';
import { siteUrl } from '../lib/seo';
import StructuredData from '../components/StructuredData';
export const metadata: Metadata = { ...(siteUrl ? {metadataBase:new URL(siteUrl)} : {}), title:'PARK Filtration | Air & Liquid Filtration Solutions',description:'PARK Nonwoven air and liquid filtration for automobiles, railways, manufacturing, heavy industry, homes and commercial buildings.' };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
 const data = siteUrl ? {'@context':'https://schema.org','@graph':[{'@type':'Organization','@id':siteUrl+'/#organization',name:'PARK Nonwoven',url:siteUrl},{'@type':'WebSite','@id':siteUrl+'/#website',name:'PARK Filtration',url:siteUrl,publisher:{'@id':siteUrl+'/#organization'}}]} : null;
 return <html lang="en"><body><a href="#main-content" className="skip-link">Skip to content</a>{children}<ProductNavigationScroll/><SiteMotion/><SiteEngagement/><StructuredData data={data}/></body></html>;
}
