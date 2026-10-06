'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const targets = [
  '.hero-content > .eyebrow', '.hero-content > h1', '.hero-content > p', '.hero-actions',
  '.section-heading > div', '.section-heading > p', '.intro > div',
  '.finder-heading', '.finder-panel', '.industry-list', '.industry-visual',
  '.catalogue-item', '.tech-visual', '.tech-copy', '.process-grid > div',
  '.media-capabilities > div', '.media-parameter-controls', '.media-parameter-panel',
  '.catalogue-invitation > div', '.contact-section > div', '.contact-section > form',
  '.detail-grid > div', '.explanation-columns > div', '.product-benefit-grid > article',
  '.variant-grid > details', '.specifications > h2', '.specifications > dl',
  '.application-box', '.product-selection > div', '.product-selection > ol',
  '.product-faq > h2', '.product-faq > details', '.product-enquiry > div', '.product-enquiry > form',
  '.related-products > h2', '.product-grid > .product-card',
  '.industry-page-hero > div', '.industry-page-hero > img', '.application-grid > article',
  '.guide-step-grid > article', '.guide-comparisons > article', '.guide-grade-section > dl',
  '.enquiry-checklist', '.media-library-grid > details', '.media-library-cta', '.media-path',
  '.architecture-heading', '.architecture-copy > p', '.architecture-priority-heading',
  '.architecture-priority', '.architecture-copy-footer', '.architecture-wheel-card',
  '.application-studio .section-heading', '.studio-controls', '.studio-story', '.studio-product',
  '.resource-card', '.confidence-grid > article', '.home-buyer-faq > div',
  '.resource-article-header', '.resource-takeaways', '.resource-article-section',
  'main > .eyebrow', 'main > h1', 'main > .lead',
  'main > section > h1', 'main > section > h2', 'main > section > .lead',
  '.footer-main > div',
].join(',');

export default function SiteMotion() {
  const pathname=usePathname();const progress=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const preference=matchMedia('(prefers-reduced-motion: reduce)');
    const seen=new WeakSet<Element>();const animations=new Set<Animation>();
    let frame=0,scanFrame=0,disposed=false;
    const updateProgress=()=>{
      frame=0;const distance=document.documentElement.scrollHeight-innerHeight;
      const amount=distance>0?Math.max(0,Math.min(1,scrollY/distance)):0;
      if(progress.current)progress.current.style.transform=`scaleX(${amount})`;
      document.documentElement.toggleAttribute('data-page-scrolled',scrollY>24);
    };
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(updateProgress);};
    const reveal=(element:HTMLElement)=>{
      if(preference.matches||disposed||typeof element.animate!=='function')return;
      // Small distances and a single reveal keep reading and navigation steady.
      const hero=element.closest('.hero-content');
      const siblings=element.parentElement?Array.from(element.parentElement.children).filter(child=>child.matches(targets)):[];
      const delay=Math.min(Math.max(0,siblings.indexOf(element)),hero?3:4)*(hero?85:55);
      element.dataset.motionState='revealed';
      const animation=element.animate([
        {opacity:hero ? .45 : .12,transform:`translate3d(0,${hero?12:22}px,0)`},
        {opacity:1,transform:'translate3d(0,0,0)'},
      ],{duration:hero?650:620,delay,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards',id:'park-scroll-reveal'});
      animations.add(animation);animation.onfinish=()=>animations.delete(animation);animation.oncancel=()=>animations.delete(animation);
    };
    const observer=typeof IntersectionObserver!=='undefined'?new IntersectionObserver(entries=>{
      for(const entry of entries)if(entry.isIntersecting){observer?.unobserve(entry.target);reveal(entry.target as HTMLElement);}
    },{rootMargin:'0px 0px -24px 0px',threshold:0}):null;
    const scan=()=>{
      scanFrame=0;if(disposed||preference.matches||!observer)return;
      document.querySelectorAll<HTMLElement>(targets).forEach(element=>{
        if(seen.has(element)||!element.closest('main, footer')||element.closest('.mega-menu'))return;
        if(element.parentElement?.closest(targets)?.closest('main, footer'))return;
        seen.add(element);element.dataset.motionState='observed';observer.observe(element);
      });
    };
    const mutations=new MutationObserver(records=>{
      if(records.some(record=>record.addedNodes.length)&&!scanFrame)scanFrame=requestAnimationFrame(scan);
    });
    const main=document.querySelector('main');if(main)mutations.observe(main,{childList:true,subtree:true});
    const resize=new ResizeObserver(onScroll);resize.observe(document.body);
    const preferenceChanged=()=>{if(preference.matches){observer?.disconnect();for(const animation of animations)animation.cancel();animations.clear();}else scan();};
    preference.addEventListener('change',preferenceChanged);
    window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);
    scan();updateProgress();
    return()=>{disposed=true;observer?.disconnect();mutations.disconnect();resize.disconnect();preference.removeEventListener('change',preferenceChanged);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);cancelAnimationFrame(frame);cancelAnimationFrame(scanFrame);for(const animation of animations)animation.cancel();animations.clear();};
  },[pathname]);
  return <div className="site-scroll-progress" aria-hidden="true"><div ref={progress}/></div>;
}
