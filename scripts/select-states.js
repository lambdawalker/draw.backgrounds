import {rng} from '../src/geometry.js';
const states='Alabama Alaska Arizona Arkansas California Colorado Connecticut Delaware Florida Georgia Hawaii Idaho Illinois Indiana Iowa Kansas Kentucky Louisiana Maine Maryland Massachusetts Michigan Minnesota Mississippi Missouri Montana Nebraska Nevada New_Hampshire New_Jersey New_Mexico New_York North_Carolina North_Dakota Ohio Oklahoma Oregon Pennsylvania Rhode_Island South_Carolina South_Dakota Tennessee Texas Utah Vermont Virginia Washington West_Virginia Wisconsin Wyoming'.split(' ');
const r=rng(20261105);for(let i=states.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[states[i],states[j]]=[states[j],states[i]];}
console.log(states.slice(0,10).join(', '));
