const assert=require('node:assert/strict');
const {chromium}=require('@playwright/test');
const names=['Mobility','Manufacturing','Heavy Duty Industry','Living','Liquid'];
(async()=>{
 const browser=await chromium.launch({headless:true});
 try {
  const page=await browser.newPage();const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  for(const width of [1440,390]) {
   await page.setViewportSize({width,height:900});
   await page.goto('http://localhost:3000');
   const section=page.locator('#industries');
   assert.equal(await section.locator('video').getAttribute('src'),null,'Offscreen video should not download');
   await section.scrollIntoViewIfNeeded();
   for(const name of names) {
    await section.locator('.industry-list button').filter({hasText:name}).click();
    await section.locator('.industry-visual').scrollIntoViewIfNeeded();
    const slug=name.toLowerCase().replaceAll(' ','-');
    await page.waitForFunction(slug=>{const video=document.querySelector('.industry-film');return video?.getAttribute('src')==='/videos/industries/'+slug+'.mp4'&&video.readyState>=2&&!video.paused;},slug);
    assert.equal(await section.locator('video').evaluate(v=>v.muted&&v.loop&&v.playsInline&&v.videoWidth===1280&&v.duration>=7.8&&v.duration<=8.1),true);
    assert.equal(await section.locator('.industry-overlay .text-link').getAttribute('href'),'/industries/'+slug);
    await section.getByRole('button',{name:'Pause '+name+' video',exact:true}).click();
    assert.equal(await section.locator('video').evaluate(v=>v.paused),true);
    await section.getByRole('button',{name:'Play '+name+' video',exact:true}).click();
    await page.waitForFunction(()=>!document.querySelector('.industry-film').paused);
   }
   await page.evaluate(()=>window.scrollTo(0,0));
   await page.waitForFunction(()=>document.querySelector('.industry-film').paused);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  }
  const reduced=await browser.newPage({reducedMotion:'reduce'});
  await reduced.goto('http://localhost:3000');await reduced.locator('#industries .industry-visual').scrollIntoViewIfNeeded();
  assert.equal(await reduced.locator('.industry-film').evaluate(v=>v.paused),true);
  await reduced.getByRole('button',{name:'Play Mobility video',exact:true}).click();
  await reduced.waitForFunction(()=>!document.querySelector('.industry-film').paused);
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({result:'PASS',clips:5,checks:['matching tab videos','lazy loading','silent inline playback','pause and resume','pause offscreen','reduced motion','desktop and mobile','industry links']}));
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
