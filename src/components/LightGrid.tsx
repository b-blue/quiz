import { useEffect, useState } from 'react';
import styles from './Quiz.module.css';

function randomPattern() {
  // produce an array of 25 booleans
  const out: boolean[] = Array.from({ length: 25 }, () => Math.random() > 0.7);
  return out;
}

function checkerboard() {
  const out: boolean[] = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      out.push(((r + c) % 2) === 0);
    }
  }
  return out;
}

function diagonalWave(step: number) {
  const out: boolean[] = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      out.push(((r + c + step) % 5) < 2);
    }
  }
  return out;
}

export default function LightGrid({ variant }: { variant?: 'default'|'settings'|'bio' } = { variant: 'default' }) {
  const [pattern, setPattern] = useState<boolean[]>(() => randomPattern());
  const [step, setStep] = useState(0);

  // pick a generator each cycle sometimes
  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => s + 1);
      const r = Math.random();
      if (r < 0.25) setPattern(randomPattern());
      else if (r < 0.5) setPattern(checkerboard());
      else if (r < 0.8) setPattern(diagonalWave(step + 1));
      else setPattern(() => {
        // a subtle random cluster
        const out: boolean[] = Array.from({ length: 25 }, () => Math.random() > 0.82);
        return out;
      });
    }, 1300);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <div className={styles.gizmoGrid} data-variant={variant} aria-hidden>
      {pattern.map((on, i) => (
        <div key={i} className={`${styles.gizmoLight} ${on ? styles.gizmoOn : ''}`} />
      ))}
    </div>
  );
}
