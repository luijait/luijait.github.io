import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Mi historia — Luijait',
  description:
    'De Villanueva del Arzobispo a TryHackMe: la trayectoria de Luis Javier Navarrete Lozano entre curiosidad, sistemas, productos e investigación.',
  alternates: { canonical: '/historia' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
