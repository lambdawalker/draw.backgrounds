import {rect,waves,rosette,line,samples,TAU} from '../geometry.js';
export default function(c,p){
  c.add(rect(0,0,1400,880,'#f6f5f1'));
  c.glow(820,450,740,530,'#b5d7ed',.45);
  waves(c,{color:'#74a7c1',opacity:.19,spacing:6,amplitude:6,phase:p});
  rosette(c,900,420,105,'#739ab6',{rings:30,lobes:23,amplitude:18,opacity:.22});
  rosette(c,900,420,68,'#739ab6',{rings:5,lobes:23,amplitude:2,opacity:.25});
  for(let j=0;j<28;j++){c.add(line(samples(t=>{const a=t/180*Math.PI,r=250+j*3+26*Math.sin(7*a+p);return [880+r*Math.cos(a),445+r*.86*Math.sin(a)];},0,360,2),'#7ca4bf',.8,.24));}
  for(let j=0;j<18;j++)c.add(line(samples(y=>[650+160*Math.sin(y/160+p)+j*6+23*Math.sin(y/65),y],-30,910,7),'#bd8587',.8,.36));
  for(let j=0;j<12;j++)c.add(line(samples(y=>[1020+95*Math.sin(y/210+p)+j*5,y],-30,910,7),'#b9848c',.8,.25));
  for(let j=0;j<14;j++)c.add(line(samples(x=>[x,790+j*4+48*Math.sin(x/220+p)],-20,1420,9),'#c29196',.8,.3));
}
