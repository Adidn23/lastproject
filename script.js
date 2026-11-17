/* Ganti isi di bawah ini dengan cerita kamu sendiri. */
const D={
  nama:'Ayah',
  dari:'Anakmu',
  lahir:'2006-07-23',
  wa:'6285947274203',
  amplop:[
    {k:'Ayah lelah',t:'Istirahat dulu ya, Yah. Semua yang Ayah lakukan sudah lebih dari cukup. Kami bangga.'},
    {k:'Ayah kangen',t:'Telepon aku kapan saja, Yah. Aku selalu punya waktu untuk Ayah, sesibuk apa pun.'},
    {k:'Ayah ragu',t:'Ayah yang mengajariku berani. Percayalah, keputusan Ayah selalu lahir dari hati.'}
  ],
  balas:['Terima kasih ya, Nak. Ayah sayang kamu.','Ayah terharu sekali. Terima kasih hadiahnya!','Ayah sayang kalian semua.'],
  surat:[
    'Ayah, terima kasih sudah selalu ada, bahkan di hari-hari ketika Ayah sendiri sedang lelah.',
    'Banyak hal yang baru kumengerti setelah dewasa: kenapa Ayah pulang larut, kenapa Ayah diam saat aku bersikeras, dan kenapa Ayah selalu bilang “nanti juga mengerti”.',
    'Hari ini giliran aku yang bilang: aku bangga jadi anak Ayah. Panjang umur dan sehat selalu.'
  ],
  ajar:[
    ['Sabar','Ayah tidak pernah terburu-buru, dan hasilnya selalu lebih baik.'],
    ['Bertanggung jawab','Dari Ayah aku belajar bahwa janji itu ditepati, bukan dilupakan.'],
    ['Bercanda','Candaan Ayah yang receh tetap jadi yang paling kutunggu.']
  ],
  pesan:[
    ['Ibu','Terima kasih sudah jadi tempat kami pulang.'],
    ['Kakak','Ayah, jangan lupa istirahat. Kami sayang Ayah.'],
    ['Adik','Ayah juara satu di hati kami.']
  ],
  foto:[
    {src:'',cap:'Liburan keluarga',desc:'Perjalanan jauh yang selalu Ayah pastikan aman sampai tujuan.'},
    {src:'',cap:'Hari wisudaku',desc:'Ayah paling bangga hari itu, meski pura-pura tidak menangis.'},
    {src:'',cap:'Memancing bareng',desc:'Sabar menunggu, itu pelajaran pertama yang Ayah beri.'},
    {src:'',cap:'Tahun baru di rumah',desc:'Sederhana, tapi selalu terasa paling hangat.'},
    {src:'',cap:'Makan malam favorit',desc:'Menu yang Ayah pesan itu-itu saja, dan kami semua hafal.'},
    {src:'',cap:'Foto bersama hari ini',desc:'Satu foto lagi untuk disimpan, Ayah.'}
  ],
  /* puzzle.src = foto untuk puzzle, mis. 'foto-ayah.jpg'. Kosong = pakai foto pertama di daftar foto, atau gambar bawaan. */
  puzzle:{src:''},
  kupon:{depan:'Ada satu hadiah lagi. Ketuk kartunya, lalu susun puzzle-nya.',judul:'Kupon makan bareng',isi:'Di tempat favorit Ayah. Ayah yang pilih, aku yang traktir.'}
};
const $=s=>document.querySelector(s);
$('#cd').innerHTML=[150,180,210].map((x,i)=>`<rect x="${x-5}" y="126" width="10" height="46" rx="2" fill="url(#cs)"/><path d="M${x} 126v-4" stroke="#3a3a3a" stroke-width="1.5"/><g transform="translate(${x} 122)" style="--d:-${i*.07}s;--i:${.5+i*.4}s"><circle class="gl" r="32" cy="-20" fill="url(#g)"/><g class="fw"><path class="fl" d="M0 0C9-10 9-22 0-34-9-22-9-10 0 0z" fill="#F29A1F"/><path class="fl" d="M0 0C4-5 4-11 0-17-4-11-4-5 0 0z" fill="#FFE9A8"/></g><circle class="sm" r="6" cy="-10" fill="#9AA0BD"/></g>`).join('');
$('#letter').innerHTML=D.surat.map((p,i)=>`<p class="ln" style="--d:${i*.3}s">${p}</p>`).join('')+`<p class="ln sig" style="--d:${D.surat.length*.3}s">— ${D.dari}</p>`;
$('#tl').innerHTML=D.ajar.map((a,i)=>`<li style="--d:${.5+i*.6}s"><h3>${a[0]}</h3><p class="mut">${a[1]}</p></li>`).join('');
$('#foto').innerHTML=D.foto.map((f,i)=>`<div class="pw" style="--r:${[-4,3,-3,4,-3,2][i%6]}deg"><figure class="pol">${f.src?`<img src="${f.src}" alt="${f.cap}">`:`<div class="ph"><span>Foto ${i+1}</span></div>`}</figure><div class="tx"><h3>${f.cap}</h3><p class="mut">${f.desc}</p></div></div>`).join('');
$('#msgs').innerHTML=D.pesan.map(p=>`<article class="msg"><h3>${p[0]}</h3><p>${p[1]}</p></article>`).join('');
$('#front').textContent=D.kupon.depan;$('#kt').textContent=D.kupon.judul;$('#kk').textContent=D.kupon.isi;
$('#end').textContent=`Dengan sayang, ${D.dari}.`;

const m=$('#m'),h=$('#h1'),go=$('#go'),st=$('#st'),cake=$('#cake');let out=false,stream=null;
function swap(t){h.style.opacity=0;setTimeout(()=>{h.textContent=t;h.style.opacity=1},450)}
function blow(){
  if(out)return;out=true;
  if(stream)stream.getTracks().forEach(t=>t.stop());
  cake.style.setProperty('--b',0);
  $('#hero').classList.add('out');
  confetti();swap(`Selamat ulang tahun, ${D.nama}!`);
  st.textContent='';$('#tap').hidden=true;
  go.textContent='Lanjut ke suratnya';go.disabled=false;
  m.classList.remove('locked');
}
async function listen(){
  go.disabled=true;
  try{
    const ac=new(window.AudioContext||window.webkitAudioContext)();
    stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});
    await ac.resume();
    const an=ac.createAnalyser();an.fftSize=512;ac.createMediaStreamSource(stream).connect(an);
    const buf=new Uint8Array(an.fftSize);let n=0,base=0,hits=0;
    st.textContent='Mendengarkan… dekatkan HP ke bibir lalu tiup.';go.textContent='Mendengarkan…';
    (function tick(){
      if(out)return;
      an.getByteTimeDomainData(buf);
      let s=0;for(const v of buf){const d=(v-128)/128;s+=d*d}
      const r=Math.sqrt(s/buf.length);
      if(n<20){base+=r/20;n++}
      else{
        const thr=Math.max(.1,base*3+.05);
        hits=r>thr?hits+1:Math.max(0,hits-2);
        cake.style.setProperty('--b',Math.min(1,r*4));
        if(hits>=14){blow();return}
      }
      requestAnimationFrame(tick);
    })();
  }catch(e){
    go.disabled=false;go.textContent='Tiup lewat mikrofon';
    st.textContent='Mikrofon tidak bisa diakses di sini. Buka tautan ini langsung di browser, atau ketuk lilinnya.';
  }
}
go.onclick=()=>out?$('#surat').scrollIntoView({behavior:'smooth'}):listen();
$('#tap').onclick=blow;cake.onclick=blow;
$('#card').onclick=e=>{const c=e.currentTarget,o=c.getAttribute('aria-pressed')!=='true';c.setAttribute('aria-pressed',o);if(o)confetti()};

/* Aksesoris: gambar vektor kecil yang disebar di tiap bagian */
const pet=(n,cy,rx,ry,fl,st,o=0)=>Array.from({length:n},(_,i)=>`<ellipse cy='${cy}' rx='${rx}' ry='${ry}' fill='${fl}' stroke='${st}' stroke-width='1.2' transform='rotate(${o+i*360/n})'/>`).join('');
const S={
flower:`<g transform='translate(50 50)'><g fill='#7C8A6A' stroke='#5E6A52'><ellipse cy='-36' rx='7' ry='16' transform='rotate(40)'/><ellipse cy='-36' rx='7' ry='16' transform='rotate(150)'/><ellipse cy='-36' rx='7' ry='16' transform='rotate(-70)'/></g>${pet(6,-20,13,22,'#F6F0E1','#CDBF9F')}${pet(6,-11,8,14,'#EFE5CC','#CDBF9F',30)}<circle r='6' fill='#D8C58F' stroke='#B8A56E'/><circle r='2' fill='#B8A56E'/></g>`,
bird:`<path d='M14 58C28 44 50 42 66 48C72 38 82 34 92 36C88 44 82 48 76 50C70 64 50 72 30 68C22 66 18 62 14 58Z' fill='#E9E1CF' stroke='#B5A98A' stroke-width='1.5'/><path d='M40 50C50 32 68 24 84 24C76 38 62 50 46 58Z' fill='#F6F0E1' stroke='#B5A98A' stroke-width='1.5'/><path d='M16 58L3 70L24 66Z' fill='#CFC3A5'/><path d='M92 36L99 38L92 41Z' fill='#C9A24A'/><circle cx='80' cy='38' r='1.6' fill='#3A2F26'/>`,
pin:`<g fill='none' stroke='#D2D3D9' stroke-width='3.5' stroke-linecap='round'><path d='M16 78C2 66 10 44 28 52L86 82'/><path d='M28 52L70 30C80 26 88 36 80 44L34 70'/><circle cx='20' cy='70' r='4' stroke-width='3'/></g>`,
heart:`<path d='M50 90C14 64 6 38 22 22C34 10 48 18 50 30C52 18 66 10 78 22C94 38 86 64 50 90Z' fill='#D2D3D9' stroke='#8E8F98' stroke-width='3'/><path d='M50 78C26 60 20 42 30 32C38 24 47 29 50 37C53 29 62 24 70 32C80 42 74 60 50 78Z' fill='#2B2527'/><path d='M50 62C38 52 36 44 42 40C46 37 49 40 50 43C51 40 54 37 58 40C64 44 62 52 50 62Z' fill='#F4EEDF' opacity='.85'/><circle cx='50' cy='8' r='6' fill='none' stroke='#D2D3D9' stroke-width='3'/>`,
seal:`<circle cx='50' cy='50' r='38' fill='#7A2433'/><circle cx='50' cy='50' r='30' fill='none' stroke='#5E1824' stroke-width='4'/>${pet(5,-12,7,9,'#9B3345','#5E1824').replace(/<ellipse/g,'<ellipse transform-origin="50 50"')}<circle cx='50' cy='50' r='5' fill='#5E1824'/>`,
stamp:`<rect x='14' y='8' width='72' height='84' fill='#EFE6CF' stroke='#CFC3A5' stroke-dasharray='3 3'/><rect x='22' y='16' width='56' height='68' fill='none' stroke='#7A2433' stroke-width='1.5'/><text x='50' y='42' text-anchor='middle' font-family='Pinyon Script,cursive' font-size='18' fill='#7A2433'>${D.nama}</text><circle cx='50' cy='58' r='6' fill='none' stroke='#7A2433'/><path d='M30 72h40M34 78h32' stroke='#7A2433' stroke-width='1.5'/>`,
bow:`<path d='M50 50C26 24 6 34 12 56C18 74 40 62 50 50Z M50 50C74 24 94 34 88 56C82 74 60 62 50 50Z' fill='#7A2433' stroke='#5E1824' stroke-width='2'/><path d='M48 54L34 92L46 84L50 94L54 84L66 92L52 54Z' fill='#6A1F2C'/><circle cx='50' cy='50' r='8' fill='#5E1824'/><path d='M22 44C30 46 38 48 44 50M78 44C70 46 62 48 56 50' stroke='#9B3345' stroke-width='1.5' fill='none'/>`,
tag:`<path d='M30 20h40l8 12v62H22V32z' fill='#F2EAD8' stroke='#CFC3A5' stroke-width='1.5'/><circle cx='50' cy='32' r='4' fill='#231F20'/><path d='M50 32C50 14 70 8 78 2' stroke='#C9A24A' stroke-width='2' fill='none'/><text x='50' y='66' text-anchor='middle' font-family='Pinyon Script,cursive' font-size='20' fill='#6E1F2B'>${D.nama}</text><text x='50' y='82' text-anchor='middle' font-family='Patrick Hand,cursive' font-size='9' fill='#3A2F26'>tersayang</text>`,
sprig:`<g fill='#7C8A6A' stroke='#5E6A52'><path d='M50 98C50 70 50 40 50 6' fill='none' stroke-width='2'/>${[0,1,2,3,4].map(i=>`<ellipse cy='-11' rx='5.5' ry='12' transform='translate(50 ${84-i*16}) rotate(${i%2?42:-42})'/>`).join('')}</g>`
};
[['hero','flower',150,'left:-44px;top:70px','-12'],['hero','pin',90,'left:12px;top:34px','-25'],['hero','tag',84,'right:6px;top:32px','8'],['hero','bird',70,'left:16%;top:26%','-8'],['hero','bird',48,'left:30%;top:20%','6',-1],['hero','flower',120,'right:-40px;bottom:60px','14'],['hero','sprig',90,'right:40px;bottom:118px','24'],['hero','flower',90,'left:-20px;bottom:50px','20'],['hero','bow',80,'left:18%;bottom:24px','-6'],
['surat','heart',110,'right:-10px;top:86px','14'],['surat','stamp',84,'left:4px;top:56px','-14'],['surat','flower',130,'left:-40px;bottom:70px','10'],['surat','bow',92,'right:18px;bottom:16px','8'],['surat','sprig',90,'left:60px;bottom:40px','-24'],
['ajar','flower',130,'right:-40px;top:56px','12'],['ajar','bird',66,'left:10px;top:72px','-8'],['ajar','sprig',90,'left:-4px;bottom:36px','-12'],['ajar','flower',90,'left:34px;bottom:24px','-10'],
['kenang','bow',88,'right:8px;top:40px','10'],['kenang','pin',84,'left:6px;top:50px','50'],['kenang','stamp',78,'right:8px;bottom:96px','10'],['kenang','flower',110,'left:-36px;bottom:16px','-8'],
['pesan','flower',110,'left:-34px;top:46px','-10'],['pesan','bird',72,'right:12px;top:70px','8',-1],['pesan','heart',100,'right:-10px;bottom:36px','-12'],['pesan','sprig',80,'left:60px;bottom:30px','16'],
['hadiah','flower',130,'left:-34px;top:50px','-10'],['hadiah','flower',140,'right:-44px;bottom:70px','16'],['hadiah','bird',68,'right:14%;top:64px','8',-1],['hadiah','bow',86,'left:12px;bottom:60px','-8'],['hadiah','seal',70,'left:10%;bottom:30%','-10'],['hadiah','sprig',80,'right:46px;bottom:56px','-18']
].forEach(([id,k,w,pos,r,f])=>$('#'+id).insertAdjacentHTML('beforeend',`<svg class='dc' viewBox='0 0 100 100' width='${w}' height='${w}' style='${pos};--r:${r}deg;--f:${f||1};--t:${(5+Math.random()*3).toFixed(1)}s' aria-hidden='true'>${S[k]}</svg>`));

$('#amp').innerHTML=D.amplop.map(a=>`<button class='env' type='button' aria-expanded='false'><span class='fp'></span><span class='lt'><b>${D.nama} tersayang,</b>${a.t}</span><span class='bd'><span>Buka kalau ${a.k}</span></span><span class='sl'>\u2740</span></button>`).join('');
document.querySelectorAll('.env').forEach(b=>b.onclick=()=>{const o=b.getAttribute('aria-expanded')!=='true';document.querySelectorAll('.env').forEach(x=>x.setAttribute('aria-expanded','false'));b.setAttribute('aria-expanded',o)});

const days=Math.max(0,Math.floor((Date.now()-new Date(D.lahir))/864e5));
$('#sub').textContent=`kira-kira ${Math.floor(days/365.25)} tahun ${Math.floor(days%365.25/30.44)} bulan`;
new IntersectionObserver((es,o)=>es.forEach(e=>{if(!e.isIntersecting)return;o.disconnect();const el=$('#num'),t0=performance.now(),fin=()=>el.textContent=days.toLocaleString('id-ID');if(matchMedia('(prefers-reduced-motion:reduce)').matches)return fin();(function f(t){const p=Math.min(1,(t-t0)/2200);el.textContent=Math.round(days*(1-Math.pow(1-p,3))).toLocaleString('id-ID');if(p<1)requestAnimationFrame(f);else fin()})(t0)}),{threshold:.5}).observe($('#num'));

let msg=D.balas[0];const wa=$('#wa'),link=()=>wa.href=`https://wa.me/${D.wa}?text=${encodeURIComponent(msg)}`;
$('#chips').innerHTML=D.balas.map((b,i)=>`<button class='chip' type='button' aria-pressed='${i==0}'>${b}</button>`).join('');
document.querySelectorAll('.chip').forEach((c,i)=>c.onclick=()=>{msg=D.balas[i];document.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===c));link()});link();

[['hitung','flower',130,'right:-40px;top:56px','10'],['hitung','bird',64,'left:12px;top:70px','-8'],['hitung','sprig',80,'left:-6px;bottom:36px','-14'],['amplop','flower',120,'left:-36px;top:50px','-10'],['amplop','bow',86,'right:10px;top:46px','8'],['amplop','pin',80,'right:14px;bottom:50px','30'],['balas','flower',130,'right:-40px;top:50px','12'],['balas','heart',90,'left:6px;bottom:40px','-10'],['balas','bird',60,'left:14px;top:70px','-6']].forEach(([id,k,w,pos,r,f])=>$('#'+id).insertAdjacentHTML('beforeend',`<svg class='dc' viewBox='0 0 100 100' width='${w}' height='${w}' style='${pos};--r:${r}deg;--f:${f||1};--t:${(5+Math.random()*3).toFixed(1)}s' aria-hidden='true'>${S[k]}</svg>`));

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.35});
document.querySelectorAll('.ln,#tl,.pw').forEach(el=>io.observe(el));

function confetti(){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const c=$('#cf'),x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;
  const cols=['#B8892D','#1E2B5E','#7A4B2A','#E2B84F','#C95F6B'];
  const p=Array.from({length:150},()=>({x:innerWidth/2,y:innerHeight*.5,vx:(Math.random()-.5)*16,vy:-Math.random()*16-4,s:Math.random()*7+4,r:Math.random()*6,vr:(Math.random()-.5)*.3,c:cols[Math.random()*5|0]}));
  let t=0;
  (function f(){
    x.clearRect(0,0,c.width,c.height);
    p.forEach(q=>{q.vy+=.35;q.vx*=.99;q.x+=q.vx;q.y+=q.vy;q.r+=q.vr;x.save();x.translate(q.x,q.y);x.rotate(q.r);x.fillStyle=q.c;x.fillRect(-q.s/2,-q.s/4,q.s,q.s/2);x.restore()});
    if(++t<170)requestAnimationFrame(f);else x.clearRect(0,0,c.width,c.height);
  })();
}

/* kreatif.js — lapisan gerak & kejutan. Dimuat SETELAH script.js. */
(function(){
const rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const buzz=n=>{try{navigator.vibrate&&navigator.vibrate(n)}catch(_){}};
document.documentElement.classList.add('kx');

/* 1. Judul tiap bagian muncul saat terlihat */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('kx-in');io.unobserve(e.target)}}),{threshold:.4});
document.querySelectorAll('section:not(#hero) h2').forEach(h=>io.observe(h));

/* 2. Pemandangan petualangan & peta: tiap bagian punya peta sendiri */
const COMPASS='<svg viewBox="0 -16 200 216"><g fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="100" cy="100" r="94"/><circle class="rg" cx="100" cy="100" r="82" stroke-dasharray="2 6"/><circle cx="100" cy="100" r="58"/></g><path d="M100 4L113 87L196 100L113 113L100 196L87 113L4 100L87 87Z" fill="currentColor" opacity=".3"/><path transform="rotate(45 100 100)" d="M100 28L108 92L172 100L108 108L100 172L92 108L28 100L92 92Z" fill="currentColor" opacity=".5"/><g class="nd"><path d="M100 14L110 100L100 108L90 100Z" fill="#B5452E"/><path d="M100 186L110 100L100 92L90 100Z" fill="#F4EEDF"/></g><circle cx="100" cy="100" r="6" fill="#E2B84F"/><text x="100" y="-3" text-anchor="middle" font-size="18" font-family="Cormorant Garamond,serif" font-weight="700" fill="currentColor">U</text></svg>';
const SHIP_G='<path d="M10 70H90L76 90H24Z" fill="#7A4B2A"/><path d="M50 12V70" stroke="#4A3320" stroke-width="3"/><path d="M52 14L84 62H52Z" fill="#F4EEDF"/><path d="M48 24L20 62H48Z" fill="#E8D9B5"/><path d="M50 12L66 8L50 4Z" fill="#B5452E"/>';
const SHIP='<svg viewBox="0 0 100 100">'+SHIP_G+'</svg>';
const ISLAND='<svg viewBox="0 0 120 90"><path d="M0 90C10 62 40 56 62 58C90 56 112 68 120 90Z" fill="#E6CF92"/><path d="M66 60C62 40 66 24 74 10" stroke="#7A4B2A" stroke-width="5" fill="none" stroke-linecap="round"/><g class="lf" fill="#3E7B4A"><path d="M74 10C60 4 46 10 40 22C54 14 64 14 74 10Z"/><path d="M74 10C88 4 102 10 108 22C94 14 84 14 74 10Z"/><path d="M74 10C70 -2 78 -8 90 -8C82 -2 80 4 74 10Z"/></g></svg>';
const LIGHT='<svg viewBox="-130 0 320 130"><path class="bm" d="M30 14L-126 -2V30Z" fill="#FFE29A"/><path class="bm b2" d="M30 14L186 -2V30Z" fill="#FFE29A"/><path d="M18 120L24 34H36L42 120Z" fill="#F4EEDF"/><path d="M20 90L40 100L41 112L19 102ZM22 60L38 68L39 80L21 72Z" fill="#B5452E"/><rect x="20" y="22" width="20" height="14" rx="2" fill="#E2B84F"/><path d="M18 22L30 8L42 22Z" fill="#B5452E"/></svg>';
const BIRDS='<svg viewBox="0 0 70 30"><g class="wf" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 12Q9 2 16 12Q23 2 30 12"/><path d="M38 20Q44 12 50 20Q56 12 62 20"/></g></svg>';
const CLOUD='<svg viewBox="0 0 100 40"><path d="M20 36A14 14 0 0 1 22 8A18 18 0 0 1 56 6A16 16 0 0 1 84 18A12 12 0 0 1 82 36Z" fill="currentColor"/></svg>';
const BALLOON='<svg viewBox="0 0 60 90"><path d="M30 2C8 2 2 22 8 38C12 48 22 56 24 62H36C38 56 48 48 52 38C58 22 52 2 30 2Z" fill="#B5452E"/><path d="M30 2C20 12 20 48 24 62H36C40 48 40 12 30 2Z" fill="#E2B84F"/><path d="M24 62L26 74M36 62L34 74" stroke="#4A3320" stroke-width="1.5"/><rect x="25" y="74" width="10" height="8" rx="1.5" fill="#7A4B2A"/></svg>';
const PIN='<svg viewBox="0 0 30 44"><ellipse cx="15" cy="40" rx="8" ry="3" fill="#0006"/><path d="M15 2C7 2 2 8 2 15C2 26 15 40 15 40C15 40 28 26 28 15C28 8 23 2 15 2Z" fill="#B5452E"/><circle cx="15" cy="15" r="5.5" fill="#F4EEDF"/></svg>';
const STAMP='<svg viewBox="0 0 70 84"><path d="M2 2h66v80H2z" fill="#F7EBD0" stroke="#B5452E" stroke-width="1.5" stroke-dasharray="3 3"/><rect x="9" y="9" width="52" height="52" fill="#B7D4D8"/><path d="M9 61L26 36L38 50L47 40L61 61Z" fill="#3E7B4A"/><circle cx="48" cy="22" r="6" fill="#E2B84F"/><text x="35" y="74" text-anchor="middle" font-size="9" font-family="Jost,sans-serif" fill="#B5452E" font-weight="600">AYAH</text></svg>';
const XMARK='<svg viewBox="0 0 50 50"><path d="M8 8L42 42M42 8L8 42" stroke="#B5452E" stroke-width="9" stroke-linecap="round"/></svg>';
const TENT='<svg viewBox="0 0 120 80"><path d="M4 78L60 8L116 78Z" fill="#C9692F"/><path d="M60 8L116 78H70Z" fill="#A5521F"/><path d="M60 78V38L82 78Z" fill="#FFE29A" opacity=".9"/><path d="M60 8V78" stroke="#4A3320" stroke-width="2"/></svg>';
const FIRE='<svg viewBox="0 0 60 70"><path d="M8 66L52 58M8 58L52 66" stroke="#5A3A1F" stroke-width="7" stroke-linecap="round"/><path class="fa" d="M30 8C44 24 46 40 40 54C36 60 24 60 20 54C14 42 18 28 30 8Z" fill="#F29A1F"/><path class="fa f2" d="M30 22C38 34 38 44 34 52C32 56 28 56 26 52C22 44 24 34 30 22Z" fill="#FFE29A"/></svg>';
const CHEST='<svg viewBox="0 0 100 80"><rect x="8" y="34" width="84" height="42" rx="5" fill="#7A4B2A"/><path d="M8 38C8 14 92 14 92 38Z" fill="#8F5A30"/><rect x="8" y="34" width="84" height="8" fill="#C9962F"/><path d="M20 38V76M80 38V76" stroke="#C9962F" stroke-width="5"/><rect x="44" y="30" width="12" height="20" rx="2" fill="#E2B84F"/><circle cx="50" cy="42" r="3" fill="#4A3320"/></svg>';
const PINE='<svg viewBox="0 0 30 50"><path d="M15 0L28 22H20L30 38H18V50H12V38H0L10 22H2Z" fill="currentColor"/></svg>';
const MOUNT='<svg viewBox="0 0 200 120" preserveAspectRatio="none"><path d="M0 120L52 34L88 80L128 18L200 120Z" fill="currentColor"/><path d="M52 34L40 52L52 48L60 56ZM128 18L112 44L128 38L138 48Z" fill="#F4EEDF" opacity=".9"/></svg>';
const PLANE='<g transform="scale(1.5)"><path d="M-14 0L-4 -2L-2 -12L2 -12L4 -2L14 -1L14 1L4 2L2 12L-2 12L-4 2L-14 0Z" fill="#F4EEDF" stroke="#4A3320" stroke-width="1"/></g>';
const PAPER='<g transform="scale(1.6)"><path d="M-14 6L16 0L-14 -6L-8 0Z" fill="#F4EEDF"/><path d="M-8 0L16 0L-14 6Z" fill="#C9C0AA"/></g>';
const HIKER='<circle r="6" fill="#B5452E" stroke="#F4EEDF" stroke-width="2.5"/>';
const SHIPM='<g transform="translate(-14 -22) scale(.3)">'+SHIP_G+'</g>';
const S=(c,s,h='')=>`<span class="${c}" style="${s}">${h}</span>`;
const RT=(id,d,col,dash,shape,dur=28,rot='auto',extra='')=>`<svg class="m-rt" viewBox="0 0 390 800" preserveAspectRatio="xMidYMid slice"><path id="${id}" d="${d}" fill="none" stroke="${col}" stroke-width="3" stroke-linecap="round" stroke-dasharray="${dash}" class="dsh"/>${extra}${shape?`<g>${shape}<animateMotion dur="${dur}s" repeatCount="indefinite" rotate="${rot}"><mpath href="#${id}"/></animateMotion></g>`:''}</svg>`;
const PA='M-20 700C90 660 30 560 130 520S310 500 250 400S50 360 120 270S320 230 260 140S110 90 210 20';
const PB='M410 720C300 660 360 560 250 520S80 470 140 380S330 330 250 230S60 190 140 90S300 40 200 -20';
const SPK=(x,y,col='#FFF6E5',s=12,dl=0)=>S('m-sp',`left:${x};top:${y};width:${s}px;height:${s}px;color:${col};animation-delay:-${dl}s`);
const SPS=(a,col)=>a.map((q,i)=>SPK(q[0],q[1],col,q[2]||12,i*.7)).join('');
const CP=(y,w,col,op,x='50%')=>S('m-cp',`left:${x};top:${y};--w:${w}px;color:${col};opacity:${op}`,COMPASS);
const WV=(b,col,du,dl=0)=>S('m-wave',`bottom:${b};--wc:${col};animation-duration:${du}s;animation-delay:-${dl}s`);
const SEA=(h,c1,c2)=>S('m-sea',`--h:${h};--c1:${c1};--c2:${c2}`);
const BD=(y,w,col,dl,du)=>S('m-cr m-bd',`top:${y};width:${w}px;color:${col};animation-duration:${du}s;animation-delay:-${dl}s`,BIRDS);
const CL=(y,w,col,dl,du)=>S('m-cr',`top:${y};width:${w}px;color:${col};animation-duration:${du}s;animation-delay:-${dl}s`,CLOUD);
const SH=(x,b,w,dl,du=34)=>S('m-sh',`left:${x};bottom:${b};width:${w}px;animation-duration:${du}s;animation-delay:-${dl}s`,SHIP);
const IS=(x,b,w)=>S('m-is',`left:${x};bottom:${b};width:${w}px`,ISLAND);
const LH=(x,b,w)=>S('m-lh',`left:${x};bottom:${b};width:${w}px`,LIGHT);
const BL=(x,y,w,dl=0)=>S('m-bl',`left:${x};top:${y};width:${w}px;animation-delay:-${dl}s`,BALLOON);
const PN=(x,y,w,dl=0)=>S('m-pn',`left:${x};top:${y};width:${w}px;animation-delay:-${dl}s`,PIN);
const ST=(x,y,w,rot,dl=0)=>S('m-st',`left:${x};top:${y};width:${w}px;transform:rotate(${rot}deg);animation-delay:-${dl}s`,STAMP);
const XM=(x,y,w,dl=0)=>S('m-x',`left:${x};top:${y};width:${w}px;animation-delay:-${dl}s`,XMARK);
const MT=(x,b,w,h,col)=>S('m-mt',`left:${x};bottom:${b};width:${w};height:${h};color:${col}`,MOUNT);
const TR=(x,b,w,col,dl=0)=>S('m-tr',`left:${x};bottom:${b};width:${w}px;color:${col};animation-delay:-${dl}s;animation-duration:${4+dl%3}s`,PINE);
const FF=(x,y,dx,dy,d,dl)=>S('m-ff',`left:${x};top:${y};--dx:${dx}px;--dy:${dy}px;--d:${d}s;animation-delay:-${dl}s`);
const CN=(x,dl,d=8)=>S('m-cn',`left:${x};top:84%;--d:${d}s;animation-delay:-${dl}s`);
const OB=(s,t,dir='normal',dc='#E2B84F')=>S('m-ob',`--s:${s}px;--t:${t}s;--dir:${dir};--dc:${dc}`);
const ISLAND2='<svg viewBox="0 0 150 100"><path d="M0 100C8 72 40 64 72 66C106 64 140 76 150 100Z" fill="#EAD39A"/><path d="M0 100C18 90 132 90 150 100" fill="none" stroke="#fff" stroke-width="2" opacity=".7"/><path d="M20 88C30 68 60 60 80 64C104 62 124 74 130 88Z" fill="#6FA85A"/><path d="M54 68C50 48 54 32 62 14" stroke="#7A4B2A" stroke-width="5" fill="none" stroke-linecap="round"/><g class="lf2" fill="#3E7B4A"><path d="M62 14C48 8 34 14 28 26C42 18 52 18 62 14Z"/><path d="M62 14C76 8 90 14 96 26C82 18 72 18 62 14Z"/><path d="M62 14C58 2 66 -4 78 -4C70 2 68 8 62 14Z"/></g><g class="tr2"><rect x="100" y="54" width="4" height="16" fill="#7A4B2A"/><circle cx="102" cy="48" r="13" fill="#3E7B4A"/><circle cx="96" cy="52" r="9" fill="#4F9560"/></g><circle cx="82" cy="66" r="6" fill="#3E7B4A"/></svg>';
const FISH='<svg viewBox="0 0 50 24"><g class="tl2"><path d="M12 12L0 2V22Z" fill="#E07B2B"/></g><ellipse cx="28" cy="12" rx="20" ry="9" fill="#F2994A"/><path d="M22 4C26 8 26 16 22 20M30 4C34 8 34 16 30 20" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/><circle cx="42" cy="10" r="2.4" fill="#fff"/><circle cx="42.6" cy="10" r="1.2" fill="#14121A"/></svg>';
const FLAG3='<svg viewBox="0 0 90 110"><path d="M6 4V108" stroke="#4A3320" stroke-width="5" stroke-linecap="round"/><g class="fw3"><path d="M9 8H84C78 22 84 36 84 52H9Z" fill="#14121A" stroke="#E2B84F" stroke-width="1.5"/><path d="M28 42L64 14M64 42L28 14" stroke="#F4EEDF" stroke-width="3.5" stroke-linecap="round"/><circle cx="46" cy="26" r="10" fill="#F4EEDF"/><rect x="41" y="32" width="10" height="8" rx="2" fill="#F4EEDF"/><circle cx="42.5" cy="25" r="2.6" fill="#14121A"/><circle cx="49.5" cy="25" r="2.6" fill="#14121A"/></g></svg>';
const WHEEL=(()=>{let s='';for(let i=0;i<8;i++){const a=i*Math.PI/4,x=(60+54*Math.cos(a)).toFixed(1),y=(60+54*Math.sin(a)).toFixed(1);s+=`<path d="M60 60L${x} ${y}" stroke="#E2B84F" stroke-width="6" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="5" fill="#C9962F"/>`}return `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="38" fill="none" stroke="#C9962F" stroke-width="10"/><circle cx="60" cy="60" r="38" fill="none" stroke="#4A3320" stroke-width="2.5" opacity=".5"/>${s}<circle cx="60" cy="60" r="13" fill="#B8892D" stroke="#4A3320" stroke-width="2"/><circle cx="60" cy="60" r="4" fill="#4A3320"/></svg>`})();
const PARROT='<svg viewBox="0 0 60 92"><path d="M6 86H54" stroke="#4A3320" stroke-width="5" stroke-linecap="round"/><path d="M26 82L20 92L30 90L38 92L34 82Z" fill="#2B5FD8"/><path d="M30 82C18 80 14 58 20 40C24 28 38 28 42 40C48 58 42 80 30 82Z" fill="#C93A2E"/><path d="M22 46C10 54 12 74 20 80C20 68 22 56 22 46Z" fill="#2B5FD8"/><path d="M38 46C50 54 48 74 40 80C40 68 38 56 38 46Z" fill="#E2B84F"/><g class="hd"><circle cx="30" cy="24" r="14" fill="#C93A2E"/><path d="M38 20C52 20 52 34 43 36C44 30 42 25 38 20Z" fill="#F2D27A"/><path d="M43 36C46 36 49 34 50 31" stroke="#4A3320" stroke-width="2" fill="none"/><circle cx="33" cy="21" r="4.4" fill="#fff"/><circle cx="34" cy="21" r="2.2" fill="#14121A"/></g></svg>';
const CANNON='<svg viewBox="0 0 120 72"><circle class="pf" cx="6" cy="32" r="7" fill="#d8d2c4"/><circle class="pf p2" cx="3" cy="32" r="6" fill="#bdb6a6"/><path d="M40 44H100L104 60H44Z" fill="#7A4B2A"/><path d="M14 24L88 20L98 26V42L88 48L14 44Z" fill="#2E2E38"/><rect x="10" y="22" width="9" height="24" rx="3" fill="#4A4A58"/><path d="M20 28H86" stroke="#6A6A7A" stroke-width="2"/><circle cx="78" cy="58" r="12" fill="#5A3A1F" stroke="#C9962F" stroke-width="3"/><path d="M78 46V70M66 58H90M69.5 49.5L86.5 66.5M86.5 49.5L69.5 66.5" stroke="#C9962F" stroke-width="2"/><circle cx="78" cy="58" r="3" fill="#C9962F"/></svg>';
const FI=(y,w,dl,du)=>S('m-fi',`top:${y};width:${w}px;--d:${du}s;animation-delay:-${dl}s`,FISH);
const JP=(x,y,w,dl)=>S('m-jp',`left:${x};top:${y};width:${w}px;animation-delay:-${dl}s`,FISH);

/* --- Pantai: kerang, bintang laut, kelapa, palem, kepiting --- */
const SHELL1='<svg viewBox="0 0 60 56"><path d="M30 52L5 24C2 11 15 2 30 2S58 11 55 24Z" fill="#F6C9B8" stroke="#C98670" stroke-width="2" stroke-linejoin="round"/><path d="M30 52L12 10M30 52L21 4M30 52V3M30 52L39 4M30 52L48 10M30 52L7 30M30 52L53 30" stroke="#D9A08C" stroke-width="1.8" fill="none"/><path d="M22 52H38L35 45H25Z" fill="#E7AE9A" stroke="#C98670" stroke-width="1.6" stroke-linejoin="round"/></svg>';
const CONCH='<svg viewBox="0 0 64 56"><path d="M8 36C6 18 26 6 42 10C58 14 62 34 50 46C40 54 20 54 12 44Z" fill="#F4DFC4" stroke="#B98B62" stroke-width="2" stroke-linejoin="round"/><path d="M42 10C52 20 46 36 34 38C25 39 22 29 29 25C34 22 38 26 36 30" fill="none" stroke="#B98B62" stroke-width="2" stroke-linecap="round"/><path d="M14 22C22 18 28 20 32 14M12 30C24 26 34 28 40 20" stroke="#D8B48A" stroke-width="1.6" fill="none"/><path d="M12 44L3 52L16 51Z" fill="#E9CFAE" stroke="#B98B62" stroke-width="1.6" stroke-linejoin="round"/></svg>';
const STARF='<svg viewBox="0 0 60 60"><path d="M30 3L37.5 21.5L57 23L42 36L46.5 55L30 45L13.5 55L18 36L3 23L22.5 21.5Z" fill="#F18A5E" stroke="#C2593A" stroke-width="2" stroke-linejoin="round"/><g fill="#FBD2B8"><circle cx="30" cy="14" r="1.8"/><circle cx="30" cy="23" r="1.6"/><circle cx="48" cy="26" r="1.6"/><circle cx="12" cy="26" r="1.6"/><circle cx="41" cy="47" r="1.6"/><circle cx="19" cy="47" r="1.6"/></g><circle cx="30" cy="31" r="3" fill="#C2593A"/></svg>';
const DOLLAR='<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" fill="#F5EAD2" stroke="#CDB88F" stroke-width="2"/><g fill="none" stroke="#CDB88F" stroke-width="2">'+[0,72,144,216,288].map(a=>`<ellipse cx="30" cy="17" rx="4.5" ry="10" transform="rotate(${a} 30 30)"/>`).join('')+'</g><circle cx="30" cy="30" r="3" fill="#CDB88F"/></svg>';
const COCO='<svg viewBox="0 0 60 60"><circle cx="30" cy="31" r="24" fill="#6B4423" stroke="#43280F" stroke-width="2"/><path d="M14 18C22 10 38 10 46 18M10 32C20 24 40 24 50 32M14 46C22 40 38 40 46 46" stroke="#8A5C33" stroke-width="2" fill="none" opacity=".7"/><circle cx="24" cy="25" r="3" fill="#2A170A"/><circle cx="36" cy="25" r="3" fill="#2A170A"/><circle cx="30" cy="34" r="3" fill="#2A170A"/><ellipse cx="21" cy="17" rx="6" ry="3" fill="#fff" opacity=".2" transform="rotate(-30 21 17)"/></svg>';
const COCOH='<svg viewBox="0 0 80 50"><path d="M4 18C4 44 76 44 76 18Z" fill="#6B4423" stroke="#43280F" stroke-width="2" stroke-linejoin="round"/><ellipse cx="40" cy="18" rx="36" ry="9" fill="#FBF6E8" stroke="#43280F" stroke-width="2"/><ellipse cx="40" cy="19" rx="26" ry="5.5" fill="#EAE0C4"/></svg>';
const LEAF='<path d="M0 0C24-30 64-34 96-4C66-18 30-14 0 0Z" fill="#3E8F4F" stroke="#2C6A39" stroke-width="1.6" stroke-linejoin="round"/><path d="M0 0C30-18 62-20 90-6" fill="none" stroke="#2C6A39" stroke-width="1.4"/>';
const PALM='<svg viewBox="0 0 200 250"><path d="M72 248C76 190 86 136 100 86" fill="none" stroke="#8A5C33" stroke-width="15" stroke-linecap="round"/><path d="M72 248C76 190 86 136 100 86" fill="none" stroke="#5E3B1E" stroke-width="15" stroke-linecap="round" stroke-dasharray="2 12" opacity=".45"/><g transform="translate(100 86)"><g class="crown">'+[-80,-35,0,28].map(a=>`<g transform="rotate(${a})">${LEAF}</g><g transform="scale(-1 1) rotate(${a})">${LEAF}</g>`).join('')+'<circle cx="-6" cy="8" r="7" fill="#6B4423" stroke="#43280F" stroke-width="1.5"/><circle cx="7" cy="9" r="7" fill="#6B4423" stroke="#43280F" stroke-width="1.5"/><circle cx="0" cy="16" r="7" fill="#7A4F2A" stroke="#43280F" stroke-width="1.5"/></g></g></svg>';
const CRAB='<svg viewBox="0 0 120 84">'
 +'<g class="lgs lgA" fill="none" stroke="#B53A1B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M40 52L18 54L10 66"/><path d="M42 58L22 68L18 80"/><path d="M48 62L36 74L34 82"/></g>'
 +'<g class="lgs lgB" fill="none" stroke="#B53A1B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M80 52L102 54L110 66"/><path d="M78 58L98 68L102 80"/><path d="M72 62L84 74L86 82"/></g>'
 +'<g class="cl"><path d="M42 42L24 34" stroke="#B53A1B" stroke-width="6" stroke-linecap="round"/><path d="M24 34C8 38 0 24 6 10C11 17 17 20 25 22C26 18 31 15 35 18C37 26 33 32 24 34Z" fill="#E4572E" stroke="#B53A1B" stroke-width="2.5" stroke-linejoin="round"/></g>'
 +'<g transform="translate(120 0) scale(-1 1)"><g class="cl cr"><path d="M42 42L24 34" stroke="#B53A1B" stroke-width="6" stroke-linecap="round"/><path d="M24 34C8 38 0 24 6 10C11 17 17 20 25 22C26 18 31 15 35 18C37 26 33 32 24 34Z" fill="#E4572E" stroke="#B53A1B" stroke-width="2.5" stroke-linejoin="round"/></g></g>'
 +'<path d="M50 34V25M70 34V25" stroke="#B53A1B" stroke-width="3" stroke-linecap="round"/>'
 +'<ellipse cx="60" cy="52" rx="31" ry="21" fill="#E4572E" stroke="#B53A1B" stroke-width="2.5"/>'
 +'<path d="M41 46C49 38 71 38 79 46" fill="none" stroke="#F58A6B" stroke-width="3" stroke-linecap="round"/><circle cx="48" cy="56" r="2.2" fill="#F58A6B"/><circle cx="72" cy="56" r="2.2" fill="#F58A6B"/>'
 +'<circle cx="50" cy="21" r="5.5" fill="#fff" stroke="#B53A1B" stroke-width="1.5"/><circle cx="70" cy="21" r="5.5" fill="#fff" stroke="#B53A1B" stroke-width="1.5"/><circle cx="51" cy="21.5" r="2.6" fill="#14121A"/><circle cx="69" cy="21.5" r="2.6" fill="#14121A"/>'
 +'<path d="M53 58Q60 64 67 58" fill="none" stroke="#7A1F0E" stroke-width="2.2" stroke-linecap="round"/></svg>';
const DC=(x,y,w,r,svg,ex='')=>S('m-dc',`left:${x};top:${y};width:${w}px;--r:${r}deg;${ex}`,svg);
const CR=(y,w,du,dl)=>S('m-crab',`top:${y};width:${w}px;--du:${du}s;--dl:-${dl}s`,CRAB);

/* --- Pantai senja (bagian penutup): matahari hampir terbenam, ombak, angin, burung, kepiting --- */
const WINDP=PALM.replace('<svg viewBox="0 0 200 250">','<svg viewBox="0 0 200 250"><g class="tsw">').replace(/<path d="M0 0C(24-30|30-18)/g,'<path class="lw" d="M0 0C$1').replace('</svg>','</g></svg>');
const BW=(b,sz,du,dir,op,dl=0)=>S('bc-w',`bottom:${b};--sz:${sz}px;--du:${du}s;--dir:${dir};--op:${op};animation-delay:-${dl}s`);
const BB=(y,w,col,dl,du,rev='')=>S('m-cr m-bd bc-bd'+rev,`top:${y};width:${w}px;color:${col};animation-duration:${du}s;animation-delay:-${dl}s`,BIRDS);
const BDC=(x,b,w,r,svg)=>S('m-dc',`left:${x};bottom:${b};width:${w}px;--r:${r}deg`,svg);
const CRB=(b,w,du,dl)=>S('m-crab',`bottom:${b};width:${w}px;--du:${du}s;--dl:-${dl}s`,CRAB);
const BSP=(x,b,sz,dl)=>S('m-sp',`left:${x};bottom:${b};width:${sz}px;height:${sz}px;color:#FFFFFF;animation-delay:-${dl}s`);
const GLINT=Array.from({length:8},(_,i)=>`<i style="--w:${30+i*20}px;top:${i*3.2}svh;animation-delay:-${(i*.55).toFixed(2)}s"></i>`).join('');
const WINDSVG='<svg viewBox="0 0 400 140" preserveAspectRatio="none"><path vector-effect="non-scaling-stroke" d="M-20 34C60 8 120 62 200 32S330 4 430 38"/><path vector-effect="non-scaling-stroke" d="M-20 78C70 54 130 100 214 74S340 50 430 82"/><path vector-effect="non-scaling-stroke" d="M-20 118C50 98 120 134 200 112S320 96 430 122"/></svg>';
const SCENES={
 hero:[CP('14%',300,'#1E2B5E',.2),WV('86%','#FFFFFFaa',8),WV('68%','#FFFFFF99',10,3),WV('50%','#FFFFFF88',12,5),WV('32%','#FFFFFF99',9,2),WV('14%','#FFFFFFaa',11,6),S('m-is','left:-8%;top:58%;width:150px',ISLAND2),S('m-is','left:68%;top:74%;width:160px',ISLAND2),S('m-is','left:66%;top:20%;width:110px',ISLAND2),S('m-is','left:2%;top:26%;width:100px',ISLAND2),FI('44%',44,2,28),FI('62%',36,14,36),FI('80%',40,22,32),JP('30%','46%',38,0),JP('56%','66%',34,4),JP('20%','82%',36,7),BD('9%',60,'#1E2B5E',2,26),BD('17%',42,'#1E2B5E',12,34),BD('36%',34,'#1E2B5E',20,40),CL('6%',100,'#FFFFFFdd',8,80),CL('30%',80,'#FFFFFFbb',40,100),SPS([['14%','52%'],['74%','40%',10],['44%','78%'],['88%','62%',10],['30%','24%',10]],'#FFFFFF')],
 surat:[RT('r-surat',PA,'#B5452E','1 9',PLANE,30,'auto','<g transform="translate(210 20)"><path d="M-14 -14L14 14M14 -14L-14 14" stroke="#B5452E" stroke-width="7" stroke-linecap="round"/></g>'),S('m-ring','left:8%;top:76%'),BL('74%','8%',58),CL('22%',90,'#FFFFFFaa',4,70),CL('58%',70,'#FFFFFF88',30,90),BD('14%',50,'#6B4A2B',6,32),CP('78%',120,'#7A4B2A',.3,'82%')],
 ajar:[S('m-lt','inset:0 -15%'),S('m-rope','left:0;top:0;bottom:0;width:12px'),S('m-rope','right:0;top:0;bottom:0;width:12px'),S('m-fl','left:5%;top:calc(5% + 6px);width:70px',FLAG3),S('m-wh','right:5%;top:calc(5% + 4px);width:86px',WHEEL),BD('3%',44,'#F4EEDF',3,28),BD('9%',34,'#F4EEDF',16,36),S('m-pr','left:7%;bottom:calc(5% + 8px);width:50px',PARROT),S('m-ch','left:38%;bottom:calc(5% + 8px);width:90px',CHEST),S('m-cnn','right:4%;bottom:calc(5% + 8px);width:120px',CANNON),SPS([['30%','4%'],['60%','10%',10],['44%','90%'],['84%','82%',10]],'#E2B84F')],
 kenang:[ST('80%','3%',54,8),ST('4%','88%',54,-9,2),BL('84%','52%',46,5),CL('40%',80,'#FFFFFFaa',10,80),CP('90%',110,'#7A4B2A',.25,'20%')],
 hitung:[CP('18%',460,'#E2B84F',.26),OB(300,26),OB(430,44,'reverse','#9DB2FF'),OB(580,70,'normal','#FF8AB5'),SPS([['12%','14%'],['84%','20%',10],['20%','80%'],['78%','84%',10],['50%','8%',9],['6%','50%',9],['94%','56%']])],
 pesan:[S('m-sea2',''),S('m-sh','left:28%;top:5%;width:44px;animation-duration:46s;animation-delay:-12s',SHIP),BD('7%',42,'#FFFFFF',3,30),S('m-palm','right:-12%;top:60%;width:170px',PALM),DC('76%','87%',34,-8,COCO),DC('4%','25%',50,-14,SHELL1),DC('8%','42%',40,18,STARF),DC('6%','67%',48,-18,CONCH),DC('3%','90%',58,8,COCOH),DC('44%','93%',44,12,DOLLAR),DC('86%','21%',34,25,STARF),DC('26%','90%',30,-30,SHELL1),CR('79%',74,20,0),CR('88%',50,27,9),SPS([['20%','20%',9],['64%','30%',10],['30%','64%',9],['90%','52%',10],['18%','96%',9]],'#FFFFFF')],
 amplop:[S('m-chest2','right:-2%;top:calc(5% + 36px);width:98px',CHEST),XM('-3%','88%',46),SPS([['76%','6%',10],['92%','12%',9],['68%','13%',8]],'#E2B84F')],
 hadiah:[S('m-ray','--s:640px'),RT('r-had',PA,'#B5452E','1 9','',30),XM('8%','6%',36),XM('84%','48%',36,1),S('m-gl','left:50%;top:calc(100% - 60px)'),S('m-ch','left:calc(50% - 56px);bottom:6%;width:112px',CHEST),CN('40%',0),CN('46%',2,9),CN('52%',4),CN('58%',6,10),CN('44%',1,7),CN('55%',5,8),SPS([['12%','12%'],['88%','22%',10],['24%','60%'],['76%','70%',10],['50%','6%',9]],'#C9962F'),BL('6%','62%',44,3)],
 balas:[S('bc-ray','left:74%'),S('bc-sun','left:74%'),CL('6%',130,'#FFF6DEdd',6,95),CL('15%',90,'#FFFFFFcc',44,125),CL('27%',110,'#FFE6B8cc',78,110),S('bc-wind','left:0;top:6%;width:100%;height:30%',WINDSVG),
  S('bc-sea',''),S('bc-glint','left:74%',GLINT),SH('16%','calc(var(--hz) - 11px)',50,4,70),
  BW('calc(var(--hz) - 4svh)',70,16,-1,.55,0),BW('calc(var(--hz) - 11svh)',110,13,1,.6,3),BW('calc(var(--hz) - 18svh)',150,11,-1,.7,5),BW('calc(var(--hz) - 24svh)',200,9,1,.8,2),
  BSP('32%','calc(var(--hz) - 9svh)',9,0),BSP('58%','calc(var(--hz) - 14svh)',11,1.2),BSP('86%','calc(var(--hz) - 7svh)',9,2.1),BSP('12%','calc(var(--hz) - 19svh)',10,.7),BSP('46%','calc(var(--hz) - 22svh)',8,1.7),
  S('bc-wet',''),S('bc-sand',''),S('bc-foam',''),
  S('bc-palm','left:-6%;bottom:calc(var(--sand) - 26px);width:215px',WINDP),S('bc-palm','right:-7%;bottom:calc(var(--sand) - 18px);width:175px;transform:scaleX(-1)',WINDP),S('bc-palm','left:30%;bottom:calc(var(--sand) - 10px);width:96px;opacity:.9',WINDP),
  BDC('38%','2svh',30,-8,COCO),BDC('64%','12svh',40,18,STARF),BDC('18%','9svh',38,-14,SHELL1),BDC('78%','5svh',42,12,CONCH),BDC('50%','8svh',30,22,DOLLAR),BDC('90%','12.5svh',28,-24,SHELL1),
  CRB('1.5svh',74,22,0),CRB('6.5svh',54,28,9),CRB('11svh',40,34,15),
  BB('9%',58,'#5A3A1F',2,30),BB('15%',40,'#5A3A1F',14,38),BB('21%',48,'#6B4423',22,34),BB('12%',32,'#6B4423',8,46),BB('26%',36,'#5A3A1F',30,42,' bc-rev')]
};
const scenes=[];
Object.entries(SCENES).forEach(([id,items])=>{
  const s=document.getElementById(id);if(!s)return;
  const d=document.createElement('div');d.className='kx-scene sc-'+id;d.setAttribute('aria-hidden','true');d.innerHTML=items.join('');
  s.prepend(d);scenes.push(d);
});
const svgPause=(sc,p)=>sc.querySelectorAll('svg').forEach(v=>{try{p?v.pauseAnimations():v.unpauseAnimations()}catch(_){}});
if(rm)scenes.forEach(d=>svgPause(d,true));
const sio=new IntersectionObserver(es=>es.forEach(e=>{const sc=e.target.querySelector('.kx-scene');if(!sc)return;sc.classList.toggle('off',!e.isIntersecting);svgPause(sc,!e.isIntersecting||rm)}),{rootMargin:'120px'});
scenes.forEach(d=>sio.observe(d.parentElement));


/* 3. Parallax ornamen (bunga, burung, pita) */
const decor=scenes.filter(el=>!el.classList.contains('sc-balas')).map(el=>({el,f:-.045,sec:el.parentElement}));
function paintParallax(){
  if(rm)return;
  for(const d of decor){
    const r=d.sec.getBoundingClientRect();
    if(r.bottom<0||r.top>innerHeight)continue;
    d.el.style.translate='0 '+((r.top+r.height/2-innerHeight/2)*d.f).toFixed(1)+'px';
  }
}
let tick=false;
function onScroll(){if(tick)return;tick=true;requestAnimationFrame(()=>{tick=false;paintParallax()})}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);

/* 4. Partikel emas + kelopak saat disentuh */
let burst=()=>{};
if(!rm){
  const c=document.createElement('canvas');c.id='kx-p';c.setAttribute('aria-hidden','true');document.body.appendChild(c);
  const x=c.getContext('2d'),dpr=Math.min(2,devicePixelRatio||1);let W,H;
  const size=()=>{W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0)};size();addEventListener('resize',size);
  const N=(navigator.hardwareConcurrency||4)<=4?14:26;
  const mk=init=>({x:Math.random()*W,y:init?Math.random()*H:H+10,r:1+Math.random()*2.2,vy:.15+Math.random()*.35,ph:Math.random()*6.28,a:.25+Math.random()*.5});
  const ps=Array.from({length:N},()=>mk(true)),petals=[];let run=true,going=true;
  function loop(){
    if(!run){going=false;return}
    x.clearRect(0,0,W,H);
    for(const p of ps){
      p.y-=p.vy;p.x+=Math.sin(p.ph+=.01)*.3;
      if(p.y<-10)Object.assign(p,mk(false));
      x.globalAlpha=p.a*(.6+.4*Math.sin(p.ph*3));x.fillStyle='#E2B84F';x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill();
    }
    for(let i=petals.length-1;i>=0;i--){
      const q=petals[i];q.vy+=.12;q.x+=q.vx;q.y+=q.vy;q.rot+=q.vr;q.life--;
      if(q.life<=0||q.y>H+20){petals.splice(i,1);continue}
      x.save();x.globalAlpha=Math.min(1,q.life/30);x.translate(q.x,q.y);x.rotate(q.rot);x.fillStyle=q.c;
      x.beginPath();x.ellipse(0,0,q.s,q.s*.5,0,0,6.283);x.fill();x.restore();
    }
    x.globalAlpha=1;requestAnimationFrame(loop);
  }
  loop();
  document.addEventListener('visibilitychange',()=>{run=!document.hidden;if(run&&!going){going=true;loop()}});
  burst=(px,py)=>{for(let i=0;i<16;i++)petals.push({x:px,y:py,vx:(Math.random()-.5)*6,vy:-Math.random()*5-1,s:4+Math.random()*4,rot:Math.random()*6,vr:(Math.random()-.5)*.3,c:['#F6F0E1','#E2B84F','#C95F6B'][i%3],life:90+Math.random()*40})};
}

/* 5b. Jejak kaki: berjalan dari foto ke foto saat di-scroll */
(function(){
  const sec=document.getElementById('kenang');if(!sec)return;
  const NS='http://www.w3.org/2000/svg',FOOT='<ellipse cx="0" cy="-2" rx="5.2" ry="8"/><ellipse cx="0" cy="9" rx="3.8" ry="4.4"/><circle cx="-4.2" cy="-12.6" r="1.7"/><circle cx="-1.6" cy="-14.4" r="1.6"/><circle cx="1.2" cy="-14.6" r="1.5"/><circle cx="3.6" cy="-13.4" r="1.4"/><circle cx="5.4" cy="-11" r="1.2"/>';
  let svg=null,prints=[],arr=[],xm=null;
  function build(){
    if(svg){svg.remove();svg=null}
    prints=[];arr=[];xm=null;
    const pws=[...sec.querySelectorAll('.pw')],h2=sec.querySelector('h2');
    if(!pws.length||!h2||!sec.offsetHeight)return;
    const off=el=>{let x=0,y=0;while(el&&el!==sec){x+=el.offsetLeft;y+=el.offsetTop;el=el.offsetParent}return{x,y}};
    const W=sec.offsetWidth,H=sec.offsetHeight,ho=off(h2);
    const p0=pws[0].querySelector('.pol'),o0=off(p0);
    /* jalur berkelok: x bergoyang seperti gelombang, y selalu turun (supaya jejak muncul berurutan saat di-scroll) */
    const MW=(x0,y0,x1,y1)=>{
      const len=Math.max(60,y1-y0),n=Math.round(len/6),cyc=Math.max(1,len/125),amp=Math.min(W*.18,72),pts=[];
      for(let k=0;k<=n;k++){
        const t=k/n,e=t*t*(3-2*t),env=Math.sin(Math.PI*t);
        let x=x0+(x1-x0)*e+Math.sin(t*Math.PI*2*cyc)*amp*env;
        x=Math.max(30,Math.min(W-30,x));
        pts.push(x.toFixed(1)+' '+(y0+(y1-y0)*t).toFixed(1));
      }
      return 'M'+pts.join('L');
    };
    let px=W/2,py=ho.y+h2.offsetHeight+16;
    const defs=[];
    pws.forEach((pw,i)=>{
      const pol=pw.querySelector('.pol'),o=off(pol),w=pol.offsetWidth,hh=pol.offsetHeight;
      const cx=o.x+w/2,cy=o.y+hh/2,top=cy-hh/2-10,bot=cy+hh/2+10;
      defs.push({d:MW(px,py,cx,top),walk:true,i,pw});
      defs.push({d:`M${cx} ${top}L${cx} ${bot}`,walk:false});
      px=cx;py=bot;
    });
    const ex=W/2,ey=py+150;
    defs.push({d:MW(px,py,ex,ey),walk:true,i:-1});
    svg=document.createElementNS(NS,'svg');svg.id='kx-trail';svg.setAttribute('width',W);svg.setAttribute('height',H);svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.setAttribute('aria-hidden','true');
    let n=0;
    defs.forEach(df=>{
      const p=document.createElementNS(NS,'path');p.setAttribute('d',df.d);p.setAttribute('fill','none');svg.appendChild(p);
      if(!df.walk)return;
      const L=p.getTotalLength();
      for(let s=14;s<L;s+=30){
        const a=p.getPointAtLength(s),a0=p.getPointAtLength(Math.max(0,s-5)),b=p.getPointAtLength(Math.min(L,s+5)),ang=Math.atan2(b.y-a0.y,b.x-a0.x),side=(n%2?1:-1);
        const x=a.x-Math.sin(ang)*side*8,y=a.y+Math.cos(ang)*side*8;
        const g=document.createElementNS(NS,'g');g.setAttribute('class','ft');
        g.setAttribute('transform',`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(ang*180/Math.PI+90).toFixed(1)}) scale(${side>0?1.05:-1.05} 1.05)`);
        g.innerHTML=FOOT;svg.appendChild(g);prints.push({el:g,y,on:false,cur:false});n++;
      }
      if(df.pw)arr.push({idx:prints.length-1,pw:df.pw,on:false});
    });
    xm=document.createElementNS(NS,'g');xm.setAttribute('class','xm');xm.setAttribute('transform',`translate(${ex} ${ey+16})`);
    xm.innerHTML='<path d="M-11 -11L11 11M11 -11L-11 11" stroke="#B5452E" stroke-width="6" stroke-linecap="round"/>';svg.appendChild(xm);
    sec.appendChild(svg);upd();
  }
  let tick=false;
  function upd(){
    if(!prints.length)return;
    const top=sec.getBoundingClientRect().top+scrollY,ref=scrollY+innerHeight*.62-top;
    let k=0;while(k<prints.length&&prints[k].y<=ref)k++;
    prints.forEach((p,i)=>{const on=i<k,cur=i===k-1&&k<prints.length;if(on!==p.on){p.on=on;p.el.classList.toggle('on',on)}if(cur!==p.cur){p.cur=cur;p.el.classList.toggle('cur',cur)}});
    arr.forEach(a=>{const on=k>a.idx;if(on!==a.on){a.on=on;a.pw.classList.toggle('kx-arr',on);if(on&&!rm){const r=a.pw.querySelector('.pol').getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2)}}});
    xm.classList.toggle('on',k>=prints.length);
  }
  addEventListener('scroll',()=>{if(tick)return;tick=true;requestAnimationFrame(()=>{tick=false;upd()})},{passive:true});
  let rt;const rebuild=()=>{clearTimeout(rt);rt=setTimeout(build,120)};
  new ResizeObserver(rebuild).observe(sec);addEventListener('resize',rebuild);addEventListener('load',rebuild);
  build();
})();

/* 5. Sentuhan: kelopak di polaroid, getar halus di amplop & kartu */
document.addEventListener('click',e=>{
  if(e.target.closest('.pol')){burst(e.clientX,e.clientY);buzz(15)}
  else if(e.target.closest('.env')){buzz(20)}
  else if(e.target.closest('#card')){burst(innerWidth/2,innerHeight/2);buzz([20,40,20])}
});
const hero=document.getElementById('hero');
if(hero)new MutationObserver(()=>{if(hero.classList.contains('out'))buzz([40,60,40])}).observe(hero,{attributes:true,attributeFilter:['class']});
})();

/* puzzle — hadiah: foto 3x3 diacak, tiap kotak bernomor 1-9. Main dengan ketukan ATAU suara ("satu ke lima"). */
(function(){
const $=s=>document.querySelector(s);
const dlg=$('#pz'),bd=$('#pzbd'),hint=$('#pzh'),btnV=$('#pzv'),card=$('#card');
const buzz=n=>{try{navigator.vibrate&&navigator.vibrate(n)}catch(_){}};
const ART=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ED8E4"/><stop offset="1" stop-color="#FBEBC4"/></linearGradient><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3E9FB5"/><stop offset="1" stop-color="#2B7F98"/></linearGradient></defs>
<rect width="600" height="300" fill="url(#a)"/><circle cx="500" cy="85" r="70" fill="#FFE29A" opacity=".5"/><circle cx="500" cy="85" r="44" fill="#FFC857"/>
<g fill="#fff"><ellipse cx="100" cy="75" rx="48" ry="20"/><ellipse cx="135" cy="62" rx="32" ry="20"/><ellipse cx="70" cy="68" rx="28" ry="16"/></g>
<text x="300" y="182" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="38" fill="#1E2B5E">Selamat Ulang Tahun,</text>
<text x="300" y="252" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="72" fill="#B5452E">Ayah!</text>
<rect y="300" width="600" height="130" fill="url(#b)"/>
<path d="M0 330Q25 318 50 330T100 330T150 330T200 330T250 330T300 330T350 330T400 330T450 330T500 330T550 330T600 330M0 395Q25 383 50 395T100 395T150 395T200 395T250 395T300 395T350 395T400 395T450 395T500 395T550 395T600 395" stroke="#fff" stroke-width="3" fill="none" opacity=".6"/>
<ellipse cx="110" cy="376" rx="92" ry="28" fill="#EAD39A"/><path d="M110 366C108 334 112 312 122 290" stroke="#7A4B2A" stroke-width="9" fill="none" stroke-linecap="round"/>
<g fill="#3E8F4F"><path d="M122 290C100 270 76 278 66 298C90 286 106 286 122 290Z"/><path d="M122 290C146 270 170 278 180 298C156 286 140 286 122 290Z"/><path d="M122 290C118 268 130 254 150 256C138 264 134 276 122 290Z"/></g>
<path d="M330 376H450L430 406H350Z" fill="#7A4B2A"/><path d="M390 306V376" stroke="#4A3320" stroke-width="5"/><path d="M394 310L442 368H394Z" fill="#F4EEDF"/><path d="M386 322L342 368H386Z" fill="#E8D9B5"/><path d="M390 306L414 299L390 292Z" fill="#B5452E"/>
<rect y="430" width="600" height="170" fill="#F1DFAF"/>
<rect x="205" y="522" width="190" height="62" rx="8" fill="#1E2B5E"/><rect x="205" y="534" width="190" height="8" fill="#E2B84F"/>
<rect x="232" y="482" width="136" height="44" rx="8" fill="#FFF6E5" stroke="#E0C888" stroke-width="2"/><rect x="258" y="448" width="84" height="38" rx="8" fill="#FFF6E5" stroke="#E0C888" stroke-width="2"/>
<g fill="#E2B84F"><rect x="283" y="424" width="7" height="26"/><rect x="297" y="424" width="7" height="26"/><rect x="311" y="424" width="7" height="26"/></g>
<g fill="#F29A1F"><ellipse cx="286" cy="414" rx="6" ry="11"/><ellipse cx="300" cy="414" rx="6" ry="11"/><ellipse cx="314" cy="414" rx="6" ry="11"/></g>
<path d="M80 490L89 512L112 514L94 529L100 552L80 540L60 552L66 529L48 514L71 512Z" fill="#F18A5E" stroke="#C2593A" stroke-width="3"/>
<g fill="#E4572E" stroke="#B53A1B" stroke-width="3"><ellipse cx="510" cy="540" rx="40" ry="26"/><circle cx="470" cy="506" r="14"/><circle cx="550" cy="506" r="14"/></g><circle cx="496" cy="520" r="5" fill="#fff"/><circle cx="524" cy="520" r="5" fill="#fff"/><circle cx="497" cy="521" r="2.4" fill="#14121A"/><circle cx="523" cy="521" r="2.4" fill="#14121A"/>
<path d="M160 470C130 450 130 425 150 425C158 425 160 432 160 436C160 432 162 425 170 425C190 425 190 450 160 470Z" fill="#E0566B"/><path d="M455 590C440 580 440 568 450 568C454 568 455 572 455 574C455 572 457 568 461 568C471 568 471 580 455 590Z" fill="#E0566B"/>
</svg>`;
const fotoSrc=(D.puzzle&&D.puzzle.src)||(D.foto.find(f=>f.src)||{}).src;
const src=fotoSrc||('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(ART));

let board=[...Array(9).keys()],sel=-1,moves=0,solved=false,listening=false,rec=null,last=null;
const tiles=[];
for(let p=0;p<9;p++){
  const b=document.createElement('button');b.type='button';b.className='pt';
  b.innerHTML=`<img alt="" draggable="false" src="${src}"><span class="pn" aria-hidden="true">${p+1}</span>`;
  b.onclick=()=>pick(p);bd.appendChild(b);tiles.push(b);
}
const full=document.createElement('img');full.className='pzi';full.alt='Gambar asli puzzle';full.src=src;bd.appendChild(full);

function render(){
  tiles.forEach((b,p)=>{
    const k=board[p],im=b.firstChild;
    im.style.left=-(k%3)*100+'%';im.style.top=-Math.floor(k/3)*100+'%';
    b.classList.toggle('ok',k===p);b.classList.toggle('sel',p===sel);
    b.setAttribute('aria-label',`Kotak ${p+1}${k===p?', sudah benar':''}`);
  });
  $('#pzm').textContent=moves?`Langkah: ${moves}`:'';
}
function shuffle(){
  do{for(let i=8;i>0;i--){const j=Math.random()*(i+1)|0;[board[i],board[j]]=[board[j],board[i]]}}
  while(board.filter((k,i)=>k===i).length>1);
  sel=-1;moves=0;render();
}
function swap(a,b){
  [board[a],board[b]]=[board[b],board[a]];moves++;sel=-1;render();buzz(15);
  [a,b].forEach(i=>{const t=tiles[i];t.classList.remove('sw');void t.offsetWidth;t.classList.add('sw')});
  if(board.every((k,i)=>k===i))win();
}
function pick(p){
  if(solved)return;
  if(sel<0)sel=p;else if(sel===p)sel=-1;else{swap(sel,p);return}
  render();
}
let tw=0,tg=0,opened=false;
function win(){
  stopVoice();solved=true;
  bd.classList.add('done');bd.classList.remove('peek');
  $('#pzr').hidden=true;$('#pzs').hidden=true;hint.textContent='';
  $('#pzt').textContent='Fotonya sudah utuh!';
  $('#pzm').textContent=`Selesai dalam ${moves} langkah`;
  $('#pzct').textContent=D.kupon.judul;$('#pzcb').textContent=D.kupon.isi;
  $('#pzwa').href=`https://wa.me/${D.wa}?text=${encodeURIComponent(`Nak, Ayah sudah menyelesaikan puzzle-nya! Ayah mau klaim hadiahnya: ${D.kupon.judul}.`)}`;
  confetti();buzz([20,40,20,40,60]);
  tw=setTimeout(showGift,1500);
}
function showGift(){
  dlg.classList.add('prize');dlg.scrollTop=0;
  $('#pzt').textContent='Ada kado untuk Ayah!';
  $('#pzw').hidden=false;$('#pzg').focus();
  tg=setTimeout(openGift,4000);
}
function openGift(){
  if(opened)return;opened=true;clearTimeout(tg);
  const g=$('#pzg');g.classList.add('open');confetti();buzz([30,50,30,50,90]);
  setTimeout(()=>{
    g.hidden=true;$('#pzgh').hidden=true;
    $('#pzt').textContent='Selamat, Ayah!';
    ['#pzcard','#pzwa','#pzc'].forEach(q=>$(q).hidden=false);
    $('#pzcard').classList.add('pop');confetti();
    $('#pzwa').focus();
  },950);
}
$('#pzg').onclick=openGift;

/* ---- suara ---- */
const NW={satu:1,dua:2,tiga:3,empat:4,lima:5,enam:6,tujuh:7,delapan:8,lapan:8,sembilan:9,one:1,two:2,three:3,four:4,five:5,six:6,seven:7,eight:8,nine:9};
function parse(t){
  const d=t.toLowerCase().replace(/[a-z]+/g,w=>NW[w]?` ${NW[w]} `:' ').match(/[1-9]/g)||[];
  return d.map(Number);
}
function heard(t){
  const n=parse(t);
  if(n.length>=2&&n[0]!==n[1]){
    hint.textContent=`Terdengar: “${t.trim()}” → tukar ${n[0]} dan ${n[1]}`;
    swap(n[0]-1,n[1]-1);return true;
  }
  hint.textContent=n.length?`Terdengar: “${t.trim()}”. Sebut dua angka berbeda, mis. “satu ke lima”.`:`Terdengar: “${t.trim()}”. Coba “satu ke lima”.`;
  return false;
}
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
function setV(on){listening=on;btnV.setAttribute('aria-pressed',on);btnV.textContent=on?'Hentikan suara':'Main pakai suara'}
function startVoice(){
  if(!SR){hint.textContent='Browser ini belum mendukung kontrol suara. Pakai ketukan saja, atau buka di Chrome.';return}
  try{
    rec=new SR();rec.lang='id-ID';rec.continuous=true;rec.interimResults=false;rec.maxAlternatives=3;
    rec.onresult=e=>{
      for(let i=e.resultIndex;i<e.results.length;i++){
        if(!e.results[i].isFinal)continue;
        let ok=false;
        for(let k=0;k<e.results[i].length&&!ok&&!solved;k++)ok=heard(e.results[i][k].transcript);
      }
    };
    rec.onerror=e=>{
      if(e.error==='not-allowed'||e.error==='service-not-allowed'){stopVoice();hint.textContent='Izin mikrofon ditolak. Aktifkan izin mikrofon di browser, atau pakai ketukan.'}
      else if(e.error==='audio-capture'){stopVoice();hint.textContent='Mikrofon tidak ditemukan.'}
      else if(e.error==='network'){stopVoice();hint.textContent='Pengenalan suara butuh internet. Pakai ketukan dulu ya.'}
    };
    rec.onend=()=>{if(listening)try{rec.start()}catch(_){}};
    rec.start();setV(true);
    hint.textContent='Mendengarkan… ucapkan mis. “satu ke lima”.';
  }catch(_){setV(false);hint.textContent='Suara tidak bisa dimulai. Pakai ketukan saja.'}
}
function stopVoice(){
  const r=rec;listening=false;rec=null;setV(false);
  if(r){r.onend=null;try{r.stop()}catch(_){}}
}
btnV.onclick=()=>listening?(stopVoice(),hint.textContent=''):startVoice();

/* ---- tombol & dialog ---- */
$('#pzp').onclick=e=>{const o=!bd.classList.contains('peek');bd.classList.toggle('peek',o);e.currentTarget.setAttribute('aria-pressed',o)};
$('#pzn').onclick=()=>{shuffle();hint.textContent='Diacak ulang.'};
$('#pzk').onclick=()=>{solved=true;close()};
$('#pzc').onclick=close;$('#pzx').onclick=close;
function open(){
  last=document.activeElement;
  if(!solved&&moves===0&&board.every((k,i)=>k===i))shuffle();
  dlg.hidden=false;document.body.style.overflow='hidden';$('#pzx').focus();
}
function close(){
  clearTimeout(tw);clearTimeout(tg);stopVoice();dlg.hidden=true;document.body.style.overflow='';
  if(solved)card.setAttribute('aria-pressed','true');
  if(last&&last.focus)last.focus();
}
dlg.addEventListener('keydown',e=>{
  if(e.key==='Escape'){close();return}
  if(e.key!=='Tab')return;
  const f=[...dlg.querySelectorAll('button')].filter(b=>b.offsetParent!==null);
  if(!f.length)return;
  const a=f[0],z=f[f.length-1];
  if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}
  else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}
});
dlg.addEventListener('click',e=>{if(e.target===dlg)close()});
card.onclick=()=>{
  if(!solved){open();return}
  const o=card.getAttribute('aria-pressed')!=='true';card.setAttribute('aria-pressed',o);if(o)confetti();
};
render();
})();