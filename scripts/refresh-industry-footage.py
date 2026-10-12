"""Prepare catalogue-relevant industry footage and record its provenance."""
import json
import subprocess
import sys
import urllib.request
from pathlib import Path

import imageio_ffmpeg
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/videos/industries'
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
CLIPS = [
    ('mobility', 6181414, 'family-on-a-road-trip-with-baby', 'Family travelling in a vehicle cabin', 'Vehicle cabin-air filtration'),
    ('manufacturing', 10615247, 'empty-glass-jars-moving-through-conveyor-belt-in-factory', 'Containers moving through a food-production line', 'Food-industry production environments'),
    ('heavy-duty-industry', 4198768, 'drone-shot-over-a-cement-manufacturing-plant', 'Cement manufacturing plant', 'Industrial dust collection in cement plants'),
    ('living', 5998694, 'family-time-in-the-living-room', 'Family in a home living room', 'Indoor air and home ventilation'),
    ('liquid', 5099278, 'drone-footage-of-a-water-treatment-facility', 'Operating water-treatment facility', 'Process-liquid treatment environment'),
]
DOWNLOADS = {
    6181414: 'https://videos.pexels.com/video-files/6181414/6181414-hd_1920_1080_25fps.mp4',
    10615247: 'https://videos.pexels.com/video-files/10615247/10615247-hd_2048_996_30fps.mp4',
    4198768: 'https://videos.pexels.com/video-files/4198768/4198768-uhd_3840_2160_24fps.mp4',
    5998694: 'https://videos.pexels.com/video-files/5998694/5998694-uhd_4096_2160_25fps.mp4',
    5099278: 'https://videos.pexels.com/video-files/5099278/5099278-uhd_3840_2160_30fps.mp4',
}

def run(*args):
    subprocess.run([FFMPEG, '-hide_banner', '-loglevel', 'error', '-y', *args], check=True)

manifest_path = ROOT / 'reference/industry-footage.json'
manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
for slug, clip_id, page_slug, title, relevance in CLIPS:
    if len(sys.argv) > 1 and slug not in sys.argv[1:]:
        continue
    page = f'https://www.pexels.com/video/{page_slug}-{clip_id}/'
    original = ROOT / 'reference' / f'industry-{clip_id}-original.mp4'
    download = DOWNLOADS[clip_id]
    if slug == 'mobility':
        original = ROOT / 'reference/family-cabin-original.mp4'
    if not original.exists():
        request = urllib.request.Request(download, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(request, timeout=60) as response:
            original.write_bytes(response.read())
    for suffix, width, crf in [('', 1280, '25'), ('-optimized', 640, '28')]:
        target = OUT / f'{slug}{suffix}.mp4'
        run('-i', str(original), '-t', '8', '-vf', f'scale={width}:{width * 9 // 16}:force_original_aspect_ratio=increase,crop={width}:{width * 9 // 16},setsar=1,fps=24', '-an', '-map_metadata', '-1', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'fast', '-crf', crf, '-movflags', '+faststart', str(target))
    poster = OUT / f'{slug}-poster.jpg'
    run('-ss', '0.5', '-i', str(OUT / f'{slug}.mp4'), '-frames:v', '1', '-q:v', '3', str(poster))
    with Image.open(poster) as im:
        im.thumbnail((640, 360))
        im.save(poster.with_suffix('.webp'), 'WEBP', quality=82)
    entry = next(item for item in manifest['clips'] if item['slug'] == slug)
    entry.clear()
    entry.update(slug=slug, title=title, source=page, license='https://www.pexels.com/license/', local=str(original.relative_to(ROOT)).replace('\\', '/'), relevance=relevance, output=f'/videos/industries/{slug}.mp4', bytes=(OUT / f'{slug}.mp4').stat().st_size)
    if download:
        entry['download'] = download
    manifest_path.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
    print(f'Prepared {slug}', flush=True)

subprocess.run([sys.executable, str(ROOT / 'scripts/version-industry-media.py')], check=True)
