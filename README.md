# Nuestra ruta por Italia 🇮🇹

Web estática con el itinerario del viaje (28 ago – 4 sep 2026): mapa interactivo, horario día a día, alojamientos y presupuesto.

## 🔒 Sistema de sorpresa

La web está bloqueada por fechas, sin backend — todo se calcula con la fecha del dispositivo que la abre:

- **Antes del 28 de agosto de 2026**: solo se ve una pantalla con candado y cuenta atrás. Nada del contenido es visible.
- **A partir del 28 de agosto**: la web se abre, pero cada día del itinerario que todavía no ha llegado aparece borroso y bloqueado, con un aviso de "se desbloquea el [fecha]". Cada día se destapa solo, en su fecha.

Para cambiar las fechas de desbloqueo, edita el campo `date: "2026-08-28"` (formato `YYYY-MM-DD`) de cada día dentro del array `days` en `days.js`.

### 👁️ Acceso admin (para ti)

Puedes ver todo el contenido en cualquier momento, sin esperar a las fechas, con un enlace secreto:

```
https://tu-web.netlify.app/?admin=italia2026
```

Al abrirlo una vez, el navegador queda marcado como "admin" (se guarda en `localStorage`) y verás todo desbloqueado en ese dispositivo/navegador a partir de entonces — aparece un aviso "👁️ Modo admin" en la esquina que puedes tocar para desactivarlo. Tu pareja, al no conocer ni usar ese enlace, seguirá viendo la web bloqueada por fechas con normalidad.

Para cambiar la clave, edita la constante `ADMIN_KEY` al principio de `app.js`. Para desactivar el modo admin manualmente desde la URL: `?admin=off`.

⚠️ Esto es solo una ofuscación (no hay backend ni autenticación real): cualquiera que mire el código fuente de `index.html` podría encontrar la clave. Es suficiente para que tu pareja no vea la sorpresa por accidente, pero no lo compartas ni lo publiques en un repo público si quieres que la clave siga siendo secreta.

## 📁 Estructura

```
.
├── index.html   ← estructura de la página (HTML)
├── styles.css   ← todos los estilos
├── days.js      ← contenido del itinerario (el array `days`) — lo que más se edita
├── app.js       ← lógica: acceso admin, bloqueo por fechas, render de cada día y el mapa
└── README.md    ← este archivo
```

No hay build ni dependencias que instalar — es HTML/CSS/JS estático puro, solo archivos sueltos servidos tal cual. Las únicas librerías externas (Leaflet para el mapa, Google Fonts) se cargan desde CDN dentro de `index.html`.

## 🚀 Desplegar en Netlify

1. Sube este repo a GitHub (o GitLab/Bitbucket).
2. En [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
3. Conecta el repo.
4. **Build command**: (déjalo vacío)
   **Publish directory**: `.` (la raíz del repo)
5. Deploy — listo, no hay nada más que configurar.

Cualquier `git push` a la rama principal vuelve a desplegar automáticamente.

## ✏️ Editar el contenido

Todo el contenido (horarios, alojamientos, comida, avisos, "más cosas para ver") vive en el array `const days = [...]` de `days.js`. Cada día es un objeto con:

- `date` — fecha de desbloqueo (`YYYY-MM-DD`)
- `title`, `drive`, `coords` — cabecera del día y coordenadas para el mapa
- `alerts` — avisos generales del día (🔴 urgente / 🟡 consejo)
- `timeline` — lista de horarios con su nota y, opcionalmente, un aviso propio
- `sleep`, `eat` — alojamiento y comida
- `highlights` — lista opcional de cosas extra que ver cerca (se muestra como desplegable)

La tabla de presupuesto y los datos fijos de "Lo práctico" están directamente en `index.html`, dentro de `<div class="budget-box">` y `<div class="fact-grid">`.
