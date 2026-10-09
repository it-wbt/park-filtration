const {chromium}=require('@playwright/test');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:900}});
  let succeed=false,calls=0;
  await page.route('https://formsubmit.co/ajax/**',async route=>{
   await new Promise(resolve=>setTimeout(resolve,150));calls++;const data=route.request().postDataJSON();
   assert.equal(data.email,'buyer@example.com');assert.equal(data.name,'Buyer');
   await route.fulfill({status:succeed?200:500,contentType:'application/json',body:JSON.stringify({success:succeed?'true':'false'})});
  });
  for(const path of ['/','/products/panel-filter']){
   await page.goto('http://localhost:3100'+path);
   await page.waitForTimeout(1500);
   if(await page.getByRole('button',{name:'Close events'}).isVisible())await page.getByRole('button',{name:'Close events'}).click();
   const form=page.locator(path==='/'?'.contact-enquiry-card':'.product-enquiry form');
   await form.locator('[name=name]').fill('Buyer');
   await form.locator('[name=email]').fill('buyer@example.com');
   await form.locator('textarea').fill('Need replacement filters for our system');
   succeed=false;
   await form.locator('button[type=submit]').click();
   await form.getByRole('status').filter({hasText:'could not be submitted'}).waitFor();
   assert.equal(await form.locator('[name=name]').inputValue(),'Buyer');
   assert.equal(await form.locator('textarea').inputValue(),'Need replacement filters for our system');
   succeed=true;
   await form.locator('button[type=submit]').click();
   await form.evaluate(element=>element.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})));
   await form.getByRole('status').filter({hasText:'has been submitted'}).waitFor();
   assert.equal(await form.locator('[name=name]').inputValue(),'');
   assert.equal(await form.locator('[name=email]').inputValue(),'');
   assert.equal(await form.locator('textarea').inputValue(),'');
   assert.equal(new URL(page.url()).pathname,path);
   console.log('PASS',width,path,'failure retains inputs; success resets; no email app navigation');
  }
  assert.equal(calls,4);
  await page.close();
 }
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
