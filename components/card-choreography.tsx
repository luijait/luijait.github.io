'use client';
import { useEffect } from 'react';
import { useExperience } from '@/components/experience';

export function CardChoreography() {
  const { playing } = useExperience();
  useEffect(() => {
    const cards = [
      ...document.querySelectorAll<HTMLElement>(
        '.stack-card, .lab-notebook, .model-specimen',
      ),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const card = entry.target as HTMLElement;
          card.dataset.cardLive = String(
            entry.isIntersecting && playing && !document.hidden,
          );
          if (entry.isIntersecting) card.dataset.cardSeen = 'true';
        }
      },
      { threshold: 0.08 },
    );
    cards.forEach((card) => observer.observe(card));
    const visibility = () => {
      if (document.hidden)
        cards.forEach((card) => {
          card.dataset.cardLive = 'false';
        });
      else
        cards.forEach((card) => {
          observer.unobserve(card);
          observer.observe(card);
        });
    };
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      cards.forEach((card) => {
        card.dataset.cardLive = 'false';
      });
    };
  }, [playing]);
  return null;
}
