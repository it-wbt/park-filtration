import Image from 'next/image';
import { ArrowUpRight, Download } from 'lucide-react';
import './brochure-feature.css';

export default function BrochureFeature({ headingId, embedded = false }: { headingId: string; embedded?: boolean }) {
  return <section className={`brochure-feature${embedded ? ' brochure-feature--embedded' : ' section'}`} aria-labelledby={headingId}>
    <div className="brochure-feature-inner">
      <div className="brochure-feature-visual">
        <span className="brochure-feature-visual-label">PARK NONWOVEN</span>
        <a className="brochure-feature-cover" href="/brochures/park-group-brochure.pdf" target="_blank" rel="noopener noreferrer" aria-label="View PARK Nonwoven brochure PDF in a new tab">
          <Image src="/brochures/park-group-brochure-cover.webp" alt="Cover of the PARK Nonwoven catalogue" width={612} height={792} sizes="(max-width: 760px) 170px, 230px"/>
        </a>
        <span className="brochure-feature-visual-detail">01 / 16 PAGES</span>
      </div>
      <div className="brochure-feature-copy">
        <div className="brochure-feature-kicker"><span/> PARK GROUP BROCHURE</div>
        <h2 id={headingId}>Explore the <span>PARK catalogue.</span></h2>
        <p>Take a closer look at PARK Nonwoven in the original group brochure.</p>
        <div className="brochure-feature-meta"><span>16 pages</span><span>PDF format</span><span>15.8 MB</span></div>
        <div className="brochure-feature-actions">
          <a href="/brochures/park-group-brochure.pdf" target="_blank" rel="noopener noreferrer" className="button" aria-label="View PARK Nonwoven brochure PDF in a new tab">View brochure <ArrowUpRight size={18}/></a>
          <a href="/brochures/park-group-brochure.pdf" download className="brochure-feature-download"><Download size={17}/> Download PDF</a>
        </div>
      </div>
    </div>
  </section>;
}
