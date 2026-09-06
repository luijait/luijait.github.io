'use client';
// oxlint-disable next/no-img-element -- Local source photographs, with explicit dimensions.
import { useState } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { useLocale } from '@/components/locale';
import { Button } from '@/components/ui/button';

export function StoryPrelude() {
  const { content, portraits, locale } = useLocale();
  const [selected, setSelected] = useState(0);
  const es = locale === 'es';
  const moments = [
    {
      photo: 0,
      chapter: 3,
      label: es ? 'De una idea a 0dAI' : 'From an idea to 0dAI',
      note: es
        ? 'Una conversación sobre cómo llegué hasta aquí.'
        : 'A conversation about how I got here.',
    },
    {
      photo: 1,
      chapter: 5,
      label: es ? 'Pensar en voz alta' : 'Thinking out loud',
      note: es
        ? 'AiBirras, Granada. Compartir también es una manera de aprender.'
        : 'AiBirras, Granada. Sharing is another way of learning.',
    },
    {
      photo: 2,
      chapter: 5,
      label: es ? 'Volver al aula' : 'Back to the classroom',
      note: es
        ? 'Una sesión con estudiantes de IES Virgen del Carmen.'
        : 'A session with students at IES Virgen del Carmen.',
    },
  ];
  const moment = moments[selected];
  const photo = portraits[moment.photo];
  return (
    <section
      className="story-prelude shell"
      aria-label={es ? 'Momentos del camino' : 'Moments along the way'}
    >
      <div className="story-prelude-heading">
        <span className="kicker">
          {es
            ? 'El camino también tiene imágenes'
            : 'There are pictures along the way, too'}
        </span>
        <span>2023—2025</span>
      </div>
      <div className="story-moment">
        <figure>
          <div className="story-moment-image">
            <img
              key={photo.src}
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              loading="lazy"
            />
          </div>
          <figcaption>
            <span>
              {photo.year} / {photo.label}
            </span>
            <a href={photo.source} target="_blank" rel="noopener noreferrer">
              {es ? 'Fuente original' : 'Original source'}
              <ArrowUpRight size={14} />
            </a>
          </figcaption>
        </figure>
        <div className="story-moment-copy">
          <span className="moment-counter" aria-hidden="true">
            0{selected + 1}
            <small>/ 03</small>
          </span>
          <div aria-live="polite">
            <h2>{moment.label}</h2>
            <p>{moment.note}</p>
          </div>
          <a href={`#historia-${moment.chapter}`} className="ink-link">
            {es ? 'Leer esta etapa' : 'Read this chapter'}
            <ArrowDown size={17} />
          </a>
          <fieldset className="moment-picker">
            <legend className="sr-only">
              {es ? 'Elegir un momento' : 'Choose a moment'}
            </legend>
            {moments.map((item, i) => (
              <Button
                key={item.photo}
                variant="ghost"
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
              >
                <span>{portraits[item.photo].year}</span>
                <span>{portraits[item.photo].label}</span>
              </Button>
            ))}
          </fieldset>
        </div>
      </div>
      <nav
        className="story-timeline"
        aria-label={es ? 'Recorrido completo' : 'The full journey'}
      >
        {content.chapters.map((chapter, i) => (
          <a key={chapter.era} href={`#historia-${i}`}>
            <span>0{i + 1}</span>
            <i aria-hidden="true" />
            <strong>{chapter.era}</strong>
          </a>
        ))}
      </nav>
    </section>
  );
}
