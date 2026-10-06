const { chromium } = require('@playwright/test');
(async()=>{
 const browser=await chromium.launch({headless:true}); const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3005',{waitUntil:'networkidle'});await page.screenshot({path:'desktop-preview.png',fullPage:true});
 await page.getByRole('button',{name:'02 Manufacturing'}).click();await page.getByRole('heading',{name:'Precision starts with purity.'}).waitFor();
 await page.goto('http://localhost:3005/products');await page.getByRole('textbox',{name:'Search products'}).fill('HEPA');await page.waitForTimeout(200);if(await page.locator('.product-card').count()!==1)throw Error('Search failed');
 await page.locator('.product-card').click();await page.getByRole('heading',{name:'HEPA Filters',exact:true}).waitFor();
 for(const url of ['/industries/liquid','/products/swimming-pool-filter','/products/missing']){const r=await page.goto('http://localhost:3005'+url);if(r.status()!==(url.endsWith('missing')?404:200))throw Error('Route status '+url+' '+r.status());}
 await page.setViewportSize({width:390,height:844});await page.goto('http://localhost:3005');await page.screenshot({path:'mobile-preview.png',fullPage:true});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile horizontal overflow');
 await page.getByRole('button',{name:'Open menu'}).click();await page.getByRole('navigation').getByRole('link',{name:'Our products'}).click();await page.getByRole('heading',{name:'Filtration for every possibility.'}).waitFor();
 await page.locator('img').evaluateAll(async imgs=>{await Promise.all(imgs.map(i=>{i.loading='eager';return i.decode().catch(()=>{})}))});
 const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src));if(broken.length)throw Error('Broken images '+broken);
 console.log(JSON.stringify({result:'PASS',checks:['desktop render','industry switch','product search','product detail','industry route','404','mobile render','no horizontal overflow','mobile navigation','product images'],browserErrors:errors}));if(errors.length)process.exitCode=1;await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
