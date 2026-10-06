// Check website product facts against the extracted user-supplied presentation.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = require('../lib/catalogue-source.json');
const code = ts.transpileModule(fs.readFileSync(require.resolve('../lib/products.ts'), 'utf8'), {
 compilerOptions: {module:ts.ModuleKind.CommonJS, target:ts.ScriptTarget.ES2022},
}).outputText;
const context = {exports:{}};
vm.runInNewContext(code, context);
const {products, industries, applicationGroups, applicationProducts} = context.exports;
const expected = [...new Set(source.slides.flatMap(slide => slide.products))].sort();
assert.deepEqual(Array.from(products, product => product.slug).sort(), expected);
assert.equal(industries.length, 5);
for (const product of products) {
 assert.ok(product.sourceSlides.length, `Missing source for ${product.slug}`);
 const extractedSlides = source.slides.filter(slide => slide.products.includes(product.slug)).map(slide => slide.number);
 for (const number of extractedSlides) assert.ok(product.sourceSlides.includes(number), `Missing slide ${number}`);
}
const ranges = {
 Mobility:['cabin-air-filter','engine-air-filter','battery-air-filter','car-purifier-filter','panel-filter','filter-mats'],
 Manufacturing:['panel-filter','pocket-filter','hepa-filter','liquid-filter','filter-mats','ceiling-filter'],
 'Heavy Duty Industry':['panel-filter','pocket-filter','bag-filter','cartridge-filter'],
 Living:['panel-filter','pocket-filter','hepa-filter','swimming-pool-filter'],
 Liquid:['liquid-filter'],
};
for (const [industry, slugs] of Object.entries(ranges)) {
 assert.deepEqual(Array.from(products.filter(product => product.categories.includes(industry)), product => product.slug).sort(), slugs.sort());
}
for (const [industry, groups] of Object.entries(applicationGroups)) {
 for (const group of groups) {
  assert.ok(group.summary && group.sourceSlides.length, `Missing application context: ${group.name}`);
  for (const slide of group.sourceSlides) assert.ok(source.slides.some(entry => entry.number === slide));
  for (const slug of group.products) assert.ok(ranges[industry].includes(slug), `${group.name}: product outside industry range`);
 }
}
const applicationSlugs = (industry, name, child) => Array.from(applicationProducts(industry, applicationGroups[industry].find(group => group.name === name), child), product => product.slug);
assert.deepEqual(applicationSlugs('Manufacturing','Paint Booth'), ['pocket-filter','filter-mats','ceiling-filter']);
assert.ok(!applicationSlugs('Living','Hospital').includes('swimming-pool-filter'));
assert.deepEqual(applicationSlugs('Living','House'), ['panel-filter']);
assert.deepEqual(applicationSlugs('Mobility','Automobiles','Two wheeler'), ['engine-air-filter']);
assert.deepEqual(applicationSlugs('Mobility','Railways','Coach'), ['panel-filter','filter-mats']);
const liquid = products.find(product => product.slug === 'liquid-filter');
const liquidSlide = source.slides.find(slide => slide.number === 35).paragraphs.join(' ');
for (const rating of ['1.5','2.5','7.5','10','34']) {
 assert.ok(liquidSlide.includes(rating));
 assert.ok(liquid.specifications.find(spec => spec.label === 'Catalogue micron ratings').value.includes(rating));
}
const pool = products.find(product => product.slug === 'swimming-pool-filter');
assert.equal(pool.specifications, undefined, 'Do not transfer the repeated HEPA specifications to pool filters');
assert.ok(!/HEPA|H14|E10|99\.995|borosilicate/i.test(JSON.stringify(pool)));
console.log(JSON.stringify({result:'PASS',source:source.sourceName,products:products.length,industries:industries.length,checks:['product families','source slide mapping','industry ranges','liquid ratings','pool specification separation']}));
