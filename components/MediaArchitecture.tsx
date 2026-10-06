'use client';
import { useEffect, useRef, useState, useId } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Wind, Gauge, Layers, Sparkles, Cpu, Pause, Play } from 'lucide-react';
import { mediaLayers, mediaPriorities } from '../lib/media-architecture';

const polar=(radius:number,angle:number)=>({x:270+radius*Math.cos(angle*Math.PI/180),y:270+radius*Math.sin(angle*Math.PI/180)});
function arc(radius:number,start:number,end:number){const a=polar(radius,start),b=polar(radius,end);return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${radius} ${radius} 0 ${end-start>180?1:0} 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;}
function labelArc(radius:number,start:number,end:number,reverse:boolean){const a=polar(radius,reverse?end:start),b=polar(radius,reverse?start:end);return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${radius} ${radius} 0 0 ${reverse?0:1} ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;}
const icons=[Layers,Cpu,Sparkles];const priorityIcons=[Wind,Gauge,Layers];

export default function MediaArchitecture(){
  const [layer,setLayer]=useState(0),[item,setItem]=useState(0),[priority,setPriority]=useState(0);
  const [preview,setPreview]=useState<{layer:number;item:number}|null>(null);
  const [inView,setInView]=useState(false);
  const [paused,setPaused]=useState(false),[reduced,setReduced]=useState(false);
  const root=useRef<HTMLElement>(null);const unique=useId().replace(/:/g,'');
  useEffect(()=>{const section=root.current;if(!section)return;const observer=new IntersectionObserver(([entry])=>setInView(entry.isIntersecting),{threshold:.1});observer.observe(section);return()=>observer.disconnect();},[]);
  useEffect(()=>{
    const section=root.current;if(!section)return;
    const preference=matchMedia('(prefers-reduced-motion: reduce)');
    const desktop=matchMedia('(min-width: 1100px) and (min-height: 700px)');
    const stage=section.querySelector<HTMLElement>('.architecture-stage');
    const wheel=section.querySelector<HTMLElement>('.architecture-wheel');
    const paths=Array.from(section.querySelectorAll<SVGPathElement>('.architecture-sector-path'));
    let frame=0;
    const clamp=(n:number)=>Math.max(0,Math.min(1,n));
    const render=()=>{
      frame=0;section.dataset.scrollMotion=preference.matches?'false':'true';
      if(stage)section.style.setProperty('--media-stage-height',`${stage.offsetHeight}px`);
      if(paused&&!preference.matches)return;
      const box=section.getBoundingClientRect();
      const header=document.querySelector('header')?.getBoundingClientRect().height||88;
      const distance=section.offsetHeight-(stage?.offsetHeight||0);
      const progress=preference.matches?1:desktop.matches?clamp((header-box.top)/Math.max(1,distance)):clamp((innerHeight*.85-(wheel?.getBoundingClientRect().top||0))/(innerHeight*.65));
      section.dataset.scrollProgress=progress.toFixed(3);
      section.style.setProperty('--media-progress',String(progress));
      section.querySelector<SVGElement>('.architecture-orbit')?.style.setProperty('transform',`rotate(${progress*100}deg)`);
      paths.forEach(path=>{const amount=preference.matches?1:clamp((progress-Number(path.dataset.ring)*.24)/.48);path.style.strokeDashoffset=String(1-amount);});
      const phase=section.querySelector<HTMLElement>('.architecture-scroll-phase');
      if(phase)phase.textContent=progress<.34?'01 / Materials':progress<.68?'02 / Technologies':'03 / Enhancements';
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(render);};
    const update=()=>{setReduced(preference.matches);schedule();};
    const resize=new ResizeObserver(schedule);if(stage)resize.observe(stage);
    update();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
    preference.addEventListener('change',update);
    return()=>{cancelAnimationFrame(frame);resize.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);preference.removeEventListener('change',update);};
  },[paused]);
  const displayLayer=preview?.layer??layer,displayItem=preview?.item??item;
  const selected=mediaLayers[displayLayer].items[displayItem];const CurrentIcon=icons[displayLayer];const choose=(nextLayer:number,nextItem:number)=>{setPreview(null);setLayer(nextLayer);setItem(nextItem);};
  return <section id="media-architecture" ref={root} className="media-architecture" data-paused={paused} data-in-view={inView}>
    <div className="section architecture-stage">
    <div className="architecture-layout">
      <div className="architecture-copy">
    <div className="architecture-heading"><div><div className="eyebrow">THE SCIENCE INSIDE EVERY FILTER</div><h2>Advanced nonwoven media.<br/><span>High-performance filtration.</span></h2></div><Link href="/filtration-media#media-architecture" className="underlined-link">Explore the media possibilities <ArrowUpRight size={17}/></Link></div>
      <p className="architecture-lead">At PARK, nonwoven filtration media are at the heart of every high-performance filtration solution.</p><p>We develop and manufacture advanced nonwoven filtration materials engineered to balance performance, durability and energy efficiency across different applications.</p><div className="architecture-priority-heading"><span>THREE PERFORMANCE PRIORITIES</span><span>01 — 03</span></div>
        <div className="architecture-priorities">{mediaPriorities.map((entry,index)=>{const Icon=priorityIcons[index];return <button key={entry.name} className="architecture-priority" aria-pressed={priority===index} onClick={()=>setPriority(index)}><span className="architecture-priority-icon"><Icon size={21} strokeWidth={1.5}/></span><span><strong>{entry.name}</strong><span className="architecture-priority-text">{entry.text}</span></span><span className="architecture-priority-number">0{index+1}</span></button>;})}</div>
        <div className="architecture-copy-footer"><span className="architecture-small-dot"/><p>Media, treatments and performance are specified for your application.</p><Link href="/#contact">Discuss your requirements <ArrowUpRight size={15}/></Link></div>
      </div>
      <div className="architecture-wheel-card"><div className="architecture-wheel-top"><span>ENGINEER YOUR MEDIA</span><button className="architecture-motion-toggle" disabled={reduced} aria-label={paused?'Play media animation':'Pause media animation'} onClick={()=>setPaused(!paused)}>{paused||reduced?<Play size={12}/>:<Pause size={12}/>}<span>{reduced?'Still view':paused?'Play':'Pause'}</span></button></div>
        <div className="architecture-layer-controls" role="group" aria-label="Explore media design layers">{mediaLayers.map((group,index)=>{const Icon=icons[index];return <button key={group.name} aria-pressed={layer===index} onClick={()=>choose(index,0)}><Icon size={14}/>{group.name}</button>;})}</div>
        <div className="architecture-wheel" onMouseLeave={()=>setPreview(null)}><svg viewBox="0 0 540 540" role="group" aria-label="Interactive nonwoven media diagram: materials, technologies and enhancements">
          <defs><radialGradient id={`core-${unique}`}><stop offset="0" stopColor="#fff"/><stop offset="1" stopColor="#eef5f6"/></radialGradient></defs>
          <circle cx="270" cy="270" r="254" fill="none" stroke="#d8e6e8" strokeWidth="1"/>
          <g className="architecture-orbit" aria-hidden="true"><circle cx="270" cy="270" r="254" fill="none" stroke="#7aa957" strokeWidth="2" strokeDasharray="24 460 5 280"/><circle cx="270" cy="16" r="4" fill="#7aa957"/></g>
          {mediaLayers.map((group,groupIndex)=>{const radius=[125,174,225][groupIndex],width=[38,40,42][groupIndex],step=300/group.items.length;return <g key={group.name}>{group.items.map((entry,index)=>{
            const start=-90+index*step+1.8,end=-90+(index+1)*step-1.8,middle=(start+end)/2;const labelId=`label-${unique}-${groupIndex}-${index}`;const reverse=middle>0&&middle<180;
            const active=displayLayer===groupIndex&&displayItem===index;
            return <g key={entry.name} className={`architecture-sector architecture-ring-${groupIndex}${active?' is-selected':''}`} role="button" tabIndex={0} aria-label={`${group.name}: ${entry.name}`} aria-pressed={layer===groupIndex&&item===index} onMouseEnter={()=>{if(matchMedia('(hover:hover) and (pointer:fine)').matches)setPreview({layer:groupIndex,item:index});}} onFocus={()=>setPreview({layer:groupIndex,item:index})} onBlur={()=>setPreview(null)} onClick={()=>choose(groupIndex,index)} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();choose(groupIndex,index);}}} style={{'--sector-delay':`${groupIndex*170+index*38}ms`} as React.CSSProperties}>
              <path className="architecture-sector-track" d={arc(radius,start,end)} stroke="#e6eff2" strokeWidth={width} fill="none"/>
              <path className="architecture-sector-path" data-ring={groupIndex} d={arc(radius,start,end)} stroke={['#c1dce7','#a0c9dc','#7aafca'][groupIndex]} strokeWidth={width} fill="none" pathLength={1}/>
              <defs><path id={labelId} d={labelArc(radius,start,end,reverse)}/></defs>
              <text className="architecture-sector-label" textAnchor="middle" dominantBaseline="central"><textPath href={`#${labelId}`} startOffset="50%">{entry.short}</textPath></text>
            </g>;
          })}</g>;})}
          
          <circle className="architecture-core" cx="270" cy="270" r="84" fill={`url(#core-${unique})`} stroke="#dce9ed"/>

          <image className="architecture-core-logo" href="/images/park-nonwoven-logo.png" x="201" y="238" width="138" height="23" preserveAspectRatio="xMidYMid meet"><title>PARK Nonwoven</title></image>
          <text x="270" y="285" textAnchor="middle" className="architecture-core-sub">Nonwoven air filter</text>
          <g key={priority} className="architecture-focus-badge"><rect x="232" y="302" width="76" height="23" rx="11.5" fill="#e4edda"/><text x="270" y="317" textAnchor="middle">{mediaPriorities[priority].label}</text></g>
          <g className="architecture-ring-key" aria-hidden="true"><text x="22" y="150">03</text><text x="72" y="181">02</text><text x="119" y="208">01</text></g>
        </svg></div>
        <div className="architecture-scroll-status" aria-hidden="true"><span className="architecture-scroll-phase">01 / Materials</span><span className="architecture-scroll-meter"><i/></span><span>Scroll to build</span></div>
        <p className="architecture-wheel-hint">Hover to preview. Select a segment to explore its role in your filter.</p>
        <div className="architecture-item-choices" role="group" aria-label={`${mediaLayers[layer].name} options`}>{mediaLayers[layer].items.map((entry,index)=><button key={entry.name} aria-pressed={item===index} onClick={()=>choose(layer,index)}>{entry.name}</button>)}</div>
        <div className="architecture-selection" aria-live="polite" aria-atomic="true"><div key={`${displayLayer}-${displayItem}`} className="architecture-selection-content"><span className="architecture-selection-icon"><CurrentIcon size={19}/></span><div><span>{mediaLayers[displayLayer].name} / {mediaLayers[displayLayer].label}</span><h3>{selected.name}</h3><p>{selected.text}</p></div></div></div>
      </div>
    </div>
    </div>
  </section>;
}
