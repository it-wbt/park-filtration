'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Car, Wind, Layers, Factory, Droplets, Waves } from 'lucide-react';
import { products } from '../lib/products';

export const productMenuGroups = [
 {name:'Air Filters',icon:Wind,slugs:['panel-filter','pocket-filter','hepa-filter']},
 {name:'Automotive Filters',icon:Car,slugs:['cabin-air-filter','engine-air-filter','battery-air-filter','car-purifier-filter']},
 {name:'Filter Mats & Ceiling Filters',icon:Layers,slugs:['filter-mats','ceiling-filter']},
 {name:'Industrial Dust Filters',icon:Factory,slugs:['bag-filter','cartridge-filter']},
 {name:'Liquid Bag Filters',icon:Droplets,slugs:['liquid-filter']},
 {name:'Swimming Pool Filters',icon:Waves,slugs:['swimming-pool-filter']},
];

export default function ProductMenu({onNavigate}:{onNavigate:()=>void}) {
 const [selected,setSelected] = useState(0);
 const group = productMenuGroups[selected];
 const range = group.slugs.map(slug => products.find(product => product.slug === slug)!);
 const featured = range[0];
 const selectOnHover = (index:number) => { if(window.matchMedia('(min-width:761px) and (hover:hover)').matches) setSelected(index); };
 return <>
  <div className="mega-categories">
   <span className="mega-eyebrow">Our products</span>
   {productMenuGroups.map((item,index) => {const Icon=item.icon;return <button key={item.name} className={'mega-category'+(selected===index?' selected':'')} aria-pressed={selected===index} onMouseEnter={()=>selectOnHover(index)} onFocus={()=>selectOnHover(index)} onClick={()=>setSelected(index)}><span className="mega-icon"><Icon size={19} strokeWidth={1.5}/></span><span>{item.name}</span><ArrowRight className="mega-category-arrow" size={23}/></button>;})}
   <Link href="/products" className="mega-all" onClick={onNavigate}>Explore all products <ArrowRight size={17}/></Link>
  </div>
  <div className="mega-details product-menu-details">
   <div className="mobility-intro"><div><span className="submenu-eyebrow">PRODUCT RANGE</span><h2>{group.name}</h2></div><span className="solution-count">{range.length} product {range.length===1?'family':'families'}</span></div>
   <div className="product-menu-links">{range.map(product=><Link key={product.slug} href={'/products/'+product.slug} onClick={onNavigate}><img src={'/images/'+product.image+'.webp'} alt="" width={64} height={64}/><span><strong>{product.name}</strong><small>{product.description}</small></span><ArrowRight size={18}/></Link>)}</div>
  </div>
  <div className="mega-feature product-menu-feature"><div className="product-menu-preview"><span className="submenu-eyebrow">PARK FILTRATION</span><img src={'/images/'+featured.image+'.webp'} alt={featured.name} width={320} height={240}/><h3>{featured.name}</h3><p>{featured.material}</p><Link className="button small" href={'/products/'+featured.slug} onClick={onNavigate}>View product <ArrowRight size={17}/></Link></div><div className="mega-catalogue"><Link href="/products" onClick={onNavigate}>Explore filtration products <ArrowUpRight size={20}/></Link></div></div>
 </>;
}
