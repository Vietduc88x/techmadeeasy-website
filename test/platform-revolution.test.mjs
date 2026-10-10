import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import test from 'node:test';
import { blogPostsBySlug } from '../src/data/posts.js';
import { getLibraryPosts } from '../src/data/playbookJourney.js';

test('the withdrawn article is absent from discovery and public article files', async () => {
  const slug = 'platform-revolution-meets-defi';
  assert.equal(blogPostsBySlug[slug], undefined);
  assert.ok(!getLibraryPosts('off-site').some((entry) => entry.slug === slug));
  await assert.rejects(access(new URL(`../public/articles/${slug}.html`, import.meta.url)), { code: 'ENOENT' });
  const lifeThesis = await readFile(new URL('../public/articles/life-thesis.html', import.meta.url), 'utf8');
  assert.doesNotMatch(lifeThesis, /platform-revolution-meets-defi|Platform Revolution/);
  const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
  assert.ok(!sitemap.includes(slug));
});

test('old article URLs return a noindex removal page before the SPA fallback', async () => {
  const redirects = await readFile(new URL('../public/_redirects', import.meta.url), 'utf8');
  const rules = redirects.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith('#'));
  for (const path of [
    '/articles/platform-revolution-meets-defi.html',
    '/articles/platform-revolution-meets-defi',
    '/articles/platform-revolution-meets-defi/*',
    '/blog/platform-revolution-meets-defi',
    '/blog/platform-revolution-meets-defi/*',
  ]) {
    const index = rules.findIndex((line) => line.split(/\s+/)[0] === path);
    assert.ok(index >= 0 && index < rules.findIndex((line) => line.startsWith('/* ')));
    assert.deepEqual(rules[index].split(/\s+/).slice(1), ['/article-removed.html', '404!']);
  }
  const page = await readFile(new URL('../public/article-removed.html', import.meta.url), 'utf8');
  assert.match(page, /name="robots" content="noindex, follow"/);
  assert.match(page, /<h1>Article removed<\/h1>/);
  assert.match(page, /href="\/blog"/);
});
