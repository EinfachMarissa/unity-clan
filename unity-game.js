(() => {
const board=document.getElementById('game-board'), msg=document.getElementById('game-message');if(!board)return;
let state=Array(9).fill(''), done=false, totals={wins:0,draws:0,losses:0};
const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const winner=()=>wins.map(w=>state[w[0]]&&state[w[0]]===state[w[1]]&&state[w[1]]===state[w[2]]?state[w[0]]:'').find(Boolean);
function finish(){const w=winner();if(w||state.every(Boolean)){done=true;const k=w==='X'?'wins':w==='O'?'losses':'draws';totals[k]++;document.getElementById('game-'+k).textContent=totals[k];msg.textContent=w==='X'?'Du hast gewonnen!':w==='O'?'Der Computer hat gewonnen.':'Unentschieden.';return true;}return false;}
function render(){board.replaceChildren();state.forEach((v,i)=>{const b=document.createElement('button');b.type='button';b.textContent=v||'·';b.setAttribute('aria-label','Feld '+(i+1)+(v?', '+v:', frei'));b.disabled=!!v||done;b.addEventListener('click',()=>play(i));board.append(b);});}
function play(i){if(done||state[i])return;state[i]='X';if(!finish()){const free=state.map((v,j)=>v?null:j).filter(j=>j!==null);const j=free[Math.floor(Math.random()*free.length)];state[j]='O';if(!finish())msg.textContent='Du bist dran.';}render();}
document.getElementById('game-reset').addEventListener('click',()=>{state=Array(9).fill('');done=false;msg.textContent='Du spielst X. Wähle ein freies Feld.';render();});render();
})();

(() => {
const board=document.getElementById('memory-board');if(!board)return;
const msg=document.getElementById('memory-message'), movesEl=document.getElementById('memory-moves'), pairsEl=document.getElementById('memory-pairs');
let data=[], first=null, second=null, moves=0, pairs=0, lock=false, timer;
function reset(){clearTimeout(timer);data=['U','✦','◇','☀','♧','☾','U','✦','◇','☀','♧','☾'];for(let i=data.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[data[i],data[j]]=[data[j],data[i]];}first=second=null;moves=pairs=0;lock=false;movesEl.textContent=0;pairsEl.textContent=0;msg.textContent='Finde sechs passende Paare.';board.replaceChildren();data.forEach((symbol,i)=>{const b=document.createElement('button');b.type='button';b.textContent='?';b.dataset.index=i;b.setAttribute('aria-label','Verdeckte Karte '+(i+1));b.addEventListener('click',()=>flip(b,i));board.append(b);});}
function flip(b,i){if(lock||b.disabled||b===first)return;b.textContent=data[i];b.setAttribute('aria-label','Karte '+(i+1)+': '+data[i]);if(!first){first=b;return;}second=b;movesEl.textContent=++moves;if(first.textContent===b.textContent){first.disabled=b.disabled=true;first.classList.add('matched');b.classList.add('matched');first=second=null;pairsEl.textContent=++pairs;if(pairs===6)msg.textContent='Alle Paare gefunden – gut gemacht!';return;}lock=true;timer=setTimeout(()=>{[first,second].forEach(x=>{x.textContent='?';x.setAttribute('aria-label','Verdeckte Karte '+(Number(x.dataset.index)+1));});first=second=null;lock=false;},700);}
document.getElementById('memory-reset').addEventListener('click',reset);reset();
})();