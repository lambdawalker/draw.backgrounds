import {path,line,rect,ellipse,polygon,samples,grid,waves} from '../../geometry.js';
export {path,line,rect,ellipse,polygon,samples,grid,waves};
export const quality={pass:7};
export function paper(c,colors){c.add(rect(0,0,1400,880,c.gradient(colors.map((v,i)=>[i*100/(colors.length-1),v]))));}
export function etch(c,shape,color,spacing=7){let a='';for(let y=0;y<1000;y+=spacing)a+=line(samples(x=>[x,y+8*Math.sin(x/130+y/150)],-20,1420,9),color,.65,.19);c.clip(shape,a);}
export function leaf(c,x,y,s,angle,color){let a=quality.pass>=3?path(`M0 0 L${s} 0`,color,.9,.55):'';for(let k=-6;k<=6;k++)a+=path(`M0 0 Q${s*.5} ${k*s*.065} ${s} 0`,color,.65,.38);c.add(`<g transform="translate(${x} ${y}) rotate(${angle})">${path(`M0 0 Q${s*.45} ${-s*.45} ${s} 0 Q${s*.45} ${s*.45} 0 0Z`,color,.9,.28,color)}${a}</g>`);}
export function dome(c,x,y,s,color,kind='round'){
 let a='';const P=(d,w=.9,o=.6,f='none')=>a+=path(d,color,w,o,f);const R=(x,y,w,h,o=.1)=>a+=rect(x,y,w,h,color,o);
 R(-240,-140,480,140);P('M-255 -145 H255 M-245 -135 H245 M-240 -128 H240');
 for(let j=-7;j<=7;j++){let xx=j*30;P(`M${xx-7} -8 V-116 H${xx+7} V-8`,1,.65);for(let k=-2;k<=2;k++)P(`M${xx+k*2} -10 V-114`,.5,.35);}
 for(let i=0;i<5;i++)P(`M${-250-i*4} ${i*5} H${250+i*4}`,.8,.5);
 P('M-110 -148 V-205 H110 V-148',1,.6);for(let j=-4;j<=4;j++)P(`M${j*22-6} -158 V-191 Q${j*22} -203 ${j*22+6} -191 V-158`,.8,.5);
 if(kind!=='tower'){a+=`<g transform="${kind==='indiana'?'translate(0 50) scale(.72 1.25)':kind==='iowa'?'translate(0 35) scale(.9 1.17)':'translate(0 0)'}">`;P('M-125 -207 Q-105 -307 0 -318 Q105 -307 125 -207Z',1,.65,'#dbe2d7');for(let j=-5;j<=5;j++)P(`M${j*23} -209 Q${j*18} -285 0 -318`,.7,.5);for(let j=0;j<9;j++)P(`M${-121+j*3.9} ${-211-j*9} Q0 ${-228-j*11} ${121-j*3.9} ${-211-j*9}`,.6,.4);P('M-20 -320 V-352 Q0 -378 20 -352 V-320 M-27 -319 H27 M0 -368 V-388');a+='</g>';}
 else {P('M-58 -207 V-280 H58 V-207 M-66 -280 H66 L0 -325Z M-24 -310 V-350 H24 V-310 M0 -350 V-385');for(let j=-2;j<=2;j++)P(`M${j*19} -216 V-270`,.7,.5);}
 if(quality.pass>=3){for(let yy=-125;yy<0;yy+=9)P(`M-239 ${yy} H239`,.45,.25);for(let j=-6;j<=6;j++)P(`M${j*33+10} -20 V-76 Q${j*33+17} -88 ${j*33+24} -76 V-20`,.65,.45);}
 if(quality.pass>=6&&kind==='round'){P('M-125 -142 L0 -203 L125 -142Z',1,.6,'#e0e7df');for(let j=0;j<12;j++)P(`M${-115+j*9} ${-146-j*4.4} H${115-j*9}`,.6,.4);}if(quality.pass>=6&&kind==='tower'){P('M-240 -146 L-175 -202 L-110 -146 M110 -146 L175 -202 L240 -146',1,.6);for(let j=0;j<11;j++){P(`M${-238+j*5.5} ${-148-j*4.7} H${-112-j*5.5}`,.6,.4);P(`M${112+j*5.5} ${-148-j*4.7} H${238-j*5.5}`,.6,.4);}}c.add(`<g transform="translate(${x} ${y}) scale(${s})">${a}</g>`);
}
export function border(c,color,kind=0){if(quality.pass<2)return;for(let j=0;j<18;j++)c.add(line(samples(x=>[x,835+j*2+7*Math.sin(x/(kind?25:42)+j*.35)],0,1400,4),color,.65,.22));}
export function field(c,color,phase=0){grid(c,{color,opacity:quality.pass>=4?.10:.075,spacing:quality.pass>=4?13:19,amplitude:20,phase});}
export function flourish(c,x,y,s,color){for(let j=0;j<14;j++)c.add(path(`M${x-s} ${y+j*3} C${x-s*.5} ${y-s*.6+j*3} ${x+s*.7} ${y+s*.5-j*4} ${x+s} ${y-s*.25+j*3}`,color,.8,.2));}
