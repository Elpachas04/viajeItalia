// Contenido del itinerario, día a día. Edita aquí fechas, horarios,
// alojamiento, comida y "más cosas para ver" — sin tocar CSS ni la lógica
// de la web (esa vive en app.js).
const days = [
  {
    id:"d1", tab:"28 ago", waypoint:"Parada 1", date:"2026-08-28",
    title:"Aterrizamos, y esa misma noche ya estamos junto al <em>lago</em>",
    drive:"15 min al centro + 1h15 Bérgamo–Perledo por la tarde",
    coords:[45.7048,9.6629],
    timeline:[
      {t:"07:55",w:"Aterrizaje en Bérgamo (BGY)",n:"Vuelo Ryanair FR846, salida de Barcelona-El Prat a las 06:10, 1h45 de vuelo."},
      {t:"08:40",w:"Recogida del coche en Centauro",n:"Via Cremasca 96, Azzano San Paolo — reserva one-way ya confirmada."},
      {t:"09:15",w:"Subida a Bérgamo Alta",n:"Deja el coche en un parking del borde (Fara o Colle Aperto) y entra andando o en funicular."},
      {t:"09:45",w:"Paseo por el casco histórico",n:"Piazza Vecchia, Basílica de Santa Maria Maggiore y Capilla Colleoni — con todo el día por delante, sin ninguna prisa."},
      {t:"13:00",w:"Comida en Bérgamo Alta",n:"Prueba los casoncelli bergamaschi en cualquier trattoria de Via Colleoni."},
      {t:"16:00",w:"Salida hacia el Lago de Como",n:"~1h15 de carretera hasta Perledo/Varenna."},
      {t:"17:15",w:"Llegada, check-in y tarde libre",n:"Con luz de sobra para instalarse, pasear por el lago y cenar con calma.",
        alert:{type:"yellow", text:"El apartamento está en Perledo (pegado a Varenna), a 5-6 min en coche del pueblo — nada andable, pero con coche no es problema."}}
    ],
    sleep:{name:"Casa Sofie e Charlotte (Perledo/Como) — reservado",note:"Vistas al lago confirmadas, parking privado gratis en el propio alojamiento. 8.7 de valoración, 107 opiniones.",url:"https://www.booking.com/hotel/it/casa-sofie.es.html"},
    eat:{name:"Cena en el paseo del lago en Varenna",note:"Algo ligero a la llegada — el protagonismo gastronómico se deja para el día 2."},
    highlights:[
      {name:"San Vigilio", desc:"segundo funicular desde Colle Aperto (5 min), sube a 496m con vistas de 360° — muchos recomiendan bajar andando para ver otras perspectivas."},
      {name:"La Rocca", desc:"antigua fortaleza con parque gratuito (Parco delle Rimembranze); el mirador de detrás del museo es gratis aunque no se entre."},
      {name:"Via Colleoni y Via Gombito", desc:"las calles principales de Città Alta, llenas de tiendas y sitios para probar la stracciatella (el helado, no el queso) en Colle Aperto."},
      {name:"Cittadella", desc:"parada de camino entre Piazza Vecchia y San Vigilio, con el Museo Arqueológico — buena opción si llueve."}
    ]
  },
  {
    id:"d2", tab:"29 ago", waypoint:"Parada 2", date:"2026-08-29",
    title:"Un día entero para <em>Como</em>, sin prisa",
    drive:"Sin trayecto — ya en el lago",
    coords:[46.0117,9.2822],
    timeline:[
      {t:"09:30",w:"Varenna con calma",n:"Villa Monastero y sus jardines, paseo por Contrada Scoscesa — sin prisa por moverse, ya alojados aquí."},
      {t:"13:00",w:"Barco a Bellagio",n:"Ferry regular Varenna–Bellagio, ~15–20 min."},
      {t:"14:30",w:"Bellagio",n:"Comida con vistas y paseo por las callecitas escalonadas."},
      {t:"18:30",w:"Vuelta a Varenna en barco",n:"Atardecer en el paseo del lago."}
    ],
    sleep:{name:"Segunda noche en Casa Sofie e Charlotte",note:"No hace falta mover maleta — mañana toca ya Garda."},
    eat:{name:"Restaurantes junto al embarcadero de Varenna",note:"Pescado de lago (missoltino, lavarello) con vistas al agua."},
    highlights:[
      {name:"Castello di Vezio", desc:"encima de Varenna, subida corta a pie o en golf-cart — vistas espectaculares del lago y a veces exhibición de cetrería (halcones)."},
      {name:"Villa Melzi (Bellagio)", desc:"jardines históricos junto al lago, alternativa/complemento a Villa Monastero."},
      {name:"Punta Spartivento", desc:"la punta de Bellagio donde se juntan los tres brazos del lago — mirador gratuito, muy fotogénico."},
      {name:"Villa del Balbianello", desc:"con coche, a ~35-40 min (cerca de Lenno) — la villa de Star Wars y Casino Royale, jardines sobre el agua; necesita reserva para el interior."}
    ]
  },
  {
    id:"d3", tab:"30 ago", waypoint:"Parada 3", date:"2026-08-30",
    title:"Aguas <em>turquesas</em> y el castillo de Malcesine",
    drive:"≈ 1h45 Perledo–Lago di Tenno · 35-40 min Tenno–Malcesine",
    coords:[45.8583,10.8244],
    alerts:[
      {type:"yellow", text:"Lago di Tenno SÍ es apto para baño — Bandera Azul 2026, agua limpia y clara, sin lanchas a motor. Llevar bañador y toalla."},
      {type:"red", text:"Llegar pronto: el parking (P1/P2, ~5€/2-3h o 15€/día) se llena rápido en verano, y desde ahí es un tramo a pie por escalinata/camino empedrado — nada de chanclas."}
    ],
    timeline:[
      {t:"09:00",w:"Salida hacia el Lago di Tenno",n:"Cerca de Riva del Garda — agua de color turquesa, mucho más tranquilo que el Garda mismo."},
      {t:"10:30",w:"Lago di Tenno",n:"Baño en el agua turquesa (Bandera Azul, temperatura agradable en verano) y paseo por Canale di Tenno, pueblo medieval al lado."},
      {t:"13:30",w:"Comida en Canale di Tenno o de camino"},
      {t:"15:00",w:"Ruta a Malcesine"},
      {t:"15:45",w:"Malcesine",n:"Castello Scaligero y teleférico al Monte Baldo, con la tarde ya más relajada."},
      {t:"16:00",w:"Check-in en el hotel",n:"Descarga de maletas en Piazza Statuto 1 (zona ZTL, solo un momento).",
        alert:{type:"red", text:"El parking privado gratuito del hotel está a 1.400 m (15-20 min andando por el paseo del lago). Con maletas grandes, valorar el parking público de pago, más cerca, solo por esa noche."}}
    ],
    sleep:{name:"Hotel Lago Di Garda (Malcesine) — reservado",note:"8.9-9.0 de valoración, +1.600 opiniones. En la plaza principal, terraza con vistas al lago. Check-in 14:00-20:00, check-out 8:00-11:00.",url:"https://www.booking.com/hotel/it/lago-di-garda-malcesine.html"},
    eat:{name:"Ristorante Vecchia Malcesine · 10% dto. en el restaurante del hotel",note:"Cocina véneta clásica. También Grancaffè al Porto (10% dto. con la tarjeta de habitación), junto al embarcadero."},
    highlights:[
      {name:"Cascata del Varone", desc:"cascada dentro de un cañón estrecho, cerca de Riva del Garda (junto a Tenno) — visita corta de ~1h, muy espectacular."},
      {name:"Castello Scaligero de Malcesine", desc:"castillo medieval junto al lago, entrada de pago, torre con vistas."},
      {name:"Teleférico rotatorio a Monte Baldo", desc:"la cabina gira sobre sí misma durante la subida — arriba hay senderos cortos y largos, y parapente por si apetece el reto."},
      {name:"Canale di Tenno", desc:"uno de los 'pueblos más bonitos de Italia', junto al lago di Tenno — callejuelas de piedra suspendidas en el tiempo."}
    ]
  },
  {
    id:"d4", tab:"31 ago", waypoint:"Parada 4", date:"2026-08-31",
    title:"Verona de paso, y una tarde <em>tranquila</em> en el Véneto",
    drive:"≈ 1h Malcesine–Verona + 1h30 Verona–Treviso",
    coords:[45.4384,10.9916],
    timeline:[
      {t:"09:00",w:"Salida hacia Verona",n:"Check-out del hotel de Malcesine antes de las 11:00."},
      {t:"10:30",w:"Verona — parada corta",n:"Arena, Piazza delle Erbe y la Casa di Giulietta. No se duerme aquí, así que centrarse en lo esencial."},
      {t:"13:30",w:"Comida en Verona"},
      {t:"14:30",w:"Ruta hacia Treviso",n:"~1h30 de carretera."},
      {t:"17:30",w:"Llegada al B&B",n:"Tiempo para relajarse antes del día completo en Venecia."}
    ],
    sleep:{name:"Bed & Breakfast Canova (Treviso) — reservado",note:"9.3 de valoración (786 opiniones). Parking privado gratis cerca, 2 km del centro y del aeropuerto. Desayuno italiano casero.",url:"https://www.booking.com/hotel/it/bed-amp-breakfast-canova.es.html"},
    eat:{name:"Cena en el centro de Treviso",note:"Prueba el radicchio trevigiano, típico de la zona."},
    highlights:[
      {name:"Ponte Pietra + Castel San Pietro", desc:"cruzar el puente romano y subir al mirador (funicular 3€ o 10 min a pie) — la mejor vista de Verona, sobre todo al atardecer, y es gratis."},
      {name:"Castelvecchio", desc:"fortaleza medieval convertida en museo de arte, con el Ponte Scaligero (puente fortificado) al lado."},
      {name:"Giardino Giusti", desc:"jardín renacentista con un laberinto — la leyenda dice que las parejas que se encuentran dentro estarán juntas para siempre."},
      {name:"Piazza delle Erbe y Piazza dei Signori", desc:"las dos plazas centrales, ya de camino entre la Arena y Casa di Giulietta — gratis y con mucho ambiente."},
      {name:"Treviso centro histórico", desc:"si hay margen de tiempo, Treviso tiene sus propios canales y calles porticadas — 'la pequeña Venecia' sin el gentío."}
    ]
  },
  {
    id:"d5", tab:"1 sep", waypoint:"Parada 5", date:"2026-09-01",
    title:"<em>Venecia</em>, sin correr",
    drive:"Tren Treviso–Venecia S. Lucia, ~30-40 min",
    coords:[45.4342,12.3388],
    alerts:[
      {type:"yellow", text:"El coche se queda aparcado en el B&B — no hace falta buscar dónde dejar las maletas, el alojamiento sigue siendo el mismo esa noche también."}
    ],
    timeline:[
      {t:"08:30",w:"Tren a Venecia Santa Lucia",n:"Deja el coche en el B&B — dentro de Venecia no se conduce."},
      {t:"09:15",w:"Llegada y paseo sin rumbo",n:"Aléjate de las rutas principales: Cannaregio y Dorsoduro son mucho más tranquilos que San Marco."},
      {t:"11:30",w:"Piazza San Marco y Basílica",n:"Mejor antes del mediodía, cuando hay menos gente."},
      {t:"13:30",w:"Comida en un bacaro",n:"Cicchetti (tapas venecianas) en algún bacaro de Cannaregio."},
      {t:"15:30",w:"Vaporetto tranquilo por el Gran Canal",n:"Línea 1, la más lenta — sirve como paseo en barco sin prisa."},
      {t:"18:00",w:"Atardecer en Zattere",n:"Paseo junto al canal della Giudecca, mucho más relajado que San Marco."},
      {t:"20:00",w:"Tren de vuelta al B&B"}
    ],
    sleep:{name:"Segunda noche en B&B Canova",note:"No hace falta mover el equipaje ni buscar dónde dejarlo."},
    eat:{name:"Bacari de Cannaregio",note:"All'Arco o cualquier bacaro pequeño para cicchetti y un ombra (vino) de pie, al estilo veneciano."},
    highlights:[
      {name:"Puente de Rialto", desc:"el más famoso de los puentes del Gran Canal, con mercado de frutas/pescado por las mañanas."},
      {name:"Peggy Guggenheim Collection", desc:"museo de arte moderno en un palazzo sobre el Gran Canal, en Dorsoduro — de pago pero muy recomendado si gusta el arte."},
      {name:"Isla de Murano/Burano", desc:"si sobra tiempo o apetece volver otro día — vaporetto desde Fondamente Nove, vidrio soplado en Murano y casas de colores en Burano (medio día extra, no entra en un solo día de Venecia)."},
      {name:"Campo Santa Margherita", desc:"plaza de ambiente local en Dorsoduro, lejos de las rutas turísticas, buena para tomar algo con estudiantes venecianos."}
    ]
  },
  {
    id:"d6", tab:"2 sep", waypoint:"Parada 6", date:"2026-09-02",
    title:"Rumbo al <em>Val d'Orcia</em>",
    drive:"≈ 4h30 · 400 km — el trayecto más largo del viaje, sin paradas intermedias",
    coords:[43.0716,11.6001],
    timeline:[
      {t:"08:00",w:"Salida temprano hacia el Val d'Orcia",n:"Trayecto largo, pero directo — mejor un solo tramo grande que trocearlo con paradas que no aportan."},
      {t:"12:30",w:"Parada de comida en ruta",n:"Zona de Bolonia o Florencia, según el avance."},
      {t:"16:30",w:"Llegada al agriturismo entre Pienza y San Quirico d'Orcia"},
      {t:"17:30",w:"Paseo tranquilo por San Quirico d'Orcia",n:"Jardines Horti Leonini (gratis), a 5 min en coche del alojamiento — pueblo pequeño y sin agobios para estirar las piernas tras la carretera."},
      {t:"20:30",w:"Cena en el agriturismo"}
    ],
    sleep:{name:"L'Orto delle Terme (Bagno Vignoni) — reservado",note:"8.9-9.5 de valoración según fuente (863+ opiniones), a 50m de la plaza central. Desayuno muy bien valorado. Spa de pago opcional (sauna + baño termal).",url:"https://www.booking.com/hotel/it/b-amp-b-l-orto-delle-terme.es.html"},
    eat:{name:"Cena de km 0 en el propio agriturismo",note:"Aceite, vino y productos de la finca — la mayoría de agriturismos del Val d'Orcia ofrecen cena casera."}
  },
  {
    id:"d7", tab:"3 sep", waypoint:"Parada 7", date:"2026-09-03",
    title:"Perdernos por la <em>Toscana</em>, sin agenda",
    drive:"Todo a 15-30 min entre sí — a decidir sobre la marcha",
    coords:[43.0781,11.6792],
    alerts:[
      {type:"yellow", text:"No hay orden obligatorio: esto es un menú de sitios cercanos, no una ruta cerrada. Elegir cuántos y en qué orden según lo que el cuerpo pida ese día."}
    ],
    timeline:[
      {t:"Opción",w:"Mañana libre en el agriturismo",n:"Sin despertador — piscina/spa por si apetece el capricho, o directos a la primera parada."},
      {t:"Opción",w:"Pienza",n:"Pueblo renacentista a escala humana — Piazza Pio II, mirador sobre el valle, tiendas de pecorino."},
      {t:"Opción",w:"Capilla de Vitaleta",n:"La capilla solitaria entre cipreses de las postales de la Toscana — parada de ~10 min por camino de tierra, cerca de Pienza."},
      {t:"Opción",w:"Montalcino",n:"Vino Brunello, fortaleza medieval, atardecer con vistas — el más lejano de los tres (~30 min)."},
      {t:"Opción",w:"San Quirico d'Orcia",n:"Si no se hizo la tarde del 2, jardines Horti Leonini, muy cerca del alojamiento."},
      {t:"Opción",w:"Tramo de senderismo Bagno Vignoni–San Quirico",n:"Ruta de 10,6 km ida y vuelta por campiña y viñedos por si apetece caminar en vez de solo conducir — se puede hacer solo un tramo, no hace falta completarla."},
      {t:"Opción",w:"Termas de pago (Val di Sole, ~15€/persona)",n:"Para el baño termal garantizado — la piscina de la plaza está prohibida y el parque de abajo tiene restricciones."}
    ],
    sleep:{name:"Misma noche en L'Orto delle Terme",note:"Segunda noche aquí — mañana es el traslado final a Signa."},
    eat:{name:"Donde pille mejor según el plan del día",note:"Pienza para pici, Montalcino si apetece maridaje con Brunello."}
  },
  {
    id:"d8", tab:"4 sep", waypoint:"Parada 8", date:"2026-09-04",
    title:"Signa — el día de la <em>boda</em>",
    drive:"≈ 1h30 Val d'Orcia–Signa",
    coords:[43.7847,11.0967],
    alerts:[
      {type:"red", text:"Es el día de la boda — sin margen de turismo. La devolución del coche y el tren de vuelta van justos de tiempo, confirmar horarios con antelación."}
    ],
    timeline:[
      {t:"09:00",w:"Salida hacia Signa"},
      {t:"10:15",w:"Check-in en el venue",n:"Via Castelletti 5, Signa (FI)."},
      {t:"11:30",w:"Ir a Florencia a devolver el coche",n:"Oficina cerca del aeropuerto de Peretola."},
      {t:"13:00",w:"Tren de vuelta a Signa"},
      {t:"13:45",w:"Taxi hasta el venue"},
      {t:"Tarde/noche",w:"Boda"}
    ],
    sleep:{name:"Según lo organizado para la boda",note:"Sin alojamiento propio que reservar este día — depende del venue o de dónde se aloje cada uno para el evento."},
    eat:{name:"—",note:"El banquete corre de cuenta de la boda."},
    highlights:[
      {name:"Villa medicea de Poggio a Caiano", desc:"a 10 min de Signa, por si queda algún hueco antes del banquete — villa renacentista de los Médici."}
    ]
  }
];
