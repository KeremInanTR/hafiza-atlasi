export type StreamId =
  | 'stream-housing'
  | 'stream-mobility'
  | 'stream-super-agent'
  | 'stream-global-logistics'
  | 'stream-projectivity';

export type SpecialistRoleId =
  | 'organizer'
  | 'finance'
  | 'research'
  | 'analyst'
  | 'reviewer'
  | 'twin_developer';

export interface FiveXStageDetail {
  stage: '1x' | '2x' | '3x' | '4x' | '5x';
  title: string;
  principle: string;
  description: string;
  metricImpact: string;
}

export interface CostSplitItem {
  id: string;
  label: string;
  category: 'tek-seferlik' | 'tekrarlayan';
  certainty: 'resmi-ucret' | 'tahmini-maliyet';
  baselineAmountEur: number;
  optimized5xAmountEur: number;
  note: string;
}

export interface StreamLeverConfig {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  optimalValue: number;
  description: string;
}

export interface DecisionStandardMatrix {
  need: string;
  options: {
    name: string;
    tag: 'Senaryo A (1x)' | 'Senaryo B (2.5x)' | '5x Akıllı Alternatif';
    summary: string;
    multiplier: string;
  }[];
  advantages: string[];
  technicalAndLegalRisks: {
    type: 'Teknik Risk' | 'Hukuki / İdari Risk' | 'Finansal / Bilgi Asimetrisi';
    item: string;
    mitigation: string;
  }[];
  expertInspectionsRequired: string[];
  certaintyVsProbability: {
    verifiedFacts: string[];
    probabilitiesAndAssumptions: string[];
  };
  recommendationAndRationale: string;
  preDecisionVerifications: string[];
}

export interface StreamCaseStudy {
  id: StreamId;
  code: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  eraSpan: string;
  sourceRefs: string[];
  evidenceBadge: 'Doğrulanmış Tarihli İz + Görev Bağlamı' | 'Kaynaklı Görev & Karar Bağlamı';
  recommendedSpecialist: SpecialistRoleId;
  baseMultiplier: number;
  targetMultiplier: number;
  coreInsight: string;
  historicalBridge: {
    from2021: string;
    to2026: string;
  };
  fiveXStages: FiveXStageDetail[];
  levers: StreamLeverConfig[];
  costSplit: CostSplitItem[];
  decisionMatrix: DecisionStandardMatrix;
  kpiUnit: string;
  baseUtilityScore: number;
}

export interface WargameOption {
  id: string;
  label: string;
  strategyArchetype: '1x Geleneksel / Yüksek Maliyet' | 'Yüzeysel Kestirme / Gizli Risk' | '5x Asimetrik Kaldıraç';
  description: string;
  multiplierDelta: number;
  capitalDelta: number;
  bandwidthDelta: number;
  integrityDelta: number;
  optimalSliderRange: [number, number];
  causalDebrief: string;
  methodologyPrinciple: string;
}

export interface WargameRound {
  id: string;
  streamId: StreamId;
  roundNumber: 1 | 2 | 3;
  stageBadge: string;
  title: string;
  scenarioContext: string;
  constraintAlert: string;
  sliderLabel: string;
  sliderHint: string;
  options: WargameOption[];
}

export interface WargameRoundResult {
  roundId: string;
  streamId: StreamId;
  selectedOptionId: string;
  sliderValue: number;
  achievedMultiplierDelta: number;
  capitalDelta: number;
  bandwidthDelta: number;
  integrityDelta: number;
  isOptimalStrategy: boolean;
  debrief: string;
  principle: string;
}

export interface StressScenario {
  id: string;
  title: string;
  subtitle: string;
  affectedStreams: StreamId[];
  severity: 'Orta' | 'Yüksek' | 'Kritik (Portföy Geneli)';
  shockDescription: string;
  requiredCapitalMin: Record<StreamId, number>;
  requiredBandwidthMin: Record<StreamId, number>;
  idealSpecialists: Partial<Record<StreamId, SpecialistRoleId>>;
  mitigationLesson: string;
}

export interface CustomFiveXCase {
  id: string;
  createdAt: string;
  title: string;
  streamId: StreamId;
  datedContext: string;
  oneOffCostEur: number;
  recurringAnnualCostEur: number;
  officialFeeSharePct: number;
  smartAlternativeSummary: string;
  preVerificationChecklist: string[];
  stageScores: {
    evidenceAudit1x: number;
    zeroGapLogic2x: number;
    marginalLeverage3x: number;
    precisionExecution4x: number;
    autonomousSystem5x: number;
  };
  calculatedMultiplier: number;
}

export interface CommunicationClause {
  id: string;
  text: string;
  wordCount: number;
  isCriticalFact: boolean;
  isFluffOrUnsupported: boolean;
  impactNote: string;
}

export interface CommunicationChallenge {
  id: string;
  streamId: StreamId;
  code: string;
  title: string;
  principleBadge: string;
  sourceRef: string;
  context: string;
  maxWordBudget: number;
  requiredCriticalCount: number;
  clauses: CommunicationClause[];
}

