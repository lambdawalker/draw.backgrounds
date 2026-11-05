import {rect,waves,rosette,pavilion,line,samples} from '../geometry.js';
export default function(c,p){
  c.add(rect(0,0,1400,880,c.gradient([[0,'#f5f2cf'],[50,'#faf7df'],[100,'#eeeec9']])));
  c.glow(630,660,680,390,'#dbeac9',.4);
  waves(c,{color:'#b7b36c',opacity:.22,spacing:8,amplitude:30,period:110,phase:p});
  for(let j=0;j<25;j++)c.add(line(samples(y=>[520+j*3+35*Math.sin(y/60+p),y],-20,900,5),'#8eb4bd',.8,.35));
  rosette(c,1080,240,100,'#6a94af',{rings:25,lobes:15,amplitude:20,opacity:.6});
  pavilion(c,785,800,.95,'#759fb0',.6,true);
  for(let j=0;j<14;j++)c.add(line(samples(x=>[x,850+j*3+22*Math.sin(x/130+p)],-20,1420,8),'#a7ad6f',.8,.24));
}
