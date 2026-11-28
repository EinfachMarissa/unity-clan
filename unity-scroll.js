(() => {
const panel=document.querySelector('.reveal-plot');if(!panel||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
let pending=false;function update(){pending=false;const r=panel.getBoundingClientRect();const progress=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight*.7)));panel.style.setProperty('--reveal-offset',String(Math.round((1-progress)*60))+'px');}
function request(){if(!pending){pending=true;requestAnimationFrame(update);}}
addEventListener('scroll',request,{passive:true});addEventListener('resize',request);request();
})();