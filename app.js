// Lógica de la web: acceso admin, bloqueo por fechas, render de cada día y
// el mapa. Los datos del itinerario viven en days.js (cargado antes que este
// script), y los estilos en styles.css.

// ---- ADMIN ACCESS ----
// Cambia esta clave por la que quieras. El modo admin NO se guarda en el
// navegador: solo está activo mientras la URL de esta carga de página
// incluya ?admin=TU_CLAVE. Al recargar o volver a entrar sin ese parámetro
// (aunque sea el mismo navegador) vuelve a estar bloqueado como para
// cualquier otra persona.
const ADMIN_KEY = "italia2026";

// Limpia cualquier flag de admin que hubiera quedado guardado por una
// versión anterior de la web (esta ya no persiste nada).
localStorage.removeItem('tripAdmin');

const adminActive = new URLSearchParams(window.location.search).get('admin') === ADMIN_KEY;
function isAdmin(){
  return adminActive;
}

// Quita el parámetro de la barra de direcciones (solo estético — adminActive
// ya quedó fijado arriba, así que esto no afecta al desbloqueo).
if(adminActive){
  const params = new URLSearchParams(window.location.search);
  params.delete('admin');
  const cleanUrl = window.location.pathname + (params.toString() ? '?'+params.toString() : '') + window.location.hash;
  history.replaceState({}, '', cleanUrl);
}

function renderAdminBadge(){
  if(!isAdmin()) return;
  // Lives inside the hero (scrolls away with it) instead of position:fixed,
  // so it never ends up pinned on top of card text lower down the page.
  const host = document.querySelector('.hero') || document.body;
  const badge = document.createElement('div');
  badge.textContent = '👁️ Modo admin — toca para salir';
  badge.style.cssText = 'position:absolute;top:1rem;right:1rem;z-index:20;background:#c98a2e;color:#123640;font-size:0.68rem;font-weight:700;padding:0.35rem 0.65rem;border-radius:20px;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,0.35);font-family:"Work Sans",sans-serif;';
  badge.onclick = ()=>{ window.location.href = window.location.pathname; };
  host.appendChild(badge);
}

// ---- LOCK LOGIC ----
// Cada día se desbloquea a las 22:00 de la noche anterior a su fecha
// (es decir, medianoche de d.date menos 2 horas), no a las 00:00.
function parseISO(s){
  const [y,m,d] = s.split('-').map(Number);
  return new Date(y, m-1, d);
}
function unlockDateTime(iso){
  const dt = parseISO(iso);
  dt.setHours(dt.getHours() - 2);
  return dt;
}
function isUnlocked(d){
  return isAdmin() || Date.now() >= unlockDateTime(d.date).getTime();
}
function formatDate(iso){
  const dt = unlockDateTime(iso);
  const dateStr = dt.toLocaleDateString('es-ES', {day:'numeric', month:'long'});
  const timeStr = dt.toLocaleTimeString('es-ES', {hour:'2-digit', minute:'2-digit'});
  return `${dateStr} a las ${timeStr}`;
}
// Formatea un intervalo en ms como "Xd HHh MMm" (>=24h) o "HHh MMm SSs".
function formatCountdown(ms){
  if(ms <= 0) return null;
  const pad = n => String(n).padStart(2,'0');
  const totalSeconds = Math.floor(ms/1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if(days >= 1) return `${days}d ${pad(hours)}h ${pad(minutes)}m`;
  return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

// El sitio (hero, presupuesto, lo práctico, mapa) se ve siempre. Solo el
// contenido de cada día del itinerario se bloquea individualmente hasta su
// hora de desbloqueo (ver renderDay/tickLockStates más abajo).
document.getElementById('siteContent').style.display = 'block';
initSite();
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

// El presupuesto solo se ve en modo admin — ni la pestaña ni la sección.
if(!isAdmin()){
  const presupuestoBtn = document.querySelector('.top-nav-btn[data-section="presupuesto"]');
  if(presupuestoBtn) presupuestoBtn.remove();
  const presupuestoSection = document.getElementById('section-presupuesto');
  if(presupuestoSection) presupuestoSection.remove();
}

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

  const cardInner = `
    <div class="day-card">
      <div class="day-head">
        <div>
          <div class="waypoint">${d.waypoint}</div>
          <h2>${d.title}</h2>
        </div>
        <div class="day-drive">${d.drive}</div>
      </div>
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
        <summary>✨ Más cosas bonitas por si apetece alargar el día</summary>
        <div class="dropdown-body">
          <ul>${d.highlights.map(h=>`<li><strong>${h.name}:</strong> ${h.desc}</li>`).join('')}</ul>
        </div>
      </details>` : ''}
    </div>`;

  if(locked){
    const remaining = unlockDateTime(d.date).getTime() - Date.now();
    content.innerHTML = `
      <div class="locked-wrap">
        <div class="locked-blur">${cardInner}</div>
        <div class="locked-overlay">
          <div class="lock-icon">🔒</div>
          <div class="unlock-date">Se desbloquea el ${formatDate(d.date)}</div>
          <div class="unlock-countdown" id="dayCountdown">${formatCountdown(remaining) || ''}</div>
          <div class="unlock-sub">Todavía no toca — un poco de paciencia.</div>
        </div>
      </div>`;
  } else {
    content.innerHTML = cardInner;
  }
}

let currentDayId = days[0].id;

function selectDay(id){
  document.querySelectorAll('.day-nav button').forEach(b=>b.classList.toggle('active', b.dataset.id===id));
  currentDayId = id;
  const d = days.find(x=>x.id===id);
  renderDay(d);
  // Un día bloqueado no revela su punto en el mapa, ni siquiera al volar hacia él.
  if(isUnlocked(d)){
    map.flyTo(d.coords, 9, {duration:0.6});
    markers[id].openPopup();
  }
}

// ---- MAP ----
// Los puntos de días bloqueados no existen en el mapa todavía — se van
// revelando (marcador + tramo de ruta) en el momento en que cada día
// desbloquea, sin recargar la página (ver tickLockStates más abajo).
const map = L.map('map', {scrollWheelZoom:false}).setView([45.0,10.8], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom:18,
  attribution:'&copy; OpenStreetMap contributors'
}).addTo(map);

function dayMarkerIcon(i){
  return L.divIcon({
    className:'',
    html:`<div style="background:#c98a2e;color:#123640;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Work Sans',sans-serif;font-weight:700;font-size:12px;border:2px solid #f4f0e6;box-shadow:0 2px 6px rgba(0,0,0,0.35);">${i+1}</div>`,
    iconSize:[24,24],
    iconAnchor:[12,12]
  });
}

const markers = {};
const routeLine = L.polyline([], {color:'#1d4e5f', weight:2, dashArray:'6 6', opacity:0.7}).addTo(map);

function updateRouteLine(){
  routeLine.setLatLngs(days.filter(d=>markers[d.id]).map(d=>d.coords));
}

function revealMarker(d, i){
  if(markers[d.id]) return;
  const m = L.marker(d.coords, {icon: dayMarkerIcon(i)}).addTo(map)
    .bindPopup(`<strong>${d.title.replace(/<\/?em>/g,'')}</strong><br>${d.tab}`);
  m.on('click', ()=>selectDay(d.id));
  markers[d.id] = m;
  updateRouteLine();
}

days.forEach((d,i)=>{
  if(isUnlocked(d)) revealMarker(d, i);
});

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

// Refresca cada segundo, sin recargar: tabs y marcadores bloqueados que
// pasan a desbloqueados, y la cuenta atrás en vivo del día abierto.
function tickLockStates(){
  document.querySelectorAll('#dayNav button').forEach(btn=>{
    const d = days.find(x=>x.id===btn.dataset.id);
    const locked = !isUnlocked(d);
    const wantHtml = (locked ? '<span class="tab-lock">🔒</span>' : '') + d.tab;
    if(btn.innerHTML !== wantHtml) btn.innerHTML = wantHtml;
  });

  days.forEach((d,i)=>{
    if(!markers[d.id] && isUnlocked(d)) revealMarker(d, i);
  });

  const current = days.find(x=>x.id===currentDayId);
  if(!current) return;
  const stillLocked = !isUnlocked(current);
  if(!stillLocked){
    if(document.querySelector('.locked-overlay')) renderDay(current);
    return;
  }
  const countdownEl = document.getElementById('dayCountdown');
  if(countdownEl){
    const remaining = unlockDateTime(current.date).getTime() - Date.now();
    countdownEl.textContent = formatCountdown(remaining) || '';
  }
}
setInterval(tickLockStates, 1000);

} // /initSite
