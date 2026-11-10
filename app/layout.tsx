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
import './media-process.css';
import ParkChat from '../components/ParkChat';
import './park-chat.css';
import SiteMotion from '../components/SiteMotion';
import ProductNavigationScroll from '../components/ProductNavigationScroll';
import { siteUrl } from '../lib/seo';
import StructuredData from '../components/StructuredData';
export const metadata: Metadata = { ...(siteUrl ? {metadataBase:new URL(siteUrl)} : {}), title:'PARK Filtration | Air, Industrial & Liquid Filters',description:'Nonwoven air filters for HVAC, vehicles, railways and industry, plus liquid bag filters for process filtration.',verification:{google:'b-l4NlmHUK1ssxXQf0qRI2nMpV8jJthASOCGARUCPJk'} };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
 const data = siteUrl ? {'@context':'https://schema.org','@graph':[{'@type':'Organization','@id':siteUrl+'/#organization',name:'PARK Nonwoven',alternateName:'PARK Filtration',url:siteUrl,email:'sales@parknonwoven.com',sameAs:['https://in.linkedin.com/company/park-non-woven-pvt-ltd','https://www.youtube.com/@parknonwoven5472','https://www.facebook.com/parknonwovenofficial/','https://x.com/ParkWoven']},{'@type':'WebSite','@id':siteUrl+'/#website',name:'PARK Filtration',url:siteUrl,publisher:{'@id':siteUrl+'/#organization'}}]} : null;
 return <html lang="en"><body><a href="#main-content" className="skip-link">Skip to content</a>{children}<ProductNavigationScroll/><SiteMotion/><ParkChat/><StructuredData data={data}/></body></html>;
}
