import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import HomeBanner from './HomeBanner';
import MediaArchitecture from './MediaArchitecture';
import Header from './Header';
import Footer from './Footer';
import ProductHighlights from './ProductHighlights';
import Contact from './Contact';
import {industries, products} from '../lib/products';
import {mediaLayers} from '../lib/media-architecture';
import './home-compact.css';

export default function Home() {
  return <><Header/><main id="main-content" className="home-compact">
    <HomeBanner/>
    <div id="technology" className="home-media-open"><MediaArchitecture/></div>
<section id="about" className="section intro partner-intro"><div><div className="eyebrow">YOUR FILTRATION PARTNER</div><h2>Your filtration problem.<br/><span>Our starting point.</span></h2></div><div><p>Choosing a filter should start with what is going wrong: dust reaching equipment, particles affecting a process, or a replacement that does not fit. At PARK Nonwoven, we help you work through the application and compare suitable air filters, liquid bag filters and nonwoven media.</p><a className="underlined-link" href="/filtration-media">Discover our approach <ArrowUpRight size={18}/></a><div className="range-proof" aria-label="Explore the PARK catalogue range"><div><strong>{products.length}</strong><span>Product families</span></div><div><strong>{industries.length}</strong><span>Industry groups</span></div><div><strong>{mediaLayers.reduce((count,group)=>count+group.items.length,0)}</strong><span>Media design options</span></div></div></div></section>

<ProductHighlights/>

<Contact/>
</main><Footer/></>;
}
