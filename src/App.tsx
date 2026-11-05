import React, { useState, useEffect } from 'react';
import {
  loadBestMoves,
  loadMemories,
  loadReflections,
  saveBestMoves,
  saveMemories,
  saveReflections,
} from './utils/memoryStore';
import {
  loadCustomCases,
  saveCustomCases,
  loadWargameBestMultiplier,
  saveWargameBestMultiplier,
} from './utils/valueCreationEngine';
import { MemoryEntry, ReflectionEntry } from './types/memory';
import { CustomFiveXCase, StreamId } from './types/valueCreation';
import { StreamCaseStudiesTab } from './components/StreamCaseStudiesTab';
import { BusinessGamingTab } from './components/BusinessGamingTab';
import { CapsuleComparisonTab } from './components/CapsuleComparisonTab';
import { TimelineExplorerTab } from './components/TimelineExplorerTab';
import { AnalyticsInsightsTab } from './components/AnalyticsInsightsTab';
import { MemoryGymTab } from './components/MemoryGymTab';
import {
  Clock,
  Archive,
  BarChart3,
  Brain,
  ShieldCheck,
  RotateCcw,
  Layers,
  Gamepad2,
} from 'lucide-react';
import { INITIAL_MEMORIES } from './data/initialMemories';
import { STREAM_CASE_STUDIES } from './data/valueCreationStreams';

type ActiveTab =
  | 'streams'
  | 'wargame'
  | 'capsule'
  | 'timeline'
  | 'analytics'
  | 'gym';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('streams');
  const [wargameStreamFilter, setWargameStreamFilter] = useState<StreamId | 'all'>('all');

  const [memories, setMemories] = useState<MemoryEntry[]>(() => loadMemories());
  const [reflections, setReflections] = useState<ReflectionEntry[]>(() =>
    loadReflections()
  );
  const [bestMoves, setBestMoves] = useState<number | null>(() =>
    loadBestMoves()
  );
  const [customCases, setCustomCases] = useState<CustomFiveXCase[]>(() =>
    loadCustomCases()
  );
  const [wargameBestMultiplier, setWargameBestMultiplier] = useState<number>(() =>
    loadWargameBestMultiplier()
  );

  useEffect(() => {
    saveMemories(memories);
  }, [memories]);

  useEffect(() => {
    saveReflections(reflections);
  }, [reflections]);

  useEffect(() => {
    saveCustomCases(customCases);
  }, [customCases]);

  const handleAddMemory = (entry: MemoryEntry) => {
    setMemories((prev) => [entry, ...prev]);
  };

  const handleTogglePin = (id: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, pinned: !m.pinned } : m))
    );
  };

  const handleDeleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddReflection = (entry: ReflectionEntry) => {
    setReflections((prev) => [entry, ...prev]);
  };

  const handleDeleteReflection = (id: string) => {
    setReflections((prev) => prev.filter((r) => r.id !== id));
  };

  const handleUpdateBestMoves = (moves: number) => {
    setBestMoves(moves);
    saveBestMoves(moves);
  };

  const handleAddCustomCase = (item: CustomFiveXCase) => {
    setCustomCases((prev) => [item, ...prev]);
  };

  const handleDeleteCustomCase = (id: string) => {
    setCustomCases((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdateBestMultiplier = (mult: number) => {
    setWargameBestMultiplier(mult);
    saveWargameBestMultiplier(mult);
  };

  const handleLaunchWargameForStream = (streamId: StreamId) => {
    setWargameStreamFilter(streamId);
    setActiveTab('wargame');
  };

  const handleResetDefaults = () => {
    setMemories(INITIAL_MEMORIES);
    saveMemories(INITIAL_MEMORIES);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-eyebrow">
            <ShieldCheck size={14} /> ÖZEL ALAN · 5X VALUE CREATION & HAFIZA ATLASI
          </div>
          <h1>5x Value Creation Engine, Stream Case Studies & Hafıza Atlası</h1>
          <p className="header-subtitle">
            Kasım 2021 – Kasım 2026 kişisel içgörülerini 5 stratejik akışta (Konut, Mobilite, Super
            Agent, Küresel Lojistik, Projectivity) 5x değer üretim metodolojisi, maliyet/kanıt
            matrisi ve interaktif business gaming ile çalıştıran karar platformu.
          </p>
        </div>

        <div className="header-meta">
          <div className="stat-chip">
            <span>5X AKIŞ & VAKA</span>
            <strong>{STREAM_CASE_STUDIES.length + customCases.length} Stream</strong>
          </div>
          <div className="stat-chip">
            <span>WARGAME REKORU</span>
            <strong>{wargameBestMultiplier.toFixed(2)}x</strong>
          </div>
          <div className="stat-chip">
            <span>HAFIZA İZİ</span>
            <strong>{memories.length} Başlık</strong>
          </div>
          <button
            type="button"
            className="btn-ghost"
            onClick={handleResetDefaults}
            title="Varsayılan kayıtları geri yükle"
          >
            <RotateCcw size={14} /> Varsayılanlar
          </button>
        </div>
      </header>

      <nav className="app-tabs app-tabs-six" aria-label="5x Value Creation ve Hafıza bölümleri">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'streams' ? 'active' : ''}`}
          onClick={() => setActiveTab('streams')}
          data-testid="nav-streams"
        >
          <Layers size={16} />
          <span>5x Stream Case Studies</span>
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'wargame' ? 'active' : ''}`}
          onClick={() => setActiveTab('wargame')}
          data-testid="nav-wargame"
        >
          <Gamepad2 size={16} />
          <span>Business Gaming & Wargame</span>
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'capsule' ? 'active' : ''}`}
          onClick={() => setActiveTab('capsule')}
          data-testid="nav-capsule"
        >
          <Clock size={16} />
          <span>5 Yıl Önce ↔ Bugün</span>
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('timeline')}
          data-testid="nav-timeline"
        >
          <Archive size={16} />
          <span>Zaman Tüneli ({memories.length})</span>
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
          data-testid="nav-analytics"
        >
          <BarChart3 size={16} />
          <span>Zihin & Dönem Analizi</span>
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'gym' ? 'active' : ''}`}
          onClick={() => setActiveTab('gym')}
          data-testid="nav-gym"
        >
          <Brain size={16} />
          <span>Hafıza Egzersizi</span>
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'streams' && (
          <StreamCaseStudiesTab
            customCases={customCases}
            onAddCustomCase={handleAddCustomCase}
            onDeleteCustomCase={handleDeleteCustomCase}
            onLaunchWargameForStream={handleLaunchWargameForStream}
          />
        )}

        {activeTab === 'wargame' && (
          <BusinessGamingTab
            initialFilterStreamId={wargameStreamFilter}
            bestMultiplier={wargameBestMultiplier}
            onUpdateBestMultiplier={handleUpdateBestMultiplier}
          />
        )}

        {activeTab === 'capsule' && (
          <CapsuleComparisonTab
            reflections={reflections}
            onAddReflection={handleAddReflection}
            onDeleteReflection={handleDeleteReflection}
          />
        )}

        {activeTab === 'timeline' && (
          <TimelineExplorerTab
            memories={memories}
            onAddMemory={handleAddMemory}
            onTogglePin={handleTogglePin}
            onDeleteMemory={handleDeleteMemory}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsInsightsTab memories={memories} />
        )}

        {activeTab === 'gym' && (
          <MemoryGymTab
            bestMoves={bestMoves}
            onUpdateBestMoves={handleUpdateBestMoves}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>
          Gizlilik & Veri İzolasyonu İlkesi (domain=personal): Özel hesap adresleri, şifreler,
          kimlik numaraları ve üçüncü kişi verileri bu arayüzde tutulmaz. Danone ve UNIQLM
          alanlarından tamamen izoledir; tarihli görev bağlamları doğrulanmış kalıcı olgulardan ayrı
          etiketlenir.
        </p>
      </footer>
    </div>
  );
}

export default App;
