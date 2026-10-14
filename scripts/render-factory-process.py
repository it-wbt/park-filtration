"""Animate four generated factory scenes as an illustrative process film."""
import hashlib
import json
import subprocess
from pathlib import Path

import imageio_ffmpeg

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/videos/home'
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
record = json.loads((ROOT / 'reference/factory-process-generation.json').read_text())
scenes = record['scenes']
work = ROOT / 'reference/factory-process-segments'
work.mkdir(exist_ok=True)

def run(*args):
    subprocess.run([FFMPEG,'-hide_banner','-loglevel','error','-y',*map(str,args)],check=True)

segments = []
for i,scene in enumerate(scenes):
    target = work / f'{i+1}.mp4'
    # Smooth, subtle camera motion across the photographic scenes.
    x = "iw/2-iw/zoom/2+sin(on/165*PI)*iw*0.012" if i%2==0 else "iw/2-iw/zoom/2-sin(on/165*PI)*iw*0.012"
    filters = f"scale=3840:2160:force_original_aspect_ratio=increase,crop=3840:2160,zoompan=z='1.04+on*0.00035':x='{x}':y='ih/2-ih/zoom/2':d=165:s=1920x1080:fps=30,setsar=1,format=yuv420p"
    run('-i',ROOT/scene['path'],'-vf',filters,'-frames:v',165,'-an','-c:v','libx264','-preset','fast','-crf',18,target)
    segments.append(target)
    print(f'Rendered scene {i+1}/4',flush=True)

master = OUT / 'banner-factory-process-desktop.mp4'
inputs = [argument for segment in segments for argument in ['-i',segment]]
filters = '[0:v][1:v]xfade=transition=fade:duration=0.5:offset=5[v1];[v1][2:v]xfade=transition=fade:duration=0.5:offset=10[v2];[v2][3:v]xfade=transition=fade:duration=0.5:offset=15,format=yuv420p[out]'
run(*inputs,'-filter_complex',filters,'-map','[out]','-an','-c:v','libx264','-preset','fast','-crf',19,'-movflags','+faststart',master)

def version(path):
    digest=hashlib.sha256(path.read_bytes()).hexdigest()[:10]
    final=path.with_name(path.stem+'-'+digest+path.suffix)
    path.replace(final)
    return '/videos/home/'+final.name

assets={'highResolutionSrc':version(master),'durationMs':20500}
master=ROOT/'public'/assets['highResolutionSrc'].lstrip('/')
mobile=OUT/'banner-factory-process-mobile.mp4'
poster=OUT/'banner-factory-process-poster.webp'
run('-i',master,'-vf','scale=1280:720','-an','-c:v','libx264','-preset','fast','-crf',20,'-movflags','+faststart',mobile)
run('-ss',1,'-i',master,'-frames:v',1,poster)
assets.update(src=version(mobile),poster=version(poster))
(ROOT/'lib/factory-media.ts').write_text('// AI-generated scenes animated as an illustrative process overview, not actual factory footage.\nexport const factoryMedia = '+json.dumps(assets,indent=2)+';\nexport const factorySteps = '+json.dumps([s['title'] for s in scenes])+';\nexport const factoryStepAt = (time: number) => Math.min(3, Math.floor(time / 5));\n')
path=ROOT/'lib/banner-media.ts';text=path.read_text();media=json.loads(text[text.index('['):text.rindex(']')+1]);media[0]=assets
path.write_text('// Each film illustrates the application described by its matching banner slide.\nexport const bannerMedia = '+json.dumps(media,indent=2)+';\n')
record.update(assets=assets,adaptation='Four generated scenes with subtle camera pans and zooms, 0.5-second crossfades, 20.5 seconds, silent. Website step captions follow video playback. Not actual factory footage or a verified PARK manufacturing sequence.')
(ROOT/'reference/factory-process-generation.json').write_text(json.dumps(record,indent=2)+'\n')
path=ROOT/'reference/relevant-banner-footage.json';all=json.loads(path.read_text(encoding='utf-8'));all['clips'][0]={'slug':'banner-factory-process','source':'AI-generated scenes; see reference/factory-process-generation.json','assets':assets,'application':'Illustrative fibre, nonwoven process, filter-media roll and finished-filter stages','adaptation':record['adaptation']};all['adaptation']='Generated process illustration for first banner; licensed freight and cabin context footage retained.';path.write_text(json.dumps(all,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
print(json.dumps(assets),flush=True)
