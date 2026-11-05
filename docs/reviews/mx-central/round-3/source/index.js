import {paper,ribbon,etch,agave,arcade,butterfly,tiles,rect,path,line,ellipse,polygon,samples,waves,ridge,snowOnRidge,flower} from './helpers.js';
const designs={
 'ciudad-de-mexico':(c,p)=>{
 paper(c,p,['#f7f3ec','#f1e9ed','#eef4f0'],'#aa8d9b',0);
 // Original low relief stepped plazas and canals, not a seal or city mark.
 for(let j=0;j<18;j++)c.add(path(`M${760-j*16} ${755+j*4} L${970-j*7} ${620+j*4} H${1160+j*6} L${1350+j*12} ${755+j*4}`,'#a38a97',.8,.25));
 for(let j=0;j<8;j++)c.add(path(`M${850+j*15} 755 V${660-j*18} H${1130-j*15} V755`,'#a18593',1,.4));
 for(let j=0;j<12;j++)c.add(path(`M${880+j*10} 740V${660-j*9}H${1100-j*10}V740`,'#a18593',.65,.25));
 waves(c,{color:'#8eaaa9',opacity:.24,from:770,to:875,spacing:6,amplitude:14,phase:p});ribbon(c,'#ac8d98',p);
 },
 'estado-de-mexico':(c,p)=>{
 paper(c,p,['#faf6ec','#e8f2ef','#f3ebea'],'#90a8a1',1);
 const m=ridge(c,[[350,850],[660,675],[800,575],[910,440],[975,482],[1040,452],[1170,635],[1450,735]],{fill:'#adc4bb',ink:'#7d9e96',opacity:.32});snowOnRidge(c,m,{lineY:510,opacity:.85});
 for(let j=0;j<17;j++)c.add(path(`M${690+j*21} 820 Q${760+j*18} 690 ${830+j*13} 575`,'#789d94',.7,.25));agave(c,1220,840,.8,'#839e91');ribbon(c,'#91a99a',p);
 },
 guanajuato:(c,p)=>{
 paper(c,p,['#faf4e9','#f2eadc','#ecf3f2'],'#ae9d7e',2);
 for(let i=0;i<17;i++){
 const x=580+i*48,y=750-75*Math.sin(i*.31)-i*2;
 c.add(rect(x,y-48-(i%3)*14,42,90,'#b2a084',.13));c.add(path(`M${x} ${y+40}V${y-48-(i%3)*14}H${x+42}V${y+40}`,'#a28d72',.8,.35));
 for(let k=0;k<3;k++)c.add(rect(x+7+k*11,y-33,4,10,'#a28d72',.25));
 }arcade(c,890,810,6,.9,'#a18b73');ribbon(c,'#b39b73',p);
 },
 hidalgo:(c,p)=>{
 paper(c,p,['#f8f4ec','#f1eded','#eaf2f1'],'#a198a8',3);
 for(let j=0;j<13;j++)c.add(path(`M650 ${770+j*6} L810 ${550+j*7} L870 ${600+j*7} L1000 ${515+j*6} L1260 ${760+j*6}`,'#8b98a4',.8,.23));
 for(let k=0;k<5;k++){
 let x=925+k*64,y=835; c.add(path(`M${x} ${y}V${y-190}l25 -15 25 15v190Z`,'#8f96a4',1,.25,'#b8c3ca'));
 for(let j=0;j<6;j++)c.add(path(`M${x+j*8} ${y}V${y-185+j*2}`,'#7e92a0',.7,.3));
 }agave(c,735,840,.7,'#909e8c');ribbon(c,'#9d93a2',p);
 },
 jalisco:(c,p)=>{
 paper(c,p,['#f8f4e8','#eef2e6','#e8f2ef'],'#93ac99',1);
 ridge(c,[[400,850],[690,730],[875,575],[1050,710],[1150,650],[1470,800]],{fill:'#b8c7ae',ink:'#8ea18a',opacity:.23});
 for(let row=0;row<3;row++)for(let j=0;j<5;j++)agave(c,660+j*155+row*35,710+row*70,.36+row*.14,'#789b91');ribbon(c,'#91a38b',p);
 },
 michoacan:(c,p)=>{
 paper(c,p,['#fcf5e9','#f3ecdf','#eaf1e6'],'#b2a082',2);
 waves(c,{color:'#91a79b',opacity:.16,from:650,to:900,spacing:9,amplitude:23,phase:p});
 for(const [x,y,s,a] of [[1030,590,1.65,-18],[1240,720,.8,16],[800,740,.65,-30]])butterfly(c,x,y,s,'#b19976',a);
 ribbon(c,'#a79a80',p);
 },
 morelos:(c,p)=>{
 paper(c,p,['#fff7ea','#f4efdd','#eaf3e8'],'#a6b28b',0);
 ridge(c,[[560,860],[750,735],[820,720],[850,580],[930,550],[970,670],[1110,610],[1150,710],[1420,780]],{fill:'#bcc6a5',ink:'#9ca789',opacity:.28});
 for(let i=0;i<7;i++){const x=960+i*55,y=760+Math.sin(i)*30;c.add(path(`M${x} 890Q${x-30} 810 ${x} ${y}`,'#95a97d',1,.4));flower(c,x,y,17+i%3*3,'#d4ba7d',.35);}ribbon(c,'#afb481',p);
 },
 puebla:(c,p)=>{
 paper(c,p,['#f8f5ed','#eaf2f3','#edf0f6'],'#8fa5b6',3);
 const m=ridge(c,[[330,860],[640,750],[920,472],[960,450],[1030,530],[1220,725],[1440,780]],{fill:'#b7c6d1',ink:'#829bab',opacity:.28});snowOnRidge(c,m,{lineY:520,opacity:.8});tiles(c,1110,688,5,4,48,'#7597b4');ribbon(c,'#8c9fba',p);
 },
 queretaro:(c,p)=>{
 paper(c,p,['#faf5ec','#f5ece4','#eef2ed'],'#b2a08e',0);
 arcade(c,560,790,13,1.25,'#af9586');
 for(let j=0;j<18;j++)c.add(path(`M450 ${810+j*4}Q940 ${775+j*3}1440 ${820+j*4}`,'#a8a18a',.75,.23));ribbon(c,'#b39986',p);
 },
 'san-luis-potosi':(c,p)=>{
 paper(c,p,['#f6f9e9','#e6f1df','#e9f4ef'],'#92ab7b',1);
 for(let j=0;j<22;j++)c.add(path(`M700 ${640+j*7}Q850 ${580+j*6}930 ${655+j*5}T1420 ${620+j*7}`,'#8eaa7d',.8,.23));
 c.add(path('M720 860 L760 730 L890 650 L990 620 L1020 700 L1030 850Z','#9dae8a',.7,.19,'#9dae8a'));
 c.add(path('M1170 620 L1270 690 L1420 760 V890 H1210Z','#9dae8a',.7,.15,'#9dae8a'));
 c.add(path('M990 620 Q1040 600 1170 620 L1210 850 Q1110 815 1030 850Z','#9cc0af',.5,.11,'#9cc0af'));
 for(let j=0;j<28;j++)c.add(path(`M${1000+j*6} 615Q${1015+j*5} 680 ${1005+j*6} 730T${1060+j*5} 850`,'#78aaa5',.8,.33));
 for(let j=0;j<10;j++)c.add(ellipse(1110,840+j*4,70+j*9,10+j*3,'#89b5a5',.014));agave(c,770,835,.65,'#94a479');ribbon(c,'#93ae7e',p);
 },
 tlaxcala:(c,p)=>{
 paper(c,p,['#fbf3ea','#f6eae5','#eff3e9'],'#b39b91',2);
 ridge(c,[[350,880],[670,785],[820,650],[990,500],[1080,600],[1240,755],[1440,800]],{fill:'#c4b6ac',ink:'#a7988f',opacity:.27});
 for(let i=0;i<5;i++){
 const x=950+i*75;c.add(path(`M${x} 860Q${x-15} 770 ${x+5} 700`,'#9ba27e',1,.45));
 for(let j=0;j<5;j++)c.add(path(`M${x} ${820-j*17}q-40 -32 -65 -20q33 2 65 20q32 -40 58 -36q-25 10 -58 36`,'#94a078',1.1,.5));
 }ribbon(c,'#b89789',p);
 }
};
export default designs;
