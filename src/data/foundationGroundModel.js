export const foundationEvidenceGates = [
  {
    id: 'siteContext',
    key: 'siteContext',
    label: 'Site context checked',
    shortLabel: 'Context',
    evidence: 'Desk study, walkover, landform, drainage, existing works and access constraints.',
  },
  {
    id: 'designQuestion',
    key: 'designQuestion',
    label: 'Design question defined',
    shortLabel: 'Question',
    evidence: 'Structure location, load envelope, performance criteria and likely zone of influence.',
  },
  {
    id: 'fieldEvidence',
    key: 'fieldEvidence',
    label: 'Field investigation targeted',
    shortLabel: 'Field data',
    evidence: 'Intrusive, in-situ or geophysical work is tied to the design question—not just available data.',
  },
  {
    id: 'labInterpretation',
    key: 'labInterpretation',
    label: 'Ground model interpreted',
    shortLabel: 'Interpretation',
    evidence: 'Field and laboratory results are interpreted into strata, parameters and derived values.',
  },
  {
    id: 'variability',
    key: 'variability',
    label: 'Uncertainty made visible',
    shortLabel: 'Uncertainty',
    evidence: 'Groundwater, spatial variability, geohazards, data gaps and credible adverse conditions are recorded.',
  },
  {
    id: 'reviewRecord',
    key: 'reviewRecord',
    label: 'Stage review recorded',
    shortLabel: 'Review',
    evidence: 'Assumptions, reviewers, hold points, monitoring and the next investigation decision are owned.',
  },
];

export const baselineFoundationEvidence = {
  siteContext: true,
  designQuestion: true,
  fieldEvidence: false,
  labInterpretation: false,
  variability: false,
  reviewRecord: false,
};

const maturity = {
  'problem-framing': {
    rank: 0,
    label: 'Problem framing',
    decision: 'Define the design question first',
    summary: 'The team does not yet have a stable question for a ground investigation or a foundation comparison.',
    allowedAction: 'Confirm the structure, loads, performance criteria, site context and investigation objectives.',
  },
  'option-screening': {
    rank: 1,
    label: 'Option screening',
    decision: 'Screen foundation options only',
    summary: 'The problem is framed, but the ground evidence is not mature enough to freeze a foundation concept.',
    allowedAction: 'Compare plausible options, carry ranges and protect investigation and design hold points.',
  },
  'conditional-concept': {
    rank: 2,
    label: 'Conditional concept',
    decision: 'Develop a conditional concept',
    summary: 'Interpreted evidence exists, but variability, uncertainty or the stage review is still open.',
    allowedAction: 'Develop the concept against explicit assumptions, sensitivities and pre-agreed stop conditions.',
  },
  'design-review': {
    rank: 3,
    label: 'Engineering design review',
    decision: 'Ready for engineering design review',
    summary: 'The evidence package is ready to be challenged by the responsible engineering disciplines.',
    allowedAction: 'Conduct the formal review. This status is not approval and does not establish design adequacy.',
  },
};

export function evaluateFoundationEvidence(evidence) {
  const current = { ...baselineFoundationEvidence, ...evidence };
  let stage = 'design-review';

  if (!current.siteContext || !current.designQuestion) stage = 'problem-framing';
  else if (!current.fieldEvidence || !current.labInterpretation) stage = 'option-screening';
  else if (!current.variability || !current.reviewRecord) stage = 'conditional-concept';

  const result = maturity[stage];
  const missing = foundationEvidenceGates.filter(({ key }) => !current[key]);
  return {
    ...result,
    stage,
    activeCount: foundationEvidenceGates.length - missing.length,
    total: foundationEvidenceGates.length,
    missing,
  };
}
