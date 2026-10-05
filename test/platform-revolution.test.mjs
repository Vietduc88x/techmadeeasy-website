import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { blogPostsBySlug } from '../src/data/posts.js';
import { getLibraryPosts } from '../src/data/playbookJourney.js';

test('the Platform Revolution link resolves to the full archive with its original date', async () => {
  const slug = 'platform-revolution-meets-defi';
  const post = blogPostsBySlug[slug];
  assert.ok(post, 'the URL linked from Life Thesis must remain registered');
  assert.equal(post.dateSort, '2026-02-08');
  assert.equal(post.legacyPath, `/articles/${slug}.html`);
  assert.ok(getLibraryPosts('off-site').some((entry) => entry.slug === slug));

  const article = await readFile(new URL(`../public${post.legacyPath}`, import.meta.url), 'utf8');
  assert.match(article, /<h1>Platform Revolution/);
  assert.match(article, /<time datetime="2026-02-08">8 February 2026<\/time>/);
  assert.match(article, /property="article:published_time" content="2026-02-08"/);
  assert.match(article, /"datePublished": "2026-02-08"/);
  assert.match(article, /Final Thoughts: The Asymmetric Bet/);
  assert.match(article, /id="tip-sol"/);
  assert.match(article, /id="tip-hype"/);
  assert.match(article, /id="tip-near"/);
  assert.match(article, /new IntersectionObserver/);

  const lifeThesis = await readFile(new URL('../public/articles/life-thesis.html', import.meta.url), 'utf8');
  assert.match(lifeThesis, /href="\/blog\/platform-revolution-meets-defi"/);
});
