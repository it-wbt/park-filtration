'use client';
import NextImage from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Box, Image as ImageIcon, Pause, Play, RotateCcw, Layers, ZoomIn, ZoomOut } from 'lucide-react';

export default function Product3D({slug,name,image}:{slug:string;name:string;image:string}) {
  const [view,setView]=useState<'photo'|'model'>('photo');const [ready,setReady]=useState(false);const [error,setError]=useState(false);
  const [playing,setPlaying]=useState(false);const [exploded,setExploded]=useState(false);
  const host=useRef<HTMLDivElement>(null);const action=useRef<{play:(value:boolean)=>void;explode:(value:boolean)=>void;reset:()=>void;zoom:(factor:number)=>void}|null>(null);
  useEffect(()=>{
    if(view!=='model')return;let cancelled=false;let cleanup=()=>{};setReady(false);setError(false);
    Promise.all([import('three'),import('three/addons/controls/OrbitControls.js'),import('../lib/filter-model')]).then(([THREE,{OrbitControls},{createFilterModel,lightFilterScene}])=>{
      if(cancelled||!host.current)return;
      const container=host.current;const scene=new THREE.Scene();lightFilterScene(scene);
      const camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(3.4,2.4,5.6);
      let renderer:InstanceType<typeof THREE.WebGLRenderer>;
      try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});}catch{setError(true);return;}
      renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;container.appendChild(renderer.domElement);
      renderer.domElement.setAttribute('aria-label',`Interactive illustrative 3D model of ${name}`);renderer.domElement.setAttribute('role','img');
      const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.enablePan=false;controls.minDistance=3.2;controls.maxDistance=10;controls.autoRotateSpeed=1.2;
      // One-finger movement scrolls the page; two fingers manipulate the model.
      controls.touches.ONE=THREE.TOUCH.PAN;controls.touches.TWO=THREE.TOUCH.DOLLY_ROTATE;renderer.domElement.style.touchAction='pan-y';
      const filter=createFilterModel(slug);scene.add(filter.model);
      let target=0,current=0,visible=true,active=true,last=performance.now();
      const resize=new ResizeObserver(()=>{const {width,height}=container.getBoundingClientRect();renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();});resize.observe(container);
      const intersection=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});intersection.observe(container);
      const visibility=()=>{active=!document.hidden;};document.addEventListener('visibilitychange',visibility);
      const reduce=matchMedia('(prefers-reduced-motion: reduce)');controls.autoRotate=!reduce.matches;setPlaying(!reduce.matches);
      action.current={play(value){controls.autoRotate=value;},explode(value){target=value?1:0;},zoom(factor){camera.position.multiplyScalar(factor);camera.position.clampLength(3.2,10);controls.update();},reset(){camera.position.set(3.4,2.4,5.6);controls.target.set(0,0,0);target=0;controls.update();setExploded(false);}};
      renderer.setAnimationLoop(()=>{const now=performance.now(),delta=Math.min((now-last)/1000,.05);last=now;if(!visible||!active)return;current=reduce.matches?target:THREE.MathUtils.damp(current,target,6,delta);filter.setExploded(current);controls.update(delta);renderer.render(scene,camera);});
      cleanup=()=>{renderer.setAnimationLoop(null);resize.disconnect();intersection.disconnect();document.removeEventListener('visibilitychange',visibility);controls.dispose();scene.traverse(obj=>{if(obj instanceof THREE.Mesh){obj.geometry.dispose();for(const mat of Array.isArray(obj.material)?obj.material:[obj.material])mat.dispose();}});renderer.dispose();renderer.domElement.remove();action.current=null;};setReady(true);
    }).catch(()=>{if(!cancelled)setError(true);});
    return()=>{cancelled=true;cleanup();};
  },[view,slug,name]);
  return <div className="product-studio">
    <div className="studio-tabs" role="group" aria-label="Product views"><button aria-pressed={view==='photo'} onClick={()=>setView('photo')}><ImageIcon size={15}/>Product photo</button><button aria-pressed={view==='model'} onClick={()=>setView('model')}><Box size={15}/>Interactive 3D</button></div>
    <div className="studio-stage">{view==='photo'||error?<NextImage sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 640px" src={`/images/${image}.webp`} alt={name} width={720} height={600} loading="lazy"/>:<><div className="studio-canvas" ref={host}/>{!ready&&<p className="studio-loading" role="status">Preparing your 3D view…</p>}<span className="studio-watermark">PARK / PRODUCT STUDIO</span></>}</div>
    {view==='model'&&!error&&<><div className="studio-controls" role="group" aria-label="3D model controls"><button disabled={!ready} title={playing?'Pause rotation':'Start rotation'} aria-label={playing?'Pause rotation':'Start rotation'} onClick={()=>{action.current?.play(!playing);setPlaying(!playing);}}>{playing?<Pause size={17}/>:<Play size={17}/>}</button><button disabled={!ready} aria-pressed={exploded} onClick={()=>{action.current?.explode(!exploded);setExploded(!exploded);}}><Layers size={16}/>{exploded?'Assemble':'Explore layers'}</button><span className="studio-toolbar-divider" aria-hidden="true"/><button disabled={!ready} title="Zoom in" aria-label="Zoom in" onClick={()=>action.current?.zoom(.85)}><ZoomIn size={17}/></button><button disabled={!ready} title="Zoom out" aria-label="Zoom out" onClick={()=>action.current?.zoom(1.15)}><ZoomOut size={17}/></button><button disabled={!ready} title="Reset view" aria-label="Reset 3D view" onClick={()=>action.current?.reset()}><RotateCcw size={17}/></button></div><p className="studio-hint">Drag to rotate · Scroll to zoom · Two fingers on mobile</p><p className="studio-note">Illustrative model. Confirm construction and dimensions for your selected product.</p></>}
    {error&&<p className="studio-note" role="status">3D is unavailable on this device. Your product photo is shown above.</p>}
  </div>;
}
