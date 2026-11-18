import { Brand } from './Header';
import Link from 'next/link';
import './footer-social.css';
const socialLinks = [
 {name:'LinkedIn',href:'https://in.linkedin.com/company/park-non-woven-pvt-ltd',icon:'linkedin'},
 {name:'YouTube',href:'https://www.youtube.com/@parknonwoven5472',icon:'youtube'},
 {name:'Facebook',href:'https://www.facebook.com/parknonwovenofficial/',icon:'facebook'},
 {name:'X',href:'https://x.com/ParkWoven',icon:'x'},
];
export default function Footer(){return <footer><div className="footer-main"><div><Brand/><p>Air filters, liquid filters and nonwoven media.<br/>Let’s find the right option for your system.</p></div><div><h4>Explore</h4><Link href="/#industries">Industries we serve</Link><Link href="/products">Products &amp; comparison</Link><Link href="/resources/filter-selection">Filter selection guide</Link><Link href="/resources">Filtration buying guides</Link><Link href="/filtration-media">Filtration media</Link><Link href="/#technology">Our technology</Link></div><div><h4>Connect with us</h4><a href="mailto:sales@parknonwoven.com">sales@parknonwoven.com ↗</a><Link href="/products">Explore filtration products ↗</Link><nav className="footer-social" aria-label="PARK social media">{socialLinks.map(social=><a key={social.icon} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`PARK on ${social.name} (opens in a new tab)`} title={social.name}><img src={`/icons/social/${social.icon}.svg`} width={20} height={20} alt=""/><span>{social.name}</span></a>)}</nav></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} PARK Nonwoven. All rights reserved.</span><span>Engineered for a cleaner tomorrow.</span></div></footer>}
