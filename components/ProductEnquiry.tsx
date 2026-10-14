import Contact from './Contact';

export default function ProductEnquiry({product}: {product: string; variants?: string[]}) {
  return <Contact id="product-enquiry" product={product}/>;
}
