import {rect,line,samples,grid} from '../geometry.js';
export default function(c,p){
  c.add(rect(0,0,1400,880,c.gradient([[0,'#dfeff3'],[40,'#eff4dc'],[100,'#e1f0ef']])));
  const ink=c.gradient([[0,'#3b8dad'],[45,'#83a865'],[100,'#4c9abc']]);
  for(let x=-120;x<1500;x+=9)c.add(line(samples(y=>[x+54*Math.sin(y/145+x/210+p)+28*Math.sin(y/70+x/290),y],-30,920,7),ink,1,.52));
  for(let j=0;j<20;j++)c.add(line(samples(x=>[x,10+j*6+8*Math.sin(x/13+p)+9*Math.sin(x/65)],-20,1420,3),'#397c9e',1,.5));
  for(let j=0;j<18;j++)c.add(line(samples(x=>[x,810+j*4+16*Math.sin(x/20+j*.16)],-20,1420,4),'#398dab',.9,.5));
}
