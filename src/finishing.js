import {line, samples, path, ellipse} from './geometry.js';
const inks={washington:'#6496a4',arkansas:'#b79a67',illinois:'#899fb7',tennessee:'#a58088',alaska:'#8da99b',wyoming:'#659e99',louisiana:'#a4a475',utah:'#bb968c',colorado:'#929eab',idaho:'#87a8b7'};
export function finish(c,state){
 const ink=inks[state];
 // Broad, crossing engraving bands vary smoothly rather than forming a flat grid.
 for(let j=0;j<16;j++)c.add(line(samples(x=>[x,815+j*2.3-80*Math.sin(x/340)+12*Math.sin(x/95+j*.07)],-20,1420,8),ink,.55,.17));
 for(let j=0;j<12;j++)c.add(line(samples(x=>[x,30+j*3+20*Math.sin(x/220+j*.04)],-20,1420,8),ink,.55,.15));
 const placements={washington:[1200,760],arkansas:[1300,580],illinois:[1280,730],tennessee:[1310,730],alaska:[120,760],wyoming:[1300,730],louisiana:[1260,700],utah:[1300,740],colorado:[1220,790],idaho:[1230,740]};
 const [bx,by]=placements[state];
 c.add(path(`M${bx-45} ${by+100} Q${bx+10} ${by} ${bx-10} ${by-110}`,ink,1,.28));
 for(let j=0;j<9;j++)for(const side of [-1,1]){
 const x=bx-15+15*Math.sin(j*.35),y=by+75-j*21,tip=x+side*(24+j%3*5);
 c.add(path(`M${x} ${y} Q${tip} ${y-3} ${tip} ${y-26} Q${x} ${y-23} ${x} ${y}Z`,ink,.65,.25));
 c.add(line([[x,y],[tip,y-26]],ink,.5,.24));
 }
 // Sparse seeded ink stipple creates scale-dependent texture without raster filters.
 for(let j=0;j<1600;j++){const x=c.random()*1400,y=c.random()*880;c.add(ellipse(x,y,.22+c.random()*.32,.24,ink,.13));}
}
