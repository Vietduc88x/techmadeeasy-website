const round = (value) => Number(value.toFixed(2));

export const turningInputRanges = {
  roadWidth: { min: 4, max: 10, step: 0.25, unit: 'm' },
  insideRadius: { min: 8, max: 25, step: 0.5, unit: 'm' },
  vehicleLength: { min: 12, max: 24, step: 0.5, unit: 'm' },
  clearance: { min: 0.25, max: 1.25, step: 0.25, unit: 'm' },
};

export const defaultTurningInputs = {
  roadWidth: 5.5,
  insideRadius: 10,
  vehicleLength: 18,
  clearance: 0.5,
};

export const turningInterventions = {
  widenRoad: {
    label: 'Widen road to 9 m',
    inputs: { ...defaultTurningInputs, roadWidth: 9 },
  },
  increaseRadius: {
    label: 'Increase radius to 16 m',
    inputs: { ...defaultTurningInputs, insideRadius: 16 },
  },
};

export function calculateTurningScreen(inputs = defaultTurningInputs) {
  const roadWidth = Number(inputs.roadWidth);
  const insideRadius = Number(inputs.insideRadius);
  const vehicleLength = Number(inputs.vehicleLength);
  const clearance = Number(inputs.clearance);

  for (const [key, value] of Object.entries({ roadWidth, insideRadius, vehicleLength, clearance })) {
    const range = turningInputRanges[key];
    if (!Number.isFinite(value) || value < range.min || value > range.max) {
      throw new RangeError(`${key} must be between ${range.min} and ${range.max}`);
    }
  }

  // Public teaching assumptions for a simplified rigid delivery-vehicle envelope.
  // These are deliberately visible in the article and are not a vehicle library.
  const vehicleWidth = 3;
  const effectiveWheelbase = vehicleLength * 0.52;
  const frontOverhang = vehicleLength * 0.18;
  const pathRadius = insideRadius + roadWidth / 2;
  const offTracking = (effectiveWheelbase ** 2) / (2 * pathRadius);
  const rearWheelPathRadius = pathRadius - offTracking;
  const outsideCornerSwing = Math.hypot(pathRadius + vehicleWidth / 2, frontOverhang)
    - (pathRadius + vehicleWidth / 2);
  const requiredWidth = vehicleWidth + offTracking + outsideCornerSwing + (2 * clearance);
  const margin = roadWidth - requiredWidth;
  const status = margin < 0 ? 'fail' : margin < 0.5 ? 'tight' : 'pass';

  return {
    inputs: { roadWidth, insideRadius, vehicleLength, clearance },
    vehicleWidth,
    effectiveWheelbase: round(effectiveWheelbase),
    frontOverhang: round(frontOverhang),
    pathRadius: round(pathRadius),
    rearWheelPathRadius: round(rearWheelPathRadius),
    offTracking: round(offTracking),
    outsideCornerSwing: round(outsideCornerSwing),
    requiredWidth: round(requiredWidth),
    availableWidth: round(roadWidth),
    margin: round(margin),
    status,
    requiredInnerRadius: round(pathRadius - (vehicleWidth / 2) - offTracking - clearance),
    requiredOuterRadius: round(pathRadius + (vehicleWidth / 2) + outsideCornerSwing + clearance),
  };
}
