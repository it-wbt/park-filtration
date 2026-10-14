'use client';
import { codeFrameColumns } from 'next/dist/build/swc/generated-native';
import {useEffect, useRef} from 'react';
export default function ShowcaseVideo({src, poster, paused, className, highResolutionSrc, priority = false, onTimeUpdate}: {src: string; poster: string; paused: boolean; className?: string; highResolutionSrc?: string; priority?: boolean; onTimeUpdate?: (time: number) => void}) {
 const ref = useRef<HTMLVideoElement>(null);
 const pausedRef = useRef(paused);
 pausedRef.current = paused;
 const syncRef = useRef<() => void>(() => {});
 useEffect(() => {
  const video = ref.current;
  if (!video) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = (navigator as Navigator & {connection?: {saveData?: boolean; effectiveType?: string}}).connection;
  let visible = false, disposed = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const preferredSource = () => {
   const bounds = video.getBoundingClientRect();
   const density = window.devicePixelRatio || 1;
   // Covering a tall banner can require more detail than its width suggests.
   const displayWidth = Math.max(bounds.width, bounds.height * 16 / 9) * density;
   return highResolutionSrc && (bounds.width > 1000 || displayWidth > 1920) ? highResolutionSrc : src;
  };
  const sync = () => {
   if (disposed) return;
   if (pausedRef.current || !visible || document.hidden || motion.matches || connection?.saveData) {
    clearTimeout(timer); video.pause(); return;
   }
   if (video.getAttribute('src') !== preferredSource()) {
    // Let the banner paint before the smaller industry films start downloading.
    clearTimeout(timer);
    timer = setTimeout(() => {
     if (disposed || !visible || pausedRef.current || document.hidden || motion.matches) return;
     video.src = preferredSource();
     video.load(); video.play().catch(() => {});
    }, priority ? 0 : 1200);
   } else video.play().catch(() => {});
  };
  syncRef.current = sync;
  const observer = new IntersectionObserver(([entry]) => {visible = entry.isIntersecting; sync();}, {threshold: 0.05});
  observer.observe(video);
  const sizeObserver = new ResizeObserver(sync);
  sizeObserver.observe(video);
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
  return () => {disposed = true; clearTimeout(timer); observer.disconnect(); sizeObserver.disconnect(); document.removeEventListener('visibilitychange', sync); motion.removeEventListener('change', sync); video.pause(); syncRef.current = () => {};};
 }, [src, highResolutionSrc, priority]);
 useEffect(() => {syncRef.current();}, [paused]);
 return <video ref={ref} className={className} poster={poster} muted loop playsInline preload="none" aria-hidden="true" onTimeUpdate={event => onTimeUpdate?.(event.currentTarget.currentTime)}/>;
}
