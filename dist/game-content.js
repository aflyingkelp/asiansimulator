export const ELEMENTS={
 fire:{name:'Fire',symbol:'火',color:'#e77748',motto:'A fierce answer to a cruel world.',lore:'Fire is the element of courage and change. It rewards a bold attack and keeps pressure on a marked foe.',skills:[['Ember Cut','1 · 15 qi · 6s','A quick flaming arc. Deals 30 damage and starts a short burn.'],['Lantern Guard','2 · 25 qi · 10s','Surround yourself with heat. Heal 18 and scorch nearby enemies for 20.'],['Red Comet','3 · 40 qi · 16s','A committed lunge through the target. Deals 58 damage and staggers.']]},
 water:{name:'Water',symbol:'水',color:'#70b9c3',motto:'Yield, then carry the mountain away.',lore:'Water adapts. Its skills restore health and create room to recover between exchanges.',skills:[['Falling Stream','1 · 15 qi · 6s','A flowing blade stroke. Deals 27 damage and heals 8.'],['Still Pool','2 · 25 qi · 10s','A calm breath restores 32 health and 20 stamina.'],['River Wheel','3 · 40 qi · 16s','A broad wave strikes all nearby foes for 42 and restores 20 health.']]},
 wood:{name:'Wood',symbol:'木',color:'#9eae65',motto:'Every strong tree began as a seed.',lore:'Wood grows through patience. It is the safest element for controlling an enemy and setting up a counterattack.',skills:[['Briar Lash','1 · 15 qi · 6s','A thorny reach hits at range for 26 and briefly slows the foe.'],['Root Snare','2 · 25 qi · 10s','Roots bind nearby enemies for a long stagger and deal 18 damage.'],['Old Pine','3 · 40 qi · 16s','A sturdy stance heals 20 and restores 35 stamina.']]},
 metal:{name:'Metal',symbol:'金',color:'#d4c99b',motto:'A clear edge comes from steady hands.',lore:'Metal favors precision, guard breaks, and disciplined timing. Strong against an enemy that leaves an opening.',skills:[['Silver Line','1 · 15 qi · 6s','A precise cut for 34 damage with a small stagger.'],['Bell Parry','2 · 25 qi · 10s','A measured counter. Restore 15 stamina and stagger nearby enemies.'],['Hundred-Fold Edge','3 · 40 qi · 16s','A hard finishing strike for 64 damage and a guard break.']]},
 earth:{name:'Earth',symbol:'土',color:'#c49a65',motto:'Stand firm, and let the storm pass.',lore:'Earth turns defense into strength. It can withstand pressure, shove foes back, and steady your recovery.',skills:[['Stone Palm','1 · 15 qi · 6s','A close shock deals 30 damage and knocks enemies away.'],['Mountain Breath','2 · 25 qi · 10s','Restore 25 health and 25 stamina; reduce incoming damage for a moment.'],['Groundsplitter','3 · 40 qi · 16s','A heavy ground wave deals 52 to all close foes and staggers them.']]}
};
export const QUESTS=[
['A place to begin','Talk to Old Wen beside the well.','talk'],
['Learn the edge','Strike the training post three times.','dummy',3],
['Medicine for the road','Gather three wild herb bundles.','herbs',3],
['A better coat','Equip a piece of gear from your pack.','equip'],
['The path you choose','Choose an element that suits you.','element'],
['A new kind of strength','Use your element skills three times.','elementUse',3],
['The tribute collector','Defeat the collector in the southwest camp.','boss:collector'],
['Whispers in the reeds','Defeat the guardian in the eastern marsh.','boss:guardian'],
['Read the shoulders','Parry three incoming attacks.','parry',3],
['Break their guard','Land five heavy strikes.','heavy',5],
['For the village stores','Gather five herb bundles in all.','herbs',5],
['The mountain road','Defeat the Warden on the northern road.','boss:warden'],
['Home with the dawn','Return to Old Wen after freeing the valley.','return']
].map(([title,description,key,goal=1])=>({title,description,key,goal}));
export const GEAR=[
{id:'reedcoat',name:'Reed-Woven Coat',slot:'Coat',unlock:0,description:'A light coat that turns a hard fall into a scrape.',hp:14},
{id:'ironedge',name:'Village Iron Jian',slot:'Blade',unlock:1,description:'A balanced sword with a plain iron edge.',damage:4},
{id:'rivercord',name:'River-Knot Sash',slot:'Charm',unlock:2,description:'A patient breath brings qi back more quickly.',qi:12},
{id:'bronzeplate',name:'Bronze Shoulder Guard',slot:'Coat',unlock:4,description:'A salvaged guard that makes blocks hold longer.',hp:18},
{id:'pineblade',name:'Pine-Hilt Sword',slot:'Blade',unlock:6,description:'A firm grip adds weight to every strike.',damage:7},
{id:'jadebead',name:'Jade Breath Bead',slot:'Charm',unlock:8,description:'A cool bead helps restore focus.',qi:18},
{id:'mountainmail',name:'Mountain Lamellar',slot:'Coat',unlock:11,description:'Heavy plates for the road above the clouds.',hp:28},
{id:'wardensedge',name:'Warden’s Long Jian',slot:'Blade',unlock:11,description:'A carefully forged blade, earned by ending the tribute.',damage:12}
];

export const MOB_GEAR=[
{id:'drop_cloth',name:'Scavenged Patrol Jacket',slot:'Coat',rarity:'Common',description:'A reinforced street jacket with a few working buttons.',hp:6},
{id:'drop_baton',name:'Cracked Nightstick',slot:'Blade',rarity:'Common',description:'A light, quick baton recovered from a roadside thug.',damage:2},
{id:'drop_sneakers',name:'Runner’s Sneakers',slot:'Boots',rarity:'Unusual',description:'Light soles help you keep moving.',qi:5},
{id:'drop_gloves',name:'Padded Guard Gloves',slot:'Charm',rarity:'Unusual',description:'Soft padding steadies your guard.',hp:8},
{id:'drop_radio',name:'Patrol Radio Charm',slot:'Charm',rarity:'Rare',description:'A field radio that focuses your breathing.',qi:9},
{id:'drop_vest',name:'Metro Security Vest',slot:'Coat',rarity:'Rare',description:'A sturdy vest with room for travel gear.',hp:13},
{id:'drop_broadway',name:'Broadway Steel Baton',slot:'Blade',rarity:'Epic',description:'A well balanced baton with a bright enamel grip.',damage:6},
{id:'drop_metro',name:'Metro Shield Buckler',slot:'Coat',rarity:'Epic',description:'A compact shield reinforced with street signs.',hp:20},
{id:'drop_marquee',name:'Marquee Edge',slot:'Blade',rarity:'Legendary',description:'A luminous edge recovered from the city’s deepest patrol.',damage:10},
{id:'drop_skyline',name:'Skyline Mantle',slot:'Coat',rarity:'Mythic',description:'A rare mantle threaded with old city sigils.',hp:28},
{id:'drop_ultra',name:'Ultra Skyline Dagger',slot:'Blade',rarity:'Ultra',description:'A shimmering blade recovered from a city champion.',damage:11},
{id:'drop_super',name:'Super Transit Mantle',slot:'Coat',rarity:'Super',description:'A distinctive travel mantle, marked by every borough it crossed.',hp:32},
{id:'drop_eternal',name:'Eternal Signal Pendant',slot:'Charm',rarity:'Eternal',description:'A near-mythic pendant that steadies qi.',qi:24},
{id:'drop_unique',name:'One-of-a-Kind Crown Pin',slot:'Charm',rarity:'Unique',description:'A singular keepsake from a once-in-a-journey find.',hp:18,damage:4,qi:12}
];
export const SIDE_QUESTS=[
{title:'Lost in the Marquee',description:'Search three city interiors and bring their tokens back.',type:'room',goal:3,reward:'drop_broadway'},
{title:'The Long Walk',description:'Light all four route checkpoints.',type:'checkpoint',goal:4,reward:'drop_sneakers'},
{title:'Patrol Watch',description:'Drive off six armed city patrols.',type:'cityKill',goal:6,reward:'drop_vest'},
{title:'Roadside Cleanup',description:'Defeat five threats along the wilderness road.',type:'roadKill',goal:5,reward:'drop_gloves'},
{title:'A Better Signal',description:'Find four interior supply caches.',type:'cache',goal:4,reward:'drop_radio'},
{title:'Broadway Regular',description:'Visit the diner, theatre, hotel, and gear exchange.',type:'room',goal:4,reward:'drop_metro'},
{title:'Quiet the Crossroads',description:'Defeat twelve enemies anywhere beyond the village.',type:'kill',goal:12,reward:'drop_marquee'},
{title:'City Legend',description:'Explore all twelve indoor spaces and defeat a city patrol.',type:'cityLegend',goal:12,reward:'drop_skyline'}
];
export const DROP_RARITIES=['Common','Unusual','Rare','Epic','Legendary','Mythic','Ultra','Super','Eternal','Unique'];

export const DAN_RANKS=['1st Dan','2nd Dan','3rd Dan','4th Dan','5th Dan','6th Dan','7th Dan','8th Dan','9th Dan','10th Dan','Alpha','Beta','Gamma','Delta','Epsilon'].map((name,index)=>({name,index,hp:index<10?1+index*.28:4+(index-10)*2.2,damage:index<10?1+index*.14:2.8+(index-10)*1.35,speed:index<10?1+index*.035:1.35+(index-10)*.19}));
