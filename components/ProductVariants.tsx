'use client';

import {useState} from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import {ArrowUpRight, ChevronLeft, ChevronRight} from 'lucide-react';

type Variant = {name: string; image?: string; explanation: string; href?: string};

export default function ProductVariants({variants, heading = 'Explore the variants', id = 'product-variants', related = false}: {variants: Variant[]; heading?: string; id?: string; related?: boolean}) {
  const [active, setActive] = useState(0);
  const variant = variants[active];
  const move = (direction: number) => setActive((active + direction + variants.length) % variants.length);

  return <section className="product-variants variant-showcase" id={id} aria-labelledby={`${id}-heading`}>
    <div className="variant-showcase-heading"><h2 id={`${id}-heading`}>{heading}</h2><span>{related ? 'Explore more filters for your application.' : 'Find the filtration function for your application.'}</span></div>
    <div className="variant-showcase-stage">
      <button className="variant-showcase-arrow" onClick={()=>move(-1)} aria-label={related ? 'Previous related product' : 'Previous variant'}><ChevronLeft size={21}/></button>
      <div className="variant-showcase-copy" aria-live="polite"><span className="eyebrow">{related ? 'PARK FILTRATION SOLUTIONS' : 'FILTRATION OPTIONS'}</span><h3>{variant.name}</h3><p>{variant.explanation}</p><Link className="button" href={variant.href || '#product-enquiry'}>{related ? 'Explore product' : 'Discuss this variant'} <ArrowUpRight size={18}/></Link></div>
      <div className="variant-showcase-image">{variant.image && <NextImage key={variant.image} src={'/images/'+variant.image+'.webp'} alt={variant.name} width={720} height={600} sizes="(max-width:760px) 90vw, 40vw"/>}</div>
      <button className="variant-showcase-arrow" onClick={()=>move(1)} aria-label={related ? 'Next related product' : 'Next variant'}><ChevronRight size={21}/></button>
    </div>
    <div className="variant-showcase-tabs" role="group" aria-label={related ? 'Choose a related product' : 'Choose a variant'}>{variants.map((entry,index)=><button key={entry.name} aria-pressed={index===active} onClick={()=>setActive(index)}>{entry.name}</button>)}</div>
  </section>;
}
