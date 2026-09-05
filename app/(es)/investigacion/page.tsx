'use client';
import { useLocale } from '@/components/locale';
import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import {
  Header,
  Footer,
  Motion,
  OutLink,
  CaseReader,
} from '@/components/portfolio';
export default function Research() {
  const { t, path, content } = useLocale();
  const { papers } = content;
  const [expanded, setExpanded] = useState<string[]>([]);
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.replace('#paper-', '');
      if (papers.some((p) => p.id === id)) {
        setExpanded([id]);
        requestAnimationFrame(() =>
          document
            .getElementById('paper-' + id)
            ?.scrollIntoView({ block: 'start' }),
        );
      }
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [papers]);
  return (
    <>
      <Motion />
      <Header active="investigacion" />
      <main id="contenido">
        <section className="inner-hero research-hero shell">
          <span className="kicker">
            {t('2025—2026 / Siete preprints en coautoría')}
          </span>
          <h1>
            {t('De construir')}
            <br />
            <em>{t('a comprender.')}</em>
          </h1>
          <div className="inner-intro">
            <p>
              {t(
                'Una línea de investigación que conecta sistemas, formación, evaluación y estrategia. Leer, implementar y contrastar en equipo.',
              )}
            </p>
            <span className="research-total" aria-label={t('Siete trabajos')}>
              07
            </span>
          </div>
        </section>
        <section
          className="research-body shell"
          aria-label={t('Publicaciones')}
        >
          <div className="research-context">
            <span className="kicker">CAI / Alias Robotics</span>
            <p>
              {t(
                'Soy coautor de estos siete trabajos, desarrollados con el equipo de Alias Robotics. Parten de CAI y amplían la investigación hacia formación, evaluación y estrategia.',
              )}
            </p>
            <CaseReader caseId="cai" className="ink-button">
              {t('El contexto de CAI')}
              <ArrowUpRight size={18} />
            </CaseReader>
          </div>
          <Accordion
            className="publication-list"
            value={expanded}
            onValueChange={(value) => setExpanded(value as string[])}
            multiple
          >
            {papers.map((paper, i) => (
              <AccordionItem
                className="publication"
                id={`paper-${paper.id}`}
                value={paper.id}
                key={paper.id}
              >
                <AccordionTrigger className="publication-trigger">
                  <span className="publication-index">0{i + 1}</span>
                  <span className="publication-name">
                    <strong>{paper.short}</strong>
                    <span>{paper.question}</span>
                  </span>
                  <span className="publication-date">{paper.date}</span>
                </AccordionTrigger>
                <AccordionContent className="publication-content">
                  <div>
                    <span className="kicker">
                      {paper.tag}
                      {t('/ En coautoría')}
                    </span>
                    <h2>{paper.title}</h2>
                    <p>{paper.description}</p>
                    <OutLink
                      href={`https://arxiv.org/abs/${paper.id}`}
                      className="ink-link"
                    >
                      {t('Leer en arXiv')}
                    </OutLink>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="workshop-note">
            <span className="kicker">{t('La conversación continúa')}</span>
            <p>
              {t(
                'CAI cuenta también con una versión vinculada al taller AICS 2026, asociado a AAAI. Una misma investigación en otro espacio de intercambio.',
              )}
            </p>
            <OutLink href="https://aics.site/">AICS 2026</OutLink>
          </div>
          <a href={path('/archivo')} className="next-chapter">
            <span>
              {t('Otra forma de entrar')}
              <strong>{t('Las conversaciones')}</strong>
            </span>
            <ArrowUpRight size={36} />
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
