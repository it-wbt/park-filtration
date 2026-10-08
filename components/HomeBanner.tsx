'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {ChevronLeft, ChevronRight, Pause, Play} from 'lucide-react';
import {industries, toSlug} from '../lib/products';
import './home-banner.css';
import ShowcaseVideo from './ShowcaseVideo';

const slides = [
  {title: 'Innovating filtration for\na cleaner world', description: 'Explore air filters, liquid filters and nonwoven media for your vehicles, buildings and industrial processes.', image: '/images/image1.webp', alt: 'A winding road through a green forest', href: '/products', action: 'Explore products'},
  {title: 'With you the\nwhole way', description: 'From manufacturing to transportation, find filtration options for your equipment and working environment.', image: '/images/image8.webp', alt: 'Freight train travelling through a green landscape', href: '/industries/mobility', action: 'Explore mobility'},
  {title: 'Better air for\nevery journey', description: 'PARK cabin air filters help reduce dust and pollen entering vehicle cabins. Explore particle and activated carbon media options.', image: '/images/image7.webp', alt: 'Children travelling together in a vehicle cabin', href: '/products/cabin-air-filter', action: 'Explore cabin filters'},
];
const bannerVideos = [
  {src: '/videos/home/city-highway.mp4', poster: '/videos/home/city-highway-poster.jpg'},
  {src: '/videos/home/scenic-train.mp4', poster: '/videos/home/scenic-train-poster.jpg'},
  {src: '/videos/home/family-cabin.mp4', poster: '/videos/home/family-cabin-poster.jpg'},
];

export default function HomeBanner() {
  const showcase = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
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
    if (paused || interacting || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(value => (value + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, interacting]);
  const slide = slides[active];
  const move = (direction: number) => {setActive(value => (value + direction + slides.length) % slides.length);};
  return <div ref={showcase} className="home-showcase">
    <section className="park-banner" aria-label="PARK filtration highlights" aria-roledescription="carousel" onMouseEnter={() => setInteracting(true)} onMouseLeave={() => setInteracting(false)} onFocusCapture={() => setInteracting(true)} onBlurCapture={event => {if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);}}>
      <ShowcaseVideo key={active} className="park-banner-video" src={bannerVideos[active].src} highResolutionSrc={bannerVideos[active].src.replace('.mp4', active === 0 ? '-hd.mp4' : '-4k.mp4')} poster={bannerVideos[active].poster} paused={paused}/>
      <div className="park-banner-panel"/>
      <div key={`copy-${active}`} className="park-banner-copy" aria-live={paused ? 'polite' : 'off'}>
        <span className="park-banner-eyebrow"><span/>PARK / FILTRATION SOLUTIONS</span>
        <h1>{slide.title}</h1><p>{slide.description}</p>
        <Link href={slide.href} className="park-banner-link">{slide.action} <ChevronRight size={18}/></Link>
      </div>
      <div className="park-banner-arrows"><span className="park-banner-count">0{active + 1}<span> / 03</span></span><button onClick={() => move(-1)} aria-label="Previous banner"><ChevronLeft/></button><button onClick={() => move(1)} aria-label="Next banner"><ChevronRight/></button></div>
    </section>
    <div className="park-banner-controls">
      <div className="park-banner-dots">{slides.map((item, index) => <button key={item.image} aria-label={`Show banner ${index + 1}: ${item.title.replace('\n', ' ')}`} aria-pressed={active === index} onClick={() => {setActive(index);}}><span/></button>)}</div>
      <button className="park-banner-pause" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Play showcase videos and slideshow' : 'Pause showcase videos and slideshow'}>{paused ? <Play size={14}/> : <Pause size={14}/>}</button>
    </div>
    <section id="industries" className="park-industry-shortcuts" aria-labelledby="industry-shortcuts-title">
      <span className="park-industry-kicker">FIND YOUR INDUSTRY</span>
      <h2 id="industry-shortcuts-title">Innovation in filtration for every industry</h2>
      <p>Advanced materials. Smarter filtration. Cleaner solutions.</p>
      <div className="park-industry-cards">{industries.map((industry, index) => <Link key={industry.name} href={`/industries/${toSlug(industry.name)}`} className="park-industry-card"><ShowcaseVideo src={`/videos/industries/${toSlug(industry.name)}.mp4`} poster={`/videos/industries/${toSlug(industry.name)}-poster.jpg`} paused={paused}/><span className="park-industry-number" aria-hidden="true">0{index + 1}</span><div className="park-industry-card-copy"><h3>{industry.name}</h3><span className="park-industry-discover">Explore solutions <span className="park-industry-arrow"><ChevronRight size={19}/></span></span></div></Link>)}</div>
    </section>
  </div>;
}
