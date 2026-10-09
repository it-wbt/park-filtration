"""Prepare smaller web delivery assets; retain source originals."""
from pathlib import Path
import json,subprocess
from PIL import Image
import imageio_ffmpeg
ROOT=Path(__file__).resolve().parents[1]
ff=imageio_ffmpeg.get_ffmpeg_exe()
records=[]
for name in ['hepa-highlight-transparent','liquid-bag-highlight-render']:
 source=ROOT/'public/images'/f'{name}.png'
 target=source.with_suffix('.webp')
 im=Image.open(source);im.thumbnail((900,900))
 im.save(target,'WEBP',quality=85,method=6)
 records.append(dict(asset=str(target.relative_to(ROOT)),before=source.stat().st_size,after=target.stat().st_size))
for slug,source in [('city-highway','city-highway-hd'),('scenic-train','scenic-train-4k'),('family-cabin','family-cabin-4k')]:
 source=ROOT/'public/videos/home'/f'{source}.mp4'
 for suffix,width,rate in [('optimized',1920,'2200k'),('mobile',960,'850k')]:
  target=source.with_name(f'{slug}-{suffix}.mp4')
  result=subprocess.run([ff,'-hide_banner','-loglevel','error','-y','-i',str(source),'-t','10','-vf',f'scale={width}:-2,fps=24','-an','-map_metadata','-1','-c:v','libx264','-pix_fmt','yuv420p','-preset','fast','-crf','27','-maxrate',rate,'-bufsize','4400k','-movflags','+faststart',str(target)],capture_output=True,text=True)
  if result.returncode:raise RuntimeError(result.stderr)
  records.append(dict(asset=str(target.relative_to(ROOT)),before=source.stat().st_size,after=target.stat().st_size))
  print(target.name,target.stat().st_size,flush=True)
for source in (ROOT/'public/videos/industries').glob('*.mp4'):
 if source.stem.endswith('-optimized'): continue
 target=source.with_name(source.stem+'-optimized.mp4')
 result=subprocess.run([ff,'-hide_banner','-loglevel','error','-y','-i',str(source),'-vf','scale=640:-2,fps=24','-an','-map_metadata','-1','-c:v','libx264','-pix_fmt','yuv420p','-preset','fast','-crf','28','-maxrate','500k','-bufsize','1000k','-movflags','+faststart',str(target)],capture_output=True,text=True)
 if result.returncode:raise RuntimeError(result.stderr)
 records.append(dict(asset=str(target.relative_to(ROOT)),before=source.stat().st_size,after=target.stat().st_size))
 print(target.name,target.stat().st_size,flush=True)
for source in (ROOT/'public/videos').rglob('*poster.jpg'):
 im=Image.open(source)
 im.thumbnail((1280,720) if source.parent.name=='home' else (640,360))
 target=source.with_suffix('.webp');im.save(target,'WEBP',quality=78,method=6)
 records.append(dict(asset=str(target.relative_to(ROOT)),before=source.stat().st_size,after=target.stat().st_size))
(ROOT/'reference/media-optimization.json').write_text(json.dumps(records,indent=2))
print('Images, posters and videos optimized')
