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
- `components/experience.tsx`: pausa global persistente y preferencia de movimiento reducido. La escena se detiene al salir de pantalla o al ocultar la pestaña; hay una alternativa tipográfica cuando WebGL no está disponible.
- `components/work-index.tsx`, `components/journey-dock.tsx`: índices de proyectos y secciones, con seguimiento de la posición de lectura.
- `app/globals.css`: composición, tipografía, interacciones y adaptación a móvil, teclado y movimiento reducido.

Las fotografías se conservan intactas y se encuadran mediante CSS. Sus fuentes y fechas están en `PHOTO-CREDITS.md`. El avatar de X fue consultado el 6 de septiembre de 2026; ese año indica el perfil actual, no una fecha de captura conocida. La demostración de privacidad usa texto ficticio y no reproduce una captura de Blurtain.

## Publicación

El proyecto mantiene su identificador de Sites en `.openai/hosting.json`. La versión desplegada se publica desde una revisión de Git, con el resultado de la compilación empaquetado mediante el helper de Sites. Las credenciales nunca forman parte del repositorio. El flujo de publicación activo descrito a continuación utiliza GitHub Pages.

Para GitHub Pages, ejecutar `DEPLOY_TARGET=github npm run build` y después `node scripts/prepare-github-pages.mjs`. El segundo paso verifica las ocho páginas y los archivos referenciados, e incorpora índices de directorio para sus URLs. El artefacto incluye `CNAME` para el dominio actual, `luijait.es`. El flujo `.github/workflows/pages.yml` realiza ambos pasos y publica en `luijait/luijait.github.io` desde `main`, con GitHub Actions seleccionado como origen de Pages. Solo se publica `dist/client`; los archivos del servidor, la investigación de trabajo y las credenciales quedan fuera del artefacto. La portada española está en `/` y la inglesa en `/en/`.

## Límites editoriales

Los papers son trabajos en coautoría de la etapa de Alias Robotics. Las fechas de los proyectos no pretenden fijar fechas contractuales. La formación distingue cursos y credenciales de estudiante de certificaciones profesionales. El contacto utiliza los perfiles públicos actuales de LinkedIn y X.

Los recuerdos de 2012–2020, la libreta de C, las distribuciones de Linux y las cientos de máquinas resueltas proceden del relato personal de Luis. El portfolio utiliza el nombre Omega para ese colaborador, por indicación de Luis. Los experimentos de LunarLander y Space Invaders enlazan a las fichas publicadas de los modelos; el de Atari se identifica como trabajo del curso Deep RL de Hugging Face.
