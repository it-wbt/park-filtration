'use client';
import {useEffect, useRef} from 'react';
export default function ShowcaseVideo({src, poster, paused, className, highResolutionSrc, priority = false}: {src: string; poster: string; paused: boolean; className?: string; highResolutionSrc?: string; priority?: boolean}) {
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
  const sync = () => {
   if (disposed) return;
   if (pausedRef.current || !visible || document.hidden || motion.matches || connection?.saveData) {
    clearTimeout(timer); video.pause(); return;
   }
   if (!video.getAttribute('src')) {
    // Let the banner paint before the smaller industry films start downloading.
    clearTimeout(timer);
    timer = setTimeout(() => {
     if (disposed || !visible || pausedRef.current || document.hidden || motion.matches) return;
     const slow = ['slow-2g', '2g', '3g'].includes(connection?.effectiveType || '');
     video.src = highResolutionSrc && innerWidth > 1000 && !slow ? highResolutionSrc : src;
     video.load(); video.play().catch(() => {});
    }, priority ? 0 : 1200);
   } else video.play().catch(() => {});
  };
  syncRef.current = sync;
  const observer = new IntersectionObserver(([entry]) => {visible = entry.isIntersecting; sync();}, {threshold: 0.05});
  observer.observe(video);
  document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', sync);
  return () => {disposed = true; clearTimeout(timer); observer.disconnect(); document.removeEventListener('visibilitychange', sync); motion.removeEventListener('change', sync); video.pause(); syncRef.current = () => {};};
 }, [src, highResolutionSrc, priority]);
 useEffect(() => {syncRef.current();}, [paused]);
 return <video ref={ref} className={className} poster={poster} muted loop playsInline preload="none" aria-hidden="true"/>;
}
