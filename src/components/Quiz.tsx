import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import type { QuizQuestion } from '../types';
import { getRandomQuestion, getAllTerms, getSections } from '../lib/terms';
import styles from './Quiz.module.css';

export default function Quiz() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [question, setQuestion] = useState<QuizQuestion | null>(() => getRandomQuestion());
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const draggingIndexRef = useRef<number | null>(null);
  const dragPreviewRef = useRef<HTMLElement | null>(null);

  // Pointer-based drag fallback for touch devices
  function startPointerDrag(e: React.PointerEvent, i: number) {
    const target = e.currentTarget as HTMLElement;
    // prevent page scroll while dragging
    document.documentElement.classList.add(styles['no-touch-scroll']);
    // prevent the generated click event after pointerup for pointer-based drags
    e.preventDefault();
    draggingIndexRef.current = i;
    // create preview
    const preview = document.createElement('div');
    preview.className = styles.dragPreview || 'dragPreview';
    preview.textContent = target.textContent || '';
    document.body.appendChild(preview);
    // initialize preview position so it's not off-screen
    preview.style.left = e.clientX + 'px';
    preview.style.top = e.clientY + 'px';
    dragPreviewRef.current = preview;
    function moveHandler(ev: PointerEvent) {
      if (!dragPreviewRef.current) return;
      dragPreviewRef.current.style.left = ev.clientX + 'px';
      dragPreviewRef.current.style.top = ev.clientY + 'px';
      // highlight drop target under pointer
      const under = document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null;
      document.querySelectorAll('.' + styles.dropTarget).forEach((el) => el.classList.remove(styles.dropActive));
      if (under) {
        const drop = under.closest('.' + styles.dropTarget) as HTMLElement | null;
        if (drop) drop.classList.add(styles.dropActive);
      }
    }
    function upHandler(ev: PointerEvent) {
      // determine drop target
      const under = document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null;
      const drop = under ? under.closest('.' + styles.dropTarget) as HTMLElement | null : null;
      cleanupPointer();
      if (drop) {
        onSelect(i);
      }
    }
    function cleanupPointer() {
      document.documentElement.classList.remove(styles['no-touch-scroll']);
      draggingIndexRef.current = null;
      if (dragPreviewRef.current) {
        document.body.removeChild(dragPreviewRef.current);
        dragPreviewRef.current = null;
      }
      document.removeEventListener('pointermove', moveHandler as any);
      document.removeEventListener('pointerup', upHandler as any);
      document.querySelectorAll('.' + styles.dropTarget).forEach((el) => el.classList.remove(styles.dropActive));
    }
    document.addEventListener('pointermove', moveHandler as any);
    document.addEventListener('pointerup', upHandler as any);
  }

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
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      localStorage.setItem('aws:currentStreak', String(newStreak));

      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
        localStorage.setItem('aws:bestStreak', String(newStreak));
        // celebrate new best streak
        triggerConfetti();
        playTone(880, 0.12);
      } else {
        playTone(660, 0.1);
      }
    } else {
      setCurrentStreak(0);
      localStorage.setItem('aws:currentStreak', '0');
      playTone(220, 0.18);
    }
  }

  // Drag handlers for options -> drop on definition area
  function handleDragStart(e: React.DragEvent, i: number) {
    draggingIndexRef.current = i;
    try { e.dataTransfer.setData('text/plain', String(i)); } catch (err) {}
    // allow link dragging
    e.dataTransfer.effectAllowed = 'move';
    // add dragging class via currentTarget using module class name
    (e.currentTarget as HTMLElement)?.classList.add(styles.dragging);
  }

  function handleDragEnd(e: React.DragEvent) {
    draggingIndexRef.current = null;
    (e.currentTarget as HTMLElement)?.classList.remove(styles.dragging);
  }

  function handleDefinitionDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDefinitionDrop(e: React.DragEvent) {
    e.preventDefault();
    const txt = e.dataTransfer.getData('text/plain');
    const idx = txt ? Number(txt) : null;
    draggingIndexRef.current = null;
    if (typeof idx === 'number' && !Number.isNaN(idx)) {
      onSelect(idx);
    }
  }

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
      <h2 className={styles.quizTitle}>Which term matches this definition?</h2>
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
      <p
        className={`${styles.quizDefinition} ${styles.dropTarget}`}
        onDragOver={handleDefinitionDragOver}
        onDrop={handleDefinitionDrop}
      >
        {question.definition}
      </p>
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
              draggable
              onDragStart={(e) => handleDragStart(e, i)}
              onDragEnd={handleDragEnd}
              onPointerDown={(ev) => startPointerDrag(ev, i)}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className={styles.quizFooter}>
        {showAnswer && (
          <div>
            {selected === question.correctIndex ? (
              <strong style={{ color: '#8ce99a' }}>Correct 🎉</strong>
            ) : (
              <div>
                <strong style={{ color: '#ff9b9b' }}>Incorrect — the correct answer is "{question.options[question.correctIndex]}"</strong>
                {/* show definition for the selected (incorrect) option if available */}
                {selected !== null && (() => {
                  const all = getAllTerms();
                  const selectedTerm = question.options[selected];
                  const selectedEntry = all.find((t) => t.term === selectedTerm);
                  if (selectedEntry?.definition) {
                    return (
                      <p style={{ color: 'var(--muted)', marginTop: 8 }}>
                        You selected: <strong>{selectedTerm}</strong> — {selectedEntry.definition}
                      </p>
                    );
                  }
                  return null;
                })()}
              </div>
            )}
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
}
