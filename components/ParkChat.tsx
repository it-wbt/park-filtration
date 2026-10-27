'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {MessageCircle, Send, X, ArrowUpRight} from 'lucide-react';
import {products, type Product} from '../lib/products';
import {logGoogleChatMessage} from '../lib/submit-google-enquiry';
import {formatEnquiryContext} from '../lib/enquiry-context';
import useEnquirySend from './useEnquirySend';

type Message = {role: 'bot' | 'user'; text: string; links?: {name: string; href: string}[]};
type Step = 'query' | 'name' | 'phone' | 'email' | 'requirement' | 'complete';
const welcome: Message = {role: 'bot', text: 'Hi! I can help you explore PARK filters, materials and applications. What are you looking for?'};
const aliases: Record<string, string[]> = {
  'hepa-filter': ['hepa', 'cleanroom'], 'swimming-pool-filter': ['swimming', 'pool'],
  'cabin-air-filter': ['cabin', 'car ac', 'car air', 'pollen'], 'engine-air-filter': ['engine', 'intake', 'bike'],
  'panel-filter': ['panel', 'railway', 'railways', 'hvac'], 'pocket-filter': ['pocket'],
  'bag-filter': ['industrial bag', 'cement', 'dust collection'], 'liquid-filter': ['liquid', 'water'],
  'cartridge-filter': ['cartridge'], 'filter-mats': ['mat', 'mats'], 'ceiling-filter': ['ceiling', 'paint booth'],
  'battery-air-filter': ['battery', 'ev', 'hybrid'], 'car-purifier-filter': ['purifier', 'console'],
};
const productLinks = (items: Product[]) => items.map(p=>({name:p.name,href:'/products/'+p.slug}));

function answer(query: string): Message {
  const text = query.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  if (/^(hi|hello|hey|namaste|hii)$/.test(text)) return welcome;
  if (/price|cost|rate|delivery|shipping|warranty/.test(text)) return {role:'bot',text:'Pricing and delivery depend on the selected filter, dimensions and quantity. Choose “Request a quote” and share your details with the PARK team.'};
  if (/contact|phone|number|email|whatsapp/.test(text)) return {role:'bot',text:'You can reach PARK on WhatsApp at +91 7496961240 or email sales@parknonwoven.com.',links:[{name:'Email PARK',href:'mailto:sales@parknonwoven.com'}]};
  const matched = products.filter(p=>(aliases[p.slug] || []).some(term=>new RegExp('\\b'+term+'\\b').test(text)));
  if (matched.length === 1) {
    const p = matched[0];
    if (/spec|grade|micron|efficiency|temperature/.test(text)) return {role:'bot',text:p.specifications?.length ? p.name+' — catalogue options:\n'+p.specifications.slice(0,4).map(s=>s.label+': '+s.value).join('\n')+'\nConfirm the selected specification with PARK.' : 'Please confirm the specification for your selected '+p.name.toLowerCase()+' with PARK. Share dimensions, operating conditions and quantity.',links:productLinks([p])};
    return {role:'bot',text:p.name+'\n'+p.description+'\n\nMaterial: '+p.material+'\nOptions: '+p.features.join('; ')+'.',links:productLinks([p])};
  }
  if (matched.length) return {role:'bot',text:'These PARK products may be relevant. Choose a product to see its details, or tell me more about your system.',links:productLinks(matched)};
  const industry = /hospital|hotel|home|house|office|living/.test(text) ? 'Living' : /manufactur|pharma|food|electronics/.test(text) ? 'Manufacturing' : /automobile|vehicle|mobility|rail|car/.test(text) ? 'Mobility' : /heavy|power plant|chemical/.test(text) ? 'Heavy Duty Industry' : null;
  if (industry) return {role:'bot',text:'Explore the PARK '+industry.toLowerCase()+' range. Selection depends on your application, filter fit and operating conditions.',links:productLinks(products.filter(p=>p.categories.includes(industry) && (!text.includes('hospital') || p.slug!=='swimming-pool-filter')))};
  if (/product|range|filters|filter/.test(text)) return {role:'bot',text:'PARK offers 13 product families for air, liquid and industrial filtration. Tell me a product name or your application.',links:[{name:'Browse all filters',href:'/products'}]};
  return {role:'bot',text:'I can help with PARK products, materials and catalogue options. For this question, the PARK team can confirm the details. Choose “Request a quote” to share your enquiry.'};
}

export default function ParkChat() {
  const [open,setOpen] = useState(false), [input,setInput] = useState('');
  const [messages,setMessages] = useState<Message[]>([welcome]);
  const [step,setStep] = useState<Step>('query');
  const [lead,setLead] = useState({name:'',phone:'',email:'',requirement:''});
  const {status,error,send,reset} = useEnquirySend({requireGoogle:true});
  const list = useRef<HTMLDivElement>(null), field = useRef<HTMLInputElement>(null);
  const chatSession = useRef('');
  const chatLogQueue = useRef<Promise<void>>(Promise.resolve());
  const welcomeLogged = useRef(false);
  useEffect(()=>{if(open){list.current?.scrollTo({top:list.current.scrollHeight});field.current?.focus();}},[open,messages]);
  useEffect(()=>{if(!open)return;const close=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false);};document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close);},[open]);
  const logChat = (role:'user'|'bot',text:string) => {
    if(!chatSession.current)chatSession.current=crypto.randomUUID();
    const sessionId=chatSession.current;
    chatLogQueue.current=chatLogQueue.current.catch(()=>{}).then(()=>logGoogleChatMessage(sessionId,role,text)).catch(error=>console.error('PARK chat log could not be saved:',error));
  };
  const add = (...items: Message[]) => {items.forEach(item=>logChat(item.role,item.text));setMessages(previous=>[...previous,...items]);};
  useEffect(()=>{if(open&&!welcomeLogged.current){welcomeLogged.current=true;logChat('bot',welcome.text);}},[open]);
  const quote = () => {reset();setStep('name');add({role:'bot',text:'Let’s prepare your enquiry. What is your name?'});};
  const submit = (value: string) => {
    const text=value.trim();if(!text)return;setInput('');
    const user:Message={role:'user',text};
    if(step==='name') {if(text.length<2){add(user,{role:'bot',text:'Please enter your name.'});return;}setLead(p=>({...p,name:text}));setStep('phone');add(user,{role:'bot',text:'Thanks! What mobile number can PARK contact you on? Include the country code if you are outside India.'});return;}
    if(step==='phone') {const phone=text.replace(/[^0-9+]/g,'');if(!/^\+?\d{7,15}$/.test(phone)){add(user,{role:'bot',text:'Please enter a valid mobile number, for example 7496961240.'});return;}setLead(p=>({...p,phone}));setStep('email');add(user,{role:'bot',text:'What is your email address?'});return;}
    if(step==='email') {if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)){add(user,{role:'bot',text:'Please enter a valid email address, for example name@company.com.'});return;}setLead(p=>({...p,email:text}));setStep('requirement');add(user,{role:'bot',text:'Thanks! What filtration product or application do you need help with? Please describe what you need.'});return;}
    if(step==='requirement') {if(text.length<3){add(user,{role:'bot',text:'Please add a few details about the filter or application you need.'});return;}const completedLead={...lead,requirement:text};setLead(completedLead);setStep('complete');add(user,{role:'bot',text:'Thanks! Saving your enquiry...'});void submitEnquiry(completedLead);return;}
    if(/quote|quotation|enquiry|inquiry|buy|order/.test(text.toLowerCase())){add(user);quote();return;}
    const reply=answer(text);add(user,reply);
  };
  const submitEnquiry = async (details = lead) => {
    const data=new FormData();data.set('name',details.name);data.set('email',details.email);data.set('phone',details.phone);
    data.set('requirement',details.requirement);
    const context=formatEnquiryContext('Chatbot','Chatbot enquiry',details.requirement);
    const body=`${context}\n\nChatbot enquiry\nName: ${details.name}\nMobile: ${details.phone}\nEmail: ${details.email}\nRequirement: ${details.requirement}`;
    data.set('siteDomain',location.hostname);
    await send(data,body);
  };
  return <div className="park-chat-widget">
    {open && <section className="park-chat-panel" aria-label="PARK filter assistant">
      <header className="park-chat-header"><span className="park-chat-mark"><MessageCircle size={21}/></span><div><strong>PARK filter assistant</strong><span>Products · Materials · Enquiries</span></div><button type="button" aria-label="Close chatbot" onClick={()=>setOpen(false)}><X size={19}/></button></header>
      <div className="park-chat-messages" ref={list} role="log" aria-live="polite" aria-relevant="additions">{messages.map((message,index)=><div key={index} className={'park-chat-message park-chat-'+message.role}><p>{message.text}</p>{message.links && <div className="park-chat-links">{message.links.map(link=><Link key={link.href} href={link.href}>{link.name}<ArrowUpRight size={13}/></Link>)}</div>}</div>)}</div>
      {step==='query' && <div className="park-chat-quick"><button onClick={()=>submit('Show all filters')}>Find a filter</button><button onClick={()=>submit('HEPA filter')}>HEPA filters</button><button onClick={quote}>Request a quote</button></div>}
      {step==='complete' && <div className="park-chat-ready">
        {status==='sent' ? <p className="park-chat-submit-status" role="status">Your enquiry has been saved. Thank you.</p> : status==='sending' ? <p className="park-chat-submit-status" role="status">Saving your enquiry...</p> : <button type="button" className="park-chat-submit-enquiry" onClick={()=>void submitEnquiry()}>Retry submission <ArrowUpRight size={16}/></button>}
        {status==='error' && <p className="park-chat-submit-status park-chat-submit-error" role="alert">{error}</p>}
        <button disabled={status==='sending'} onClick={()=>{reset();chatSession.current=crypto.randomUUID();setStep('query');setLead({name:'',phone:'',email:'',requirement:''});setMessages([welcome]);logChat('bot',welcome.text);}}>Ask another question</button>
      </div>}

      {step!=='complete' && <form className="park-chat-form" onSubmit={event=>{event.preventDefault();submit(input);}}><input ref={field} aria-label="Chat message" value={input} onChange={event=>setInput(event.target.value)} placeholder={step==='phone'?'Your mobile number':step==='name'?'Your name':'Type your question…'} maxLength={1000} inputMode={step==='phone'?'tel':step==='email'?'email':'text'}/><button type="submit" aria-label="Send chat message" disabled={!input.trim()}><Send size={18}/></button></form>}
      <small className="park-chat-note">Catalogue guidance. Confirm your selected filter with PARK.</small>
    </section>}
    <button type="button" className="park-chat-launch" aria-label={open?'Close chatbot':'Open PARK chatbot'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X size={23}/>:<MessageCircle size={23}/>}<span>Ask PARK</span></button>
  </div>;
}
