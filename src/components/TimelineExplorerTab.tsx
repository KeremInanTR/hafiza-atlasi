import React, { useState } from 'react';
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
import { filterMemories, validateNewMemory } from '../utils/memoryStore';
import {
  Bookmark,
  Search,
  Filter,
  Plus,
  AlertCircle,
  Clock,
  MapPin,
  Trash2,
} from 'lucide-react';

interface TimelineExplorerTabProps {
  memories: MemoryEntry[];
  onAddMemory: (entry: MemoryEntry) => void;
  onTogglePin: (id: string) => void;
  onDeleteMemory: (id: string) => void;
}

export const TimelineExplorerTab: React.FC<TimelineExplorerTabProps> = ({
  memories,
  onAddMemory,
  onTogglePin,
  onDeleteMemory,
}) => {
  const [query, setQuery] = useState('');
  const [era, setEra] = useState<MemoryEra | 'all'>('all');
  const [category, setCategory] = useState<MemoryCategory | 'all'>('all');
  const [evidence, setEvidence] = useState<EvidenceLevel | 'all'>('all');
  const [onlyPinned, setOnlyPinned] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // New memory form state
  const [title, setTitle] = useState('');
  const [dateLabel, setDateLabel] = useState('Kasım 2026');
  const [formEra, setFormEra] = useState<MemoryEra>('2026-ekim-kasim');
  const [formCategory, setFormCategory] = useState<MemoryCategory>('konum-yasam');
  const [formEvidence, setFormEvidence] = useState<EvidenceLevel>('kisisel-not');
  const [timezone, setTimezone] = useState('GMT+1');
  const [region, setRegion] = useState('Hollanda');
  const [summary, setSummary] = useState('');
  const [boundaryNote, setBoundaryNote] = useState(
    'Doğrudan kullanıcı tarafından eklenen tarihli kişisel hafıza notu.'
  );
  const [tagsText, setTagsText] = useState('Kasım 2026, Kişisel Not');
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const filtered = filterMemories(memories, {
    query,
    era,
    category,
    evidence,
    onlyPinned,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateNewMemory({
      title,
      dateLabel,
      era: formEra,
      category: formCategory,
      evidenceLevel: formEvidence,
      timezone,
      region,
      summary,
      boundaryNote,
      tagsText,
    });

    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }

    const tags = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newEntry: MemoryEntry = {
      id: `mem-custom-${Date.now()}`,
      title: title.trim(),
      dateLabel: dateLabel.trim(),
      isoDate: new Date().toISOString().slice(0, 10),
      era: formEra,
      category: formCategory,
      evidenceLevel: formEvidence,
      timezone: timezone.trim() || 'GMT+1',
      region: region.trim() || 'Özel Alan',
      summary: summary.trim(),
      details: [summary.trim()],
      boundaryNote: boundaryNote.trim(),
      tags: tags.length > 0 ? tags : ['Kişisel Not'],
      pinned: true,
      isCustom: true,
    };

    onAddMemory(newEntry);
    setTitle('');
    setSummary('');
    setFormErrors([]);
    setShowAddForm(false);
  };

  return (
    <div className="tab-panel" data-testid="timeline-tab">
      <section className="section-card filter-bar">
        <div className="search-row">
          <div className="search-input-wrap">
            <Search size={16} className="search-icon" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Başlık, dönem, saat dilimi veya kavram ara (örn: GMT+7, Projectivity, Wassenaar)..."
              aria-label="Hafıza kayıtlarında ara"
              data-testid="memory-search-input"
            />
          </div>

          <button
            type="button"
            className={`btn-toggle ${onlyPinned ? 'active' : ''}`}
            onClick={() => setOnlyPinned((prev) => !prev)}
            data-testid="filter-pinned-btn"
          >
            <Bookmark size={15} /> Önemli Kayıtlar
          </button>

          <button
            type="button"
            className="btn-primary"
            onClick={() => setShowAddForm((prev) => !prev)}
            data-testid="toggle-add-memory-btn"
          >
            <Plus size={16} /> {showAddForm ? 'Formu Kapat' : 'Yeni Kayıt Ekle'}
          </button>
        </div>

        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="era-filter">
              <Filter size={13} /> Dönem:
            </label>
            <select
              id="era-filter"
              value={era}
              onChange={(e) => setEra(e.target.value as MemoryEra | 'all')}
              data-testid="era-filter-select"
            >
              <option value="all">Tüm Dönemler ({memories.length})</option>
              {Object.entries(ERA_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="category-filter">Kategori:</label>
            <select
              id="category-filter"
              value={category}
              onChange={(e) => setCategory(e.target.value as MemoryCategory | 'all')}
              data-testid="category-filter-select"
            >
              <option value="all">Tüm Kategoriler</option>
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="evidence-filter">Kanıt Düzeyi:</label>
            <select
              id="evidence-filter"
              value={evidence}
              onChange={(e) => setEvidence(e.target.value as EvidenceLevel | 'all')}
              data-testid="evidence-filter-select"
            >
              <option value="all">Tüm Kanıt Düzeyleri</option>
              {Object.entries(EVIDENCE_LABELS).map(([key, info]) => (
                <option key={key} value={key}>
                  {info.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {showAddForm && (
        <section className="section-card add-memory-panel" data-testid="add-memory-form">
          <h3>Yeni Tarihli Hafıza Kaydı Ekle</h3>
          <form onSubmit={handleCreate} noValidate>
            {formErrors.length > 0 && (
              <div className="error-box" role="alert" data-testid="add-memory-errors">
                {formErrors.map((err) => (
                  <p key={err}>{err}</p>
                ))}
              </div>
            )}

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="mem-title">Başlık</label>
                <input
                  id="mem-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Örn: Kış Dönemi Çalışma ve Okuma Planı"
                />
              </div>

              <div className="form-field">
                <label htmlFor="mem-date">Tarih / Dönem Etiketi</label>
                <input
                  id="mem-date"
                  type="text"
                  value={dateLabel}
                  onChange={(e) => setDateLabel(e.target.value)}
                  placeholder="Örn: 5 Kasım 2026"
                />
              </div>

              <div className="form-field">
                <label htmlFor="mem-era">Dönem Grubu</label>
                <select
                  id="mem-era"
                  value={formEra}
                  onChange={(e) => setFormEra(e.target.value as MemoryEra)}
                >
                  {Object.entries(ERA_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="mem-cat">Kategori</label>
                <select
                  id="mem-cat"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as MemoryCategory)}
                >
                  {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="mem-tz">Saat Dilimi</label>
                <input
                  id="mem-tz"
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="mem-region">Bölge / Bağlam</label>
                <input
                  id="mem-region"
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="mem-summary">Özet ve Gündem Detayı</label>
              <textarea
                id="mem-summary"
                rows={3}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Bu dönemde zihnini neyin meşgul ettiğini veya alınan kararı özetle..."
              />
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="mem-boundary">Doğrulama ve Kapsam Sınırı Notu</label>
                <input
                  id="mem-boundary"
                  type="text"
                  value={boundaryNote}
                  onChange={(e) => setBoundaryNote(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="mem-tags">Etiketler (virgülle ayır)</label>
                <input
                  id="mem-tags"
                  type="text"
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                />
              </div>
            </div>

            <div className="form-actions-row">
              <button type="submit" className="btn-primary" data-testid="submit-memory-btn">
                Kaydı Arşive Ekle
              </button>
            </div>
          </form>
        </section>
      )}

      <div className="results-summary" data-testid="memory-results-count">
        Toplam <strong>{filtered.length}</strong> hafıza kaydı gösteriliyor.
      </div>

      <div className="timeline-list">
        {filtered.map((item) => {
          const ev = EVIDENCE_LABELS[item.evidenceLevel];
          return (
            <article
              key={item.id}
              className={`memory-card ${item.pinned ? 'memory-pinned' : ''}`}
              data-testid={`memory-card-${item.id}`}
            >
              <div className="memory-card-top">
                <div className="memory-badges">
                  <span className="date-pill">{item.dateLabel}</span>
                  <span className={`evidence-badge ${ev.badgeClass}`}>{ev.label}</span>
                  <span className="category-pill">{CATEGORY_LABELS[item.category]}</span>
                </div>

                <div className="memory-actions">
                  <button
                    type="button"
                    className={`btn-pin ${item.pinned ? 'pinned' : ''}`}
                    onClick={() => onTogglePin(item.id)}
                    aria-label={item.pinned ? 'Sabitlemeyi kaldır' : 'Önemli olarak sabitle'}
                  >
                    <Bookmark size={15} />
                  </button>
                  {item.isCustom && (
                    <button
                      type="button"
                      className="btn-icon-danger"
                      onClick={() => onDeleteMemory(item.id)}
                      aria-label="Kaydı sil"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>

              <h3>{item.title}</h3>
              <p className="memory-summary">{item.summary}</p>

              <div className="memory-meta-row">
                <span>
                  <Clock size={13} /> {item.timezone}
                </span>
                <span>
                  <MapPin size={13} /> {item.region}
                </span>
              </div>

              <ul className="memory-details">
                {item.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>

              <div className="boundary-callout">
                <AlertCircle size={15} />
                <div>
                  <strong>Kapsam & Doğrulama Sınırı:</strong> {item.boundaryNote}
                </div>
              </div>

              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag-chip">
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
