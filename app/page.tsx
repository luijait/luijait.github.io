'use client';
import { useState, type PointerEvent, type CSSProperties } from 'react';
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Plus,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  Header,
  Footer,
  Motion,
  CaseReader,
  OutLink,
} from '@/components/portfolio';
import { papers, experiments } from './content';

function tilt(event: PointerEvent<HTMLElement>) {
  if (
    event.pointerType !== 'mouse' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
    return;
  const box = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    '--px',
    String(((event.clientX - box.left) / box.width) * 2 - 1),
  );
  event.currentTarget.style.setProperty(
    '--py',
    String(((event.clientY - box.top) / box.height) * 2 - 1),
  );
}
function resetTilt(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty('--px', '0');
  event.currentTarget.style.setProperty('--py', '0');
}

export default function Home() {
  const [protectedView, setProtectedView] = useState(true);
  return (
    <>
      <Motion />
      <Header />
      <main id="contenido">
        <section className="hero-poster shell">
          <div className="hero-topline">
            <span className="kicker">Luis Javier Navarrete Lozano</span>
            <a className="current-badge" href="#tryhackme">
              <i /> Ahora en <strong>TryHackMe</strong>
              <ArrowUpRight size={16} />
            </a>
          </div>
          <h1 className="hero-name" aria-label="Luijait">
            {'luijait.'.split('').map((letter, index) => (
              <span key={index} style={{ '--index': index } as CSSProperties}>
                {letter}
              </span>
            ))}
          </h1>
          <div
            className="hero-object-wrap"
            onPointerMove={tilt}
            onPointerLeave={resetTilt}
          >
            <div className="hero-object">
              <img
                src="/hero-cartridge.png"
                alt="Render conceptual de un cartucho de videojuegos abierto en cuatro capas: una metáfora de la curiosidad por entender qué hay dentro."
                width={1254}
                height={1254}
                fetchPriority="high"
              />
            </div>
            <a
              className="object-point point-origin"
              href="/historia"
              aria-label="Mi historia: la curiosidad"
            >
              <span>01</span>
              <span>La curiosidad</span>
            </a>
            <a
              className="object-point point-research"
              href="/investigacion"
              aria-label="Explorar mi investigación"
            >
              <span>02</span>
              <span>La investigación</span>
            </a>
            <a
              className="object-point point-work"
              href="#trabajo"
              aria-label="Explorar lo que construyo"
            >
              <span>03</span>
              <span>Lo que construyo</span>
            </a>
          </div>
          <div className="hero-copy">
            <p>
              Investigo IA.
              <br />
              Construyo herramientas.
              <br />
              <span>Me gusta mirar dentro.</span>
            </p>
            <div className="hero-current">
              <span className="kicker">AI engineer</span>
              <strong>
                TryHackMe <span>/ NoScope</span>
              </strong>
            </div>
            <a className="round-link" href="#trabajo">
              <span className="round-arrow">
                <ArrowDown size={22} />
              </span>
              <span>Explorar el trabajo</span>
            </a>
          </div>
          <div className="hero-caption">
            <span className="kicker">
              Todo empezó con una pequeña pantalla.
            </span>
            <a href="/historia">
              Esta es mi historia <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <section
          className="work-section shell"
          id="trabajo"
          aria-labelledby="work-title"
        >
          <div className="section-heading" data-enter>
            <div>
              <span className="kicker">01 / Trabajo seleccionado</span>
              <h2 id="work-title">
                De 0dAI
                <br />
                <em>a TryHackMe.</em>
              </h2>
            </div>
            <p>
              Investigación, producto
              <br />
              y proyectos por mi cuenta.
            </p>
          </div>
          <div className="project-stack">
            <article
              className="stack-card thm-card"
              id="tryhackme"
              style={{ '--stack': 0 } as CSSProperties}
            >
              <div className="card-top">
                <span className="card-status">
                  <i /> Mi trabajo actual
                </span>
                <span className="kicker">La etapa actual</span>
              </div>
              <div className="thm-layout">
                <div>
                  <h3 className="thm-title">
                    TRY
                    <br />
                    HACK
                    <br />
                    <span>ME.</span>
                  </h3>
                </div>
                <div className="thm-description">
                  <div className="role-label">
                    <span>AI</span>
                    <span>ENGINEER</span>
                  </div>
                  <p>
                    Investigo y desarrollo IA aplicada a ciberseguridad con el
                    equipo de NoScope, en TryHackMe.
                  </p>
                  <CaseReader caseId="noscope">
                    Mi etapa actual <ArrowUpRight size={20} />
                  </CaseReader>
                  <OutLink
                    href="https://www.noscope.com/company"
                    className="card-source"
                  >
                    Conocer al equipo
                  </OutLink>
                </div>
              </div>
              <div className="card-bottom">
                <span>TryHackMe / NoScope</span>
                <span>Investigación · Producto · Ciberseguridad</span>
                <span>01 / 04</span>
              </div>
            </article>
            <article
              className="stack-card cai-card"
              style={{ '--stack': 1 } as CSSProperties}
              onPointerMove={tilt}
              onPointerLeave={resetTilt}
            >
              <div className="card-top">
                <span className="kicker">Investigación en Alias Robotics</span>
                <span className="kicker">2025—2026</span>
              </div>
              <div className="cai-layout">
                <div className="project-copy">
                  <span className="project-overline">CAI / CAIBench</span>
                  <h3>
                    Construir.
                    <br />Y aprender
                    <br />
                    <em>a medir.</em>
                  </h3>
                  <p>
                    Una infraestructura abierta y siete trabajos en coautoría
                    para investigar IA aplicada a ciberseguridad.
                  </p>
                  <CaseReader caseId="cai">
                    Abrir el caso <Plus size={20} />
                  </CaseReader>
                </div>
                <div
                  className="paper-display"
                  aria-label="Una selección de los papers publicados"
                >
                  {[papers[0], papers[2], papers[1]].map((paper, index) => (
                    <a
                      className={`paper-tile paper-tile-${index}`}
                      href={`/investigacion#paper-${paper.id}`}
                      key={paper.id}
                    >
                      <div className="paper-tile-meta">
                        <span>RESEARCH PAPER</span>
                        <span>0{index + 1}</span>
                      </div>
                      <span className="paper-tile-title">{paper.short}</span>
                      <p>{paper.question}</p>
                      <div className="paper-tile-bottom">
                        <span>Coautor · arXiv</span>
                        <ArrowUpRight size={20} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="card-bottom">
                <span>CAI · CAIBench · Fluency</span>
                <a href="/investigacion">Explorar las 7 publicaciones ↗</a>
                <span>02 / 04</span>
              </div>
            </article>
            <article
              className="stack-card odai-card"
              style={{ '--stack': 2 } as CSSProperties}
            >
              <div className="card-top">
                <span className="kicker">Cofundador y CTO · 0dAI</span>
                <span className="kicker">2023—2024</span>
              </div>
              <div className="odai-layout">
                <div className="project-copy">
                  <span className="project-overline">El primer producto</span>
                  <h3>
                    Una idea.
                    <br />
                    <em>Luego, usuarios.</em>
                  </h3>
                  <p>
                    Una necesidad en Omega se convirtió, con Jon y el equipo, en
                    un prototipo y un servicio.
                  </p>
                  <CaseReader caseId="0dai">
                    Mirar dentro <Plus size={20} />
                  </CaseReader>
                </div>
                <div className="odai-process">
                  <span className="odai-mark">
                    0d<span>AI</span>
                  </span>
                  <ol aria-label="El recorrido de 0dAI">
                    <li>
                      <span>01</span>
                      <strong>Una necesidad</strong>
                      <ArrowDown size={16} />
                    </li>
                    <li>
                      <span>02</span>
                      <strong>Un prototipo</strong>
                      <ArrowDown size={16} />
                    </li>
                    <li>
                      <span>03</span>
                      <strong>Personas usándolo</strong>
                      <ArrowUpRight size={16} />
                    </li>
                  </ol>
                </div>
              </div>
              <div className="card-bottom">
                <span>De la propuesta al uso real</span>
                <span>Iniciativa personal · Construcción compartida</span>
                <span>03 / 04</span>
              </div>
            </article>
            <article
              className="stack-card blurtain-card"
              style={{ '--stack': 3 } as CSSProperties}
            >
              <div className="card-top">
                <span className="kicker">Blurtain · Proyecto personal</span>
                <span className="kicker">macOS · 2026</span>
              </div>
              <div className="blurtain-layout">
                <div className="project-copy">
                  <span className="project-overline">Una pequeña solución</span>
                  <h3>
                    Enseña
                    <br />
                    <em>lo que quieres.</em>
                  </h3>
                  <p>
                    Una aplicación para compartir pantalla sin dejarlo todo a la
                    vista.
                  </p>
                  <CaseReader caseId="blurtain">
                    Explorar Blurtain <ArrowUpRight size={20} />
                  </CaseReader>
                </div>
                <div className="privacy-demo">
                  <div className="demo-bar">
                    <span>Demostración del concepto</span>
                    <span>
                      {protectedView ? <EyeOff size={17} /> : <Eye size={17} />}
                    </span>
                  </div>
                  <div className="demo-content">
                    <span className="kicker">Lo que estás compartiendo</span>
                    <h4>
                      Una buena idea
                      <br />
                      merece verse.
                    </h4>
                    <div
                      className={`private-note ${protectedView ? 'protected' : ''}`}
                    >
                      <span>Y este detalle</span>
                      <strong>prefieres reservarlo.</strong>
                    </div>
                  </div>
                  <label className="demo-control" htmlFor="privacy-control">
                    <span>Proteger el detalle</span>
                    <Switch
                      id="privacy-control"
                      checked={protectedView}
                      onCheckedChange={setProtectedView}
                      className="privacy-switch"
                    />
                  </label>
                </div>
              </div>
              <div className="card-bottom">
                <span>Diseñada para una molestia cotidiana</span>
                <OutLink href="https://github.com/luijait/blurtain">
                  Ver el proyecto
                </OutLink>
                <span>04 / 04</span>
              </div>
            </article>
          </div>
        </section>

        <section className="person-section shell" data-enter>
          <div className="person-photo">
            <img
              src="/luija.png"
              alt="Luis Javier Navarrete Lozano"
              width={460}
              height={460}
              loading="lazy"
            />
            <span className="photo-caption">Luija, al otro lado.</span>
          </div>
          <div className="person-copy">
            <span className="kicker">02 / La persona detrás</span>
            <h2>
              «Hace falta
              <br />
              <em>entender.»</em>
            </h2>
            <p>
              Soy Luija, de Villanueva del Arzobispo, Jaén. Empecé queriendo
              hacer videojuegos. Por el camino llegaron Linux, las redes, la
              ciberseguridad y la IA. Sigo mirando qué hay dentro.
            </p>
            <div className="person-links">
              <a href="/historia" className="ink-link">
                Leer mi historia <ArrowUpRight size={20} />
              </a>
              <OutLink
                href="https://x.com/luijait_/status/2095907175721734495"
                className="quote-source"
              >
                La frase, en X
              </OutLink>
            </div>
          </div>
          <span className="person-margin" aria-hidden="true">
            JAÉN → CURIOSIDAD →
          </span>
        </section>

        <section className="research-door">
          <div className="shell research-door-inner">
            <a
              href="/investigacion"
              className="research-number"
              aria-label="Explorar siete trabajos en coautoría"
            >
              07<span>↗</span>
            </a>
            <div>
              <span className="kicker">03 / Investigación publicada</span>
              <h2>
                Las preguntas
                <br />
                <em>también se publican.</em>
              </h2>
              <p>
                CAI, evaluación, formación, estrategia.
                <br />
                Siete trabajos conectados, en coautoría.
              </p>
              <a href="/investigacion" className="ink-link">
                Entrar en la investigación <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>

        <section className="lab-section shell" id="laboratorio">
          <div className="section-heading" data-enter>
            <div>
              <span className="kicker">04 / Fuera del guion</span>
              <h2>
                Hay ideas que empiezan
                <br />
                <em>un fin de semana.</em>
              </h2>
            </div>
            <span className="lab-stamp">
              EN MARCHA
              <br />
              POR CURIOSIDAD ↙
            </span>
          </div>
          <div className="lab-rows">
            {experiments.map((item, index) => (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="lab-row"
                key={item.name}
              >
                <span className="lab-number">0{index + 1}</span>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.kind}</small>
                </span>
                <p>{item.text}</p>
                <ArrowUpRight size={22} />
              </a>
            ))}
          </div>
        </section>

        <section className="archive-door shell">
          <span className="kicker">05 / Conversaciones y notas</span>
          <div>
            <h2>
              También
              <br />
              <em>lo cuento.</em>
            </h2>
            <p>
              Diez conversaciones largas, charlas y artículos.
              <br />
              El contexto que no cabe en una bio.
            </p>
            <a
              href="/archivo"
              className="archive-arrow"
              aria-label="Abrir el archivo de conversaciones y notas"
            >
              <ArrowUpRight size={64} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
