import { useEffect, useState } from 'react';
import styles from './Quiz.module.css';

const GRID_SIZE = 5;
const ACTIVE_LIGHTS = 10;

function cellScore(index: number, seed: number): number {
  // A 32-bit integer hash gives each cell a repeatable pseudo-random score.
  let value = (seed + Math.imul(index + 1, 0x9e3779b9)) >>> 0;
  value = Math.imul(value ^ (value >>> 16), 0x85ebca6b);
  value = Math.imul(value ^ (value >>> 13), 0xc2b2ae35);
  return (value ^ (value >>> 16)) >>> 0;
}

function randomPattern(): boolean[] {
  const cellCount = GRID_SIZE * GRID_SIZE;
  const seed = Math.floor(Math.random() * 0x100000000);
  const brightestCells = Array.from({ length: cellCount }, (_, index) => ({
    index,
    score: cellScore(index, seed),
  }))
    .sort((a, b) => b.score - a.score)
    .slice(0, ACTIVE_LIGHTS);
  const activeIndexes = new Set(brightestCells.map(({ index }) => index));

  return Array.from({ length: cellCount }, (_, index) => activeIndexes.has(index));
}

function nextPattern(previous: boolean[]): boolean[] {
  let next = randomPattern();
  while (next.every((isActive, index) => isActive === previous[index])) {
    next = randomPattern();
  }
  return next;
}

export default function LightGrid({ variant }: { variant?: 'default'|'settings'|'bio'|'saa' } = { variant: 'default' }) {
  const [pattern, setPattern] = useState<boolean[]>(() => randomPattern());

  useEffect(() => {
    const id = window.setInterval(() => setPattern((previous) => nextPattern(previous)), 1300);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.gizmoGrid} data-variant={variant} aria-hidden>
      {pattern.map((on, i) => (
        <div key={i} className={`${styles.gizmoLight} ${on ? styles.gizmoOn : ''}`} />
      ))}
    </div>
  );
}
