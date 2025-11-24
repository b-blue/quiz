import raw from '../data/terms.json';
import type { Term, QuizQuestion } from '../types';

const TERMS: Term[] = (raw as unknown as Term[]) ?? [];

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function uniqueStrings(arr: string[]): string[] {
  return Array.from(new Set(arr));
}

export function getAllTerms(): Term[] {
  return TERMS;
}

export function getSections(): string[] {
  return Array.from(new Set(TERMS.map((t) => t.section).filter(Boolean))).sort();
}

/**
 * Pick up to `count` unique distractors, preferring same-section terms when possible.
 */
function pickDistractors(correct: Term, count = 3, pool: Term[] = TERMS): string[] {
  const correctTerm = correct.term;

  const others = pool.filter((t) => t.term !== correctTerm);

  // Terms in the same section (if section exists)
  const sameSection = correct.section
    ? others.filter((t) => t.section === correct.section).map((t) => t.term)
    : [];

  const otherSection = others.filter((t) => t.section !== correct.section).map((t) => t.term);

  const chosen: string[] = [];

  function takeFrom(list: string[]) {
    for (const candidate of shuffle(uniqueStrings(list))) {
      if (chosen.length >= count) break;
      if (candidate === correctTerm) continue;
      if (!chosen.includes(candidate)) chosen.push(candidate);
    }
  }

  takeFrom(sameSection);
  if (chosen.length < count) takeFrom(otherSection);

  return chosen.slice(0, count);
}

export function getRandomQuestion(section?: string | null): QuizQuestion | null {
  if (!TERMS.length) return null;

  const pool = section ? TERMS.filter((t) => t.section === section) : TERMS;
  if (!pool.length) return null;

  const correct = pool[Math.floor(Math.random() * pool.length)];
  const distractors = pickDistractors(correct, 3, pool);

  const options = shuffle([correct.term, ...distractors]);
  const correctIndex = options.findIndex((o) => o === correct.term);

  return {
    definition: correct.definition,
    options,
    correctIndex,
  };
}

export function getQuestionFromDefinition(def: string): QuizQuestion | null {
  const entry = TERMS.find((t) => t.definition === def);
  if (!entry) return null;

  const distractors = pickDistractors(entry, 3);
  const options = shuffle([entry.term, ...distractors]);
  const correctIndex = options.findIndex((o) => o === entry.term);
  return { definition: entry.definition, options, correctIndex };
}
