import { INITIAL_MEMORIES } from '../data/initialMemories';
import {
  EvidenceLevel,
  MemoryCategory,
  MemoryEntry,
  MemoryEra,
  ReflectionEntry,
} from '../types/memory';

const MEMORIES_STORAGE_KEY = 'kt_personal_memories_v1';
const REFLECTIONS_STORAGE_KEY = 'kt_personal_reflections_v1';
const BEST_SCORE_STORAGE_KEY = 'kt_personal_memory_best_moves_v1';

export interface NewMemoryInput {
  title: string;
  dateLabel: string;
  era: MemoryEra;
  category: MemoryCategory;
  evidenceLevel: EvidenceLevel;
  timezone: string;
  region: string;
  summary: string;
  boundaryNote: string;
  tagsText: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateNewMemory(input: NewMemoryInput): ValidationResult {
  const errors: string[] = [];
  if (!input.title || input.title.trim().length < 4) {
    errors.push('Başlık en az 4 karakter olmalıdır.');
  }
  if (!input.dateLabel || input.dateLabel.trim().length < 3) {
    errors.push('Tarih veya dönem bilgisi girilmelidir.');
  }
  if (!input.summary || input.summary.trim().length < 10) {
    errors.push('Özet açıklaması en az 10 karakter olmalıdır.');
  }
  if (!input.boundaryNote || input.boundaryNote.trim().length < 6) {
    errors.push('Doğrulama / kapsam sınırı notu en az 6 karakter olmalıdır.');
  }
  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateReflection(
  currentFocus: string,
  fiveYearNote: string
): ValidationResult {
  const errors: string[] = [];
  if (!currentFocus || currentFocus.trim().length < 8) {
    errors.push('Bugün zihnini meşgul eden gündemi en az 8 karakterle yazmalısın.');
  }
  if (!fiveYearNote || fiveYearNote.trim().length < 8) {
    errors.push('5 yıl sonraki kendine bırakacağın not en az 8 karakter olmalıdır.');
  }
  return {
    valid: errors.length === 0,
    errors,
  };
}

export function loadMemories(): MemoryEntry[] {
  try {
    const raw = localStorage.getItem(MEMORIES_STORAGE_KEY);
    if (!raw) return INITIAL_MEMORIES;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_MEMORIES;
    return parsed;
  } catch {
    return INITIAL_MEMORIES;
  }
}

export function saveMemories(memories: MemoryEntry[]): void {
  try {
    localStorage.setItem(MEMORIES_STORAGE_KEY, JSON.stringify(memories));
  } catch {
    // Ignore storage quota errors in restricted environments
  }
}

export const INITIAL_REFLECTIONS: ReflectionEntry[] = [
  {
    id: 'ref-initial-2026',
    createdAt: '5 Kasım 2026 · 14:01 (GMT+1)',
    currentFocus:
      'Kasım 2021 (GMT+7, Cakarta/Bangkok izleri ve bulut kurulumları) ile Kasım 2026 (Hollanda düzeni, konut/renovasyon analizi, araç takibi ve çoklu ajan hafıza mimarisi) arasındaki 5 yıllık dönüşümü incelemek.',
    fiveYearNote:
      'Kasım 2031’de geriye baktığında yalnızca e-posta üstbilgilerine kalmamak için; hangi kararların gerçekten tamamlandığını, hangilerinin sadece senaryo/araştırma aşamasında kaldığını tarihleriyle net kaydet.',
    moodTag: 'Zaman Kapsülü & Berraklık',
  },
];

export function loadReflections(): ReflectionEntry[] {
  try {
    const raw = localStorage.getItem(REFLECTIONS_STORAGE_KEY);
    if (!raw) return INITIAL_REFLECTIONS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_REFLECTIONS;
    return parsed;
  } catch {
    return INITIAL_REFLECTIONS;
  }
}

export function saveReflections(reflections: ReflectionEntry[]): void {
  try {
    localStorage.setItem(REFLECTIONS_STORAGE_KEY, JSON.stringify(reflections));
  } catch {
    // Ignore
  }
}

export function loadBestMoves(): number | null {
  try {
    const raw = localStorage.getItem(BEST_SCORE_STORAGE_KEY);
    if (!raw) return null;
    const num = Number(raw);
    return Number.isFinite(num) && num > 0 ? num : null;
  } catch {
    return null;
  }
}

export function saveBestMoves(moves: number): void {
  try {
    localStorage.setItem(BEST_SCORE_STORAGE_KEY, String(moves));
  } catch {
    // Ignore
  }
}

export function filterMemories(
  memories: MemoryEntry[],
  options: {
    query: string;
    era: MemoryEra | 'all';
    category: MemoryCategory | 'all';
    evidence: EvidenceLevel | 'all';
    onlyPinned: boolean;
  }
): MemoryEntry[] {
  const q = options.query.trim().toLowerCase();
  return memories.filter((item) => {
    if (options.era !== 'all' && item.era !== options.era) return false;
    if (options.category !== 'all' && item.category !== options.category) return false;
    if (options.evidence !== 'all' && item.evidenceLevel !== options.evidence) return false;
    if (options.onlyPinned && !item.pinned) return false;
    if (!q) return true;
    const haystack = [
      item.title,
      item.dateLabel,
      item.summary,
      item.region,
      item.timezone,
      item.boundaryNote,
      ...item.details,
      ...item.tags,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}
