import { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import raw from '../data/biology-terms.json';
import styles from './Quiz.module.css';

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

const BiologyQuiz: FC = () => {
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
  const [muted, setMuted] = useState<boolean>(() => localStorage.getItem('quiz:muted') === '1');

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
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
        localStorage.setItem('bio:bestStreak', String(newStreak));
        // extra celebration for new best
        triggerConfetti();
        playTone(880, 0.12);
      }
    } else {
      setCurrentStreak(0);
      localStorage.setItem('bio:currentStreak', '0');
      playTone(220, 0.18);
    }
  }

  // No drag handlers — options are pressed directly.

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
    <div className={styles.quizContainer}>
      <h2 className={styles.quizTitle}>Biology Quiz</h2>
      <div className={styles.topRightControls}>
        <button className={styles.muteBtn} onClick={() => { setMuted((m) => { const nm = !m; localStorage.setItem('quiz:muted', nm ? '1' : '0'); return nm; }); }}>
          {muted ? 'Unmute' : 'Mute'}
        </button>
      </div>
      <p style={{ color: 'var(--muted)' }}>{entry.question}</p>

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
        {showAnswer && (
          <div>
            {(() => {
              const correctLineText = (missingLine !== null && entry && entry.answerLines && entry.answerLines[missingLine]) ? entry.answerLines[missingLine].raw.trim() : null;
              const normalize = (s: string | null) => s ? s.replace(/\s+/g, ' ').trim().toLowerCase() : null;
              const selectedCanonical = (selected !== null && options[selected]) ? options[selected].canonical : null;
              if (selected !== null && normalize(correctLineText) && normalize(selectedCanonical) === normalize(correctLineText)) {
                return <strong style={{ color: '#8ce99a' }}>Correct 🎉</strong>;
              }
              return <strong style={{ color: '#ff9b9b' }}>Incorrect — correct: {correctLineText ?? ''}</strong>;
            })()}
          </div>
        )}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className={styles.streaks} aria-live="polite">
            <div>Streak: <strong>{currentStreak}</strong></div>
            <div>Best Streak: <strong>{bestStreak}</strong></div>
          </div>
          <button onClick={next} className={styles.quizNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default BiologyQuiz;
