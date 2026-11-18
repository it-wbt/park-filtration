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
import { siteUrl, websiteSchema } from '../lib/seo';
import StructuredData from '../components/StructuredData';
export const metadata: Metadata = { metadataBase:new URL(siteUrl), title:'Park Nonwoven Filtration | Industrial Air & Liquid Filters',description:'Industrial filtration media and air, dust-collection and liquid filters from Park Nonwoven Filtration in Panipat, Haryana, India.',verification:{google:'b-l4NlmHUK1ssxXQf0qRI2nMpV8jJthASOCGARUCPJk'} };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
 return <html lang="en"><body><a href="#main-content" className="skip-link">Skip to content</a>{children}<ProductNavigationScroll/><SiteMotion/><ParkChat/><StructuredData data={websiteSchema()}/></body></html>;
}
