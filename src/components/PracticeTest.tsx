import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { loadPracticeTest } from '../lib/practiceTests';
import type { PracticeQuestion } from '../lib/practiceTests';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import MenuBookIcon from '@mui/icons-material/MenuBookOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import GridViewIcon from '@mui/icons-material/GridViewOutlined';
import AppShell from './AppShell';
import { getPracticeSections, showSectionEnabled } from '../lib/studySections';
import type { StudyFocus } from '../lib/studySections';
import { loadStudy, saveStudy, showScoreEnabled } from '../lib/appState';
import { initialStudy, pushScreen, currentScreen, useScreenPop } from '../lib/screenHistory';

const StudyPanel = lazy(() => import('./StudyPanel'));

interface Session {
  order: number[]; // question ids in the randomized order
  optionOrders: Record<number, number[]>; // shuffled option indexes per question id
  index: number;
  answers: Record<number, number[]>; // submitted selections per question id
  score: number;
  flagged?: number[]; // question ids marked for review
}

const wrapChip = { height: 'auto', maxWidth: '100%', py: 0.25, '& .MuiChip-label': { whiteSpace: 'normal' } } as const;

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
      ? <Link key={i} href={part} target="_blank" rel="noreferrer" sx={{ overflowWrap: 'anywhere' }}>{part}</Link>
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
  const [view, setViewState] = useState<'question' | 'grid'>(() => currentScreen()?.sub === 'grid' ? 'grid' : 'question');
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const showScore = showScoreEnabled();
  const [studyFocus, setStudyFocus] = useState<StudyFocus | null>(() => { const st = initialStudy('practice'); return st ? st.focus ?? { sections: [], terms: [] } : null; });
  const [cramOpenId, setCramOpenId] = useState<number | null>(null);
  const route = { view: 'practice' as const, test };
  function setView(v: 'question' | 'grid') {
    pushScreen(route, v === 'grid' ? 'grid' : undefined);
    setViewState(v);
  }
  useScreenPop(useCallback((sc) => {
    setViewState(sc?.sub === 'grid' ? 'grid' : 'question');
    if (sc?.sub === 'study' && sc.study) {
      saveStudy(sc.study);
      setStudyFocus(sc.study.focus ?? { sections: [], terms: [] });
    } else {
      saveStudy(null);
      setStudyFocus(null);
    }
  }, []));
  const touch = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const pressTimer = useRef<number | null>(null);
  const pressFired = useRef(false);

  useEffect(() => {
    let cancelled = false;
    loadPracticeTest(test)
      .then(qs => {
        if (cancelled) return;
        setQuestions(qs);
        const prior = readSaved(test, qs);
        if (prior && loadStudy()?.from === 'practice') setSession(prior);
        else if (prior && Object.keys(prior.answers).length > 0) setSaved(prior);
        else setSession(newSession(qs));
      })
      .catch(e => { if (!cancelled) setError(String(e)); });
    return () => { cancelled = true; };
  }, [test]);

  const currentIndex = session?.index;
  useEffect(() => {
    document.querySelector('[data-pt-scroll]')?.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [currentIndex, view, test]);

  const byId = useMemo(() => new Map((questions ?? []).map(q => [q.id, q])), [questions]);

  function commit(next: Session) {
    setSession(next);
    save(test, next);
  }

  function start() {
    if (!questions) return;
    setSelected([]);
    setFinished(false);
    setView('question');
    setConfirmSubmit(false);
    setSaved(null);
    commit(newSession(questions));
  }

  function resume() {
    if (!saved) return;
    setSelected([]);
    setView('question');
    setSession(saved);
    setSaved(null);
  }

  const title = `Practice Test ${test}`;

  if (error) {
    return (
      <AppShell title={title}>
        <Alert severity="error" sx={{ mb: 2 }}>Could not load this test: {error}</Alert>
        <Button variant="contained" onClick={onExit}>Back to hub</Button>
      </AppShell>
    );
  }

  if (!questions) {
    return <AppShell title={title}><Typography>Loading…</Typography></AppShell>;
  }

  if (saved) {
    const done = Object.keys(saved.answers).length;
    return (
      <AppShell title={title}>
        <Paper sx={{ p: 2, mb: 2 }}>
          You have a test in progress: {done} of {questions.length} questions answered, {saved.score} correct.
        </Paper>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Button variant="contained" onClick={resume}>Resume</Button>
          <Button variant="outlined" onClick={start}>Start over (reshuffle)</Button>
          <Button onClick={onExit}>Back to hub</Button>
        </Box>
      </AppShell>
    );
  }

  if (!session) return null;

  const total = questions.length;
  const answeredCount = Object.keys(session.answers).length;
  const pct = (n: number, d: number) => (d === 0 ? 0 : Math.round((n / d) * 1000) / 10);

  if (finished) {
    return (
      <AppShell title={`${title} complete`}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h2" color="primary" sx={{ fontWeight: 700 }}>{pct(session.score, total)}%</Typography>
          <Typography sx={{ my: 2 }}>You answered {session.score} of {total} questions correctly.</Typography>
          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" onClick={start}>Retake (new random order)</Button>
            <Button variant="outlined" onClick={onExit}>Back to hub</Button>
          </Box>
        </Paper>
      </AppShell>
    );
  }

  const flaggedIds = session.flagged ?? [];

  if (view === 'grid') {
    const unanswered = total - answeredCount;
    return (
      <AppShell
        title={title}
        subtitle={`${answeredCount} of ${total} answered${showScore ? ` · Score ${session.score}/${answeredCount} (${pct(session.score, answeredCount)}%)` : ''}`}
        actions={
          <>
            <Button variant="outlined" onClick={() => { setConfirmSubmit(false); setView('question'); }}>Question {session.index + 1}</Button>
            <Button
              variant="contained"
              sx={{ flex: 1 }}
              onClick={() => {
                if (unanswered > 0 && !confirmSubmit) { setConfirmSubmit(true); return; }
                save(test, null);
                setFinished(true);
              }}
            >
              {confirmSubmit && unanswered > 0 ? 'Yes, submit test' : 'Submit test'}
            </Button>
          </>
        }
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
          <Button size="small" onClick={onExit}>Back to hub</Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 1.5, fontSize: 13, color: 'text.secondary', alignItems: 'center' }}>
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
            <Box component="span" sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: 'primary.main' }} /> Answered
          </Box>
          <span>Not answered</span>
          <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75 }}>
            <Box component="span" sx={{ width: 16, height: 16, boxSizing: 'border-box', borderRadius: '50%', border: '2px dotted #fbc02d' }} /> Flagged
          </Box>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(52px, 1fr))', gap: 1 }}>
          {session.order.map((id, i) => {
            const done = session.answers[id] !== undefined;
            const flagged = flaggedIds.includes(id);
            return (
              <Button
                key={id}
                variant="outlined"
                color="inherit"
                aria-label={`Question ${i + 1}, ${done ? 'answered' : 'not answered'}${flagged ? ', flagged' : ''}`}
                aria-current={i === session.index ? 'true' : undefined}
                onClick={() => { setSelected([]); setConfirmSubmit(false); commit({ ...session, index: i }); setView('question'); }}
                sx={{
                  minWidth: 0, p: 0.5, height: 48, borderRadius: 2, color: 'text.primary',
                  borderColor: i === session.index ? 'primary.main' : 'divider',
                  borderWidth: i === session.index ? 2 : 1,
                  ...(i === session.index && { bgcolor: theme => alpha(theme.palette.primary.main, 0.12) }),
                }}
              >
                <Box
                  component="span"
                  sx={{
                    minWidth: 28, height: 28, px: 0.25, boxSizing: 'border-box', borderRadius: '50%',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: done ? 700 : 400, fontSize: 14,
                    border: '2px dotted transparent',
                    ...(done ? { bgcolor: 'primary.main', color: 'primary.contrastText' } : { color: 'text.secondary' }),
                    ...(flagged && { borderColor: '#fbc02d' }),
                  }}
                >
                  {i + 1}
                </Box>
              </Button>
            );
          })}
        </Box>
        {confirmSubmit && unanswered > 0 && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            {unanswered} question{unanswered === 1 ? ' is' : 's are'} unanswered and will count as incorrect. Submit anyway?
          </Alert>
        )}
      </AppShell>
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
      setView('grid');
      return;
    }
    commit({ ...session!, index: session!.index + 1 });
  }

  function toggleFlag() {
    const cur = session!.flagged ?? [];
    commit({ ...session!, flagged: cur.includes(qid) ? cur.filter(x => x !== qid) : [...cur, qid] });
  }
  const isFlagged = flaggedIds.includes(qid);
  const cramOpen = cramOpenId === qid;

  function clearPress() {
    if (pressTimer.current !== null) { window.clearTimeout(pressTimer.current); pressTimer.current = null; }
  }

  function onPromptTouchStart() {
    pressFired.current = false;
    clearPress();
    pressTimer.current = window.setTimeout(() => {
      pressFired.current = true;
      pressTimer.current = null;
      toggleFlag();
    }, 500);
  }

  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, moved: false };
  }

  function onTouchMove(e: React.TouchEvent) {
    const st = touch.current;
    if (!st) return;
    const t = e.touches[0];
    if (Math.hypot(t.clientX - st.x, t.clientY - st.y) > 10) { st.moved = true; clearPress(); }
  }

  function onTouchEnd() {
    clearPress();
    touch.current = null;
  }
  if (studyFocus) {
    return (
      <Suspense fallback={<AppShell title={title}><Typography>Loading study guide…</Typography></AppShell>}>
        <StudyPanel mode="saa" focus={studyFocus} restore={loadStudy() ?? undefined} />
      </Suspense>
    );
  }

  const sectionInfo = showSectionEnabled() ? getPracticeSections(test, q.id) : undefined;
  const hasSections = !!sectionInfo && sectionInfo.sections.length > 0;

  function openStudy() {
    if (!sectionInfo) return;
    const focus = { sections: sectionInfo.sections.map(x => x.sub), terms: sectionInfo.terms };
    if (session) save(test, session);
    const study = { from: 'practice' as const, focus };
    saveStudy(study);
    pushScreen(route, 'study', study);
    setStudyFocus(focus);
  }

  const actions = (
    <>
      {hasSections && <Button variant="outlined" startIcon={<MenuBookIcon />} onClick={openStudy}>Guide</Button>}
      <Button variant="outlined" startIcon={isFlagged ? <FlagIcon /> : <FlagOutlinedIcon />} color={isFlagged ? 'warning' : 'primary'} onClick={toggleFlag} aria-pressed={isFlagged}>Flag</Button>
      {!isSubmitted
        ? <Button variant="contained" sx={{ flex: 1 }} onClick={submit} disabled={selected.length === 0}>Submit</Button>
        : <Button variant="contained" sx={{ flex: 1 }} onClick={next}>{isLast ? 'Review all' : 'Next'}</Button>}
    </>
  );

  return (
    <AppShell
      title={title}
      subtitle={`Question ${session.index + 1} of ${total}${showScore ? ` · Score ${session.score}/${answeredCount} (${pct(session.score, answeredCount)}%)` : ''}`}
      actions={actions}
      menuItems={[{ label: 'All questions', icon: <GridViewIcon />, onClick: () => { setConfirmSubmit(false); setView('grid'); } }]}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={() => { clearPress(); touch.current = null; }}
    >
      <LinearProgress variant="determinate" value={(answeredCount / total) * 100} sx={{ height: 6, borderRadius: 3, mb: 1.5 }} aria-label="Test progress" />
      {hasSections && sectionInfo!.sections.map((sec, idx, all) => (
        <Box key={sec.sub} sx={{ mb: 1 }}>
          {all.findIndex(x => x.domain === sec.domain) === idx && <Chip size="small" color="primary" variant="outlined" label={sec.domain} sx={{ ...wrapChip, mr: 0.5, mb: 0.5 }} />}
          <Chip size="small" label={sec.sub} sx={{ ...wrapChip, mb: 0.5 }} />
        </Box>
      ))}

      <Paper
        sx={{ p: 2, mt: 1, whiteSpace: 'pre-wrap', lineHeight: 1.5, WebkitTouchCallout: 'none', userSelect: 'none' }}
        onTouchStart={onPromptTouchStart}
        onContextMenu={e => e.preventDefault()}
      >
        {isFlagged && <FlagIcon aria-label="Flagged" sx={{ fontSize: 18, verticalAlign: -3, mr: 0.5, color: 'warning.main' }} />}
        {q.prompt}
      </Paper>
      {q.multi && <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Select {q.requiredCount}.</Typography>}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1.5 }} role={q.multi ? 'group' : 'radiogroup'} aria-label="Answer choices">
        {optionOrder.map(i => {
          const opt = q.options[i];
          const chosen = (isSubmitted ? submitted : selected).includes(i);
          const state = isSubmitted ? (opt.correct ? 'success' : chosen ? 'error' : null) : null;
          return (
            <Paper
              key={i}
              component="button"
              type="button"
              variant="outlined"
              role={q.multi ? 'checkbox' : 'radio'}
              aria-checked={chosen}
              disabled={isSubmitted}
              onClick={() => toggle(i)}
              sx={(theme) => ({
                display: 'flex',
                gap: 1.5,
                alignItems: 'flex-start',
                textAlign: 'left',
                font: 'inherit',
                color: 'text.primary',
                p: 1.5,
                width: '100%',
                whiteSpace: 'pre-wrap',
                cursor: isSubmitted ? 'default' : 'pointer',
                borderColor: state ? theme.palette[state].main : chosen ? theme.palette.primary.main : undefined,
                bgcolor: state ? alpha(theme.palette[state].main, 0.15) : chosen ? alpha(theme.palette.primary.main, 0.12) : 'background.paper',
              })}
            >
              <Box
                aria-hidden
                sx={{
                  flex: 'none', width: 18, height: 18, mt: '2px', border: 2, borderColor: chosen ? 'primary.main' : 'text.secondary',
                  borderRadius: q.multi ? '4px' : '50%',
                  bgcolor: chosen ? 'primary.main' : 'transparent',
                  boxShadow: chosen && !q.multi ? (theme) => `inset 0 0 0 3px ${theme.palette.background.paper}` : 'none',
                }}
              />
              <span>{opt.text}</span>
            </Paper>
          );
        })}
      </Box>

      {isSubmitted && (
        <Box sx={{ mt: 2 }}>
          <Alert severity={wasRight ? 'success' : 'error'} role="status" sx={{ fontWeight: 500 }}>{wasRight ? 'Correct' : 'Incorrect'}</Alert>
          {q.cram ? (
            <>
              <Paper
                component="button"
                type="button"
                variant="outlined"
                aria-expanded={cramOpen}
                onClick={() => setCramOpenId(cramOpen ? null : qid)}
                sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, width: '100%', textAlign: 'left', font: 'inherit', color: 'text.primary', p: 1.5, mt: 1.5, cursor: 'pointer', borderColor: 'primary.main' }}
              >
                <span><strong>Cram:</strong> {q.cram}</span>
                <span aria-hidden="true">{cramOpen ? '▾' : '▸'}</span>
              </Paper>
              {cramOpen && <Paper sx={{ p: 2, mt: 1, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{linkify(q.explanation)}</Paper>}
            </>
          ) : (
            <Paper sx={{ p: 2, mt: 1.5, whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{linkify(q.explanation)}</Paper>
          )}
          {q.domain && <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>Domain: {q.domain} · Ref T{test}Q{q.id}</Typography>}
          {q.references.length > 0 && (
            <Box component="section" aria-labelledby="pt-refs-title" sx={{ mt: 1.5 }}>
              <Typography id="pt-refs-title" variant="subtitle2" component="h3">References</Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.5, fontSize: 14 }}>
                {q.references.map(r => <li key={r}><Link href={r} target="_blank" rel="noreferrer" sx={{ overflowWrap: 'anywhere' }}>{r}</Link></li>)}
              </Box>
            </Box>
          )}
        </Box>
      )}
    </AppShell>
  );
}
