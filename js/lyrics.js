/* lyrics.js — time-synced lyrics. (Waktu masih ESTIMASI tiap 6 detik: sesuaikan dengan lagu.)
   Isi lirik kamu sendiri di array di bawah. `time` = detik. Urutkan dari kecil ke besar. */
const lyrics = [
    { time: 0,  text: "♪♪♪" },
    { time: 30, text: "Terjilat" },
    { time: 35, text: "Matahari timur yang kejam" },
    { time: 40, text: "Sengat melekat di bahuku" },
    { time: 44, text: "Perlukah" },
    { time: 47, text: "Menepi menyisi sebentar?" },
    { time: 51, text: "Tapi ku wajib tepat waktu" },
    { time: 56, text: "Keluhan demi keluhan" },
    { time: 62, text: "Segera kugilas perlahan" },
    { time: 69, text: "Karena ini yang kumau" },
    { time: 75, text: "Berkah kepala yang batu" },
    { time: 81, text: "Semua yang ragukan atau tak percaya" },
    { time: 87, text: "Debu pagi kujelang" },
    { time: 91, text: "♪♪♪" },
    { time: 104, text: "Tak terasa" },
    { time: 107, text: "Sebelas tahun t'lah berselang" },
    { time: 112, text: "Masih terasa di bahuku" },
    { time: 116, text: "Beban yang" },
    { time: 119, text: "Bercampur bangga t'lah kurengkuh" },
    { time: 124, text: "Semua berpihak kepadaku" },
    { time: 127, text: "Pasti doamu yang lancarkan upayaku" },
    { time: 133, text: "Mesti doa yang meluncur dari bibirmu" },
    { time: 139, text: "Dan yang kutahu kau takkan pernah berhenti" },
    { time: 146, text: "Tumbuhku kini semoga sesuai yang kau impi" },
    { time: 154, text: "Tertulis jelas namaku" },
    { time: 161, text: "Di setiap harap malammu" },
    { time: 165, text: "Tentang masa depan, tentang masa terang" },
    { time: 171, text: "Warisan akal budi gemilang" },
    { time: 178, text: "Pelan pasti ku kabulkan" },
    { time: 184, text: "S'gala catatan harapmu" },
    { time: 189, text: "Tentang masa depan, tentang masa terang" },
    { time: 195, text: "Kebul jalan kuterjang" },
    { time: 201, text: "♪♪♪" }
];

(()=>{
  const box=$('#lyrics-box');let idx=-2;
  box.innerHTML=lyrics.map((l,i)=>`<div class="ly" data-i="${i}">${l.text}</div>`).join('');
  const els=$$('.ly',box);
  function find(t){let k=-1;for(let i=0;i<lyrics.length;i++){if(lyrics[i].time<=t)k=i;else break;}return k;}
  window.syncLyrics=(force)=>{
    const k=find(audio.currentTime);
    if(k===idx&&!force)return;idx=k;
    els.forEach((el,i)=>{el.classList.toggle('cur',i===k);el.classList.toggle('prev',i<k);});
    const el=els[Math.max(k,0)];
    if(el&&box.clientHeight)box.scrollTo({top:el.offsetTop-box.clientHeight/2+el.offsetHeight/2,behavior:force||reduce?'auto':'smooth'});
  };
  audio.addEventListener('timeupdate',()=>syncLyrics());
  audio.addEventListener('seeked',()=>syncLyrics(true));
})();