import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Mi historia — Luijait',
  alternates: {
    canonical: '/historia/',
    languages: { es: '/historia/', en: '/en/story/' },
  },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
