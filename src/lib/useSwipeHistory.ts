import { useEffect } from 'react';
import { goBack, goForward } from './screenHistory';

const IGNORE = 'input, textarea, select, [role="slider"], .MuiSlider-root, pre, table';

// Swipe left = previous screen, swipe right = next screen (when one exists).
export function useSwipeHistory() {
  useEffect(() => {
    let start: { x: number; y: number } | null = null;
    const onStart = (e: TouchEvent) => {
      const el = e.target as Element | null;
      start = e.touches.length === 1 && !el?.closest?.(IGNORE) ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
    };
    const onEnd = (e: TouchEvent) => {
      const s = start;
      start = null;
      if (!s) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - s.x;
      const dy = t.clientY - s.y;
      if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      if (dx < 0) goBack();
      else goForward();
    };
    document.addEventListener('touchstart', onStart, { passive: true });
    document.addEventListener('touchend', onEnd, { passive: true });
    return () => { document.removeEventListener('touchstart', onStart); document.removeEventListener('touchend', onEnd); };
  }, []);
}
