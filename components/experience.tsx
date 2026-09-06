'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/components/locale';

const ExperienceContext = createContext({ playing: false, toggle: () => {} });

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem('luijait-motion');
      } catch {
        /* Storage is optional. */
      }
      setPlaying(!media.matches && saved !== 'paused');
    };
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = playing ? 'on' : 'off';
  }, [playing]);
  const toggle = () =>
    setPlaying((current) => {
      try {
        localStorage.setItem('luijait-motion', current ? 'paused' : 'playing');
      } catch {
        /* Private browsing. */
      }
      return !current;
    });
  return (
    <ExperienceContext.Provider value={{ playing, toggle }}>
      {children}
    </ExperienceContext.Provider>
  );
}

export const useExperience = () => useContext(ExperienceContext);

export function MotionToggle() {
  const { playing, toggle } = useExperience();
  const { locale } = useLocale();
  const label =
    locale === 'es'
      ? playing
        ? 'Pausar animaciones'
        : 'Activar animaciones'
      : playing
        ? 'Pause animations'
        : 'Enable animations';
  return (
    <Button
      variant="ghost"
      className="motion-toggle"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={playing}
    >
      {playing ? (
        <Pause size={14} aria-hidden="true" />
      ) : (
        <Play size={14} aria-hidden="true" />
      )}
      <span>{locale === 'es' ? 'Movimiento' : 'Motion'}</span>
    </Button>
  );
}
