import fs from 'node:fs/promises';
import path from 'node:path';
const aliases = JSON.parse(await fs.readFile('src/data/aliases.json', 'utf8'));
const html = await fs.readFile('dist/index.html', 'utf8');
// Real HTML entry files keep old bookmarks usable on simple static hosts.
const routes = new Set([...Object.keys(aliases), ...Object.values(aliases)]);
for (const route of routes) {
  if (route === '/' || route === '/index.html' || route.endsWith('.php')) continue;
  const file = route.endsWith('.html') ? route.slice(1) : `${route.slice(1)}/index.html`;
  const output = path.join('dist', file);
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, html);
}
await fs.writeFile('dist/404.html', html);
console.log(`Static entries generated for ${routes.size} routes.`);
