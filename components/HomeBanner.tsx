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
  {title: 'Filtration Materials', description: 'Filtration materials drives our mission to innovate products that form the heart of every filtration system', context: 'FILTER MEDIA / PROCESS OVERVIEW', href: '/filtration-media', action: 'Explore filter media'},
  {title: 'Innovating filtration for\na cleaner world', description: 'Delivering innovative filtration solutions that enhance air quality, protect equipment, and contribute to a healthier and more sustainable future.', context: 'FILTRATION SOLUTIONS', href: '/products', action: 'Explore products'},
  {title: 'With you the\nWhole way', description: 'From manufacturing to transportation, Our industrial filtration solution help you drive cleaner', context: 'MOBILITY / RAILWAY & AUTOMOTIVE', href: '/industries/mobility', action: 'Explore mobility'},
  {title: 'Better quality\nEvery time for secure world', description: 'No matter what conditions are like outside, Cabin air filters make sure that the air inside the vehicle is clean and pollution free.', context: 'MOBILITY / CABIN AIR FILTERS', href: '/products/cabin-air-filter', action: 'Explore cabin filters'},
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
    <section className={'park-banner' + (active === 2 ? ' park-banner-rail' : '')} aria-label="PARK filtration highlights" aria-roledescription="carousel" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={event => {if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);}}>
      <div className={'park-banner-film' + (active === 2 ? ' park-banner-film-rail' : '') + (fading ? ' is-changing' : '')}>{active === 0 ? <NextImage className="park-banner-video park-banner-process-image" src={bannerMedia[0].poster} alt="Illustrative journey from fibre through nonwoven processing and filter-media roll to a finished filter" width={1672} height={941} sizes="100vw" loading="eager" fetchPriority="high"/> : <ShowcaseVideo key={active} priority className="park-banner-video" src={bannerMedia[active].src} highResolutionSrc={bannerMedia[active].highResolutionSrc} poster={bannerMedia[active].poster} paused={paused}/>}</div>
      <div className="park-banner-panel"/>
      <div className={'park-banner-copy' + (fading ? ' is-changing' : '')} aria-live={paused ? 'polite' : 'off'}>
        <h1>{slide.title}</h1><p>{active === 0 ? <>Filtration materials drives our mission to <strong><u>innovate products</u></strong> that form the heart of every filtration system</> : active === 2 ? <>From manufacturing to transportation,<br/>Our industrial filtration solution help you drive cleaner</> : slide.description}</p>
        <Link href={slide.href} className="park-banner-link">{slide.action} <ChevronRight size={18}/></Link>
      </div>
      <div className="park-banner-arrows"><span className="park-banner-count">0{active + 1}<span> / {String(slides.length).padStart(2, "0")}</span></span><button onClick={() => move(-1)} aria-label="Previous banner"><ChevronLeft/></button><button onClick={() => move(1)} aria-label="Next banner"><ChevronRight/></button></div>
    </section>
    <div className="park-banner-controls">
      <div className="park-banner-dots">{slides.map((item, index) => <button key={item.href} aria-label={`Show banner ${index + 1}: ${item.title.replace('\n', ' ')}`} aria-pressed={active === index} onClick={() => {selectSlide(index);}}><span/></button>)}</div>
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
