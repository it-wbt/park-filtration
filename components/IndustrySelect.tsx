'use client';
import {useEffect, useRef, useState} from 'react';
import {Factory, ChevronDown, Check} from 'lucide-react';

export default function IndustrySelect({value, options, onChange}: {value: string; options: string[]; onChange: (value: string) => void}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [invalid, setInvalid] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: PointerEvent) => {if (!root.current?.contains(event.target as Node)) setOpen(false);};
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);
  const choose = (index: number) => {onChange(options[index]); setInvalid(false); setOpen(false); trigger.current?.focus();};
  return <div className="contact-industry-field" ref={root} onBlur={event => {if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);}}>
    <span id="contact-industry-label" className="contact-field-label">Your industry</span>
    <select className="contact-native-industry" name="industry" value={value} tabIndex={-1} aria-hidden="true" required onChange={event => onChange(event.target.value)} onInvalid={event => {event.preventDefault(); setInvalid(true); trigger.current?.focus();}}><option value="">Select your industry</option>{options.map(option => <option key={option}>{option}</option>)}</select>
    <button ref={trigger} type="button" id="contact-industry" role="combobox" aria-labelledby="contact-industry-label" aria-haspopup="listbox" aria-expanded={open} aria-controls="contact-industry-options" aria-activedescendant={open ? `contact-industry-option-${active}` : undefined} aria-required="true" aria-invalid={invalid} className={`contact-industry-trigger${value ? ' has-value' : ''}`} onClick={() => {setActive(Math.max(0, options.indexOf(value))); setOpen(!open);}} onKeyDown={event => {
      if (event.key === 'Escape' || event.key === 'Tab') {setOpen(false); return;}
      if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {event.preventDefault(); setOpen(true); setActive(index => event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length);}
      else if (open && (event.key === 'Enter' || event.key === ' ')) {event.preventDefault(); choose(active);}
    }}><Factory size={17} aria-hidden="true"/><span>{value || 'Select your industry'}</span><ChevronDown size={16} aria-hidden="true"/></button>
    {open && <div id="contact-industry-options" role="listbox" aria-labelledby="contact-industry-label" className="contact-industry-options">{options.map((option, index) => <div key={option} id={`contact-industry-option-${index}`} role="option" aria-selected={value === option} className={active === index ? 'is-active' : ''} onPointerMove={() => setActive(index)} onMouseDown={event => event.preventDefault()} onClick={() => choose(index)}><span>{option}</span>{value === option && <Check size={16}/>}</div>)}</div>}
    {invalid && <span className="contact-industry-error" role="alert">Choose your industry to continue.</span>}
  </div>;
}
