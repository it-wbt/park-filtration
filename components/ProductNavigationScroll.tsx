'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function ProductNavigationScroll() {
 const pathname = usePathname();
 const destination = useRef<string | null>(null);
 useEffect(()=>{
  const track = (event:MouseEvent)=>{
   if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
   const anchor=(event.target as Element)?.closest<HTMLAnchorElement>('a[href]');
   if(!anchor||anchor.hasAttribute('download')||(anchor.target&&anchor.target!=='_self'))return;
   const url=new URL(anchor.href,location.href);
   destination.current=url.origin===location.origin&&url.pathname.startsWith('/products/')&&!url.hash&&url.pathname!==location.pathname?url.pathname:null;
  };
  document.addEventListener('click',track,true);
  return()=>document.removeEventListener('click',track,true);
 },[]);
 useLayoutEffect(()=>{
  if(destination.current!==pathname)return;
  destination.current=null;
  // Override global smooth scrolling for a new product, preserving anchors and Back.
  window.scrollTo({top:0,left:0,behavior:'instant'});
  const frame=requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:'instant'}));
  return()=>cancelAnimationFrame(frame);
 },[pathname]);
 return null;
}
