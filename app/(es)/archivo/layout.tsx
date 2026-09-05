import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Conversaciones y notas — Luijait',
  alternates: {
    canonical: '/archivo/',
    languages: { es: '/archivo/', en: '/en/archive/' },
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
