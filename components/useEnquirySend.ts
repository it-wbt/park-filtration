'use client';
import {useRef,useState} from 'react';
export default function useEnquirySend() {
 const [status,setStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle');
 const [error,setError]=useState('');
 const pending=useRef(false);
 const send=async(data:FormData,message:string,product?:string)=>{
  if(pending.current)return false;
  if(data.get('website')){setStatus('error');setError('Unable to submit your enquiry. Please try again.');return false;}
  pending.current=true;setStatus('sending');setError('');
  try {
   const response=await fetch('https://formsubmit.co/ajax/sales@parknonwoven.com',{
    method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
    body:JSON.stringify({name:String(data.get('name')||''),email:String(data.get('email')||''),message,...(product?{product}:{}),_replyto:String(data.get('email')||''),_subject:product?'Quotation enquiry: '+product:'Filtration enquiry',_template:'table'}),
    signal:AbortSignal.timeout(20000),
   });
   const result=await response.json();
   if(!response.ok||(result.success!==true&&result.success!=='true'))throw new Error('Your enquiry could not be submitted. Please try again or email sales@parknonwoven.com.');
   setStatus('sent');return true;
  }catch{setError('Your enquiry could not be submitted. Please try again or email sales@parknonwoven.com.');setStatus('error');return false;}
  finally{pending.current=false;}
 };
 return {status,error,send};
}
