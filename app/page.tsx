import Home from '../components/Home';
import StructuredData from '../components/StructuredData';
import { organizationSchema, pageMetadata } from '../lib/seo';
export const metadata = pageMetadata('Industrial Filtration Manufacturer in India | Park Nonwoven','Park Nonwoven Filtration manufactures nonwoven filter media and air, dust-collection and liquid filters in Panipat, Haryana, India. Explore industrial filtration options.','/');
export default function Page(){return <><Home/><StructuredData data={organizationSchema()}/></>}
