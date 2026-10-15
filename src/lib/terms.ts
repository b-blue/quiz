import raw from '../data/terms.json';
import saaRaw from '../data/saa-terms.json';
import type { Term, QuizQuestion } from '../types';

function normalizeTerms(input: unknown): Term[] {
  return ((input as Term[]) ?? []).map((t) => ({
    ...t,
    section: typeof t.section === 'string' ? t.section.trim() : t.section,
  }));
}

const TERMS = normalizeTerms(raw);
const SAA_TERMS = normalizeTerms(saaRaw);

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

export function getAllTerms(terms: Term[] = TERMS): Term[] {
  return terms;
}

export function getSaaTerms(): Term[] {
  return SAA_TERMS;
}

export function getSections(terms: Term[] = TERMS): string[] {
  return Array.from(new Set(terms.map((t) => (typeof t.section === 'string' ? t.section.trim() : t.section)).filter((s): s is string => Boolean(s)))).sort();
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

export function getRandomQuestion(section?: string | null, terms: Term[] = TERMS): QuizQuestion | null {
  if (!terms.length) return null;

  const pool = section ? terms.filter((t) => t.section === section) : terms;
  if (!pool.length) return null;

  // Multiple definition chunks can belong to one term; select terms uniformly
  // first so longer definitions do not make a concept more likely to appear.
  const uniqueTerms = uniqueStrings(pool.map((t) => t.term));
  const correctTerm = uniqueTerms[Math.floor(Math.random() * uniqueTerms.length)];
  const termDefinitions = pool.filter((t) => t.term === correctTerm);
  const correct = termDefinitions[Math.floor(Math.random() * termDefinitions.length)];
  // Keep answers distinct, preferring same-section distractors and filling
  // from the full exam dataset if that section has fewer than three others.
  const distractors = pickDistractors(correct, 3, terms);

  const options = shuffle([correct.term, ...distractors]);
  const correctIndex = options.findIndex((o) => o === correct.term);

  return {
    definition: correct.definition,
    options,
    correctIndex,
  };
}

export function getQuestionFromDefinition(def: string, terms: Term[] = TERMS): QuizQuestion | null {
  const entry = terms.find((t) => t.definition === def);
  if (!entry) return null;

  const distractors = pickDistractors(entry, 3, terms);
  const options = shuffle([entry.term, ...distractors]);
  const correctIndex = options.findIndex((o) => o === entry.term);
  return { definition: entry.definition, options, correctIndex };
}
