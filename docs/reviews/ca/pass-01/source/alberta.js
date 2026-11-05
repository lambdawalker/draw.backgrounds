import {base,path,line,polygon,ellipse,samples,waves,ridge,snowOnRidge,pine,flower,shore,branch,lily,grasses,iceberg} from './helpers.js';
export default function(c,p){
base(c,p,'#e0edf0','#e8e8cb','#7897ac');const m=ridge(c,[[0,690],[400,640],[610,490],[700,510],[765,330],[850,340],[920,290],[1010,330],[1140,540],[1400,600]],{fill:'#a8bdc8',ink:'#7494a7',opacity:.3});snowOnRidge(c,m,{lineY:367,opacity:.65});shore(c,'#79a9ad',760,33);branch(c,1220,840,1,'#bd8d9c');
}
