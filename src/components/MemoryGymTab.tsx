import React, { useState } from 'react';
import { MATCH_PAIRS, QUIZ_QUESTIONS } from '../data/initialMemories';
import { Brain, RotateCcw, CheckCircle2, Trophy, HelpCircle } from 'lucide-react';

interface DeckCard {
  uid: string;
  pairId: string;
  text: string;
  kind: 'prompt' | 'match';
  eraLabel: string;
}

function buildDeck(shuffle: boolean): DeckCard[] {
  const cards: DeckCard[] = [];
  MATCH_PAIRS.forEach((pair) => {
    cards.push({
      uid: `${pair.id}-prompt`,
      pairId: pair.id,
      text: pair.prompt,
      kind: 'prompt',
      eraLabel: pair.eraLabel,
    });
    cards.push({
      uid: `${pair.id}-match`,
      pairId: pair.id,
      text: pair.match,
      kind: 'match',
      eraLabel: pair.eraLabel,
    });
  });
  if (!shuffle) return cards;
  const copy = [...cards];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

interface MemoryGymTabProps {
  bestMoves: number | null;
  onUpdateBestMoves: (moves: number) => void;
}

export const MemoryGymTab: React.FC<MemoryGymTabProps> = ({
  bestMoves,
  onUpdateBestMoves,
}) => {
  const [deck, setDeck] = useState<DeckCard[]>(() => buildDeck(false));
  const [selectedUids, setSelectedUids] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [statusMessage, setStatusMessage] = useState(
    'Bir dönem/görev kartı ile onun karşılığı olan bağlam kartını eşleştir.'
  );

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleCardClick = (card: DeckCard) => {
    if (matchedPairIds.includes(card.pairId)) return;
    if (selectedUids.includes(card.uid)) return;
    if (selectedUids.length >= 2) return;

    const nextSelected = [...selectedUids, card.uid];
    setSelectedUids(nextSelected);

    if (nextSelected.length === 2) {
      const nextMoves = moves + 1;
      setMoves(nextMoves);
      const firstCard = deck.find((c) => c.uid === nextSelected[0]);
      const secondCard = card;

      if (firstCard && firstCard.pairId === secondCard.pairId) {
        const updatedMatched = [...matchedPairIds, firstCard.pairId];
        setMatchedPairIds(updatedMatched);
        setSelectedUids([]);
        if (updatedMatched.length === MATCH_PAIRS.length) {
          setStatusMessage(
            `Tebrikler! Tüm 2021–2026 hafıza çiftlerini ${nextMoves} hamlede eşleştirdin.`
          );
          if (bestMoves === null || nextMoves < bestMoves) {
            onUpdateBestMoves(nextMoves);
          }
        } else {
          setStatusMessage(`Eşleşti: ${firstCard.eraLabel} bağlamı doğrulandı.`);
        }
      } else {
        setStatusMessage('Farklı dönem veya bağlam. Kartları tekrar dene.');
        setTimeout(() => {
          setSelectedUids([]);
        }, 650);
      }
    }
  };

  const handleResetGame = (shuffle = true) => {
    setDeck(buildDeck(shuffle));
    setSelectedUids([]);
    setMatchedPairIds([]);
    setMoves(0);
    setStatusMessage('Kartlar yeniden dizildi. Eşleştirmeye başlayabilirsin.');
  };

  const correctQuizCount = QUIZ_QUESTIONS.filter(
    (q) => quizAnswers[q.id] === q.correctAnswer
  ).length;

  return (
    <div className="tab-panel" data-testid="gym-tab">
      <section className="section-card">
        <div className="section-title-row">
          <div>
            <h3>
              <Brain size={18} className="inline-icon" /> Dönem & Bağlam Eşleştirme Egzersizi
            </h3>
            <p className="section-subtitle">
              Kasım 2021 ile Kasım 2026 arasındaki kilit tarihleri, saat dilimlerini ve karar
              ilkelerini eşleştir.
            </p>
          </div>

          <div className="gym-score-row">
            <span className="score-pill" data-testid="game-moves">
              Hamle: <strong>{moves}</strong>
            </span>
            <span className="score-pill" data-testid="game-matched">
              Eşleşen: <strong>{matchedPairIds.length} / {MATCH_PAIRS.length}</strong>
            </span>
            <span className="score-pill">
              <Trophy size={14} /> En İyi: <strong>{bestMoves ?? '—'}</strong>
            </span>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => handleResetGame(true)}
              data-testid="reset-game-btn"
            >
              <RotateCcw size={15} /> Karıştır & Yenile
            </button>
          </div>
        </div>

        <p className="game-status-banner" role="status" data-testid="game-status">
          {statusMessage}
        </p>

        <div className="memory-deck-grid" data-testid="memory-deck-grid">
          {deck.map((card) => {
            const isMatched = matchedPairIds.includes(card.pairId);
            const isSelected = selectedUids.includes(card.uid);
            return (
              <button
                key={card.uid}
                type="button"
                className={`deck-card ${isSelected ? 'selected' : ''} ${
                  isMatched ? 'matched' : ''
                } ${card.kind === 'prompt' ? 'card-prompt' : 'card-match'}`}
                onClick={() => handleCardClick(card)}
                disabled={isMatched}
                data-testid={`deck-card-${card.uid}`}
              >
                <span className="deck-card-top">
                  <span className="deck-era">{card.eraLabel}</span>
                  {isMatched && <CheckCircle2 size={15} />}
                </span>
                <strong className="deck-card-text">{card.text}</strong>
                <span className="deck-kind-label">
                  {card.kind === 'prompt' ? 'Dönem / Başlık' : 'Bağlam / İlke'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="section-card">
        <div className="section-title-row">
          <div>
            <h3>
              <HelpCircle size={18} className="inline-icon" /> 5 Yıllık Zaman Tüneli & Hafıza Testi
            </h3>
            <p className="section-subtitle">
              Kasım 2021 kayıtları, 2026 çalışma ilkeleri ve hafıza doğrulama sınırları üzerine 5
              soruluk hızlı kontrol.
            </p>
          </div>
          {quizSubmitted && (
            <span className="score-pill score-pill-highlight" data-testid="quiz-score">
              Skor: {correctQuizCount} / {QUIZ_QUESTIONS.length}
            </span>
          )}
        </div>

        <div className="quiz-list">
          {QUIZ_QUESTIONS.map((q, index) => {
            const picked = quizAnswers[q.id];
            return (
              <div key={q.id} className="quiz-item" data-testid={`quiz-item-${q.id}`}>
                <h4>
                  {index + 1}. {q.question}
                </h4>
                <div className="quiz-options">
                  {q.options.map((opt) => {
                    const isPicked = picked === opt;
                    const isRight = quizSubmitted && opt === q.correctAnswer;
                    const isWrong =
                      quizSubmitted && isPicked && opt !== q.correctAnswer;
                    return (
                      <button
                        key={opt}
                        type="button"
                        className={`quiz-option ${isPicked ? 'picked' : ''} ${
                          isRight ? 'right' : ''
                        } ${isWrong ? 'wrong' : ''}`}
                        onClick={() => {
                          if (!quizSubmitted) {
                            setQuizAnswers((prev) => ({ ...prev, [q.id]: opt }));
                          }
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {quizSubmitted && (
                  <p className="quiz-explanation">{q.explanation}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="form-actions-row">
          <button
            type="button"
            className="btn-primary"
            onClick={() => setQuizSubmitted(true)}
            data-testid="submit-quiz-btn"
          >
            Yanıtları Kontrol Et
          </button>
          {quizSubmitted && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setQuizAnswers({});
                setQuizSubmitted(false);
              }}
            >
              Testi Sıfırla
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
