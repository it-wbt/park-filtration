const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
(async () => {
 const logo = fs.readFileSync(path.join(root, 'public/images/park-nonwoven-logo.png')).toString('base64');
 // Use the existing PARK symbol. The wordmark is outside the square viewBox.
 const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="-12 -38 202 202"><image href="data:image/png;base64,' + logo + '" width="768" height="126"/></svg>');
 await sharp(svg).resize(256,256).png().toFile(path.join(root,'app/icon.png'));
 await sharp(svg).resize(180,180).flatten({background:'#ffffff'}).png().toFile(path.join(root,'app/apple-icon.png'));
 const sizes = [16,32,48];
 const images = await Promise.all(sizes.map(size => sharp(svg).resize(size,size).png().toBuffer()));
 const header = Buffer.alloc(6 + 16 * images.length);
 header.writeUInt16LE(1,2); header.writeUInt16LE(images.length,4);
 let offset = header.length;
 images.forEach((image,index) => {
  const position=6+16*index;
  header[position]=sizes[index];header[position+1]=sizes[index];
  header.writeUInt16LE(1,position+4);header.writeUInt16LE(32,position+6);
  header.writeUInt32LE(image.length,position+8);header.writeUInt32LE(offset,position+12);
  offset+=image.length;
 });
 fs.writeFileSync(path.join(root,'app/favicon.ico'),Buffer.concat([header,...images]));
 console.log('Created PARK favicon, app icon and Apple touch icon.');
})().catch(error => {console.error(error);process.exit(1)});
