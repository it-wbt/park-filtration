"""Build bright, application-specific banner films with content-addressed URLs."""
import hashlib
import json
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

import imageio_ffmpeg
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/videos/home'
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
CLIPS = [
    {'slug': 'banner-green-road-hq', 'local': 'reference/banner-green-road-hq-original.mp4', 'source': 'https://www.pexels.com/video/aerial-video-footage-of-car-on-mountain-road-5061405/', 'download': 'https://videos.pexels.com/video-files/5061405/5061405-uhd_3840_2160_30fps.mp4', 'application': 'Brand overview and real-life road transport context', 'preserveOriginal': True},
    {'slug': 'banner-daylight-rail-hq', 'local': 'reference/indian-train-139303-original.mp4', 'source': 'https://pixabay.com/videos/railway-train-platform-crossing-139303/', 'download': 'https://cdn.pixabay.com/video/2022/11/16/139303-772062186_large.mp4', 'application': 'Indian Railways locomotive and passenger coaches in real transport use', 'duration': 15, 'start': 7, 'license': 'https://pixabay.com/service/license-summary/'},
    {'slug': 'banner-passenger-cabin-hq', 'local': 'reference/family-cabin-4k-original.mp4', 'source': 'https://www.pexels.com/video/family-on-a-road-trip-with-baby-6181414/', 'download': 'https://videos.pexels.com/video-files/6181414/6181414-uhd_3840_2160_25fps.mp4', 'application': 'Passenger vehicle cabin-air filtration'},
]

def run(*args):
    subprocess.run([FFMPEG, '-hide_banner', '-loglevel', 'error', '-y', *args], check=True)

def version(path):
    digest = hashlib.sha256(path.read_bytes()).hexdigest()[:10]
    target = path.with_name(f'{path.stem}-{digest}{path.suffix}')
    path.replace(target)
    return '/videos/home/' + target.name

media = []
previous_path = ROOT / 'reference/relevant-banner-footage.json'
previous = json.loads(previous_path.read_text(encoding='utf-8'))['clips'] if previous_path.exists() else []
for clip in CLIPS:
    if len(sys.argv) > 1 and clip['slug'] not in sys.argv[1:]:
        saved = next(item for item in previous if item['slug'] == clip['slug'])
        clip.update(assets=saved['assets'], sourceResolution=saved['sourceResolution'], license=saved['license'])
        clip['assets']['durationMs'] = clip.get('duration', 8) * 1000
        media.append(clip['assets'])
        continue
    original = ROOT / clip['local']
    if not original.exists():
        request = urllib.request.Request(clip['download'], headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(request, timeout=60) as response:
            original.write_bytes(response.read())
    probe = subprocess.run([FFMPEG, '-hide_banner', '-i', str(original)], capture_output=True, text=True)
    video_info = next(line for line in probe.stderr.splitlines() if 'Video:' in line)
    dims = re.search(r'(\d{3,5})x(\d{3,5})', video_info)
    source_width, source_height = map(int, dims.groups())
    clip['sourceResolution'] = [source_width, source_height]
    assets = {}
    for key, suffix, width, rate in [('highResolutionSrc', 'desktop', source_width, '18000k'), ('src', 'mobile', min(1920, source_width), '6000k')]:
        target = OUT / f"{clip['slug']}-{suffix}.mp4"
        loop_args = ['-stream_loop', '-1'] if clip.get('loopSource') else []
        if key == 'highResolutionSrc' and clip.get('preserveOriginal'):
            # Preserve every original 4K frame without another lossy encode.
            run('-ss', str(clip.get('start', 0)), '-i', str(original), '-t', str(clip.get('duration', 8)), '-map', '0:v:0', '-c:v', 'copy', '-an', '-map_metadata', '-1', '-movflags', '+faststart', str(target))
        else:
            run(*loop_args, '-ss', str(clip.get('start', 0)), '-i', str(original), '-t', str(clip.get('duration', 8)), '-vf', f'scale={width}:{width * 9 // 16}:force_original_aspect_ratio=increase,crop={width}:{width * 9 // 16},setsar=1,eq=contrast=1.03:saturation=1.08,fps=30', '-an', '-map_metadata', '-1', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'fast', '-crf', '16' if key == 'highResolutionSrc' else '18', '-maxrate', rate, '-bufsize', '36000k', '-movflags', '+faststart', str(target))
        if key == 'highResolutionSrc':
            poster = OUT / f"{clip['slug']}-poster.jpg"
            run('-ss', '0.5', '-i', str(target), '-frames:v', '1', '-q:v', '2', str(poster))
            with Image.open(poster) as image:
                image.thumbnail((3840, 2160))
                image.save(poster.with_suffix('.webp'), 'WEBP', quality=94)
            poster.unlink()
            assets['poster'] = version(poster.with_suffix('.webp'))
        assets[key] = version(target)
    assets['durationMs'] = clip.get('duration', 8) * 1000
    media.append(assets)
    clip.update(assets=assets, license=clip.get('license', 'https://www.pexels.com/license/'))
    print('Prepared ' + clip['slug'], flush=True)
(ROOT / 'lib/banner-media.ts').write_text('// Each film illustrates the application described by its matching banner slide.\nexport const bannerMedia = ' + json.dumps(media, indent=2) + ';\n', encoding='utf-8')
(ROOT / 'reference/relevant-banner-footage.json').write_text(json.dumps({'usage': 'Real application-context footage; not PARK facilities or a measured filter performance demonstration.', 'adaptation': '8-second road and cabin films; 15-second Indian passenger train film. Silent native 4K H.264 desktop and Full HD mobile. Road desktop preserves original encoded frames without re-compression; other films use CRF 16/18. Versioned URLs.', 'clips': CLIPS}, indent=2) + '\n', encoding='utf-8')
