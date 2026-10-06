'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search, Check, Plus, X, Download } from 'lucide-react';
import { products, industries, type Product } from '../lib/products';
function gradeText(p: Product) { return p.specifications?.filter(s => /grade|range|class/i.test(s.label)).map(s => s.label + ': ' + s.value).join('\n') || 'Request application-specific technical confirmation'; }
function sizeText(p: Product) { return p.specifications?.find(s => /sizes|supply/i.test(s.label))?.value || 'Confirm available dimensions with the team'; }
export default function Catalogue({compact=false}:{compact?:boolean}){
 const [category,setCategory]=useState('All products');const [query,setQuery]=useState('');
 const [compared,setCompared]=useState<string[]>([]);
 const [shortlistReady,setShortlistReady]=useState(false);
 useEffect(()=>{
  if(compact)return;
  try {
   const saved:unknown=JSON.parse(sessionStorage.getItem('park-product-comparison')||'[]');
   if(Array.isArray(saved))setCompared([...new Set(saved.filter((slug):slug is string=>typeof slug==='string'&&products.some(product=>product.slug===slug)))].slice(0,3));
  } catch { /* Comparison remains available when browser storage is disabled. */ }
  setShortlistReady(true);
 },[compact]);
 useEffect(()=>{
  if(compact||!shortlistReady)return;
  try {sessionStorage.setItem('park-product-comparison',JSON.stringify(compared));} catch { /* Keep the current in-page shortlist. */ }
 },[compared,compact,shortlistReady]);
 const filtered=products.filter(p=>(category==='All products'||p.categories.includes(category))&&[p.name,p.description,p.material,...p.applications,...(p.variants||[]),...(p.specifications||[]).map(s=>s.value)].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
 const selected=compared.map(slug=>products.find(p=>p.slug===slug)!);
 function toggle(slug:string) {setCompared(current=>current.includes(slug)?current.filter(s=>s!==slug):current.length<3?[...current,slug]:current);}
 function downloadShortlist() {
  const content=selected.map(p=>`${p.name}\n${p.description}\nMaterial: ${p.material}\nApplications: ${p.applications.join(', ')}\n${gradeText(p)}\nSizes: ${sizeText(p)}\nProduct URL: ${window.location.origin}/products/${p.slug}`).join('\n\n---\n\n')+'\n\nCatalogue options require selected-product confirmation. Enquiries: sales@parknonwoven.com';
  const url=URL.createObjectURL(new Blob([content],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='park-filtration-shortlist.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 }
 return <><div className="catalogue-controls"><div className="tabs" aria-label="Filter products by industry">{['All products',...industries.map(i=>i.name)].map(c=><button key={c} className={category===c?'active':''} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div>{!compact&&<label className="search"><Search size={18}/><input type="search" aria-label="Search products" placeholder="Search products, materials, grades or applications" value={query} onChange={e=>setQuery(e.target.value)}/></label>}</div>
 {!compact&&<div className="catalogue-count"><span aria-live="polite">{filtered.length} product families found</span><span>Select up to 3 products to compare catalogue options.</span></div>}
 <div className="product-grid">{(compact?filtered.slice(0,4):filtered).map(p=><article className="catalogue-item" key={p.slug}><Link className="product-card" href={`/products/${p.slug}`}><div className="product-image"><span>FILTRATION SOLUTIONS</span><img src={`/images/${p.image}.webp`} alt={p.name} width={480} height={360} loading="lazy"/><div className="circle-arrow"><ArrowUpRight size={20}/></div></div><div className="product-info"><h3>{p.name}</h3><p>{p.description}</p></div></Link>{!compact&&<div className="product-card-actions"><button aria-pressed={compared.includes(p.slug)} aria-label={'Compare '+p.name} disabled={!compared.includes(p.slug)&&compared.length>=3} onClick={()=>toggle(p.slug)}>{compared.includes(p.slug)?<Check size={15}/>:<Plus size={15}/>} {compared.includes(p.slug)?'Selected':'Compare'}</button><Link href={'/products/'+p.slug+'#product-enquiry'}>Request a quote <ArrowUpRight size={14}/></Link></div>}</article>)}</div>
 {!filtered.length&&<div className="empty"><h3>No products found</h3><p>Try another product, material or application.</p><button className="button" onClick={()=>{setQuery('');setCategory('All products');}}>Clear filters</button></div>}
 {!compact&&compared.length>0&&<><div className="comparison-dock" aria-label="Your product comparison shortlist"><div className="comparison-dock-preview">{selected.map(p=><img key={p.slug} src={'/images/'+p.image+'.webp'} alt="" width={44} height={36}/>)}</div><span role="status">{compared.length} / 3 selected</span><Link href="#compare-products">View comparison <ArrowUpRight size={16}/></Link><button aria-label="Clear comparison shortlist" onClick={()=>setCompared([])}><X size={18}/></button></div><section className="comparison-section" id="compare-products"><div className="comparison-heading"><div><div className="eyebrow">YOUR PRODUCT SHORTLIST</div><h2>Compare before you enquire.</h2><p aria-live="polite">{compared.length} of 3 products selected. Compare their role, materials and catalogue options.</p></div><div><button className="underlined-link" onClick={downloadShortlist}><Download size={16}/> Save shortlist</button><button className="comparison-clear" onClick={()=>setCompared([])}>Clear all</button></div></div><div className="comparison-scroll" tabIndex={0} role="region" aria-label="Product comparison table"><table><caption>Catalogue comparison — final specifications require application-specific confirmation.</caption><thead><tr><th scope="col">What to compare</th>{selected.map(p=><th key={p.slug} scope="col"><img src={'/images/'+p.image+'.webp'} alt="" width={100} height={80}/><Link href={'/products/'+p.slug}>{p.name}</Link><button aria-label={'Remove '+p.name+' from comparison'} onClick={()=>toggle(p.slug)}><X size={14}/></button></th>)}</tr></thead><tbody>{[
 {name:'Product role',value:(p:Product)=>p.description},
 {name:'Material',value:(p:Product)=>p.material},
 {name:'Catalogue grades',value:gradeText},
 {name:'Sizes / format',value:sizeText},
 {name:'Variants',value:(p:Product)=>p.variants?.join('; ')||'Confirm the required media and assembly'},
 {name:'Applications',value:(p:Product)=>p.applications.join('; ')},
 ].map(row=><tr key={row.name}><th scope="row">{row.name}</th>{selected.map(p=><td key={p.slug}>{row.value(p)}</td>)}</tr>)}<tr><th scope="row">Next step</th>{selected.map(p=><td key={p.slug}><Link className="comparison-quote" href={'/products/'+p.slug+'#product-enquiry'}>Enquire about {p.name.toLowerCase()} <ArrowUpRight size={14}/></Link></td>)}</tr></tbody></table></div></section></>}
 </>;
}
