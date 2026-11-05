import {rect,grid,pavilion,rosette,waves,ellipse} from '../geometry.js';
export default function(c,p){
  c.add(rect(0,0,1400,880,c.gradient([[0,'#eed8d3'],[48,'#f7e9e3'],[100,'#e8eff2']])));
  grid(c,{color:'#b37d79',opacity:.18,spacing:8,amplitude:8,phase:p});
  c.add(ellipse(950,425,285,285,'#faf8f1',.65));
  rosette(c,950,425,245,'#729cad',{rings:10,lobes:3,amplitude:8,opacity:.3});
  pavilion(c,1045,800,1.35,'#7396b0',.65,true);
  waves(c,{color:'#648fa8',opacity:.3,from:660,to:970,spacing:5,amplitude:26,phase:p});
}
