'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLocale } from '@/components/locale';

const projects = [
  { id: 'tryhackme', label: 'TryHackMe / NoScope' },
  { id: '0dai', label: '0dAI / ML' },
  { id: 'cai', label: 'CAI / CAIBench' },
  { id: 'blurtain', label: 'Blurtain' },
];

export function WorkIndex() {
  const { locale } = useLocale();
  const [active, setActive] = useState('tryhackme');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-25% 0px -50% 0px' },
    );
    projects.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <nav
      className="work-index"
      aria-label={locale === 'es' ? 'Índice de proyectos' : 'Project index'}
    >
      {projects.map((project, index) => (
        <a
          href={`#${project.id}`}
          key={project.id}
          aria-current={active === project.id ? 'location' : undefined}
        >
          <span>0{index + 1}</span>
          <strong>{project.label}</strong>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
