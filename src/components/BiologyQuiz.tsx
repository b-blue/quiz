import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import raw from '../data/biology2-processed.json';
import styles from './Quiz.module.css';
import LightGrid from './LightGrid';

type BioEntry = {
  question: string;
  answers: string[];
};

type BioQuizQuestion = {
  question: string;
  correctAnswer: string;
  options: string[];
  correctIndex: number;
};

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getRandomQuestion(data: BioEntry[]): BioQuizQuestion | null {
  if (!data.length) return null;

  // Pick a random entry
  const entry = data[Math.floor(Math.random() * data.length)];
  if (!entry.answers.length) return null;

  // Pick a random answer as the correct one
  const correctAnswer = entry.answers[Math.floor(Math.random() * entry.answers.length)];

  // Get distractors: prefer siblings (other answers from same question), then from other questions
  const siblings = entry.answers.filter(a => a !== correctAnswer);
  const otherAnswers = data
    .filter(e => e !== entry)
    .flatMap(e => e.answers);

  const distractors: string[] = [];
  
  // First, try to get distractors from siblings
  const shuffledSiblings = shuffle(siblings);
  for (const sibling of shuffledSiblings) {
    if (distractors.length >= 3) break;
    distractors.push(sibling);
  }

  // If we need more, get from other questions
  if (distractors.length < 3) {
    const shuffledOthers = shuffle(otherAnswers);
    for (const other of shuffledOthers) {
      if (distractors.length >= 3) break;
      if (!distractors.includes(other)) {
        distractors.push(other);
      }
    }
  }

  // Ensure we have exactly 3 distractors
  const finalDistractors = distractors.slice(0, 3);
  
  // Create options and shuffle
  const options = shuffle([correctAnswer, ...finalDistractors]);
  const correctIndex = options.indexOf(correctAnswer);

  return {
    question: entry.question,
    correctAnswer,
    options,
    correctIndex,
  };
}

const BiologyQuiz: FC<{ onOpenSettings?: () => void }> = ({ onOpenSettings }) => {
  const data = raw as unknown as BioEntry[];

  const [question, setQuestion] = useState<BioQuizQuestion | null>(() => getRandomQuestion(data));
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Game state: streaks (per-quiz), mute
  const [currentStreak, setCurrentStreak] = useState<number>(() => Number(localStorage.getItem('bio:currentStreak') || 0));
  const [bestStreak, setBestStreak] = useState<number>(() => Number(localStorage.getItem('bio:bestStreak') || 0));
  const [csPop, setCsPop] = useState(false);
  const [bsPop, setBsPop] = useState(false);
  const csTimerRef = useRef<number | null>(null);
  const bsTimerRef = useRef<number | null>(null);
  const muted: boolean = localStorage.getItem('quiz:muted') === '1';

  // Timed per-question mode
  const [timedMode, setTimedMode] = useState<boolean>(() => localStorage.getItem('bio:timedMode') === '1');
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
    try { localStorage.setItem('bio:timedMode', next ? '1' : '0'); } catch (e) {}
  }

  function next() {
    // Pick a new random question, avoid repeating the same question
    const maxAttempts = 10;
    let nextQ = getRandomQuestion(data);
    let attempts = 0;
    while (nextQ && question && nextQ.question === question.question && attempts < maxAttempts) {
      nextQ = getRandomQuestion(data);
      attempts++;
    }
    setQuestion(nextQ);
    setSelected(null);
    setShowAnswer(false);
    setTimeLeft(timerDuration);
  }

  // Apply lock from persisted setting on mount
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
      <div className={styles.quizContainer}>
        No biology data available. Run the processor to generate data.
      </div>
    );
  }

  function onSelect(i: number) {
    if (showAnswer) return;
    // Stop timer while showing answer
    stopTimer();
    setSelected(i);
    setShowAnswer(true);

    const correct = i === question!.correctIndex;
    if (correct) {
      // Celebrate every correct
      triggerConfetti();
      playTone(660, 0.1);

      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      localStorage.setItem('bio:currentStreak', String(newStreak));

      // Pop + audio cue for current streak multiples of 5
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
        // Extra celebration for new best
        triggerConfetti();
        playTone(880, 0.12);
        // Pop + audio cue for best-streak multiples of 10
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

  function stopTimer() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  useEffect(() => {
    // Start timer for question when timedMode is enabled and answers not shown
    stopTimer();
    setTimeLeft(timerDuration);
    if (!timedMode) return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // Time's up
          stopTimer();
          setShowAnswer(true);
          // Show the correct answer when time expires
          setSelected(question ? question.correctIndex : null);
          setCurrentStreak(0);
          localStorage.setItem('bio:currentStreak', '0');
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

  return (
    <div className={styles.quizContainer} data-variant="bio">
      {showAnswer && <div className={styles.nextOverlay} onClick={next} />}

      <div className={styles.headerBar}>
        <div className={styles.gizmoWell} aria-hidden>
          <LightGrid variant="bio" />
        </div>
        <div className={styles.headerDivider} />
        <div className={styles.questionWell}>
          <div className={styles.questionText}>{question.question}</div>
        </div>
      </div>

      <div className={styles.progressWrap} aria-hidden>
        <div className={`${styles.progress} ${timedMode ? styles.progressAnimated : ''}`} style={{ width: `${timedMode ? (timeLeft / timerDuration) * 100 : 0}%` }} />
      </div>

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
              key={`${i}-${opt.slice(0, 20)}`}
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
                  lines.push(`Incorrect — the correct answer is "${question.correctAnswer}"`);
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
