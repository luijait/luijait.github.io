import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Conversaciones y notas — Luijait',
  description:
    'Podcasts, charlas y artículos de Luis Javier Navarrete Lozano. Diez conversaciones sobre su trayectoria, IA y ciberseguridad.',
  alternates: { canonical: '/archivo' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
