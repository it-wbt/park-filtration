'use client';
import {useRef,useState} from 'react';
import {googleEnquiryEndpoint,submitGoogleEnquiry} from '../lib/submit-google-enquiry';
export default function useEnquirySend({requireGoogle = false}: {requireGoogle?: boolean} = {}) {
 const [status,setStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle');
 const [error,setError]=useState('');
 const pending=useRef(false);
 const request=useRef<{body:string;id:string}|null>(null);
 const send=async(data:FormData,message:string,product?:string)=>{
  if(pending.current)return {saved:false,sent:false};
  if(data.get('website')){setStatus('error');setError('Unable to submit your enquiry. Please try again.');return {saved:false,sent:false};}
  pending.current=true;setStatus('sending');setError('');
  let sheetSaved=false;
  try {
   const enquiry={name:String(data.get('name')||''),email:String(data.get('email')||''),phone:String(data.get('phone')||''),message,product,website:String(data.get('siteDomain')||''),requirement:String(data.get('requirement')||'')};
   const body=JSON.stringify(enquiry);
   if(request.current?.body!==body)request.current={body,id:crypto.randomUUID()};
   await submitGoogleEnquiry(googleEnquiryEndpoint,enquiry,request.current!.id);
   sheetSaved=true;
   if(requireGoogle){setStatus('sent');return {saved:true,sent:true};}
   const response=await fetch('https://formsubmit.co/ajax/sales@parknonwoven.com',{
    method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
    body:JSON.stringify({name:String(data.get('name')||''),email:String(data.get('email')||''),message,...(product?{product}:{}),_replyto:String(data.get('email')||''),_subject:product?'Quotation enquiry: '+product:'Filtration enquiry',_template:'table'}),
    signal:AbortSignal.timeout(20000),
   });
   const result=await response.json();
   if(!response.ok||(result.success!==true&&result.success!=='true'))throw new Error('Your enquiry could not be submitted. Please try again or email sales@parknonwoven.com.');
   setStatus('sent');return {saved:true,sent:true};
  }catch(cause){
   const message=cause instanceof Error ? cause.message : 'Your enquiry could not be submitted. Please try again.';
   if(requireGoogle&&message.toLowerCase().includes('details were saved, but the email could not be sent')){setStatus('sent');return {saved:true,sent:true};}
   setError(sheetSaved?'Your details were saved to the Sheet, but the email could not be sent. Please retry.':message);setStatus('error');return {saved:sheetSaved,sent:false};
  }
  finally{pending.current=false;}
 };
 const reset=()=>{if(!pending.current){setStatus('idle');setError('');request.current=null;}};
 return {status,error,send,reset};
}
