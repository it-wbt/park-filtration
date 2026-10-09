'use client';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
export default function HeroFilm(){
  const video=useRef<HTMLVideoElement>(null);const manualPause=useRef(false);const [playing,setPlaying]=useState(false);
  useEffect(()=>{
    const hero=video.current?.closest<HTMLElement>('.hero');
    const header=document.querySelector('header');const topbar=document.querySelector('.topbar');
    if(!hero||!header)return;
    const fit=()=>hero.style.setProperty('--hero-chrome-height',`${header.getBoundingClientRect().height+(topbar?.getBoundingClientRect().height||0)}px`);
    const observer=new ResizeObserver(fit);observer.observe(header);if(topbar)observer.observe(topbar);fit();
    return()=>observer.disconnect();
  },[]);
  useEffect(()=>{const element=video.current;if(!element)return;const media=matchMedia('(prefers-reduced-motion: reduce)');let visible=true;const sync=()=>{if(manualPause.current||media.matches||document.hidden||!visible){element.pause();return;}element.play().catch(()=>setPlaying(false));};const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();});observer.observe(element);media.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);sync();return()=>{observer.disconnect();media.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);};},[]);
  return <><video className="hero-film" ref={video} muted loop playsInline preload="metadata" poster="/videos/media-process-poster.webp" aria-hidden="true" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}><source src="/videos/media-process.mp4" type="video/mp4"/></video><button className="hero-film-toggle" aria-label={playing?'Pause banner video':'Play banner video'} onClick={()=>{manualPause.current=playing;if(playing)video.current?.pause();else video.current?.play().catch(()=>setPlaying(false));}}>{playing?<Pause size={14}/>:<Play size={14}/>}<span>{playing?'Pause film':'Play film'}</span></button></>;
}
