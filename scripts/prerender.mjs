/**
 * Post-build SSG script: pre-renders all routes to static HTML.
 * Run after `vite build` and `vite build --ssr`.
 *
 * Usage: node scripts/prerender.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// ---------------------------------------------------------------------------
// 1. Collect all routes to prerender
// ---------------------------------------------------------------------------
const postsSource = readFileSync(resolve(ROOT, 'src/data/posts.js'), 'utf-8');
const slugs = [...postsSource.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);

const staticRoutes = [
  '/',
  '/blog',
  '/about',
  '/contact',
  '/fim-revolution',
  '/blog/bop-interactive-article',
  '/blog/renewable-energy-costs-2024',
  '/blog/fim-implementation-roadmap',
];

const blogRoutes = slugs.map((s) => `/blog/${s}`);
const allRoutes = [...new Set([...staticRoutes, ...blogRoutes])]; // dedupe

// ---------------------------------------------------------------------------
// 2. Load template & SSR bundle
// ---------------------------------------------------------------------------
const template = readFileSync(resolve(ROOT, 'dist/index.html'), 'utf-8');

if (!template.includes('<!--ssr-outlet-->')) {
  throw new Error(
    'dist/index.html is already prerendered. Run the full build before running this script again.',
  );
}

const ssrModule = await import(
  pathToFileURL(resolve(ROOT, 'dist-ssr/entry-server.js')).href
);
const { render } = ssrModule;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function removeExistingHeadTags(page, helmetMeta = '') {
  const keys = [...helmetMeta.matchAll(/<meta\b[^>]*(?:name|property)="([^"]+)"[^>]*>/gi)]
    .map((match) => match[1]);

  return [...new Set(keys)].reduce((currentPage, key) => {
    const escapedKey = escapeRegExp(key);
    const existingTag = new RegExp(
      `<meta\\b(?=[^>]*(?:name|property)="${escapedKey}")[^>]*>\\s*`,
      'gi',
    );
    return currentPage.replace(existingTag, '');
  }, page);
}

// ---------------------------------------------------------------------------
// 3. Render each route and write to dist/
// ---------------------------------------------------------------------------
let success = 0;
let failed = 0;

for (const route of allRoutes) {
  try {
    const { html, helmet } = await render(route);

    let page = template.replace('<!--ssr-outlet-->', html);

    // Inject per-page <head> tags from react-helmet-async
    if (helmet) {
      // Replace the default <title> with the page-specific one
      const helmetTitle = helmet.title?.toString();
      if (helmetTitle) {
        page = page.replace(
          /<title>[^<]*<\/title>/,
          helmetTitle
        );
      }

      const helmetMeta = helmet.meta?.toString();
      page = removeExistingHeadTags(page, helmetMeta);

      // Replace default canonical with page-specific one
      const helmetLink = helmet.link?.toString();
      if (helmetLink && helmetLink.includes('canonical')) {
        page = page.replace(
          /<link\b(?=[^>]*rel="canonical")[^>]*>\s*/gi,
          '' // Remove default; Helmet's canonical is injected below
        );
      }

      const headTags = [
        helmetMeta,
        helmetLink,
        helmet.script?.toString(),
      ]
        .filter(Boolean)
        .join('\n    ');

      if (headTags) {
        page = page.replace('</head>', `    ${headTags}\n  </head>`);
      }
    }

    // Write file
    const outDir = route === '/' ? 'dist' : `dist${route}`;
    mkdirSync(resolve(ROOT, outDir), { recursive: true });

    const outPath =
      route === '/'
        ? resolve(ROOT, 'dist/index.html')
        : resolve(ROOT, outDir, 'index.html');

    writeFileSync(outPath, page.replace(/\r\n?/g, '\n'), 'utf-8');
    success++;
  } catch (err) {
    console.error(`  [SKIP] ${route}: ${err.message}`);
    failed++;
  }
}

console.log(
  `Prerender complete: ${success} pages rendered, ${failed} failed (${allRoutes.length} total routes)`
);

if (failed > 0) process.exitCode = 1;
