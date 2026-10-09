const {chromium}=require('@playwright/test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch();
 const base=process.env.AUDIT_URL||'http://localhost:3100';
 const results=[];
 for(const mode of ['desktop','mobile','reduced','save-data']){
  const context=await browser.newContext({viewport:mode==='desktop'?{width:1440,height:900}:{width:390,height:844},reducedMotion:mode==='reduced'?'reduce':'no-preference'});
  if(mode==='save-data')await context.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true,effectiveType:'4g'}}));
  const page=await context.newPage();
  const videos=new Set(),failed=[],errors=[];
  page.on('request',r=>{if(r.url().includes('.mp4'))videos.add(new URL(r.url()).pathname)});
  page.on('response',r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()})});
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);
  await page.waitForTimeout(2300);
  if(await page.getByRole('button',{name:'Close events'}).isVisible())await page.getByRole('button',{name:'Close events'}).click();
  const seo=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]')?.content,h1:document.querySelectorAll('h1').length,canonical:document.querySelector('link[rel="canonical"]')?.href||null,overflow:document.documentElement.scrollWidth>innerWidth}));
  assert.equal(seo.h1,1);assert.ok(seo.description);assert.equal(seo.overflow,false);
  assert.ok(![...videos].some(v=>/-4k|-hd\.mp4/.test(v)));
  if(mode==='mobile')assert.equal(videos.size,1,'Offscreen industry videos must not download');
  if(['reduced','save-data'].includes(mode))assert.equal(videos.size,0,'Preference must avoid video downloads');
  if(mode==='desktop'){
   await page.getByRole('button',{name:'Pause showcase videos and slideshow'}).click();
   await page.getByRole('button',{name:'Show HEPA Filters'}).scrollIntoViewIfNeeded();
   await page.getByRole('button',{name:'Show HEPA Filters'}).click();
   await page.waitForFunction(()=>document.querySelector('.highlights-image img')?.complete);
   assert.ok(await page.locator('.highlights-image img').evaluate(i=>i.naturalWidth>0));
   const image=await page.locator('.highlights-image img').getAttribute('src');
   assert.ok(image.includes('.webp'));
  }
  assert.deepEqual(failed,[]);assert.deepEqual(errors,[]);
  results.push({mode,seo,requestedVideos:[...videos]});
  await context.close();
 }
 const page=await browser.newPage();
 for(const path of ['/products','/products/panel-filter','/industries/living','/filtration-media','/resources']){
  await page.goto(base+path);
  const seo=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name="description"]')?.content,h1:document.querySelectorAll('h1').length,images:[...document.images].filter(i=>!i.hasAttribute('alt')).length}));
  assert.equal(seo.h1,1);assert.ok(seo.description);assert.equal(seo.images,0);
  results.push({path,seo});
 }
 const response=await page.request.get(base+'/videos/home/city-highway-mobile.mp4');
 assert.ok(response.headers()['cache-control'].includes('max-age=86400'));
 const sitemap=await (await page.request.get(base+'/sitemap.xml')).text();
 results.push({sitemapUrls:(sitemap.match(/<loc>/g)||[]).length,cache:response.headers()['cache-control']});
 fs.writeFileSync('reference/seo-performance-audit.json',JSON.stringify(results,null,2));
 console.log(JSON.stringify(results,null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
