'use client';
// oxlint-disable next/no-img-element -- Static Pages export: locally hosted images have explicit dimensions and lazy loading.

import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLocale } from '@/components/locale';
import { Sculpture } from '@/components/sculpture';
import type { CSSProperties } from 'react';

export function PortfolioHero() {
  const { locale, path, portraits, t } = useLocale();
  const es = locale === 'es';
  return (
    <>
      <section className="hero-studio shell" aria-labelledby="hero-title">
        <div className="studio-topline">
          <span>Luis Javier Navarrete Lozano</span>
          <span className="studio-location">
            {es ? 'Granada, España' : 'Granada, Spain'}{' '}
            <span aria-hidden="true">↗</span>
          </span>
        </div>
        <div className="studio-grid">
          <div className="studio-copy">
            <div className="studio-eyebrow">
              <i aria-hidden="true" />
              <span>AI engineer · TryHackMe / NoScope</span>
            </div>
            <h1 id="hero-title">
              {es ? 'Hace falta' : 'You need to'}
              <br />
              <em>{es ? 'entender.' : 'understand.'}</em>
            </h1>
            <p>
              {es
                ? 'Investigo IA. Construyo modelos y agentes. Me gusta mirar dentro de las cosas y convertir lo que aprendo en algo útil.'
                : 'I research AI. I build models and agents. I like looking inside things and turning what I learn into something useful.'}
            </p>
            <div className="studio-actions">
              <a href="#trabajo" className="studio-primary">
                {t('Explorar el trabajo')}
                <ArrowDown size={18} />
              </a>
              <a href={path('/historia')} className="studio-secondary">
                {t('Mi historia')}
                <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="studio-footnote">
              <span>01 — 04</span>
              <span>
                {es
                  ? 'Investigación, producto y curiosidad propia.'
                  : 'Research, products and a curiosity of my own.'}
              </span>
            </div>
          </div>
          <Sculpture />
        </div>
      </section>
      <section className="photo-journal shell" aria-labelledby="journal-title">
        <div className="journal-heading">
          <h2 id="journal-title" className="kicker">
            {es
              ? 'Al otro lado de la pantalla'
              : 'On the other side of the screen'}
          </h2>
          <span className="kicker">2023 — 2026</span>
        </div>
        <ol
          className="photo-sequence"
          aria-label={t('Imágenes a lo largo de los años')}
        >
          {portraits.map((photo, index) => (
            <li
              className="photo-year"
              key={photo.year}
              style={{ '--index': index } as CSSProperties}
              data-enter
            >
              <a
                href={photo.source}
                target="_blank"
                rel="noopener noreferrer"
                className="photo-print"
                aria-label={`${photo.year} · ${photo.label}. ${t('Abrir la fuente.')}`}
              >
                <div className={`photo-frame crop-${photo.crop}`}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                  />
                  <span className="photo-source-arrow" aria-hidden="true">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
                <div className="photo-note">
                  <time dateTime={photo.year}>{photo.year}</time>
                  <span>
                    <strong>{photo.label}</strong>
                    <small>{photo.detail}</small>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ol>
        <div className="journal-caption">
          <p>
            {es
              ? 'Conversar. Compartir. Seguir aprendiendo.'
              : 'Talk. Share. Keep learning.'}
          </p>
          <a href={path('/historia')}>
            {t('Esta es mi historia')}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
