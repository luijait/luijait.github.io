# Luijait

Portfolio bilingüe de Luis Javier Navarrete Lozano. Una portada editorial con una escultura 3D interactiva da paso a fotografías reales de 2023 a 2026. La ubicación actual indicada en la cabecera es Granada, España. El trabajo en TryHackMe / NoScope conecta con la etapa de resolver máquinas en esa misma plataforma.

## Desarrollo

Instalar con `npm ci` y ejecutar `npm run dev`. Compilar con `npm run build`; comprobar tipos con `npx tsc --noEmit`. La aplicación usa React, Vinext y los componentes Base UI de la instalación de shadcn del proyecto.

## Contenido y diseño

- `app/content.ts`: cuatro casos, siete capítulos de biografía, siete papers, diez conversaciones, formación y experimentos. Las fuentes están enlazadas en las páginas.
- `app/(es)`: portada, historia, investigación y archivo en español.
- `app/(en)/en`: las mismas páginas en inglés, con rutas propias.
- `app/content.en.ts`, `app/ui.en.json`, `components/locale.tsx`: traducción del contenido, interfaz y navegación entre idiomas.
- `app/portraits.ts`: años, contexto y fuentes de las fotografías.
- `components/portfolio.tsx`: navegación, contacto, movimiento y lector de proyectos con índice interno.
- `components/portfolio-hero.tsx`: portada y galería con fuentes.
- `components/sculpture.tsx`, `lib/sculpture.ts`: tres formas 3D (explorar, construir, comprender), creadas con Three.js y cargadas cuando se aproxima la escena. Los controles de giro funcionan con teclado y pantalla táctil.
- `components/project-object.tsx`, `lib/project-object.ts`: escenas propias de NoScope y 0dAI. Anillos que se separan y módulos que se despliegan; combinan selección, giro, puntero y posición de lectura. Cada escena carga cerca del viewport, se suspende fuera de él y reconstruye sus reflejos tras recuperar el contexto gráfico.
- `lib/scene-runtime.ts`: reloj compartido para las escenas visibles, con límite de 60 Hz en escritorio y 30 Hz con puntero táctil. Reduce la resolución ante presión sostenida; mide posiciones en eventos de desplazamiento y tamaño, sin lecturas de layout en cada fotograma. Las piezas repetidas usan instancias y geometrías compartidas.
- `components/noscope-feature.tsx`: proyecto principal, con el mensaje de pentesting totalmente autónomo, tres perspectivas sincronizadas con su escultura y la aportación de Luis como AI Engineer.
- `components/open-models.tsx`, `app/open-models.ts`: cinco repositorios públicos de 0dAI, incluidos modelos y variantes cuantizadas. El selector enlaza cada ficha y su historial de publicación; la figura CSS 3D es una interpretación visual de las familias y formatos.
- `components/card-choreography.tsx`, `app/work.css`: entradas escalonadas de las tarjetas y movimiento de las figuras, sujeto a visibilidad, pausa global y preferencia de movimiento reducido.
- `components/research-atlas.tsx`: siete preguntas seleccionables, conectadas con sus papers. Es una lectura temática del contenido existente, no una red de citas ni una clasificación de resultados.
- `components/story-prelude.tsx`: recorrido fotográfico con fuentes originales y accesos a los siete capítulos de la biografía.
- `components/archive-feature.tsx`: tres conversaciones para entrar por comienzos, producto o etapa actual. El reproductor de YouTube se carga solo al pulsar reproducir; conserva el enlace externo y restaura el foco al cerrarse.
- `components/lab-notebook.tsx`: cinco proyectos con apuntes visuales del concepto y enlaces a las fuentes originales. Las ilustraciones no representan capturas del producto ni ejecuciones de modelos.
- `components/experience.tsx`: pausa global persistente y preferencia de movimiento reducido. La escena se detiene al salir de pantalla o al ocultar la pestaña; hay una alternativa tipográfica cuando WebGL no está disponible.
- `components/work-index.tsx`, `components/journey-dock.tsx`: índices de proyectos y secciones, con seguimiento de la posición de lectura.
- `app/globals.css`: composición, tipografía, interacciones y adaptación a móvil, teclado y movimiento reducido.
- `app/editorial.css`: escenas de proyectos, mapa de investigación, recorrido fotográfico, reproductor y cuaderno del laboratorio.

Las fotografías se conservan intactas y se encuadran mediante CSS. Sus fuentes y fechas están en `PHOTO-CREDITS.md`. El avatar de X fue consultado el 6 de septiembre de 2026; ese año indica el perfil actual, no una fecha de captura conocida. La demostración de privacidad usa texto ficticio y no reproduce una captura de Blurtain.

## Publicación

El proyecto conserva su identificador de Sites en `.openai/hosting.json`. El flujo de publicación activo utiliza GitHub Pages y no requiere modificar la configuración de dominios. Las credenciales nunca forman parte del repositorio.

Para GitHub Pages, ejecutar `DEPLOY_TARGET=github npm run build` y después `node scripts/prepare-github-pages.mjs`. El segundo paso verifica las ocho páginas y los archivos referenciados, e incorpora índices de directorio para sus URLs. El artefacto incluye `CNAME` para el dominio actual, `luijait.es`. El flujo `.github/workflows/pages.yml` realiza ambos pasos y publica en `luijait/luijait.github.io` desde `main`, con GitHub Actions seleccionado como origen de Pages. Solo se publica `dist/client`; los archivos del servidor, la investigación de trabajo y las credenciales quedan fuera del artefacto. La portada española está en `/` y la inglesa en `/en/`.

## Límites editoriales

Los papers son trabajos en coautoría de la etapa de Alias Robotics. Las fechas de los proyectos no pretenden fijar fechas contractuales. La formación distingue cursos y credenciales de estudiante de certificaciones profesionales. El contacto utiliza los perfiles públicos actuales de LinkedIn y X.

La autoría de los modelos de 0dAI procede del relato de Luis y de los historiales públicos de los cinco repositorios, consultados el 6 de septiembre de 2026: sus commits identifican a `luijait`. Las fichas documentan las bases Mistral/Mixtral y la infraestructura de Omega AI. Se presentan como pesos abiertos, sin atribuir a Luis el entrenamiento original de las arquitecturas base. Las fuentes de NoScope son su [producto](https://www.noscope.com/) y su [equipo](https://www.noscope.com/company); la autonomía completa también fue confirmada por Luis. No se incluyen métricas comerciales ni resultados de evaluaciones no comprobados.

Los recuerdos de 2012–2020, la libreta de C, las distribuciones de Linux y las cientos de máquinas resueltas proceden del relato personal de Luis. El portfolio utiliza el nombre Omega para ese colaborador, por indicación de Luis. Los experimentos de LunarLander y Space Invaders enlazan a las fichas publicadas de los modelos; el de Atari se identifica como trabajo del curso Deep RL de Hugging Face.
