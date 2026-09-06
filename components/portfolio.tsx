'use client';
import { useLocale, localizedPath } from '@/components/locale';
import { useEffect, useState, type ReactNode, type CSSProperties } from 'react';
import { ArrowUpRight, ArrowLeft, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet';

export function OutLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
const socialProfiles = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: 'https://es.linkedin.com/in/luis-javier-navarrete-lozano-9187852b9',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    href: 'https://www.instagram.com/luijait',
    path: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.741 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.741 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.259 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z',
  },
  {
    id: 'x',
    name: 'X',
    href: 'https://x.com/luijait_',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    id: 'mastodon',
    name: 'Mastodon',
    href: 'https://privacidad.me/@luijait',
    path: 'M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z',
  },
];
export function SocialLinks() {
  const { t } = useLocale();
  return (
    <div className="social-links" aria-label={t('Perfiles')} role="navigation">
      {socialProfiles.map((profile) => (
        <a
          key={profile.id}
          href={profile.href}
          target="_blank"
          rel="noopener noreferrer me"
          aria-label={profile.name}
          title={profile.name}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d={profile.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
export function Header({ active = 'trabajo' }: { active?: string }) {
  const { t, path, locale } = useLocale();
  const [hex, setHex] = useState(false);
  return (
    <>
      <a className="skip-link" href="#contenido">
        {t('Saltar al contenido')}
      </a>
      <header className="site-nav shell">
        <div className="brand-group">
          <a
            className="brand"
            href={path('/')}
            aria-label={t('Luijait, inicio')}
          >
            luijait<span>_</span>
          </a>
          <Button
            variant="ghost"
            className="hex-button"
            onClick={() => setHex(!hex)}
            aria-label={
              hex
                ? t('Ocultar alias hexadecimal')
                : t('Descubrir el alias en hexadecimal')
            }
            aria-expanded={hex}
            aria-controls="alias-code"
          >
            0x
          </Button>
          <span
            id="alias-code"
            className={`hex-code ${hex ? 'revealed' : ''}`}
            aria-live="polite"
          >
            {hex ? '0x6c75696a616974 = luijait' : ''}
          </span>
        </div>
        <nav aria-label={t('Principal')}>
          {[
            { id: 'trabajo', url: '/#trabajo', label: t('Trabajo') },
            { id: 'historia', url: '/historia', label: t('Mi historia') },
            {
              id: 'investigacion',
              url: '/investigacion',
              label: t('Investigación'),
            },
            { id: 'archivo', url: '/archivo', label: t('Archivo') },
          ].map((item) => (
            <a
              key={item.id}
              href={path(item.url)}
              className={active === item.id ? 'active' : ''}
              aria-current={active === item.id ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-utilities">
          <SocialLinks />
          <div
            className="language-links"
            role="navigation"
            aria-label={t('Idioma')}
          >
            {(['es', 'en'] as const).map((language) => (
              <a
                key={language}
                href={localizedPath(
                  active === 'trabajo' ? '/' : `/${active}`,
                  language,
                )}
                hrefLang={language}
                lang={language}
                aria-label={language === 'es' ? 'Español' : 'English'}
                aria-current={locale === language ? 'page' : undefined}
              >
                {language.toUpperCase()}
              </a>
            ))}
          </div>
          <a className="nav-contact" href="#contacto">
            {t('Hablemos')}
            <ArrowUpRight size={16} />
          </a>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  const { t, path } = useLocale();
  return (
    <footer id="contacto" className="contact-scene">
      <div className="shell">
        <div className="contact-top">
          <span className="kicker">{t('¿Lo hablamos?')}</span>
          <span className="contact-status">
            <i />
            {t('Siempre hay una buena pregunta.')}
          </span>
        </div>
        <h2>
          {t('La próxima idea')}
          <br />
          {t('puede empezar')}
          <br />
          <em>{t('por aquí.')}</em>
          <ArrowUpRight aria-hidden="true" />
        </h2>
        <div className="contact-actions">
          <OutLink
            href="https://es.linkedin.com/in/luis-javier-navarrete-lozano-9187852b9"
            className="contact-button"
          >
            {t('Escríbeme en LinkedIn')}
          </OutLink>
          <OutLink href="https://x.com/luijait_" className="contact-x">
            {t('O nos vemos en X / @luijait_')}
          </OutLink>
        </div>
        <div className="site-footer">
          <a href={path('/')}>Luis Javier Navarrete Lozano</a>
          <OutLink href="https://es.linkedin.com/in/luis-javier-navarrete-lozano-9187852b9">
            LinkedIn
          </OutLink>
          <OutLink href="https://github.com/luijait">GitHub</OutLink>
          <a href="#">{t('Volver arriba ↑')}</a>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
export function Motion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    root.classList.add('motion-ready');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            e.target.classList.add('has-entered');
            observer.unobserve(e.target);
          }
      },
      { threshold: 0.07 },
    );
    document
      .querySelectorAll('[data-enter]')
      .forEach((el) => observer.observe(el));
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        root.style.setProperty(
          '--read',
          String(max > 0 ? window.scrollY / max : 0),
        );
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      root.classList.remove('motion-ready');
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
    };
  }, []);
  return <div className="read-line" aria-hidden="true" />;
}
export function CaseReader({
  caseId,
  children,
  className = 'case-button',
}: {
  caseId: string;
  children?: ReactNode;
  className?: string;
}) {
  const { t, content } = useLocale();
  const item = content.cases.find((c) => c.id === caseId) || content.cases[0];
  return (
    <Sheet>
      <SheetTrigger
        render={<Button variant="ghost" className={className} />}
        aria-label={`${t('Explorar')} ${item.name}`}
      >
        {children || (
          <>
            {t('Ver el proyecto')}
            <Plus size={18} />
          </>
        )}
      </SheetTrigger>
      <SheetContent className="case-reader" showCloseButton={false}>
        <div className="reader-bar">
          <span className="kicker">
            {item.period}
            {t('/ Mirar dentro')}
          </span>
          <SheetClose
            className="reader-close"
            aria-label={t('Cerrar proyecto')}
          >
            <X size={22} />
          </SheetClose>
        </div>
        <div className="reader-scroll">
          <SheetHeader className="reader-header">
            <span className="kicker">{item.category}</span>
            <SheetTitle className="reader-title">{item.name}</SheetTitle>
            <SheetDescription className="reader-description">
              {item.intro}
            </SheetDescription>
            <p className="reader-role">{item.role}</p>
          </SheetHeader>
          <div>
            {item.chapters.map((chapter, index) => (
              <section
                className="reader-chapter"
                key={chapter.label}
                style={{ '--delay': `${index * 75}ms` } as CSSProperties}
              >
                <span className="kicker">{chapter.label}</span>
                <h3>{chapter.title}</h3>
                <p>{chapter.text}</p>
              </section>
            ))}
          </div>
          <div className="reader-sources">
            <span className="kicker">{t('El trabajo y su contexto')}</span>
            {item.links.map((link) => (
              <OutLink key={link.url} href={link.url}>
                {link.label}
              </OutLink>
            ))}
          </div>
          <SheetClose className="reader-return">
            <ArrowLeft size={18} />
            {t('Volver al portfolio')}
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
