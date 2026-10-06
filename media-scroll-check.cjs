const {chromium}=require('@playwright/test');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const route of ['/','/filtration-media']){
  await page.setViewportSize({width:1440,height:900});await page.goto('http://localhost:3030'+route,{waitUntil:'domcontentloaded'});
  const section=page.locator('#media-architecture');await page.waitForFunction(()=>document.querySelector('#media-architecture')?.dataset.scrollMotion==='true');
  const metrics=await section.evaluate(e=>({top:e.getBoundingClientRect().top+scrollY,stage:e.querySelector('.architecture-stage').offsetHeight,distance:e.offsetHeight-e.querySelector('.architecture-stage').offsetHeight}));
  const scroll=async fraction=>{await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),metrics.top-88+metrics.distance*fraction);await page.waitForTimeout(150);};
  await scroll(.1);const beginning=await section.locator('.architecture-sector-path').evaluateAll(nodes=>nodes.map(n=>Number(n.style.strokeDashoffset)));
  await scroll(.55);const middle=await section.locator('.architecture-sector-path').evaluateAll(nodes=>nodes.map(n=>Number(n.style.strokeDashoffset)));
  assert.ok(middle[0]<beginning[0]);assert.ok(middle[5]<beginning[5]);
  const frozen=await section.getAttribute('data-scroll-progress');await page.waitForTimeout(700);assert.equal(await section.getAttribute('data-scroll-progress'),frozen,'Animation must follow scroll, not elapsed time');
  assert.ok(Math.abs(await section.locator('.architecture-stage').evaluate(e=>e.getBoundingClientRect().top)-88)<2,'Stage stays pinned');
  await scroll(1);assert.equal(await section.locator('.architecture-sector-path').evaluateAll(nodes=>nodes.every(n=>Number(n.style.strokeDashoffset)<.01)),true);
  for(const button of await section.locator('.architecture-sector').all()){await button.locator('text').click();assert.equal(await button.getAttribute('aria-pressed'),'true');}
  await scroll(.25);const reversed=await section.locator('.architecture-sector-path').evaluateAll(nodes=>nodes.map(n=>Number(n.style.strokeDashoffset)));assert.ok(reversed[10]>.9,'Reverse scroll reverses drawing');
  await section.getByRole('button',{name:'Pause media animation',exact:true}).click();const paused=await section.getAttribute('data-scroll-progress');await scroll(.7);assert.equal(await section.getAttribute('data-scroll-progress'),paused);await section.getByRole('button',{name:'Play media animation',exact:true}).click();
  if(route==='/'){await scroll(.9);await section.getByRole('button',{name:'Materials',exact:true}).click();await page.screenshot({path:'media-scroll-desktop.png'});}
 }
 for(const [width,height] of [[1920,1080],[1440,900],[1366,768]]){
  await page.setViewportSize({width,height});await page.goto('http://localhost:3030',{waitUntil:'domcontentloaded'});await page.waitForTimeout(300);
  const section=page.locator('#media-architecture');const dimensions=await section.evaluate(e=>({stage:e.querySelector('.architecture-stage').offsetHeight,wheel:e.querySelector('.architecture-wheel').offsetHeight}));
  assert.ok(dimensions.stage<=height-88+4,JSON.stringify({width,height,...dimensions}));assert.ok(dimensions.wheel>=Math.min(500,height-425),JSON.stringify(dimensions));
  console.log('Fit and large diagram:',width,height,dimensions);
 }
 for(const width of [390,320]){
  await page.setViewportSize({width,height:844});await page.goto('http://localhost:3030/filtration-media',{waitUntil:'domcontentloaded'});await page.waitForTimeout(300);
  const section=page.locator('#media-architecture');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  assert.equal(await section.locator('.architecture-stage').evaluate(e=>getComputedStyle(e).position),'static');
  await section.locator('.architecture-wheel').scrollIntoViewIfNeeded();await page.waitForTimeout(200);await section.getByRole('button',{name:'Enhancements',exact:true}).click();await section.getByRole('group',{name:'Enhancements options'}).getByRole('button',{name:'Electret',exact:true}).click();assert.equal(await section.locator('.architecture-selection h3').textContent(),'Electret');
  if(width===390)await section.locator('.architecture-wheel-card').screenshot({path:'media-scroll-mobile.png'});
 }
 const reduced=await browser.newPage({reducedMotion:'reduce'});await reduced.goto('http://localhost:3030/filtration-media',{waitUntil:'domcontentloaded'});await reduced.waitForTimeout(300);assert.equal(await reduced.locator('#media-architecture').getAttribute('data-scroll-motion'),'false');assert.equal(await reduced.locator('.architecture-sector-path').evaluateAll(nodes=>nodes.every(n=>Number(n.style.strokeDashoffset)===0)),true);
 const plain=await browser.newPage({javaScriptEnabled:false});await plain.goto('http://localhost:3030/filtration-media');assert.equal(await plain.locator('.architecture-sector').count(),14);
 assert.deepEqual(errors,[]);await browser.close();console.log('PASS: large viewport-fit diagram, pinned scroll drawing and reverse, no timed progress, pause, all 14 clicks, mobile and reduced motion.');
})().catch(e=>{console.error(e);process.exit(1)});
