'use client';
import { useState } from 'react';
import useEnquirySend from './useEnquirySend';
import { ArrowUpRight, UserRound, Mail, Send, Check, MessageSquareText } from 'lucide-react';

export default function Contact(){
  const [message,setMessage]=useState('');const {status,error,send}=useEnquirySend();
  return <section id="contact" className="contact-section section">
    <div className="contact-introduction"><div className="eyebrow">TELL US YOUR FILTRATION PROBLEM</div><h2>Need help choosing?<br/>Talk to PARK.</h2><p>Whether you are replacing a filter or selecting one for a new system, tell us what you need to remove and how your equipment works. We can discuss suitable product options and the details needed for your enquiry.</p>
      <div className="contact-topics">{['Find a filter for your application','Discuss dimensions and custom formats','Explore media and grade options'].map(text=><div key={text}><span><Check size={15}/></span>{text}</div>)}</div>
      <a className="contact-email" href="mailto:sales@parknonwoven.com"><span className="contact-email-icon"><Mail size={18}/></span><span><small>PREFER TO EMAIL US?</small>sales@parknonwoven.com</span><ArrowUpRight size={18}/></a>
    </div>
    <form className="contact-enquiry-card" onSubmit={async event=>{
      event.preventDefault();const form=event.currentTarget;const data=new FormData(form);
      if(await send(data,String(data.get('message')||''))){form.reset();setMessage('');}
    }}>
      <input type="text" name="website" hidden tabIndex={-1} autoComplete="off" aria-hidden="true"/><div className="contact-card-heading"><div><span className="contact-card-kicker">YOUR NEXT FILTRATION SOLUTION</span><h3>Let’s start with your needs.</h3><p>Share your problem, system details and quantity to get the conversation started.</p></div><span className="contact-heading-icon"><MessageSquareText size={23} strokeWidth={1.5}/></span></div>
      <div className="contact-field-row">
        <label htmlFor="contact-name">Your name<span className="contact-control"><UserRound size={17} aria-hidden="true"/><input id="contact-name" name="name" autoComplete="name" placeholder="Full name" required maxLength={100}/></span></label>
        <label htmlFor="contact-email">Work email<span className="contact-control"><Mail size={17} aria-hidden="true"/><input id="contact-email" type="email" name="email" autoComplete="email" placeholder="you@company.com" required maxLength={254}/></span></label>
      </div>
      <label htmlFor="contact-message" className="contact-message-label"><span>What do you need?<small>Application, size, grade or quantity</small></span><span className="contact-control contact-textarea"><textarea id="contact-message" name="message" placeholder="Tell us about your system and the filter you’re looking for…" required rows={4} maxLength={4000} value={message} onChange={event=>{setMessage(event.target.value);}} aria-describedby="contact-message-help"/></span></label>
      <div className="contact-message-meta"><span id="contact-message-help">Existing filter details are helpful, if available.</span><span aria-hidden="true">{message.length.toLocaleString()} / 4,000</span></div>
      <div className="contact-submit-row"><button className="button contact-submit" type="submit" disabled={status==='sending'}>{status==='sending'?'Sending?':'Send enquiry'} <Send size={17}/></button><span className="contact-submit-caption">AIR · LIQUID · NONWOVEN MEDIA</span></div>
      <p className="contact-delivery-note" role="status"><Mail size={13} aria-hidden="true"/>{status==='sent'?'Your enquiry has been submitted. Our team will get back to you.':status==='error'?error:'Send your requirements directly to the PARK team.'}</p>
    </form>
  </section>;
}
