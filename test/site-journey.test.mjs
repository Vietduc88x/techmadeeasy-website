import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('the playbook journey separates delivery work from the off-site notebook', async () => {
  const { START_HERE_SLUGS, getLibraryPosts } = await import('../src/data/playbookJourney.js');

  assert.deepEqual(START_HERE_SLUGS, [
    'access-was-assumed',
    'drawing-showed-access',
    'fim-vs-epc-decision-sheet',
  ]);

  const playbooks = getLibraryPosts('playbooks');
  const offSite = getLibraryPosts('off-site');
  assert.ok(playbooks.length > 0);
  assert.ok(offSite.length > 0);
  assert.ok(playbooks.every(({ category }) => category !== 'Off-site'));
  assert.ok(offSite.every(({ category }) => category === 'Off-site'));
  assert.equal(playbooks.length + offSite.length, 45);
});

test('the homepage offers a simple, natural route into the notes', async () => {
  const home = await read('../src/pages/Home.jsx');

  assert.match(home, /Selected notes/);
  assert.match(home, /A practical place to begin/);
  assert.match(home, /Recent notes/);
  assert.match(home, /START_HERE_SLUGS/);
  assert.doesNotMatch(home, /Illustrative field-note preview, not a client programme/);
  assert.doesNotMatch(home, /WorkbenchPreview|JourneyCard|NewsletterForm|Start with the playbooks|Open playbook/);
  assert.doesNotMatch(home, /handleNewsletterSubmit|fetch\('\/.netlify\/functions\/newsletter'/);
});

test('notes discovery stays focused on search, library and topic', async () => {
  const blog = await read('../src/pages/Blog.jsx');

  assert.match(blog, /<title>Notes \| Tech Made Easy<\/title>/);
  assert.match(blog, /Off-site notes/);
  assert.match(blog, /aria-pressed=/);
  assert.match(blog, /htmlFor="notes-search"/);
  assert.match(blog, /id="notes-search"/);
  assert.match(blog, /htmlFor="notes-category-mobile"/);
  assert.match(blog, /id="notes-category-mobile"/);
  assert.doesNotMatch(blog, /Grid view|List view|playbook-sort|Three related notes/);
  assert.doesNotMatch(blog, /The workbench|Follow the delivery chain|Decision this helps you make|Open playbook/);
  assert.doesNotMatch(blog, /<Link[^>]*>\s*<Button/s);
  assert.doesNotMatch(blog, /<Badge[\s\S]{0,300}onClick=/);
});

test('site chrome and supporting pages use one energy-delivery identity', async () => {
  const [header, footer, about, contact, newsletter] = await Promise.all([
    read('../src/components/Header.jsx'),
    read('../src/components/Footer.jsx'),
    read('../src/pages/About.jsx'),
    read('../src/pages/Contact.jsx'),
    read('../src/components/NewsletterForm.jsx'),
  ]);

  assert.match(header, /name: 'Notes'/);
  assert.doesNotMatch(header, /name: 'Contact'|href: '\/contact'/);
  assert.match(footer, />\s*Notes\s*</);
  assert.doesNotMatch(footer, /to="\/contact"/);
  assert.doesNotMatch(footer, /Quick Links|Topics/);
  assert.doesNotMatch(about, /Meet Our Founder|Learn about the vision|Expertise Areas:/i);
  assert.match(about, /Field notes from an energy project manager/);
  assert.match(about, /id="contact"/);
  assert.match(about, /mailto:re\.hoangvietduc@gmail\.com/);
  assert.match(about, /If something here connects with your work/);
  assert.doesNotMatch(about, /strongest in|\bBESS\b|\bP6\b|\bFIDIC\b/);
  assert.doesNotMatch(about, /How I make decisions|What belongs here|What does not/);
  assert.doesNotMatch(contact, /technology-focused blog|tech-savvy|tech enthusiast|News Tips/i);
  assert.doesNotMatch(contact, /0966|console\.log\('Form submitted|<form/);
  assert.match(contact, /<About \/>/);
  assert.match(contact, /navigate\('\/about#contact'/);
  assert.match(newsletter, /htmlFor="newsletter-email"/);
  assert.match(newsletter, /id="newsletter-email"/);
});

test('the shared shell has one main landmark and specialist pages are lazy loaded', async () => {
  const [shell, header, blogPost] = await Promise.all([
    read('../src/AppShell.jsx'),
    read('../src/components/Header.jsx'),
    read('../src/pages/BlogPost.jsx'),
  ]);

  assert.match(shell, /lazy\(/);
  assert.match(shell, /<Suspense/);
  assert.match(shell, /<main id="main-content"/);
  assert.doesNotMatch(blogPost, /<main\b/);
  assert.match(header, /Skip to content/);
  assert.match(header, /aria-expanded=/);
  assert.match(blogPost, /document\.title =/);
});

test('legacy interactive articles do not expose duplicate page shells', async () => {
  const [blogPost, guide, interactive, costs, roadmap] = await Promise.all([
    read('../src/pages/BlogPost.jsx'),
    read('../src/components/OffshoreWindGuide.jsx'),
    read('../src/pages/offshore-wind-farm/App.jsx'),
    read('../src/pages/RenewableEnergyCosts2024.jsx'),
    read('../src/pages/FIMImplementationRoadmap.jsx'),
  ]);

  assert.match(blogPost, /<OffshoreWindGuide embedded/);
  assert.match(blogPost, /<OffshoreWindFarmApp embedded/);
  assert.match(guide, /embedded = false/);
  assert.match(interactive, /embedded = false/);
  assert.match(costs, /overflow-x-auto/);
  assert.match(roadmap, /overflow-x-auto/);
});

test('primary-page metadata points directly at final trailing-slash URLs', async () => {
  const pages = await Promise.all([
    read('../src/pages/Home.jsx'),
    read('../src/pages/Blog.jsx'),
    read('../src/pages/About.jsx'),
  ]);

  const expected = [
    'https://techmadeeasy.info/',
    'https://techmadeeasy.info/blog/',
    'https://techmadeeasy.info/about/',
  ];
  pages.forEach((page, index) => assert.match(page, new RegExp(`canonical" href="${expected[index].replaceAll('/', '\\/')}`)));
});

test('new public copy contains no private-memory or local-system residue', async () => {
  const copy = (await Promise.all([
    read('../src/pages/Home.jsx'),
    read('../src/pages/Blog.jsx'),
    read('../src/pages/About.jsx'),
    read('../src/pages/Contact.jsx'),
    read('../src/data/playbookJourney.js'),
  ])).join('\n');

  assert.doesNotMatch(copy, /C:\\|\.gbrain|client name|contract value|counterparty|local path/i);
});
