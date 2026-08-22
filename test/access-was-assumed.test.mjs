import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

import { accessAssumptions, calculateAccessScenario } from '../src/data/accessWasAssumed.js';

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
  assert.deepEqual(
    scenario.activities.filter(({ critical }) => critical).map(({ id }) => id),
    ['mobilisation', 'set-out', 'platform-release', 'main-installation', 'testing-handover'],
  );
  assert.equal(scenario.activities.find(({ id }) => id === 'fim-receipt').totalFloat, 4);
  assert.equal(scenario.controllingGate, null);
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
  assert.equal(roadBlocked.controllingGate.id, 'roadAccess');
  assert.equal(fimLate.controllingGate.id, 'fimHandover');
  assert.deepEqual(
    fimLate.activities.filter(({ critical }) => critical).map(({ id }) => id),
    ['mobilisation', 'fim-receipt', 'main-installation', 'testing-handover'],
  );
  assert.deepEqual(
    allBlocked.criticalGates.map(({ id }) => id),
    ['roadAccess', 'platformReady', 'temporaryPower'],
  );
  assert.equal(allBlocked.activities.find(({ id }) => id === 'fim-receipt').totalFloat, 1);
  assert.deepEqual(
    allBlocked.activities.find(({ id }) => id === 'platform-release').waitingPeriod,
    { start: 13, finish: 19, duration: 6 },
  );
  assert.ok(
    allBlocked.deltaDays < accessAssumptions.reduce((sum, item) => sum + item.delayDays, 0),
  );
});

test('the article exposes the model, field control and public-safe limitations', async () => {
  const page = await readFile(new URL('../src/pages/AccessWasAssumed.jsx', import.meta.url), 'utf8');

  assert.match(page, /composite teaching example, not a client programme/i);
  assert.match(page, /Installation start = max/);
  assert.match(page, /Which access condition is most often missing from your baseline/);
  assert.match(page, /What this model cannot tell you/);
  assert.match(page, /Acceptance evidence/);
  assert.match(page, /Time an activity can move without delaying project completion in the current scenario/);
  assert.match(page, /extension of time \(EOT\)/);
  assert.match(page, /Further reading/);
});

test('the release adds both public-safe assets to the blog and ships the LinkedIn PDF', async () => {
  const { blogPostsBySlug } = await import('../src/data/posts.js');

  assert.equal(blogPostsBySlug['access-was-assumed'].category, 'Preconstruction');
  assert.equal(blogPostsBySlug['fim-vs-epc-decision-sheet'].category, 'Contracts & Packages');
  await access(new URL('../public/downloads/fim-vs-epc-decision-sheet.pdf', import.meta.url));
});
