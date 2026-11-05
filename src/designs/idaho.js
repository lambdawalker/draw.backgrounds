import {rect,grid,ridge,path,line,ellipse,TAU} from '../geometry.js';
export default function(c,p){
  c.add(rect(0,0,1400,880,'#f5f7f2'));
  c.glow(300,500,700,700,'#bee2e6',.45);
  grid(c,{phase:p,spacing:9,amplitude:23,color:'#65a4b9',opacity:.23});
  ridge(c,[[470,350],[585,245],[650,190],[735,290],[830,340],[990,460],[1450,580]],{fill:'#d8dde5',ink:'#929fb4',opacity:.32});
  // Original bluebird silhouette: shared wing pivot, tapered feather fans.
  const bx=920,by=450;
  for(const side of [-1,1])for(let j=0;j<18;j++){
    const a=(-2.8+j*.062)*side, length=140+j*4;
    const tx=bx+Math.cos(a)*length,ty=by+Math.sin(a)*length;
    c.add(path(`M${bx} ${by} Q${tx-20} ${ty-30} ${tx} ${ty} Q${tx+15} ${ty+15} ${bx} ${by}Z`,'#789ab9',.9,.48,'#c8d7e4'));
    c.add(line([[bx,by],[tx,ty]],'#6d90b2',.7,.4));
  }
  c.add(path('M875 422 C865 385 900 355 938 374 C963 384 972 417 957 445 C935 493 892 541 850 570 L832 620 L816 610 L822 551 C829 500 854 451 875 422Z','#7494ac',1,.6,'#c3d4df'));
  c.add(path('M957 402 L991 414 L960 422Z','#668a9e',1,.6,'#a7becb'));
  c.add(ellipse(943,398,3.5,3.5,'#55758a',.8));
  for(let j=0;j<25;j++)c.add(path(`M${862+j*2} ${441+j*.7} Q${885+j*2} 480 ${832+j*1.3} ${570+j}`,'#6687a2',.7,.32));
}
