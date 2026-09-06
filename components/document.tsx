import type { Metadata } from 'next';
import { Geist, Geist_Mono, Newsreader } from 'next/font/google';
import '@/app/globals.css';
import '@/app/editorial.css';
import { LocaleProvider } from '@/components/locale';
import { ExperienceProvider } from '@/components/experience';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});
const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});
export const spanishMetadata: Metadata = {
  metadataBase: new URL(
    process.env.DEPLOY_TARGET === 'github'
      ? 'https://luijait.es'
      : 'https://luijait.luis-javier38024.chatgpt.site',
  ),
  title: 'Luijait — IA en TryHackMe · Hace falta entender',
  description:
    'Luis Javier Navarrete Lozano, Luijait. IA y ciberseguridad en TryHackMe / NoScope. Mi historia, investigación, proyectos y conversaciones.',
  authors: [{ name: 'Luis Javier Navarrete Lozano' }],
  alternates: { canonical: '/', languages: { es: '/', en: '/en/' } },
  icons: { icon: '/favicon.svg' },
};
export default function DocumentLayout({
  children,
  locale,
}: Readonly<{ children: React.ReactNode; locale: 'es' | 'en' }>) {
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
      >
        <LocaleProvider locale={locale}>
          <ExperienceProvider>{children}</ExperienceProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
