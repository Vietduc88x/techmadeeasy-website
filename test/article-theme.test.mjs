import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

const customArticlePages = [
  '../src/pages/AccessWasAssumed.jsx',
  '../src/pages/DrawingShowedAccess.jsx',
  '../src/pages/FIMvsEPCDecisionSheet.jsx',
  '../src/pages/FoundationBeforeGroundModel.jsx',
  '../src/pages/BOPInteractiveArticle.jsx',
  '../src/pages/RenewableEnergyCosts2024.jsx',
  '../src/pages/FIMImplementationRoadmap.jsx',
  '../src/pages/SolarSupplyChainCost.jsx',
  '../src/pages/DigitalAIPowerSystems.jsx',
];

test('the homepage is a restrained editorial index', async () => {
  const home = await read('../src/pages/Home.jsx');

  assert.match(home, /Selected notes/);
  assert.match(home, /Recent notes/);
  assert.doesNotMatch(home, /WorkbenchPreview|JourneyCard|NewsletterForm|shadow-2xl/);
  assert.ok((home.match(/<section/g) || []).length <= 3);
});

test('the shared article renderer owns header, prose and ending styles', async () => {
  const [blogPost, articleHeader, articleEnding] = await Promise.all([
    read('../src/pages/BlogPost.jsx'),
    read('../src/components/article/ArticleHeader.jsx'),
    read('../src/components/article/ArticleEnding.jsx'),
  ]);

  assert.match(blogPost, /<ArticleHeader/);
  assert.match(blogPost, /article-prose/);
  assert.match(blogPost, /<ArticleEnding/);
  assert.doesNotMatch(blogPost, /bg-gradient-to-br|Subscribe Free|Enjoyed this article|Welcome to the community|Share2/);
  assert.match(articleHeader, /All notes/);
  assert.match(articleHeader, /Duc Hoang, PMP/);
  assert.match(articleEnding, /Continue reading/);
  assert.match(articleEnding, /<NewsletterForm/);
  assert.match(blogPost, /og:image/);
  assert.match(blogPost, /article:published_time/);
});

test('every custom article uses the shared editorial header', async () => {
  const pages = await Promise.all(customArticlePages.map(read));
  pages.forEach((page, index) => {
    assert.match(page, /<ArticleHeader/, customArticlePages[index]);
  });
});

test('shared-header articles do not retain a second page-level heading', async () => {
  const legacyHeadingPages = await Promise.all([
    read('../src/pages/DigitalAIPowerSystems.jsx'),
    read('../src/pages/DrawingShowedAccess.jsx'),
    read('../src/pages/FIMvsEPCDecisionSheet.jsx'),
    read('../src/pages/FoundationBeforeGroundModel.jsx'),
    read('../src/pages/SolarSupplyChainCost.jsx'),
  ]);

  legacyHeadingPages.forEach((page) => assert.doesNotMatch(page, /<h1\b/));
});

test('the shared public article layer contains no private-system residue', async () => {
  const content = (await Promise.all([
    read('../src/pages/Home.jsx'),
    read('../src/pages/BlogPost.jsx'),
    read('../src/components/article/ArticleHeader.jsx'),
    read('../src/components/article/ArticleEnding.jsx'),
  ])).join('\n');

  assert.doesNotMatch(content, /C:\\|\.gbrain|local path|client name|contract value|counterparty/i);
});
