import {ArrowUpRight} from 'lucide-react';
import HomeBanner from './HomeBanner';
import MediaArchitecture from './MediaArchitecture';
import Header from './Header';
import Footer from './Footer';
import ProductHighlights from './ProductHighlights';
import Contact from './Contact';
import './home-compact.css';

export default function Home() {
  return <><Header/><main id="main-content" className="home-compact">
    <HomeBanner/>
    <div id="technology" className="home-media-open"><MediaArchitecture/></div>
<section id="about" className="section intro partner-intro" aria-labelledby="about-title"><div><div className="eyebrow">ABOUT PARK GROUP</div><h2 id="about-title">Material innovation.<br/><span>Built on experience.</span></h2></div><div>
  <p>Founded in 1997 by Pankaj Kapoor, PARK Group manufactures nonwoven textiles and polymer materials. Headquartered in Panipat, Haryana, the group grew from its beginnings in automotive materials into a manufacturing business serving industries in India and overseas.</p>
  <p>The group brings together PARK Industries Pvt Ltd, PARK Non-Woven Pvt Ltd, PARK Felts Pvt Ltd and Essar Industries. Its manufacturing network includes locations across Delhi NCR, Chennai, Pune, Gujarat and Bangalore, supported by in-house laboratory testing.</p>
  <p>PARK combines processes such as needle punching, stitch bonding, thermo-bonding and lamination with a focus on quality and responsible manufacturing. Its community initiatives include health check-ups and eye-care camps.</p>
  <a className="underlined-link" href="https://parknonwoven.com/about-us/" target="_blank" rel="noopener noreferrer">Learn more about PARK Group <ArrowUpRight size={18}/></a>
  <div className="range-proof" aria-label="PARK Group at a glance"><div><strong>1997</strong><span>Year founded</span></div><div><strong>Panipat</strong><span>Group headquarters</span></div><div><strong>12+</strong><span>Manufacturing plants</span></div></div>
</div></section>

<ProductHighlights/>

<Contact/>
</main><Footer/></>;
}
