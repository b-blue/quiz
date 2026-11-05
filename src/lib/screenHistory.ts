import { useEffect } from 'react';
import { loadStudy, saveStudy } from './appState';
import type { SavedView, StudyState } from './appState';

export type SubScreen = 'grid' | 'study';

export interface ScreenState {
  idx: number;
  view: SavedView;
  sub?: SubScreen;
  study?: StudyState;
}

export function currentScreen(): ScreenState | null {
  const s = history.state?.app;
  return s && typeof s.idx === 'number' && s.view ? s : null;
}

function write(method: 'pushState' | 'replaceState', idx: number, view: SavedView, sub?: SubScreen, study?: StudyState) {
  const app: ScreenState = { idx, view, ...(sub ? { sub } : {}), ...(study ? { study } : {}) };
  try { history[method]({ app }, ''); } catch { /* history unavailable */ }
}

// Pushes a new screen so a swipe (or the system back gesture) can return to the previous one.
export function pushScreen(view: SavedView, sub?: SubScreen, study?: StudyState) {
  const cur = currentScreen();
  if (cur && cur.view.view === view.view && cur.view.test === view.test && cur.sub === sub) {
    if (sub === 'study') write('replaceState', cur.idx, view, sub, study);
    return;
  }
  write('pushState', (cur?.idx ?? 0) + 1, view, sub, study);
}

export function replaceScreen(view: SavedView, sub?: SubScreen, study?: StudyState) {
  write('replaceState', currentScreen()?.idx ?? 0, view, sub, study);
}

export function initScreenHistory(view: SavedView) {
  const study = loadStudy() ?? undefined;
  const cur = currentScreen();
  write('replaceState', cur?.idx ?? 0, view, cur ? cur.sub : study ? 'study' : undefined, cur ? cur.study : study);
}

export function goBack() {
  if ((currentScreen()?.idx ?? 0) > 0) history.back();
}

export function goForward() {
  history.forward();
}

// The study state to show on mount; null when the current screen is not a study guide.
export function initialStudy(from: StudyState['from']): StudyState | null {
  const s = currentScreen();
  if (!s || s.sub !== 'study') return null;
  const stored = loadStudy();
  const st = stored && stored.from === from ? stored : s.study ?? null;
  if (!st || st.from !== from) return null;
  saveStudy(st);
  return st;
}

export function useScreenPop(apply: (s: ScreenState | null) => void) {
  useEffect(() => {
    const f = () => apply(currentScreen());
    window.addEventListener('popstate', f);
    return () => window.removeEventListener('popstate', f);
  }, [apply]);
}

// A screen can claim swipes first (e.g. stepping between questions); return true when handled.
type SwipeHandler = (dir: 'left' | 'right') => boolean;
let swipeHandler: SwipeHandler | null = null;

export function setSwipeHandler(h: SwipeHandler | null) {
  swipeHandler = h;
}

export function handleSwipe(dir: 'left' | 'right') {
  if (swipeHandler?.(dir)) return;
  if (dir === 'left') goBack();
  else goForward();
}
