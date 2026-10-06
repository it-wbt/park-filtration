'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Wind, Gauge, Layers } from 'lucide-react';
const parameters = [
 {title:'Filtration efficiency',icon:Wind,label:'Capture the right particles',description:'Filtration addresses capture of dust, particles, allergens and other contaminants. Specify the particle type and selected grade; a media range does not mean that every filter achieves the same retention.',question:'Ask: Which particle sizes and test method does the selected grade address?'},
 {title:'Low pressure drop',icon:Gauge,label:'Keep the flow requirement in view',description:'Pressure drop is the resistance across the filter. The catalogue describes an optimised media structure with low airflow resistance. Confirm the selected filter at your required flow, not just an isolated media description.',question:'Ask: What is the initial pressure drop at my required airflow?'},
 {title:'Dust-holding capacity',icon:Layers,label:'Plan for the real contaminant load',description:'Filtration addresses high contaminant retention to support service life and maintenance planning. Dust load, operating conditions and replacement criteria affect actual service life; confirm a replacement interval for your system.',question:'Ask: What inspection and replacement criteria suit my system?'},
];
export default function MediaExplorer() {
 const [active,setActive] = useState(0);
 const chosen = parameters[active];
 const Icon = chosen.icon;
 return <section className="section media-explorer"><div className="section-heading"><div><div className="eyebrow">UNDERSTAND THE PERFORMANCE BALANCE</div><h2>Three questions.<br/>A better filter enquiry.</h2></div><Link href="/filtration-media" className="underlined-link">Explore materials &amp; technologies <ArrowRight size={17}/></Link></div><div className="media-explorer-layout"><div className="media-parameter-controls" aria-label="Filtration performance parameters">{parameters.map((p,i) => {const ItemIcon=p.icon;return <button key={p.title} aria-pressed={active===i} onClick={()=>setActive(i)}><span>0{i+1}</span><ItemIcon size={21}/><strong>{p.title}</strong><ArrowRight size={16}/></button>;})}</div><div className="media-parameter-panel" aria-live="polite"><div className="parameter-graphic" aria-hidden="true"><div/><Icon size={58} strokeWidth={1}/><div/></div><span className="submenu-eyebrow">{chosen.title}</span><h3>{chosen.label}</h3><p>{chosen.description}</p><div className="parameter-question">{chosen.question}</div><p className="schematic-note">Illustrative explanation. No measured filtration performance is simulated.</p></div></div></section>;
}
