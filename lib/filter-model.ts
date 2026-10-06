import * as THREE from 'three';

// Photo-informed illustrations: geometry is not a manufacturing drawing.
export function createFilterModel(slug: string) {
  const model = new THREE.Group();
  const parts: { object: THREE.Object3D; offset: THREE.Vector3 }[] = [];
  const material = (color: number, metalness = 0) => new THREE.MeshStandardMaterial({ color, metalness, roughness: metalness ? .35 : .85, side: THREE.DoubleSide });
  const white = material(0xe8e8da), silver = material(0x9daeb2, .7), black = material(0x26353a), blue = material(0x14658c), green = material(0x74bca4), yellow = material(0xd6b957);
  const add = (geometry: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0, offset = new THREE.Vector3()) => {
    const mesh = new THREE.Mesh(geometry, mat); mesh.position.set(x,y,z); mesh.castShadow = true; mesh.receiveShadow = true; model.add(mesh);
    mesh.userData.origin = mesh.position.clone(); parts.push({object:mesh,offset}); return mesh;
  };
  const box = (w:number,h:number,d:number,mat:THREE.Material,x=0,y=0,z=0,offset=new THREE.Vector3()) => add(new THREE.BoxGeometry(w,h,d),mat,x,y,z,offset);
  const ring = (radius:number,tube:number,mat:THREE.Material,y:number,offset=new THREE.Vector3()) => {const mesh=add(new THREE.TorusGeometry(radius,tube,12,64),mat,0,y,0,offset);mesh.rotation.x=Math.PI/2;return mesh;};
  const isCylinder = ['cartridge-filter','swimming-pool-filter'].includes(slug);
  const isBag = ['bag-filter','liquid-filter'].includes(slug);
  if (isCylinder) {
    const radius=.66, height=2.25;
    for(let i=0;i<72;i++){const a=i/72*Math.PI*2;const mesh=box(.024,height,.17,white,Math.cos(a)*radius,0,Math.sin(a)*radius);mesh.rotation.y=-a;}
    for(const sign of [-1,1])ring(.64,.11,slug==='swimming-pool-filter'?blue:silver,sign*height/2,new THREE.Vector3(0,sign*.65,0));
    for(const y of [-.5,.5])if(slug==='cartridge-filter')ring(.68,.025,silver,y);
    const core=add(new THREE.CylinderGeometry(.48,.48,height,48,1,true),black);core.material=new THREE.MeshStandardMaterial({color:0x64757a,side:THREE.DoubleSide,wireframe:true,transparent:true,opacity:.4});
  } else if(isBag) {
    const mesh=add(new THREE.CylinderGeometry(.62,.43,2.1,48,16,true),white,0,-.05,0);
    const position=mesh.geometry.attributes.position;
    for(let i=0;i<position.count;i++){const y=position.getY(i);const wave=1+.018*Math.sin(Math.atan2(position.getZ(i),position.getX(i))*20+y*3);position.setX(i,position.getX(i)*wave);position.setZ(i,position.getZ(i)*wave);}mesh.geometry.computeVertexNormals();
    add(new THREE.SphereGeometry(.43,40,16,0,Math.PI*2,Math.PI/2,Math.PI/2),white,0,-1.1,0);
    ring(.63,.065,slug==='liquid-filter'?silver:white,1,new THREE.Vector3(0,.6,0));
    const seam=box(.022,1.95,.022,white,0,0,.58);seam.rotation.x=.08;
  } else if(slug==='pocket-filter') {
    for(let i=0;i<5;i++){
      const shape=new THREE.Shape();shape.moveTo(-.22,.78);shape.lineTo(.22,.78);shape.lineTo(.16,-.95);shape.quadraticCurveTo(0,-1.14,-.16,-.95);shape.closePath();
      const mesh=add(new THREE.ExtrudeGeometry(shape,{depth:.8,bevelEnabled:true,bevelSize:.025,bevelThickness:.025,bevelSegments:2,steps:1}),yellow,(i-2)*.48,0,-.4,new THREE.Vector3((i-2)*.12,-.22,0));
      mesh.rotation.x=-.16;
    }
    box(2.6,.09,1,silver,0,.85,0,new THREE.Vector3(0,.6,0));box(.08,1.8,1,silver,-1.3,0,0);box(.08,1.8,1,silver,1.3,0,0);box(2.6,.08,1,silver,0,-.9,0);
  } else if(['filter-mats','ceiling-filter'].includes(slug)) {
    for(let i=0;i<3;i++)box(2.5-i*.1,.12,1.9-i*.07,i===1&&slug==='filter-mats'?blue:white,0,i*.17-.16,0,new THREE.Vector3(0,(i-1)*.55,0));
  } else {
    const dark=['cabin-air-filter','battery-air-filter'].includes(slug);
    const frame=['engine-air-filter','battery-air-filter','car-purifier-filter','hepa-filter'].includes(slug)?black:silver;
    const w=2.5,h=1.85,d=slug==='panel-filter'?.45:.23;
    box(w+.2,.13,d+.12,frame,0,h/2,0,new THREE.Vector3(0,.32,0));box(w+.2,.13,d+.12,frame,0,-h/2,0,new THREE.Vector3(0,-.32,0));
    box(.13,h,d+.12,frame,-w/2,0,0,new THREE.Vector3(-.32,0,0));box(.13,h,d+.12,frame,w/2,0,0,new THREE.Vector3(.32,0,0));
    const verts:number[]=[];const count=slug==='hepa-filter'?62:36;
    for(let i=0;i<count;i++){
      const x=-w/2+.08+i*(w-.16)/count, next=x+(w-.16)/count, z=i%2?d/2:-d/2, nextz=-z;
      verts.push(x,-h/2+.08,z,next,-h/2+.08,nextz,next,h/2-.08,nextz,x,-h/2+.08,z,next,h/2-.08,nextz,x,h/2-.08,z);
    }
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));geometry.computeVertexNormals();add(geometry,dark?black:slug==='engine-air-filter'?yellow:white,0,0,0,new THREE.Vector3(0,0,.25));
    if(slug==='car-purifier-filter')box(w-.15,h-.15,.035,green,0,0,d/2+.08,new THREE.Vector3(0,0,.9));
  }
  return {model,setExploded(amount:number){for(const {object,offset} of parts)object.position.copy(object.userData.origin).addScaledVector(offset,amount);}};
}

export function lightFilterScene(scene: THREE.Scene) {
  scene.add(new THREE.HemisphereLight(0xeefaff,0x364c47,2.4));
  const key=new THREE.DirectionalLight(0xffffff,3.2);key.position.set(3,5,6);scene.add(key);
  const edge=new THREE.DirectionalLight(0x8dd9d6,2);edge.position.set(-4,1,-3);scene.add(edge);
}
