"""Verify extraction against the actual PPTX, including repeated source content."""
import hashlib
import json
import posixpath
import re
import sys
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
SOURCE=Path(sys.argv[1]) if len(sys.argv)>1 else Path(r'C:\Users\lenovo\Downloads\Product ppt._AF.pptx')
data=json.loads((ROOT/'lib/catalogue-source.json').read_text(encoding='utf-8'))
A='{http://schemas.openxmlformats.org/drawingml/2006/main}'
R='{http://schemas.openxmlformats.org/package/2006/relationships}'
assert data['sha256']==hashlib.sha256(SOURCE.read_bytes()).hexdigest(), 'Source changed; regenerate extraction'
assert (ROOT/'reference/park-filtration-products.pptx').read_bytes()==SOURCE.read_bytes(), 'Download differs from source'
with zipfile.ZipFile(SOURCE) as archive:
 paths=sorted([n for n in archive.namelist() if re.fullmatch(r'ppt/slides/slide\d+\.xml',n)],key=lambda n:int(re.search(r'slide(\d+)',n).group(1)))
 assert len(paths)==data['slideCount']==len(data['slides'])
 for path,slide in zip(paths,data['slides']):
  root=ET.fromstring(archive.read(path))
  runs=[n.text or '' for n in root.iter(A+'t')]
  paragraphs=[''.join(n.text or '' for n in p.iter(A+'t')) for p in root.iter(A+'p') if any((n.text or '').strip() for n in p.iter(A+'t'))]
  for diagram_file in slide.get('diagramFiles',[]):
   diagram=ET.fromstring(archive.read(diagram_file))
   runs.extend(n.text or '' for n in diagram.iter(A+'t'))
   paragraphs.extend(''.join(n.text or '' for n in p.iter(A+'t')) for p in diagram.iter(A+'p') if any((n.text or '').strip() for n in p.iter(A+'t')))
  assert runs==slide['textRuns'], f"Missing text runs on slide {slide['number']}"
  assert paragraphs==slide['paragraphs'], f"Missing paragraphs on slide {slide['number']}"
  assert re.sub(r'\s+','',''.join(runs))==re.sub(r'\s+','',''.join(paragraphs)), f"Nonparagraph text omitted on slide {slide['number']}"
  relpath=f"ppt/slides/_rels/slide{slide['number']}.xml.rels"
  expected_notes=[]
  if relpath in archive.namelist():
   for rel in ET.fromstring(archive.read(relpath)).iter(R+'Relationship'):
    if rel.attrib.get('Type','').endswith('/notesSlide'):
     notesroot=ET.fromstring(archive.read(posixpath.normpath(posixpath.join('ppt/slides',rel.attrib['Target']))))
     expected_notes=[''.join(n.text or '' for n in p.iter(A+'t')) for p in notesroot.iter(A+'p') if any((n.text or '').strip() for n in p.iter(A+'t'))]
  assert expected_notes==slide['notes'], f"Missing speaker notes on slide {slide['number']}"
  for asset in slide['images']:
   assert (ROOT/'public'/asset['original'].lstrip('/')).exists()
   if asset['display']:assert (ROOT/'public'/asset['display'].lstrip('/')).exists()
 media=[n for n in archive.namelist() if n.startswith('ppt/media/') and not n.endswith('/')]
 for path in media:assert (ROOT/'public/catalogue-media'/Path(path).name).read_bytes()==archive.read(path),f'Media changed: {path}'
 referenced={Path(asset['original']).name for s in data['slides'] for asset in s['images']}
 assert referenced=={Path(path).name for path in media},'A source media file is not linked from its slide'
 assert all(asset['display'] for s in data['slides'] for asset in s['images']),'A source image lacks a browser preview'
 mapped={slug for s in data['slides'] for slug in s['products']}
 assert len(mapped)==13, 'Product source mapping incomplete'
 report={'result':'PASS','slides':len(paths),'textRuns':data['textRunCount'],'paragraphs':data['paragraphCount'],'sourceMediaFiles':len(media),'speakerNoteEntries':sum(len(s['notes']) for s in data['slides']),'productFamiliesMapped':len(mapped),'sourceSha256':data['sha256'],'scope':'Exact PPT text, notes and original media extraction; technical claims are source statements, not independently verified performance.'}
 (ROOT/'catalogue-audit.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
 print(json.dumps(report))
