import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { blogPosts, getCategories } from '../src/data/posts.js';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

const taxonomy = [
  'Preconstruction',
  'Contracts & Packages',
  'Constructability',
  'Cost & Schedule',
  'Solar + BESS',
  'Wind + FPV',
  'Off-site',
];

test('site chrome consistently presents energy-delivery field notes', async () => {
  const [index, footer, blog, about, newsletter, blogPost, newsletterFunction] = await Promise.all([
    read('../index.html'),
    read('../src/components/Footer.jsx'),
    read('../src/pages/Blog.jsx'),
    read('../src/pages/About.jsx'),
    read('../src/components/NewsletterForm.jsx'),
    read('../src/pages/BlogPost.jsx'),
    read('../netlify/functions/newsletter.py'),
  ]);

  assert.match(index, /Field notes from an energy PM/);
  assert.doesNotMatch(index, /Making Technology Accessible|AI, and Digital Twins/);

  assert.match(footer, /Field notes on preconstruction, packages, and delivery/);
  assert.doesNotMatch(footer, /Crypto Network|Artificial Intelligence|technology education/);

  assert.match(blog, /Energy project delivery/);
  assert.match(blog, /Mostly preconstruction, constructability, contracts, packages, cost and schedule/);
  assert.doesNotMatch(blog, /Latest Insights|digital age/);

  for (const content of [about, newsletter, blogPost, newsletterFunction]) {
    assert.doesNotMatch(content, /5,000\+|weekly insights|next Tuesday|Making Technology Accessible/i);
  }
  assert.doesNotMatch(about, /Years across renewable-energy delivery|Articles and playbooks|Delivery focus, with wider APAC advisory work/);
  assert.match(about, /id="contact"/);
});

test('all posts use the new ordered taxonomy', () => {
  assert.equal(blogPosts.length, 45);
  assert.deepEqual(getCategories().map(({ name }) => name), ['All', ...taxonomy]);
  assert.deepEqual([...new Set(blogPosts.map(({ category }) => category))].sort(), [...taxonomy].sort());
});

test('signature playbooks have a unique explicit rank', () => {
  const featured = blogPosts
    .filter(({ featuredRank }) => featuredRank)
    .sort((a, b) => a.featuredRank - b.featuredRank);

  assert.deepEqual(featured.map(({ featuredRank }) => featuredRank), [1, 2, 3, 4, 5, 6]);
  assert.deepEqual(featured.map(({ slug }) => slug), [
    'foundation-before-ground-model',
    'drawing-showed-access',
    'access-was-assumed',
    'fim-vs-epc-decision-sheet',
    'time-management-starts-drawing-board',
    'construction-of-the-intertidal-wind-farm',
  ]);
});
