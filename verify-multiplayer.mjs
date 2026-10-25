import assert from 'node:assert/strict';
import http from 'node:http';
import multiplayer from './multiplayer-server.cjs';

const server=http.createServer((req,res)=>{if(new URL(req.url,'http://localhost').pathname==='/api/multiplayer')multiplayer.handle(req,res);else{res.writeHead(404);res.end();}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
const a={clientId:'fighter-alpha',name:'Alpha',element:'fire'},b={clientId:'fighter-bravo',name:'Bravo',element:'earth'};
async function post(action,player,extra={}){const response=await fetch(base+'/api/multiplayer',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,...player,...extra})});return {status:response.status,data:await response.json()};}
async function pause(ms=520){await new Promise(resolve=>setTimeout(resolve,ms));}
try{
 let r=await post('host',a);assert.equal(r.status,200);assert.match(r.data.code,/^[A-Z0-9]{5}$/);const code=r.data.code;
 r=await post('join',b,{code});assert.equal(r.status,200);assert.equal(r.data.players.length,2);
 const c={clientId:'fighter-charlie',name:'Charlie'},d={clientId:'fighter-delta',name:'Delta'},e={clientId:'fighter-echo',name:'Echo'};
 r=await post('join',c,{code});assert.equal(r.status,200);r=await post('join',d,{code});assert.equal(r.data.players.length,4);r=await post('join',e,{code});assert.equal(r.status,409,'Rooms cap at four players');
 r=await post('challenge',a,{code,target:b.clientId});assert.equal(r.data.invite.from,a.clientId);
 r=await post('accept',b,{code});assert.equal(r.data.duel.state,'active');assert.equal(r.data.duel.health[a.clientId],100);
 await post('sync',a,{code,x:0,z:0,yaw:Math.PI,guarding:false});await post('sync',b,{code,x:0,z:3,yaw:Math.PI,guarding:false});
 r=await post('attack',a,{code,style:'light'});assert.equal(r.data.hit,false,'A strike facing away misses');
 await post('sync',a,{code,x:0,z:0,yaw:0});await pause();r=await post('attack',a,{code,style:'light'});assert.equal(r.data.hit,true,'Expected in-range front hit; got '+r.data.reason);assert.equal(r.data.duel.health[b.clientId],85);
 const fast=await post('attack',a,{code,style:'light'});assert.equal(fast.data.reason,'cooldown');
 await post('sync',b,{code,x:0,z:3,yaw:Math.PI,guarding:true});await pause();r=await post('attack',a,{code,style:'heavy'});assert.equal(r.data.hit,true);assert.equal(r.data.damage,7,'Guard reduces duel damage');
 await post('sync',b,{code,x:0,z:3,yaw:Math.PI,guarding:false,dodging:true});await pause();r=await post('attack',a,{code,style:'heavy'});assert.equal(r.data.reason,'evaded');
 await post('sync',b,{code,x:0,z:3,yaw:Math.PI,dodging:false});
 await pause(600);r=await post('attack',a,{code,style:'uppercut'});assert.equal(r.data.hit,true,'Uppercut duel style is accepted in range');assert.equal(r.data.damage,23,'Uppercut has its own duel damage value');assert.equal(r.data.duel.lastHit.style,'uppercut');
 while(r.data.duel?.state==='active'){await pause();r=await post('attack',a,{code,style:'heavy'});if(!r.data.hit&&r.data.reason!=='cooldown')assert.fail('In-range duel strike failed: '+r.data.reason);}
 assert.equal(r.data.duel.state,'finished');assert.equal(r.data.duel.winner,a.clientId);
 r=await post('leave',b,{code});assert.equal(r.data.left,true);await post('leave',c,{code});await post('leave',d,{code});await post('leave',a,{code});
 console.log('PASS: room codes, two-player join, duel invite/accept, facing/range hit checks, uppercut duel attack, attack cooldowns, guard reduction, dodge evasion, knockout, and leave.');
}finally{await new Promise(resolve=>server.close(resolve));}
