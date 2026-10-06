const{chromium}=require('@playwright/test');const assert=require('node:assert/strict');
const origin=process.env.TEST_ORIGIN||'http://localhost:3030';
(async()=>{
 const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1440,height:900}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin,{waitUntil:'domcontentloaded'});await page.waitForTimeout(700);
 assert.equal(await page.locator('h1').count(),1);assert.ok((await page.locator('h1').textContent()).includes('Cleaner flow.'));assert.equal(await page.locator('.range-proof strong').allTextContents().then(a=>a.join(',')),'13,5,14');
 const studio=page.locator('#application-studio');await studio.scrollIntoViewIfNeeded();
 for(const[name,count,first]of[['HVAC & controlled air',3,'panel-filter'],['Industrial dust',2,'bag-filter'],['Vehicle cabins',2,'cabin-air-filter'],['Process liquids',1,'liquid-filter']]){
  await studio.getByRole('button',{name,exact:true}).click();await page.waitForTimeout(450);assert.equal(await studio.locator('.studio-product').count(),count);assert.equal(await studio.locator('.studio-product').first().getAttribute('href'),'/products/'+first);assert.ok((await studio.locator('.studio-spec p').textContent()).length>65);
 }
 await studio.getByRole('button',{name:'HVAC & controlled air',exact:true}).click();await page.waitForTimeout(900);await studio.screenshot({path:'industrial-application-desktop.png'});
 const faq=page.locator('.home-buyer-faq details').first();await faq.scrollIntoViewIfNeeded();await faq.locator('summary').focus();await page.keyboard.press('Enter');assert.equal(await faq.getAttribute('open'),'');assert.ok((await faq.locator('p').textContent()).length>140);
 const titles=[];
 for(const route of ['/resources','/resources/panel-pocket-hepa-air-filters','/resources/bag-vs-cartridge-dust-collection','/resources/liquid-bag-filter-selection']){
  const response=await page.goto(origin+route,{waitUntil:'domcontentloaded'});assert.equal(response.status(),200);assert.equal(await page.locator('h1').count(),1);titles.push(await page.title());assert.ok((await page.locator('meta[name=description]').getAttribute('content')).length>90);
  if(route!='/resources'){assert.equal(await page.locator('.resource-article-section').count(),5);assert.ok((await page.locator('article').innerText()).split(/\s+/).length>400);for(const href of await page.locator('.resource-related a.product-card').evaluateAll(a=>a.map(n=>n.getAttribute('href'))))assert.equal((await page.request.get(origin+href)).status(),200);}
 }
 assert.equal(new Set(titles).size,4);
 for(const slug of ['panel-filter','bag-filter','liquid-filter']){await page.goto(origin+'/products/'+slug,{waitUntil:'domcontentloaded'});assert.equal(await page.locator('.product-reading-link').count(),1);}
 for(const[width,height]of[[1920,1080],[1440,900],[390,844],[320,568],[844,390]]){
  await page.setViewportSize({width,height});await page.goto(origin,{waitUntil:'domcontentloaded'});await page.waitForTimeout(700);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Home overflow '+width);
  const fit=await page.locator('.hero-actions').evaluate(e=>{const hero=e.closest('.hero').getBoundingClientRect(),box=e.getBoundingClientRect();return box.bottom<=hero.bottom&&box.left>=hero.left&&box.right<=hero.right});assert.ok(fit,'Hero actions '+width);
  if(width===1920)await page.screenshot({path:'industrial-home-desktop.png'});
  await page.locator('#application-studio').scrollIntoViewIfNeeded();await page.waitForTimeout(800);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Studio overflow '+width);
  if(width===390)await page.locator('#application-studio').screenshot({path:'industrial-application-mobile.png'});
  await page.goto(origin+'/resources/liquid-bag-filter-selection',{waitUntil:'domcontentloaded'});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Guide overflow '+width);
  if(width===390)await page.screenshot({path:'industrial-guide-mobile.png'});
 }
 const plain=await browser.newPage({javaScriptEnabled:false});await plain.goto(origin+'/resources/bag-vs-cartridge-dust-collection',{waitUntil:'domcontentloaded'});assert.equal(await plain.locator('.resource-article-section').count(),5);
 assert.deepEqual(errors,[]);await browser.close();console.log('PASS: four application stories, accurate catalogue counts, FAQ keyboard controls, four resource routes, useful server-rendered content, relevant product links, metadata and responsive layouts.');
})().catch(e=>{console.error(e);process.exit(1)});
