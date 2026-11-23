/* game.js — Game 1: Birthday Quest (find 5 stars) + Game 2: How well do you know Neu? */
(()=>{
  const room=$('#room'),toast=$('#toast');let found=0,tt;
  const OBJ=[
    {e:'🎂',x:50,y:62,m:'Kuenya wangi, tapi jangan dicolek dulu.'},
    {e:'🎁',x:20,y:74,m:'Isinya? Rahasia. Mungkin zonk, mungkin enggak.'},
    {e:'💌',x:80,y:72,m:'Suratnya yang asli ada di bagian LETTER. Sabar.'},
    {e:'🖼️',x:27,y:26,m:'Frame-nya siap. Tinggal nunggu muka cakep.'},
    {e:'🎈',x:77,y:30,m:'Balonnya ringan. Beda sama pikiran kamu.'}
  ];
  const STARS=[{x:58,y:55},{x:11,y:86},{x:91,y:60},{x:17,y:12},{x:88,y:10}];
  function say(m){toast.textContent=m;toast.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>toast.classList.remove('show'),2200);}
  function build(){
    found=0;$('#secret').hidden=true;$$('.obj,.star',room).forEach(n=>n.remove());
    OBJ.forEach(o=>{const b=document.createElement('button');b.className='obj';b.textContent=o.e;b.style.cssText=`left:${o.x}%;top:${o.y}%`;b.setAttribute('aria-label','object');
      b.onclick=()=>{b.classList.remove('wob');void b.offsetWidth;b.classList.add('wob');say(o.m);sfx.tone(440+Math.random()*200,.15,'triangle');};room.appendChild(b);});
    STARS.forEach(s=>{const b=document.createElement('button');b.className='star';b.textContent='★';b.style.cssText=`left:${s.x}%;top:${s.y}%`;b.setAttribute('aria-label','hidden star');
      b.onclick=e=>{b.classList.add('found');found++;update();sfx.chime();
        const r=b.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,18);
        say(found<5?`Bintang ${found}/5 ketemu! ✨`:'Semua bintang ketemu! 🎉');if(found===5)win();};room.appendChild(b);});
    update();
  }
  function update(){$('#stars').textContent='★'.repeat(found)+'☆'.repeat(5-found);}
  function win(){setTimeout(()=>{$('#secret').hidden=false;$('#secret').scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});
    [0,250,500].forEach((d,i)=>setTimeout(()=>burst(innerWidth*(.3+i*.2),innerHeight*.4,26),d));
    [523,659,784,1047,1319].forEach((f,i)=>sfx.tone(f,.4,'triangle',.09,i*.1));},700);}
  $('#hint').onclick=()=>{const s=$$('.star:not(.found)',room)[0];if(!s){say('Semua udah ketemu!');return;}s.classList.add('hint');setTimeout(()=>s.classList.remove('hint'),2000);say('Psst... ada yang berkilau di sekitar sini.');};
  $('#replay').onclick=build;build();
})();


// (()=>{
  // const Q=[
    // {q:"Neu suddenly has a free weekend...",o:[["Tidur seharian",5],["Main Epep",3],["Main Rob",4],["Ilang dari grup, tau-tau udah di kafe.",2]]},
    // {q:"Grup chat rame banget jam 2 pagi. Neu...",o:[["Diem-diem baca semua, nggak bales.",3],["Bales paling pertama, paling random.",5],["Udah tidur. Besok baca 400 chat.",2],["Kirim stiker, terus ilang.",4]]},
    // {q:"Makanan yang dipesen ternyata salah. Reaksi Neu?",o:[["\"Yaudah deh, rezeki.\"",3],["Roasting drivernya 3 menit, terus ikhlas.",5],["Tetep makan sambil pasang muka dramatis.",4],["Order lagi, anggap nggak pernah terjadi.",2]]},
    // {q:"Ada yang bilang \"foto yuk!\"",o:[["Satu jepretan langsung jadi. Annoying.",5],["Seratus take, yang dipilih yang kedua.",3],["\"Jangan foto aku\" tapi udah pose.",4],["Kabur duluan.",2]]},
    // {q:"Ada drama kecil di sekitar Neu...",o:[["Nonton dari jauh sambil tenang.",4],["Satu kalimat nusuk tapi bener.",5],["Pura-pura nggak tau.",2],["\"Sing penting waras.\" Lalu pergi.",3]]}
  // ];
  // const box=$('#quiz-box');let i=0,sum=0;
  // const mn=Q.reduce((a,q)=>a+Math.min(...q.o.map(o=>o[1])),0),mx=Q.reduce((a,q)=>a+Math.max(...q.o.map(o=>o[1])),0);
  // function show(){
    // if(i>=Q.length)return result();
    // const q=Q[i];
    // box.innerHTML=`<p class="prog">QUESTION ${i+1} / ${Q.length}</p><h3>${q.q}</h3>`+q.o.map((o,k)=>`<button class="opt" data-k="${k}">${o[0]}</button>`).join('');
    // $$('.opt',box).forEach(b=>b.onclick=()=>{b.classList.add('pick');sum+=q.o[+b.dataset.k][1];sfx.tone(600,.15,'triangle');
      // $$('.opt',box).forEach(x=>x.disabled=true);setTimeout(()=>{i++;show();},550);});
  // }
  // function result(){
    // const pct=60+Math.round((sum-mn)/(mx-mn)*39);
    // const title=pct>=90?'NEU CERTIFIED':pct>=75?'NEU APPROVED':'NEU APPRENTICE';
    // box.innerHTML=`<p class="prog">YOUR RESULT</p><div class="pct" id="pct">0%</div><h3>${title}</h3><p>Congratulations. You may now officially survive her chaos.</p><button class="btn sm" id="again">PLAY AGAIN</button>`;
    // const el=$('#pct');let n=0;const step=()=>{n=Math.min(pct,n+Math.ceil(pct/40));el.textContent=n+'%';if(n<pct)requestAnimationFrame(step);else{const r=el.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,30);sfx.chime();}};
    // reduce?(el.textContent=pct+'%'):requestAnimationFrame(step);
    // $('#again').onclick=()=>{i=0;sum=0;show();};
  // }
  // show();
// })();
