/* fireworks.js — final scene: sequence + canvas fireworks/confetti/stars (rAF, pauses off-screen) */
(()=>{
  const box=$('#finale'),cv=$('#fx'),c=cv.getContext('2d');
  const PAL=['#f0dfc0','#d9bf8f','#c9998f','#fff3e0','#b8964f'];
  let W=0,H=0,rockets=[],sparks=[],conf=[],bg=[],on=false,vis=false,raf=0,nextL=0;
  const rnd=(a,b)=>a+Math.random()*(b-a),pick=()=>PAL[(Math.random()*PAL.length)|0];
  function resize(){
    const d=Math.min(devicePixelRatio||1,2);W=box.clientWidth;H=box.clientHeight;
    cv.width=W*d;cv.height=H*d;c.setTransform(d,0,0,d,0,0);
    bg=Array.from({length:W<600?25:45},()=>({x:rnd(0,W),y:rnd(0,H),r:rnd(.4,1.8),p:rnd(0,6)}));
  }
  addEventListener('resize',()=>{if(on)resize();});
  const launch=()=>rockets.push({x:rnd(W*.12,W*.88),y:H,ty:rnd(H*.12,H*.5),vy:-rnd(8,11),col:pick()});
  function explode(x,y,col){
    const n=W<600?40:64;
    for(let i=0;i<n;i++){const a=6.283*i/n,s=rnd(1.5,5);sparks.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:1,col:Math.random()<.7?col:pick()});}
    if(sparks.length>600)sparks.splice(0,sparks.length-600);
    sfx.tone(rnd(90,160),.25,'sine',.05);
  }
  function confetti(n){for(let i=0;i<n;i++)conf.push({x:rnd(0,W),y:rnd(-H*.4,0),vx:rnd(-.6,.6),vy:rnd(1,2.6),w:rnd(5,9),h:rnd(3,6),r:rnd(0,6),vr:rnd(-.1,.1),col:pick()});}
  function frame(t){
    if(!on||!vis){raf=0;return;}
    raf=requestAnimationFrame(frame);
    c.globalCompositeOperation='destination-out';c.fillStyle='rgba(0,0,0,.2)';c.fillRect(0,0,W,H);
    c.globalCompositeOperation='lighter';
    if(t>nextL){launch();if(Math.random()<.4)launch();nextL=t+rnd(550,950);}
    for(const s of bg){c.globalAlpha=.25+.3*Math.sin(t/700+s.p);c.fillStyle='#f3e3c8';c.beginPath();c.arc(s.x,s.y,s.r,0,6.283);c.fill();}
    for(let i=rockets.length-1;i>=0;i--){const r=rockets[i];r.y+=r.vy;r.vy+=.08;
      c.globalAlpha=1;c.fillStyle=r.col;c.fillRect(r.x-1,r.y,2,8);
      if(r.y<=r.ty||r.vy>=0){explode(r.x,r.y,r.col);rockets.splice(i,1);}}
    for(let i=sparks.length-1;i>=0;i--){const p=sparks[i];p.vx*=.985;p.vy=p.vy*.985+.045;p.x+=p.vx;p.y+=p.vy;p.l-=.014;
      if(p.l<=0){sparks.splice(i,1);continue;}
      c.fillStyle=p.col;c.globalAlpha=p.l*.18;c.beginPath();c.arc(p.x,p.y,4,0,6.283);c.fill();
      c.globalAlpha=p.l;c.beginPath();c.arc(p.x,p.y,1.7,0,6.283);c.fill();}
    c.globalCompositeOperation='source-over';
    for(const p of conf){p.x+=p.vx+Math.sin(p.r)*.4;p.y+=p.vy;p.r+=p.vr;if(p.y>H+10){p.y=-10;p.x=rnd(0,W);}
      c.save();c.translate(p.x,p.y);c.rotate(p.r);c.globalAlpha=.85;c.fillStyle=p.col;c.fillRect(-p.w/2,-p.h/2,p.w,p.h);c.restore();}
    c.globalAlpha=1;
  }
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis&&on&&!raf)raf=requestAnimationFrame(frame);},{threshold:.1}).observe(box);

  $('#fin-start').onclick=async()=>{
    $('#fin-start').hidden=true;const w=$('#fin-line');
    for(const l of['Wait...',"There's one more thing."]){w.textContent=l;w.classList.add('show');await wait(1900);w.classList.remove('show');await wait(600);}
    box.classList.add('dim');await wait(1500);
    const big=$('#fin-big');big.style.display='block';void big.offsetWidth;big.classList.add('in');
    resize();confetti(W<600?40:80);on=true;vis=true;if(!raf)raf=requestAnimationFrame(frame);
    sfx.chime();await wait(3200);$('#fin-end').classList.add('in');
  };
})();
