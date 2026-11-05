import {rect,grid,ridge,flower,pine,line} from '../geometry.js';
export default function(c,p){
  c.add(rect(0,0,1400,880,c.gradient([[0,'#f5ede8'],[45,'#e6f1e5'],[100,'#d7e6e9']])));
  grid(c,{phase:p,spacing:12,amplitude:12,color:'#8aaa9f',opacity:.24});
  c.glow(1000,70,650,210,'#e0a1b9',.32);
  ridge(c,[[-80,680],[120,600],[280,570],[400,500],[580,310],[670,390],[820,235],[960,430],[1090,370],[1250,540],[1480,610]],{fill:'#b2cddc',ink:'#6698ac',opacity:.6});
  c.add(line([[500,400],[580,310],[610,375],[670,390],[720,365],[820,235],[865,330],[910,345],[960,430]],'#f9fbf6',14,.75));
  ridge(c,[[-20,760],[200,695],[420,740],[630,650],[870,700],[1120,620],[1430,675]],{fill:'#96c3af',ink:'#719e93',opacity:.35});
  for(let j=0;j<9;j++)flower(c,45+20*Math.sin(j),370+j*62,20+j%3*4,'#bd7c99',.43);
  for(let j=0;j<7;j++)pine(c,1080+j*45,850,75+j%3*20,'#69958b',.25);
}
