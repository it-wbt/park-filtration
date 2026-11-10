'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import NextImage from 'next/image';
import {preload} from 'react-dom';
import {ChevronLeft, ChevronRight, Pause, Play} from 'lucide-react';
import {industries, toSlug} from '../lib/products';
import './home-banner.css';
import ShowcaseVideo from './ShowcaseVideo';
import {industryMedia} from '../lib/industry-media';
import {bannerMedia} from '../lib/banner-media';

const slides = [
  {description: 'Explore PARK nonwoven air filters for HVAC, vehicles, railways, paint booths and industrial dust collection, plus liquid bag filters and filter media.', context: 'AIR FILTERS / HVAC, VEHICLES & INDUSTRY', href: '/products', action: 'Explore filters'},
  {description: 'Compare product families by application, filter fit, media and operating conditions. Share your system details to start a focused enquiry.', context: 'FILTRATION / CHOOSE YOUR APPLICATION', href: '/products', action: 'Browse product range'},
  {description: 'Explore cabin, engine, battery cooling-air and panel filters for vehicle and railway applications.', context: 'MOBILITY / RAILWAY & AUTOMOTIVE', href: '/industries/mobility', action: 'Explore mobility'},
  {description: 'Compare particulate, activated-carbon, fine-dust and HEPA cabin filter options. Share vehicle and fitment details for confirmation.', context: 'CABIN AIR FILTERS / VEHICLE FITMENT', href: '/products/cabin-air-filter', action: 'Explore cabin filters'},
];

export default function HomeBanner() {
  const showcase = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [fading, setFading] = useState(false);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const selectSlide = useCallback((index: number) => {
    clearTimeout(transitionTimer.current);
    if (index === active) {setFading(false); return;}
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(index); setFading(false); return;
    }
    setFading(true);
    transitionTimer.current = setTimeout(() => {
      setActive(index); setFading(false);
    }, 180);
  }, [active]);
  useEffect(() => () => clearTimeout(transitionTimer.current), []);
  useEffect(() => {
    const header = document.querySelector('header');
    const topbar = document.querySelector('.topbar');
    const fit = () => {
      const height = (header?.getBoundingClientRect().height || 0) + (topbar?.getBoundingClientRect().height || 0);
      showcase.current?.style.setProperty('--showcase-header', `${height}px`);
    };
    const observer = new ResizeObserver(fit);
    if (header) observer.observe(header);
    if (topbar) observer.observe(topbar);
    fit();
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (paused || interacting || fading || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) selectSlide((active + 1) % slides.length);
    }, bannerMedia[active].durationMs);
    return () => window.clearInterval(timer);
  }, [paused, interacting, fading, active, selectSlide]);
  preload(bannerMedia[active].poster, {as: 'image', fetchPriority: 'high'});
  const slide = slides[active];
  const move = (direction: number) => {selectSlide((active + direction + slides.length) % slides.length);};
  return <div ref={showcase} className="home-showcase">
    <section className={'park-banner' + (active === 0 ? ' park-banner-materials' : '') + (active === 2 ? ' park-banner-rail' : '')} aria-label="PARK filtration highlights" aria-roledescription="carousel" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={event => {if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);}}>
      <div className={'park-banner-film' + (active === 2 ? ' park-banner-film-rail' : '') + (fading ? ' is-changing' : '')}>{active === 0 ? <NextImage className="park-banner-video park-banner-process-image" src={bannerMedia[0].poster} alt="Illustrative journey from fibre through nonwoven processing and filter-media roll to a finished filter" width={1672} height={941} sizes="100vw" loading="eager" fetchPriority="high"/> : <ShowcaseVideo key={active} priority className="park-banner-video" src={bannerMedia[active].src} highResolutionSrc={bannerMedia[active].highResolutionSrc} poster={bannerMedia[active].poster} paused={paused}/>}</div>
      <div className="park-banner-panel"/>
      <div className={'park-banner-copy' + (fading ? ' is-changing' : '')} aria-live={paused ? 'polite' : 'off'}>
        <div className="park-banner-eyebrow"><span/>{slide.context}</div><h1>Air Filter Manufacturer in India</h1><p>{slide.description}</p>
        <Link href={slide.href} className="park-banner-link">{slide.action} <ChevronRight size={18}/></Link>
      </div>
      <div className="park-banner-arrows"><span className="park-banner-count">0{active + 1}<span> / {String(slides.length).padStart(2, "0")}</span></span><button onClick={() => move(-1)} aria-label="Previous banner"><ChevronLeft/></button><button onClick={() => move(1)} aria-label="Next banner"><ChevronRight/></button></div>
    </section>
    <div className="park-banner-controls">
      <div className="park-banner-dots">{slides.map((item, index) => <button key={`${item.href}-${index}`} aria-label={`Show banner ${index + 1}: ${item.context}`} aria-pressed={active === index} onClick={() => {selectSlide(index);}}><span/></button>)}</div>
      <button className="park-banner-pause" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play showcase videos and slideshow' : 'Pause showcase videos and slideshow'}>{paused ? <Play size={14}/> : <Pause size={14}/>}</button>
    </div>
    <section id="industries" className="park-industry-shortcuts" aria-labelledby="industry-shortcuts-title">
      <span className="park-industry-kicker">FIND YOUR INDUSTRY</span>
      <h2 id="industry-shortcuts-title">Innovation in filtration for every industry</h2>
      <p>Advanced materials. Smarter filtration. Cleaner solutions.</p>
      <div className="park-industry-cards">{industries.map((industry) => <Link key={industry.name} href={`/industries/${toSlug(industry.name)}`} className="park-industry-card"><ShowcaseVideo key={industryMedia[toSlug(industry.name)].src} src={industryMedia[toSlug(industry.name)].src} poster={industryMedia[toSlug(industry.name)].poster} paused={paused}/><div className="park-industry-card-copy"><h3>{industry.name}</h3><span className="park-industry-discover">Explore solutions <span className="park-industry-arrow"><ChevronRight size={19}/></span></span></div></Link>)}</div>
    </section>
  </div>;
}
