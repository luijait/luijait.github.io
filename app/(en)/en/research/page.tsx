import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Research — Luijait',
  description:
    'Seven coauthored papers on CAI, cybersecurity AI evaluation, education and strategy, from my work with Alias Robotics.',
  alternates: {
    canonical: '/en/research/',
    languages: { es: '/investigacion/', en: '/en/research/' },
  },
};
export { default } from '@/app/(es)/investigacion/page';
