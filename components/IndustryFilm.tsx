'use client';
import NextImage from 'next/image';
import {useEffect,useRef,useState} from 'react';
import {Pause,Play} from 'lucide-react';
import {toSlug} from '../lib/products';

export default function IndustryFilm({industry}:{industry:string}) {
 const slug=toSlug(industry);
 const video=useRef<HTMLVideoElement>(null);
 const manuallyPaused=useRef(false);
 const manuallyStarted=useRef(false);
 const [visible,setVisible]=useState(false);
 const [activated,setActivated]=useState(false);
 const [playing,setPlaying]=useState(false);
 const [failed,setFailed]=useState(false);
 const poster='/videos/industries/'+slug+'-poster.webp';
 useEffect(()=>{
  const element=video.current;if(!element)return;
  const observer=new IntersectionObserver(([entry])=>{
   setVisible(entry.isIntersecting);
   if(entry.isIntersecting&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!(navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData)setActivated(true);
  },{threshold:0.1});
  observer.observe(element);
  return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
  const element=video.current;if(!element||!activated)return;
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const connection=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection;
  const sync=()=>{
   if(!visible||document.hidden||manuallyPaused.current||((preference.matches||connection?.saveData)&&!manuallyStarted.current))element.pause();
   else element.play().catch(()=>setPlaying(false));
  };
  preference.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);sync();
  return()=>{element.pause();preference.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync);};
 },[activated,visible]);
 return <>{failed?<NextImage sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 640px" src={poster} alt={industry+' application environment'} width={1280} height={720}/>:<video ref={video} className="industry-film" src={activated?'/videos/industries/'+slug+'.mp4':undefined} poster={poster} muted loop playsInline preload="none" aria-hidden="true" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)} onError={()=>setFailed(true)}/>}
 {!failed&&<button className="industry-film-toggle" aria-label={(playing?'Pause ':'Play ')+industry+' video'} onClick={()=>{
  if(playing){manuallyPaused.current=true;video.current?.pause();}
  else {manuallyPaused.current=false;manuallyStarted.current=true;setActivated(true);video.current?.play().catch(()=>setPlaying(false));}
 }}>{playing?<Pause size={14}/>:<Play size={14}/>}<span>{playing?'Pause':'Play'}</span></button>}</>;
}
