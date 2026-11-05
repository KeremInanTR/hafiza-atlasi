import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import {
  filterMemories,
  validateNewMemory,
  validateReflection,
} from '../utils/memoryStore';
import {
  calculateStreamSimulation,
  evaluateWargameDecision,
  evaluateStressTest,
  evaluateCommunicationDraft,
  validateCustomFiveXCase,
} from '../utils/valueCreationEngine';
import { INITIAL_MEMORIES } from '../data/initialMemories';
import {
  STREAM_CASE_STUDIES,
  WARGAME_ROUNDS,
  STRESS_SCENARIOS,
  COMMUNICATION_CHALLENGES,
} from '../data/valueCreationStreams';

describe('5x Value Creation Engine, Stream Case Studies & Hafıza Atlası', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('calculates 5x stream simulation metrics and unlocks 5x stage at optimal levers', () => {
    const housing = STREAM_CASE_STUDIES[0];
    const optimalLevers: Record<string, number> = {};
    for (const l of housing.levers) {
      optimalLevers[l.id] = l.optimalValue;
    }

    const sim = calculateStreamSimulation(housing, optimalLevers);
    expect(sim.liveMultiplier).toBeGreaterThanOrEqual(4.8);
    expect(sim.unlockedStage).toBe('5x');
    expect(sim.netSavingsEur).toBeGreaterThan(100000);
    expect(sim.oneOffSimulatedEur).toBeLessThan(sim.oneOffBaselineEur);
  });

  it('evaluates wargame decisions and rewards 5x asymmetric leverage choices', () => {
    const round1 = WARGAME_ROUNDS[0];
    const optimalRes = evaluateWargameDecision(round1, 'wg-h1-opt3', 85);
    expect(optimalRes.isOptimalStrategy).toBe(true);
    expect(optimalRes.achievedMultiplierDelta).toBeGreaterThan(0.8);

    const shortcutRes = evaluateWargameDecision(round1, 'wg-h1-opt1', 85);
    expect(shortcutRes.isOptimalStrategy).toBe(false);
    expect(shortcutRes.integrityDelta).toBeLessThan(0);
  });

  it('evaluates portfolio stress test and communication duel constraints', () => {
    const scenario = STRESS_SCENARIOS[0];
    const stressRes = evaluateStressTest(
      scenario,
      {
        'stream-housing': 25,
        'stream-mobility': 20,
        'stream-super-agent': 20,
        'stream-global-logistics': 20,
        'stream-projectivity': 15,
      },
      {
        'stream-housing': 25,
        'stream-mobility': 25,
        'stream-super-agent': 20,
        'stream-global-logistics': 15,
        'stream-projectivity': 15,
      },
      {
        'stream-housing': 'analyst',
        'stream-mobility': 'reviewer',
        'stream-super-agent': 'twin_developer',
        'stream-global-logistics': 'organizer',
        'stream-projectivity': 'research',
      }
    );
    expect(stressRes.resilienceScore).toBe(100);
    expect(stressRes.grade).toBe('5x Dayanıklı Mimari');

    const carChallenge = COMMUNICATION_CHALLENGES[0];
    const duelSuccess = evaluateCommunicationDraft(carChallenge, ['cc-1', 'cc-2', 'cc-4']);
    expect(duelSuccess.isFiveXSuccess).toBe(true);
    expect(duelSuccess.score).toBe(100);

    const customValidation = validateCustomFiveXCase({
      title: 'Wassenaar Isı Pompası 5x Analizi',
      streamId: 'stream-housing',
      datedContext: 'Kasım 2026 enerji teklifi',
      oneOffCostEur: 9500,
      recurringAnnualCostEur: 1200,
      officialFeeSharePct: 20,
      smartAlternativeSummary: 'ISDE sübvansiyonlu hibrit ısı pompası ile düşük yatırımlı marjinal kazanım',
      preVerificationText: 'ISDE şartı kontrol edildi mi?',
      stageScores: {
        evidenceAudit1x: 90,
        zeroGapLogic2x: 90,
        marginalLeverage3x: 95,
        precisionExecution4x: 90,
        autonomousSystem5x: 85,
      },
    });
    expect(customValidation.valid).toBe(true);
    expect(customValidation.calculatedMultiplier).toBeGreaterThanOrEqual(4.5);
  });

  it('validates reflection and memory inputs', () => {
    const invalid = validateReflection('kısa', 'not');
    expect(invalid.valid).toBe(false);

    const valid = validateReflection(
      'Hollanda konut ve renovasyon senaryolarının karşılaştırması',
      '2031 yılında hangi kararın en yüksek marjinal faydayı sağladığını kontrol et'
    );
    expect(valid.valid).toBe(true);

    const nov2021 = filterMemories(INITIAL_MEMORIES, {
      query: 'GMT+7',
      era: '2021-kasim',
      category: 'all',
      evidence: 'dogrulanmis-iz',
      onlyPinned: false,
    });
    expect(nov2021.length).toBeGreaterThanOrEqual(2);

    const invalidMem = validateNewMemory({
      title: 'A',
      dateLabel: '',
      era: '2026-ekim-kasim',
      category: 'konut-mimari',
      evidenceLevel: 'kisisel-not',
      timezone: 'GMT+1',
      region: 'Hollanda',
      summary: 'Kısa',
      boundaryNote: 'Yok',
      tagsText: '',
    });
    expect(invalidMem.valid).toBe(false);
  });

  it('renders 5x Stream Case Studies, switches streams, runs Wargame, and navigates all 6 tabs', () => {
    render(<App />);

    // Default tab: 5x Stream Case Studies
    expect(screen.getByTestId('streams-tab')).toBeInTheDocument();
    expect(screen.getByTestId('active-stream-title')).toHaveTextContent(
      /Konut Arama, Oda Oda Renovasyon/i
    );

    // Optimize levers to 5x
    fireEvent.click(screen.getByTestId('preset-5x-btn'));
    expect(Number(screen.getByTestId('active-stream-multiplier').textContent?.replace('x', ''))).toBeGreaterThanOrEqual(4.8);

    // Switch to Stream 2 (Mobility) and Stream 5 (Projectivity)
    fireEvent.click(screen.getByTestId('select-stream-mobility'));
    expect(screen.getByTestId('active-stream-title')).toHaveTextContent(
      /Araç Teknik Rapor Denetimi/i
    );

    fireEvent.click(screen.getByTestId('select-stream-projectivity'));
    expect(screen.getByTestId('active-stream-title')).toHaveTextContent(
      /Projectivity, Ontolojik vs. Metrik Mesafe/i
    );

    // Navigate to Interactive Business Gaming tab
    fireEvent.click(screen.getByTestId('nav-wargame'));
    expect(screen.getByTestId('wargame-tab')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('wargame-opt-wg-h1-opt3'));
    expect(screen.getByTestId('wargame-debrief')).toHaveTextContent(/5x Stratejik Kaldıraç/i);

    // Switch to Stress Sandbox mode
    fireEvent.click(screen.getByTestId('mode-stress-btn'));
    expect(screen.getByTestId('stress-sandbox-board')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('apply-optimal-stress-btn'));
    expect(screen.getByTestId('stress-resilience-score')).toHaveTextContent('100 / 100');

    // Switch to Communication Duel mode
    fireEvent.click(screen.getByTestId('mode-duel-btn'));
    expect(screen.getByTestId('comm-duel-board')).toBeInTheDocument();
    expect(screen.getByTestId('duel-score')).toHaveTextContent('100 / 100');

    // Navigate to 2021-2026 Capsule, Timeline, Analytics, and Gym tabs
    fireEvent.click(screen.getByTestId('nav-capsule'));
    expect(
      screen.getByText(/Kasım 2021 · Güneydoğu Asya & Dijital Kurulum/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('nav-timeline'));
    expect(screen.getByTestId('timeline-tab')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('nav-analytics'));
    expect(screen.getByTestId('analytics-tab')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('nav-gym'));
    expect(screen.getByTestId('gym-tab')).toBeInTheDocument();
  });
});
