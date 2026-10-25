import * as THREE from './vendor/three.module.js';
// A vertex-cluster LOD derived from the downloaded character, retaining skinning.
// The full imported geometry is used with WebGL.
export function characterLOD(geometry){
 const p=geometry.attributes.position;geometry.computeBoundingBox();const size=geometry.boundingBox.getSize(new THREE.Vector3());const step=Math.max(size.x,size.y,size.z)/30;
 if(!step||p.count<250)return geometry;
 const joints=geometry.attributes.skinIndex,weights=geometry.attributes.skinWeight;const clusters=new Map(),representatives=[],remap=[];
 for(let i=0;i<p.count;i++){let dominant=-1;if(joints&&weights){let best=-1;for(let j=0;j<4;j++)if(weights.getComponent(i,j)>best){best=weights.getComponent(i,j);dominant=joints.getComponent(i,j);}}const key=Math.round(p.getX(i)/step)+','+Math.round(p.getY(i)/step)+','+Math.round(p.getZ(i)/step)+':'+dominant;let id=clusters.get(key);if(id===undefined){id=representatives.length;clusters.set(key,id);representatives.push(i);}remap[i]=id;}
 const indices=[],groups=[],idx=geometry.index,total=idx?idx.count:p.count;for(const group of geometry.groups.length?geometry.groups:[{start:0,count:total,materialIndex:0}]){const start=indices.length;for(let i=group.start;i<Math.min(total,group.start+group.count);i+=3){const a=remap[idx?idx.getX(i):i],b=remap[idx?idx.getX(i+1):i+1],c=remap[idx?idx.getX(i+2):i+2];if(a!==b&&a!==c&&b!==c)indices.push(a,b,c);}groups.push({start,count:indices.length-start,materialIndex:group.materialIndex});}
 const result=new THREE.BufferGeometry();for(const [name,attribute] of Object.entries(geometry.attributes)){const arr=new attribute.array.constructor(representatives.length*attribute.itemSize);for(let i=0;i<representatives.length;i++)for(let j=0;j<attribute.itemSize;j++)arr[i*attribute.itemSize+j]=attribute.getComponent(representatives[i],j);result.setAttribute(name,new THREE.BufferAttribute(arr,attribute.itemSize,attribute.normalized));}result.setIndex(indices);for(const group of groups)result.addGroup(group.start,group.count,group.materialIndex);result.computeBoundingSphere();return result;
}
