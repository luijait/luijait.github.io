'use client';
import { useState, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLocale } from '@/components/locale';
import { Button } from '@/components/ui/button';

/** Editorial sketches, not recordings or performance claims from the projects. */
function NotebookDrawing({ index }: { index: number }) {
  return (
    <svg
      className={`notebook-drawing notebook-drawing-${index}`}
      viewBox="0 0 600 380"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="notebook-grid"
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M30 0H0V30"
            fill="none"
            stroke="currentColor"
            strokeWidth=".5"
            opacity=".15"
          />
        </pattern>
      </defs>
      <rect width="600" height="380" fill="url(#notebook-grid)" />
      {index === 0 && (
        <g className="notebook-island">
          <path
            d="M110 190 300 75 490 190 300 305Z"
            className="notebook-surface"
          />
          <path
            d="M110 190v35l190 115 190-115v-35M300 305v35"
            className="notebook-line"
          />
          <path
            d="m155 190 145-85 145 85-145 85Z"
            className="notebook-line"
            strokeDasharray="4 7"
          />
          <path
            d="M170 225 430 155M230 265 370 115"
            className="notebook-line"
          />
          {[
            [190, 190],
            [300, 125],
            [410, 190],
            [300, 255],
            [300, 190],
          ].map(([x, y], i) => (
            <g
              key={i}
              style={{ '--delay': `${i * -0.6}s` } as CSSProperties}
              className="notebook-marker"
            >
              <path
                d={`M${x - 11} ${y}v-28l11-7 11 7v28l-11 7Z`}
                className="notebook-accent"
              />
              <path
                d={`M${x - 11} ${y - 28}l11 7 11-7M${x} ${y - 21}v28`}
                className="notebook-line"
              />
            </g>
          ))}
        </g>
      )}
      {index === 1 && (
        <g>
          {[0, 1, 2].map((layer) => (
            <g key={layer}>
              {[0, 1, 2, 3].map((row) => (
                <g key={row}>
                  {layer < 2 &&
                    [0, 1, 2, 3].map((next) => (
                      <path
                        key={next}
                        d={`M${150 + layer * 150} ${85 + row * 70}L${300 + layer * 150} ${85 + next * 70}`}
                        className="notebook-connection"
                      />
                    ))}
                  <circle
                    cx={150 + layer * 150}
                    cy={85 + row * 70}
                    r={layer === 1 ? 17 : 11}
                    className={
                      layer === 1 ? 'notebook-accent' : 'notebook-surface'
                    }
                  />
                </g>
              ))}
            </g>
          ))}
          <path
            d="M105 330H495M105 325v10M495 325v10"
            className="notebook-line"
          />
        </g>
      )}
      {index === 2 && (
        <g>
          <path
            d="M0 320 65 298 104 319 151 280 204 315H350L397 285 450 320 491 295 550 310 600 286V380H0Z"
            className="notebook-surface"
          />
          <path
            d="M300 45C440 100 200 150 300 240"
            className="notebook-trajectory"
          />
          <g className="notebook-lander">
            <path
              d="m278 236 8-22h28l8 22-22 15Z"
              className="notebook-accent"
            />
            <path
              d="m285 242-16 15v10m46-25 16 15v10m-67 0h10m52 0h10M286 226h28M300 214v-12"
              className="notebook-line"
            />
            <path d="m292 255 8 22 8-22" className="notebook-flame" />
          </g>
          <path
            d="M250 315h100M260 307v16M340 307v16"
            className="notebook-line"
          />
          <circle cx="96" cy="90" r="18" className="notebook-line" />
          <circle cx="472" cy="74" r="3" fill="currentColor" />
        </g>
      )}
      {index === 3 && (
        <g>
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <g
                key={`${row}-${col}`}
                transform={`translate(${135 + col * 70} ${85 + row * 65}) scale(4)`}
                className="notebook-invader"
              >
                <path
                  d="M2 0h1v1H2zM7 0h1v1H7zM3 1h4v1H3zM2 2h6v1H2zM1 3h2v1H1zM4 3h2v1H4zM7 3h2v1H7zM0 4h10v2H0zM0 6h1v2H0zM2 6h6v1H2zM9 6h1v2H9zM3 7h1v1H3zM6 7h1v1H6z"
                  fill="currentColor"
                />
              </g>
            )),
          )}
          <path
            d="M284 305h10v-12h12v12h10v18h-32Z"
            className="notebook-accent"
          />
          <path d="M100 345h400" className="notebook-line" />
        </g>
      )}
      {index === 4 && (
        <g>
          {[
            [180, 100],
            [420, 100],
            [130, 250],
            [470, 250],
            [300, 315],
          ].map(([x, y], i) => (
            <g key={i}>
              <path
                d={`M300 190Q${x} 190 ${x} ${y}`}
                className="notebook-trajectory"
              />
              <rect
                x={x - 22}
                y={y - 17}
                width="44"
                height="34"
                rx="3"
                className="notebook-surface"
              />
              <path
                d={`M${x - 13} ${y - 6}h26M${x - 13} ${y + 3}h14`}
                className="notebook-line"
              />
            </g>
          ))}
          <circle cx="300" cy="190" r="40" className="notebook-accent" />
          <path
            d="M280 185h40M280 195h40M290 175v30M310 175v30"
            className="notebook-line"
          />
        </g>
      )}
    </svg>
  );
}

export function LabNotebook() {
  const { content, locale } = useLocale();
  const [selected, setSelected] = useState(0);
  const item = content.experiments[selected];
  const es = locale === 'es';
  return (
    <div className="lab-notebook">
      <fieldset className="notebook-index">
        <legend className="sr-only">
          {es ? 'Elegir un proyecto del laboratorio' : 'Choose a lab project'}
        </legend>
        {content.experiments.map((experiment, i) => (
          <Button
            variant="ghost"
            key={experiment.name}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <span>0{i + 1}</span>
            <strong>{experiment.name}</strong>
            <ArrowUpRight size={16} />
          </Button>
        ))}
      </fieldset>
      <div className="notebook-page">
        <div className="notebook-visual">
          <div className="notebook-meta">
            <span>
              {es ? 'Cuaderno de curiosidad' : 'A notebook of curiosity'}
            </span>
            <span>0{selected + 1} / 05</span>
          </div>
          <NotebookDrawing index={selected} />
          <span className="notebook-sketch-label">
            {es ? 'Apunte visual del concepto' : 'A visual sketch of the idea'}
          </span>
        </div>
        <div className="notebook-caption">
          <div aria-live="polite">
            <span className="kicker">{item.kind}</span>
            <h3>{item.name}</h3>
            <p>{item.text}</p>
          </div>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {es ? 'Abrir el proyecto original' : 'Open the original project'}
            <ArrowUpRight size={19} />
          </a>
        </div>
      </div>
    </div>
  );
}
