'use client';
import { useState, useRef } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import source from '../lib/catalogue-source.json';
import CatalogueSourceSlide from './CatalogueSourceSlide';

export default function FullCatalogue() {
 const [query, setQuery] = useState('');
 const [section, setSection] = useState('All sections');
 const listRef = useRef<HTMLDivElement>(null);
 const setExpanded = (open: boolean) => {listRef.current?.querySelectorAll<HTMLDetailsElement>(':scope > details').forEach(detail=>{detail.open=open;});};
 const sections = ['All sections', ...Array.from(new Set(source.slides.map(s => s.section)))];
 const matches = source.slides.filter(s => (section === 'All sections' || s.section === section) && [s.title, ...s.paragraphs, ...s.notes].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
 return <div className="full-catalogue">
  <div className="source-controls"><label className="search"><Search size={18}/><input type="search" aria-label="Search complete presentation" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search a product, material, grade or application"/></label><label>Section<select value={section} onChange={e => setSection(e.target.value)}>{sections.map(s => <option key={s}>{s}</option>)}</select></label></div>
  <div className="source-list-toolbar"><p className="source-result-count" aria-live="polite">{matches.length} of {source.slideCount} slides · Expand any slide to read its complete original text and view its images.</p><div><button onClick={()=>setExpanded(true)}>Expand all</button><button onClick={()=>setExpanded(false)}>Collapse all</button></div></div>
  <div className="source-slide-list" ref={listRef}>{matches.map(slide => <CatalogueSourceSlide key={slide.number} slide={slide}/>)}</div>
  {matches.length === 0 && <div className="empty"><h2>No matching slides</h2><p>Try a product name, an application or a material such as polypropylene.</p><button className="button" onClick={() => {setQuery('');setSection('All sections');}}><RotateCcw size={16}/> Clear search</button></div>}
 </div>;
}
