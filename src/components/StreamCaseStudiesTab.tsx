import React, { useState, useMemo } from 'react';
import {
  STREAM_CASE_STUDIES,
  FIVE_X_METHODOLOGY_PILLARS,
  SPECIALIST_META,
} from '../data/valueCreationStreams';
import {
  StreamId,
  CustomFiveXCase,
} from '../types/valueCreation';
import {
  calculateStreamSimulation,
  validateCustomFiveXCase,
  loadChecklistState,
  saveChecklistState,
} from '../utils/valueCreationEngine';
import {
  Zap,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Scale,
  FileCheck2,
  PlusCircle,
  Trash2,
  Sparkles,
  ArrowRight,
  Layers,
  ShieldAlert,
} from 'lucide-react';

interface StreamCaseStudiesTabProps {
  customCases: CustomFiveXCase[];
  onAddCustomCase: (item: CustomFiveXCase) => void;
  onDeleteCustomCase: (id: string) => void;
  onLaunchWargameForStream: (streamId: StreamId) => void;
}

export const StreamCaseStudiesTab: React.FC<StreamCaseStudiesTabProps> = ({
  customCases,
  onAddCustomCase,
  onDeleteCustomCase,
  onLaunchWargameForStream,
}) => {
  const [selectedStreamId, setSelectedStreamId] = useState<StreamId>('stream-housing');
  const [activePillarStage, setActivePillarStage] = useState<'1x' | '2x' | '3x' | '4x' | '5x'>('5x');

  // Initialize lever values for all streams
  const [leverState, setLeverState] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const s of STREAM_CASE_STUDIES) {
      for (const l of s.levers) {
        initial[l.id] = l.defaultValue;
      }
    }
    return initial;
  });

  const [checkedVerifications, setCheckedVerifications] = useState<Record<string, boolean>>(
    () => loadChecklistState()
  );

  // Custom case builder form state
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customStreamId, setCustomStreamId] = useState<StreamId>('stream-housing');
  const [customDatedContext, setCustomDatedContext] = useState('');
  const [customOneOffEur, setCustomOneOffEur] = useState<number>(12000);
  const [customRecurringEur, setCustomRecurringEur] = useState<number>(2400);
  const [customOfficialPct, setCustomOfficialPct] = useState<number>(30);
  const [customSmartAlt, setCustomSmartAlt] = useState('');
  const [customVerifyText, setCustomVerifyText] = useState('');
  const [customErrors, setCustomErrors] = useState<string[]>([]);
  const [customSavedToast, setCustomSavedToast] = useState(false);

  const selectedStream = useMemo(
    () =>
      STREAM_CASE_STUDIES.find((s) => s.id === selectedStreamId) ??
      STREAM_CASE_STUDIES[0],
    [selectedStreamId]
  );

  const simulationsByStream = useMemo(() => {
    const map: Record<StreamId, ReturnType<typeof calculateStreamSimulation>> = {} as Record<
      StreamId,
      ReturnType<typeof calculateStreamSimulation>
    >;
    for (const s of STREAM_CASE_STUDIES) {
      map[s.id] = calculateStreamSimulation(s, leverState);
    }
    return map;
  }, [leverState]);

  const currentSim = simulationsByStream[selectedStream.id];

  const portfolioSummary = useMemo(() => {
    const sims = Object.values(simulationsByStream);
    const avgMultiplier =
      sims.reduce((acc, s) => acc + s.liveMultiplier, 0) / (sims.length || 1);
    const totalSavingsEur = sims.reduce((acc, s) => acc + s.netSavingsEur, 0);
    const avgRiskReduction =
      sims.reduce((acc, s) => acc + s.riskReductionPct, 0) / (sims.length || 1);
    return {
      avgMultiplier: avgMultiplier.toFixed(2),
      totalSavingsEur,
      avgRiskReduction: Math.round(avgRiskReduction),
    };
  }, [simulationsByStream]);

  const handleLeverChange = (leverId: string, val: number) => {
    setLeverState((prev) => ({
      ...prev,
      [leverId]: val,
    }));
  };

  const handleOptimizeStreamLevers = () => {
    setLeverState((prev) => {
      const next = { ...prev };
      for (const l of selectedStream.levers) {
        next[l.id] = l.optimalValue;
      }
      return next;
    });
  };

  const handleBaselineStreamLevers = () => {
    setLeverState((prev) => {
      const next = { ...prev };
      for (const l of selectedStream.levers) {
        next[l.id] = l.min;
      }
      return next;
    });
  };

  const toggleVerificationItem = (key: string) => {
    setCheckedVerifications((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveChecklistState(next);
      return next;
    });
  };

  const handleSaveCustomCase = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCustomFiveXCase({
      title: customTitle,
      streamId: customStreamId,
      datedContext: customDatedContext,
      oneOffCostEur: customOneOffEur,
      recurringAnnualCostEur: customRecurringEur,
      officialFeeSharePct: customOfficialPct,
      smartAlternativeSummary: customSmartAlt,
      preVerificationText: customVerifyText,
      stageScores: {
        evidenceAudit1x: 90,
        zeroGapLogic2x: 88,
        marginalLeverage3x: 92,
        precisionExecution4x: 90,
        autonomousSystem5x: 85,
      },
    });

    if (!validation.valid) {
      setCustomErrors(validation.errors);
      setCustomSavedToast(false);
      return;
    }

    const newCase: CustomFiveXCase = {
      id: `custom-5x-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
      title: customTitle.trim(),
      streamId: customStreamId,
      datedContext: customDatedContext.trim(),
      oneOffCostEur: customOneOffEur,
      recurringAnnualCostEur: customRecurringEur,
      officialFeeSharePct: customOfficialPct,
      smartAlternativeSummary: customSmartAlt.trim(),
      preVerificationChecklist: customVerifyText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
      stageScores: {
        evidenceAudit1x: 90,
        zeroGapLogic2x: 88,
        marginalLeverage3x: 92,
        precisionExecution4x: 90,
        autonomousSystem5x: 85,
      },
      calculatedMultiplier: validation.calculatedMultiplier,
    };

    onAddCustomCase(newCase);
    setCustomErrors([]);
    setCustomSavedToast(true);
    setCustomTitle('');
    setCustomDatedContext('');
    setCustomSmartAlt('');
    setCustomVerifyText('');
  };

  const specialistInfo = SPECIALIST_META[selectedStream.recommendedSpecialist];

  const completedChecksCount = selectedStream.decisionMatrix.preDecisionVerifications.filter(
    (_, idx) => checkedVerifications[`${selectedStream.id}-v-${idx}`]
  ).length;

  return (
    <div className="tab-panel" data-testid="streams-tab">
      {/* 5X METHODOLOGY ARCHITECTURE BAR */}
      <section className="section-card methodology-banner">
        <div className="section-title-row">
          <div>
            <div className="brand-eyebrow">
              <Sparkles size={13} /> 5X VALUE CREATION METODOLOJİSİ · KİŞİSEL KARAR & SİSTEM MİMARİSİ
            </div>
            <h3>1x’ten 5x’e Değer Üretim Zinciri</h3>
            <p className="section-subtitle">
              Özel alan notlarındaki (EX062–EX080, OH001–OH060, 2021–2026 izleri) tüm karar ilkelerini
              5 aşamalı bileşik değer çarpanına dönüştüren metodoloji.
            </p>
          </div>
          <div className="portfolio-kpi-strip">
            <div className="mini-kpi">
              <span>PORTFÖY ÇARPANI</span>
              <strong data-testid="portfolio-avg-multiplier">{portfolioSummary.avgMultiplier}x</strong>
            </div>
            <div className="mini-kpi">
              <span>5X NET SERMAYE / ZAMAN KAZANIMI</span>
              <strong className="text-emerald" data-testid="portfolio-total-savings">
                +{portfolioSummary.totalSavingsEur.toLocaleString('tr-TR')} €
              </strong>
            </div>
            <div className="mini-kpi">
              <span>RİSK AZALTIM ENDEKSİ</span>
              <strong>%{portfolioSummary.avgRiskReduction}</strong>
            </div>
          </div>
        </div>

        <div className="pillars-grid">
          {FIVE_X_METHODOLOGY_PILLARS.map((pillar) => (
            <button
              key={pillar.stage}
              type="button"
              className={`pillar-card ${activePillarStage === pillar.stage ? 'active' : ''}`}
              onClick={() => setActivePillarStage(pillar.stage)}
              data-testid={`pillar-${pillar.stage}`}
            >
              <div className="pillar-top">
                <span className="pillar-stage-badge">{pillar.stage}</span>
                <span className="pillar-source">{pillar.sourceTag}</span>
              </div>
              <h4>{pillar.name}</h4>
              <p>{pillar.summary}</p>
            </button>
          ))}
        </div>
      </section>

      {/* 5 STREAM SELECTOR CARDS */}
      <section className="streams-selector-grid" aria-label="5x Değer Akışları (Streams)">
        {STREAM_CASE_STUDIES.map((stream) => {
          const sim = simulationsByStream[stream.id];
          const isSelected = stream.id === selectedStream.id;
          return (
            <button
              key={stream.id}
              type="button"
              className={`stream-select-card ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedStreamId(stream.id)}
              data-testid={`select-${stream.id}`}
            >
              <div className="stream-select-top">
                <span className="stream-code">{stream.code}</span>
                <span className="stream-mult-pill" data-testid={`mult-badge-${stream.id}`}>
                  {sim.liveMultiplier}x ({sim.unlockedStage})
                </span>
              </div>
              <h4>{stream.shortTitle}</h4>
              <p>{stream.eraSpan}</p>
              <div className="stream-select-footer">
                <span>Kazanım: +{sim.netSavingsEur.toLocaleString('tr-TR')} €</span>
                <ArrowRight size={14} />
              </div>
            </button>
          );
        })}
      </section>

      {/* ACTIVE STREAM CASE STUDY DEEP DIVE */}
      <section className="section-card case-study-hero" data-testid="active-case-study">
        <div className="case-study-header">
          <div>
            <div className="memory-badges">
              <span className="date-pill">{selectedStream.code} · VAKA ANALİZİ</span>
              <span className="evidence-badge badge-verified">{selectedStream.evidenceBadge}</span>
              <span className="category-pill">{specialistInfo.label}</span>
            </div>
            <h2 className="case-study-title" data-testid="active-stream-title">
              {selectedStream.title}
            </h2>
            <p className="case-study-subtitle">{selectedStream.subtitle}</p>
          </div>

          <div className="case-study-actions">
            <div className="live-multiplier-box">
              <span>CANLI STREAM ÇARPANI</span>
              <strong data-testid="active-stream-multiplier">
                {currentSim.liveMultiplier}x
              </strong>
              <small>Açılan Aşama: {currentSim.unlockedStage}</small>
            </div>
            <button
              type="button"
              className="btn-primary"
              onClick={() => onLaunchWargameForStream(selectedStream.id)}
              data-testid="launch-stream-wargame-btn"
            >
              <Zap size={15} /> Bu Stream’i Wargame’de Oyna
            </button>
          </div>
        </div>

        {/* CORE INSIGHT & 2021-2026 BRIDGE */}
        <div className="insight-bridge-grid">
          <div className="insight-callout">
            <h4>
              <Sparkles size={15} /> 5x Çekirdek İçgörü (Core Value Thesis)
            </h4>
            <p>{selectedStream.coreInsight}</p>
            <div className="tag-row">
              {selectedStream.sourceRefs.map((ref) => (
                <span key={ref} className="tag-chip">
                  Kaynak: {ref}
                </span>
              ))}
            </div>
          </div>

          <div className="bridge-callout">
            <h4>
              <Layers size={15} /> 5 Yıllık Dönüşüm Köprüsü (2021 ↔ 2026)
            </h4>
            <p>
              <strong>Kasım 2021:</strong> {selectedStream.historicalBridge.from2021}
            </p>
            <p>
              <strong>2026 Gündemi:</strong> {selectedStream.historicalBridge.to2026}
            </p>
          </div>
        </div>

        {/* 1X TO 5X STAGE EVOLUTION LADDER */}
        <div className="stage-ladder-section">
          <h4>1x → 5x Aşama Evrimi (Case Study Adımları)</h4>
          <div className="stage-ladder-grid">
            {selectedStream.fiveXStages.map((st) => {
              const reached =
                Number(st.stage[0]) <= Number(currentSim.unlockedStage[0]);
              return (
                <div
                  key={st.stage}
                  className={`stage-step-card ${reached ? 'reached' : ''}`}
                >
                  <div className="stage-step-header">
                    <span className="stage-num">{st.stage}</span>
                    <span className="stage-impact">{st.metricImpact}</span>
                  </div>
                  <h5>{st.title}</h5>
                  <small className="stage-principle">{st.principle}</small>
                  <p>{st.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INTERACTIVE 5X LEVERS & COST SPLIT */}
      <div className="analytics-two-col">
        {/* LEVER SIMULATOR */}
        <section className="section-card">
          <div className="section-title-row">
            <div>
              <h3>
                <Sliders size={18} /> İnteraktif 5x Kaldıraç Simülatörü
              </h3>
              <p className="section-subtitle">
                Parametreleri değiştirerek bu akıştaki marjinal fayda, maliyet ve risk çarpanını canlı test et.
              </p>
            </div>
            <div className="lever-preset-btns">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleBaselineStreamLevers}
                data-testid="preset-1x-btn"
              >
                1x Baz
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleOptimizeStreamLevers}
                data-testid="preset-5x-btn"
              >
                5x Optimuma Çek
              </button>
            </div>
          </div>

          <div className="levers-list">
            {selectedStream.levers.map((lever) => {
              const val = leverState[lever.id] ?? lever.defaultValue;
              return (
                <div key={lever.id} className="lever-item">
                  <div className="lever-label-row">
                    <label htmlFor={`slider-${lever.id}`}>{lever.label}</label>
                    <span className="lever-val-badge">
                      {val}
                      {lever.unit} <small>(5x Hedef: {lever.optimalValue}{lever.unit})</small>
                    </span>
                  </div>
                  <input
                    id={`slider-${lever.id}`}
                    type="range"
                    min={lever.min}
                    max={lever.max}
                    step={lever.step}
                    value={val}
                    onChange={(e) => handleLeverChange(lever.id, Number(e.target.value))}
                    className="lever-slider"
                    data-testid={`slider-${lever.id}`}
                  />
                  <p className="lever-desc">{lever.description}</p>
                </div>
              );
            })}
          </div>

          <div className="sim-metrics-grid">
            <div className="sim-metric-box">
              <span>1X BAZ MALİYET</span>
              <strong>{currentSim.baselineTotalEur.toLocaleString('tr-TR')} €</strong>
            </div>
            <div className="sim-metric-box">
              <span>SİMÜLE EDİLEN MALİYET</span>
              <strong data-testid="simulated-cost-eur">
                {currentSim.simulatedTotalEur.toLocaleString('tr-TR')} €
              </strong>
            </div>
            <div className="sim-metric-box highlight">
              <span>NET 5X KAZANIM / KORUMA</span>
              <strong data-testid="simulated-savings-eur">
                +{currentSim.netSavingsEur.toLocaleString('tr-TR')} €
              </strong>
            </div>
            <div className="sim-metric-box">
              <span>RİSK AZALTIMI & UYUM</span>
              <strong>%{currentSim.riskReductionPct}</strong>
            </div>
          </div>
        </section>

        {/* COST SPLIT MATRIX (ONE-OFF VS RECURRING & OFFICIAL VS ESTIMATED) */}
        <section className="section-card">
          <div className="section-title-row">
            <div>
              <h3>
                <Scale size={18} /> Maliyet & Kaynak Ayrımı Matrisi
              </h3>
              <p className="section-subtitle">
                03 - ChatGPT Taslağı §5 uyarınca Tek Seferlik vs. Tekrarlayan ve Resmî Ücret vs. Tahmini Maliyet ayrımı.
              </p>
            </div>
          </div>

          <div className="cost-summary-pills">
            <div className="cost-pill">
              <span>Tek Seferlik (Simüle):</span>
              <strong>{currentSim.oneOffSimulatedEur.toLocaleString('tr-TR')} €</strong>
            </div>
            <div className="cost-pill">
              <span>Yıllık Tekrarlayan (Simüle):</span>
              <strong>{currentSim.recurringSimulatedEur.toLocaleString('tr-TR')} €</strong>
            </div>
            <div className="cost-pill">
              <span>Resmî Ücret Tabanı:</span>
              <strong>{currentSim.officialFeesEur.toLocaleString('tr-TR')} €</strong>
            </div>
            <div className="cost-pill">
              <span>Tahmini Değişken:</span>
              <strong>{currentSim.estimatedVariableEur.toLocaleString('tr-TR')} €</strong>
            </div>
          </div>

          <div className="comparison-table-wrap">
            <table className="comparison-table cost-table">
              <thead>
                <tr>
                  <th>Kalem</th>
                  <th>Tür / Kesinlik</th>
                  <th>1x Baz</th>
                  <th>5x Hedef</th>
                </tr>
              </thead>
              <tbody>
                {selectedStream.costSplit.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.label}</strong>
                      <div className="table-subnote">{item.note}</div>
                    </td>
                    <td>
                      <span className="tag-chip">
                        {item.category === 'tek-seferlik' ? 'Tek Seferlik' : 'Tekrarlayan'}
                      </span>{' '}
                      <span
                        className={`tag-chip ${
                          item.certainty === 'resmi-ucret' ? 'badge-verified' : 'badge-context'
                        }`}
                      >
                        {item.certainty === 'resmi-ucret' ? 'Resmî Ücret' : 'Tahmini Maliyet'}
                      </span>
                    </td>
                    <td>{item.baselineAmountEur.toLocaleString('tr-TR')} €</td>
                    <td className="text-emerald">
                      <strong>{item.optimized5xAmountEur.toLocaleString('tr-TR')} €</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* 7-STEP DECISION STANDARD MATRIX */}
      <section className="section-card">
        <div className="section-title-row">
          <div>
            <h3>
              <FileCheck2 size={18} /> 7 Adımlı Karar Destek ve Doğrulama Matrisi
            </h3>
            <p className="section-subtitle">
              İhtiyaç, 3 karşılaştırılabilir seçenek, teknik/hukuki risk sınıflandırması, kesin bilgi vs. olasılık ayrımı ve karar öncesi kontrol listesi.
            </p>
          </div>
          <span className="subtle-tag">
            Doğrulama Tamlığı: {completedChecksCount} /{' '}
            {selectedStream.decisionMatrix.preDecisionVerifications.length}
          </span>
        </div>

        <div className="decision-need-banner">
          <strong>Karar İhtiyacı:</strong> {selectedStream.decisionMatrix.need}
        </div>

        {/* 3 COMPARABLE OPTIONS */}
        <div className="options-comparison-grid">
          {selectedStream.decisionMatrix.options.map((opt) => (
            <div
              key={opt.name}
              className={`option-compare-card ${
                opt.tag === '5x Akıllı Alternatif' ? 'option-5x' : ''
              }`}
            >
              <div className="option-compare-top">
                <span className="era-pill">{opt.tag}</span>
                <strong>Çarpan: {opt.multiplier}</strong>
              </div>
              <h4>{opt.name}</h4>
              <p>{opt.summary}</p>
            </div>
          ))}
        </div>

        <div className="analytics-two-col" style={{ marginTop: '16px' }}>
          {/* TECHNICAL & LEGAL RISKS */}
          <div className="sub-matrix-box">
            <h4>
              <ShieldAlert size={16} /> Teknik, Hukuki ve Finansal Risk Sınıflandırması
            </h4>
            <ul className="matrix-list">
              {selectedStream.decisionMatrix.technicalAndLegalRisks.map((r, i) => (
                <li key={i}>
                  <span className="risk-type-pill">{r.type}:</span> <strong>{r.item}</strong>
                  <div className="risk-mitigation">5x Önlem: {r.mitigation}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* CERTAINTY VS PROBABILITY */}
          <div className="sub-matrix-box">
            <h4>
              <AlertTriangle size={16} /> Kesin Bilgi (Doğrulanmış İz) vs. Olasılık Ayrımı
            </h4>
            <div className="certainty-block">
              <strong className="text-emerald">Doğrulanmış Tarihli Kayıtlar:</strong>
              <ul className="matrix-list">
                {selectedStream.decisionMatrix.certaintyVsProbability.verifiedFacts.map(
                  (f, i) => (
                    <li key={i}>{f}</li>
                  )
                )}
              </ul>
            </div>
            <div className="certainty-block" style={{ marginTop: '10px' }}>
              <strong className="text-amber">Olasılıklar & Doğrulanması Gereken Varsayımlar:</strong>
              <ul className="matrix-list">
                {selectedStream.decisionMatrix.certaintyVsProbability.probabilitiesAndAssumptions.map(
                  (p, i) => (
                    <li key={i}>{p}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* EXPERT INSPECTIONS & INTERACTIVE PRE-DECISION CHECKLIST */}
        <div className="analytics-two-col" style={{ marginTop: '16px' }}>
          <div className="sub-matrix-box">
            <h4>Gerekli Uzman İncelemeleri & Öneri</h4>
            <p className="recommendation-text">
              {selectedStream.decisionMatrix.recommendationAndRationale}
            </p>
            <div className="tag-row">
              {selectedStream.decisionMatrix.expertInspectionsRequired.map((exp) => (
                <span key={exp} className="tag-chip">
                  Uzman: {exp}
                </span>
              ))}
            </div>
          </div>

          <div className="sub-matrix-box">
            <h4>Karar Öncesi Doğrulama Kontrol Listesi (Etkileşimli)</h4>
            <div className="checklist-items">
              {selectedStream.decisionMatrix.preDecisionVerifications.map((item, idx) => {
                const checkKey = `${selectedStream.id}-v-${idx}`;
                const isChecked = !!checkedVerifications[checkKey];
                return (
                  <label key={checkKey} className="checklist-row">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleVerificationItem(checkKey)}
                      data-testid={`verify-check-${selectedStream.id}-${idx}`}
                    />
                    <span className={isChecked ? 'checked-text' : ''}>{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM 5X CASE BUILDER */}
      <section className="section-card">
        <div className="section-title-row">
          <div>
            <h3>
              <PlusCircle size={18} /> Yeni 5x Karar Vakası / Senaryosu Oluştur
            </h3>
            <p className="section-subtitle">
              Kendi yeni kişisel karar başlığını tek seferlik/tekrarlayan maliyet ayrımı ve düşük yatırımlı 5x akıllı alternatifiyle kaydet.
            </p>
          </div>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setShowCustomForm((prev) => !prev)}
            data-testid="toggle-custom-case-form"
          >
            {showCustomForm ? 'Formu Gizle' : 'Yeni 5x Vaka Ekle'}
          </button>
        </div>

        {showCustomForm && (
          <form onSubmit={handleSaveCustomCase} className="custom-case-form" data-testid="custom-case-form">
            {customErrors.length > 0 && (
              <div className="error-box" data-testid="custom-case-errors">
                {customErrors.map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="custom-case-title">Karar / Vaka Başlığı</label>
                <input
                  id="custom-case-title"
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Örn: Wassenaar Güneş Paneli & Isı Pompası 5x Analizi"
                />
              </div>

              <div className="form-field">
                <label htmlFor="custom-case-stream">İlgili 5x Stream</label>
                <select
                  id="custom-case-stream"
                  value={customStreamId}
                  onChange={(e) => setCustomStreamId(e.target.value as StreamId)}
                >
                  {STREAM_CASE_STUDIES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code} · {s.shortTitle}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="custom-case-context">Tarihli Bağlam & Kaynak Sınırı</label>
                <input
                  id="custom-case-context"
                  type="text"
                  value={customDatedContext}
                  onChange={(e) => setCustomDatedContext(e.target.value)}
                  placeholder="Örn: Kasım 2026 enerji teklifi incelemesi (henüz satın alınmadı)"
                />
              </div>

              <div className="form-field">
                <label htmlFor="custom-case-oneoff">Tek Seferlik Tahmini Maliyet (€)</label>
                <input
                  id="custom-case-oneoff"
                  type="number"
                  value={customOneOffEur}
                  onChange={(e) => setCustomOneOffEur(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="custom-case-recurring">Yıllık Tekrarlayan Maliyet (€)</label>
                <input
                  id="custom-case-recurring"
                  type="number"
                  value={customRecurringEur}
                  onChange={(e) => setCustomRecurringEur(Number(e.target.value))}
                />
              </div>

              <div className="form-field">
                <label htmlFor="custom-case-official">Resmî Ücret / Vergi Payı (%)</label>
                <input
                  id="custom-case-official"
                  type="number"
                  min={0}
                  max={100}
                  value={customOfficialPct}
                  onChange={(e) => setCustomOfficialPct(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="custom-case-smart">
                Düşük Yatırımla En Yüksek Marjinal Kazanımı Sağlayan 5x Akıllı Alternatif
              </label>
              <textarea
                id="custom-case-smart"
                rows={2}
                value={customSmartAlt}
                onChange={(e) => setCustomSmartAlt(e.target.value)}
                placeholder="Örn: Tam çatı yenilemesi yerine mevcut Güney cepheye modüler hibrit kurulum + sübvansiyon (ISDE) kullanımı."
              />
            </div>

            <div className="form-field">
              <label htmlFor="custom-case-verify">
                Karar Öncesi Doğrulama Maddeleri (Her satıra bir kontrol)
              </label>
              <textarea
                id="custom-case-verify"
                rows={2}
                value={customVerifyText}
                onChange={(e) => setCustomVerifyText(e.target.value)}
                placeholder="ISDE sübvansiyon şartları kontrol edildi mi?&#10;Geri dönüş süresi 4 yılın altında mı?"
              />
            </div>

            <button type="submit" className="btn-primary" data-testid="save-custom-case-btn">
              <CheckCircle2 size={15} /> 5x Vaka Analizini Kaydet
            </button>
          </form>
        )}

        {customSavedToast && (
          <div className="success-box" data-testid="custom-case-saved">
            Yeni 5x karar vakası yerel hafızaya eklendi.
          </div>
        )}

        {customCases.length > 0 && (
          <div className="reflections-list">
            {customCases.map((c) => (
              <div key={c.id} className="reflection-card">
                <div className="reflection-meta">
                  <span className="reflection-date">{c.createdAt}</span>
                  <span className="reflection-mood">{c.streamId}</span>
                  <span className="era-pill era-pill-current">{c.calculatedMultiplier}x Çarpan</span>
                  <button
                    type="button"
                    className="btn-icon-danger"
                    onClick={() => onDeleteCustomCase(c.id)}
                    title="Vakayı sil"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <h4>{c.title}</h4>
                <p className="reflection-focus">
                  <strong>Tarihli Bağlam:</strong> {c.datedContext}
                </p>
                <p className="reflection-future">
                  <strong>5x Akıllı Alternatif:</strong> {c.smartAlternativeSummary}
                </p>
                <div className="tag-row">
                  <span className="tag-chip">
                    Tek Seferlik: {c.oneOffCostEur.toLocaleString('tr-TR')} €
                  </span>
                  <span className="tag-chip">
                    Yıllık Tekrarlayan: {c.recurringAnnualCostEur.toLocaleString('tr-TR')} €
                  </span>
                  <span className="tag-chip">Resmî Pay: %{c.officialFeeSharePct}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
