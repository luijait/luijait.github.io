'use client';
import { ArchiveFeature } from '@/components/archive-feature';
import { useLocale } from '@/components/locale';
import { Fragment } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Header, Footer, Motion, OutLink } from '@/components/portfolio';
function timestamp(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = String(seconds % 60).padStart(2, '0');
  return hours
    ? `${hours}:${String(minutes).padStart(2, '0')}:${rest}`
    : `${minutes}:${rest}`;
}
export default function Archive() {
  const { t, path, content } = useLocale();
  const { media, writings } = content;
  const episodes = [...media].sort((a, b) => {
    const date = (e: typeof a) =>
      e.id === '4gQ3pW752EY'
        ? '20240518'
        : e.date.split('.').reverse().join('');
    return date(b).localeCompare(date(a));
  });

  return (
    <>
      <Motion />
      <Header active="archivo" />
      <main id="contenido">
        <section className="inner-hero archive-hero shell">
          <span className="kicker">
            {t('Conversaciones, charlas y notas / 2023—2026')}
          </span>
          <h1>
            {t('Con tiempo')}
            <br />
            <em>{t('para contarlo.')}</em>
          </h1>
          <div className="inner-intro">
            <p>
              {t(
                'Comienzos, ideas, límites y aprendizajes. A veces una conversación explica mejor el camino que cualquier descripción de un cargo.',
              )}
            </p>
            <span className="archive-glyph" aria-hidden="true">
              ↙
            </span>
          </div>
        </section>
        <section className="archive-body shell">
          <ArchiveFeature />
          <Tabs defaultValue="conversaciones" className="archive-tabs">
            <TabsList
              variant="line"
              className="archive-tab-list"
              aria-label={t('Tipo de contenido')}
            >
              <TabsTrigger value="conversaciones">
                {t('Escuchar')}
                <span>10</span>
              </TabsTrigger>
              <TabsTrigger value="notas">
                {t('Leer')}
                <span>03</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="conversaciones">
              <div className="episode-list">
                {episodes.map((episode, i) => (
                  <Fragment key={episode.id}>
                    {(i === 0 ||
                      episodes[i - 1].date.slice(-4) !==
                        episode.date.slice(-4)) && (
                      <h2 className="archive-year">{episode.date.slice(-4)}</h2>
                    )}
                    <a
                      className={`episode ${i === 0 ? 'episode-current' : ''}`}
                      href={`https://www.youtube.com/watch?v=${episode.id}${episode.start ? '&t=' + episode.start + 's' : ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="episode-number">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="episode-copy">
                        <small>
                          {episode.show}
                          {i === 0 && <em>{t('Más reciente')}</em>}
                        </small>
                        <strong>{episode.topic}</strong>
                        <span>
                          {episode.date} · {episode.duration}
                        </span>
                        <span className="episode-entry">
                          ↳{' '}
                          {episode.start
                            ? `${t('Entrar por')} ${timestamp(episode.start)}`
                            : t('Desde el principio')}
                        </span>
                        {episode.note && (
                          <span className="episode-note">{episode.note}</span>
                        )}
                      </span>
                      <span className="episode-play">
                        <Play size={20} />
                        <span className="sr-only">
                          {t('Abrir conversación')}
                        </span>
                      </span>
                    </a>
                  </Fragment>
                ))}
              </div>
              <div className="archive-note">
                {t(
                  'Los enlaces abren la conversación o un pasaje seleccionado. Puedes volver al inicio del vídeo para verla completa.',
                )}
              </div>
            </TabsContent>
            <TabsContent value="notas">
              <div className="writing-list">
                {writings.map((item, i) => (
                  <OutLink
                    href={item.url}
                    key={item.title}
                    className="writing-record"
                  >
                    <span className="writing-number">0{i + 1}</span>
                    <span>
                      <small>
                        {item.publisher} · {item.date}
                      </small>
                      <strong>{item.title}</strong>
                    </span>
                  </OutLink>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          <section className="talks-list">
            <span className="kicker">
              {t('También nos hemos encontrado en')}
            </span>
            <div>
              <OutLink href="https://aibirras.org/events">AiBirras</OutLink>
              <OutLink href="https://github.com/luijait/0dAI-Morteruelo-CON">
                Morteruelo 2024
              </OutLink>
              <OutLink href="https://www.iesvirgendelcarmen.com/charla-pentesting-curso-de-especializacion-en-ciberseguridad-y-asir/">
                IES Virgen del Carmen
              </OutLink>
              <OutLink href="https://www.gradobliss.com/profesionales/expert-board">
                Expert Board · BLISS
              </OutLink>
            </div>
          </section>
          <a className="next-chapter" href={path('/')}>
            <span>
              {t('Volver a lo que construyo')}
              <strong>{t('Trabajo seleccionado')}</strong>
            </span>
            <ArrowUpRight size={36} />
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
