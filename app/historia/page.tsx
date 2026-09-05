'use client';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Header, Footer, Motion, OutLink } from '@/components/portfolio';
import { chapters, courses } from '../content';
export default function Story() {
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
            De Villanueva del Arzobispo a todas estas preguntas
          </span>
          <h1>
            La curiosidad
            <br />
            <em>viene de antes.</em>
          </h1>
          <div className="inner-intro">
            <p>
              Antes de la inteligencia artificial, los papers y los productos,
              había una pregunta: ¿cómo puede una pequeña pantalla contener un
              mundo?
            </p>
            <a
              href="#recorrido"
              className="circle-button"
              aria-label="Empezar a leer la historia"
            >
              <ArrowDown size={25} />
            </a>
          </div>
        </section>
        <section id="recorrido" className="biography shell">
          <aside className="biography-rail">
            <img
              src="/luija.png"
              alt="Luis Javier Navarrete Lozano"
              width={460}
              height={460}
            />
            <div className="rail-name">
              <strong>
                Luis Javier
                <br />
                Navarrete Lozano
              </strong>
              <span>Por aquí, Luija.</span>
            </div>
            <nav aria-label="Capítulos de mi historia">
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
          </aside>
          <div className="biography-text">
            {chapters.map((chapter, i) => (
              <article
                id={`historia-${i}`}
                data-chapter={i}
                className="biography-chapter"
                key={chapter.era}
              >
                <span className="kicker">
                  0{i + 1} / {chapter.era}
                </span>
                <h2>{chapter.title}</h2>
                {chapter.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <OutLink href={chapter.url} className="reference-link">
                  {chapter.source}
                </OutLink>
              </article>
            ))}
            <Accordion className="education">
              <AccordionItem value="cursos">
                <AccordionTrigger className="education-trigger">
                  <span>
                    También hay una base.
                    <small>Cursos de redes, Python, Linux y seguridad.</small>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="education-content">
                  <p>
                    Cursos completados y credenciales de estudiante de Cisco
                    Networking Academy, Python, Linux y seguridad.
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
            <a href="/investigacion" className="next-chapter">
              <span>
                Seguir el recorrido<strong>La investigación</strong>
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
