import Image from 'next/image';
import Link from 'next/link';
import {ArrowUpRight, FileText} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StructuredData from '../../components/StructuredData';
import {awards, featuredCertificates, plantCertificates} from '../../lib/certificates';
import {breadcrumb, pageMetadata} from '../../lib/seo';
import './certifications.css';

export const metadata = pageMetadata(
  'Certificates & Awards | PARK Nonwoven Filtration',
  'Explore certificates for named PARK Group entities and plants, plus export awards presented to P.A.R.K. Industries Private Limited.',
  '/certifications',
  '/certificates/previews/park-industries-karnal-zed-gold.webp',
);

export default function CertificationsPage() {
  return <><Header/><main id="main-content" className="section certificates-page">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Certificates &amp; awards</span></nav>
    <div className="certificates-hero">
      <div><div className="eyebrow">PARK GROUP DOCUMENTS</div><h1>Certificates &amp; <span>recognition.</span></h1></div>
      <p>Explore the certificates supplied for named plants and legal entities, along with awards presented to P.A.R.K. Industries Private Limited. Open any document to see its exact scope and dates.</p>
    </div>

    <section className="certificates-section" aria-labelledby="karnal-certificates">
      <div className="certificates-section-heading"><div><div className="eyebrow">BEGAMPUR, KARNAL</div><h2 id="karnal-certificates">P.A.R.K. Industries Pvt. Ltd.</h2></div><p>Documents for the Begampur plant in Karnal, Haryana.</p></div>
      <div className="certificates-featured-grid">{featuredCertificates.map(certificate =>
        <article className="certificate-featured" key={certificate.file}>
          <div className="certificate-featured-image"><Image src={`/certificates/previews/${certificate.image}`} alt={`${certificate.title} certificate for the Begampur, Karnal plant`} width={900} height={900} sizes="(max-width: 640px) 85vw, (max-width: 1000px) 42vw, 22vw"/></div>
          <div className="certificate-featured-copy"><span>{certificate.type}</span><h3>{certificate.title}</h3><a href={`/certificates/${certificate.file}`} target="_blank" rel="noopener noreferrer" aria-label={`View ${certificate.title} document for the Begampur, Karnal plant (opens PDF in a new tab)`}>View document <ArrowUpRight size={17}/></a></div>
        </article>
      )}</div>
    </section>

    <section className="certificates-section" aria-labelledby="other-plant-certificates">
      <div className="certificates-section-heading"><div><div className="eyebrow">DOCUMENTS BY LOCATION</div><h2 id="other-plant-certificates">Other plant certificates</h2></div><p>Each PDF identifies the certified entity, site and activities covered.</p></div>
      <div className="certificate-plant-grid">{plantCertificates.map(group =>
        <article className="certificate-plant" key={`${group.entity}-${group.site}`}>
          <span className="certificate-plant-site">{group.site}</span><h3>{group.entity}</h3>
          <ul>{group.documents.map(document => <li key={document.file}><FileText size={17} strokeWidth={1.5}/><a href={`/certificates/${document.file}`} target="_blank" rel="noopener noreferrer" aria-label={`View ${document.title} certificate for ${group.entity}, ${group.site} (opens PDF in a new tab)`}>{document.title}<ArrowUpRight size={16}/></a></li>)}</ul>
        </article>
      )}</div>
    </section>

    <section className="certificates-section" aria-labelledby="park-awards">
      <div className="certificates-section-heading"><div><div className="eyebrow">MATEXIL · 2024–25</div><h2 id="park-awards">Export awards</h2></div><p>Presented to P.A.R.K. Industries Private Limited by the Manmade and Technical Textiles Export Promotion Council.</p></div>
      <div className="certificate-awards-grid">{awards.map(award =>
        <article className="certificate-award" key={award.file}>
          <div className="certificate-award-image"><Image src={`/certificates/previews/${award.image}`} alt={`${award.title} export award certificate`} width={900} height={700} sizes="(max-width: 760px) 90vw, 43vw"/></div>
          <div><span>{award.body}</span><h3>{award.title}</h3><a href={`/certificates/${award.file}`} target="_blank" rel="noopener noreferrer" aria-label={`View ${award.title} export award (opens PDF in a new tab)`}>View award <ArrowUpRight size={17}/></a></div>
        </article>
      )}</div>
      <div className="certificate-trophy"><Image src="/certificates/previews/matexil-trophy-2024-25.webp" alt="Photograph of the MATEXIL export award trophy" width={900} height={900} sizes="(max-width: 760px) 38vw, 120px"/><p>MATEXIL export award trophy, 2024–25.</p></div>
    </section>

  </main><StructuredData data={breadcrumb([{name:'Home',path:'/'},{name:'Certificates & awards',path:'/certifications'}])}/><Footer/></>;
}
