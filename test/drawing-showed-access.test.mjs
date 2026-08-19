import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import {
  calculateTurningScreen,
  defaultTurningInputs,
  turningInterventions,
  turningInputRanges,
} from '../src/data/drawingShowedAccess.js';

test('the drawing scenario exposes a failed turn and a measurable intervention', () => {
  const drawing = calculateTurningScreen(defaultTurningInputs);
  const widened = calculateTurningScreen({ ...defaultTurningInputs, roadWidth: 9 });

  assert.equal(drawing.status, 'fail');
  assert.ok(drawing.margin < 0);
  assert.ok(drawing.requiredWidth > drawing.availableWidth);
  assert.ok(widened.margin > drawing.margin);
  assert.equal(widened.status, 'pass');
});

test('the screening relationships remain directionally honest', () => {
  const base = calculateTurningScreen(defaultTurningInputs);
  const wider = calculateTurningScreen({ ...defaultTurningInputs, roadWidth: defaultTurningInputs.roadWidth + 1 });
  const largerRadius = calculateTurningScreen({ ...defaultTurningInputs, insideRadius: defaultTurningInputs.insideRadius + 5 });
  const longerVehicle = calculateTurningScreen({ ...defaultTurningInputs, vehicleLength: defaultTurningInputs.vehicleLength + 3 });
  const moreClearance = calculateTurningScreen({ ...defaultTurningInputs, clearance: defaultTurningInputs.clearance + 0.25 });

  assert.ok(wider.margin > base.margin);
  assert.ok(largerRadius.requiredWidth < base.requiredWidth);
  assert.ok(longerVehicle.requiredWidth > base.requiredWidth);
  assert.ok(moreClearance.requiredWidth > base.requiredWidth);
});

test('interventions isolate one geometric change at a time', () => {
  assert.deepEqual(turningInterventions.widenRoad.inputs, {
    ...defaultTurningInputs,
    roadWidth: 9,
  });
  assert.deepEqual(turningInterventions.increaseRadius.inputs, {
    ...defaultTurningInputs,
    insideRadius: 16,
  });

  const base = calculateTurningScreen(defaultTurningInputs);
  const widened = calculateTurningScreen(turningInterventions.widenRoad.inputs);
  const largerRadius = calculateTurningScreen(turningInterventions.increaseRadius.inputs);

  assert.ok(widened.margin > base.margin);
  assert.ok(largerRadius.margin > base.margin);
  assert.equal(widened.inputs.insideRadius, base.inputs.insideRadius);
  assert.equal(largerRadius.inputs.roadWidth, base.inputs.roadWidth);
});

test('every supported input combination produces finite, internally consistent results', () => {
  const values = (range) => [range.min, (range.min + range.max) / 2, range.max];

  for (const roadWidth of values(turningInputRanges.roadWidth)) {
    for (const insideRadius of values(turningInputRanges.insideRadius)) {
      for (const vehicleLength of values(turningInputRanges.vehicleLength)) {
        for (const clearance of values(turningInputRanges.clearance)) {
          const result = calculateTurningScreen({ roadWidth, insideRadius, vehicleLength, clearance });
          assert.ok(Number.isFinite(result.requiredWidth));
          assert.ok(Number.isFinite(result.margin));
          assert.equal(result.margin, Number((result.availableWidth - result.requiredWidth).toFixed(2)));
          assert.ok(['pass', 'tight', 'fail'].includes(result.status));
        }
      }
    }
  }
});

test('the article keeps the visual subordinate to public-safe field controls', async () => {
  const [page, scene, shell, posts, footer, header, prerender] = await Promise.all([
    readFile(new URL('../src/pages/DrawingShowedAccess.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/turning/TurningEnvelopeScene.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/AppShell.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/data/posts.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/Footer.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/Header.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../scripts/prerender.mjs', import.meta.url), 'utf8'),
  ]);

  assert.match(page, /Could the delivery vehicle actually make the turn/);
  assert.match(page, /Composite example, not a client route/);
  assert.match(page, /screening model, not a swept-path approval/);
  assert.match(page, /Concept screening estimate/);
  assert.match(page, /Positive screening margin/);
  assert.doesNotMatch(page, /Clears this screen/);
  assert.match(page, /Replay vehicle/);
  assert.match(page, /Widen road to 9 m/);
  assert.match(page, /Increase radius to 16 m/);
  assert.match(page, /4 min read \+ interactive screen/);
  assert.match(page, /og:type/);
  assert.match(page, /twitter:card/);
  assert.match(page, /application\/ld\+json/);
  assert.match(page, /shouldLoadScene/);
  assert.match(page, /IntersectionObserver/);
  assert.match(page, /Bearing capacity/);
  assert.match(page, /Overhead clearance/);
  assert.match(page, /Acceptance evidence/);
  assert.match(page, /import\('@\/components\/turning\/TurningEnvelopeScene'\)/);
  assert.match(page, /aria-live="polite"/);
  assert.match(page, /Screening result:/);
  assert.match(scene, /renderer\.domElement\.style\.width = '100%'/);
  assert.match(scene, /renderer\.domElement\.style\.height = '100%'/);
  assert.match(scene, /Math\.min\(Math\.max\(host\.clientHeight, 320\), 900\)/);
  assert.match(scene, /worldRef/);
  assert.match(scene, /webglcontextlost/);
  assert.doesNotMatch(scene, /\[scenario, vehicleLength, runToken, onUnavailable\]/);
  assert.match(shell, /\/blog\/drawing-showed-access/);
  assert.match(posts, /slug: 'drawing-showed-access'/);
  assert.match(posts, /readTime: '4 min read \+ interactive screen'/);
  assert.doesNotMatch(footer, /Stay Updated/);
  assert.match(header, /min-h-11 min-w-11/);
  assert.match(prerender, /removeExistingHeadTags/);
});
