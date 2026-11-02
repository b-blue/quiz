import { parseTest } from './practiceParser';
import type { PracticeQuestion } from './practiceParser';

export type { PracticeQuestion, PracticeOption } from './practiceParser';

export const PRACTICE_TEST_NUMBERS = [1, 2, 3, 4, 5, 6] as const;

const loaders = import.meta.glob('../data/B/test-*.txt', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;

const cramLoaders = import.meta.glob('../data/B/cram-*.json', { import: 'default' }) as Record<string, () => Promise<Record<string, string>>>;

export async function loadPracticeTest(n: number): Promise<PracticeQuestion[]> {
  const key = Object.keys(loaders).find(k => k.endsWith(`/test-${n}.txt`));
  if (!key) throw new Error(`Practice test ${n} not found`);
  const questions = parseTest(await loaders[key]());
  const cramKey = Object.keys(cramLoaders).find(k => k.endsWith(`/cram-${n}.json`));
  if (!cramKey) return questions;
  const cram = await cramLoaders[cramKey]();
  return questions.map(q => ({ ...q, cram: cram[String(q.id)] || undefined }));
}

export async function loadCramText(n: number, id: number): Promise<string | undefined> {
  const key = Object.keys(cramLoaders).find(k => k.endsWith(`/cram-${n}.json`));
  if (!key) return undefined;
  return (await cramLoaders[key]())[String(id)];
}
