import Home from '../components/Home';
import StructuredData from '../components/StructuredData';
import { organizationSchema, pageMetadata } from '../lib/seo';
export const metadata = pageMetadata('Industrial Air Filter Manufacturer in India | PARK Filtration','Park Nonwoven Filtration manufactures nonwoven filtration media and air, dust-collection and liquid filters for commercial and industrial buyers in India and worldwide.','/');
export default function Page(){return <><Home/><StructuredData data={organizationSchema()}/></>}
