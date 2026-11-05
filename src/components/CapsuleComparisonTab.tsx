import React, { useState } from 'react';
import { FIVE_YEAR_COMPARISON } from '../data/initialMemories';
import { ReflectionEntry } from '../types/memory';
import { validateReflection } from '../utils/memoryStore';
import { Clock, Compass, Sparkles, ShieldCheck, PlusCircle, Trash2 } from 'lucide-react';

interface CapsuleComparisonTabProps {
  reflections: ReflectionEntry[];
  onAddReflection: (entry: ReflectionEntry) => void;
  onDeleteReflection: (id: string) => void;
}

export const CapsuleComparisonTab: React.FC<CapsuleComparisonTabProps> = ({
  reflections,
  onAddReflection,
  onDeleteReflection,
}) => {
  const [currentFocus, setCurrentFocus] = useState('');
  const [fiveYearNote, setFiveYearNote] = useState('');
  const [moodTag, setMoodTag] = useState('Netlik & Planlama');
  const [errors, setErrors] = useState<string[]>([]);
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateReflection(currentFocus, fiveYearNote);
    if (!validation.valid) {
      setErrors(validation.errors);
      setSavedBanner(false);
      return;
    }
    setErrors([]);
    const now = new Date();
    const formattedDate = now.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    onAddReflection({
      id: `ref-${Date.now()}`,
      createdAt: `${formattedDate} · GMT+1`,
      currentFocus: currentFocus.trim(),
      fiveYearNote: fiveYearNote.trim(),
      moodTag,
    });
    setCurrentFocus('');
    setFiveYearNote('');
    setSavedBanner(true);
  };

  return (
    <div className="tab-panel" data-testid="capsule-tab">
      <section className="hero-comparison">
        <div className="era-card era-2021">
          <div className="era-header">
            <span className="era-pill">5 YIL ÖNCE BUGÜN</span>
            <span className="tz-badge">
              <Clock size={14} /> GMT+7
            </span>
          </div>
          <h2>Kasım 2021 · Güneydoğu Asya & Dijital Kurulum</h2>
          <p className="era-desc">
            Yazılı bir günlük kaydı bulunmuyor; ancak e-posta zaman damgaları ve hesap hareketleri
            Cakarta/Bangkok saat diliminde yürüyen günlük akışı ve kişisel bulut/e-posta
            altyapısının sıfırdan düzenlendiğini gösteriyor.
          </p>
          <ul className="era-highlights">
            <li>6 & 21 Kasım 2021: GMT+7 saat dilimiyle kayıtlı e-posta trafiği</li>
            <li>8–14 Kasım 2021: Tayland günlük sipariş ve Endonezya bankacılık bildirimleri</li>
            <li>7–23 Kasım 2021: Microsoft 365 / OneDrive, Apple ve e-posta güvenlik kurulumları</li>
            <li>23 Aralık 2021: GMT+3 saat diliminden üniversite çevrimiçi toplantı paylaşımı</li>
          </ul>
        </div>

        <div className="era-card era-2026">
          <div className="era-header">
            <span className="era-pill era-pill-current">BUGÜN · GÜNCEL DÖNEM</span>
            <span className="tz-badge">
              <Compass size={14} /> GMT+1
            </span>
          </div>
          <h2>Kasım 2026 · Hollanda Düzeni, Karar Analizi & Hafıza Mimarisi</h2>
          <p className="era-desc">
            Gündem; Hollanda konut ve renovasyon fizibilitesi, araç teknik rapor ve şarj süreçleri,
            kuramsal düşünce deneyleri (Projectivity) ve kanıt sınırlarını koruyan kişisel ajan
            mimarisi etrafında şekilleniyor.
          </p>
          <ul className="era-highlights">
            <li>Konut & Renovasyon: Oda oda maliyet ve düşük yatırımla yüksek marjinal fayda</li>
            <li>Araç & Operasyon: Teknik rapor denetimi ("kısa ama eksiksiz") ve şarj takibi</li>
            <li>Kuramsal & Kültür: Ontolojik vs. metrik mesafe, halk masalları paralellikleri</li>
            <li>Hafıza İlkesi: Tarihli görev bağlamı ile doğrulanmış olguların net ayrımı</li>
          </ul>
        </div>
      </section>

      <section className="section-card">
        <div className="section-title-row">
          <h3>2021 ↔ 2026 Boyut Karşılaştırması</h3>
          <span className="subtle-tag">Kanıta Dayalı Kıyaslama</span>
        </div>
        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Boyut</th>
                <th>Kasım 2021 (5 Yıl Önce)</th>
                <th>Kasım 2026 (Bugün)</th>
              </tr>
            </thead>
            <tbody>
              {FIVE_YEAR_COMPARISON.map((row) => (
                <tr key={row.dimension}>
                  <td className="dim-cell">{row.dimension}</td>
                  <td>{row.nov2021}</td>
                  <td>{row.nov2026}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-card capsule-form-section">
        <div className="section-title-row">
          <div>
            <h3>
              <Sparkles size={18} className="inline-icon" /> Zaman Kapsülü Notu Bırak (Kasım 2026 →
              Kasım 2031)
            </h3>
            <p className="section-subtitle">
              Kasım 2021’de geriye yalnız e-posta üstbilgileri kalmıştı. 5 yıl sonra "Bugün zihnimi
              ne meşgul ediyordu?" diye sorduğunda doğrudan kendi cümleni görmek için yerel not
              bırak.
            </p>
          </div>
          <span className="privacy-pill">
            <ShieldCheck size={14} /> Yalnızca Cihazında (LocalStorage)
          </span>
        </div>

        <form onSubmit={handleSubmit} className="capsule-form" noValidate>
          {errors.length > 0 && (
            <div className="error-box" role="alert" data-testid="reflection-errors">
              {errors.map((err) => (
                <p key={err}>{err}</p>
              ))}
            </div>
          )}
          {savedBanner && (
            <div className="success-box" role="status" data-testid="reflection-saved">
              Zaman kapsülü kaydın yerel hafızaya eklendi.
            </div>
          )}

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="current-focus">Bugün zihnimi ne meşgul ediyor?</label>
              <textarea
                id="current-focus"
                rows={3}
                value={currentFocus}
                onChange={(e) => setCurrentFocus(e.target.value)}
                placeholder="Örn: Hollanda’daki konut seçeneklerinin toplam sahip olma maliyeti ve kış dönemi öncelikleri..."
              />
            </div>

            <div className="form-field">
              <label htmlFor="five-year-note">5 yıl sonraki (Kasım 2031) kendime not veya soru</label>
              <textarea
                id="five-year-note"
                rows={3}
                value={fiveYearNote}
                onChange={(e) => setFiveYearNote(e.target.value)}
                placeholder="Örn: Bugün üzerinde düşündüğüm renovasyon ve otomasyon kararlarından hangileri uzun vadede en çok değer üretti?"
              />
            </div>
          </div>

          <div className="form-actions-row">
            <div className="form-field-inline">
              <label htmlFor="mood-tag">Dönem Etiketi:</label>
              <select
                id="mood-tag"
                value={moodTag}
                onChange={(e) => setMoodTag(e.target.value)}
              >
                <option value="Netlik & Planlama">Netlik & Planlama</option>
                <option value="Kuramsal Merak">Kuramsal Merak</option>
                <option value="Karar Hazırlığı">Karar Hazırlığı</option>
                <option value="Yaşam & Rutin">Yaşam & Rutin</option>
              </select>
            </div>

            <button type="submit" className="btn-primary" data-testid="save-reflection-btn">
              <PlusCircle size={16} /> Kapsüle Kaydet
            </button>
          </div>
        </form>

        <div className="reflections-list" data-testid="reflections-list">
          {reflections.map((item) => (
            <article key={item.id} className="reflection-card">
              <div className="reflection-meta">
                <span className="reflection-date">{item.createdAt}</span>
                <span className="reflection-mood">{item.moodTag}</span>
                {item.id !== 'ref-initial-2026' && (
                  <button
                    type="button"
                    className="btn-icon-danger"
                    onClick={() => onDeleteReflection(item.id)}
                    aria-label="Kapsül notunu sil"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <p className="reflection-focus">
                <strong>Gündem:</strong> {item.currentFocus}
              </p>
              <p className="reflection-future">
                <strong>2031 Notu:</strong> {item.fiveYearNote}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
