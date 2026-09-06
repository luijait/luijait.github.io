'use client';
// oxlint-disable next/no-img-element -- Static Pages export: locally hosted images have explicit dimensions and lazy loading.
import { useLocale } from '@/components/locale';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Header, Footer, Motion, OutLink } from '@/components/portfolio';
export default function Story() {
  const { t, path, content, portraits, locale } = useLocale();
  const { chapters, courses } = content;
  const [active, setActive] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.chapter));
      },
      { rootMargin: '-18% 0px -55% 0px' },
    );
    document
      .querySelectorAll('[data-chapter]')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <Motion />
      <Header active="historia" />
      <main id="contenido">
        <section className="inner-hero shell">
          <span className="kicker">
            {t('De Villanueva del Arzobispo a todas estas preguntas')}
          </span>
          <h1>
            {t('La curiosidad')}
            <br />
            <em>{t('viene de antes.')}</em>
          </h1>
          <div className="inner-intro">
            <p>
              {t(
                'Antes de la inteligencia artificial, los papers y los productos, había una pregunta: ¿cómo puede una pequeña pantalla contener un mundo?',
              )}
            </p>
            <a
              href="#recorrido"
              className="circle-button"
              aria-label={t('Empezar a leer la historia')}
            >
              <ArrowDown size={25} />
            </a>
          </div>
        </section>
        <section id="recorrido" className="biography shell">
          <aside className="biography-rail">
            <img
              src="/portraits/x-current.jpg"
              alt="Luis Javier Navarrete Lozano"
              width={400}
              height={400}
            />
            <div className="rail-name">
              <strong>
                Luis Javier
                <br />
                Navarrete Lozano
              </strong>
              <span>{t('Por aquí, Luija.')}</span>
            </div>
            <nav aria-label={t('Capítulos de mi historia')}>
              {chapters.map((chapter, i) => (
                <a
                  href={`#historia-${i}`}
                  key={chapter.era}
                  className={active === i ? 'active' : ''}
                  aria-current={active === i ? 'location' : undefined}
                >
                  <span>0{i + 1}</span>
                  <span>{chapter.era}</span>
                </a>
              ))}
            </nav>
            <div className="chapter-position" aria-hidden="true">
              <span>{String(active + 1).padStart(2, '0')}</span>
              <span>/ 07</span>
              <div>
                <i
                  style={{
                    transform: `scaleX(${(active + 1) / chapters.length})`,
                  }}
                />
              </div>
            </div>
          </aside>
          <div className="biography-text">
            {chapters.map((chapter, i) => (
              <article
                id={`historia-${i}`}
                data-chapter={i}
                className="biography-chapter"
                data-enter
                key={chapter.era}
              >
                <span className="kicker">
                  0{i + 1} / {chapter.era}
                </span>
                <h2>{chapter.title}</h2>
                {chapter.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {chapter.url && (
                  <OutLink href={chapter.url} className="reference-link">
                    {chapter.source}
                  </OutLink>
                )}
                {(i === 3 || i === 5) &&
                  (() => {
                    const photo = portraits[i === 3 ? 0 : 2];
                    return (
                      <figure className="chapter-photo">
                        <a
                          href={photo.source}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={photo.src}
                            alt={photo.alt}
                            width={photo.width}
                            height={photo.height}
                            loading="lazy"
                          />
                        </a>
                        <figcaption>
                          <span>
                            {photo.year} / {photo.label}
                          </span>
                          <a
                            href={photo.source}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {locale === 'es' ? 'Ver la fuente' : 'View source'}
                            <ArrowUpRight size={14} />
                          </a>
                        </figcaption>
                      </figure>
                    );
                  })()}
              </article>
            ))}
            <Accordion className="education">
              <AccordionItem value="cursos">
                <AccordionTrigger className="education-trigger">
                  <span>
                    {t('También hay una base.')}
                    <small>
                      {t('Cursos de redes, Python, Linux y seguridad.')}
                    </small>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="education-content">
                  <p>
                    {t(
                      'Cursos completados y credenciales de estudiante de Cisco Networking Academy, Python, Linux y seguridad.',
                    )}
                  </p>
                  {courses.map((course) => (
                    <OutLink
                      href={course.url}
                      key={course.title}
                      className="course-record"
                    >
                      <span>
                        <strong>{course.title}</strong>
                        <small>
                          {course.issuer} · {course.date}
                        </small>
                      </span>
                    </OutLink>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <a href={path('/investigacion')} className="next-chapter">
              <span>
                {t('Seguir el recorrido')}
                <strong>{t('La investigación')}</strong>
              </span>
              <ArrowUpRight size={36} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
