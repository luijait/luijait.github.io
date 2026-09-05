'use client';
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
import { cases } from '@/app/content';

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
export function Header({ active = 'trabajo' }: { active?: string }) {
  const [hex, setHex] = useState(false);
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <header className="site-nav shell">
        <div className="brand-group">
          <a className="brand" href="/" aria-label="Luijait, inicio">
            luijait<span>_</span>
          </a>
          <Button
            variant="ghost"
            className="hex-button"
            onClick={() => setHex(!hex)}
            aria-label={
              hex
                ? 'Ocultar alias hexadecimal'
                : 'Descubrir el alias en hexadecimal'
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
        <nav aria-label="Principal">
          {[
            { id: 'trabajo', url: '/#trabajo', label: 'Trabajo' },
            { id: 'historia', url: '/historia', label: 'Mi historia' },
            {
              id: 'investigacion',
              url: '/investigacion',
              label: 'Investigación',
            },
            { id: 'archivo', url: '/archivo', label: 'Archivo' },
          ].map((item) => (
            <a
              key={item.id}
              href={item.url}
              className={active === item.id ? 'active' : ''}
              aria-current={active === item.id ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="nav-contact" href="#contacto">
          Hablemos <ArrowUpRight size={16} />
        </a>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer id="contacto" className="contact-scene">
      <div className="shell">
        <div className="contact-top">
          <span className="kicker">¿Lo hablamos?</span>
          <span className="contact-status">
            <i /> Siempre hay una buena pregunta.
          </span>
        </div>
        <h2>
          La próxima idea
          <br />
          puede empezar
          <br />
          <em>por aquí.</em>
          <ArrowUpRight aria-hidden="true" />
        </h2>
        <div className="contact-actions">
          <OutLink
            href="https://es.linkedin.com/in/luis-javier-navarrete-lozano-9187852b9"
            className="contact-button"
          >
            Escríbeme en LinkedIn
          </OutLink>
          <OutLink href="https://x.com/luijait_" className="contact-x">
            O nos vemos en X / @luijait_
          </OutLink>
        </div>
        <div className="site-footer">
          <a href="/">Luis Javier Navarrete Lozano</a>
          <OutLink href="https://github.com/luijait">GitHub</OutLink>
          <a href="#">Volver arriba ↑</a>
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
  const item = cases.find((c) => c.id === caseId) || cases[0];
  return (
    <Sheet>
      <SheetTrigger
        render={<Button variant="ghost" className={className} />}
        aria-label={`Explorar ${item.name}`}
      >
        {children || (
          <>
            Ver el proyecto <Plus size={18} />
          </>
        )}
      </SheetTrigger>
      <SheetContent className="case-reader" showCloseButton={false}>
        <div className="reader-bar">
          <span className="kicker">{item.period} / Mirar dentro</span>
          <SheetClose className="reader-close" aria-label="Cerrar proyecto">
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
            <span className="kicker">El trabajo y su contexto</span>
            {item.links.map((link) => (
              <OutLink key={link.url} href={link.url}>
                {link.label}
              </OutLink>
            ))}
          </div>
          <SheetClose className="reader-return">
            <ArrowLeft size={18} /> Volver al portfolio
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
