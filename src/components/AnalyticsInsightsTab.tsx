import React from 'react';
import {
  CATEGORY_LABELS,
  ERA_LABELS,
  EVIDENCE_LABELS,
} from '../data/initialMemories';
import {
  EvidenceLevel,
  MemoryCategory,
  MemoryEntry,
  MemoryEra,
} from '../types/memory';
import { BarChart3, Globe, Shield, Layers } from 'lucide-react';

interface AnalyticsInsightsTabProps {
  memories: MemoryEntry[];
}

export const AnalyticsInsightsTab: React.FC<AnalyticsInsightsTabProps> = ({
  memories,
}) => {
  const total = Math.max(1, memories.length);

  const eraCounts = (Object.keys(ERA_LABELS) as MemoryEra[]).map((era) => {
    const count = memories.filter((m) => m.era === era).length;
    return {
      era,
      label: ERA_LABELS[era],
      count,
      pct: Math.round((count / total) * 100),
    };
  });

  const categoryCounts = (Object.keys(CATEGORY_LABELS) as MemoryCategory[]).map(
    (cat) => {
      const count = memories.filter((m) => m.category === cat).length;
      return {
        cat,
        label: CATEGORY_LABELS[cat],
        count,
        pct: Math.round((count / total) * 100),
      };
    }
  );

  const evidenceCounts = (Object.keys(EVIDENCE_LABELS) as EvidenceLevel[]).map(
    (ev) => {
      const count = memories.filter((m) => m.evidenceLevel === ev).length;
      return {
        ev,
        label: EVIDENCE_LABELS[ev].label,
        description: EVIDENCE_LABELS[ev].description,
        count,
        pct: Math.round((count / total) * 100),
      };
    }
  );

  return (
    <div className="tab-panel" data-testid="analytics-tab">
      <section className="kpi-grid">
        <div className="kpi-card">
          <span>TOPLAM HAFIZA KAYDI</span>
          <strong>{memories.length}</strong>
          <small>2021 – 2026 Zaman Aralığı</small>
        </div>
        <div className="kpi-card">
          <span>DOĞRULANMIŞ TARİHLİ İZ</span>
          <strong>
            {memories.filter((m) => m.evidenceLevel === 'dogrulanmis-iz').length}
          </strong>
          <small>Saat dilimi & işlem üstbilgisi</small>
        </div>
        <div className="kpi-card">
          <span>GÖREV & SENARYO BAĞLAMI</span>
          <strong>
            {memories.filter((m) => m.evidenceLevel === 'gorev-baglami').length}
          </strong>
          <small>Araştırma ve karar modelleri</small>
        </div>
        <div className="kpi-card">
          <span>SAAT DİLİMİ YÖRÜNGESİ</span>
          <strong>GMT+7 → GMT+1</strong>
          <small>Cakarta/Bangkok → Hollanda</small>
        </div>
      </section>

      <div className="analytics-two-col">
        <section className="section-card">
          <div className="section-title-row">
            <h3>
              <BarChart3 size={18} className="inline-icon" /> Dönemlere Göre Gündem Yoğunluğu
            </h3>
          </div>
          <div className="bar-list">
            {eraCounts.map((item) => (
              <div key={item.era} className="bar-row">
                <div className="bar-label-row">
                  <span>{item.label}</span>
                  <strong>
                    {item.count} kayıt ({item.pct}%)
                  </strong>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill bar-fill-era"
                    style={{ width: `${Math.max(item.pct, item.count > 0 ? 8 : 0)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-card">
          <div className="section-title-row">
            <h3>
              <Layers size={18} className="inline-icon" /> Konu ve İlgi Alanı Dağılımı
            </h3>
          </div>
          <div className="bar-list">
            {categoryCounts.map((item) => (
              <div key={item.cat} className="bar-row">
                <div className="bar-label-row">
                  <span>{item.label}</span>
                  <strong>
                    {item.count} kayıt ({item.pct}%)
                  </strong>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill bar-fill-cat"
                    style={{ width: `${Math.max(item.pct, item.count > 0 ? 8 : 0)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="section-card">
        <div className="section-title-row">
          <h3>
            <Globe size={18} className="inline-icon" /> Saat Dilimi ve Coğrafi Geçiş İzleri (2021 –
            2026)
          </h3>
        </div>
        <div className="trajectory-steps">
          <div className="traj-step">
            <span className="traj-badge">Kasım 2021</span>
            <h4>GMT+7 · Güneydoğu Asya</h4>
            <p>
              Cakarta/Bangkok saat dilimi, Endonezya bankacılık ve Tayland günlük sipariş izleri,
              bulut/e-posta kurulumları.
            </p>
          </div>
          <div className="traj-step">
            <span className="traj-badge">Aralık 2021</span>
            <h4>GMT+3 · Türkiye Bağlantısı</h4>
            <p>
              Yıl sonunda GMT+3 saat diliminden paylaşılan üniversite çevrimiçi toplantı (Zoom)
              kaydı.
            </p>
          </div>
          <div className="traj-step">
            <span className="traj-badge">İlkbahar–Yaz 2026</span>
            <h4>GMT+7 → GMT+2 · Geçiş Dönemi</h4>
            <p>
              Projectivity düşünce deneyleri, Super Agent mimarisi ve Cakarta’dan Hollanda’ya
              taşınma/lojistik hazırlıkları.
            </p>
          </div>
          <div className="traj-step">
            <span className="traj-badge">Ekim–Kasım 2026</span>
            <h4>GMT+1 · Hollanda Düzeni</h4>
            <p>
              Wassenaar/Den Haag konut ve renovasyon senaryoları, araç teknik rapor incelemesi ve
              günlük operasyonlar.
            </p>
          </div>
        </div>
      </section>

      <section className="section-card">
        <div className="section-title-row">
          <h3>
            <Shield size={18} className="inline-icon" /> Özel Alan Hafıza ve Doğrulama İlkeleri
          </h3>
        </div>
        <div className="evidence-grid">
          {evidenceCounts.map((ev) => (
            <div key={ev.ev} className="evidence-explain-card">
              <div className="evidence-explain-header">
                <h4>{ev.label}</h4>
                <span className="count-pill">{ev.count} kayıt</span>
              </div>
              <p>{ev.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
