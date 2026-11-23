/* music.js — Gemilang player, global mini player, visualizer, soundboard */
const audio=new Audio('assets/music/gemilang.mp3');
audio.preload='metadata';audio.volume=.8;
const fmt=s=>isFinite(s)?Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0'):'0:00';
const playBtns=[$('#play'),$('#mini-play')];

function setUI(){
  const p=!audio.paused;
  playBtns.forEach(b=>b.textContent=p?'❚❚':'▶');
  $('#mini-state').textContent=p?'▶ Playing':'❚❚ Paused';
  $('#status').textContent=p?'NOW PLAYING':'PAUSED';
  document.body.classList.toggle('playing',p);
  p?startViz():null;
}
function toggle(){
  if(audio.paused){audio.play().catch(()=>{$('#status').textContent='Add assets/music/gemilang.mp3';});}
  else audio.pause();
}
playBtns.forEach(b=>b.onclick=toggle);
audio.addEventListener('play',setUI);audio.addEventListener('pause',setUI);
audio.addEventListener('ended',()=>{audio.currentTime=0;setUI();});
audio.addEventListener('error',()=>{$('#status').textContent='gemilang.mp3 not found — put it in assets/music/';});
audio.addEventListener('loadedmetadata',()=>$('#dur').textContent=fmt(audio.duration));
audio.addEventListener('timeupdate',()=>{
  $('#cur').textContent=fmt(audio.currentTime);
  if(audio.duration)$('#seek').value=audio.currentTime/audio.duration*100;
});
$('#seek').oninput=e=>{if(audio.duration)audio.currentTime=e.target.value/100*audio.duration;};
$('#vol').oninput=e=>{audio.volume=+e.target.value;audio.muted=audio.volume===0;$('#mute').textContent=audio.muted?'🔇':'🔊';};
$('#mute').onclick=()=>{audio.muted=!audio.muted;$('#mute').textContent=audio.muted?'🔇':'🔊';};

/* tabs */
$$('.tab').forEach(t=>t.onclick=()=>{
  $$('.tab').forEach(x=>x.classList.toggle('on',x===t));
  $('#tab-player').hidden=t.dataset.tab!=='player';$('#tab-lyrics').hidden=t.dataset.tab!=='lyrics';
  if(window.syncLyrics)syncLyrics(true);
});

/* mini player + soundboard panels */
$('#mini-btn').onclick=()=>{$('#mini').hidden=!$('#mini').hidden;$('#sb').hidden=true;};
$('#sb-btn').onclick=()=>{$('#sb').hidden=!$('#sb').hidden;$('#mini').hidden=true;};
$('#mini a').onclick=()=>$('#mini').hidden=true;

/* visualizer (canvas, smooth, runs only while playing) */
const vz=$('#viz'),vc=vz.getContext('2d');let vraf=0;
const BARS=36,lvl=new Array(BARS).fill(2);
function startViz(){if(!vraf)vraf=requestAnimationFrame(drawViz);}
function drawViz(t){
  if(audio.paused){vraf=0;vc.clearRect(0,0,vz.width,vz.height);return;}
  vraf=requestAnimationFrame(drawViz);
  const w=vz.width,h=vz.height,bw=w/BARS;
  vc.clearRect(0,0,w,h);
  const g=vc.createLinearGradient(0,h,0,0);g.addColorStop(0,'#c9998f');g.addColorStop(1,'#ecd9b0');vc.fillStyle=g;
  for(let i=0;i<BARS;i++){
    const target=(Math.sin(t/260+i*.55)*.5+.5)*.55+(Math.sin(t/110+i*1.3)*.5+.5)*.35+.1;
    lvl[i]+=(target*h-lvl[i])*.12;
    const bh=Math.max(3,lvl[i]);
    vc.beginPath();vc.roundRect?vc.roundRect(i*bw+2,h-bh,bw-5,bh,3):vc.rect(i*bw+2,h-bh,bw-5,bh);vc.fill();
  }
}

/* soundboard (uses assets/sounds/*.mp3; falls back to a soft synth if file missing) */
const SOUNDS=[
  ['🎉 Celebration','celebration',()=>[523,659,784,1047].forEach((f,i)=>sfx.tone(f,.3,'triangle',.09,i*.08))],
  ['✨ Sparkle','sparkle',()=>[1568,2093,2637].forEach((f,i)=>sfx.tone(f,.25,'sine',.06,i*.07))],
  ['👏 Applause','applause',()=>{for(let i=0;i<10;i++)sfx.tone(180+Math.random()*300,.05,'square',.03,i*.05)}],
  ['😂 Bonk','bonk',()=>sfx.tone(140,.18,'square',.12)],
  ['💀 Bruh','bruh',()=>{sfx.tone(180,.3,'sawtooth',.08);sfx.tone(110,.5,'sawtooth',.08,.2)}],
  ['🎂 Birthday','birthday',()=>[262,262,294,262,349,330].forEach((f,i)=>sfx.tone(f,.3,'triangle',.09,i*.3))]
];
$('#sbgrid').innerHTML=SOUNDS.map((s,i)=>`<button data-i="${i}">${s[0]}</button>`).join('');
$('#sbgrid').onclick=e=>{
  const b=e.target.closest('button');if(!b||state.muted)return;
  const [,file,fallback]=SOUNDS[b.dataset.i];
  const a=new Audio(`assets/sounds/${file}.mp3`);a.volume=state.master;
  a.play().catch(fallback);
};
$('#sb-vol').oninput=e=>state.master=+e.target.value;
$('#sb-mute').onclick=()=>{state.muted=!state.muted;$('#sb-mute').textContent=state.muted?'🔇':'🔊';};
