 'use client';
import { useId, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Car, TrainFront, Truck, Bike, Layers, Check } from 'lucide-react';
const applicationIcon = (name: string) => name === 'Automobiles' ? Car : name === 'Railways' ? TrainFront : Layers;
const vehicleIcon = (name: string) => name === 'Commercial Vehicle' ? Truck : name === 'Two wheeler' ? Bike : name === 'Coach' ? TrainFront : Car;
import { applicationGroups, applicationProducts, toSlug } from '../lib/products';
function moveTab(event: KeyboardEvent<HTMLButtonElement>) {
 const tabs = Array.from(event.currentTarget.parentElement!.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
 const index = tabs.indexOf(event.currentTarget);
 const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : ['ArrowRight','ArrowDown'].includes(event.key) ? (index + 1) % tabs.length : ['ArrowLeft','ArrowUp'].includes(event.key) ? (index - 1 + tabs.length) % tabs.length : -1;
 if (next < 0) return;
 event.preventDefault(); tabs[next].focus(); tabs[next].click();
}
export default function IndustryMenu({ industry, onNavigate }: { industry: string; onNavigate: () => void }) {
 const id = useId();
 const hoverCapable = () => window.matchMedia('(min-width: 761px) and (hover: hover)').matches;
 const selectGroup = (index: number) => { setSelected(index); setChild(undefined); };
 const groups = applicationGroups[industry];
 const [selected, setSelected] = useState(-1);
 const [child, setChild] = useState<string | undefined>(undefined);
 const group = groups[selected];
 const solutions = group ? applicationProducts(industry, group, child) : [];
 const href = '/industries/' + toSlug(industry);
 return <div className="mobility-explorer">
  <div className="mobility-intro"><div><span className="submenu-eyebrow">FILTRATION SOLUTIONS</span><h2>{industry}</h2></div><Link href={href} onClick={onNavigate} className="mobility-discover">Explore {industry} <ArrowRight size={18}/></Link></div>
  <div className="industry-submenu-layout"><div className="mobility-application-tabs" role="tablist" aria-orientation="vertical" aria-label={industry + ' applications'}>{groups.map((item,index) => <button key={item.name} id={id + '-tab-' + index} role="tab" aria-selected={selected === index} aria-controls={id + '-body'} tabIndex={selected === index || (selected < 0 && index === 0) ? 0 : -1} onKeyDown={moveTab} onMouseEnter={() => { if (hoverCapable() && selected !== index) selectGroup(index); }} onFocus={() => { if (hoverCapable() && selected !== index) selectGroup(index); }} onClick={() => selectGroup(index)}><span className="application-option-icon">{(() => {const Icon = applicationIcon(item.name);return <Icon size={17} strokeWidth={1.6}/>;})()}</span><span className="application-option-label">{item.name}</span><ArrowRight size={16}/></button>)}</div>
  <div id={id + '-body'} role="tabpanel" aria-labelledby={selected >= 0 ? id + '-tab-' + selected : undefined} className="mobility-tab-body">
   {group?.children && <div className="mobility-vehicle-tabs" role="tablist" aria-orientation="vertical" aria-label={group.name + ' applications'}>{group.children.map((name,index) => <button key={name} id={id + '-child-' + index} role="tab" aria-selected={child === name} aria-controls={id + '-products'} tabIndex={child === name || (!child && index === 0) ? 0 : -1} onKeyDown={moveTab} onClick={() => setChild(name)}><span className="vehicle-option-label">{(() => {const Icon = vehicleIcon(name);return <Icon size={15} strokeWidth={1.6}/>;})()}<span>{name}</span></span>{child === name ? <Check size={15}/> : <ArrowRight size={15}/>}</button>)}</div>}
   {group && (!group.children || child) && <div id={id + '-products'} role={group.children ? 'tabpanel' : undefined} aria-labelledby={group.children ? id + '-child-' + group.children.indexOf(child!) : undefined} className="mobility-tab-results">
    <div className="mobility-tab-results-heading"><span className="submenu-eyebrow">SELECTED APPLICATION</span><h3>{child || group.name}</h3><span className="solution-count">{solutions.length} product options</span></div>
    <p className="submenu-application-summary">{child === 'Two wheeler' ? 'Synthetic nonwoven engine air filters for two-wheeler intake air. Explore standard and special sizes.' : child === 'Swimming Pool' ? 'Explore PARK swimming pool filters. Share your pool-system and housing details to confirm the available format and specifications.' : group.summary}</p>
    <div className="mobility-tab-products">{solutions.map(product => <Link key={product.slug} href={'/products/' + product.slug} onClick={onNavigate}><span className="submenu-product-thumb"><img src={"/images/" + product.image + ".webp"} alt="" width={52} height={52}/></span><span className="submenu-product-name">{product.name}<small>{product.slug === 'swimming-pool-filter' ? 'Explore pool filtration' : product.slug === 'liquid-filter' ? 'Suspended-particle removal' : ['bag-filter','cartridge-filter'].includes(product.slug) ? 'Industrial dust collection' : product.slug === 'ceiling-filter' ? 'Final-stage booth air filtration' : product.slug === 'filter-mats' ? 'Nonwoven pre-filtration' : 'Explore air filtration'}</small></span><ArrowRight size={16}/></Link>)}</div>
    <Link className="application-menu-link" href={href + '#' + toSlug(group.name)} onClick={onNavigate}>View application details <ArrowRight size={16}/></Link>
   </div>}
  </div>
 </div></div>;
}
