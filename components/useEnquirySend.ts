'use client';
import {useRef,useState} from 'react';
import {googleEnquiryEndpoint,submitGoogleEnquiry} from '../lib/submit-google-enquiry';

export default function useEnquirySend() {
 const [status,setStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle');
 const [error,setError]=useState('');
 const pending=useRef(false);
 const request=useRef<{body:string;id:string}|null>(null);

 const send=async(data:FormData,message:string,product?:string)=>{
  if(pending.current)return {saved:false,sent:false};
  if(data.get('website')){setStatus('error');setError('Unable to submit your enquiry. Please try again.');return {saved:false,sent:false};}
  pending.current=true;setStatus('sending');setError('');
  try {
   const enquiry={name:String(data.get('name')||''),email:String(data.get('email')||''),phone:String(data.get('phone')||''),message,product,website:String(data.get('siteDomain')||''),requirement:String(data.get('requirement')||'')};
   const body=JSON.stringify(enquiry);
   if(request.current?.body!==body)request.current={body,id:crypto.randomUUID()};
   await submitGoogleEnquiry(googleEnquiryEndpoint,enquiry,request.current!.id);
   setStatus('sent');
   return {saved:true,sent:true};
  }catch{
   setError('Your enquiry could not be submitted. Please try again.');
   setStatus('error');
   return {saved:false,sent:false};
  }finally{
   pending.current=false;
  }
 };

 const reset=()=>{if(!pending.current){setStatus('idle');setError('');request.current=null;}};
 return {status,error,send,reset};
}
