import { useEffect, useRef, useState } from 'react';
import type { QuizQuestion } from '../types';
import { getRandomQuestion, getAllTerms, getSections } from '../lib/terms';
import styles from './Quiz.module.css';
import LightGrid from './LightGrid';

export default function Quiz() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [question, setQuestion] = useState<QuizQuestion | null>(() => getRandomQuestion());
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  // Buttons are simple press targets now (no drag-and-drop)

  // Game state: streaks (per-quiz), muted
  const [currentStreak, setCurrentStreak] = useState<number>(() => Number(localStorage.getItem('aws:currentStreak') || 0));
  const [bestStreak, setBestStreak] = useState<number>(() => Number(localStorage.getItem('aws:bestStreak') || 0));
  const [muted, setMuted] = useState<boolean>(() => localStorage.getItem('quiz:muted') === '1');

  // Timed per-question mode
  const [timedMode, setTimedMode] = useState<boolean>(false);
  const timerDuration = 15; // seconds per question when timedMode is on
  const [timeLeft, setTimeLeft] = useState<number>(timerDuration);
  const timerRef = useRef<number | null>(null);

  const sections = getSections();

  function next() {
    setQuestion(getRandomQuestion(selectedSection ?? undefined));
    setSelected(null);
    setShowAnswer(false);
    setTimeLeft(timerDuration);
  }

  if (!question) {
    return (
      <div>
        {selectedSection ? (
          <>No terms available for the selected section.</>
        ) : (
          <>No terms available. Run the extractor to generate data.</>
        )}
      </div>
    );
  }

  function onSelect(i: number) {
    if (showAnswer) return;
    // stop timer while showing answer
    stopTimer();
    setSelected(i);
    setShowAnswer(true);

    const correct = i === question!.correctIndex;
    if (correct) {
      // celebrate every correct
      triggerConfetti();
      playTone(660, 0.1);

      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      localStorage.setItem('aws:currentStreak', String(newStreak));

      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
        localStorage.setItem('aws:bestStreak', String(newStreak));
        // extra celebration for new best
        triggerConfetti();
        playTone(880, 0.12);
      }
    } else {
      setCurrentStreak(0);
      localStorage.setItem('aws:currentStreak', '0');
      playTone(220, 0.18);
    }
  }

  // No drag handlers — selecting is done by pressing option buttons.

  function triggerConfetti() {
    if (muted) return;
    // dynamic import to avoid breaking builds when package missing
    import('canvas-confetti').then((mod) => {
      const c = (mod as any).default || mod;
      try {
        c({ particleCount: 120, spread: 120, origin: { y: 0.6 } });
      } catch (e) {
        // ignore
      }
    }).catch(() => {});
  }

  function playTone(frequency: number, duration = 0.1) {
    if (muted) return;
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = frequency;
      o.connect(g);
      g.connect(ctx.destination);
      g.gain.value = 0.0001;
      o.start();
      const now = ctx.currentTime;
      g.gain.exponentialRampToValueAtTime(0.08, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      o.stop(now + duration + 0.02);
      setTimeout(() => { try { ctx.close(); } catch (e) {} }, (duration + 0.05) * 1000);
    } catch (e) {
      // ignore
    }
  }

  function stopTimer() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  useEffect(() => {
    // start timer for question when timedMode is enabled and answers not shown
    stopTimer();
    setTimeLeft(timerDuration);
    if (!timedMode) return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // time's up
          stopTimer();
          setShowAnswer(true);
          setSelected(null);
          setCurrentStreak(0);
          localStorage.setItem('aws:currentStreak', '0');
          playTone(220, 0.18);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question, timedMode]);

  // framer-motion dynamic loading removed to avoid Vite import-analysis errors.
  // We use CSS transitions for hover/tap effects instead.

  return (
    <div className={styles.quizContainer}>
      {showAnswer && <div className={styles.nextOverlay} onClick={next} />}

      <div className={styles.headerBar}>
        <div className={styles.gizmoWell} aria-hidden>
          <LightGrid />
        </div>
          <div className={styles.headerDivider} />
          <div className={styles.questionWell}>
            <div className={styles.questionText}>{question.definition}</div>
          </div>
      </div>
      <div className={styles.topRightControls}>
        <label className={styles.smallToggle}><input type="checkbox" checked={timedMode} onChange={(e) => setTimedMode(e.target.checked)} /> Timed</label>
        <button className={styles.muteBtn} onClick={() => { setMuted((m) => { const nm = !m; localStorage.setItem('quiz:muted', nm ? '1' : '0'); return nm; }); }}>
          {muted ? 'Unmute' : 'Mute'}
        </button>
      </div>
      <div className={styles.quizControls}>
        <label className={styles.filterLabel} htmlFor="section-filter">Filter by section:</label>
        <select
          id="section-filter"
          className={styles.filterSelect}
          value={selectedSection ?? ''}
          onChange={(e) => {
            const val = e.target.value || null;
            setSelectedSection(val);
            setQuestion(getRandomQuestion(val ?? undefined));
            setSelected(null);
            setShowAnswer(false);
          }}
        >
          <option value="">All sections</option>
          {sections.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {selectedSection && (
          <button
            className={styles.clearFilter}
            onClick={() => {
              setSelectedSection(null);
              setQuestion(getRandomQuestion());
              setSelected(null);
              setShowAnswer(false);
            }}
          >
            Clear
          </button>
        )}
      </div>
      {/* question is displayed in the header's question well */}
      {timedMode && (
        <div className={styles.progressWrap} aria-hidden>
          <div className={styles.progress} style={{ width: `${(timeLeft / timerDuration) * 100}%` }} />
        </div>
      )}

      <div className={styles.quizOptions}>
        {question.options.map((opt, i) => {
          const correct = i === question.correctIndex;
          const isSelected = selected === i;

          const classes = [styles.quizOption];
          if (showAnswer) {
            if (correct) classes.push(styles.correct);
            else if (isSelected) classes.push(styles.incorrect);
          }

          return (
            <button
              key={opt}
              onClick={() => onSelect(i)}
              className={classes.join(' ')}
              aria-pressed={isSelected}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className={styles.quizFooter}>
        <div className={styles.terminalFooter}>
          <div className={styles.terminalContent}>
            {showAnswer ? (
              (() => {
                const lines: string[] = [];
                if (selected === question.correctIndex) {
                  lines.push('Correct 🎉');
                } else {
                  lines.push(`Incorrect — the correct answer is "${question.options[question.correctIndex]}"`);
                  if (selected !== null) {
                    const all = getAllTerms();
                    const selectedTerm = question.options[selected];
                    const selectedEntry = all.find((t) => t.term === selectedTerm);
                    if (selectedEntry?.definition) lines.push(`${selectedTerm} — ${selectedEntry.definition}`);
                  }
                }
                return lines.map((l, idx) => (
                  <div key={idx} className={styles.terminalLine}><span className={styles.terminalPrompt}>#</span>{l}</div>
                ));
              })()
            ) : (
              <div className={styles.terminalLine}><span className={styles.terminalPrompt}>#</span>Ready</div>
            )}
          </div>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          {(() => {
            const csColor = currentStreak > 0 && currentStreak % 5 === 0 ? '#8ce99a' : 'var(--muted)';
            const bsColor = bestStreak > 0 && bestStreak % 10 === 0 ? '#ffd36b' : 'var(--muted)';
            return (
              <div className={styles.streaks} aria-live="polite">
                <div>Streak: <strong style={{ color: csColor }}>{currentStreak}</strong></div>
                <div>Best Streak: <strong style={{ color: bsColor }}>{bestStreak}</strong></div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
