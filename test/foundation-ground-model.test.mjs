import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  baselineFoundationEvidence,
  evaluateFoundationEvidence,
  foundationEvidenceGates,
} from '../src/data/foundationGroundModel.js';

const allEvidence = Object.fromEntries(
  foundationEvidenceGates.map(({ id }) => [id, true]),
);

test('the readiness model never treats incomplete evidence as design approval', () => {
  const early = evaluateFoundationEvidence(baselineFoundationEvidence);
  const complete = evaluateFoundationEvidence(allEvidence);

  assert.equal(early.stage, 'option-screening');
  assert.equal(early.decision, 'Screen foundation options only');
  assert.equal(complete.stage, 'design-review');
  assert.equal(complete.decision, 'Ready for engineering design review');
  assert.doesNotMatch(complete.decision, /approved|safe to build|foundation selected/i);
});

test('adding evidence cannot reduce the maturity stage across all combinations', () => {
  const ids = foundationEvidenceGates.map(({ id }) => id);
  const stageRank = {
    'problem-framing': 0,
    'option-screening': 1,
    'conditional-concept': 2,
    'design-review': 3,
  };

  for (let mask = 0; mask < 2 ** ids.length; mask += 1) {
    const state = Object.fromEntries(
      ids.map((id, index) => [id, Boolean(mask & (1 << index))]),
    );
    const current = evaluateFoundationEvidence(state);

    ids.forEach((id) => {
      if (state[id]) return;
      const withOneMore = evaluateFoundationEvidence({ ...state, [id]: true });
      assert.ok(
        stageRank[withOneMore.stage] >= stageRank[current.stage],
        `adding ${id} reduced maturity for mask ${mask}`,
      );
    });
  }
});

test('the page is registered, sourced, public-safe and explicit about its limits', async () => {
  const [page, shell] = await Promise.all([
    readFile(new URL('../src/pages/FoundationBeforeGroundModel.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/AppShell.jsx', import.meta.url), 'utf8'),
  ]);
  const { blogPostsBySlug } = await import('../src/data/posts.js');
  const post = blogPostsBySlug['foundation-before-ground-model'];

  assert.equal(post.category, 'Preconstruction');
  assert.match(shell, /FoundationBeforeGroundModel/);
  assert.match(shell, /\/blog\/foundation-before-ground-model/);
  assert.match(page, /Composite scenario, not a client project/);
  assert.match(page, /not a foundation-design calculator/i);
  assert.match(page, /Ready for engineering design review/);
  assert.match(page, /ground model is not a borehole log/i);
  assert.match(page, /eurocodes\.jrc\.ec\.europa\.eu/);
  assert.match(page, /fhwa\.dot\.gov/);
  assert.match(page, /publications\.usace\.army\.mil/);
  assert.doesNotMatch(page, /C:\\|\.gbrain|client name|contract value/i);
});
