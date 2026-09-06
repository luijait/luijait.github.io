'use client';
import { useState, type CSSProperties } from 'react';
import { ArrowUpRight, GitCommitHorizontal } from 'lucide-react';
import { openModels } from '@/app/open-models';
import { useLocale } from '@/components/locale';
import { Button } from '@/components/ui/button';

export function OpenModels() {
  const { locale } = useLocale();
  const [selected, setSelected] = useState(1);
  const model = openModels[selected];
  const es = locale === 'es';
  return (
    <section
      className="open-models"
      id="modelos-abiertos"
      aria-labelledby="models-title"
    >
      <div className="models-intro">
        <div>
          <span className="kicker">
            {es
              ? 'Mi trabajo en machine learning'
              : 'My work in machine learning'}
          </span>
          <h4 id="models-title">
            {es ? 'También están' : 'The weights'}
            <br />
            <em>{es ? 'los pesos.' : 'are here, too.'}</em>
          </h4>
        </div>
        <div>
          <span className="model-author">
            {es
              ? 'Autor · Luis Javier Navarrete Lozano'
              : 'Author · Luis Javier Navarrete Lozano'}
          </span>
          <p>
            {es
              ? 'Soy el autor de los modelos abiertos de 0dAI publicados como luijait. Fine-tuning, iteración con DPO y variantes cuantizadas, trabajando sobre Mistral y Mixtral con la infraestructura de Omega AI.'
              : 'I am the author of the open 0dAI models published as luijait. Fine-tuning, iteration with DPO and quantized variants, built on Mistral and Mixtral with Omega AI infrastructure.'}
          </p>
        </div>
      </div>
      <div className="model-cabinet">
        <fieldset className="model-index">
          <legend className="sr-only">
            {es ? 'Elegir un modelo publicado' : 'Choose a published model'}
          </legend>
          {openModels.map((item, i) => (
            <Button
              variant="ghost"
              key={item.id}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span>0{i + 1}</span>
              <strong>{item.title}</strong>
              <small>{item.date}</small>
              <ArrowUpRight size={15} />
            </Button>
          ))}
        </fieldset>
        <div
          className="model-specimen"
          data-family={model.family}
          data-precision={selected === 2 ? 4 : selected === 3 ? 8 : 16}
        >
          <div className="specimen-top">
            <span>0dAI / {es ? 'Pesos abiertos' : 'Open weights'}</span>
            <span>{model.date}</span>
          </div>
          <div className="weight-sculpture" aria-hidden="true">
            <div className="weight-assembly">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  className="weight-slab"
                  key={i}
                  style={{ '--slab': i } as CSSProperties}
                >
                  <div>
                    {Array.from({ length: 16 }, (_, j) => (
                      <i key={j} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <span>
              {model.family === 2 ? 'Mixture of experts' : 'Fine-tuning'}
              <br />
              {model.format}
            </span>
          </div>
          <div className="model-specification" aria-live="polite">
            <h5>{model.title}</h5>
            <p>{model[locale]}</p>
            <dl>
              <div>
                <dt>{es ? 'Arquitectura base' : 'Base architecture'}</dt>
                <dd>{model.base}</dd>
              </div>
              <div>
                <dt>{es ? 'Publicación' : 'Release'}</dt>
                <dd>{model.format}</dd>
              </div>
            </dl>
          </div>
          <div className="model-links">
            <a
              href={`https://huggingface.co/0dAI/${model.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {es ? 'Ficha del modelo' : 'Model card'}
              <ArrowUpRight size={16} />
            </a>
            <a
              href={`https://huggingface.co/0dAI/${model.id}/commits/main`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitCommitHorizontal size={16} />
              {es ? 'Mi historial de publicación' : 'My publication history'}
            </a>
          </div>
        </div>
      </div>
      <p className="models-footnote">
        {es
          ? 'Cinco repositorios: modelos y sus variantes. Las fichas y el historial documentan cada publicación.'
          : 'Five repositories: models and their variants. The cards and commit histories document each release.'}
        <a
          href="https://huggingface.co/0dAI"
          target="_blank"
          rel="noopener noreferrer"
        >
          0dAI / Hugging Face
          <ArrowUpRight size={14} />
        </a>
      </p>
    </section>
  );
}
