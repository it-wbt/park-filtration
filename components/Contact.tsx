'use client';
import { useState } from 'react';
import IndustrySelect from './IndustrySelect';
import { ArrowUpRight, UserRound, Mail, Building2, Factory, ChevronDown, Send, Check, MessageSquareText } from 'lucide-react';

const industryHints:Record<string,string>={
  Mobility:'Cabins, engines, EV batteries and railway ventilation.',
  Manufacturing:'Production environments, cleanrooms and paint booths.',
  'Heavy Duty Industry':'Process-air filtration and industrial dust collection.',
  Living:'Indoor air, commercial spaces and pool circulation.',
  Liquid:'Liquid filtration, process water and suspended particles.',
  Other:'Tell us about your system so we can explore the right options.',
};
export default function Contact(){
  const [ready,setReady]=useState(false);const [industry,setIndustry]=useState('');const [message,setMessage]=useState('');
  return <section id="contact" className="contact-section section">
    <div className="contact-introduction"><div className="eyebrow">TELL US YOUR FILTRATION PROBLEM</div><h2>Need help choosing?<br/>Talk to PARK.</h2><p>Whether you are replacing a filter or selecting one for a new system, tell us what you need to remove and how your equipment works. We can discuss suitable product options and the details needed for your enquiry.</p>
      <div className="contact-topics">{['Find a filter for your application','Discuss dimensions and custom formats','Explore media and grade options'].map(text=><div key={text}><span><Check size={15}/></span>{text}</div>)}</div>
      <a className="contact-email" href="mailto:sales@parknonwoven.com"><span className="contact-email-icon"><Mail size={18}/></span><span><small>PREFER TO EMAIL US?</small>sales@parknonwoven.com</span><ArrowUpRight size={18}/></a>
    </div>
    <form className="contact-enquiry-card" onSubmit={event=>{
      event.preventDefault();const data=new FormData(event.currentTarget);
      const body=`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')||'Not specified'}\nIndustry: ${data.get('industry')}\n\n${data.get('message')}`;
      window.location.href=`mailto:sales@parknonwoven.com?subject=${encodeURIComponent('Filtration enquiry — '+data.get('industry'))}&body=${encodeURIComponent(body)}`;setReady(true);
    }}>
      <div className="contact-card-heading"><div><span className="contact-card-kicker">YOUR NEXT FILTRATION SOLUTION</span><h3>Let’s start with your needs.</h3><p>Share your problem, system details and quantity to get the conversation started.</p></div><span className="contact-heading-icon"><MessageSquareText size={23} strokeWidth={1.5}/></span></div>
      <div className="contact-field-row">
        <label htmlFor="contact-name">Your name<span className="contact-control"><UserRound size={17} aria-hidden="true"/><input id="contact-name" name="name" autoComplete="name" placeholder="Full name" required maxLength={100}/></span></label>
        <label htmlFor="contact-email">Work email<span className="contact-control"><Mail size={17} aria-hidden="true"/><input id="contact-email" type="email" name="email" autoComplete="email" placeholder="you@company.com" required maxLength={254}/></span></label>
      </div>
      <div className="contact-field-row">
        <label htmlFor="contact-company"><span>Company <small>Optional</small></span><span className="contact-control"><Building2 size={17} aria-hidden="true"/><input id="contact-company" name="company" autoComplete="organization" placeholder="Company or organisation" maxLength={150}/></span></label>
        <IndustrySelect value={industry} options={Object.keys(industryHints)} onChange={value=>{setIndustry(value);setReady(false);}}/>
      </div>
      {industry&&<p className="contact-industry-hint" id="contact-industry-hint"><span/>{industryHints[industry]}</p>}
      <label htmlFor="contact-message" className="contact-message-label"><span>What do you need?<small>Application, size, grade or quantity</small></span><span className="contact-control contact-textarea"><textarea id="contact-message" name="message" placeholder="Tell us about your system and the filter you’re looking for…" required rows={4} maxLength={4000} value={message} onChange={event=>{setMessage(event.target.value);setReady(false);}} aria-describedby="contact-message-help"/></span></label>
      <div className="contact-message-meta"><span id="contact-message-help">Existing filter details are helpful, if available.</span><span aria-hidden="true">{message.length.toLocaleString()} / 4,000</span></div>
      <div className="contact-submit-row"><button className="button contact-submit" type="submit">Prepare email enquiry <Send size={17}/></button><span className="contact-submit-caption">AIR · LIQUID · NONWOVEN MEDIA</span></div>
      <p className="contact-delivery-note" role="status"><Mail size={13} aria-hidden="true"/>{ready?'Your email app has been requested. Review the message and send it there, or email us directly.':'Opens your email app with your enquiry ready to review and send.'}</p>
    </form>
  </section>;
}
