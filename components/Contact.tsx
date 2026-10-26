'use client';
import { useEffect, useRef, useState } from 'react';
import useEnquirySend from './useEnquirySend';
import { ArrowUpRight, UserRound, Mail, Send, Check, MessageSquareText, X, CircleCheck } from 'lucide-react';

export default function Contact({id = 'contact', product}: {id?: string; product?: string} = {}){
  const [message,setMessage]=useState('');const [showSuccess,setShowSuccess]=useState(false);const [emailSent,setEmailSent]=useState(false);const {status,error,send,reset}=useEnquirySend();
  const closeSuccessRef=useRef<HTMLButtonElement>(null);
  useEffect(()=>{if(!showSuccess)return;closeSuccessRef.current?.focus();const onKeyDown=(event:KeyboardEvent)=>{if(event.key==='Escape')setShowSuccess(false);};window.addEventListener('keydown',onKeyDown);return()=>window.removeEventListener('keydown',onKeyDown);},[showSuccess]);
  return <section id={id} className="contact-section section contact-shared">
    <div className="contact-introduction"><div className="eyebrow">TELL US YOUR FILTRATION PROBLEM</div><h2>Need help choosing?<br/>Talk to PARK.</h2><p>Whether you are replacing a filter or selecting one for a new system, tell us what you need to remove and how your equipment works. We can discuss suitable product options and the details needed for your enquiry.</p>
      <div className="contact-topics">{['Find a filter for your application','Discuss dimensions and custom formats','Explore media and grade options'].map(text=><div key={text}><span><Check size={15}/></span>{text}</div>)}</div>
      <a className="contact-email" href="mailto:sales@parknonwoven.com"><span className="contact-email-icon"><Mail size={18}/></span><span><small>PREFER TO EMAIL US?</small>sales@parknonwoven.com</span><ArrowUpRight size={18}/></a>
    </div>
    <form className="contact-enquiry-card" onSubmit={async event=>{
      event.preventDefault();const form=event.currentTarget;const data=new FormData(form);
      data.set('siteDomain',location.hostname);
      const body = (product ? `Product: ${product}\n\n` : '') + String(data.get('message')||'');
      const result=await send(data,body,product);
      if(result.saved){form.reset();setMessage('');setEmailSent(result.sent);reset();setShowSuccess(true);}
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
    {showSuccess&&<div className="contact-success-overlay" onMouseDown={event=>{if(event.target===event.currentTarget)setShowSuccess(false);}}>
      <section className="contact-success-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-success-title" aria-describedby="contact-success-description">
        <button ref={closeSuccessRef} className="contact-success-close" type="button" aria-label="Close confirmation" onClick={()=>setShowSuccess(false)}><X size={20}/></button>
        <span className="contact-success-icon"><CircleCheck size={34} strokeWidth={1.7}/></span>
        <h3 id="contact-success-title">{emailSent?'Enquiry sent':'Enquiry saved'}</h3>
        <p id="contact-success-description">{emailSent?'Thank you for contacting PARK. Your enquiry has been saved and sent to our team. We’ll get back to you.':'Your enquiry has been saved to our records. The email notification could not be sent, but PARK has your details.'}</p>
        <button className="button contact-success-done" type="button" onClick={()=>setShowSuccess(false)}>Done</button>
      </section>
    </div>}
  </section>;
}
