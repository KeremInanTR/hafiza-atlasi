export type MemoryEra =
  | '2021-kasim'
  | '2026-ilkbahar-yaz'
  | '2026-ekim-kasim'
  | 'kisisel-zaman';

export type EvidenceLevel =
  | 'dogrulanmis-iz'
  | 'gorev-baglami'
  | 'kisisel-not';

export type MemoryCategory =
  | 'konum-yasam'
  | 'dijital-kurulum'
  | 'konut-mimari'
  | 'arac-mobilite'
  | 'kuramsal-kultur'
  | 'finans-idari';

export interface MemoryEntry {
  id: string;
  title: string;
  dateLabel: string;
  isoDate: string;
  era: MemoryEra;
  category: MemoryCategory;
  evidenceLevel: EvidenceLevel;
  timezone: string;
  region: string;
  summary: string;
  details: string[];
  boundaryNote: string;
  tags: string[];
  pinned?: boolean;
  isCustom?: boolean;
}

export interface ReflectionEntry {
  id: string;
  createdAt: string;
  currentFocus: string;
  fiveYearNote: string;
  moodTag: string;
}

export interface MatchPair {
  id: string;
  prompt: string;
  match: string;
  eraLabel: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}
