'use client';
import { useEffect, useRef, useState } from 'react';
import { Rotate3D, ArrowUpRight } from 'lucide-react';
import { useExperience } from '@/components/experience';
import { useLocale } from '@/components/locale';
import { Button } from '@/components/ui/button';
import type { ObjectKind, ProjectObjectEngine } from '@/lib/project-object';

export function ProjectObject({ kind }: { kind: ObjectKind }) {
  const { locale } = useLocale();
  const { playing } = useExperience();
  const [selected, setSelected] = useState(0);
  const host = useRef<HTMLElement>(null);
  const engine = useRef<ProjectObjectEngine | null>(null);
  const current = useRef({ playing, selected });
  useEffect(() => {
    current.current = { playing, selected };
    engine.current?.play(playing);
    engine.current?.select(selected);
  }, [playing, selected]);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        try {
          const { createProjectObject } = await import('@/lib/project-object');
          if (cancelled) return;
          engine.current = createProjectObject(element, kind);
          engine.current.play(current.current.playing);
          engine.current.select(current.current.selected);
        } catch {
          element.dataset.lost = 'true';
        }
      },
      { rootMargin: '250px' },
    );
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
      engine.current?.dispose();
      engine.current = null;
    };
  }, [kind]);
  const es = locale === 'es';
  const steps =
    kind === 'lens'
      ? es
        ? ['El sistema', 'Las piezas']
        : ['The system', 'The parts']
      : es
        ? ['Necesidad', 'Prototipo', 'Personas']
        : ['Need', 'Prototype', 'People'];
  const notes =
    kind === 'lens'
      ? es
        ? [
            'Modelos, herramientas y criterio humano. Mi trabajo está en su encuentro.',
            'Investigar, desarrollar y llevarlo a producto con el equipo de NoScope.',
          ]
        : [
            'Models, tools and human judgment. My work sits where they meet.',
            'Research, development and product, with the NoScope team.',
          ]
      : es
        ? [
            'Todo comenzó con una necesidad práctica en Omega.',
            'Como cofundador y CTO, participé en el desarrollo y la dirección técnica.',
            'El feedback de los usuarios cambió nuestras prioridades y la experiencia.',
          ]
        : [
            'It began with a practical need at Omega.',
            'As cofounder and CTO, I contributed to development and technical direction.',
            'User feedback changed our priorities and the experience.',
          ];
  return (
    <div className={`project-object object-${kind}`}>
      <div className="object-heading">
        <span>{kind === 'lens' ? 'NoScope' : '0dAI'}</span>
        <span>
          {es ? 'Una idea, por dentro' : 'Inside an idea'}
          <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </div>
      <figure
        className="object-window"
        ref={host}
        aria-label={
          kind === 'lens'
            ? es
              ? 'Escultura de anillos concéntricos alrededor de un núcleo'
              : 'Sculpture of concentric rings around a core'
            : es
              ? 'Escultura de tres módulos que se separan en capas'
              : 'Sculpture of three modules separating into layers'
        }
        onPointerMove={(event) => {
          if (!playing || event.pointerType !== 'mouse') return;
          const box = event.currentTarget.getBoundingClientRect();
          engine.current?.point(
            ((event.clientX - box.left) / box.width) * 2 - 1,
            ((event.clientY - box.top) / box.height) * 2 - 1,
          );
        }}
        onPointerLeave={() => engine.current?.point(0, 0)}
      >
        <div className="object-fallback" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span className="object-coordinate" aria-hidden="true">
          {kind === 'lens' ? '01 / HUMAN IN THE LOOP' : '03 / FROM ZERO TO ONE'}
        </span>
      </figure>
      <div className="object-toolbar">
        <fieldset>
          <legend className="sr-only">
            {es ? 'Explorar la idea' : 'Explore the idea'}
          </legend>
          {steps.map((step, i) => (
            <Button
              key={step}
              variant="ghost"
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span>0{i + 1}</span>
              {step}
            </Button>
          ))}
        </fieldset>
        <Button
          variant="ghost"
          className="object-rotate"
          onClick={() => engine.current?.rotate()}
          aria-label={es ? 'Girar la escultura' : 'Rotate sculpture'}
          title={es ? 'Girar la escultura' : 'Rotate sculpture'}
        >
          <Rotate3D size={18} />
        </Button>
      </div>
      <p className="object-note" aria-live="polite">
        {notes[selected]}
      </p>
    </div>
  );
}
