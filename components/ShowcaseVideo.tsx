'use client';

import {useEffect, useRef} from 'react';

export default function ShowcaseVideo({src, poster, paused, className, highResolutionSrc}: {src: string; poster: string; paused: boolean; className?: string; highResolutionSrc?: string}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const sync = () => {
      if (paused || !visible || document.hidden || motion.matches) video.pause();
      else video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {visible = entry.isIntersecting; sync();});
    observer.observe(video);
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', sync);
    sync();
    return () => {observer.disconnect(); document.removeEventListener('visibilitychange', sync); motion.removeEventListener('change', sync); video.pause();};
  }, [paused]);
  return <video ref={ref} className={className} src={highResolutionSrc ? undefined : src} poster={poster} muted loop playsInline preload="metadata" aria-hidden="true">{highResolutionSrc && <><source media="(min-width: 1001px)" src={highResolutionSrc} type="video/mp4"/><source src={src} type="video/mp4"/></>}</video>;
}
