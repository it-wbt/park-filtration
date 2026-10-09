'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {ArrowUpRight,Pause,Play} from 'lucide-react';

export default function MediaProcessFilm(){
 const video=useRef<HTMLVideoElement>(null);const [playing,setPlaying]=useState(false);const manualPause=useRef(false);
 useEffect(()=>{const element=video.current;if(!element)return;const preference=matchMedia('(prefers-reduced-motion:reduce)');let visible=false;
 const connection=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection;
 const sync=()=>{if(visible&&!document.hidden&&!preference.matches&&!connection?.saveData&&!manualPause.current){if(!element.getAttribute('src')){element.src='/videos/media-process.mp4';element.load();}element.play().catch(()=>{});}else element.pause();};
 const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();},{threshold:.15});observer.observe(element);preference.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
 return()=>{observer.disconnect();preference.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);element.pause();};},[]);
 return <section className="section media-process-section"><div className="media-process-banner"><div className="media-process-copy"><span className="eyebrow">FROM FIBRE TO FILTER</span><h2>Filtration materials.</h2><p>The material inside a filter shapes how it works. Explore the journey from fibre structure and nonwoven construction to filter media and the finished product.</p><Link href="/filtration-media#media-architecture" className="underlined-link">Explore our media <ArrowUpRight size={17}/></Link></div><div className="media-process-visual"><video ref={video} poster="/videos/media-process-poster.webp" muted loop playsInline preload="none" aria-label="Illustrated fibre to filter manufacturing process" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}/><button aria-label={playing?'Pause filtration process video':'Play filtration process video'} onClick={()=>{if(playing){manualPause.current=true;video.current?.pause();}else{manualPause.current=false;if(video.current&&!video.current.getAttribute('src')){video.current.src='/videos/media-process.mp4';video.current.load();}video.current?.play().catch(()=>{});}}}>{playing?<Pause size={15}/>:<Play size={15}/>}<span>{playing?'Pause':'Play'}</span></button></div></div><p className="media-process-note">Illustrated process overview. Actual media construction depends on the selected filter.</p></section>;
}
