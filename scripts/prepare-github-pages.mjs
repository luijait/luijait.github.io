import { readFile, mkdir, copyFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

// This Vinext version skips slash redirects during static export. Export
// extension-based HTML, then also expose directory indexes for GitHub Pages.
const directory = resolve('dist/client');
const routes = [
  '/',
  '/historia',
  '/investigacion',
  '/archivo',
  '/en',
  '/en/story',
  '/en/research',
  '/en/archive',
];
for (const route of routes) {
  const source = resolve(
    directory,
    route === '/' ? 'index.html' : `${route.slice(1)}.html`,
  );
  const html = await readFile(source, 'utf8');
  const language = route.startsWith('/en') ? 'en' : 'es';
  if (
    !html.includes(`<html lang="${language}"`) ||
    !html.includes('id="contenido"')
  ) {
    throw new Error(`Incomplete or incorrectly localized export: ${route}`);
  }
  if (!html.includes('https://luijait.es')) {
    throw new Error(`Incorrect publication origin: ${route}`);
  }
  if (route !== '/') {
    const target = resolve(directory, route.slice(1), 'index.html');
    await mkdir(dirname(target), { recursive: true });
    await copyFile(source, target);
  }
}
await writeFile(resolve(directory, '.nojekyll'), '');
await writeFile(resolve(directory, 'CNAME'), 'luijait.es\n');
console.log(`Prepared ${routes.length} complete pages in Spanish and English.`);
