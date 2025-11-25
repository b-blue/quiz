import { useEffect, useMemo, useRef, useState } from 'react';
import type { FC } from 'react';
import raw from '../data/biology-terms.json';
import styles from './Quiz.module.css';
import LightGrid from './LightGrid';

type AnswerLine = {
  raw: string;
  indent: string;
  indentLength: number;
  marker: string | null;
  text: string;
};

type BioEntry = {
  question: string;
  answerLines: AnswerLine[];
};

function choose<T>(arr: T[], n = 1) {
  const a = arr.slice();
  const out: T[] = [];
  for (let i = 0; i < n && a.length; i++) {
    const idx = Math.floor(Math.random() * a.length);
    out.push(a.splice(idx,1)[0]);
  }
  return out;
}

const BiologyQuiz: FC<{ onOpenSettings?: () => void }> = ({ onOpenSettings }) => {
  const data = (raw as unknown as BioEntry[]);

  // pool of full answer lines (preserve original raw line and canonical trimmed form)
  const pool = useMemo(() => {
    const map = new Map<string, string>();
    for (const e of data) {
      for (const line of e.answerLines) {
        const canonical = line.raw.trim();
        if (canonical && !map.has(canonical)) {
          map.set(canonical, line.raw);
        }
      }
    }
    return Array.from(map.entries()).map(([canonical, raw]) => ({ canonical, raw }));
  }, [data]);

  const [index, setIndex] = useState(() => Math.floor(Math.random() * Math.max(1, data.length)));
  const entry = data[index];

  const [missingLine, setMissingLine] = useState<number | null>(null);
  const [options, setOptions] = useState<Array<{ raw: string; canonical: string }>>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  // No drag-and-drop used; selection is a simple button press
  // Game state: streaks (per-quiz), mute
  const [currentStreak, setCurrentStreak] = useState<number>(() => Number(localStorage.getItem('bio:currentStreak') || 0));
  const [bestStreak, setBestStreak] = useState<number>(() => Number(localStorage.getItem('bio:bestStreak') || 0));
  const [csPop, setCsPop] = useState(false);
  const [bsPop, setBsPop] = useState(false);
  const csTimerRef = useRef<number | null>(null);
  const bsTimerRef = useRef<number | null>(null);
  const muted: boolean = localStorage.getItem('quiz:muted') === '1';
  const [timedMode, setTimedMode] = useState<boolean>(() => localStorage.getItem('aws:timedMode') === '1');
  const timerDuration = 15; // seconds per question when timedMode is on
  const [timeLeft, setTimeLeft] = useState<number>(timerDuration);
  const timerRef = useRef<number | null>(null);
  const [locked, setLocked] = useState<boolean>(() => localStorage.getItem('quiz:locked') === '1');

  function toggleLock() {
    const next = !locked;
    setLocked(next);
    try { localStorage.setItem('quiz:locked', next ? '1' : '0'); } catch (e) {}
  }

  function toggleTimedMode() {
    const next = !timedMode;
    setTimedMode(next);
    try { localStorage.setItem('aws:timedMode', next ? '1' : '0'); } catch (e) {}
  }

  function stopTimer() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  useEffect(() => {
    // Reset timer when question changes
    setTimeLeft(timerDuration);
    stopTimer();
    if (!timedMode) return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          stopTimer();
          setShowAnswer(true);
          // reveal correct answer
          const correctLineText = (missingLine !== null && entry && entry.answerLines && entry.answerLines[missingLine]) ? entry.answerLines[missingLine].raw.trim() : null;
          const correctIndex = options.findIndex((o) => {
            const normalize = (s: string | null) => s ? s.replace(/\s+/g, ' ').trim().toLowerCase() : null;
            return normalize(o.canonical) === normalize(correctLineText);
          });
          if (correctIndex !== -1) setSelected(correctIndex);
          setCurrentStreak(0);
          localStorage.setItem('bio:currentStreak', '0');
          try { const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext; const ctx = new AudioCtx(); const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = 'sine'; o.frequency.value = 220; o.connect(g); g.connect(ctx.destination); g.gain.value = 0.0001; o.start(); const now = ctx.currentTime; g.gain.exponentialRampToValueAtTime(0.08, now + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18); o.stop(now + 0.22); setTimeout(() => { try { ctx.close(); } catch (e) {} }, 300); } catch (e) {}
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, timedMode]);

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

  useEffect(() => {
    // prepare missing line (entire line removed) for current entry
    if (!entry) return;
    const candidateLineIdxs: number[] = entry.answerLines
      .map((ln, i) => ({ i, t: ln.raw.trim() }))
      .filter(x => x.t.length > 3)
      .map(x => x.i);
    if (!candidateLineIdxs.length) {
      setMissingLine(null);
      setOptions([]);
      return;
    }
    const chosenIdx = candidateLineIdxs[Math.floor(Math.random() * candidateLineIdxs.length)];

    // choose distractors from pool with similar trailing punctuation
    const correctRaw = entry.answerLines[chosenIdx] ? entry.answerLines[chosenIdx].raw : '';
    const correctLine = correctRaw.trim();
    const m = correctLine.match(/([.,:;!?])\s*$/);
    const trailing = m ? m[1] : null;

    let candidatesPool = pool.filter((p) => p.canonical !== correctLine);
    if (trailing) {
      const similar = candidatesPool.filter((p) => p.canonical.endsWith(trailing));
      if (similar.length >= 3) candidatesPool = similar;
    }

    const distractors = choose(candidatesPool, 3);
    const opts = [{ raw: correctRaw, canonical: correctLine }, ...distractors];
    // shuffle
    opts.sort(() => Math.random() - 0.5);
    setMissingLine(chosenIdx);
    setOptions(opts);
    setSelected(null);
    setShowAnswer(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function onSelect(i: number) {
    if (showAnswer) return;
    setSelected(i);
    setShowAnswer(true);
    // evaluate correctness and update shared game state
    const normalize = (s: string | null) => s ? s.replace(/\s+/g, ' ').trim().toLowerCase() : null;
    const correctLineText = (missingLine !== null && entry && entry.answerLines && entry.answerLines[missingLine]) ? entry.answerLines[missingLine].raw.trim() : null;
    const selectedCanonical = options[i]?.canonical ?? null;
    const correct = normalize(correctLineText) !== null && normalize(selectedCanonical) === normalize(correctLineText);
    if (correct) {
      // confetti every correct
      triggerConfetti();
      playTone(660, 0.1);

      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      localStorage.setItem('bio:currentStreak', String(newStreak));

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
        localStorage.setItem('bio:bestStreak', String(newBest));
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
      localStorage.setItem('bio:currentStreak', '0');
      playTone(220, 0.18);
    }
  }

  // No drag handlers — options are pressed directly.

  useEffect(() => {
    return () => {
      if (csTimerRef.current) window.clearTimeout(csTimerRef.current);
      if (bsTimerRef.current) window.clearTimeout(bsTimerRef.current);
    };
  }, []);

  function triggerConfetti() {
    if (muted) return;
    import('canvas-confetti').then((mod) => {
      const c = (mod as any).default || mod;
      try { c({ particleCount: 120, spread: 120, origin: { y: 0.6 } }); } catch (e) {}
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
    } catch (e) {}
  }

  function next() {
    // Clear current answer feedback immediately to avoid briefly showing
    // the previous question's feedback when switching to the next entry.
    setShowAnswer(false);
    setSelected(null);
    setIndex((idx) => (idx + 1) % data.length);
  }

  if (!entry) return <div className={styles.quizContainer}>No biology data found. Run the extractor.</div>;

  return (
    <div className={styles.quizContainer} data-variant="bio">
      {showAnswer && <div className={styles.nextOverlay} onClick={next} />}

      <div className={styles.headerBar}>
        <div className={styles.gizmoWell} aria-hidden>
          <LightGrid variant="bio" />
        </div>
        <div className={styles.headerDivider} />
        <div className={styles.questionWell}>
          <div className={styles.questionText}>{entry.question}</div>
        </div>
      </div>
      {/* header controls moved to Settings */}

      <div className={styles.progressWrap} aria-hidden>
        <div className={`${styles.progress} ${timedMode ? styles.progressAnimated : ''}`} style={{ width: `${timedMode ? (timeLeft / timerDuration) * 100 : 0}%` }} />
      </div>

      <div style={{ marginTop: 10 }}>
        {/* Render the full answer block inside a single <pre> to preserve exact indentation and line breaks. */}
        <pre
          style={{ margin: 6, whiteSpace: 'pre-wrap', fontFamily: 'inherit', overflowWrap: 'break-word' }}
        >
            {entry.answerLines
              .map((ln, i) => {
                // use raw line content so indentation and markers are preserved exactly
                // if this is the missing line, replace the line with a short placeholder
                if (missingLine === i) {
                  // preserve indentation and marker
                  const prefix = ln.indent + (ln.marker ? ln.marker + ' ' : '');
                  // create a placeholder roughly the same visible length as the original text
                  const original = ln.raw || '';
                  const visibleLen = Math.max(8, original.trim().length);
                  // replace non-space characters with a long dash so the placeholder is visible
                  const filler = Array.from({ length: visibleLen }).map(() => '—').join('');
                  return prefix + filler;
                }
                let rawLine = ln.raw;
                return rawLine;
              })
              // remove blank lines (lines that are only whitespace) so no empty gaps appear
              .filter((l) => l.trim().length > 0)
              .join('\n')}
        </pre>
      </div>

      <div className={styles.quizOptions} style={{ marginTop: 8 }}>
        {options.map((optObj, i) => {
          const optRaw = optObj.raw;
          const optCanonical = optObj.canonical;
          const correctLineText = (missingLine !== null && entry && entry.answerLines && entry.answerLines[missingLine]) ? entry.answerLines[missingLine].raw.trim() : null;
          // normalize function: collapse whitespace and lowercase for comparison
          const normalize = (s: string | null) => s ? s.replace(/\s+/g, ' ').trim().toLowerCase() : null;
          const isCorrect = normalize(correctLineText) !== null && normalize(optCanonical) === normalize(correctLineText);
          const isSelected = selected === i;
          const classes = [styles.quizOption];
          if (showAnswer) {
            if (isCorrect) classes.push(styles.correct);
            else if (isSelected) classes.push(styles.incorrect);
          }
          return (
            <button
              key={`${i}-${optCanonical.slice(0,20)}`}
              className={classes.join(' ')}
              onClick={() => onSelect(i)}
            >
              <span style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', display: 'block' }}>{optRaw}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.quizFooter}>
        <div className={styles.terminalFooter}>
          <div className={styles.terminalContent}>
            {showAnswer ? (
              (() => {
                const correctLineText = (missingLine !== null && entry && entry.answerLines && entry.answerLines[missingLine]) ? entry.answerLines[missingLine].raw.trim() : null;
                const lines: string[] = [];
                const normalize = (s: string | null) => s ? s.replace(/\s+/g, ' ').trim().toLowerCase() : null;
                const selectedCanonical = (selected !== null && options[selected]) ? options[selected].canonical : null;
                const isCorrect = normalize(correctLineText) && normalize(selectedCanonical) === normalize(correctLineText);
                if (isCorrect) {
                  lines.push('Correct 🎉');
                } else {
                  lines.push(`Incorrect — correct: ${correctLineText ?? ''}`);
                  if (correctLineText) lines.push(correctLineText);
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
            className={`${styles.lockIconBtn} ${styles.btn3d}`}
            onClick={toggleLock}
            aria-label={locked ? 'Unlock scroll' : 'Lock scroll'}
            title={locked ? 'Unlock scroll' : 'Lock scroll'}
          >
            {locked ? '🔒' : '🔓'}
          </button>

          <button
            className={`${styles.clockBtn} ${styles.btn3d}`}
            onClick={toggleTimedMode}
            aria-label={timedMode ? 'Turn timed mode off' : 'Turn timed mode on'}
            title={timedMode ? 'Timed: On' : 'Timed: Off'}
          >
            {timedMode ? '⏱️' : '⏰'}
          </button>

          <button
            className={`${styles.gearBtn} ${styles.btn3d}`}
            onClick={() => onOpenSettings?.()}
            aria-label="Open settings"
            title="Open settings"
          >
            ⚙️
          </button>
        </div>
      </div>
    </div>
  );
};

export default BiologyQuiz;
