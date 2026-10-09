'use client';
import NextImage from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, ChevronDown, Download, Menu, X, Car, Factory, Building2, House, Droplets } from 'lucide-react';
import { industries } from '../lib/products';
import IndustryMenu from './IndustryMenu';
import ProductMenu from './ProductMenu';

export function Brand() { return <Link className="brand" href="/" aria-label="PARK Nonwoven home"><NextImage sizes="(max-width: 640px) 220px, 330px" loading="eager" className="brand-logo" src="/images/park-nonwoven-logo.png" alt="PARK Nonwoven" width={768} height={126}/></Link>; }
const icons = [Car, Factory, Building2, House, Droplets];
type MenuName = 'industries' | 'products';

export default function Header() {
 const [open, setOpen] = useState(false);
 const [active, setActive] = useState<MenuName | null>(null);
 const [displayed, setDisplayed] = useState<MenuName | null>(null);
 useEffect(() => {
  if (active) { setDisplayed(active); return; }
  const timer = setTimeout(() => setDisplayed(null), 180);
  return () => clearTimeout(timer);
 }, [active]);
 const [selected, setSelected] = useState(0);
 const headerRef = useRef<HTMLElement>(null);
 const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 const cancelHoverClose = () => { if (hoverTimer.current) clearTimeout(hoverTimer.current); };
 useEffect(() => () => cancelHoverClose(), []);
 const close = () => { cancelHoverClose(); setOpen(false); setActive(null); };
 const show = (menu: MenuName) => { cancelHoverClose(); if (active !== menu) setSelected(0); setActive(menu); };
 useEffect(() => {
  const dismiss = (event: KeyboardEvent) => {
   if (event.key === 'Escape') {
    cancelHoverClose();
    const trigger = headerRef.current?.querySelector<HTMLButtonElement>('[aria-expanded="true"].nav-trigger');
    setActive(null); setOpen(false); trigger?.focus();
   }
  };
  document.addEventListener('keydown', dismiss);
  return () => document.removeEventListener('keydown', dismiss);
 }, []);
 useEffect(() => {
  if (!active) return;
  const updateMenuHeight = () => {
   const header = headerRef.current;
   if (header) header.style.setProperty('--mega-top', `${header.getBoundingClientRect().bottom + 8}px`);
  };
  updateMenuHeight();
  window.addEventListener('resize', updateMenuHeight);
  window.addEventListener('scroll', updateMenuHeight, { passive: true });
  return () => {
   window.removeEventListener('resize', updateMenuHeight);
   window.removeEventListener('scroll', updateMenuHeight);
  };
 }, [active]);
 const hoverCapable = () => window.matchMedia('(min-width: 761px) and (hover: hover)').matches;
 const industry = industries[selected] ?? industries[0];
 const industryHref = '/industries/' + industry.name.toLowerCase().replaceAll(' ', '-');
 const renderMenu = (menu: MenuName) => displayed === menu && (menu === 'products' ? <div className={'mega-menu mega-products' + (active !== menu ? ' menu-closing' : '')} inert={active !== menu} id="mega-products"><ProductMenu onNavigate={close}/></div> : <div className={'mega-menu' + (industry.name === 'Mobility' ? ' mega-mobility' : '') + (active !== menu ? ' menu-closing' : '')} inert={active !== menu} id={'mega-' + menu}>
  <div className="mega-categories">
   <span className="mega-eyebrow">{menu === 'industries' ? 'Industries' : 'Product applications'}</span>
   {industries.map((item, index) => { const Icon = icons[index]; return <button key={item.name} className={'mega-category' + (selected === index ? ' selected' : '')} aria-pressed={selected === index} onMouseEnter={() => { if (hoverCapable()) setSelected(index); }} onFocus={() => { if (hoverCapable()) setSelected(index); }} onClick={() => setSelected(index)}><span className="mega-icon"><Icon size={19} strokeWidth={1.5}/></span><span>{item.name}</span><ArrowRight className="mega-category-arrow" size={23}/></button>; })}
   <Link href={menu === 'industries' ? '/#industries' : '/products'} className="mega-all" onClick={close}>Explore all {menu} <ArrowRight size={17}/></Link>
  </div>
  <div className="mega-details">
   <IndustryMenu key={menu + industry.name} industry={industry.name} onNavigate={close}/>
  </div>
  <div className="mega-feature"><div className="mega-feature-card"><NextImage sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 640px" src={'/images/' + industry.image + '.webp'} alt={industry.name + ' filtration'} width={480} height={600} /><div className="mega-feature-copy"><span className="mega-eyebrow">Products &amp; solutions</span><h3>{industry.label}</h3><Link className="button small" href={industryHref} onClick={close}>Explore <ArrowRight size={17}/></Link></div></div><div className="mega-catalogue"><Link href="/products" onClick={close}>Explore filtration products <ArrowUpRight size={20}/></Link></div></div>
 </div>);
 return <><div className="topbar"><span>Air, liquid and nonwoven filtration for your needs.</span><a href="/products">Explore our product catalogue <ArrowUpRight size={12}/></a></div><header ref={headerRef} onBlur={event => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setActive(null); }}><div className="nav-wrap"><Brand/><nav className={open ? 'nav open' : 'nav'} aria-label="Main navigation"><Link onMouseEnter={() => setActive(null)} onClick={close} href="/#about">About us</Link>{(['industries', 'products'] as const).map(menu => <div className="nav-dropdown" key={menu} onMouseEnter={() => { if (hoverCapable()) show(menu); }} onMouseLeave={() => { if (hoverCapable()) { cancelHoverClose(); hoverTimer.current = setTimeout(() => setActive(null), 180); } }}><button className={'nav-trigger' + (active === menu ? ' active' : '')} aria-expanded={active === menu} aria-controls={'mega-' + menu} onClick={() => { if (hoverCapable()) show(menu); else active === menu ? setActive(null) : show(menu); }}>{menu === 'industries' ? 'Industries' : 'Our products'}<ChevronDown size={15}/></button>{renderMenu(menu)}</div>)}<Link onMouseEnter={() => setActive(null)} onClick={close} href="/#technology">Our technology</Link><Link onMouseEnter={() => setActive(null)} onClick={close} href="/#contact" className="button small">Let’s talk <ArrowUpRight size={17}/></Link></nav><button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => { setOpen(!open); setActive(null); }}>{open ? <X/> : <Menu/>}</button></div></header>{displayed && <button tabIndex={-1} className={'mega-backdrop' + (!active ? ' menu-closing' : '')} aria-label="Close expanded navigation" onClick={() => setActive(null)}/>}</>;
}

