const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const {chromium} = require('@playwright/test');
const context = {exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/products.ts','utf8'), {
 compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022},
}).outputText, context);
const {applicationGroups, applicationProducts} = context.exports;
(async()=>{
 const browser = await chromium.launch({headless:true});
 try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  let checked = 0;
  for (const width of [1440,390]) {
   await page.setViewportSize({width,height:1000});
   for (const menu of ['Industries']) {
    await page.goto('http://localhost:3000');
    if (width===390) await page.getByRole('button',{name:'Open menu',exact:true}).click();
    await page.locator('.nav-trigger').filter({hasText:menu}).click();
    const expanded = page.locator('.mega-menu');
    for (const [industry, groups] of Object.entries(applicationGroups)) {
     await expanded.locator('.mega-category').filter({hasText:industry}).click();
     for (const group of groups) {
      await expanded.getByRole('tab',{name:group.name,exact:true}).click();
      for (const child of group.children || [undefined]) {
       if (child) await expanded.getByRole('tab',{name:child,exact:true}).click();
       const expected = Array.from(applicationProducts(industry,group,child), product => '/products/'+product.slug);
       const actual = await expanded.locator('.mobility-tab-products > a').evaluateAll(links => links.map(link=>link.getAttribute('href')));
       assert.deepEqual(actual,expected,`${width} ${menu} ${industry}/${group.name}/${child||''}`);
       assert.ok((await expanded.locator('.submenu-application-summary').innerText()).length>0);
       checked++;
      }
     }
    }
    if (await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw Error('Horizontal overflow '+width);
    await page.keyboard.press('Escape');
    await expanded.waitFor({state:'detached'});
   }
  }
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({result:'PASS',applicationSelections:checked,checks:['industry application navigation','desktop and mobile','product links','application summaries','Escape dismissal','no horizontal overflow']}));
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
