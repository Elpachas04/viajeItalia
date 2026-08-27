// Lógica de la web: acceso admin, bloqueo por fechas, render de cada día y
// el mapa. Los datos del itinerario viven en days.js (cargado antes que este
// script), y los estilos en styles.css.

// ---- ADMIN ACCESS ----
// Cambia esta clave por la que quieras. Para activar el modo admin, entra una vez
// con ?admin=TU_CLAVE en la URL (se guarda en este navegador). Para desactivarlo,
// entra con ?admin=off.
const ADMIN_KEY = "italia2026";

function checkAdminParam(){
  const params = new URLSearchParams(window.location.search);
  if(!params.has('admin')) return;
  const key = params.get('admin');
  if(key === ADMIN_KEY){
    localStorage.setItem('tripAdmin','1');
  } else if(key === 'off'){
    localStorage.removeItem('tripAdmin');
  }
  params.delete('admin');
  const cleanUrl = window.location.pathname + (params.toString() ? '?'+params.toString() : '') + window.location.hash;
  history.replaceState({}, '', cleanUrl);
}
function isAdmin(){
  return localStorage.getItem('tripAdmin') === '1';
}
checkAdminParam();

function renderAdminBadge(){
  if(!isAdmin()) return;
  // Lives inside the hero (scrolls away with it) instead of position:fixed,
  // so it never ends up pinned on top of card text lower down the page.
  const host = document.querySelector('.hero') || document.body;
  const badge = document.createElement('div');
  badge.textContent = '👁️ Modo admin — toca para salir';
  badge.style.cssText = 'position:absolute;top:1rem;right:1rem;z-index:20;background:#c98a2e;color:#123640;font-size:0.68rem;font-weight:700;padding:0.35rem 0.65rem;border-radius:20px;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,0.35);font-family:"Work Sans",sans-serif;';
  badge.onclick = ()=>{ localStorage.removeItem('tripAdmin'); location.reload(); };
  host.appendChild(badge);
}

// ---- LOCK LOGIC ----
function todayLocal(){
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
function parseISO(s){
  const [y,m,d] = s.split('-').map(Number);
  return new Date(y, m-1, d);
}
function isUnlocked(d){
  return isAdmin() || todayLocal() >= parseISO(d.date);
}
function formatDate(iso){
  return parseISO(iso).toLocaleDateString('es-ES', {day:'numeric', month:'long'});
}

const firstDay = days[0];
const today = todayLocal();
const firstDate = parseISO(firstDay.date);

if(today < firstDate && !isAdmin()){
  document.getElementById('globalLock').style.display = 'flex';
  const diffDays = Math.ceil((firstDate - today) / 86400000);
  document.getElementById('countdownNum').textContent = diffDays;
  document.getElementById('countdownLabel').textContent = diffDays === 1 ? 'día para el primer día' : 'días para el primer día';
} else {
  document.getElementById('siteContent').style.display = 'block';
  initSite();
}
renderAdminBadge();

function initSite(){

const nav = document.getElementById('dayNav');
const content = document.getElementById('dayContent');

days.forEach((d,i)=>{
  const btn = document.createElement('button');
  const locked = !isUnlocked(d);
  btn.innerHTML = (locked ? '<span class="tab-lock">🔒</span>' : '') + d.tab;
  btn.dataset.id = d.id;
  if(i===0) btn.classList.add('active');
  btn.onclick = ()=>selectDay(d.id);
  nav.appendChild(btn);
});

// ---- TOP NAV (itinerario / presupuesto / lo práctico) ----
document.querySelectorAll('.top-nav-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const target = btn.dataset.section;
    document.querySelectorAll('.top-nav-btn').forEach(b=>b.classList.toggle('active', b===btn));
    document.querySelectorAll('.app-section').forEach(s=>s.classList.toggle('active', s.id === 'section-'+target));
  });
});

function renderDay(d){
  const locked = !isUnlocked(d);

  const tl = d.timeline.map(item=>`
    <div class="tl-item">
      <div class="tl-time">${item.t}</div>
      <div class="tl-what">${item.w}</div>
      ${item.n?`<div class="tl-note">${item.n}</div>`:''}
      ${item.alert?`<div class="tl-alert ${item.alert.type}"><span class="ico">${item.alert.type==='red'?'⚠️':'💡'}</span><span>${item.alert.text}</span></div>`:''}
    </div>`).join('');

  const dayAlerts = (d.alerts||[]).map(a=>`
    <div class="alert ${a.type}">
      <span class="ico">${a.type==='red'?'⚠️':'💡'}</span>
      <span>${a.text}</span>
    </div>`).join('');

  const statusBadge = d.status==='booked'
    ? `<div class="day-status booked"><span class="status-dot ok"></span>Alojamiento reservado</div>`
    : d.status==='pending'
      ? `<div class="day-status pending"><span class="status-dot wait"></span>Alojamiento pendiente de confirmar</div>`
      : '';

  const cardInner = `
    <div class="day-card">
      <div class="day-head">
        <div>
          <div class="waypoint">${d.waypoint}</div>
          <h2>${d.title}</h2>
        </div>
        <div class="day-drive">${d.drive}</div>
      </div>
      ${statusBadge}
      ${dayAlerts}
      <div class="timeline">${tl}</div>
      <div class="info-grid">
        <div class="info-box sleep">
          <div class="tag">Dónde dormir</div>
          <h4>${d.sleep.name}</h4>
          <p>${d.sleep.note}</p>
          ${d.sleep.url?`<a class="btn" href="${d.sleep.url}" target="_blank" rel="noopener">Ver opciones →</a>`:''}
        </div>
        <div class="info-box">
          <div class="tag">Dónde comer</div>
          <h4>${d.eat.name}</h4>
          <p>${d.eat.note}</p>
        </div>
      </div>
      ${d.highlights ? `
      <details class="dropdown highlights">
        <summary>✨ Más cosas bonitas por si os apetece alargar el día</summary>
        <div class="dropdown-body">
          <ul>${d.highlights.map(h=>`<li><strong>${h.name}:</strong> ${h.desc}</li>`).join('')}</ul>
        </div>
      </details>` : ''}
    </div>`;

  if(locked){
    content.innerHTML = `
      <div class="locked-wrap">
        <div class="locked-blur">${cardInner}</div>
        <div class="locked-overlay">
          <div class="lock-icon">🔒</div>
          <div class="unlock-date">Se desbloquea el ${formatDate(d.date)}</div>
          <div class="unlock-sub">Todavía no toca — un poco de paciencia.</div>
        </div>
      </div>`;
  } else {
    content.innerHTML = cardInner;
  }
}

function selectDay(id){
  document.querySelectorAll('.day-nav button').forEach(b=>b.classList.toggle('active', b.dataset.id===id));
  const d = days.find(x=>x.id===id);
  renderDay(d);
  map.flyTo(d.coords, 9, {duration:0.6});
  if(isUnlocked(d)) markers[id].openPopup();
}

// ---- MAP ----
const map = L.map('map', {scrollWheelZoom:false}).setView([45.0,10.8], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom:18,
  attribution:'&copy; OpenStreetMap contributors'
}).addTo(map);

const markers = {};
const latlngs = [];
days.forEach((d,i)=>{
  latlngs.push(d.coords);
  const locked = !isUnlocked(d);
  const icon = L.divIcon({
    className:'',
    html:`<div style="background:#c98a2e;color:#123640;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Work Sans',sans-serif;font-weight:700;font-size:12px;border:2px solid #f4f0e6;box-shadow:0 2px 6px rgba(0,0,0,0.35);">${locked ? '🔒' : (i+1)}</div>`,
    iconSize:[24,24],
    iconAnchor:[12,12]
  });
  const m = L.marker(d.coords, {icon}).addTo(map)
    .bindPopup(locked ? `<strong>${d.tab}</strong><br>Se desbloquea el ${formatDate(d.date)}` : `<strong>${d.title.replace(/<\/?em>/g,'')}</strong><br>${d.tab}`);
  m.on('click', ()=>selectDay(d.id));
  markers[d.id] = m;
});

L.polyline(latlngs, {color:'#1d4e5f', weight:2, dashArray:'6 6', opacity:0.7}).addTo(map);

// Leaflet needs an explicit nudge whenever its container changes size
// (sticky/grid reflow, orientation change, fonts loading) or tiles render
// gray/misaligned and the map "no se ve bien".
function refreshMapSize(){
  map.invalidateSize();
}
if('ResizeObserver' in window){
  new ResizeObserver(()=>refreshMapSize()).observe(document.getElementById('map'));
}
window.addEventListener('orientationchange', ()=>setTimeout(refreshMapSize, 200));
if(document.fonts && document.fonts.ready){
  document.fonts.ready.then(refreshMapSize);
}
setTimeout(refreshMapSize, 300);

renderDay(days[0]);

} // /initSite
