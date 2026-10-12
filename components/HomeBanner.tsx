'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {preload} from 'react-dom';
import {ChevronLeft, ChevronRight, Pause, Play} from 'lucide-react';
import {industries, toSlug} from '../lib/products';
import './home-banner.css';
import ShowcaseVideo from './ShowcaseVideo';
import {industryMedia} from '../lib/industry-media';
import {bannerMedia} from '../lib/banner-media';

const slides = [
  {title: 'Innovating filtration for\na cleaner world', description: 'Explore PARK air filters, liquid filters and nonwoven media for vehicles, buildings and industrial processes.', context: 'FILTRATION SOLUTIONS', href: '/products', action: 'Explore products'},
  {title: 'With you the\nwhole way', description: 'From railway coach ventilation to automotive cabin air, find PARK filtration options for your transport system.', context: 'MOBILITY / RAILWAY & AUTOMOTIVE', href: '/industries/mobility', action: 'Explore mobility'},
  {title: 'Better air for\nevery journey', description: 'PARK cabin air filters help reduce dust and pollen entering vehicle cabins. Explore particle and activated carbon options.', context: 'MOBILITY / CABIN AIR FILTERS', href: '/products/cabin-air-filter', action: 'Explore cabin filters'},
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
    <section className="park-banner" aria-label="PARK filtration highlights" aria-roledescription="carousel" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={event => {if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);}}>
      <div className={'park-banner-film' + (active === 1 ? ' park-banner-film-rail' : '') + (fading ? ' is-changing' : '')}><ShowcaseVideo key={active} priority className="park-banner-video" src={bannerMedia[active].src} highResolutionSrc={bannerMedia[active].highResolutionSrc} poster={bannerMedia[active].poster} paused={paused}/></div>
      <div className="park-banner-panel"/>
      <div className={'park-banner-copy' + (fading ? ' is-changing' : '')} aria-live={paused ? 'polite' : 'off'}>
        <span className="park-banner-eyebrow"><span/>PARK / {slide.context}</span>
        <h1>{slide.title}</h1><p>{slide.description}</p>
        <Link href={slide.href} className="park-banner-link">{slide.action} <ChevronRight size={18}/></Link>
      </div>
      <div className="park-banner-arrows"><span className="park-banner-count">0{active + 1}<span> / 03</span></span><button onClick={() => move(-1)} aria-label="Previous banner"><ChevronLeft/></button><button onClick={() => move(1)} aria-label="Next banner"><ChevronRight/></button></div>
    </section>
    <div className="park-banner-controls">
      <div className="park-banner-dots">{slides.map((item, index) => <button key={item.href} aria-label={`Show banner ${index + 1}: ${item.title.replace('\n', ' ')}`} aria-pressed={active === index} onClick={() => {selectSlide(index);}}><span/></button>)}</div>
      <button className="park-banner-pause" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play showcase videos and slideshow' : 'Pause showcase videos and slideshow'}>{paused ? <Play size={14}/> : <Pause size={14}/>}</button>
    </div>
    <section id="industries" className="park-industry-shortcuts" aria-labelledby="industry-shortcuts-title">
      <span className="park-industry-kicker">FIND YOUR INDUSTRY</span>
      <h2 id="industry-shortcuts-title">Innovation in filtration for every industry</h2>
      <p>Advanced materials. Smarter filtration. Cleaner solutions.</p>
      <div className="park-industry-cards">{industries.map((industry) => <Link key={industry.name} href={`/industries/${toSlug(industry.name)}`} className="park-industry-card"><ShowcaseVideo key={industryMedia[toSlug(industry.name)].src} src={industryMedia[toSlug(industry.name)].src} poster={industryMedia[toSlug(industry.name)].poster} paused={paused}/><span className="park-industry-context">{industryMedia[toSlug(industry.name)].context}</span><div className="park-industry-card-copy"><h3>{industry.name}</h3><span className="park-industry-discover">Explore solutions <span className="park-industry-arrow"><ChevronRight size={19}/></span></span></div></Link>)}</div>
    </section>
  </div>;
}
