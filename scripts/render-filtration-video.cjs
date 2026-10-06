// Local, reproducible product animation. No external video or stock footage.
const fs=require('node:fs');const path=require('node:path');const http=require('node:http');const {spawnSync}=require('node:child_process');const ts=require('typescript');const {chromium}=require('@playwright/test');
const root=path.resolve(__dirname,'..');const out=path.join(root,'public','videos');const frames=path.join(root,'.filtration-frames');fs.mkdirSync(out,{recursive:true});fs.mkdirSync(frames,{recursive:true});
const model=ts.transpileModule(fs.readFileSync(path.join(root,'lib/filter-model.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}).outputText.replace("from 'three'","from '/three.js'");
const html=`<!doctype html><html><head><style>html,body{margin:0;overflow:hidden;background:#071d2a}canvas{display:block}</style></head><body><script type="module">
import * as THREE from '/three.js';import {createFilterModel,lightFilterScene} from '/model.js';
const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setSize(1280,720);renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;document.body.appendChild(renderer.domElement);
const scene=new THREE.Scene();scene.background=new THREE.Color(0x071d2a);scene.fog=new THREE.Fog(0x071d2a,11,22);lightFilterScene(scene);
const camera=new THREE.PerspectiveCamera(36,1280/720,.1,100);camera.position.set(0,3,12);camera.lookAt(0,0,0);
const panel=createFilterModel('panel-filter');panel.model.position.set(2.05,.05,0);scene.add(panel.model);
const cartridge=createFilterModel('swimming-pool-filter');cartridge.model.scale.setScalar(.7);cartridge.model.position.set(4.1,-.1,-.7);scene.add(cartridge.model);
const bag=createFilterModel('liquid-filter');bag.model.scale.setScalar(.58);bag.model.position.set(.05,-.25,-.8);scene.add(bag.model);
const base=new THREE.Mesh(new THREE.CylinderGeometry(3.4,3.4,.09,96),new THREE.MeshStandardMaterial({color:0x102e3b,metalness:.55,roughness:.4}));base.position.set(2,-1.65,0);scene.add(base);
for(const r of [2.2,2.65,3.2]){const ring=new THREE.Mesh(new THREE.TorusGeometry(r,.008,6,96),new THREE.MeshBasicMaterial({color:0x477969,transparent:true,opacity:.45}));ring.rotation.x=Math.PI/2;ring.position.set(2,-1.58,0);scene.add(ring);}
const dustGeo=new THREE.BufferGeometry(),cleanGeo=new THREE.BufferGeometry();const dust=new Float32Array(180*3),clean=new Float32Array(180*3);dustGeo.setAttribute('position',new THREE.BufferAttribute(dust,3));cleanGeo.setAttribute('position',new THREE.BufferAttribute(clean,3));
scene.add(new THREE.Points(dustGeo,new THREE.PointsMaterial({color:0xd5b575,size:.035,transparent:true,opacity:.55})));scene.add(new THREE.Points(cleanGeo,new THREE.PointsMaterial({color:0x91d9b6,size:.028,transparent:true,opacity:.65})));
for(let i=0;i<7;i++){const vertices=[];for(let j=0;j<90;j++){const x=-2+j*.11;vertices.push(x,Math.sin(x*.7+i)*.11+(i-3)*.25,-1.1);}const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));scene.add(new THREE.Line(geo,new THREE.LineBasicMaterial({color:0x86cbb1,transparent:true,opacity:.07})));}
window.renderFrame=(frame)=>{const angle=frame/192*Math.PI*2;panel.model.rotation.set(-.06,Math.sin(angle)*.42-.3,.035);panel.model.position.y=.05+Math.sin(angle)*.08;cartridge.model.rotation.y=-angle*.5;bag.model.rotation.y=Math.sin(angle)*.3;cartridge.model.position.y=-.1+Math.sin(angle+1)*.08;bag.model.position.y=-.25+Math.sin(angle+2)*.07;
for(let i=0;i<180;i++){const seed=(i*73%180)/180,progress=(seed+frame/192)%1;const y=((i*37%127)/127-.5)*3.4,z=((i*19%101)/101-.5)*2-1;dust[i*3]=-3+progress*5;dust[i*3+1]=y+Math.sin(angle+seed*6)*.08;dust[i*3+2]=z;clean[i*3]=2.5+progress*4.5;clean[i*3+1]=y*.85;clean[i*3+2]=z;}
dustGeo.attributes.position.needsUpdate=true;cleanGeo.attributes.position.needsUpdate=true;renderer.render(scene,camera);};window.renderFrame(0);window.filmReady=true;
</script></body></html>`;
(async()=>{
 const server=http.createServer((req,res)=>{res.setHeader('Content-Type',req.url==='/'?'text/html':'text/javascript');if(req.url==='/')res.end(html);else if(req.url==='/model.js')res.end(model);else if(req.url==='/three.js')res.end(fs.readFileSync(path.join(root,'node_modules/three/build/three.module.js')));else if(req.url==='/three.core.js')res.end(fs.readFileSync(path.join(root,'node_modules/three/build/three.core.js')));else{res.statusCode=404;res.end();}});await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader']});const page=await browser.newPage({viewport:{width:1280,height:720}});page.on('pageerror',e=>console.error(e.message));
 try{await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>window.filmReady);for(let i=0;i<192;i++){await page.evaluate(frame=>window.renderFrame(frame),i);await page.screenshot({path:path.join(frames,String(i).padStart(4,'0')+'.png')});if(i%48===0)console.log('Rendered '+i+'/192 frames');}}
 finally{await browser.close();server.close();}
 const binary=spawnSync('python',['-c','import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())'],{encoding:'utf8'}).stdout.trim();if(!binary)throw new Error('Install ffmpeg or imageio-ffmpeg to encode the rendered frames.');
 const result=spawnSync(binary,['-y','-framerate','24','-i',path.join(frames,'%04d.png'),'-c:v','libx264','-pix_fmt','yuv420p','-crf','24','-preset','medium','-movflags','+faststart','-an',path.join(out,'filtration-hero.mp4')],{encoding:'utf8'});if(result.status)throw new Error(result.stderr);
 const poster=spawnSync(binary,['-y','-i',path.join(frames,'0000.png'),'-frames:v','1','-q:v','3',path.join(out,'filtration-hero-poster.jpg')],{encoding:'utf8'});if(poster.status)throw new Error(poster.stderr);
 for(const name of fs.readdirSync(frames))if(/^\d{4}\.png$/.test(name))fs.unlinkSync(path.join(frames,name));fs.rmdirSync(frames);
 console.log('Created 8-second 1280×720 filtration banner video ('+Math.round(fs.statSync(path.join(out,'filtration-hero.mp4')).size/1024)+' KB).');
})().catch(error=>{console.error(error);process.exitCode=1;});
