import { useEffect, useRef, useState } from 'react';
import type { QuizQuestion } from '../types';
import { getRandomQuestion, getAllTerms } from '../lib/terms';
import styles from './Quiz.module.css';
import LightGrid from './LightGrid';

export default function Quiz() {
  const selectedSection: string | null = (() => {
    const v = localStorage.getItem('aws:selectedSection');
    return v === null ? null : v;
  })();
  const [question, setQuestion] = useState<QuizQuestion | null>(() => getRandomQuestion());
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  // Buttons are simple press targets now (no drag-and-drop)

  // Game state: streaks (per-quiz), muted
  const [currentStreak, setCurrentStreak] = useState<number>(() => Number(localStorage.getItem('aws:currentStreak') || 0));
  const [bestStreak, setBestStreak] = useState<number>(() => Number(localStorage.getItem('aws:bestStreak') || 0));
  const [csPop, setCsPop] = useState(false);
  const [bsPop, setBsPop] = useState(false);
  const csTimerRef = useRef<number | null>(null);
  const bsTimerRef = useRef<number | null>(null);
  const muted: boolean = localStorage.getItem('quiz:muted') === '1';

  // Timed per-question mode
  const timedMode: boolean = localStorage.getItem('aws:timedMode') === '1';
  const timerDuration = 15; // seconds per question when timedMode is on
  const [timeLeft, setTimeLeft] = useState<number>(timerDuration);
  const timerRef = useRef<number | null>(null);
  const [locked, setLocked] = useState<boolean>(() => localStorage.getItem('quiz:locked') === '1');

  function toggleLock() {
    const nextLocked = !locked;
    setLocked(nextLocked);
    try {
      localStorage.setItem('quiz:locked', nextLocked ? '1' : '0');
    } catch (e) {}
  }

  function next() {
    setQuestion(getRandomQuestion(selectedSection ?? undefined));
    setSelected(null);
    setShowAnswer(false);
    setTimeLeft(timerDuration);
  }
  // apply lock from persisted setting on mount
  useEffect(() => {
    try {
      if (locked) {
        document.body.style.overflow = 'hidden';
        (document.documentElement as HTMLElement).style.touchAction = 'none';
      } else {
        document.body.style.overflow = '';
        (document.documentElement as HTMLElement).style.touchAction = '';
      }
    } catch (e) {}
  }, [locked]);

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

      // pop + audio cue for current streak multiples of 5
      if (newStreak > 0 && newStreak % 5 === 0) {
        setCsPop(true);
        playTone(980, 0.12);
        if (csTimerRef.current) window.clearTimeout(csTimerRef.current);
        csTimerRef.current = window.setTimeout(() => setCsPop(false), 420) as unknown as number;
      }

      if (newStreak > bestStreak) {
        const newBest = newStreak;
        setBestStreak(newBest);
        localStorage.setItem('aws:bestStreak', String(newBest));
        // extra celebration for new best
        triggerConfetti();
        playTone(880, 0.12);
        // pop + audio cue for best-streak multiples of 10
        if (newBest > 0 && newBest % 10 === 0) {
          setBsPop(true);
          playTone(1320, 0.14);
          if (bsTimerRef.current) window.clearTimeout(bsTimerRef.current);
          bsTimerRef.current = window.setTimeout(() => setBsPop(false), 520) as unknown as number;
        }
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
          // show the correct answer when time expires
          setSelected(question ? question.correctIndex : null);
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

  useEffect(() => {
    return () => {
      if (csTimerRef.current) window.clearTimeout(csTimerRef.current);
      if (bsTimerRef.current) window.clearTimeout(bsTimerRef.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      try {
        document.body.style.overflow = '';
        (document.documentElement as HTMLElement).style.touchAction = '';
      } catch (e) {}
    };
  }, []);

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
      {/* header controls moved to Settings */}
      {/* question is displayed in the header's question well */}
      {timedMode && (
        <div className={styles.progressWrap} aria-hidden>
          <div className={`${styles.progress} ${timedMode ? styles.progressAnimated : ''}`} style={{ width: `${(timeLeft / timerDuration) * 100}%` }} />
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
                <div>Streak: <strong className={csPop ? styles.pop : undefined} style={{ color: csColor }}>{currentStreak}</strong></div>
                <div>Best Streak: <strong className={bsPop ? styles.pop : undefined} style={{ color: bsColor }}>{bestStreak}</strong></div>
              </div>
            );
          })()}
          <button
            className={styles.lockIconBtn}
            onClick={toggleLock}
            aria-label={locked ? 'Unlock scroll' : 'Lock scroll'}
            title={locked ? 'Unlock scroll' : 'Lock scroll'}
          >
            {locked ? '🔒' : '🔓'}
          </button>
        </div>
      </div>
    </div>
  );
}
