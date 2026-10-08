"""Prepare licensed stock context footage matching the three homepage messages."""
import concurrent.futures
import json
import subprocess
import urllib.request
from pathlib import Path
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/videos/home'
OUT.mkdir(parents=True, exist_ok=True)
clips = [
    {'slug': 'forest-road', 'id': 19534739, 'fps': 60, 'resolution': '1280_720', 'title': 'Aerial view of a winding road in the forest', 'source': 'https://www.pexels.com/video/aerial-view-of-a-winding-road-in-the-forest-19534739/'},
    {'slug': 'scenic-train', 'id': 5171206, 'fps': 30, 'resolution': '1920_1080', 'title': 'Drone footage of moving train during sunset', 'source': 'https://www.pexels.com/video/drone-footage-of-moving-train-during-sunset-5171206/'},
    {'slug': 'family-cabin', 'id': 6181414, 'fps': 25, 'resolution': '1920_1080', 'title': 'Family on a road trip with baby', 'source': 'https://www.pexels.com/video/family-on-a-road-trip-with-baby-6181414/'},
]
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()

def run(args):
    subprocess.run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', *args], check=True)

def prepare(clip):
    url = f"https://videos.pexels.com/video-files/{clip['id']}/{clip['id']}-hd_{clip['resolution']}_{clip['fps']}fps.mp4"
    original = ROOT / 'reference' / (clip['slug'] + '-original.mp4')
    if not original.exists():
        request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(request, timeout=45) as response:
            original.write_bytes(response.read())
    video = OUT / (clip['slug'] + '.mp4')
    run(['-i', str(original), '-t', '10', '-vf', 'scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=24', '-an', '-map_metadata', '-1', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'fast', '-crf', '24', '-movflags', '+faststart', str(video)])
    run(['-ss', '1', '-i', str(video), '-frames:v', '1', '-q:v', '3', str(OUT / (clip['slug'] + '-poster.jpg'))])
    clip.update(download=url, license='https://www.pexels.com/license/', output='/videos/home/' + clip['slug'] + '.mp4', bytes=video.stat().st_size)
    print('Prepared ' + clip['slug'], flush=True)
    return clip

if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        results = list(pool.map(prepare, clips))
    (ROOT / 'reference/home-banner-footage.json').write_text(json.dumps({'usage': 'Illustrative context footage, not PARK facilities or a filter performance demonstration.', 'adaptation': '10 seconds, 1280x720, 24 fps, silent H.264 faststart.', 'clips': results}, indent=2), encoding='utf-8')
