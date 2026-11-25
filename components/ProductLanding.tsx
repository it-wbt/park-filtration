import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import type { Product } from '../lib/products';
import type { ProductLandingContent } from '../lib/product-landings';
import ProductEnquiry from './ProductEnquiry';

export default function ProductLanding({ product, content }: { product: Product; content: ProductLandingContent }) {
  return <>
    <main id="main-content" className="product-landing">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span><Link href="/products">Products</Link><span>/</span><span>{product.name}</span>
      </nav>
      <header className="product-landing-hero">
        <div className="product-landing-copy">
          <span className="eyebrow">PARK NONWOVEN FILTRATION / {product.categories[0].toUpperCase()}</span>
          <h1>{content.h1}</h1>
          <p className="lead">{content.intro}</p>
          <div className="product-landing-actions">
            <a className="button" href="#product-enquiry">Discuss this filter <ArrowUpRight size={17} /></a>
            <Link className="underlined-link" href="/filtration-media">Explore nonwoven filtration media <ArrowUpRight size={16} /></Link>
          </div>
        </div>
        <div className="product-landing-image">
          <Image src={`/images/${product.image}.webp`} alt={product.name} width={720} height={540} priority />
        </div>
      </header>

      <nav className="product-landing-toc" aria-label="Product information">
        <a href="#product-overview">Overview</a><a href="#product-specifications">Specifications</a>
        <a href="#product-applications">Applications</a><a href="#product-faqs">FAQs</a><a href="#product-enquiry">Enquiry</a>
      </nav>

      <div className="product-landing-body">
        <article className="product-landing-article" id="product-overview">
          {content.sections.map((section, index) => <section className="product-landing-section" key={section.title}>
            <span className="product-landing-index">{String(index + 1).padStart(2, '0')}</span>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.paragraphLinks?.map((link) => <p key={link.href}>{link.before}<Link href={link.href}>{link.label}</Link>{link.after}</p>)}
          </section>)}
        </article>
      </div>

      <section className="section product-landing-specs" id="product-specifications">
        <span className="eyebrow">TECHNICAL SPECIFICATION</span>
        <h2>Confirm the product details for your system</h2>
        <p>Catalogue-listed details for this product are shown below. Confirm the selected grade and fit for the specific system before ordering.</p>
        <div className="product-landing-table-scroll" role="region" aria-label={`${product.name} technical specification`} tabIndex={0}>
          <table>
            <tbody>{content.specifications.map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="section product-landing-applications" id="product-applications">
        <span className="eyebrow">APPLICATIONS LISTED IN THE PARK CATALOGUE</span>
        <h2>Start with the equipment and process</h2>
        <ul>{content.applications.map((application) => <li key={application}><Check size={17} />{application}</li>)}</ul>
        <p>Listed applications describe the scope in the supplied product information. Confirm fit, media, grade and operating limits for your specific equipment before ordering.</p>
      </section>

      <section className="section product-landing-faq" id="product-faqs">
        <span className="eyebrow">BUYER QUESTIONS</span>
        <h2>Frequently asked questions</h2>
        {content.faqs.map((faq, index) => <details key={faq.question} open={index === 0}>
          <summary>{faq.question}</summary><p>{faq.answer}</p>
        </details>)}
      </section>

      <section className="section product-landing-resources" aria-labelledby="related-guides-title">
        <h2 id="related-guides-title">Related selection guides</h2>
        <div>{content.resources.map((resource) => <Link key={resource.href} href={resource.href}>{resource.label} <ArrowUpRight size={16} /></Link>)}</div>
      </section>
      <div className="section product-landing-enquiry">
        <h2>{content.ctaHeading ?? 'Discuss this filtration requirement'}</h2>
        <p>{content.ctaText ?? 'Share the system reference, dimensions, required grade or media, process conditions and quantity. PARK can review the listed options and confirm which details need product-specific verification.'}</p>
        <ProductEnquiry product={product.name} variants={product.variants} />
      </div>
    </main>
  </>;
}
