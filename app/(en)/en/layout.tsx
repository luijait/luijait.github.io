import type { Metadata } from 'next';
import DocumentLayout, { spanishMetadata } from '@/components/document';
export const metadata: Metadata = {
  ...spanishMetadata,
  title: 'Luijait — AI at TryHackMe · You need to understand',
  description:
    'Luis Javier Navarrete Lozano, Luijait. Models, agents and cybersecurity at TryHackMe / NoScope. My story, research, projects and conversations.',
  alternates: { canonical: '/en/', languages: { es: '/', en: '/en/' } },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DocumentLayout locale="en">{children}</DocumentLayout>;
}
