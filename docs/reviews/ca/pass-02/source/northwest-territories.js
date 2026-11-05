import {base,fireweed,trillium,iris,path,line,polygon,ellipse,samples,waves,ridge,snowOnRidge,pine,flower,shore,branch,lily,grasses,iceberg} from './helpers.js';
export default function(c,p){
base(c,p+5.67,'#dfeded','#e6e5ce','#78a8ad');c.glow(1050,230,230,210,'#e6cd88',.48);for(let j=0;j<27;j++)c.add(line(samples(x=>[x,200+j*7+70*Math.sin(x/290+p)+35*Math.sin(x/150)],-40,1450,10),'#85bab0',1,.2));ridge(c,[[0,810],[400,750],[690,650],[840,510],[1000,640],[1160,460],[1400,620]],{fill:'#acc0c2',ink:'#7a9b9e',opacity:.23});fireweed(c,1220,850,.9,'#c1a0b2');
}
