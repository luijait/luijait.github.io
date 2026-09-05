import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Investigación — Luijait',
  alternates: {
    canonical: '/investigacion/',
    languages: { es: '/investigacion/', en: '/en/research/' },
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
