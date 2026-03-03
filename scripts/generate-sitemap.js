/**
 * Auto-generates sitemap.xml from blog post data at build time.
 * Run: node scripts/generate-sitemap.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Extract slugs from posts.js by regex (avoids needing full ESM import of JSX-adjacent code)
const postsSource = readFileSync(resolve(ROOT, 'src/data/posts.js'), 'utf-8');
const slugMatches = [...postsSource.matchAll(/slug:\s*['"]([^'"]+)['"]/g)];
const slugs = slugMatches.map((m) => m[1]);

const today = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { path: '/', priority: '1.0' },
  { path: '/blog', priority: '0.9' },
  { path: '/about', priority: '0.8' },
  { path: '/contact', priority: '0.7' },
  { path: '/fim-revolution', priority: '0.7' },
  { path: '/blog/bop-interactive-article', priority: '0.7' },
  { path: '/blog/renewable-energy-costs-2024', priority: '0.7' },
  { path: '/blog/fim-implementation-roadmap', priority: '0.7' },
];

const blogRoutes = slugs.map((slug) => ({
  path: `/blog/${slug}`,
  priority: '0.8',
}));

const allRoutes = [...staticRoutes, ...blogRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (r) => `  <url>
    <loc>https://techmadeeasy.info${r.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(ROOT, 'public/sitemap.xml'), sitemap, 'utf-8');
console.log(`Sitemap generated with ${allRoutes.length} URLs (${slugs.length} blog posts + ${staticRoutes.length} static pages)`);
