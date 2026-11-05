import {base,path,line,polygon,ellipse,samples,waves,ridge,snowOnRidge,pine,flower,shore,branch,lily,grasses,iceberg} from './helpers.js';
export default function(c,p){
base(c,p,'#dfe9f3','#e7e7ef','#91a4bd');shore(c,'#7fa3bb',710,38);ridge(c,[[0,850],[410,780],[690,700],[850,730],[1040,670],[1400,730]],{fill:'#b3c1ce',ink:'#8c9fb0',opacity:.2});for(let j=0;j<3;j++)lily(c,1010+j*110,430+j*85,.7,'#ac9bb7');for(let j=0;j<7;j++)pine(c,1020+j*60,920,180+c.random()*100,'#829aaa',.18);
}
