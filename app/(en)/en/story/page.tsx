import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'My story — Luijait',
  description:
    'From a notebook full of C and hundreds of practice machines to models, agents and TryHackMe. The story of Luis Javier Navarrete Lozano.',
  alternates: {
    canonical: '/en/story/',
    languages: { es: '/historia/', en: '/en/story/' },
  },
};
export { default } from '@/app/(es)/historia/page';
