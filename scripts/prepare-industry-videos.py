"""Build silent, web-sized industry clips and matching posters."""
import json
import shutil
import subprocess
import urllib.request
from pathlib import Path
import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/videos/industries'
OUT.mkdir(parents=True, exist_ok=True)
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
clips = [
 {'slug':'mobility','title':'City traffic','id':1192116,'fps':30,'source':'https://www.pexels.com/video/1192116/'},
 {'slug':'manufacturing','title':'Textile production','local':'reference/textile-factory-original.mp4','speed':1.3},
 {'slug':'heavy-duty-industry','title':'Flowing molten steel','id':5121751,'fps':25,'source':'https://www.pexels.com/video/flowing-molten-steel-5121751/'},
 {'slug':'living','title':'Modern commercial building','id':7317314,'fps':25,'source':'https://www.pexels.com/video/architectural-design-of-a-modern-building-7317314/'},
 {'slug':'liquid','title':'Water treatment','local':'reference/water-treatment-original.mp4','start':5},
]
def run(args):
 result = subprocess.run([FFMPEG,'-hide_banner','-loglevel','error','-y',*args],capture_output=True,text=True)
 if result.returncode: raise RuntimeError(result.stderr)

for clip in clips:
 if 'local' in clip:
  original = ROOT / clip['local']
 else:
  original = ROOT / 'reference' / (clip['slug']+'-original.mp4')
  clip['download'] = f"https://videos.pexels.com/video-files/{clip['id']}/{clip['id']}-hd_1920_1080_{clip['fps']}fps.mp4"
  clip['license'] = 'https://www.pexels.com/license/'
  if not original.exists():
   request=urllib.request.Request(clip['download']+'?download=1',headers={'User-Agent':'Mozilla/5.0'})
   with urllib.request.urlopen(request,timeout=45) as response, original.open('wb') as target:
    shutil.copyfileobj(response,target)
   print(f"Downloaded {clip['slug']}: {original.stat().st_size} bytes",flush=True)
 video = OUT / (clip['slug']+'.mp4')
 run(['-ss',str(clip.get('start',0)),'-i',str(original),'-t','8','-vf',f"setpts={clip.get('speed',1)}*PTS,scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=24",'-an','-map_metadata','-1','-c:v','libx264','-pix_fmt','yuv420p','-preset','fast','-crf','25','-maxrate','1800k','-bufsize','3600k','-movflags','+faststart',str(video)])
 run(['-ss','0.5','-i',str(video),'-frames:v','1','-q:v','3',str(OUT/(clip['slug']+'-poster.jpg'))])
 clip['output']='/videos/industries/'+clip['slug']+'.mp4'
 clip['bytes']=video.stat().st_size
 print(f"Prepared {clip['slug']}: {clip['bytes']//1024} KB",flush=True)

(ROOT/'reference/industry-footage.json').write_text(json.dumps({'usage':'Industry context imagery, not PARK facilities or measured filtration demonstrations.','adaptation':'Up to 8 seconds, 1280x720, 24fps, silent H.264 faststart.','clips':clips},indent=2),encoding='utf-8')
