/* main.js — shared helpers, opening, intro, gallery, memories, navigation, letter */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait=ms=>new Promise(r=>setTimeout(r,reduce?Math.min(ms,60):ms));
const COLORS=['#d9bf8f','#b8964f','#c9998f','#f3e3c8','#fff6e6'];
const state={muted:false,master:.8}; // soundboard + game sfx volume

const sfx={ctx:null,
  tone(f=880,d=.25,type='sine',v=.07,delay=0){
    if(state.muted)return;
    try{this.ctx=this.ctx||new(window.AudioContext||window.webkitAudioContext)();
      const c=this.ctx,o=c.createOscillator(),g=c.createGain(),t=c.currentTime+delay;
      o.type=type;o.frequency.setValueAtTime(f,t);
      g.gain.setValueAtTime(Math.max(.0002,v*state.master),t);
      g.gain.exponentialRampToValueAtTime(.0001,t+d);
      o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d);}catch(e){}
  },
  chime(){[880,1175,1568].forEach((f,i)=>this.tone(f,.4,'triangle',.08,i*.09));}
};

function burst(x,y,n=14){
  if(reduce)n=4;
  for(let i=0;i<n;i++){
    const p=document.createElement('i');p.className='pt';
    const a=Math.random()*6.283,r=40+Math.random()*80;
    p.style.cssText=`left:${x}px;top:${y}px;--dx:${Math.cos(a)*r}px;--dy:${Math.sin(a)*r}px;--c:${COLORS[i%5]}`;
    document.body.appendChild(p);setTimeout(()=>p.remove(),950);
  }
}

/* ---- floating background particles ---- */
(()=>{const box=$('#particles');if(reduce)return;
  for(let i=0;i<14;i++){const p=document.createElement('i');
    p.style.cssText=`--x:${Math.random()*100}%;--s:${4+Math.random()*8}px;--d:${14+Math.random()*14}s;--dl:${-Math.random()*20}s;--dx:${(Math.random()-.5)*80}px`;
    box.appendChild(p);}
})();

/* ---- 1. opening ---- */
(async()=>{
  const box=$('#o-text'),lines=['A little something for someone...','Hey, Neu.','Before you continue...'];
  await wait(600);
  for(let i=0;i<lines.length;i++){
    box.textContent=lines[i];box.classList.add('show');await wait(2200);
    if(i<lines.length-1){box.classList.remove('show');await wait(800);}
  }
  $('#open-btn').classList.add('show');
})();
$('#open-btn').onclick=()=>{
  $('#opening').classList.add('out');document.body.classList.remove('locked');
  setTimeout(()=>$('#opening').remove(),1200);
  scrollTo(0,0);sfx.chime();intro();
};

/* ---- 2. birthday intro ---- */
async function intro(){
  const el=$('#intro-line');
  const L=["Dit dit dit...","tuolongin Dit...","eh maksudnya Pradita","atau Tyara?","ahh Neu aja deh.","Nuwew kali yaa...","ahh gatau deh."];
  for(const l of L){el.textContent=l;el.classList.add('show');await wait(1500);el.classList.remove('show');await wait(450);}
  el.remove();$('#hb').hidden=false;
  burst(innerWidth/2,innerHeight/2,30);sfx.chime();
}

/* ---- 4. gallery (edit captions / files here) ---- */
const PHOTOS=[
  {src:'assets/photos/photo-1.jpeg',cap:'',r:'-1.5deg'},
  {src:'assets/photos/photo-2.jpeg',cap:'',r:'2deg'},
  {src:'assets/photos/photo-3.jpeg',cap:'',r:'1deg'},
  {src:'assets/photos/photo-4.jpeg',cap:'',r:'-2deg'},
  {src:'assets/photos/photo-5.jpeg',cap:'',r:'1.5deg'},
  {src:'assets/photos/photo-6.jpeg',cap:'',r:'-1deg'}
];
$('#gal').innerHTML=PHOTOS.map((p,i)=>`<figure class="ph p${i+1}" style="--r:${p.r}" data-f="${p.src.split('/').pop()}"><img src="${p.src}" alt="${p.cap.replace(/"/g,'')}" loading="lazy" onerror="this.parentNode.classList.add('empty');this.remove()"><figcaption>${p.cap}</figcaption></figure>`).join('');

/* ---- scroll reveal + nav highlight ---- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.2});
$$('.reveal').forEach(el=>io.observe(el));
const links=$$('nav a');
const nio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const n=e.target.dataset.nav;links.forEach(a=>a.classList.toggle('on',a.dataset.n===n));}}),{rootMargin:'-45% 0px -45% 0px'});
$$('section[data-nav]').forEach(s=>nio.observe(s));

/* ---- 11. letter ---- */
$('#env').onclick=()=>{
  const open=$('#env').classList.toggle('open');
  $('#paper').classList.toggle('open',open);$('#env-hint').hidden=open;
  if(open){sfx.chime();setTimeout(()=>$('#paper').scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'}),900);}
};
