'use client';

import IndustryMenu from './IndustryMenu';

export default function MobilityMenu({onNavigate}:{onNavigate:()=>void}) {
 return <IndustryMenu industry="Mobility" onNavigate={onNavigate}/>;
}
