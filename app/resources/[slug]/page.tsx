import NextImage from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, Check, ArrowRight } from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import StructuredData from '../../../components/StructuredData';
import { buyerResources } from '../../../lib/buyer-resources';
import { products } from '../../../lib/products';
import { productHref } from '../../../lib/product-routes';
import { pageMetadata, breadcrumb, faqPageSchema, webPageSchema } from '../../../lib/seo';

export function generateStaticParams() {
  return buyerResources.map((resource) => ({ slug: resource.slug }));
}

const resourceSeo: Record<string, { title: string; description: string }> = {
  'paint-booth-filter-guide': {
    title: 'Paint Booth Filter Media: Ceiling Filters & Mats | PARK',
    description: 'Explore PARK PET/PES paint booth filter media, ceiling filters and filter mats. Compare their listed roles, grades and roll or customer-specific cut options, then request a quote.',
  },
  'panel-pocket-hepa-air-filters': {
    title: 'Panel, Pocket & HEPA Air Filters | Buyer Guide | PARK',
    description: 'Compare panel, pocket and HEPA air filters for HVAC. Check listed EN 779 and ISO 16890 references, airflow, filter fit and how to verify PFA, PFAH or HV3 codes.',
  },
  'bag-vs-cartridge-dust-collection': {
    title: 'Baghouse Filter Bags vs Cartridge Filters | PARK Guide',
    description: 'Compare industrial dust-collector bags and cartridge filters by fit, media and process. Learn what to confirm before asking about reuse or recycling.',
  },
  'dust-collector-filter-bag-selection': {
    title: 'Dust Collector Filter Bag Selection | PARK Filtration',
    description: 'Review PARK industrial bag-filter materials, frame options and sizes. Prepare collector, dust and operating details for a product-specific quotation.',
  },
  'liquid-bag-filter-selection': {
    title: 'Liquid Bag Filter Selection: Micron Rating & Fit | PARK',
    description: 'Choose a process liquid bag filter by fluid, micron rating, flow, sealing ring and housing dimensions. Prepare the right details for a filtration enquiry.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = buyerResources.find((item) => item.slug === slug);
  const seo = resourceSeo[slug];

  return resource
    ? pageMetadata(seo?.title ?? `${resource.title} | PARK`, seo?.description ?? resource.description, `/resources/${slug}`)
    : { title: 'Guide not found', robots: { index: false } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = buyerResources.find((item) => item.slug === slug);
  if (!resource) notFound();

  const related = products.filter((product) => resource.products.includes(product.slug));
  const relatedTargets: Record<string, { label: string; href: string }[]> = {
    'paint-booth-filter-guide': [{ label: 'Nonwoven filtration media', href: '/filtration-media' }],
    'panel-pocket-hepa-air-filters': [{ label: 'Nonwoven filtration media', href: '/filtration-media' }],
    'bag-vs-cartridge-dust-collection': [{ label: 'Nonwoven filtration media', href: '/filtration-media' }],
    'dust-collector-filter-bag-selection': [{ label: 'Nonwoven filtration media', href: '/filtration-media' }],
    'liquid-bag-filter-selection': [{ label: 'Nonwoven filtration media', href: '/filtration-media' }],
  };
  const faqs = resource.faqs ?? [{ question: resource.question, answer: resource.answer }];
  const faqSchema = [
    'panel-pocket-hepa-air-filters',
    'bag-vs-cartridge-dust-collection',
    'dust-collector-filter-bag-selection',
  ].includes(slug) ? faqPageSchema(faqs) : null;

  return <>
    <Header />
    <main id="main-content" className="section resource-detail">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span><Link href="/resources">Resources</Link><span>/</span><span>Buying guide</span>
      </nav>
      <div className="resource-article-header">
        <div className="eyebrow">{resource.kicker} / {resource.readTime}</div>
        <h1>{resource.title}</h1>
        <p className="lead">{resource.intro}</p>
      </div>
      <div className="resource-article-layout">
        <article>
          <div className="resource-takeaways">
            <span className="eyebrow">WHAT TO KEEP IN MIND</span>
            {resource.takeaways.map((text) => <p key={text}><Check size={17} />{text}</p>)}
          </div>
          {resource.sections.map((section, index) => <section className="resource-article-section" id={`step-${index + 1}`} key={section.title}>
            <span className="resource-section-index">{String(index + 1).padStart(2, '0')}</span>
            <h2>{section.title}</h2>
            {section.paragraphs.map((text) => <p key={text}>{text}</p>)}
            {section.paragraphLinks?.map((link) => <p key={link.href}>
              {link.before}
              {link.external
                ? <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                : <Link href={link.href}>{link.label}</Link>}
              {link.after}
            </p>)}
            {section.table && <div className="resource-table-scroll" role="region" aria-label={section.table.caption} tabIndex={0}>
              <table className="resource-table">
                <caption>{section.table.caption}</caption>
                <thead><tr>{section.table.headers.map((header) => <th scope="col" key={header}>{header}</th>)}</tr></thead>
                <tbody>{section.table.rows.map((row, rowIndex) => <tr key={`${section.title}-${rowIndex}`}>
                  {row.map((cell, cellIndex) => cellIndex === 0
                    ? <th scope="row" key={`${rowIndex}-${cellIndex}`}>{cell}</th>
                    : <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}
                </tr>)}</tbody>
              </table>
            </div>}
            {section.checks && <ul className="resource-checklist">{section.checks.map((check) => <li key={check}><Check size={16} />{check}</li>)}</ul>}
            {section.productLink && <Link className="underlined-link" href={section.productLink.href}>{section.productLink.label} <ArrowUpRight size={16} /></Link>}
          </section>)}
          <section className="resource-question">
            <h2>Frequently asked questions</h2>
            {faqs.map((faq, index) => <details key={faq.question} open={index === 0}>
              <summary>{faq.question}</summary><p>{faq.answer}</p>
            </details>)}
          </section>
          <div className="resource-source-note">Guidance based on the PARK product catalogue. Confirm selected media, fit, grade and operating conditions with the team before ordering.</div>
        </article>
        <aside className="resource-sidebar">
          <span className="eyebrow">IN THIS GUIDE</span>
          <nav aria-label="Guide contents">{resource.sections.map((section, index) => <a key={section.title} href={`#step-${index + 1}`}><span>{String(index + 1).padStart(2, '0')}</span>{section.title}</a>)}</nav>
          <div className="resource-sidebar-enquiry">
            <h3>Move from a question<br />to a specification.</h3>
            <p>Share your system details and discuss the available product options.</p>
            <Link href="/#contact">Discuss your application <ArrowUpRight size={16} /></Link>
          </div>
        </aside>
      </div>
      <section className="resource-related">
        <div className="section-heading"><h2>Explore the relevant products</h2><Link href="/products" className="underlined-link">Compare the range <ArrowRight size={16} /></Link></div>
        <div className="product-grid">{related.map((product) => <Link key={product.slug} href={productHref(product.slug)} className="product-card">
          <div className="product-image"><NextImage sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 640px" src={`/images/${product.image}.webp`} alt={product.name} width={480} height={360} loading="lazy" /></div>
          <div className="product-info"><h3>{product.name}</h3><p>{product.description}</p></div>
        </Link>)}</div>
        <nav className="resource-product-targets" aria-label="Related product and media pages">
          {(relatedTargets[slug] ?? []).map((target) => <Link key={target.href} href={target.href}>{target.label} <ArrowUpRight size={15} /></Link>)}
        </nav>
      </section>
      {resource.callToAction && <section className="section resource-hub-cta resource-article-cta">
        <h2>{resource.callToAction.title}</h2><p>{resource.callToAction.description}</p>
        <Link href={resource.callToAction.href} className="button">{resource.callToAction.label} <ArrowUpRight size={17} /></Link>
      </section>}
      <Link className="underlined-link" href="/resources">Explore more buying guides <ArrowRight size={17} /></Link>
    </main>
    <StructuredData data={breadcrumb([{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }, { name: resource.title, path: `/resources/${slug}` }])} />
    <StructuredData data={webPageSchema(resource.title, resource.description, `/resources/${slug}`)} />
    <StructuredData data={faqSchema} />
    <Footer />
  </>;
}
