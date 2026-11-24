import Link from 'next/link';
import MediaProcessFilm from '../../components/MediaProcessFilm';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MediaExplorer from '../../components/MediaExplorer';
import MediaArchitecture from '../../components/MediaArchitecture';
import StructuredData from '../../components/StructuredData';
import { breadcrumb, faqPageSchema, filtrationMediaCollectionSchema, pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata(
  'Nonwoven Filtration Media Rolls Manufacturer | Air & Liquid Filter Media',
  'Nonwoven filtration media for air and liquid filter applications. Ask about roll goods, GSM, width and cut formats; confirm availability for your selected construction.',
  '/filtration-media',
);

const groups = [
  { name: 'Materials listed for nonwoven filtration media', items: [
    ['PET / polyester', 'PET or polyester is listed in PARK’s nonwoven filtration media range and in several finished filter families. Share the intended air-filter application, grade and format so the construction can be confirmed.'],
    ['PP / polypropylene', 'Polypropylene is listed for nonwoven media and for PARK liquid bag filters. A liquid-bag application does not by itself confirm a raw media-roll format; include the intended product and process in your enquiry.'],
    ['Glass fibre', 'Glass fibre is listed in the filtration media range. The HEPA product information specifies borosilicate micro-glass fibres with synthetic components. Confirm the selected construction and finished-filter application.'],
    ['Activated carbon', 'Activated carbon is listed in PARK vehicle filtration options for adsorption functions addressing certain gases and odours. Confirm the target application and supporting product information; do not infer universal gas-removal performance.'],
  ]},
  { name: 'Nonwoven processes', items: [
    ['Spunlaid', 'Spunlaid is one of the nonwoven processes listed by PARK. Share the required structure and finished-filter purpose to confirm how the listed process relates to your specification.'],
    ['Meltblown', 'Meltblown is included among the listed nonwoven filtration technologies. Request confirmation of the available grade, construction and product format for the application under review.'],
    ['Needle punch', 'Needle punching is a listed process. Describe the intended filtration stage, media construction and operating conditions when discussing a suitable nonwoven option.'],
    ['Thermo bonding', 'Thermo bonding is included in the listed process range. The exact combination of material, structure and final format should be confirmed against the product requirement.'],
  ]},
];

const faqs = [
  { question: 'Which polymers and fibres are listed for PARK filtration media?', answer: 'PARK’s supplied media information lists PET or polyester, polypropylene, glass fibre and activated carbon. PPS, PTFE and aramid are listed for industrial bag-filter products; confirm whether any of those are available as raw media rolls before specifying that format.' },
  { question: 'Can PARK supply air or liquid filter media in rolls?', answer: 'The product catalogue lists roll goods or customer-specific cuts for filter mats and ceiling filters. It does not publish a universal raw-media roll programme or roll-width schedule for every material. Share the material, application and requested format for confirmation.' },
  { question: 'What GSM and roll widths are available?', answer: 'The supplied catalogue does not provide a general GSM range or universal roll widths for the media page. Include [INSERT REQUIRED GSM] and [INSERT REQUIRED ROLL WIDTH] in your enquiry, and ask PARK to confirm the available values for the selected construction.' },
  { question: 'Are PPS, meta-aramid and PTFE available as generic filter-media rolls?', answer: 'The catalogue lists PPS, PTFE and aramid among industrial bag-filter media options. It does not identify meta-aramid or confirm those materials as generic raw-media rolls. Confirm the material designation and supply format for your specific requirement.' },
];

export default function MediaPage() {
  return <>
    <Header />
    <main id="main-content">
      <section className="section media-page-intro">
        <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Filtration media</span></nav>
        <div className="eyebrow">NONWOVEN FILTER MEDIA FOR B2B APPLICATIONS</div>
        <h1>Nonwoven Filtration Media Manufacturer</h1>
        <p className="lead">PARK Nonwoven Filtration supplies nonwoven filtration media for industrial air-filter applications and offers a broader range of finished air, dust-collection and liquid filters. This page summarizes the materials and processes listed in the supplied product information. Share the filtration stage, material, grade and requested supply format to confirm what is available for your project.</p>
        <p>Searching for an air or liquid filter-media roll or a synthetic filter-media supplier? PARK’s catalogue identifies roll goods for filter mats and ceiling filters, while raw-media widths and GSM values require confirmation for the selected construction. The product pages show where listed materials appear in finished filters.</p>
        <div className="media-path"><span>Fibre / polymer</span><b aria-hidden="true">→</b><span>Nonwoven process</span><b aria-hidden="true">→</b><span>Media construction</span><b aria-hidden="true">→</b><span>Finished filter</span></div>
      </section>
      <MediaProcessFilm />
      <MediaArchitecture />
      <MediaExplorer />
      <section className="section media-library">
        <h2>Materials and processes listed by PARK</h2>
        <p>Filter-media selection starts with the target particle or contaminant, airflow or liquid flow, system conditions and finished-filter format. The entries below identify catalogue scope. They do not imply that every material or process is available in every grade, roll width or filter family.</p>
        {groups.map((group) => <section key={group.name}>
          <h3>{group.name}</h3>
          <div className="media-library-grid">{group.items.map(([name, text]) => <details key={name} id={'media-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}>
            <summary>{name}<span aria-hidden="true">+</span></summary><p>{text}</p>
          </details>)}</div>
        </section>)}
        <div className="media-library-cta"><h3>Specify the media and finished format</h3><p>For a media enquiry, provide the polymer or fibre, process if known, filtration application, requested GSM, roll width or cut size, and operating conditions. These editable placeholders need confirmation: [INSERT GSM RANGE], [INSERT ROLL WIDTHS], [INSERT THICKNESS] and [INSERT REQUIRED TEST INFORMATION].</p><Link href="/#contact" className="button">Discuss filtration media with PARK →</Link></div>
      </section>
      <section className="section media-specifications" aria-labelledby="media-spec-title">
        <span className="eyebrow">MEDIA SPECIFICATION CHECKLIST</span>
        <h2 id="media-spec-title">Confirm the roll or finished-filter requirement</h2>
        <div className="media-table-scroll" role="region" aria-label="Nonwoven filtration media specification table" tabIndex={0}>
          <table><thead><tr><th scope="col">Specification field</th><th scope="col">Catalogue scope / buyer input</th><th scope="col">Value to confirm</th></tr></thead><tbody>
            <tr><th scope="row">Media materials</th><td>PET / polyester, PP / polypropylene and glass fibre are listed in the nonwoven media range; activated carbon appears in vehicle filtration options.</td><td>[INSERT SELECTED MATERIAL AND CONSTRUCTION]</td></tr>
            <tr><th scope="row">Industrial bag-filter materials</th><td>PPS, PTFE and aramid are listed for industrial bag filters; raw-roll supply is not confirmed by that listing.</td><td>[CONFIRM MATERIAL DESIGNATION AND SUPPLY FORMAT]</td></tr>
            <tr><th scope="row">Nonwoven processes</th><td>Needle punch, spunlaid, meltblown and thermo bonding are listed.</td><td>[INSERT REQUIRED PROCESS, IF SPECIFIED]</td></tr>
            <tr><th scope="row">Basis weight</th><td>No universal GSM range is published in the supplied catalogue.</td><td>[INSERT GSM RANGE]</td></tr>
            <tr><th scope="row">Roll width / length</th><td>Roll goods are listed for filter mats and ceiling filters; generic raw-media dimensions need confirmation.</td><td>[INSERT ROLL WIDTH] × [INSERT ROLL LENGTH]</td></tr>
            <tr><th scope="row">Thickness / airflow / pressure drop</th><td>Confirm requirements for the selected media and finished filter.</td><td>[INSERT REQUIRED VALUES AND TEST BASIS]</td></tr>
          </tbody></table>
        </div>
      </section>
      <section className="section media-faq" aria-labelledby="media-faq-title">
        <span className="eyebrow">BUYER QUESTIONS</span><h2 id="media-faq-title">Nonwoven filter-media FAQs</h2>
        {faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
      </section>
      <section className="section media-related-links"><h2>Explore related product pages</h2><div><Link href="/products/pocket-filters">Pocket filters</Link><Link href="/products/hepa-filters">HEPA filters</Link><Link href="/products/cabin-air-filters">Cabin air filters</Link><Link href="/products/dust-collector-bag-filters">Dust collector bag filters</Link><Link href="/products/liquid-bag-filters">Liquid bag filters</Link></div></section>
    </main>
    <StructuredData data={filtrationMediaCollectionSchema()} />
    <StructuredData data={faqPageSchema(faqs)} />
    <StructuredData data={breadcrumb([{ name: 'Home', path: '/' }, { name: 'Filtration media', path: '/filtration-media' }])} />
    <Footer />
  </>;
}
