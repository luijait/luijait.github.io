import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Research — Luijait',
  description:
    'Coauthored research on CAI, cybersecurity AI evaluation, education and strategy, with publication versions and sources from my work with Alias Robotics.',
  alternates: {
    canonical: '/en/research/',
    languages: { es: '/investigacion/', en: '/en/research/' },
  },
};
export { default } from '@/app/(es)/investigacion/page';
