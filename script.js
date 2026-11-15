// ---------- Menu lateral ----------
const btn = document.getElementById('menuBtn');
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('overlay');

function toggleMenu(open) {
  btn.classList.toggle('open', open);
  drawer.classList.toggle('open', open);
  overlay.classList.toggle('show', open);
  btn.setAttribute('aria-expanded', open);
  btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  document.body.style.overflow = open ? 'hidden' : '';
}
btn.addEventListener('click', () => toggleMenu(!drawer.classList.contains('open')));
overlay.addEventListener('click', () => toggleMenu(false));
drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') toggleMenu(false); });

// ---------- Aparecer ao rolar ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- Cartões que viram ----------
document.querySelectorAll('.flip').forEach(c => c.addEventListener('click', () => c.classList.toggle('on')));

// ---------- Contadores (datas ficam no atributo data-start do HTML) ----------
function tick() {
  document.querySelectorAll('.counter').forEach(c => {
    const s = Math.floor(Math.max(0, Date.now() - new Date(c.dataset.start).getTime()) / 1000);
    const v = { d: Math.floor(s / 86400), h: Math.floor(s % 86400 / 3600), m: Math.floor(s % 3600 / 60), s: s % 60 };
    c.querySelectorAll('[data-u]').forEach(b => b.textContent = v[b.dataset.u]);
  });
}
tick();
setInterval(tick, 1000);

// ---------- Estrelas de fundo ----------
const cv = document.getElementById('stars');
const ctx = cv.getContext('2d');
let stars = [];
function resize() {
  cv.width = innerWidth; cv.height = innerHeight;
  stars = Array.from({ length: Math.floor(innerWidth * innerHeight / 9000) }, () => ({
    x: Math.random() * cv.width, y: Math.random() * cv.height,
    r: Math.random() * 1.4 + .3, p: Math.random() * Math.PI * 2, v: Math.random() * .02 + .005
  }));
}
function draw() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  for (const s of stars) {
    s.p += s.v;
    ctx.globalAlpha = .3 + Math.abs(Math.sin(s.p)) * .7;
    ctx.fillStyle = '#c4b5fd';
    ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
  }
  requestAnimationFrame(draw);
}
addEventListener('resize', resize);
resize();
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) draw();
