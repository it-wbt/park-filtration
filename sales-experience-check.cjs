const { chromium } = require('@playwright/test');
const assert = require('node:assert/strict');
const source = require('./lib/catalogue-source.json');
const fs = require('node:fs/promises');
const origin = process.env.TEST_ORIGIN || 'http://localhost:3030';

(async () => {
 const browser = await chromium.launch({headless:true});
 const page = await browser.newPage({viewport:{width:1440,height:1000}});
 const errors = [];
 page.on('pageerror', e => errors.push(e.message));
 page.setDefaultTimeout(20000);
 await page.goto(origin + '/catalogue', {waitUntil:'networkidle'});
 assert.equal(await page.locator('h1').count(),1);
 assert.ok(page.url().endsWith('/products'));
 assert.equal(await page.locator('.source-slide').count(),0);
 await page.goto(origin,{waitUntil:'networkidle'});
 await page.locator('.finder-options button').filter({hasText:'Mobility'}).click();
 await page.getByRole('button',{name:'Engine intake air',exact:true}).click();
 assert.equal(await page.locator('.finder-results a').count(),1);
 assert.ok((await page.locator('.finder-results a').getAttribute('href')).endsWith('/engine-air-filter'));
 await page.getByRole('button',{name:'Start again',exact:true}).click();
 assert.equal(await page.locator('.finder-results').count(),0);
 await page.getByRole('button',{name:'02 Low pressure drop',exact:true}).click();
 await page.getByRole('heading',{name:'Keep the flow requirement in view'}).waitFor();
 await page.goto(origin+'/products',{waitUntil:'networkidle'});
 assert.equal(await page.locator('.catalogue-item').count(),13);
 await page.getByRole('searchbox',{name:'Search products'}).fill('PPS');
 assert.equal(await page.locator('.catalogue-item').count(),2);
 await page.getByRole('searchbox',{name:'Search products'}).fill('');
 for(const name of ['Panel Filters','Pocket Filters','HEPA Filters']) await page.getByRole('button',{name:'Compare '+name,exact:true}).click();
 assert.equal(await page.locator('.comparison-scroll thead th').count(),4);
 assert.equal(await page.getByRole('button',{name:'Compare Cabin Air Filters',exact:true}).isDisabled(),true);
 const [download]=await Promise.all([page.waitForEvent('download'),page.getByRole('button',{name:'Save shortlist',exact:true}).click()]);
 assert.equal(download.suggestedFilename(),'park-filtration-shortlist.txt');
 const saved=await fs.readFile(await download.path(),'utf8');assert.ok(saved.includes('HEPA Filters')&&saved.includes('Panel Filters'));
 await page.getByRole('button',{name:'Remove Pocket Filters from comparison',exact:true}).click();
 assert.equal(await page.locator('.comparison-scroll thead th').count(),3);
 await page.getByRole('button',{name:'Clear all',exact:true}).click();
 assert.equal(await page.locator('.comparison-section').count(),0);
 const routes=source.slides.flatMap(s=>s.products);const slugs=[...new Set(routes)];
 for(const slug of slugs){
  const response=await page.goto(origin+'/products/'+slug,{waitUntil:'domcontentloaded'});
  assert.equal(response.status(),200,slug);
  assert.equal(await page.locator('h1').count(),1,slug);
  assert.equal(await page.locator('.product-benefit-grid article').count(),3,slug);
  assert.equal(await page.locator('#product-enquiry').count(),1,slug);
  assert.equal(await page.locator('.product-source-reference, .source-slide').count(),0);
  assert.equal(await page.locator('a[href$=".pptx"]').count(),0);
  await page.setViewportSize({width:390,height:844});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,slug+' mobile overflow');
  await page.setViewportSize({width:1440,height:1000});
 }
 await page.goto(origin+'/products/cabin-air-filter',{waitUntil:'networkidle'});
 assert.equal(await page.locator('.variant-grid details').count(),5);
 await page.locator('.variant-grid details').nth(1).locator('summary').click();
 assert.equal(await page.locator('.variant-grid details').nth(1).getAttribute('open'),'');
 // Prevent invoking an external mail app; verify the composed message instead.
 await page.evaluate(()=>{window.__quoteEmail='';document.querySelector('#product-enquiry form').addEventListener('submit',event=>{event.preventDefault();event.stopImmediatePropagation();window.__quoteEmail=Object.fromEntries(new FormData(event.target));},true);});
 await page.locator('#product-enquiry [name="name"]').fill('Catalogue test');
 await page.locator('#product-enquiry [name="email"]').fill('buyer@example.test');
 await page.locator('#product-enquiry [name="application"]').fill('Passenger cabin filtration, custom size');
 await page.locator('#product-enquiry select').selectOption({label:'Activated carbon filter'});
 await page.getByRole('button',{name:'Prepare quotation email',exact:true}).click();
 assert.equal((await page.evaluate(()=>window.__quoteEmail)).variant,'Activated carbon filter');
 for(const path of ['/','/catalogue','/products','/filtration-media','/resources/filter-selection','/industries/mobility','/industries/manufacturing','/industries/heavy-duty-industry','/industries/living','/industries/liquid']){
  const response=await page.goto(origin+path,{waitUntil:'domcontentloaded'});assert.equal(response.status(),200,path);
  assert.equal(await page.locator('h1').count(),1,path);assert.ok(await page.locator('meta[name="description"]').getAttribute('content'));
  for(const width of [1440,390]){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,path+' overflow at '+width);}
 }
 await page.goto(origin,{waitUntil:'networkidle'});
 await page.getByRole('button',{name:'Open menu',exact:true}).click();await page.getByRole('button',{name:'Industries',exact:true}).click();
 assert.equal(await page.locator('.menu-overview').count(),1);assert.equal(await page.locator('.mobility-application-tabs').count(),0);
 await page.locator('.mega-category').filter({hasText:'Mobility'}).click();await page.getByRole('tab',{name:'Automobiles',exact:true}).click();assert.equal(await page.locator('.mobility-tab-products').count(),0);
 await page.getByRole('tab',{name:'Passenger Vehicle',exact:true}).click();assert.equal(await page.locator('.mobility-tab-products a').count(),4);await page.keyboard.press('Escape');
 await page.setViewportSize({width:1440,height:1000});await page.goto(origin,{waitUntil:'networkidle'});await page.screenshot({path:'sales-home-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'sales-home-mobile.png',fullPage:true});
 await page.goto(origin+'/products/cabin-air-filter',{waitUntil:'networkidle'});await page.screenshot({path:'sales-product-mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);await browser.close();
 console.log('PASS: reference-only presentation; product search; finder; comparison and download; 13 explained products; variants; quote form; all routes and mobile widths; preserved click-only navigation.');
})().catch(e=>{console.error(e);process.exit(1)});
