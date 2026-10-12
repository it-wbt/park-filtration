// Preserve the alpha channel when preparing product-only images for the website.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const directory = path.resolve(__dirname, '../public/images/products');
async function main() {
  for (const file of fs.readdirSync(directory).filter(name => name.endsWith('.png'))) {
    const input = path.join(directory, file);
    const metadata = await sharp(input).metadata();
    if (!metadata.hasAlpha) throw new Error(`${file} has no transparency`);
    await sharp(input).webp({lossless: true}).toFile(input.replace(/\.png$/, '.webp'));
    console.log(`Prepared ${file}`);
  }
}
main().catch(error => {console.error(error); process.exitCode = 1;});
