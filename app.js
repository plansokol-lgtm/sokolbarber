const BOT = "https://t.me/Barbershottbot";
const LOGO = `<svg viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#e8e8e8"/><stop offset="1" stop-color="#8a8a8a"/></linearGradient></defs>
<path fill="url(#g)" d="M4 30c10-2 18-8 24-18 2 6 1 11-2 15 6-3 12-4 20-2-6 2-10 5-12 9 8-1 15 1 24 6-10 0-17 1-22 4l-4 14-4-12c-6 2-12 1-18-3 5-1 9-3 12-6-6 0-12-2-18-7z"/>
<circle cx="30" cy="24" r="1.6" fill="#d4af37"/></svg>`;
const PAGES = [["index.html","Главная"],["services.html","Услуги"],["masters.html","Мастера"],["gallery.html","Галерея"],["contacts.html","Контакты"]];
const here = location.pathname.split("/").pop() || "index.html";

document.body.insertAdjacentHTML("afterbegin", `<canvas id="stars"></canvas>
<nav><div class="wrap">
  <a href="index.html" class="logo">${LOGO}SOKOL <b>BARBER</b></a>
  <ul id="menu">${PAGES.map(([u,t])=>`<li><a href="${u}" class="${u===here?"on":""}">${t}</a></li>`).join("")}</ul>
  <a href="${BOT}" class="btn small">Записаться</a>
  <button class="burger" onclick="document.getElementById('menu').classList.toggle('open')">☰</button>
</div></nav>`);

document.body.insertAdjacentHTML("beforeend", `<footer><div class="wrap">
  <div class="grid">
    <div><a class="logo">${LOGO}SOKOL <b>BARBER</b></a><p style="margin-top:10px">Мужская парикмахерская премиум-класса.</p></div>
    <div><h4>РАЗДЕЛЫ</h4>${PAGES.map(([u,t])=>`<a href="${u}">${t}</a><br>`).join("")}</div>
    <div><h4>КОНТАКТЫ</h4>г. Мытищи, ул. Примерная, 1<br>+7 (900) 000-00-00<br>Ежедневно 10:00–21:00</div>
  </div>
  <div class="copy">© SOKOL BARBER · Сайт сделан в Sokol Plus</div>
</div></footer>`);

document.querySelectorAll("[data-bot]").forEach(a=>a.href=BOT);
document.querySelectorAll("img").forEach(i=>i.onerror=()=>i.style.opacity=0);

const c=document.getElementById("stars"),x=c.getContext("2d");let S=[];
function size(){c.width=innerWidth;c.height=innerHeight;S=[...Array(170)].map(()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.4+.2,v:Math.random()*.3+.05,t:Math.random()*6}))}
size();addEventListener("resize",size);
(function draw(){x.clearRect(0,0,c.width,c.height);S.forEach(s=>{s.y+=s.v;s.t+=.03;if(s.y>c.height){s.y=0;s.x=Math.random()*c.width}
x.globalAlpha=.35+Math.sin(s.t)*.35;x.fillStyle=s.r>1.2?"#f5d77a":"#fff";x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.fill()});requestAnimationFrame(draw)})();

const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add("show");
  e.target.querySelectorAll(".count").forEach(n=>{if(n.done)return;n.done=1;const to=+n.dataset.to;let v=0;
  const i=setInterval(()=>{v+=Math.max(1,to/60);if(v>=to){v=to;clearInterval(i)}n.textContent=Math.floor(v)+(to>=1000?"+":"")},20)})}),{threshold:.15});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
