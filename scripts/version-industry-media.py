"""Publish new URLs for changed homepage videos and their fallback posters."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LABELS = {
    'mobility': 'vehicle-cabin',
    'manufacturing': 'food-production',
    'heavy-duty-industry': 'cement-plant',
    'living': 'family-at-home',
    'liquid': 'process-water',
}
CONTEXT = {
    'mobility': 'Vehicle cabin air',
    'manufacturing': 'Food production',
    'heavy-duty-industry': 'Cement & process dust',
    'living': 'Homes & indoor air',
    'liquid': 'Process water',
}
media = {}
for slug, label in LABELS.items():
    media[slug] = {'context': CONTEXT[slug]}
    for key, suffix in [('src', '-optimized.mp4'), ('poster', '-poster.webp')]:
        source = ROOT / 'public/videos/industries' / f'{slug}{suffix}'
        data = source.read_bytes()
        digest = hashlib.sha256(data).hexdigest()[:10]
        target = source.with_name(f'{label}-{digest}{source.suffix}')
        target.write_bytes(data)
        media[slug][key] = '/videos/industries/' + target.name
(ROOT / 'lib/industry-media.ts').write_text(
    '// Content-addressed URLs refresh videos and posters when footage changes.\n'
    + 'export const industryMedia: Record<string, {src: string; poster: string; context: string}> = '
    + json.dumps(media, indent=2) + ';\n', encoding='utf-8'
)
