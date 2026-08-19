export const accessAssumptions = [
  {
    id: 'roadAccess',
    label: 'Heavy-vehicle access available',
    shortLabel: 'Road access',
    delayDays: 8,
    affects: 'Mobilisation',
    question: 'Can the delivery vehicle actually reach and turn at the workfront?',
  },
  {
    id: 'platformReady',
    label: 'Working platform released',
    shortLabel: 'Platform',
    delayDays: 6,
    affects: 'Platform release',
    question: 'Has the temporary-works owner certified the platform for the planned plant?',
  },
  {
    id: 'fimHandover',
    label: 'FIM handover complete',
    shortLabel: 'FIM handover',
    delayDays: 9,
    affects: 'Receipt and inspection',
    question: 'Are custody, inspection records and interface data ready with the equipment?',
  },
  {
    id: 'temporaryPower',
    label: 'Temporary power commissioned',
    shortLabel: 'Temporary power',
    delayDays: 4,
    affects: 'Testing and handover',
    question: 'Is the temporary supply available at the point and quality the test plan assumes?',
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
    const start = dependencyFinish + gateDelay;
    const result = { ...activity, start, finish: start + activity.duration, gateDelay };
    byId[activity.id] = result;
    return result;
  });

  const completionDay = Math.max(...scheduled.map(({ finish }) => finish));
  return {
    activities: scheduled,
    completionDay,
    baselineCompletionDay: 19,
    deltaDays: completionDay - 19,
    unavailableCount: accessAssumptions.filter(({ id }) => !state[id]).length,
  };
}
