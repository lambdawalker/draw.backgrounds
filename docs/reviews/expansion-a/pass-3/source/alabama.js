import {paper,field,dome,border,flourish,quality,leaf} from './helpers.js';
export default function(c,p){paper(c,['#f2ece5','#e5ede9','#e7d8da']);field(c,'#7b9590',p);dome(c,1000,744,1.55,'#6f9392');flourish(c,750,250,680,'#b99b9c');if(quality.pass>=5){leaf(c,1260,800,180,-105,'#7d9c90');leaf(c,1250,800,150,-155,'#7d9c90');}border(c,'#b2919d');}
