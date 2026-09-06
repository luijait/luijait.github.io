'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';
import * as spanish from '@/app/content';
import * as english from '@/app/content.en';
import translations from '@/app/ui.en.json';
import { portraits as spanishPortraits } from '@/app/portraits';

export type Locale = 'es' | 'en';
const LocaleContext = createContext<Locale>('es');

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

const paths: Record<string, string> = {
  '/': '/en/',
  '/historia': '/en/story/',
  '/investigacion': '/en/research/',
  '/archivo': '/en/archive/',
};

export function localizedPath(url: string, locale: Locale) {
  const index = url.search(/[?#]/);
  const pathname = index < 0 ? url : url.slice(0, index);
  const suffix = index < 0 ? '' : url.slice(index);
  const normalized = pathname.replace(/\/$/, '') || '/';
  const path =
    locale === 'en'
      ? paths[normalized]
      : normalized === '/'
        ? '/'
        : `${normalized}/`;
  return (path || pathname) + suffix;
}

const portraitText = [
  {
    detail: 'A conversation',
    alt: 'Luis during his conversation on La Jaula del N00b, published in 2023.',
  },
  {
    detail: 'On stage',
    alt: 'Luis speaking at AiBirras in Granada, November 2024.',
  },
  {
    detail: 'Sharing what I learned',
    alt: 'Luis speaking with students at IES Virgen del Carmen, May 2025.',
  },
  {
    label: 'Around here, I’m Luija.',
    detail: 'Profile viewed in 2026',
    alt: 'Luis’s current X profile portrait, checked in September 2026.',
  },
];
const englishPortraits = spanishPortraits.map((photo, i) => ({
  ...photo,
  ...portraitText[i],
}));

export function useLocale() {
  const locale = useContext(LocaleContext);
  return {
    locale,
    t: (text: keyof typeof translations) =>
      locale === 'en' ? translations[text] : text,
    path: (url: string) => localizedPath(url, locale),
    content: locale === 'en' ? english : spanish,
    portraits: locale === 'en' ? englishPortraits : spanishPortraits,
  };
}
