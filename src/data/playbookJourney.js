import { BLOG_TAXONOMY, blogPosts } from './posts.js';

export const START_HERE_SLUGS = [
  'access-was-assumed',
  'drawing-showed-access',
  'fim-vs-epc-decision-sheet',
];

const JOURNEY_BY_SLUG = {
  'access-was-assumed': {
    step: '1 · Schedule readiness',
    format: 'Interactive programme',
    decision: 'Which enabling condition must become a controlled programme gate?',
  },
  'drawing-showed-access': {
    step: '2 · Constructability',
    format: 'Interactive screen',
    decision: 'Can the delivery vehicle use the route shown on the drawing?',
  },
  'fim-vs-epc-decision-sheet': {
    step: '3 · Procurement',
    format: 'One-page decision sheet',
    decision: 'Does the owner have the capability to retain the material interface?',
  },
  'foundation-before-ground-model': {
    step: 'Evidence maturity',
    format: 'Interactive evidence gate',
    decision: 'What decision does the available ground evidence actually support?',
  },
};

export function getStartHerePosts() {
  return START_HERE_SLUGS.map((slug) => blogPosts.find((post) => post.slug === slug))
    .filter(Boolean)
    .map((post) => ({ ...post, ...JOURNEY_BY_SLUG[post.slug] }));
}

export function getLibraryPosts(mode = 'playbooks') {
  return blogPosts.filter(({ category }) => mode === 'off-site'
    ? category === 'Off-site'
    : category !== 'Off-site');
}

export function getLibraryCategories(mode = 'playbooks') {
  const posts = getLibraryPosts(mode);
  const names = mode === 'off-site'
    ? ['Off-site']
    : BLOG_TAXONOMY.filter((category) => category !== 'Off-site');
  return [
    { name: 'All', count: posts.length },
    ...names.map((name) => ({ name, count: posts.filter(({ category }) => category === name).length })),
  ].filter(({ name, count }) => name === 'All' || count > 0);
}

export function describePost(post) {
  return JOURNEY_BY_SLUG[post.slug] ?? {
    step: post.category,
    format: post.readTime.includes('interactive') || post.readTime.includes('tool') ? 'Interactive field note' : 'Field note',
    decision: post.excerpt,
  };
}
