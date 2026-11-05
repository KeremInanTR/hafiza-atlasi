import {
  StreamCaseStudy,
  StreamId,
  WargameRound,
  WargameRoundResult,
  StressScenario,
  SpecialistRoleId,
  CustomFiveXCase,
  CommunicationChallenge,
} from '../types/valueCreation';

const CUSTOM_CASES_KEY = 'kerem_5x_custom_cases_v1';
const WARGAME_BEST_MULTIPLIER_KEY = 'kerem_5x_wargame_best_v1';
const CHECKLIST_STATE_KEY = 'kerem_5x_checklist_state_v1';

export interface StreamSimulationMetrics {
  liveMultiplier: number;
  unlockedStage: '1x' | '2x' | '3x' | '4x' | '5x';
  baselineTotalEur: number;
  optimized5xTotalEur: number;
  simulatedTotalEur: number;
  netSavingsEur: number;
  oneOffBaselineEur: number;
  oneOffSimulatedEur: number;
  recurringBaselineEur: number;
  recurringSimulatedEur: number;
  officialFeesEur: number;
  estimatedVariableEur: number;
  riskReductionPct: number;
  alignmentScorePct: number;
}

export function calculateStreamSimulation(
  stream: StreamCaseStudy,
  leverValues: Record<string, number>
): StreamSimulationMetrics {
  const totalLevers = stream.levers.length || 1;
  let alignmentSum = 0;

  for (const lever of stream.levers) {
    const val = leverValues[lever.id] ?? lever.defaultValue;
    const distance = Math.abs(val - lever.optimalValue);
    const maxDistance = Math.max(lever.optimalValue - lever.min, lever.max - lever.optimalValue, 1);
    const proximity = Math.max(0, 1 - distance / maxDistance);
    alignmentSum += proximity;
  }

  const alignmentRatio = alignmentSum / totalLevers;

  const rawMultiplier =
    stream.baseMultiplier +
    (stream.targetMultiplier - stream.baseMultiplier) * alignmentRatio;

  const liveMultiplier = Number(Math.min(5.2, Math.max(1.0, rawMultiplier)).toFixed(2));

  let unlockedStage: '1x' | '2x' | '3x' | '4x' | '5x' = '1x';
  if (liveMultiplier >= 4.5) unlockedStage = '5x';
  else if (liveMultiplier >= 3.6) unlockedStage = '4x';
  else if (liveMultiplier >= 2.7) unlockedStage = '3x';
  else if (liveMultiplier >= 1.8) unlockedStage = '2x';

  let baselineTotalEur = 0;
  let optimized5xTotalEur = 0;
  let oneOffBaselineEur = 0;
  let oneOffSimulatedEur = 0;
  let recurringBaselineEur = 0;
  let recurringSimulatedEur = 0;
  let officialFeesEur = 0;
  let estimatedVariableEur = 0;

  for (const item of stream.costSplit) {
    baselineTotalEur += item.baselineAmountEur;
    optimized5xTotalEur += item.optimized5xAmountEur;

    // Interpolate between baseline (1x) and optimized5x based on alignmentRatio
    const itemSimulated = Math.round(
      item.baselineAmountEur -
        (item.baselineAmountEur - item.optimized5xAmountEur) * alignmentRatio
    );

    if (item.category === 'tek-seferlik') {
      oneOffBaselineEur += item.baselineAmountEur;
      oneOffSimulatedEur += itemSimulated;
    } else {
      recurringBaselineEur += item.baselineAmountEur;
      recurringSimulatedEur += itemSimulated;
    }

    if (item.certainty === 'resmi-ucret') {
      officialFeesEur += itemSimulated;
    } else {
      estimatedVariableEur += itemSimulated;
    }
  }

  const simulatedTotalEur = oneOffSimulatedEur + recurringSimulatedEur;
  const netSavingsEur = baselineTotalEur - simulatedTotalEur;
  const riskReductionPct = Math.round(25 + alignmentRatio * 70);
  const alignmentScorePct = Math.round(alignmentRatio * 100);

  return {
    liveMultiplier,
    unlockedStage,
    baselineTotalEur,
    optimized5xTotalEur,
    simulatedTotalEur,
    netSavingsEur,
    oneOffBaselineEur,
    oneOffSimulatedEur,
    recurringBaselineEur,
    recurringSimulatedEur,
    officialFeesEur,
    estimatedVariableEur,
    riskReductionPct,
    alignmentScorePct,
  };
}

export function evaluateWargameDecision(
  round: WargameRound,
  optionId: string,
  sliderValue: number
): WargameRoundResult {
  const option = round.options.find((o) => o.id === optionId) ?? round.options[0];
  const [minOpt, maxOpt] = option.optimalSliderRange;
  const inSweetSpot = sliderValue >= minOpt && sliderValue <= maxOpt;

  const sweetSpotBonus =
    option.strategyArchetype === '5x Asimetrik Kaldıraç' && inSweetSpot
      ? 0.15
      : inSweetSpot
        ? 0.05
        : -0.05;

  const achievedMultiplierDelta = Number((option.multiplierDelta + sweetSpotBonus).toFixed(2));
  const capitalDelta = option.capitalDelta + (inSweetSpot ? 3 : -2);
  const bandwidthDelta = option.bandwidthDelta + (inSweetSpot ? 2 : -2);
  const integrityDelta = option.integrityDelta + (inSweetSpot ? 3 : 0);

  return {
    roundId: round.id,
    streamId: round.streamId,
    selectedOptionId: option.id,
    sliderValue,
    achievedMultiplierDelta,
    capitalDelta,
    bandwidthDelta,
    integrityDelta,
    isOptimalStrategy: option.strategyArchetype === '5x Asimetrik Kaldıraç',
    debrief: option.causalDebrief,
    principle: option.methodologyPrinciple,
  };
}

export interface StressTestEvaluation {
  resilienceScore: number;
  grade: '5x Dayanıklı Mimari' | '3x Dengeli Savunma' | '1x Kırılgan Portföy';
  totalCapitalAllocated: number;
  totalBandwidthAllocated: number;
  isWithinBudget: boolean;
  streamDiagnostics: {
    streamId: StreamId;
    passedCapital: boolean;
    passedBandwidth: boolean;
    specialistMatched: boolean;
    statusText: string;
  }[];
}

export function evaluateStressTest(
  scenario: StressScenario,
  capitalAllocations: Record<StreamId, number>,
  bandwidthAllocations: Record<StreamId, number>,
  assignedSpecialists: Record<StreamId, SpecialistRoleId>
): StressTestEvaluation {
  const streamIds = Object.keys(scenario.requiredCapitalMin) as StreamId[];
  let totalCapitalAllocated = 0;
  let totalBandwidthAllocated = 0;
  let points = 0;
  const maxPoints = streamIds.length * 20;

  const streamDiagnostics = streamIds.map((streamId) => {
    const cap = capitalAllocations[streamId] ?? 0;
    const bw = bandwidthAllocations[streamId] ?? 0;
    totalCapitalAllocated += cap;
    totalBandwidthAllocated += bw;

    const reqCap = scenario.requiredCapitalMin[streamId] ?? 15;
    const reqBw = scenario.requiredBandwidthMin[streamId] ?? 15;
    const idealSpec = scenario.idealSpecialists[streamId];

    const passedCapital = cap >= reqCap;
    const passedBandwidth = bw >= reqBw;
    const specialistMatched = !idealSpec || assignedSpecialists[streamId] === idealSpec;

    if (passedCapital) points += 7;
    if (passedBandwidth) points += 7;
    if (specialistMatched) points += 6;

    const statusParts: string[] = [];
    statusParts.push(passedCapital ? 'Sermaye yeterli' : `Sermaye eksik (min %${reqCap})`);
    statusParts.push(passedBandwidth ? 'Odak yeterli' : `Odak eksik (min %${reqBw})`);
    statusParts.push(specialistMatched ? 'Uzman ajan uyumlu' : `Önerilen: ${idealSpec}`);

    return {
      streamId,
      passedCapital,
      passedBandwidth,
      specialistMatched,
      statusText: statusParts.join(' · '),
    };
  });

  const isWithinBudget = totalCapitalAllocated <= 100 && totalBandwidthAllocated <= 100;
  let rawScore = Math.round((points / maxPoints) * 100);
  if (!isWithinBudget) {
    rawScore = Math.max(15, rawScore - 30);
  }

  let grade: StressTestEvaluation['grade'] = '1x Kırılgan Portföy';
  if (rawScore >= 85 && isWithinBudget) {
    grade = '5x Dayanıklı Mimari';
  } else if (rawScore >= 60) {
    grade = '3x Dengeli Savunma';
  }

  return {
    resilienceScore: rawScore,
    grade,
    totalCapitalAllocated,
    totalBandwidthAllocated,
    isWithinBudget,
    streamDiagnostics,
  };
}

export interface CommunicationDuelResult {
  wordCount: number;
  withinBudget: boolean;
  criticalIncluded: number;
  requiredCritical: number;
  fluffCount: number;
  score: number;
  isFiveXSuccess: boolean;
  feedback: string;
}

export function evaluateCommunicationDraft(
  challenge: CommunicationChallenge,
  selectedClauseIds: string[]
): CommunicationDuelResult {
  const chosen = challenge.clauses.filter((c) => selectedClauseIds.includes(c.id));
  const wordCount = chosen.reduce((acc, c) => acc + c.wordCount, 0);
  const withinBudget = wordCount > 0 && wordCount <= challenge.maxWordBudget;
  const criticalIncluded = chosen.filter((c) => c.isCriticalFact).length;
  const fluffCount = chosen.filter((c) => c.isFluffOrUnsupported).length;

  let score = 0;
  score += Math.round((criticalIncluded / challenge.requiredCriticalCount) * 70);
  if (withinBudget && wordCount > 0) score += 30;
  else if (wordCount > challenge.maxWordBudget) score -= 20;
  score -= fluffCount * 35;
  score = Math.max(0, Math.min(100, score));

  const isFiveXSuccess =
    withinBudget &&
    criticalIncluded === challenge.requiredCriticalCount &&
    fluffCount === 0;

  let feedback = '';
  if (selectedClauseIds.length === 0) {
    feedback = 'Henüz cümle bloğu seçilmedi. Kritik tespitleri koruyarak kelime bütçesi içinde kal.';
  } else if (fluffCount > 0) {
    feedback =
      'Uyarı: Taslakta gereksiz törensel dolgu veya geçmişi küçümseyen desteklenmemiş ifade var! [EX062 / OH060] gereği bu bloğu çıkar.';
  } else if (criticalIncluded < challenge.requiredCriticalCount) {
    feedback = `Eksik Kritik Bilgi: Kısaltma sırasında ${
      challenge.requiredCriticalCount - criticalIncluded
    } kritik nokta dışarıda kaldı ("kısa ama eksik olmasın").`;
  } else if (!withinBudget) {
    feedback = `Kelime Bütçesi Aşıldı (${wordCount}/${challenge.maxWordBudget} kelime): Kritik olmayan opsiyonel cümleyi çıkararak metni keskinleştir.`;
  } else {
    feedback =
      '5x İletişim Standardı Doğrulandı! Hem kelime bütçesi korundu hem de hiçbir kritik kanıt veya teknik/hukuki madde atlanmadı.';
  }

  return {
    wordCount,
    withinBudget,
    criticalIncluded,
    requiredCritical: challenge.requiredCriticalCount,
    fluffCount,
    score,
    isFiveXSuccess,
    feedback,
  };
}

export interface CustomCaseFormInput {
  title: string;
  streamId: StreamId;
  datedContext: string;
  oneOffCostEur: number;
  recurringAnnualCostEur: number;
  officialFeeSharePct: number;
  smartAlternativeSummary: string;
  preVerificationText: string;
  stageScores: {
    evidenceAudit1x: number;
    zeroGapLogic2x: number;
    marginalLeverage3x: number;
    precisionExecution4x: number;
    autonomousSystem5x: number;
  };
}

export function validateCustomFiveXCase(input: CustomCaseFormInput): {
  valid: boolean;
  errors: string[];
  calculatedMultiplier: number;
} {
  const errors: string[] = [];
  if (!input.title || input.title.trim().length < 5) {
    errors.push('Vaka başlığı en az 5 karakter olmalıdır.');
  }
  if (!input.datedContext || input.datedContext.trim().length < 5) {
    errors.push('Tarihli bağlam / kaynak notu en az 5 karakter olmalıdır.');
  }
  if (!input.smartAlternativeSummary || input.smartAlternativeSummary.trim().length < 12) {
    errors.push('Düşük yatırımlı 5x akıllı alternatif açıklaması en az 12 karakter olmalıdır.');
  }
  if (input.oneOffCostEur < 0 || input.recurringAnnualCostEur < 0) {
    errors.push('Maliyet kalemleri negatif olamaz.');
  }

  const s = input.stageScores;
  const avgStage =
    (s.evidenceAudit1x +
      s.zeroGapLogic2x +
      s.marginalLeverage3x +
      s.precisionExecution4x +
      s.autonomousSystem5x) /
    5;
  const calculatedMultiplier = Number((1 + (avgStage / 100) * 4).toFixed(2));

  return {
    valid: errors.length === 0,
    errors,
    calculatedMultiplier,
  };
}

export function loadCustomCases(): CustomFiveXCase[] {
  try {
    const raw = localStorage.getItem(CUSTOM_CASES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomCases(cases: CustomFiveXCase[]): void {
  try {
    localStorage.setItem(CUSTOM_CASES_KEY, JSON.stringify(cases));
  } catch {
    // Ignore storage errors
  }
}

export function loadWargameBestMultiplier(): number {
  try {
    const raw = localStorage.getItem(WARGAME_BEST_MULTIPLIER_KEY);
    if (!raw) return 1.0;
    const num = Number(raw);
    return Number.isFinite(num) && num >= 1.0 ? num : 1.0;
  } catch {
    return 1.0;
  }
}

export function saveWargameBestMultiplier(multiplier: number): void {
  try {
    const current = loadWargameBestMultiplier();
    if (multiplier > current) {
      localStorage.setItem(WARGAME_BEST_MULTIPLIER_KEY, String(multiplier));
    }
  } catch {
    // Ignore
  }
}

export function loadChecklistState(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(CHECKLIST_STATE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) ?? {};
  } catch {
    return {};
  }
}

export function saveChecklistState(state: Record<string, boolean>): void {
  try {
    localStorage.setItem(CHECKLIST_STATE_KEY, JSON.stringify(state));
  } catch {
    // Ignore
  }
}
