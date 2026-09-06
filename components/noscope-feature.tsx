'use client';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { useLocale } from '@/components/locale';
import { ProjectObject } from '@/components/project-object';
import { CaseReader, OutLink } from '@/components/portfolio';
import { Button } from '@/components/ui/button';

export function NoScopeFeature() {
  const { locale } = useLocale();
  const es = locale === 'es';
  const [stage, setStage] = useState(0);
  const pillars = es
    ? [
        {
          label: 'Continuidad',
          title: 'El software cambia. La evaluación también.',
          text: 'Pentesting continuo con agentes de IA, conectado al ritmo al que los equipos desarrollan sus aplicaciones.',
        },
        {
          label: 'Contexto',
          title: 'Comprender una aplicación entera.',
          text: 'Una visión de sus páginas, entradas y recorridos para que la evaluación tenga el contexto del producto.',
        },
        {
          label: 'Autonomía',
          title: 'El trabajo avanza por sí mismo.',
          text: 'Agentes que realizan el pentesting de forma totalmente autónoma. El equipo conserva el control del alcance y de las decisiones de producto.',
        },
      ]
    : [
        {
          label: 'Continuity',
          title: 'Software changes. Assessment should, too.',
          text: 'Continuous AI pentesting that follows the pace at which teams develop their applications.',
        },
        {
          label: 'Context',
          title: 'Understanding the whole application.',
          text: 'A view across pages, inputs and user journeys brings product context to the assessment.',
        },
        {
          label: 'Autonomy',
          title: 'The work moves forward on its own.',
          text: 'Agents carry out pentesting fully autonomously. The team retains control over scope and product decisions.',
        },
      ];
  return (
    <article className="stack-card thm-card noscope-feature" id="tryhackme">
      <div className="card-top">
        <span className="card-status">
          <i />
          {es ? 'Aquí estoy construyendo ahora' : 'Where I am building today'}
        </span>
        <span className="kicker">TryHackMe / NoScope</span>
      </div>
      <div className="noscope-lead">
        <div className="project-copy">
          <span className="project-overline">
            AI engineering · {es ? 'Mi etapa actual' : 'My current chapter'}
          </span>
          <h3>
            Pentesting.
            <br />
            <em>{es ? 'Totalmente autónomo.' : 'Fully autonomous.'}</em>
          </h3>
          <p>
            {es
              ? 'En NoScope estamos construyendo un producto de pentesting totalmente autónomo y continuo, basado en agentes de IA. Formo parte del equipo que convierte esa investigación en tecnología que otros equipos pueden utilizar.'
              : 'At NoScope, we are building a fully autonomous, continuous pentesting product powered by AI agents. I am part of the team turning that research into technology other teams can use.'}
          </p>
          <div className="noscope-actions">
            <CaseReader caseId="noscope">
              {es ? 'Mi trabajo en NoScope' : 'My work at NoScope'}
              <ArrowUpRight size={19} />
            </CaseReader>
            <a href="#noscope-product">
              {es ? 'Lo que estamos construyendo' : 'What we are building'}
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
        <ProjectObject kind="lens" stage={stage} onStageChange={setStage} />
      </div>
      <div className="noscope-product" id="noscope-product">
        <div className="noscope-product-heading">
          <span className="kicker">
            {es ? 'El producto, en tres ideas' : 'The product, in three ideas'}
          </span>
          <span>{es ? 'Construido en equipo' : 'Built as a team'}</span>
        </div>
        <fieldset className="noscope-pillars">
          <legend className="sr-only">
            {es ? 'Explorar NoScope' : 'Explore NoScope'}
          </legend>
          {pillars.map((pillar, i) => (
            <Button
              variant="ghost"
              key={pillar.label}
              aria-pressed={stage === i}
              onClick={() => setStage(i)}
            >
              <span className="pillar-number">
                0{i + 1}
                <ArrowUpRight size={17} />
              </span>
              <strong>{pillar.label}</strong>
              <span>{pillar.title}</span>
            </Button>
          ))}
        </fieldset>
        <div className="noscope-explanation" aria-live="polite">
          <span aria-hidden="true">↳</span>
          <p key={stage}>{pillars[stage].text}</p>
        </div>
      </div>
      <div className="noscope-contribution">
        <div>
          <span className="kicker">
            {es ? 'Mi aportación' : 'My contribution'}
          </span>
          <h4>
            {es
              ? 'Modelos. Agentes. Ingeniería de IA.'
              : 'Models. Agents. AI engineering.'}
          </h4>
        </div>
        <p>
          {es
            ? 'Antes aprendía resolviendo máquinas en TryHackMe. Hoy investigo y desarrollo IA en NoScope. Trabajo donde se encuentran los modelos, los agentes y el producto.'
            : 'I used to learn by solving machines on TryHackMe. Today I research and develop AI at NoScope, where models, agents and product meet.'}
        </p>
      </div>
      <div className="card-bottom">
        <OutLink href="https://www.noscope.com/">
          {es ? 'Conocer NoScope' : 'Explore NoScope'}
        </OutLink>
        <OutLink href="https://www.noscope.com/company">
          {es ? 'El equipo del que formo parte' : 'The team I am part of'}
        </OutLink>
        <span>01 / 04</span>
      </div>
    </article>
  );
}
