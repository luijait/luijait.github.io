'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLocale } from '@/components/locale';

const sections = [
  { id: 'trabajo', es: 'Trabajo', en: 'Work' },
  { id: 'persona', es: 'Historia', en: 'Story' },
  { id: 'publicaciones', es: 'Papers', en: 'Papers' },
  { id: 'laboratorio', es: 'Laboratorio', en: 'Lab' },
  { id: 'conversaciones', es: 'Archivo', en: 'Archive' },
];

export function JourneyDock() {
  const { locale } = useLocale();
  const [active, setActive] = useState('trabajo');
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let frame = 0;
    const targets = sections.map((section) =>
      document.getElementById(section.id),
    );
    const footer = document.getElementById('contacto');
    const update = () => {
      frame = 0;
      const rects = targets.map((target) => target?.getBoundingClientRect());
      const next = rects.reduce(
        (current, rect, index) =>
          rect && rect.top <= innerHeight * 0.45 ? index : current,
        0,
      );
      setActive(sections[next].id);
      setVisible(
        (rects[0]?.top ?? Infinity) < innerHeight * 0.55 &&
          (footer?.getBoundingClientRect().top ?? Infinity) >
            innerHeight * 0.85,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return (
    <nav
      className="journey-dock"
      aria-label={
        locale === 'es' ? 'Secciones del portfolio' : 'Portfolio sections'
      }
      data-visible={visible}
      inert={!visible}
    >
      {sections.map((section, index) => (
        <a
          href={`#${section.id}`}
          key={section.id}
          aria-current={active === section.id ? 'location' : undefined}
          aria-label={section[locale]}
        >
          <span>0{index + 1}</span>
          <strong>{section[locale]}</strong>
        </a>
      ))}
      <a
        href="#inicio"
        className="dock-top"
        aria-label={locale === 'es' ? 'Volver arriba' : 'Back to top'}
      >
        <ArrowUp size={16} />
      </a>
    </nav>
  );
}
