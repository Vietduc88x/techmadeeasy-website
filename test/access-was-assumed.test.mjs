import assert from 'node:assert/strict';
import { accessAssumptions, calculateAccessScenario } from '../src/data/accessWasAssumed.js';
import { access } from 'node:fs/promises';
import test from 'node:test';

const allAvailable = Object.fromEntries(
  accessAssumptions.map(({ id }) => [id, true]),
);

test('the illustrative baseline completes in 19 days', () => {
  const scenario = calculateAccessScenario(allAvailable);

  assert.equal(scenario.completionDay, 19);
  assert.equal(scenario.deltaDays, 0);
  assert.deepEqual(
    scenario.activities.map(({ id, start, finish }) => ({ id, start, finish })),
    [
      { id: 'mobilisation', start: 0, finish: 3 },
      { id: 'set-out', start: 3, finish: 5 },
      { id: 'platform-release', start: 5, finish: 9 },
      { id: 'fim-receipt', start: 3, finish: 5 },
      { id: 'main-installation', start: 9, finish: 16 },
      { id: 'testing-handover', start: 16, finish: 19 },
    ],
  );
});

test('access gates move downstream work without pretending delays are additive', () => {
  const roadBlocked = calculateAccessScenario({ ...allAvailable, roadAccess: false });
  const fimLate = calculateAccessScenario({ ...allAvailable, fimHandover: false });
  const allBlocked = calculateAccessScenario(
    Object.fromEntries(accessAssumptions.map(({ id }) => [id, false])),
  );

  assert.equal(roadBlocked.deltaDays, 8);
  assert.equal(fimLate.deltaDays, 5);
  assert.equal(allBlocked.deltaDays, 18);
  assert.ok(
    allBlocked.deltaDays < accessAssumptions.reduce((sum, item) => sum + item.delayDays, 0),
  );
});

test('the release adds both public-safe assets to the blog and ships the LinkedIn PDF', async () => {
  const { blogPostsBySlug } = await import('../src/data/posts.js');

  assert.equal(blogPostsBySlug['access-was-assumed'].category, 'Preconstruction');
  assert.equal(blogPostsBySlug['fim-vs-epc-decision-sheet'].category, 'Contracts & Packages');
  await access(new URL('../public/downloads/fim-vs-epc-decision-sheet.pdf', import.meta.url));
});
