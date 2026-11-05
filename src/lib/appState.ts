import type { StudyFocus } from './studySections';

export type AppView = 'hub' | 'aws' | 'saa' | 'practice';

export interface SavedView {
  view: AppView;
  test?: number;
}

export interface StudyState {
  from: 'quiz' | 'practice';
  focus?: StudyFocus;
  scroll?: number;
  query?: string;
}

const VIEW_KEY = 'app:view';
const STUDY_KEY = 'app:study';

export function loadView(): SavedView {
  try {
    const v = JSON.parse(localStorage.getItem(VIEW_KEY) ?? 'null');
    if (v && (v.view === 'aws' || v.view === 'saa' || v.view === 'hub')) return { view: v.view };
    if (v && v.view === 'practice' && Number.isInteger(v.test)) return { view: 'practice', test: v.test };
  } catch { /* fall through to hub */ }
  return { view: 'hub' };
}

export function saveView(v: SavedView) {
  try { localStorage.setItem(VIEW_KEY, JSON.stringify(v)); } catch { /* storage unavailable */ }
}

export function loadStudy(): StudyState | null {
  try {
    const s = JSON.parse(localStorage.getItem(STUDY_KEY) ?? 'null');
    return s && (s.from === 'quiz' || s.from === 'practice') ? s : null;
  } catch { return null; }
}

export function saveStudy(s: StudyState | null) {
  try {
    if (s) localStorage.setItem(STUDY_KEY, JSON.stringify(s));
    else localStorage.removeItem(STUDY_KEY);
  } catch { /* storage unavailable */ }
}

export function patchStudy(patch: Partial<StudyState>) {
  const cur = loadStudy();
  if (cur) saveStudy({ ...cur, ...patch });
}

export const SHOW_SCORE_KEY = 'practice:showScore';

export function showScoreEnabled(): boolean {
  try { return localStorage.getItem(SHOW_SCORE_KEY) !== '0'; } catch { return true; }
}

export function saveShowScore(on: boolean) {
  try { localStorage.setItem(SHOW_SCORE_KEY, on ? '1' : '0'); } catch { /* storage unavailable */ }
}
