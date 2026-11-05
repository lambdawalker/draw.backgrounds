import {paper,waves,path,line} from './helpers.js';
export default function(c,phase){
paper(c,'#e4eef0','#dce1de');waves(c,{phase,color:'#789eac',opacity:.26,amplitude:20,from:380});
c.add(path('M470 280H1400 M620 390V125H650V390 M1210 390V100H1240V390 M470 170Q635 125 635 125Q920 420 1225 100L1400 210','#7d9ca7',1.8,.45));
for(let j=0;j<30;j++){let x=650+j*18,y=130+180*Math.sin((x-650)/570*Math.PI);c.add(path(`M${x} ${y}V280`,'#8da7b1',.8,.35));}
c.add(path('M850 740L1010 740L980 760H875Z M935 730V505L860 725Z M943 530L995 725H943Z','#7999a4',1.3,.4,'#e7eeee'));
}
