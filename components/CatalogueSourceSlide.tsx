import Link from 'next/link';
import { products } from '../lib/products';
import source from '../lib/catalogue-source.json';

type Slide = typeof source.slides[number];
export default function CatalogueSourceSlide({ slide, prefix = 'slide' }: { slide: Slide; prefix?: string }) {
 return <details className="source-slide" id={prefix + '-' + slide.number}>
  <summary><span className="source-slide-number">{String(slide.number).padStart(2, '0')}</span><span><strong>{slide.title}</strong><small>{slide.section} · {slide.paragraphs.length} original text paragraphs</small></span><span className="source-slide-toggle" aria-hidden="true">+</span></summary>
  <div className="source-slide-body">
   {slide.warning && <p className="source-clarification"><strong>Specification clarification:</strong> {slide.warning}</p>}
   {slide.number === 36 && <p className="source-clarification">These are reference links cited in the supplied presentation. They do not establish a PARK partnership, endorsement or permission to reuse another company's claims.</p>}
   <div className="source-paragraphs">{slide.paragraphs.map((text, index) => <p key={index}>{/^https:\/\/\S+$/.test(text.trim()) ? <a href={text.trim()} target="_blank" rel="noopener noreferrer">{text}</a> : text}</p>)}</div>
   {slide.images.length > 0 && <div className="source-image-gallery">{slide.images.map((asset, index) => <a key={index} href={asset.original} download title="Download original catalogue image">{asset.display ? <img src={asset.display} alt={'Presentation image ' + (index + 1) + ' for ' + slide.title} width={240} height={180} loading="lazy"/> : <span>Original image asset<br/><small>Download to view</small></span>}</a>)}</div>}
   {slide.products.length > 0 && <div className="source-product-links">{slide.products.map(slug => <Link key={slug} href={'/products/' + slug}>{products.find(p => p.slug === slug)?.name} →</Link>)}</div>}
   {slide.links.length > 0 && <details className="source-notes"><summary>Embedded presentation links</summary>{slide.links.map((link, index) => /^https?:\/\//.test(link) ? <p key={index}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></p> : <p key={index}>{link}</p>)}</details>}
   {slide.notes.length > 0 && <details className="source-notes"><summary>Original speaker-note text</summary>{slide.notes.map((note,index) => <p key={index}>{note}</p>)}</details>}
  </div>
 </details>;
}
