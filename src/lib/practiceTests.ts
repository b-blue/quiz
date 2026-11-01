import { parseTest } from './practiceParser';
import type { PracticeQuestion } from './practiceParser';

export type { PracticeQuestion, PracticeOption } from './practiceParser';

export const PRACTICE_TEST_NUMBERS = [1, 2, 3, 4, 5, 6] as const;

const loaders = import.meta.glob('../data/B/test-*.txt', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;

export async function loadPracticeTest(n: number): Promise<PracticeQuestion[]> {
  const key = Object.keys(loaders).find(k => k.endsWith(`/test-${n}.txt`));
  if (!key) throw new Error(`Practice test ${n} not found`);
  return parseTest(await loaders[key]());
}
