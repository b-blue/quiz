import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { loadPracticeTest } from '../lib/practiceTests';
import type { PracticeQuestion } from '../lib/practiceTests';
import QuizHeader from './QuizHeader';
import styles from './Quiz.module.css';

interface Session {
  order: number[]; // question ids in the randomized order
  optionOrders: Record<number, number[]>; // shuffled option indexes per question id
  index: number;
  answers: Record<number, number[]>; // submitted selections per question id
  score: number;
}

const storageKey = (n: number) => `practice:session:${n}`;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function newSession(questions: PracticeQuestion[]): Session {
  const optionOrders: Record<number, number[]> = {};
  for (const q of questions) optionOrders[q.id] = shuffle(q.options.map((_, i) => i));
  return { order: shuffle(questions.map(q => q.id)), optionOrders, index: 0, answers: {}, score: 0 };
}

function readSaved(n: number, questions: PracticeQuestion[]): Session | null {
  try {
    const s = JSON.parse(localStorage.getItem(storageKey(n)) || 'null') as Session | null;
    const ids = new Set(questions.map(q => q.id));
    if (s && Array.isArray(s.order) && s.order.length === questions.length && s.order.every(id => ids.has(id)) && s.index < s.order.length) return s;
  } catch { /* ignore corrupt data */ }
  return null;
}

function save(n: number, s: Session | null) {
  try {
    if (s) localStorage.setItem(storageKey(n), JSON.stringify(s));
    else localStorage.removeItem(storageKey(n));
  } catch { /* storage unavailable */ }
}

function sameSet(a: number[], b: number[]) {
  return a.length === b.length && a.every(x => b.includes(x));
}

function linkify(text: string): ReactNode[] {
  return text.split(/(https?:\/\/\S+)/g).map((part, i) =>
    /^https?:\/\//.test(part)
      ? <a key={i} href={part} target="_blank" rel="noreferrer">{part}</a>
      : part,
  );
}

export default function PracticeTest({ test, onExit }: { test: number; onExit: () => void }) {
  const [questions, setQuestions] = useState<PracticeQuestion[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [saved, setSaved] = useState<Session | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadPracticeTest(test)
      .then(qs => {
        if (cancelled) return;
        setQuestions(qs);
        const prior = readSaved(test, qs);
        if (prior && Object.keys(prior.answers).length > 0) setSaved(prior);
        else setSession(newSession(qs));
      })
      .catch(e => { if (!cancelled) setError(String(e)); });
    return () => { cancelled = true; };
  }, [test]);

  const byId = useMemo(() => new Map((questions ?? []).map(q => [q.id, q])), [questions]);

  function commit(next: Session) {
    setSession(next);
    save(test, next);
  }

  function start() {
    if (!questions) return;
    setSelected([]);
    setFinished(false);
    setSaved(null);
    commit(newSession(questions));
  }

  function resume() {
    if (!saved) return;
    setSelected([]);
    setSession(saved);
    setSaved(null);
  }

  const title = `Practice Test ${test}`;

  if (error) {
    return (
      <div className={styles.quizContainer} data-variant="saa">
        <QuizHeader variant="saa"><div className={styles.questionText}>{title}</div></QuizHeader>
        <p>Could not load this test: {error}</p>
        <button className={`${styles.timedBtn} ${styles.btn3d}`} onClick={onExit}>Back to settings</button>
      </div>
    );
  }

  if (!questions) {
    return (
      <div className={styles.quizContainer} data-variant="saa">
        <QuizHeader variant="saa"><div className={styles.questionText}>{title}</div></QuizHeader>
        <p>Loading…</p>
      </div>
    );
  }

  if (saved) {
    const done = Object.keys(saved.answers).length;
    return (
      <div className={styles.quizContainer} data-variant="saa">
        <QuizHeader variant="saa"><div className={styles.questionText}>{title}</div></QuizHeader>
        <div className={styles.ptPrompt}>
          You have a test in progress: {done} of {questions.length} questions answered, {saved.score} correct.
        </div>
        <div className={styles.ptActions}>
          <button className={`${styles.timedBtn} ${styles.btn3d}`} onClick={resume}>Resume</button>
          <button className={`${styles.timedBtn} ${styles.btn3d}`} onClick={start}>Start over (reshuffle)</button>
          <button className={`${styles.timedBtn} ${styles.btn3d}`} onClick={onExit}>Back to settings</button>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const total = questions.length;
  const answeredCount = Object.keys(session.answers).length;
  const pct = (n: number, d: number) => (d === 0 ? 0 : Math.round((n / d) * 1000) / 10);

  if (finished) {
    return (
      <div className={styles.quizContainer} data-variant="saa">
        <QuizHeader variant="saa"><div className={styles.questionText}>{title} complete</div></QuizHeader>
        <div className={styles.ptResult}>
          <div className={styles.ptResultPct}>{pct(session.score, total)}%</div>
          <p>You answered {session.score} of {total} questions correctly.</p>
          <div className={styles.ptActions} style={{ justifyContent: 'center' }}>
            <button className={`${styles.timedBtn} ${styles.btn3d}`} onClick={start}>Retake (new random order)</button>
            <button className={`${styles.timedBtn} ${styles.btn3d}`} onClick={onExit}>Back to settings</button>
          </div>
        </div>
      </div>
    );
  }

  const qid = session.order[session.index];
  const q = byId.get(qid)!;
  const optionOrder = session.optionOrders[qid];
  const submitted = session.answers[qid];
  const isSubmitted = submitted !== undefined;
  const correctIdx = q.options.map((o, i) => (o.correct ? i : -1)).filter(i => i >= 0);
  const wasRight = isSubmitted && sameSet(submitted, correctIdx);
  const isLast = session.index === total - 1;

  function toggle(i: number) {
    if (isSubmitted) return;
    if (!q.multi) setSelected([i]);
    else setSelected(prev => (prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]));
  }

  function submit() {
    if (selected.length === 0) return;
    const right = sameSet(selected, correctIdx);
    commit({
      ...session!,
      answers: { ...session!.answers, [qid]: selected },
      score: session!.score + (right ? 1 : 0),
    });
  }

  function next() {
    setSelected([]);
    if (isLast) {
      save(test, null);
      setFinished(true);
      return;
    }
    commit({ ...session!, index: session!.index + 1 });
  }

  return (
    <div className={styles.quizContainer} data-variant="saa">
      <QuizHeader variant="saa">
        <div className={styles.questionText}>{title}</div>
        <div className={styles.ptScore} aria-live="polite">
          <span>Question {session.index + 1} of {total}</span>
          <span>Score: <span className={styles.ptScoreValue}>{session.score} / {answeredCount}</span> ({pct(session.score, answeredCount)}%)</span>
        </div>
      </QuizHeader>

      <div className={styles.ptPrompt}>{q.prompt}</div>
      {q.multi && <div className={styles.ptHint}>Select {q.requiredCount}.</div>}

      <div className={styles.ptOptions} role={q.multi ? 'group' : 'radiogroup'} aria-label="Answer choices">
        {optionOrder.map(i => {
          const opt = q.options[i];
          const chosen = (isSubmitted ? submitted : selected).includes(i);
          let cls = styles.ptOption;
          if (isSubmitted) {
            if (opt.correct) cls += ` ${styles.ptCorrect}`;
            else if (chosen) cls += ` ${styles.ptWrong}`;
          } else if (chosen) cls += ` ${styles.ptSelected}`;
          return (
            <button
              key={i}
              type="button"
              className={cls}
              role={q.multi ? 'checkbox' : 'radio'}
              aria-checked={chosen}
              disabled={isSubmitted}
              onClick={() => toggle(i)}
            >
              <span className={`${styles.ptMarker} ${q.multi ? styles.ptMarkerCheck : styles.ptMarkerRadio}`} aria-hidden="true" />
              <span>{opt.text}</span>
            </button>
          );
        })}
      </div>

      {!isSubmitted && (
        <div className={styles.ptActions}>
          <button className={`${styles.ptPrimaryBtn}`} onClick={submit} disabled={selected.length === 0}>Submit answer</button>
        </div>
      )}

      {isSubmitted && (
        <>
          <div className={`${styles.ptVerdict} ${wasRight ? styles.ptVerdictRight : styles.ptVerdictWrong}`} role="status">
            {wasRight ? 'Correct' : 'Incorrect'}
          </div>
          <div className={styles.ptExplanation}>{linkify(q.explanation)}</div>
          {q.domain && <div className={styles.ptDomain}>Domain: {q.domain}</div>}
          <div className={styles.ptActions}>
            <button className={styles.ptPrimaryBtn} onClick={next}>{isLast ? 'Finish test' : 'Next question →'}</button>
          </div>
        </>
      )}
    </div>
  );
}
