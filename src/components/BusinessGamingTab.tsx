import React, { useState, useMemo, useEffect } from 'react';
import {
  WARGAME_ROUNDS,
  STRESS_SCENARIOS,
  COMMUNICATION_CHALLENGES,
  STREAM_CASE_STUDIES,
  SPECIALIST_META,
} from '../data/valueCreationStreams';
import {
  StreamId,
  SpecialistRoleId,
  WargameRoundResult,
} from '../types/valueCreation';
import {
  evaluateWargameDecision,
  evaluateStressTest,
  evaluateCommunicationDraft,
} from '../utils/valueCreationEngine';
import {
  Gamepad2,
  ShieldCheck,
  Zap,
  RotateCcw,
  Award,
  Sliders,
  MessageSquareCode,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface BusinessGamingTabProps {
  initialFilterStreamId?: StreamId | 'all';
  bestMultiplier: number;
  onUpdateBestMultiplier: (val: number) => void;
}

type GamingMode = 'wargame' | 'stress-sandbox' | 'comm-duel';

export const BusinessGamingTab: React.FC<BusinessGamingTabProps> = ({
  initialFilterStreamId = 'all',
  bestMultiplier,
  onUpdateBestMultiplier,
}) => {
  const [activeMode, setActiveMode] = useState<GamingMode>('wargame');
  const [streamFilter, setStreamFilter] = useState<StreamId | 'all'>(initialFilterStreamId);

  useEffect(() => {
    setStreamFilter(initialFilterStreamId);
    setCurrentRoundIndex(0);
  }, [initialFilterStreamId]);

  // --- MODE 1: BOARDROOM WARGAME STATE ---
  const filteredRounds = useMemo(() => {
    if (streamFilter === 'all') return WARGAME_ROUNDS;
    return WARGAME_ROUNDS.filter((r) => r.streamId === streamFilter);
  }, [streamFilter]);

  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [tacticalSlider, setTacticalSlider] = useState<number>(85);
  const [roundResults, setRoundResults] = useState<WargameRoundResult[]>([]);

  const currentRound = filteredRounds[currentRoundIndex] ?? filteredRounds[0];

  const currentRoundResult = useMemo(
    () => roundResults.find((r) => r.roundId === currentRound?.id),
    [roundResults, currentRound]
  );

  const hudStats = useMemo(() => {
    let multiplier = 1.0;
    let capital = 100;
    let bandwidth = 100;
    let integrity = 100;

    for (const res of roundResults) {
      multiplier = Number((multiplier + res.achievedMultiplierDelta).toFixed(2));
      capital = Math.max(0, Math.min(150, capital + res.capitalDelta));
      bandwidth = Math.max(0, Math.min(150, bandwidth + res.bandwidthDelta));
      integrity = Math.max(0, Math.min(150, integrity + res.integrityDelta));
    }

    return {
      multiplier: Math.max(0.5, multiplier),
      capital,
      bandwidth,
      integrity,
      optimalChoices: roundResults.filter((r) => r.isOptimalStrategy).length,
    };
  }, [roundResults]);

  const handleSelectWargameOption = (optionId: string) => {
    if (!currentRound) return;
    const evaluation = evaluateWargameDecision(currentRound, optionId, tacticalSlider);

    setRoundResults((prev) => {
      const withoutCurrent = prev.filter((r) => r.roundId !== currentRound.id);
      const next = [...withoutCurrent, evaluation];
      const totalMult = next.reduce(
        (acc, item) => Number((acc + item.achievedMultiplierDelta).toFixed(2)),
        1.0
      );
      if (totalMult > bestMultiplier) {
        onUpdateBestMultiplier(totalMult);
      }
      return next;
    });
  };

  const handleResetWargame = () => {
    setRoundResults([]);
    setCurrentRoundIndex(0);
    setTacticalSlider(85);
  };

  // --- MODE 2: PORTFOLIO STRESS SANDBOX STATE ---
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(STRESS_SCENARIOS[0].id);
  const [capAlloc, setCapAlloc] = useState<Record<StreamId, number>>({
    'stream-housing': 25,
    'stream-mobility': 20,
    'stream-super-agent': 20,
    'stream-global-logistics': 20,
    'stream-projectivity': 15,
  });
  const [bwAlloc, setBwAlloc] = useState<Record<StreamId, number>>({
    'stream-housing': 25,
    'stream-mobility': 20,
    'stream-super-agent': 20,
    'stream-global-logistics': 20,
    'stream-projectivity': 15,
  });
  const [assignedSpecs, setAssignedSpecs] = useState<Record<StreamId, SpecialistRoleId>>({
    'stream-housing': 'analyst',
    'stream-mobility': 'reviewer',
    'stream-super-agent': 'twin_developer',
    'stream-global-logistics': 'organizer',
    'stream-projectivity': 'research',
  });

  const activeScenario = useMemo(
    () => STRESS_SCENARIOS.find((s) => s.id === selectedScenarioId) ?? STRESS_SCENARIOS[0],
    [selectedScenarioId]
  );

  const stressEval = useMemo(
    () => evaluateStressTest(activeScenario, capAlloc, bwAlloc, assignedSpecs),
    [activeScenario, capAlloc, bwAlloc, assignedSpecs]
  );

  const handleApplyOptimalStressAllocation = () => {
    setCapAlloc({
      'stream-housing': 25,
      'stream-mobility': 20,
      'stream-super-agent': 20,
      'stream-global-logistics': 25,
      'stream-projectivity': 10,
    });
    setBwAlloc({
      'stream-housing': 25,
      'stream-mobility': 25,
      'stream-super-agent': 20,
      'stream-global-logistics': 20,
      'stream-projectivity': 10,
    });
    setAssignedSpecs({
      'stream-housing': activeScenario.idealSpecialists['stream-housing'] ?? 'analyst',
      'stream-mobility': activeScenario.idealSpecialists['stream-mobility'] ?? 'reviewer',
      'stream-super-agent':
        activeScenario.idealSpecialists['stream-super-agent'] ?? 'twin_developer',
      'stream-global-logistics':
        activeScenario.idealSpecialists['stream-global-logistics'] ?? 'organizer',
      'stream-projectivity':
        activeScenario.idealSpecialists['stream-projectivity'] ?? 'research',
    });
  };

  // --- MODE 3: COMMUNICATION DUEL STATE ---
  const [activeChallengeId, setActiveChallengeId] = useState<string>(
    COMMUNICATION_CHALLENGES[0].id
  );
  const [selectedClausesByChallenge, setSelectedClausesByChallenge] = useState<
    Record<string, string[]>
  >({
    'comm-car-review': ['cc-1', 'cc-2', 'cc-4'],
    'comm-landlord-letter': ['cl-1', 'cl-2', 'cl-3'],
  });

  const activeChallenge = useMemo(
    () =>
      COMMUNICATION_CHALLENGES.find((c) => c.id === activeChallengeId) ??
      COMMUNICATION_CHALLENGES[0],
    [activeChallengeId]
  );

  const currentSelectedClauses =
    selectedClausesByChallenge[activeChallenge.id] ?? [];

  const duelEvaluation = useMemo(
    () => evaluateCommunicationDraft(activeChallenge, currentSelectedClauses),
    [activeChallenge, currentSelectedClauses]
  );

  const toggleClauseSelection = (clauseId: string) => {
    setSelectedClausesByChallenge((prev) => {
      const current = prev[activeChallenge.id] ?? [];
      const exists = current.includes(clauseId);
      const next = exists
        ? current.filter((id) => id !== clauseId)
        : [...current, clauseId];
      return {
        ...prev,
        [activeChallenge.id]: next,
      };
    });
  };

  return (
    <div className="tab-panel" data-testid="wargame-tab">
      {/* GAME MODE SWITCHER & HUD */}
      <section className="section-card">
        <div className="section-title-row">
          <div>
            <div className="brand-eyebrow">
              <Gamepad2 size={14} /> İNTERAKTİF BUSINESS GAMING & STRATEJİK KARAR SİMÜLASYONU
            </div>
            <h3>5x Value Creation Simülasyon Laboratuvarı</h3>
            <p className="section-subtitle">
              Gerçek vaka kısıtları altında sermaye, zaman ve kanıt bütünlüğünü yöneterek 5.0x değer çarpanına ulaş.
            </p>
          </div>

          <div className="gym-score-row">
            <span className="score-pill score-pill-highlight" data-testid="wargame-live-multiplier">
              Canlı Çarpan: <strong>{hudStats.multiplier.toFixed(2)}x</strong>
            </span>
            <span className="score-pill">
              Sermaye: <strong data-testid="hud-capital">{hudStats.capital}</strong>
            </span>
            <span className="score-pill">
              Odak Bandı: <strong data-testid="hud-bandwidth">{hudStats.bandwidth}</strong>
            </span>
            <span className="score-pill">
              Kanıt Bütünlüğü: <strong data-testid="hud-integrity">{hudStats.integrity}</strong>
            </span>
            <span className="score-pill">
              <Award size={14} /> Rekor: <strong>{bestMultiplier.toFixed(2)}x</strong>
            </span>
          </div>
        </div>

        {/* 3 GAME MODE BUTTONS */}
        <div className="game-mode-switcher">
          <button
            type="button"
            className={`tab-btn ${activeMode === 'wargame' ? 'active' : ''}`}
            onClick={() => setActiveMode('wargame')}
            data-testid="mode-wargame-btn"
          >
            <Zap size={15} />
            <span>1. 5-Stream Boardroom Wargame</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeMode === 'stress-sandbox' ? 'active' : ''}`}
            onClick={() => setActiveMode('stress-sandbox')}
            data-testid="mode-stress-btn"
          >
            <Sliders size={15} />
            <span>2. Portföy Stres Testi & Ajan Orkestrasyonu</span>
          </button>
          <button
            type="button"
            className={`tab-btn ${activeMode === 'comm-duel' ? 'active' : ''}`}
            onClick={() => setActiveMode('comm-duel')}
            data-testid="mode-duel-btn"
          >
            <MessageSquareCode size={15} />
            <span>3. "Kısa & Eksiksiz" / "Show, Don’t Tell" Düellosu</span>
          </button>
        </div>
      </section>

      {/* MODE 1: BOARDROOM WARGAME */}
      {activeMode === 'wargame' && currentRound && (
        <section className="section-card" data-testid="wargame-board">
          <div className="section-title-row">
            <div className="wargame-filter-bar">
              <span className="subtle-tag">{currentRound.stageBadge}</span>
              <select
                aria-label="Stream filtresi"
                value={streamFilter}
                onChange={(e) => {
                  setStreamFilter(e.target.value as StreamId | 'all');
                  setCurrentRoundIndex(0);
                }}
                data-testid="wargame-stream-filter"
              >
                <option value="all">Tüm Streamler ({WARGAME_ROUNDS.length} Senaryo)</option>
                {STREAM_CASE_STUDIES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code} · {s.shortTitle}
                  </option>
                ))}
              </select>
            </div>

            <div className="gym-score-row">
              <span className="subtle-tag">
                Tamamlanan Tur: {roundResults.length} / {WARGAME_ROUNDS.length}
              </span>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleResetWargame}
                data-testid="reset-wargame-btn"
              >
                <RotateCcw size={14} /> Simülasyonu Sıfırla
              </button>
            </div>
          </div>

          {/* ROUND STEPPER */}
          <div className="round-stepper">
            {filteredRounds.map((r, idx) => {
              const done = roundResults.some((res) => res.roundId === r.id);
              return (
                <button
                  key={r.id}
                  type="button"
                  className={`round-step-pill ${idx === currentRoundIndex ? 'active' : ''} ${
                    done ? 'done' : ''
                  }`}
                  onClick={() => setCurrentRoundIndex(idx)}
                  data-testid={`round-step-${idx}`}
                >
                  Tur {idx + 1}: {r.id.replace('wg-', '')} {done ? '✓' : ''}
                </button>
              );
            })}
          </div>

          {/* SCENARIO BRIEFING */}
          <div className="wargame-scenario-box">
            <h3 data-testid="wargame-round-title">{currentRound.title}</h3>
            <p className="scenario-context">{currentRound.scenarioContext}</p>
            <div className="constraint-callout">
              <AlertOctagon size={16} />
              <span>{currentRound.constraintAlert}</span>
            </div>
          </div>

          {/* TACTICAL ALLOCATION SLIDER */}
          <div className="wargame-slider-box">
            <div className="lever-label-row">
              <label htmlFor="wargame-tactical-slider">{currentRound.sliderLabel}</label>
              <span className="lever-val-badge">%{tacticalSlider}</span>
            </div>
            <input
              id="wargame-tactical-slider"
              type="range"
              min={10}
              max={100}
              step={5}
              value={tacticalSlider}
              onChange={(e) => setTacticalSlider(Number(e.target.value))}
              className="lever-slider"
              data-testid="wargame-tactical-slider"
            />
            <small className="lever-desc">{currentRound.sliderHint}</small>
          </div>

          {/* 3 STRATEGIC DECISION CARDS */}
          <div className="wargame-options-grid">
            {currentRound.options.map((opt) => {
              const isPicked = currentRoundResult?.selectedOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`wargame-option-card ${isPicked ? 'picked' : ''} ${
                    isPicked && opt.strategyArchetype === '5x Asimetrik Kaldıraç'
                      ? 'optimal-picked'
                      : ''
                  }`}
                  onClick={() => handleSelectWargameOption(opt.id)}
                  data-testid={`wargame-opt-${opt.id}`}
                >
                  <div className="wargame-opt-top">
                    <span className="deck-kind-label">{opt.strategyArchetype}</span>
                    <span className="era-pill">
                      {opt.multiplierDelta >= 0 ? `+${opt.multiplierDelta}x` : `${opt.multiplierDelta}x`}
                    </span>
                  </div>
                  <h4>{opt.label}</h4>
                  <p>{opt.description}</p>
                  <div className="opt-deltas">
                    <span>Sermaye: {opt.capitalDelta >= 0 ? `+${opt.capitalDelta}` : opt.capitalDelta}</span>
                    <span>Odak: {opt.bandwidthDelta >= 0 ? `+${opt.bandwidthDelta}` : opt.bandwidthDelta}</span>
                    <span>Kanıt: {opt.integrityDelta >= 0 ? `+${opt.integrityDelta}` : opt.integrityDelta}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* IMMEDIATE CAUSAL DEBRIEF */}
          {currentRoundResult && (
            <div
              className={`debrief-box ${
                currentRoundResult.isOptimalStrategy ? 'debrief-optimal' : 'debrief-warning'
              }`}
              data-testid="wargame-debrief"
            >
              <div className="debrief-header">
                <strong>
                  {currentRoundResult.isOptimalStrategy
                    ? '5x Stratejik Kaldıraç Doğrulandı!'
                    : 'Stratejik Sapma / Marjinal Kayıp Analizi'}
                </strong>
                <span>
                  Tur Çarpan Etkisi:{' '}
                  {currentRoundResult.achievedMultiplierDelta >= 0
                    ? `+${currentRoundResult.achievedMultiplierDelta}x`
                    : `${currentRoundResult.achievedMultiplierDelta}x`}
                </span>
              </div>
              <p>{currentRoundResult.debrief}</p>
              <div className="debrief-footer">
                <small>
                  <strong>Metodoloji İlkesi:</strong> {currentRoundResult.principle}
                </small>
                {currentRoundIndex < filteredRounds.length - 1 && (
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setCurrentRoundIndex((prev) => prev + 1)}
                    data-testid="next-wargame-round-btn"
                  >
                    Sonraki Tura Geç <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* MODE 2: PORTFOLIO STRESS SANDBOX & AGENT ORCHESTRATION */}
      {activeMode === 'stress-sandbox' && (
        <section className="section-card" data-testid="stress-sandbox-board">
          <div className="section-title-row">
            <div>
              <h3>Portföy Stres Testi & Super Agent Orkestrasyonu</h3>
              <p className="section-subtitle">
                Makro şok senaryosu seç, 5 stream arasında sermaye/odak bütçesini (%100 sınırı içinde) dağıt ve doğru uzman ajanı ata.
              </p>
            </div>
            <button
              type="button"
              className="btn-primary"
              onClick={handleApplyOptimalStressAllocation}
              data-testid="apply-optimal-stress-btn"
            >
              <Sparkles size={15} /> 5x Optimal Dağıtımı Uygula
            </button>
          </div>

          <div className="stress-scenario-selector">
            {STRESS_SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                type="button"
                className={`pillar-card ${sc.id === activeScenario.id ? 'active' : ''}`}
                onClick={() => setSelectedScenarioId(sc.id)}
                data-testid={`stress-scenario-${sc.id}`}
              >
                <div className="pillar-top">
                  <span className="pillar-stage-badge">{sc.severity}</span>
                </div>
                <h4>{sc.title}</h4>
                <p>{sc.subtitle}</p>
              </button>
            ))}
          </div>

          <div className="decision-need-banner" style={{ marginTop: '14px' }}>
            <strong>Stres Şoku:</strong> {activeScenario.shockDescription}
          </div>

          <div className="stress-kpi-row">
            <div className="sim-metric-box highlight">
              <span>PORTFÖY DAYANIKLILIK SKORU</span>
              <strong data-testid="stress-resilience-score">{stressEval.resilienceScore} / 100</strong>
              <small>{stressEval.grade}</small>
            </div>
            <div className="sim-metric-box">
              <span>TOPLAM SERMAYE TAHSİSİ</span>
              <strong className={stressEval.totalCapitalAllocated > 100 ? 'text-rose' : ''}>
                %{stressEval.totalCapitalAllocated} / %100
              </strong>
            </div>
            <div className="sim-metric-box">
              <span>TOPLAM ODAK BANDI</span>
              <strong className={stressEval.totalBandwidthAllocated > 100 ? 'text-rose' : ''}>
                %{stressEval.totalBandwidthAllocated} / %100
              </strong>
            </div>
          </div>

          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Stream</th>
                  <th>Sermaye (%)</th>
                  <th>Odak Bandı (%)</th>
                  <th>Atanan Uzman Ajan (Specialist)</th>
                  <th>Teşhis & Durum</th>
                </tr>
              </thead>
              <tbody>
                {STREAM_CASE_STUDIES.map((st) => {
                  const diag = stressEval.streamDiagnostics.find((d) => d.streamId === st.id);
                  return (
                    <tr key={st.id}>
                      <td>
                        <strong>
                          {st.code} · {st.shortTitle}
                        </strong>
                      </td>
                      <td>
                        <input
                          type="number"
                          min={0}
                          max={60}
                          step={5}
                          value={capAlloc[st.id]}
                          onChange={(e) =>
                            setCapAlloc((prev) => ({
                              ...prev,
                              [st.id]: Number(e.target.value),
                            }))
                          }
                          style={{ width: '74px' }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min={0}
                          max={60}
                          step={5}
                          value={bwAlloc[st.id]}
                          onChange={(e) =>
                            setBwAlloc((prev) => ({
                              ...prev,
                              [st.id]: Number(e.target.value),
                            }))
                          }
                          style={{ width: '74px' }}
                        />
                      </td>
                      <td>
                        <select
                          value={assignedSpecs[st.id]}
                          onChange={(e) =>
                            setAssignedSpecs((prev) => ({
                              ...prev,
                              [st.id]: e.target.value as SpecialistRoleId,
                            }))
                          }
                        >
                          {(Object.keys(SPECIALIST_META) as SpecialistRoleId[]).map((role) => (
                            <option key={role} value={role}>
                              {SPECIALIST_META[role].label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>
                        <span
                          className={`evidence-badge ${
                            diag?.passedCapital && diag?.passedBandwidth && diag?.specialistMatched
                              ? 'badge-verified'
                              : 'badge-context'
                          }`}
                        >
                          {diag?.statusText}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="boundary-callout" style={{ marginTop: '14px' }}>
            <ShieldCheck size={16} />
            <span>
              <strong>5x Çözüm Dersi:</strong> {activeScenario.mitigationLesson}
            </span>
          </div>
        </section>
      )}

      {/* MODE 3: COMMUNICATION DUEL ("KISA AMA EKSİKSİZ" & "SHOW, DON'T TELL") */}
      {activeMode === 'comm-duel' && (
        <section className="section-card" data-testid="comm-duel-board">
          <div className="section-title-row">
            <div>
              <h3>"Kısa Ama Eksiksiz" & "Show, Don’t Tell" Müzakere Düellosu</h3>
              <p className="section-subtitle">
                Kelime bütçesini aşmadan ve yapay klişelere düşmeden tüm kritik kanıt maddelerini içeren 5x mesajı inşa et.
              </p>
            </div>
            <div className="lever-preset-btns">
              {COMMUNICATION_CHALLENGES.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  className={`btn-secondary ${ch.id === activeChallenge.id ? 'active-pill' : ''}`}
                  onClick={() => setActiveChallengeId(ch.id)}
                  data-testid={`select-duel-${ch.id}`}
                >
                  {ch.code} · {ch.principleBadge}
                </button>
              ))}
            </div>
          </div>

          <div className="decision-need-banner">
            <strong>{activeChallenge.title}</strong> ({activeChallenge.sourceRef}) —{' '}
            {activeChallenge.context}
          </div>

          <div className="stress-kpi-row">
            <div className="sim-metric-box">
              <span>KELİME BÜTÇESİ</span>
              <strong className={!duelEvaluation.withinBudget ? 'text-rose' : 'text-emerald'}>
                {duelEvaluation.wordCount} / {activeChallenge.maxWordBudget} kelime
              </strong>
            </div>
            <div className="sim-metric-box">
              <span>KRİTİK KANIT / MADDE TAMLIĞI</span>
              <strong data-testid="duel-critical-count">
                {duelEvaluation.criticalIncluded} / {duelEvaluation.requiredCritical}
              </strong>
            </div>
            <div className="sim-metric-box highlight">
              <span>5X İLETİŞİM SKORU</span>
              <strong data-testid="duel-score">{duelEvaluation.score} / 100</strong>
            </div>
          </div>

          <div className="clauses-grid">
            {activeChallenge.clauses.map((clause) => {
              const checked = currentSelectedClauses.includes(clause.id);
              return (
                <button
                  key={clause.id}
                  type="button"
                  className={`clause-card ${checked ? 'selected' : ''} ${
                    checked && clause.isFluffOrUnsupported ? 'clause-error' : ''
                  }`}
                  onClick={() => toggleClauseSelection(clause.id)}
                  data-testid={`clause-${clause.id}`}
                >
                  <div className="clause-top">
                    <span className="tag-chip">{clause.wordCount} kelime</span>
                    {clause.isCriticalFact && (
                      <span className="evidence-badge badge-verified">Kritik Kanıt</span>
                    )}
                    {clause.isFluffOrUnsupported && (
                      <span className="evidence-badge badge-context">Klişe / Hatalı İma</span>
                    )}
                  </div>
                  <p className="clause-text">“{clause.text}”</p>
                  <small className="clause-note">{clause.impactNote}</small>
                </button>
              );
            })}
          </div>

          <div
            className={duelEvaluation.isFiveXSuccess ? 'success-box' : 'error-box'}
            style={{ marginTop: '14px' }}
            data-testid="duel-feedback"
          >
            <CheckCircle2 size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            {duelEvaluation.feedback}
          </div>
        </section>
      )}
    </div>
  );
};
