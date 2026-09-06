'use client';
// oxlint-disable next/no-img-element -- Static Pages export: locally hosted images have explicit dimensions and lazy loading.
import { useLocale } from '@/components/locale';
import { useState, type PointerEvent, type CSSProperties } from 'react';
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
  Plus,
  Eye,
  EyeOff,
} from 'lucide-react';
import { PortfolioHero } from '@/components/portfolio-hero';
import { WorkIndex } from '@/components/work-index';
import { JourneyDock } from '@/components/journey-dock';
import { Switch } from '@/components/ui/switch';
import {
  Header,
  Footer,
  Motion,
  CaseReader,
  OutLink,
} from '@/components/portfolio';

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
  const { t, path, content } = useLocale();
  const { papers, experiments } = content;
  const [protectedView, setProtectedView] = useState(true);
  return (
    <>
      <Motion />
      <Header />
      <main id="contenido">
        <PortfolioHero />

        <section
          className="work-section shell"
          id="trabajo"
          aria-labelledby="work-title"
        >
          <div className="section-heading" data-enter>
            <div>
              <span className="kicker">{t('01 / Trabajo seleccionado')}</span>
              <h2 id="work-title">
                {t('De 0dAI')}
                <br />
                <em>{t('a TryHackMe.')}</em>
              </h2>
            </div>
            <p>
              {t('Investigación, producto')}
              <br />
              {t('y proyectos por mi cuenta.')}
            </p>
          </div>
          <WorkIndex />
          <div className="project-stack">
            <article
              className="stack-card thm-card"
              id="tryhackme"
              style={{ '--stack': 0 } as CSSProperties}
            >
              <div className="card-top">
                <span className="card-status">
                  <i />
                  {t('Mi trabajo actual')}
                </span>
                <span className="kicker">{t('La etapa actual')}</span>
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
                    {t(
                      'Antes resolvía máquinas en TryHackMe. Hoy construyo modelos y agentes con el equipo de NoScope. La misma curiosidad, desde el otro lado.',
                    )}
                  </p>
                  <CaseReader caseId="noscope">
                    {t('Mi etapa actual')}
                    <ArrowUpRight size={20} />
                  </CaseReader>
                  <OutLink
                    href="https://www.noscope.com/company"
                    className="card-source"
                  >
                    {t('Conocer al equipo')}
                  </OutLink>
                </div>
              </div>
              <div className="card-bottom">
                <span>TryHackMe / NoScope</span>
                <span>{t('Investigación · Producto · Ciberseguridad')}</span>
                <span>01 / 04</span>
              </div>
            </article>
            <article
              className="stack-card cai-card"
              id="cai"
              style={{ '--stack': 1 } as CSSProperties}
              onPointerMove={tilt}
              onPointerLeave={resetTilt}
            >
              <div className="card-top">
                <span className="kicker">
                  {t('Investigación en Alias Robotics')}
                </span>
                <span className="kicker">2025—2026</span>
              </div>
              <div className="cai-layout">
                <div className="project-copy">
                  <span className="project-overline">CAI / CAIBench</span>
                  <h3>
                    {t('Construir.')}
                    <br />
                    {t('Y aprender')}
                    <br />
                    <em>{t('a medir.')}</em>
                  </h3>
                  <p>
                    {t(
                      'Una infraestructura abierta y siete trabajos en coautoría para investigar IA aplicada a ciberseguridad.',
                    )}
                  </p>
                  <CaseReader caseId="cai">
                    {t('Abrir el caso')}
                    <Plus size={20} />
                  </CaseReader>
                </div>
                <div
                  className="paper-display"
                  aria-label={t('Una selección de los papers publicados')}
                >
                  {[papers[0], papers[2], papers[1]].map((paper, index) => (
                    <a
                      className={`paper-tile paper-tile-${index}`}
                      href={path(`/investigacion#paper-${paper.id}`)}
                      key={paper.id}
                    >
                      <div className="paper-tile-meta">
                        <span>RESEARCH PAPER</span>
                        <span>0{index + 1}</span>
                      </div>
                      <span className="paper-tile-title">{paper.short}</span>
                      <p>{paper.question}</p>
                      <div className="paper-tile-bottom">
                        <span>{t('Coautor · arXiv')}</span>
                        <ArrowUpRight size={20} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="card-bottom">
                <span>CAI · CAIBench · Fluency</span>
                <a href={path('/investigacion')}>
                  {t('Explorar las 7 publicaciones ↗')}
                </a>
                <span>02 / 04</span>
              </div>
            </article>
            <article
              className="stack-card odai-card"
              id="0dai"
              style={{ '--stack': 2 } as CSSProperties}
            >
              <div className="card-top">
                <span className="kicker">{t('Cofundador y CTO · 0dAI')}</span>
                <span className="kicker">2023—2024</span>
              </div>
              <div className="odai-layout">
                <div className="project-copy">
                  <span className="project-overline">
                    {t('El primer producto')}
                  </span>
                  <h3>
                    {t('Una idea.')}
                    <br />
                    <em>{t('Luego, usuarios.')}</em>
                  </h3>
                  <p>
                    {t(
                      'Una necesidad en Omega se convirtió, junto al equipo, en un prototipo y un servicio.',
                    )}
                  </p>
                  <CaseReader caseId="0dai">
                    {t('Mirar dentro')}
                    <Plus size={20} />
                  </CaseReader>
                </div>
                <div className="odai-process">
                  <span className="odai-mark">
                    0d<span>AI</span>
                  </span>
                  <ol aria-label={t('El recorrido de 0dAI')}>
                    <li>
                      <span>01</span>
                      <strong>{t('Una necesidad')}</strong>
                      <ArrowDown size={16} />
                    </li>
                    <li>
                      <span>02</span>
                      <strong>{t('Un prototipo')}</strong>
                      <ArrowDown size={16} />
                    </li>
                    <li>
                      <span>03</span>
                      <strong>{t('Personas usándolo')}</strong>
                      <ArrowUpRight size={16} />
                    </li>
                  </ol>
                </div>
              </div>
              <div className="card-bottom">
                <span>{t('De la propuesta al uso real')}</span>
                <span>
                  {t('Iniciativa personal · Construcción compartida')}
                </span>
                <span>03 / 04</span>
              </div>
            </article>
            <article
              className="stack-card blurtain-card"
              id="blurtain"
              style={{ '--stack': 3 } as CSSProperties}
            >
              <div className="card-top">
                <span className="kicker">
                  {t('Blurtain · Proyecto personal')}
                </span>
                <span className="kicker">macOS · 2026</span>
              </div>
              <div className="blurtain-layout">
                <div className="project-copy">
                  <span className="project-overline">
                    {t('Una pequeña solución')}
                  </span>
                  <h3>
                    {t('Enseña')}
                    <br />
                    <em>{t('lo que quieres.')}</em>
                  </h3>
                  <p>
                    {t(
                      'Una aplicación para compartir pantalla sin dejarlo todo a la vista.',
                    )}
                  </p>
                  <CaseReader caseId="blurtain">
                    {t('Explorar Blurtain')}
                    <ArrowUpRight size={20} />
                  </CaseReader>
                </div>
                <div className="privacy-demo">
                  <div className="demo-bar">
                    <span>{t('Demostración del concepto')}</span>
                    <span>
                      {protectedView ? <EyeOff size={17} /> : <Eye size={17} />}
                    </span>
                  </div>
                  <div className="demo-content">
                    <span className="kicker">
                      {t('Lo que estás compartiendo')}
                    </span>
                    <h4>
                      {t('Una buena idea')}
                      <br />
                      {t('merece verse.')}
                    </h4>
                    <div
                      className={`private-note ${protectedView ? 'protected' : ''}`}
                    >
                      <span>{t('Y este detalle')}</span>
                      <strong>{t('prefieres reservarlo.')}</strong>
                    </div>
                  </div>
                  <label className="demo-control" htmlFor="privacy-control">
                    <span>{t('Proteger el detalle')}</span>
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
                <span>{t('Diseñada para una molestia cotidiana')}</span>
                <OutLink href="https://github.com/luijait/blurtain">
                  {t('Ver el proyecto')}
                </OutLink>
                <span>04 / 04</span>
              </div>
            </article>
          </div>
        </section>

        <section className="person-section shell" id="persona" data-enter>
          <div className="person-photo">
            <img
              src="/portraits/x-current.jpg"
              alt="Luis Javier Navarrete Lozano"
              width={400}
              height={400}
              loading="lazy"
            />
            <span className="photo-caption">{t('Luija, al otro lado.')}</span>
          </div>
          <div className="person-copy">
            <span className="kicker">{t('02 / La persona detrás')}</span>
            <h2>
              {t('«Hace falta')}
              <br />
              <em>{t('entender.»')}</em>
            </h2>
            <p>
              {t(
                'Soy Luija, de Villanueva del Arzobispo, Jaén. Empecé queriendo hacer videojuegos y escribiendo C en una libreta durante las clases de la ESO, contando las horas para llegar a casa y compilarlo. Después llegaron Linux, las redes y la IA. La curiosidad sigue siendo la misma.',
              )}
            </p>
            <div className="person-links">
              <a href={path('/historia')} className="ink-link">
                {t('Leer mi historia')}
                <ArrowUpRight size={20} />
              </a>
              <OutLink
                href="https://x.com/luijait_/status/2095907175721734495"
                className="quote-source"
              >
                {t('La frase, en X')}
              </OutLink>
            </div>
          </div>
          <span className="person-margin" aria-hidden="true">
            {t('JAÉN → CURIOSIDAD →')}
          </span>
        </section>

        <section className="research-door" id="publicaciones">
          <div className="shell research-door-inner">
            <a
              href={path('/investigacion')}
              className="research-number"
              aria-label={t('Explorar siete trabajos en coautoría')}
            >
              07<span>↗</span>
            </a>
            <div>
              <span className="kicker">
                {t('03 / Investigación publicada')}
              </span>
              <h2>
                {t('Las preguntas')}
                <br />
                <em>{t('también se publican.')}</em>
              </h2>
              <p>
                {t('CAI, evaluación, formación, estrategia.')}
                <br />
                {t('Siete trabajos conectados, en coautoría.')}
              </p>
              <a href={path('/investigacion')} className="ink-link">
                {t('Entrar en la investigación')}
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>

        <section className="lab-section shell" id="laboratorio">
          <div className="section-heading" data-enter>
            <div>
              <span className="kicker">{t('04 / Fuera del guion')}</span>
              <h2>
                {t('Hay ideas que empiezan')}
                <br />
                <em>{t('un fin de semana.')}</em>
              </h2>
            </div>
            <span className="lab-stamp">
              {t('EN MARCHA')}
              <br />
              {t('POR CURIOSIDAD ↙')}
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

        <section className="archive-door shell" id="conversaciones">
          <span className="kicker">{t('05 / Conversaciones y notas')}</span>
          <div>
            <h2>
              {t('También')}
              <br />
              <em>{t('lo cuento.')}</em>
            </h2>
            <p>
              {t('Diez conversaciones largas, charlas y artículos.')}
              <br />
              {t('El contexto que no cabe en una bio.')}
            </p>
            <a
              href={path('/archivo')}
              className="archive-arrow"
              aria-label={t('Abrir el archivo de conversaciones y notas')}
            >
              <ArrowUpRight size={64} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <JourneyDock />
    </>
  );
}
