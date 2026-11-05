import React, { useState, useEffect } from 'react';
import {
  loadBestMoves,
  loadMemories,
  loadReflections,
  saveBestMoves,
  saveMemories,
  saveReflections,
} from './utils/memoryStore';
import { MemoryEntry, ReflectionEntry } from './types/memory';
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
} from 'lucide-react';
import { INITIAL_MEMORIES } from './data/initialMemories';

type ActiveTab = 'capsule' | 'timeline' | 'analytics' | 'gym';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('capsule');
  const [memories, setMemories] = useState<MemoryEntry[]>(() => loadMemories());
  const [reflections, setReflections] = useState<ReflectionEntry[]>(() =>
    loadReflections()
  );
  const [bestMoves, setBestMoves] = useState<number | null>(() =>
    loadBestMoves()
  );

  useEffect(() => {
    saveMemories(memories);
  }, [memories]);

  useEffect(() => {
    saveReflections(reflections);
  }, [reflections]);

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

  const handleResetDefaults = () => {
    setMemories(INITIAL_MEMORIES);
    saveMemories(INITIAL_MEMORIES);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-eyebrow">
            <ShieldCheck size={14} /> ÖZEL ALAN · ZAMAN KAPSÜLÜ & HAFIZA ATLASI
          </div>
          <h1>5 Yıl Önce Bugün & Kişisel Hafıza Atlası</h1>
          <p className="header-subtitle">
            Kasım 2021 (GMT+7 Güneydoğu Asya & dijital kurulum izleri) ile Kasım 2026 (GMT+1
            Hollanda düzeni, kuramsal notlar ve karar analizleri) arasındaki 5 yıllık hafıza
            köprüsü.
          </p>
        </div>

        <div className="header-meta">
          <div className="stat-chip">
            <span>KAYITLI DÖNEM İZİ</span>
            <strong>{memories.length} Başlık</strong>
          </div>
          <div className="stat-chip">
            <span>KAPSÜL NOTU</span>
            <strong>{reflections.length} Not</strong>
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

      <nav className="app-tabs" aria-label="Hafıza uygulaması bölümleri">
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
          Gizlilik & Kapsam İlkesi: Özel hesap adresleri, şifreler ve üçüncü kişi verileri bu
          arayüzde tutulmaz. Eklediğin yeni notlar yalnızca kendi tarayıcında (LocalStorage)
          saklanır; tarihli görev/araştırma bağlamları doğrulanmış kalıcı olgulardan ayrı
          etiketlenir.
        </p>
      </footer>
    </div>
  );
}

export default App;
