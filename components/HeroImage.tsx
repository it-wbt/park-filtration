'use client';
import NextImage from 'next/image';
import { useEffect, useRef } from 'react';

export default function HeroImage() {
  const image = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const hero = image.current?.closest<HTMLElement>('.hero');
    const header = document.querySelector('header');
    const topbar = document.querySelector('.topbar');
    if (!hero || !header) return;
    const fit = () => hero.style.setProperty('--hero-chrome-height', `${header.getBoundingClientRect().height + (topbar?.getBoundingClientRect().height || 0)}px`);
    const observer = new ResizeObserver(fit);
    observer.observe(header);
    if (topbar) observer.observe(topbar);
    fit();
    return () => observer.disconnect();
  }, []);
  return <NextImage sizes="100vw" ref={image} className="hero-image" src="/images/filtration-materials-hero.webp" alt="Illustrative filtration process: nonwoven fibers, production rollers, media roll and pleated panel filter" width={1280} height={720} loading="eager" fetchPriority="high" />;
}
