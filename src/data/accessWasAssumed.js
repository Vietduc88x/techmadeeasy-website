export const accessAssumptions = [
  {
    id: 'roadAccess',
    label: 'Heavy-vehicle access available',
    shortLabel: 'Road access',
    delayDays: 8,
    affects: 'Mobilisation',
    question: 'Can the delivery vehicle actually reach and turn at the workfront?',
    owner: 'Site logistics / civil lead',
    evidence: 'Approved route survey and logistics plan',
  },
  {
    id: 'platformReady',
    label: 'Working platform released',
    shortLabel: 'Platform',
    delayDays: 6,
    affects: 'Platform release',
    question: 'Has the temporary-works owner certified the platform for the planned plant?',
    owner: 'Temporary-works owner',
    evidence: 'Signed platform release certificate',
  },
  {
    id: 'fimHandover',
    label: 'Free-issue material (FIM) handover complete',
    shortLabel: 'FIM handover',
    delayDays: 9,
    affects: 'Receipt and inspection',
    question: 'Are custody, inspection records and interface data ready with the equipment?',
    owner: 'Owner / supplier interface lead',
    evidence: 'Inspection, custody and interface-data record',
  },
  {
    id: 'temporaryPower',
    label: 'Temporary power commissioned',
    shortLabel: 'Temporary power',
    delayDays: 4,
    affects: 'Testing and handover',
    question: 'Is the temporary supply available at the point and quality the test plan assumes?',
    owner: 'Electrical package lead',
    evidence: 'Commissioning and power-quality record',
  },
];

const activities = [
  { id: 'mobilisation', label: 'Mobilisation', duration: 3, dependencies: [], gate: 'roadAccess' },
  { id: 'set-out', label: 'Survey and set-out', duration: 2, dependencies: ['mobilisation'] },
  { id: 'platform-release', label: 'Working platform release', duration: 4, dependencies: ['set-out'], gate: 'platformReady' },
  { id: 'fim-receipt', label: 'FIM receipt and inspection', duration: 2, dependencies: ['mobilisation'], gate: 'fimHandover' },
  { id: 'main-installation', label: 'Main installation', duration: 7, dependencies: ['platform-release', 'fim-receipt'] },
  { id: 'testing-handover', label: 'Testing and handover', duration: 3, dependencies: ['main-installation'], gate: 'temporaryPower' },
];

export const baselineAccessState = Object.fromEntries(
  accessAssumptions.map(({ id }) => [id, true]),
);

export function calculateAccessScenario(selected = baselineAccessState) {
  const state = { ...baselineAccessState, ...selected };
  const byId = {};

  const scheduled = activities.map((activity) => {
    const dependencyFinish = activity.dependencies.length
      ? Math.max(...activity.dependencies.map((id) => byId[id].finish))
      : 0;
    const gateDelay = activity.gate && !state[activity.gate]
      ? accessAssumptions.find(({ id }) => id === activity.gate).delayDays
      : 0;
    const logicStart = dependencyFinish;
    const start = logicStart + gateDelay;
    const result = {
      ...activity,
      logicStart,
      start,
      finish: start + activity.duration,
      gateDelay,
      waitingPeriod: gateDelay
        ? { start: logicStart, finish: start, duration: gateDelay }
        : null,
    };
    byId[activity.id] = result;
    return result;
  });

  const completionDay = Math.max(...scheduled.map(({ finish }) => finish));
  const childrenById = Object.fromEntries(activities.map(({ id }) => [id, []]));
  activities.forEach(({ id, dependencies }) => {
    dependencies.forEach((dependencyId) => childrenById[dependencyId].push(id));
  });

  const backwardById = {};
  [...scheduled].reverse().forEach((activity) => {
    const successors = childrenById[activity.id];
    const latestFinish = successors.length
      ? Math.min(...successors.map((id) => backwardById[id].latestLogicStart))
      : completionDay;
    const latestLogicStart = latestFinish - activity.gateDelay - activity.duration;
    const totalFloat = latestLogicStart - activity.logicStart;
    backwardById[activity.id] = {
      latestFinish,
      latestLogicStart,
      totalFloat,
      critical: totalFloat === 0,
    };
  });

  const analysed = scheduled.map((activity) => ({
    ...activity,
    ...backwardById[activity.id],
  }));
  const unavailable = accessAssumptions.filter(({ id }) => !state[id]);
  const criticalGates = unavailable.filter(({ id }) => (
    analysed.some(({ gate, critical }) => gate === id && critical)
  ));
  const absorbedGates = unavailable.filter(({ id }) => (
    analysed.some(({ gate, critical }) => gate === id && !critical)
  ));

  return {
    activities: analysed,
    completionDay,
    baselineCompletionDay: 19,
    deltaDays: completionDay - 19,
    unavailableCount: unavailable.length,
    controllingPath: analysed.filter(({ critical }) => critical),
    criticalGates,
    absorbedGates,
    controllingGate: criticalGates[0] ?? null,
  };
}
