'use client';
import { useState, type CSSProperties } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLocale } from '@/components/locale';
import { Button } from '@/components/ui/button';

const positions = [
  [50, 49],
  [28, 19],
  [74, 22],
  [86, 52],
  [70, 82],
  [28, 83],
  [12, 51],
];

export function ResearchAtlas({ compact = false }: { compact?: boolean }) {
  const { content, locale, path } = useLocale();
  const [selected, setSelected] = useState(0);
  const { papers } = content;
  const paper = papers[selected];
  const es = locale === 'es';
  return (
    <div className={`research-atlas ${compact ? 'atlas-compact' : ''}`}>
      <div className="atlas-drawing">
        <div className="atlas-topline">
          <span>
            {es
              ? 'Un sistema. Siete preguntas.'
              : 'One system. Seven questions.'}
          </span>
          <span aria-hidden="true">FIG. 01</span>
        </div>
        <div className="atlas-map">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <ellipse cx="50" cy="50" rx="35" ry="33" className="atlas-orbit" />
            {positions.slice(1).map(([x, y], i) => (
              <path
                key={i}
                className={
                  selected === i + 1 || selected === 0
                    ? 'atlas-path active'
                    : 'atlas-path'
                }
                d={`M 50 49 Q ${50 + (x - 50) * 0.2} ${y} ${x} ${y}`}
              />
            ))}
          </svg>
          <fieldset>
            <legend className="sr-only">
              {es
                ? 'Seleccionar una pregunta de investigación'
                : 'Select a research question'}
            </legend>
            {papers.map((item, i) => (
              <Button
                key={item.id}
                variant="ghost"
                className={`atlas-node ${i === 0 ? 'atlas-origin' : ''}`}
                style={
                  {
                    '--node-x': `${positions[i][0]}%`,
                    '--node-y': `${positions[i][1]}%`,
                  } as CSSProperties
                }
                aria-pressed={selected === i}
                aria-label={`${item.tag}: ${item.short}`}
                onClick={() => setSelected(i)}
              >
                <span className="atlas-dot">
                  {i === 0 ? 'CAI' : `0${i + 1}`}
                </span>
                <span className="atlas-label">{item.tag}</span>
              </Button>
            ))}
          </fieldset>
        </div>
        <p className="atlas-key">
          <i />
          {es
            ? 'Lectura temática · Trabajo en coautoría'
            : 'A thematic reading · Coauthored work'}
        </p>
      </div>
      <div className="atlas-detail">
        <div className="atlas-detail-top">
          <span>
            {es ? 'Pregunta' : 'Question'} 0{selected + 1} / 07
          </span>
          <span>{paper.date}</span>
        </div>
        <div className="atlas-reading" aria-live="polite" aria-atomic="true">
          <span className="atlas-topic">{paper.tag}</span>
          <h3>{paper.question}</h3>
          {!compact && <p>{paper.description}</p>}
          <span className="atlas-paper-name">{paper.short}</span>
        </div>
        <div className="atlas-detail-bottom">
          <a href={path(`/investigacion#paper-${paper.id}`)}>
            {es ? 'Explorar el paper' : 'Explore the paper'}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <div className="atlas-paging">
            <Button
              variant="ghost"
              disabled={selected === 0}
              onClick={() => setSelected(selected - 1)}
              aria-label={es ? 'Pregunta anterior' : 'Previous question'}
            >
              <ArrowLeft size={16} />
            </Button>
            <Button
              variant="ghost"
              disabled={selected === 6}
              onClick={() => setSelected(selected + 1)}
              aria-label={es ? 'Pregunta siguiente' : 'Next question'}
            >
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
