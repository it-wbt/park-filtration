import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { pageMetadata } from '../../lib/seo';

export const metadata = pageMetadata(
  'Contact Park Nonwoven Filtration | Product Enquiries',
  'Contact Park Nonwoven Filtration about industrial air filters, dust-collection filters, liquid bag filters and nonwoven filtration media.',
  '/contact',
);

export default function ContactPage() {
  return <>
    <Header />
    <main id="main-content">
      <section className="section">
        <div className="eyebrow">CONTACT PARK NONWOVEN FILTRATION</div>
        <h1>Discuss your filtration requirement.</h1>
      </section>
      <Contact />
    </main>
    <Footer />
  </>;
}
