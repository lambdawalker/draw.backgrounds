import {line, samples, path, ellipse} from './geometry.js';
const inks={washington:'#6496a4',arkansas:'#b79a67',illinois:'#899fb7',tennessee:'#a58088',alaska:'#8da99b',wyoming:'#659e99',louisiana:'#a4a475',utah:'#bb968c',colorado:'#929eab',idaho:'#87a8b7'};
export function finish(c,state){
 const ink=inks[state];
 // Broad, crossing engraving bands vary smoothly rather than forming a flat grid.
 for(let j=0;j<16;j++)c.add(line(samples(x=>[x,815+j*2.3-80*Math.sin(x/340)+12*Math.sin(x/95+j*.07)],-20,1420,8),ink,.55,.17));
 for(let j=0;j<12;j++)c.add(line(samples(x=>[x,30+j*3+20*Math.sin(x/220+j*.04)],-20,1420,8),ink,.55,.15));
}
