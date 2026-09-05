import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Investigación — Luijait',
  description:
    'Siete trabajos en coautoría: CAI, CAIBench, fluency, evaluación y estrategia. Preguntas, contexto y acceso a los papers.',
  alternates: { canonical: '/investigacion' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
