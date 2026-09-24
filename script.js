/* Conceptual displacement map. Analytic cantilever shape, normalised for illustration. */
(() => {
 const svg = document.getElementById('mesh');
 const ns = 'http://www.w3.org/2000/svg';
 function el(tag, attrs) {const node = document.createElementNS(ns,tag); for(const [key,value] of Object.entries(attrs))node.setAttribute(key,String(value)); svg.appendChild(node); return node;}
 const cols=20,rows=5;
 const shape=t=>t*t*(3-t)/2;
 const point=(i,j)=>{const t=i/cols;return [65+t*420+(j/rows)*18,108+(j/rows)*73+shape(t)*90];};
 const palette=[[36,111,209],[32,179,190],[189,213,101],[255,189,79],[250,98,56]];
 function colour(t){const n=Math.min(t*4,3.999),i=Math.floor(n),f=n-i;return 'rgb('+palette[i].map((v,k)=>Math.round(v+(palette[i+1][k]-v)*f)).join(',')+')';}
 // Faint undeformed reference and clamped support.
 el('path',{d:'M65 108 L485 108 L503 181 L83 181 Z',fill:'none',stroke:'#657281','stroke-dasharray':'4 5','stroke-width':1});
 for(let i=0;i<8;i++)el('line',{x1:43,y1:90+i*14,x2:62,y2:76+i*14,stroke:'#798390','stroke-width':1});
 el('line',{x1:63,y1:84,x2:63,y2:202,stroke:'#d6dce4','stroke-width':2});
 for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){
  const a=point(i,j),b=point(i+1,j),c=point(i+1,j+1),d=point(i,j+1);
  for(const pts of [[a,b,c],[a,c,d]])el('polygon',{points:pts.map(p=>p.join(',')).join(' '),fill:colour(shape((i+.5)/cols)),stroke:'#122435','stroke-width':.7,'stroke-opacity':.65});
 }
 const label=el('text',{x:66,y:232,fill:'#a3aebc','font-size':12,'font-family':'Arial, sans-serif'});label.textContent='FIXED';
 el('line',{x1:510,y1:192,x2:510,y2:230,stroke:'#e4e9ef','stroke-width':1.5});
 el('path',{d:'M505 224 L510 231 L515 224',fill:'none',stroke:'#e4e9ef','stroke-width':1.5});
 const force=el('text',{x:518,y:212,fill:'#e4e9ef','font-size':14,'font-family':'Arial, sans-serif'});force.textContent='F';
})();
