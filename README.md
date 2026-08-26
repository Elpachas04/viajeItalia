# Nuestra ruta por Italia 🇮🇹

Web de un solo archivo con el itinerario del viaje (28 ago – 4 sep 2026): mapa interactivo, horario día a día, alojamientos y presupuesto.

## 🔒 Sistema de sorpresa

La web está bloqueada por fechas, sin backend — todo se calcula con la fecha del dispositivo que la abre:

- **Antes del 28 de agosto de 2026**: solo se ve una pantalla con candado y cuenta atrás. Nada del contenido es visible.
- **A partir del 28 de agosto**: la web se abre, pero cada día del itinerario que todavía no ha llegado aparece borroso y bloqueado, con un aviso de "se desbloquea el [fecha]". Cada día se destapa solo, en su fecha.

Para cambiar las fechas de desbloqueo, edita el campo `date: "2026-08-28"` (formato `YYYY-MM-DD`) de cada día dentro del array `days` en `index.html`.

## 📁 Estructura

```
.
├── index.html   ← toda la web (HTML + CSS + JS en un solo archivo)
└── README.md    ← este archivo
```

No hay build ni dependencias que instalar — es HTML estático puro. Las únicas librerías externas (Leaflet para el mapa, Google Fonts) se cargan desde CDN dentro del propio `index.html`.

## 🚀 Desplegar en Netlify

1. Sube este repo a GitHub (o GitLab/Bitbucket).
2. En [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
3. Conecta el repo.
4. **Build command**: (déjalo vacío)
   **Publish directory**: `.` (la raíz del repo)
5. Deploy — listo, no hay nada más que configurar.

Cualquier `git push` a la rama principal vuelve a desplegar automáticamente.

## ✏️ Editar el contenido

Todo el contenido (horarios, alojamientos, comida, avisos, "más cosas para ver") vive en el array `const days = [...]` dentro de la etiqueta `<script>` al final de `index.html`. Cada día es un objeto con:

- `date` — fecha de desbloqueo (`YYYY-MM-DD`)
- `title`, `drive`, `coords` — cabecera del día y coordenadas para el mapa
- `alerts` — avisos generales del día (🔴 urgente / 🟡 consejo)
- `timeline` — lista de horarios con su nota y, opcionalmente, un aviso propio
- `sleep`, `eat` — alojamiento y comida
- `highlights` — lista opcional de cosas extra que ver cerca

La tabla de presupuesto está más abajo en el HTML, dentro de `<div class="budget-box">`.
