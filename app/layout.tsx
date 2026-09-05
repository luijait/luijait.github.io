import type { Metadata } from 'next';
import { Geist, Geist_Mono, Newsreader } from 'next/font/google';
import './globals.css';
const geistSans = Geist({variable:'--font-geist-sans',subsets:['latin'],display:'swap'});
const geistMono = Geist_Mono({variable:'--font-geist-mono',subsets:['latin'],display:'swap'});
const newsreader = Newsreader({variable:'--font-newsreader',subsets:['latin'],style:['normal','italic'],display:'swap'});
export const metadata: Metadata = {
  metadataBase: new URL('https://luijait.green-plum-9088.chatgpt.site'),
  title:'Luijait — IA en TryHackMe · Hace falta entender',
  description:'Luis Javier Navarrete Lozano, Luijait. IA y ciberseguridad en TryHackMe / NoScope. Mi historia, investigación, proyectos y conversaciones.',
  authors:[{name:'Luis Javier Navarrete Lozano'}],
  alternates:{canonical:'/'},
  icons:{icon:'/favicon.svg'},
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
  return <html lang="es"><body className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}>{children}</body></html>;
}
