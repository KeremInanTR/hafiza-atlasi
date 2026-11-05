import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import {
  filterMemories,
  validateNewMemory,
  validateReflection,
} from '../utils/memoryStore';
import { INITIAL_MEMORIES } from '../data/initialMemories';

describe('Zaman Kapsülü & Kişisel Hafıza Atlası', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('validates reflection input and rejects short strings', () => {
    const invalid = validateReflection('kısa', 'not');
    expect(invalid.valid).toBe(false);
    expect(invalid.errors.length).toBe(2);

    const valid = validateReflection(
      'Hollanda konut ve renovasyon senaryolarının karşılaştırması',
      '2031 yılında hangi kararın en yüksek marjinal faydayı sağladığını kontrol et'
    );
    expect(valid.valid).toBe(true);
  });

  it('validates new memory entry fields', () => {
    const invalid = validateNewMemory({
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
    expect(invalid.valid).toBe(false);
    expect(invalid.errors.length).toBe(4);
  });

  it('filters memories by era, query, and evidence level', () => {
    const nov2021 = filterMemories(INITIAL_MEMORIES, {
      query: 'GMT+7',
      era: '2021-kasim',
      category: 'all',
      evidence: 'dogrulanmis-iz',
      onlyPinned: false,
    });
    expect(nov2021.length).toBeGreaterThanOrEqual(2);

    const projectivity = filterMemories(INITIAL_MEMORIES, {
      query: 'Ontolojik',
      era: 'all',
      category: 'all',
      evidence: 'all',
      onlyPinned: false,
    });
    expect(projectivity).toHaveLength(1);
    expect(projectivity[0].id).toBe('mem-2026-projectivity');
  });

  it('renders 5-year comparison and navigates across all 4 tabs', () => {
    render(<App />);

    expect(
      screen.getByText(/Kasım 2021 · Güneydoğu Asya & Dijital Kurulum/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('nav-timeline'));
    expect(screen.getByTestId('timeline-tab')).toBeInTheDocument();
    expect(screen.getByTestId('memory-results-count')).toHaveTextContent('9');

    fireEvent.click(screen.getByTestId('nav-analytics'));
    expect(screen.getByTestId('analytics-tab')).toBeInTheDocument();
    expect(
      screen.getByText(/Dönemlere Göre Gündem Yoğunluğu/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('nav-gym'));
    expect(screen.getByTestId('gym-tab')).toBeInTheDocument();
    expect(
      screen.getByText(/Dönem & Bağlam Eşleştirme Egzersizi/i)
    ).toBeInTheDocument();
  });

  it('saves a new time capsule reflection with validation', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('save-reflection-btn'));
    expect(screen.getByTestId('reflection-errors')).toBeInTheDocument();

    fireEvent.change(
      screen.getByLabelText(/Bugün zihnimi ne meşgul ediyor/i),
      {
        target: {
          value: 'Kasım 2026 itibarıyla araç süreçleri ve konut planlaması.',
        },
      }
    );
    fireEvent.change(
      screen.getByLabelText(/5 yıl sonraki \(Kasım 2031\) kendime not/i),
      {
        target: {
          value: '2031 yılında bu dönemin kararlarını kanıtlarıyla değerlendir.',
        },
      }
    );
    fireEvent.click(screen.getByTestId('save-reflection-btn'));

    expect(screen.getByTestId('reflection-saved')).toBeInTheDocument();
    expect(
      screen.getByText(/Kasım 2026 itibarıyla araç süreçleri ve konut planlaması/i)
    ).toBeInTheDocument();
  });
});
