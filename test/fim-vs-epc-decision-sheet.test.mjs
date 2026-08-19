import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pageUrl = new URL('../src/pages/FIMvsEPCDecisionSheet.jsx', import.meta.url);

test('the decision sheet defines its terms and puts capability gates before price', async () => {
  const page = await readFile(pageUrl, 'utf8');

  assert.match(page, /free-issue materials \(FIM\)/);
  assert.match(page, /engineering, procurement and construction \(EPC\)/);
  assert.match(page, /Readiness gate/);
  assert.match(page, /If any answer is no, use EPC supply as the starting point/);
});

test('the decision sheet makes cost and residual-risk assumptions auditable', async () => {
  const page = await readFile(pageUrl, 'utf8');

  assert.match(page, /Total evaluated FIM cost/);
  assert.match(page, /Decision record/);
  assert.match(page, /Review trigger/);
  assert.match(page, /Residual risk owner/);
});

test('the public article links authoritative guidance and contains no mojibake', async () => {
  const page = await readFile(pageUrl, 'utf8');

  assert.match(page, /worldbank\.org\/en\/projects-operations\/products-and-services\/brief\/procurement-new-framework/);
  assert.match(page, /iccwbo\.org\/business-solutions\/incoterms-rules/);
  assert.doesNotMatch(page, /â€œ|â€|â€™/);
});
