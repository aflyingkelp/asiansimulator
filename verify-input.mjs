import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const source=readFileSync(new URL('./dist/game.js',import.meta.url),'utf8');
const jumpSource=source.match(/function jump\(\)\{[^\n]+\}/)?.[0];
assert.ok(jumpSource,'Game jump handler exists');
const label={textContent:''},fighter={busy:true,stamina:100};
const jumpGame=new Function('fighter','airSmash','isGrounded','jumpsUsed','jumpVelocity','jumpHeight','effects','player','THREE','$','toast',`let jumpsUsedLocal=jumpsUsed;${jumpSource.replaceAll('jumpsUsed','jumpsUsedLocal')};return {jump,state:()=>({used:jumpsUsedLocal,ground:isGrounded,velocity:jumpVelocity,stamina:fighter.stamina})};`)(fighter,false,true,0,0,0,{burst(){}},{g:{position:{clone(){return {add(){return this;}};}}}},{Vector3:class{}},()=>label,()=>{});
jumpGame.jump();
assert.deepEqual(jumpGame.state(),{used:1,ground:false,velocity:8.5,stamina:92},'Ground jump works while an attack is busy');
jumpGame.jump();
assert.deepEqual(jumpGame.state(),{used:2,ground:false,velocity:8.1,stamina:84},'Second jump works in midair');
assert.equal(label.textContent,'Second Wind');
jumpGame.jump();
assert.equal(jumpGame.state().used,2,'Third jump is blocked');
assert.match(source,/if\(jumpHeight===0&&jumpVelocity<0\).*jumpsUsed=0/,'Landing resets the jump count');

const combatSource=source.match(/function combatInput\(type,index=null\)\{[^\n]+\}/)?.[0];
assert.ok(combatSource,'Game combat input handler exists');
let now=100,comboBuffer=[],actions=[];
const combatGame=new Function('performance','playing','paused','lastCombatInput','playerStun','toast','tryElementCombo','performChord','comboBuffer','ninjaChain','ninjaChainTimer','startMove','castElement',`let last=lastCombatInput;${combatSource.replaceAll('lastCombatInput','last')};return {input:combatInput};`)({now:()=>now},true,false,null,0,()=>{},type=>{if(type==='light')comboBuffer.push('light');return false;},()=>{actions.push('ninja chord');return true;},comboBuffer,0,0,type=>actions.push(type),()=>{});
combatGame.input('light');
now+=100;
combatGame.input('heavy');
assert.deepEqual(actions,['light','ninja chord'],'Click then Q starts the ninja chord before combo buffering consumes it');
combatGame.input('uppercut');assert.deepEqual(actions,['light','ninja chord','uppercut'],'W + Q dispatches the launcher as a distinct move');
assert.match(source,/e\.code==='KeyQ'&&keys\.has\('KeyW'\)\)combatInput\('uppercut'\)/,'Grounded W + Q maps to uppercut while regular Q remains heavy');

console.log('PASS: jump during attack recovery, double jump, third-jump block, landing reset, click+Q chord precedence, and W+Q uppercut binding.');
