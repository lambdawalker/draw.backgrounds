import {rect,waves,ridge,line,samples,ellipse} from '../geometry.js';
export default function(c,p){
  c.add(rect(0,0,1400,880,c.gradient([[0,'#fbefeb'],[48,'#f8f7f3'],[100,'#eaf1f4']])));
  waves(c,{color:'#8aa5bf',opacity:.2,spacing:7,amplitude:20,phase:p});
  const edge=[[580,780],[650,600],[710,590],[750,380],[810,350],[830,310],[900,330],[935,410],[1010,440],[1040,550],[1120,580],[1200,730],[1450,780]];
  ridge(c,edge,{fill:'#efc7b4',ink:'#cb927f',opacity:.3,hatch:false});
  for(let j=0;j<32;j++)c.add(line(edge.map(([x,y])=>[900+(x-900)*(1+j*.013),y+j*5]),'#c38679',.9,.35));
  for(let j=0;j<22;j++)c.add(line(samples(y=>[870+j*9+10*Math.sin(y/80+p+j*.14),y],410,880,8),'#bd8b83',.8,.28));
  for(let y=20;y<880;y+=14)for(let x=1190;x<1400;x+=14)c.add(ellipse(x+3*Math.sin(y/40+p),y,1.1,1.1,'#bd968f',.23));
}
