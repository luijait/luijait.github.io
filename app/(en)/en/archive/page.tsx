import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Conversations and writing — Luijait',
  description:
    'Podcasts, talks and articles by Luis Javier Navarrete Lozano. Ideas, research and the story behind the work.',
  alternates: {
    canonical: '/en/archive/',
    languages: { es: '/archivo/', en: '/en/archive/' },
  },
};
export { default } from '@/app/(es)/archivo/page';
