export function clampPitch(value){return Math.max(.12,Math.min(1.28,value));}
export function zoomDistance(distance,delta){return Math.max(3.2,Math.min(28,distance*Math.exp(Math.max(-150,Math.min(150,delta))*.0018)));}
export function orbitOffset(yaw,pitch,distance){const radius=Math.cos(pitch)*distance;return {x:Math.sin(yaw)*radius,y:Math.sin(pitch)*distance,z:Math.cos(yaw)*radius};}
export class CameraControls{
 constructor(surface,{button,status,isActive,onUnlock,onMessage}){
  this.surface=surface;this.button=button;this.status=status;this.isActive=isActive;this.onUnlock=onUnlock;this.onMessage=onMessage;
  this.yaw=0;this.pitch=.35;this.distance=10;this.mode='locked';this.dragging=false;
  this.button.onclick=()=>this.toggle();
  document.addEventListener('mousemove',e=>{if(!this.isActive())return;if(document.pointerLockElement===surface||(this.mode==='free'&&this.dragging)){this.yaw-=e.movementX*.0028;this.pitch=clampPitch(this.pitch+e.movementY*.0028);}});
  surface.addEventListener('mousedown',e=>{if(e.button===2&&this.mode==='free'){this.dragging=true;e.preventDefault();}if(e.button===0&&this.mode==='locked'&&document.pointerLockElement!==surface&&this.isActive())this.capture();});
  document.addEventListener('mouseup',()=>this.dragging=false);
  window.addEventListener('blur',()=>this.dragging=false);
  surface.addEventListener('wheel',e=>{if(!this.isActive())return;e.preventDefault();this.distance=zoomDistance(this.distance,e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?innerHeight:1));},{passive:false});
  surface.addEventListener('contextmenu',e=>e.preventDefault());
  document.addEventListener('pointerlockchange',()=>{const was=this.locked;this.locked=document.pointerLockElement===surface;this.sync();if(was&&!this.locked&&this.mode==='locked'&&this.isActive())this.onUnlock();});
  document.addEventListener('pointerlockerror',()=>this.failed());this.sync();
 }
 sync(){const locked=document.pointerLockElement===this.surface;this.button.textContent=this.mode==='locked'?'C · Locked camera':'C · Free cursor';this.button.setAttribute('aria-pressed',String(this.mode==='locked'));this.status.textContent=this.mode==='locked'?(locked?'Mouse look · Arrow keys orbit · Wheel zoom · C frees cursor':'Click world to capture · Arrow keys orbit · Wheel zoom'):'Arrow keys / hold right mouse orbit · Wheel zoom · C locks cursor';document.body.classList.toggle('mouse-locked',locked);}
 failed(){this.mode='free';this.sync();this.onMessage('Mouse capture unavailable here. Free cursor mode: hold right mouse to orbit.');}
 capture(){if(this.mode!=='locked')return;try{const pending=this.surface.requestPointerLock();pending?.catch(()=>this.failed());}catch{this.failed();}}
 release(){this.dragging=false;if(document.pointerLockElement===this.surface)document.exitPointerLock();}
 toggle(){this.mode=this.mode==='locked'?'free':'locked';if(this.mode==='free')this.release();else if(this.isActive())this.capture();this.sync();}
}
