import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BrochureFeature from '../../components/BrochureFeature';
import StructuredData from '../../components/StructuredData';
import {pageMetadata, breadcrumb, organizationSchema} from '../../lib/seo';
import './about.css';

export const metadata = pageMetadata('About Park Nonwoven Filtration | Industrial Filter Manufacturer','Meet Park Nonwoven Filtration, the industrial filtration business legally named Park Industries Pvt. Ltd. Explore its nonwoven media, air-filter and liquid-filter product range.','/about');

// Company facts: reference/company-content-sources.json.
export default function AboutPage() {
  return <><Header/><main id="main-content" className="section park-about-page">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>About us</span></nav>
    <div className="eyebrow">ABOUT PARK NONWOVEN FILTRATION</div>
    <h1>Park Nonwoven Filtration.<br/><span>Industrial media and filters.</span></h1>
    <p className="lead">Park Nonwoven Filtration is the industrial filtration media manufacturer legally named Park Industries Pvt. Ltd. Located in Panipat, Haryana, it offers nonwoven filtration media and air, dust-collection and liquid-filter products for industrial applications.</p>
    <div className="park-about-facts" aria-label="PARK Group at a glance"><div><strong>1997</strong><span>Year founded</span></div><div><strong>Panipat</strong><span>Group headquarters</span></div><div><strong>12+</strong><span>Manufacturing plants</span></div></div>
    <div className="park-about-sections">
      <section><h2>A group with manufacturing experience</h2><p>PARK Group’s manufacturing network spans Delhi NCR, Chennai, Pune, Gujarat and Bangalore, supported by more than 12 plants.</p></section>
      <section><h2>Processes supported by testing</h2><p>Manufacturing capabilities include needle punching, stitch bonding, thermo-bonding and lamination. In-house laboratory testing supports the group’s focus on quality and responsible manufacturing.</p></section>
      <section><h2>Supporting the wider community</h2><p>PARK’s community initiatives include health check-ups and eye-care camps, alongside its commitment to environmentally responsible business practices.</p></section>
    </div>
    <BrochureFeature headingId="park-brochure-title" embedded/>
    <section className="park-about-certificates"><div><div className="eyebrow">DOCUMENTED BY PLANT</div><h2>Certificates &amp; recognition</h2><p>Explore the supplied certificates for PARK Group entities and their named locations, including ISO and IATF documents, plus export awards presented to P.A.R.K. Industries Private Limited.</p></div><Link href="/certifications" className="underlined-link">View certificates &amp; awards <ArrowUpRight size={18}/></Link></section>
    <div className="park-about-actions"><Link href="/products" className="button">Explore filtration products <ArrowUpRight size={18}/></Link><Link href="/#contact" className="underlined-link">Talk to our team <ArrowUpRight size={18}/></Link></div>
  </main><StructuredData data={organizationSchema()}/><StructuredData data={breadcrumb([{name:'Home',path:'/'},{name:'About us',path:'/about'}])}/><Footer/></>;
}
