import DocumentLayout, { spanishMetadata } from '@/components/document';
export const metadata = spanishMetadata;
export default function Layout({ children }: { children: React.ReactNode }) {
  return <DocumentLayout locale="es">{children}</DocumentLayout>;
}
