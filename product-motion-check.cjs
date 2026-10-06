const {chromium}=require('@playwright/test');const assert=require('node:assert/strict');const fs=require('node:fs');
const origin=process.env.TEST_ORIGIN||'http://localhost:3030';const slugs=[...fs.readFileSync('lib/products.ts','utf8').matchAll(/slug:'([^']+)',name:/g)].map(match=>match[1]);
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--enable-unsafe-swiftshader']});const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',error=>errors.push(error.message));page.setDefaultTimeout(20000);
 await page.goto(origin,{waitUntil:'networkidle'});await page.waitForFunction(()=>{const video=document.querySelector('.hero-film');return video&&video.readyState>=2&&!video.paused;});
 assert.equal(await page.locator('.hero-film').evaluate(video=>video.muted&&video.loop&&video.duration>19 && video.duration<24),true);
 await page.getByRole('button',{name:'Pause banner video'}).click();assert.equal(await page.locator('.hero-film').evaluate(video=>video.paused),true);
 await page.evaluate(()=>window.scrollTo(0,1800));await page.waitForTimeout(150);await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(200);assert.equal(await page.locator('.hero-film').evaluate(video=>video.paused),true,'Manual pause must persist');
 await page.getByRole('button',{name:'Play banner video'}).click();await page.waitForFunction(()=>!document.querySelector('.hero-film').paused);
 await page.screenshot({path:'motion-home-desktop.png'});
 for(const slug of slugs){
  await page.goto(origin+'/products/'+slug,{waitUntil:'domcontentloaded'});assert.equal(await page.locator('.studio-canvas canvas').count(),0,'3D should load on demand');
  await page.getByRole('button',{name:'Interactive 3D',exact:true}).click();await page.locator('.studio-controls button').first().waitFor({state:'visible'});await page.waitForFunction(()=>!document.querySelector('.studio-controls button').disabled);await page.waitForTimeout(80);
  assert.equal(await page.locator('.studio-canvas canvas').count(),1,slug);assert.equal(await page.getByText('3D is unavailable on this device.',{exact:false}).count(),0,slug);
  await page.getByRole('button',{name:'Pause rotation',exact:true}).click();
  const before=await page.locator('.studio-canvas').screenshot();await page.getByRole('button',{name:'Explore layers',exact:true}).click();await page.waitForTimeout(500);const after=await page.locator('.studio-canvas').screenshot();assert.notDeepEqual(before,after,slug+' exploded geometry should change');
  await page.getByRole('button',{name:'Zoom in',exact:true}).click();await page.getByRole('button',{name:'Zoom out',exact:true}).click();await page.getByRole('button',{name:'Reset 3D view',exact:true}).click();assert.equal(await page.getByRole('button',{name:'Explore layers',exact:true}).getAttribute('aria-pressed'),'false');
  if(slug==='panel-filter')await page.screenshot({path:'motion-product-desktop.png'});
  await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,slug+' mobile overflow');
  if(slug==='panel-filter')await page.screenshot({path:'motion-product-mobile.png'});
  await page.getByRole('button',{name:'Product photo',exact:true}).click();assert.equal(await page.locator('.studio-canvas canvas').count(),0);await page.setViewportSize({width:1440,height:1000});
 }
 const reduced=await browser.newPage({reducedMotion:'reduce',viewport:{width:390,height:844}});await reduced.goto(origin,{waitUntil:'networkidle'});assert.equal(await reduced.locator('.hero-film').evaluate(video=>video.paused),true);assert.equal(await reduced.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await reduced.screenshot({path:'motion-home-mobile.png'});
 await reduced.goto(origin+'/products/panel-filter');await reduced.getByRole('button',{name:'Interactive 3D',exact:true}).click();await reduced.getByRole('button',{name:'Start rotation',exact:true}).waitFor();await reduced.close();
 const fallback=await browser.newPage();await fallback.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl2'||type==='webgl')return null;return original.call(this,type,...args);};});await fallback.goto(origin+'/products/panel-filter');await fallback.getByRole('button',{name:'Interactive 3D',exact:true}).click();await fallback.getByText('3D is unavailable on this device.',{exact:false}).waitFor();assert.equal(await fallback.locator('.studio-stage img').count(),1);await fallback.close();
 assert.deepEqual(errors,[]);await browser.close();console.log('PASS: 13 lazy 3D models, layer animations, rotation, zoom, reset, photo fallback, mobile layouts, real production video, persistent pause and reduced-motion support.');
})().catch(error=>{console.error(error);process.exit(1);});
