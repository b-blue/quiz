import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

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

export default function LightGrid() {
  const [pattern, setPattern] = useState<boolean[]>(() => randomPattern());

  useEffect(() => {
    const id = window.setInterval(() => setPattern((previous) => nextPattern(previous)), 1300);
    return () => clearInterval(id);
  }, []);

  return (
    <Box
      aria-hidden
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 8px)`,
        gap: '3px',
        p: '7px',
        borderRadius: 2,
        bgcolor: 'rgba(0,0,0,0.22)',
      }}
    >
      {pattern.map((on, i) => (
        <Box
          key={i}
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: on ? '#ffeb3b' : 'rgba(255,255,255,0.28)',
            boxShadow: on ? '0 0 6px #ffeb3b' : 'none',
            transition: 'background-color 0.6s, box-shadow 0.6s',
          }}
        />
      ))}
    </Box>
  );
}
