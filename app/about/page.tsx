import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StructuredData from '../../components/StructuredData';
import {pageMetadata, breadcrumb} from '../../lib/seo';
import './about.css';

export const metadata = pageMetadata('About PARK Group | PARK Filtration', 'Discover PARK Group: founded in 1997 in Panipat, with experience in nonwoven textiles, polymer materials, manufacturing and laboratory testing.', '/about');

// Company facts: reference/company-content-sources.json.
export default function AboutPage() {
  return <><Header/><main id="main-content" className="section park-about-page">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>About us</span></nav>
    <div className="eyebrow">ABOUT PARK GROUP</div>
    <h1>Material innovation.<br/><span>Built on experience.</span></h1>
    <p className="lead">Founded in 1997 by Pankaj Kapoor, PARK Group manufactures nonwoven textiles and polymer materials. The group is headquartered in Panipat, Haryana, and serves industries in India and overseas.</p>
    <div className="park-about-facts" aria-label="PARK Group at a glance"><div><strong>1997</strong><span>Year founded</span></div><div><strong>Panipat</strong><span>Group headquarters</span></div><div><strong>12+</strong><span>Manufacturing plants</span></div></div>
    <div className="park-about-sections">
      <section><h2>A group with manufacturing experience</h2><p>PARK Industries Pvt Ltd, PARK Non-Woven Pvt Ltd, PARK Felts Pvt Ltd and Essar Industries form the group. Its manufacturing network includes locations across Delhi NCR, Chennai, Pune, Gujarat and Bangalore.</p></section>
      <section><h2>Processes supported by testing</h2><p>Manufacturing capabilities include needle punching, stitch bonding, thermo-bonding and lamination. In-house laboratory testing supports the group’s focus on quality and responsible manufacturing.</p></section>
      <section><h2>Supporting the wider community</h2><p>PARK’s community initiatives include health check-ups and eye-care camps, alongside its commitment to environmentally responsible business practices.</p></section>
    </div>
    <div className="park-about-actions"><Link href="/products" className="button">Explore filtration products <ArrowUpRight size={18}/></Link><Link href="/#contact" className="underlined-link">Talk to our team <ArrowUpRight size={18}/></Link></div>
  </main><StructuredData data={breadcrumb([{name:'Home',path:'/'},{name:'About us',path:'/about'}])}/><Footer/></>;
}
