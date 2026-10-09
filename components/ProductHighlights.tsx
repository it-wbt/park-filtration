'use client';
import NextImage from 'next/image';
import {useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight} from 'lucide-react';
import {products} from '../lib/products';
import './product-highlights.css';

const highlights = ['panel-filter', 'pocket-filter', 'hepa-filter', 'cabin-air-filter', 'liquid-filter'].map(slug => products.find(product => product.slug === slug)!);

export default function ProductHighlights() {
  const [active, setActive] = useState(0);
  const product = highlights[active];
  const move = (direction: number) => setActive(index => (index + direction + highlights.length) % highlights.length);
  return <section className="product-highlights" aria-labelledby="product-highlights-title" aria-roledescription="carousel">
    <div className="highlights-heading"><div><h2 id="product-highlights-title">Product highlights</h2><span className="highlights-heading-rule"/></div><Link href="/products">View all products <ArrowUpRight size={17}/></Link></div>
    <div className="highlights-stage">
      <button className="highlights-prev highlights-arrow" onClick={() => move(-1)} aria-label="Previous highlighted product"><ChevronLeft size={36} strokeWidth={1.5}/></button>
      <div key={product.slug} className="highlights-slide" aria-live="polite" aria-atomic="true">
        <div className="highlights-copy"><span className="highlights-category"><i/>PARK FILTRATION / {product.categories[0]}</span><h3>{product.name}</h3><p>{product.description}</p><Link href={`/products/${product.slug}`} className="highlights-learn">Explore product <ArrowRight size={22}/></Link></div>
        <Link className="highlights-image" href={`/products/${product.slug}`} aria-label={`Explore ${product.name}`}><NextImage sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 640px" src={product.slug === "hepa-filter" ? "/images/hepa-highlight-transparent.webp" : product.slug === "liquid-filter" ? "/images/liquid-bag-highlight-render.webp" : `/images/${product.image}.webp`} alt={product.slug === "liquid-filter" ? "Illustrative studio render of a white liquid bag filter" : product.name} width={640} height={480} loading="lazy"/></Link>
      </div>
      <button className="highlights-next highlights-arrow" onClick={() => move(1)} aria-label="Next highlighted product"><ChevronRight size={36} strokeWidth={1.5}/></button>
    </div>
    <div className="highlights-bottom"><span>0{active+1}<span> / 0{highlights.length}</span></span><div className="highlights-dots" aria-label="Choose a highlighted product">{highlights.map((item,index) => <button key={item.slug} aria-label={`Show ${item.name}`} aria-pressed={active===index} onClick={() => setActive(index)}><span className="highlights-selector-number">0{index+1}</span><span className="highlights-selector-name">{item.name}</span></button>)}</div><Link href="#contact">Need help choosing? Talk to PARK <ArrowUpRight size={15}/></Link></div>
  </section>;
}
