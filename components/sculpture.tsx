'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useExperience } from '@/components/experience';
import { useLocale } from '@/components/locale';
import type { createSculpture } from '@/lib/sculpture';

export function Sculpture({
  compact = false,
  initialMode = 0,
}: {
  compact?: boolean;
  initialMode?: number;
}) {
  const { locale } = useLocale();
  const { playing } = useExperience();
  const host = useRef<HTMLDivElement>(null);
  const engine = useRef<ReturnType<typeof createSculpture> | null>(null);
  const values = useRef({ playing, mode: initialMode });
  const [mode, setMode] = useState(initialMode);
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>(
    'loading',
  );
  const point = useRef({ x: 0, y: 0 });
  useEffect(() => {
    values.current = { playing, mode };
  }, [playing, mode]);
  const es = locale === 'es';
  const labels = es
    ? ['Explorar', 'Construir', 'Comprender']
    : ['Explore', 'Build', 'Understand'];
  const descriptions = es
    ? [
        'Seguir una pregunta, incluso cuando se enreda.',
        'Dar forma a una idea, pieza a pieza.',
        'Encontrar las conexiones. Mirar dentro.',
      ]
    : [
        'Follow a question, even when it gets tangled.',
        'Give an idea a shape, piece by piece.',
        'Find the connections. Look inside.',
      ];
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        import('@/lib/sculpture')
          .then(({ createSculpture }) => {
            if (cancelled) return;
            engine.current = createSculpture(element, () => setStatus('ready'));
            engine.current.setMode(values.current.mode);
            engine.current.setPlaying(values.current.playing);
          })
          .catch(() => {
            if (!cancelled) setStatus('fallback');
          });
      },
      { rootMargin: '200px' },
    );
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
      engine.current?.dispose();
      engine.current = null;
    };
  }, []);
  useEffect(() => engine.current?.setPlaying(playing), [playing]);
  useEffect(() => engine.current?.setMode(mode), [mode]);
  const rotate = (x: number, y: number) => {
    point.current = { x, y };
    engine.current?.point(x, y);
  };
  return (
    <div
      className={`sculpture ${compact ? 'sculpture-compact' : ''}`}
      data-status={status}
    >
      <div className="sculpture-overline">
        <span>LU / 0{mode + 1}</span>
        <span>
          {es ? 'Una misma curiosidad' : 'The same curiosity'}{' '}
          <ArrowUpRight size={13} />
        </span>
      </div>
      <figure
        className="sculpture-viewport"
        aria-label={
          es
            ? `Escultura tridimensional: ${labels[mode]}.`
            : `Three-dimensional sculpture: ${labels[mode]}.`
        }
        onPointerMove={(event) => {
          if (event.pointerType !== 'mouse' || !playing) return;
          const box = event.currentTarget.getBoundingClientRect();
          rotate(
            ((event.clientX - box.left) / box.width) * 2 - 1,
            ((event.clientY - box.top) / box.height) * 2 - 1,
          );
        }}
        onPointerLeave={() => {
          if (playing) rotate(0, 0);
        }}
      >
        <div className="sculpture-host" ref={host} />
        <div className="sculpture-fallback" aria-hidden="true">
          <span>¿</span>
          <em>?</em>
        </div>
        <span className="sculpture-axis" aria-hidden="true">
          +
        </span>
      </figure>
      <div className="sculpture-caption">
        <span aria-live="polite">{descriptions[mode]}</span>
        <div className="sculpture-tools">
          <Button
            variant="ghost"
            className="sculpture-reset"
            onClick={() => rotate(point.current.x - 1, point.current.y)}
            aria-label={es ? 'Girar a la izquierda' : 'Rotate left'}
            disabled={status !== 'ready'}
          >
            <ChevronLeft size={15} />
          </Button>
          <Button
            variant="ghost"
            className="sculpture-reset"
            onClick={() => rotate(0, 0)}
            aria-label={es ? 'Restablecer vista' : 'Reset view'}
            disabled={status !== 'ready'}
          >
            <RotateCcw size={15} />
          </Button>
          <Button
            variant="ghost"
            className="sculpture-reset"
            onClick={() => rotate(point.current.x + 1, point.current.y)}
            aria-label={es ? 'Girar a la derecha' : 'Rotate right'}
            disabled={status !== 'ready'}
          >
            <ChevronRight size={15} />
          </Button>
        </div>
      </div>
      <fieldset
        className="sculpture-modes"
        aria-label={es ? 'Formas de mirar' : 'Ways of looking'}
      >
        {labels.map((label, index) => (
          <Button
            variant="ghost"
            key={label}
            onClick={() => setMode(index)}
            aria-pressed={mode === index}
            className="sculpture-mode"
          >
            <span>0{index + 1}</span>
            {label}
          </Button>
        ))}
      </fieldset>
    </div>
  );
}
