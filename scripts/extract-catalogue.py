"""Extract every slide/notes text run and embedded media from the supplied PPTX."""
import hashlib
import json
import posixpath
import re
import shutil
import sys
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(r'C:\Users\lenovo\Downloads\Product ppt._AF.pptx')
A = '{http://schemas.openxmlformats.org/drawingml/2006/main}'
R = '{http://schemas.openxmlformats.org/package/2006/relationships}'

def paragraphs(root):
    return [''.join(node.text or '' for node in p.iter(A + 't')) for p in root.iter(A + 'p') if any((node.text or '').strip() for node in p.iter(A + 't'))]

titles = ['Filtration for every industry', 'Mobility', 'Automobile filtration', 'Cabin filter variants', 'Engine air filters', 'Hybrid EV battery filters', 'Console / car air purifier filters', 'Railway filtration', 'Panel filters for railways', 'Filter mats', 'Manufacturing', 'Manufacturing applications', 'Manufacturing product range', 'Panel filters', 'Pocket filters', 'HEPA filters', 'Filter mats and applications', 'Ceiling filters', 'Liquid bag filters', 'Heavy duty industry', 'Heavy duty applications', 'Industrial filtration range', 'Industrial bag filters', 'Cartridge filters', 'Panel filters for heavy industry', 'Pocket filters for heavy industry', 'Living', 'Living applications', 'Living product range', 'Nonwoven filtration media', 'HEPA filtration', 'Swimming pool filter — source clarification', 'Liquid filtration', 'Liquid applications', 'Liquid bag filters and applications', 'Presentation reference links']
product_slides = {'panel-filter':[9,14,25], 'pocket-filter':[15,26], 'hepa-filter':[16,31], 'cabin-air-filter':[4], 'engine-air-filter':[5], 'battery-air-filter':[6], 'car-purifier-filter':[7], 'filter-mats':[10,17], 'ceiling-filter':[18], 'bag-filter':[23], 'cartridge-filter':[24], 'liquid-filter':[19,35], 'swimming-pool-filter':[32]}
warnings = {4:'The presentation states an H14 efficiency above 99.995% and lists particle, gas and allergen claims. These are source statements; request the selected filter test report and operating conditions before relying on a performance claim.', 23:'This industrial dust-filter slide also lists HVAC classification ranges. Confirm their applicability to the selected dust-collection medium. The P84 material expansion is reproduced as written and requires clarification.', 24:'The source repeats bag-filter wording on the cartridge-filter slide and lists HVAC classification ranges. Confirm cartridge-specific construction, material and performance before ordering.', 32:'The swimming-pool slide repeats HEPA air-filter text, materials, classes and applications. Preserved here for completeness; these are not confirmed swimming-pool specifications.'}

with zipfile.ZipFile(SOURCE) as archive:
    media_dir = ROOT / 'public' / 'catalogue-media'
    media_dir.mkdir(parents=True, exist_ok=True)
    for filename in archive.namelist():
        if filename.startswith('ppt/media/') and not filename.endswith('/'):
            (media_dir / Path(filename).name).write_bytes(archive.read(filename))
    slides = []
    slide_paths = sorted([n for n in archive.namelist() if re.fullmatch(r'ppt/slides/slide\d+\.xml', n)], key=lambda n:int(re.search(r'slide(\d+)',n).group(1)))
    for number, filename in enumerate(slide_paths, 1):
        root = ET.fromstring(archive.read(filename))
        rel_file = f'ppt/slides/_rels/slide{number}.xml.rels'
        notes = []
        images = []
        links = []
        diagram_files = []
        diagram_paragraphs = []
        diagram_runs = []
        if rel_file in archive.namelist():
            for rel in ET.fromstring(archive.read(rel_file)).iter(R + 'Relationship'):
                target = rel.attrib.get('Target','')
                kind = rel.attrib.get('Type','')
                resolved = posixpath.normpath(posixpath.join('ppt/slides',target))
                if kind.endswith('/notesSlide') and resolved in archive.namelist():
                    notes = paragraphs(ET.fromstring(archive.read(resolved)))
                if kind.endswith('/diagramData') or kind.endswith('/diagramDrawing'):
                    if resolved in archive.namelist():
                        diagram = ET.fromstring(archive.read(resolved))
                        diagram_files.append(resolved)
                        diagram_paragraphs.extend(paragraphs(diagram))
                        diagram_runs.extend(n.text or '' for n in diagram.iter(A+'t'))
                if kind.endswith('/image') or kind.endswith('/hdphoto'):
                    name = Path(target).name
                    webp = ROOT / 'public' / 'images' / (Path(name).stem+'.webp')
                    images.append({'original':'/catalogue-media/'+name,'display':'/images/'+webp.name if webp.exists() else '/catalogue-media/'+name if Path(name).suffix.lower() in ['.png','.jpeg','.jpg','.gif','.svg'] else None})
                if rel.attrib.get('TargetMode') == 'External':
                    links.append(target)
        slides.append({'number':number,'title':titles[number-1], 'section':'Overview' if number == 1 else 'Mobility' if number <= 10 else 'Manufacturing' if number <= 19 else 'Heavy Duty Industry' if number <= 26 else 'Living' if number <= 29 or number in [31,32] else 'Technology' if number == 30 else 'Liquid' if number <=35 else 'References', 'paragraphs':paragraphs(root)+diagram_paragraphs, 'textRuns':[n.text or '' for n in root.iter(A+'t')]+diagram_runs, 'diagramFiles':diagram_files, 'notes':notes, 'images':images, 'links':links, 'products':[slug for slug, numbers in product_slides.items() if number in numbers], 'warning':warnings.get(number)})
    result = {'sourceName':SOURCE.name,'sha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'slideCount':len(slides),'textRunCount':sum(len(s['textRuns']) for s in slides),'paragraphCount':sum(len(s['paragraphs']) for s in slides),'slides':slides}
    (ROOT / 'lib' / 'catalogue-source.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
    (ROOT / 'reference').mkdir(exist_ok=True)
    shutil.copy2(SOURCE,ROOT / 'reference' / 'park-filtration-products.pptx')
    print(json.dumps({k:result[k] for k in ['slideCount','textRunCount','paragraphCount','sha256']}))
