# Luijait

Portfolio de Luis Javier Navarrete Lozano. La entrada prioriza su trabajo actual en TryHackMe / NoScope; las rutas de historia, investigación y archivo conservan el contexto del recorrido.

## Desarrollo

Instalar con `npm ci` y ejecutar `npm run dev`. Compilar con `npm run build`; comprobar tipos con `npx tsc --noEmit`. La aplicación usa React, Vinext y los componentes Base UI de la instalación de shadcn del proyecto.

## Contenido y diseño

- `app/content.ts`: cuatro casos, siete capítulos de biografía, siete papers, diez conversaciones, formación y experimentos. Las fuentes están enlazadas en las páginas.
- `app/page.tsx`: portada, trabajo seleccionado y demostración conceptual de Blurtain.
- `app/historia`, `app/investigacion`, `app/archivo`: lecturas completas, publicaciones y medios.
- `components/portfolio.tsx`: navegación, contacto, movimiento y lector de proyectos.
- `app/globals.css`: composición, tipografía, interacciones y adaptación a móvil, teclado y movimiento reducido.

El cartucho es una pieza conceptual generada para este portfolio; no representa hardware fabricado por Luis. El retrato procede de su perfil público de GitHub. La demostración de privacidad usa texto ficticio y no reproduce una captura de Blurtain.

## Publicación

El proyecto mantiene su identificador de Sites en `.openai/hosting.json`. La versión desplegada se publica desde una revisión de Git, con el resultado de la compilación empaquetado mediante el helper de Sites. Las credenciales nunca forman parte del repositorio.

## Límites editoriales

Los papers son trabajos en coautoría de la etapa de Alias Robotics. Las fechas de los proyectos no pretenden fijar fechas contractuales. La formación distingue cursos y credenciales de estudiante de certificaciones profesionales. El contacto utiliza los perfiles públicos actuales de LinkedIn y X.
