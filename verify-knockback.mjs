import assert from 'node:assert/strict';
import {Fighter,MOVES,inStrikeRange} from './dist/combat.js';
import {knockbackImpulse,stepAirborne} from './dist/combat-physics.js';
assert.ok(knockbackImpulse(MOVES.light1.push)>2.5,'A light hit now has enough recoil to visibly move a target');
assert.ok(knockbackImpulse(MOVES.heavy.push)>5,'Heavy attacks create stronger spacing');
const fighter=new Fighter();assert.ok(fighter.start('uppercut'));assert.equal(fighter.action,'uppercut');assert.equal(fighter.consumeHit(),null);fighter.tick(.1);const strike=fighter.consumeHit();assert.equal(strike.key,'uppercut');assert.ok(strike.launch>=9,'Uppercut carries a clear launch impulse');
const target={g:{position:{y:0}},airborneVelocity:strike.launch};let airborneSeconds=0,peak=0,followUpWindow=false;
for(let i=0;i<120;i++){const airborne=stepAirborne(target,1/60);if(airborne){airborneSeconds+=1/60;peak=Math.max(peak,target.g.position.y);followUpWindow ||= inStrikeRange(0,0,0,0,3,MOVES.light1);}else break;}
assert.ok(peak>1.5,'Launcher lifts target visibly above ground');assert.ok(airborneSeconds>.55,'Target remains available for a juggle follow-up');assert.ok(followUpWindow,'Grounded follow-up attack can connect during the launch');assert.equal(target.g.position.y,0,'Target lands back on the ground');assert.equal(target.airborneVelocity,undefined,'Airborne state clears after landing');
console.log('PASS: light/heavy recoil strength, uppercut timing and launch, airborne gravity/landing, and midair juggle hit window.');
