import Image from 'next/image';
import { ArrowUpRight, Download } from 'lucide-react';
import './brochure-feature.css';

export default function BrochureFeature({ headingId, embedded = false }: { headingId: string; embedded?: boolean }) {
  return <section className={`brochure-feature${embedded ? ' brochure-feature--embedded' : ' section'}`} aria-labelledby={headingId}>
    <div className="brochure-feature-inner">
      <a className="brochure-feature-cover" href="/brochures/park-group-brochure.pdf" target="_blank" rel="noopener noreferrer" aria-label="View PARK Nonwoven brochure PDF in a new tab">
        <Image src="/brochures/park-group-brochure-cover.webp" alt="Cover of the PARK Nonwoven catalogue" width={612} height={792} sizes="(max-width: 760px) 90px, 130px"/>
      </a>
      <div className="brochure-feature-copy">
        <h2 id={headingId}>PARK Group brochure</h2>
        <p>View the original PARK Nonwoven catalogue.</p>
        <div className="brochure-feature-actions">
          <a href="/brochures/park-group-brochure.pdf" target="_blank" rel="noopener noreferrer" className="button" aria-label="View PARK Nonwoven brochure PDF in a new tab">View brochure <ArrowUpRight size={18}/></a>
          <a href="/brochures/park-group-brochure.pdf" download className="underlined-link">Download PDF (15.8 MB) <Download size={17}/></a>
        </div>
      </div>
    </div>
  </section>;
}
