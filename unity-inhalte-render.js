(() => {
 const data=window.UNITY_CONTENT||{};
 function cards(id,items,build){const root=document.getElementById(id);if(!root||!Array.isArray(items))return;const valid=items.filter(x=>x&&typeof x==='object');if(!valid.length)return;const nodes=valid.map(build).filter(Boolean);if(nodes.length)root.replaceChildren(...nodes);}
 function card(title,text,date){const a=document.createElement('article');a.className='tile';const h=document.createElement('h3');h.textContent=title;a.append(h);if(date){const small=document.createElement('small');small.className='muted';small.textContent=date;a.append(small);}const p=document.createElement('p');p.textContent=text;a.append(p);return a;}
 cards('unity-news-list',data.news,x=>typeof x.title==='string'&&typeof x.text==='string'?card(x.title,x.text,typeof x.date==='string'?x.date:''):null);
 cards('unity-partner-list',data.partners,x=>typeof x.name==='string'&&typeof x.text==='string'?card(x.name,x.text):null);
})();