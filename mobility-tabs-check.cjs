const {chromium}=require('@playwright/test');
(async()=>{
 const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://localhost:3001',{waitUntil:'networkidle'});await page.getByRole('button',{name:'Industries',exact:true}).click();
 await page.getByRole('tab',{name:'Railways',exact:true}).click();await page.getByRole('tab',{name:'Coach',exact:true}).waitFor();
 await page.getByRole('tab',{name:'Railways',exact:true}).press('ArrowLeft');
 if(await page.getByRole('tab',{name:'Automobiles',exact:true}).getAttribute('aria-selected')!=='true')throw Error('Keyboard application tab failed');
 await page.getByRole('tab',{name:'Passenger Vehicle',exact:true}).focus();await page.keyboard.press('ArrowRight');
 await page.getByRole('heading',{name:'Commercial Vehicle',exact:true}).waitFor();
 if(await page.locator('.mobility-tab-products a').count()!==6)throw Error('Products missing');
 await page.screenshot({path:'mobility-tabs-desktop.png'});
 await page.locator('.mobility-tab-products a').first().click();await page.waitForURL('**/products/panel-filter');
 await page.setViewportSize({width:390,height:844});await page.goto('http://localhost:3001',{waitUntil:'networkidle'});
 await page.getByRole('button',{name:'Open menu'}).click();await page.getByRole('button',{name:'Industries',exact:true}).click();await page.getByRole('tab',{name:'Railways',exact:true}).click();
 await page.getByRole('heading',{name:'Coach',exact:true}).waitFor();
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile overflow');
 await page.locator('.mobility-tab-explorer').scrollIntoViewIfNeeded();await page.screenshot({path:'mobility-tabs-mobile.png'});
 if(errors.length)throw Error(errors.join(';'));await browser.close();console.log('PASS: application and vehicle tabs, keyboard navigation, product links, desktop/mobile, no overflow or browser errors');
})().catch(e=>{console.error(e);process.exit(1)});
