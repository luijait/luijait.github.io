'use client';
// oxlint-disable next/no-img-element -- Original, locally hosted photograph with explicit dimensions.
import { useEffect, useRef, useState } from 'react';
import { Play, ArrowUpRight, X } from 'lucide-react';
import { useLocale } from '@/components/locale';
import { Button } from '@/components/ui/button';

export function ArchiveFeature() {
  const { content, locale } = useLocale();
  const [selected, setSelected] = useState(0);
  const [watching, setWatching] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const play = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (watching) frame.current?.focus();
  }, [watching]);
  const es = locale === 'es';
  const selections = [9, 3, 0];
  const episode = content.media[selections[selected]];
  const labels = es
    ? ['Los comienzos', 'El producto', 'La etapa actual']
    : ['The beginnings', 'The product', 'Today'];
  return (
    <section
      className="archive-feature"
      aria-labelledby="archive-feature-title"
    >
      <div className="archive-feature-top">
        <h2 id="archive-feature-title">
          {es ? 'Tres puertas de entrada.' : 'Three ways in.'}
        </h2>
        <span className="kicker">2023 → 2026</span>
      </div>
      <div className="archive-cinema">
        <div className="cinema-screen">
          {watching ? (
            <iframe
              ref={frame}
              key={episode.id}
              src={`https://www.youtube-nocookie.com/embed/${episode.id}?start=${episode.start}&autoplay=1`}
              title={`${episode.show}: ${episode.topic}`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <>
              {selected === 0 ? (
                <img
                  src="/portraits/jaula-2023.jpg"
                  alt={
                    es
                      ? 'Luis en La Jaula del N00b, 2023'
                      : 'Luis on La Jaula del N00b, 2023'
                  }
                  width={1920}
                  height={1080}
                  loading="lazy"
                />
              ) : (
                <div
                  className={`cinema-poster poster-${selected}`}
                  aria-hidden="true"
                >
                  <span>{episode.date.slice(-4)}</span>
                  <strong>
                    {selected === 1 ? '0dAI' : es ? '¿Y ahora?' : 'What next?'}
                  </strong>
                  <div className="poster-rings">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              )}
              <Button
                ref={play}
                className="cinema-play"
                onClick={() => setWatching(true)}
                aria-label={`${es ? 'Reproducir' : 'Play'}: ${episode.topic}`}
              >
                <Play size={23} fill="currentColor" />
                <span>{es ? 'Ver conversación' : 'Watch conversation'}</span>
              </Button>
            </>
          )}
        </div>
        <div className="cinema-caption">
          <span>
            {episode.show} · {episode.duration}
          </span>
          <div className="cinema-actions">
            {watching && (
              <Button
                variant="ghost"
                onClick={() => {
                  setWatching(false);
                  requestAnimationFrame(() => play.current?.focus());
                }}
              >
                {es ? 'Cerrar vídeo' : 'Close video'}
                <X size={14} />
              </Button>
            )}
            <a
              href={`https://www.youtube.com/watch?v=${episode.id}&t=${episode.start}s`}
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
      <fieldset className="archive-feature-picker">
        <legend className="sr-only">
          {es ? 'Elegir una conversación' : 'Choose a conversation'}
        </legend>
        {selections.map((index, i) => (
          <Button
            key={index}
            variant="ghost"
            aria-pressed={selected === i}
            onClick={() => {
              setSelected(i);
              setWatching(false);
            }}
          >
            <span className="feature-pick-top">
              0{i + 1}
              <span>{content.media[index].date.slice(-4)}</span>
            </span>
            <strong>{labels[i]}</strong>
            <span>{content.media[index].topic}</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Button>
        ))}
      </fieldset>
    </section>
  );
}
