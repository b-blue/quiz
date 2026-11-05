import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

const COLUMNS = 5;
const CELLS = 10;
const LIT = 5; // four green plus one yellow

type Light = 0 | 1 | 2; // off, green, yellow
const LIGHT_COLOR: Record<number, string> = { 1: '#69f0ae', 2: '#ffeb3b' };

function cellScore(index: number, seed: number): number {
  // A 32-bit integer hash gives each cell a repeatable pseudo-random score.
  let value = (seed + Math.imul(index + 1, 0x9e3779b9)) >>> 0;
  value = Math.imul(value ^ (value >>> 16), 0x85ebca6b);
  value = Math.imul(value ^ (value >>> 13), 0xc2b2ae35);
  return (value ^ (value >>> 16)) >>> 0;
}

function randomPattern(): Light[] {
  const seed = Math.floor(Math.random() * 0x100000000);
  const ranked = Array.from({ length: CELLS }, (_, index) => ({ index, score: cellScore(index, seed) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, LIT);
  const pattern = Array<Light>(CELLS).fill(0);
  ranked.forEach(({ index }, rank) => { pattern[index] = rank === 0 ? 2 : 1; });
  return pattern;
}

function nextPattern(previous: Light[]): Light[] {
  let next = randomPattern();
  while (next.every((v, index) => v === previous[index])) next = randomPattern();
  return next;
}

export default function LightGrid() {
  const [pattern, setPattern] = useState<Light[]>(() => randomPattern());

  useEffect(() => {
    const id = window.setInterval(() => setPattern((previous) => nextPattern(previous)), 1300);
    return () => clearInterval(id);
  }, []);

  return (
    <Box
      aria-hidden
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${COLUMNS}, 8px)`,
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
            bgcolor: LIGHT_COLOR[on] ?? 'rgba(255,255,255,0.28)',
            boxShadow: on ? `0 0 6px ${LIGHT_COLOR[on]}` : 'none',
            transition: 'background-color 0.6s, box-shadow 0.6s',
          }}
        />
      ))}
    </Box>
  );
}
