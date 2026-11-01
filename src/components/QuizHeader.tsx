import { useRef } from 'react';
import type { ReactNode } from 'react';
import LightGrid from './LightGrid';
import styles from './Quiz.module.css';

type QuizHeaderVariant = 'aws' | 'saa' | 'bio' | 'settings';

export default function QuizHeader({
  variant,
  children,
}: {
  variant: QuizHeaderVariant;
  children: ReactNode;
}) {
  const gridVariant = variant === 'aws' ? 'default' : variant;
  const pressStart = useRef<{ t: number; x: number; y: number } | null>(null);

  function onTouchStart(e: React.TouchEvent) {
    e.stopPropagation();
    const t = e.touches[0];
    pressStart.current = { t: Date.now(), x: t.clientX, y: t.clientY };
  }

  // Fullscreen needs a user gesture, so toggle when the finger lifts after a long hold.
  function onTouchEnd(e: React.TouchEvent) {
    e.stopPropagation();
    const s = pressStart.current;
    pressStart.current = null;
    if (!s || Date.now() - s.t < 500 || !document.fullscreenEnabled) return;
    const t = e.changedTouches[0];
    if (Math.hypot(t.clientX - s.x, t.clientY - s.y) > 10) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen().catch(() => {});
  }

  return (
    <div className={styles.headerBar}>
      <div
        className={styles.gizmoWell}
        aria-hidden
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onContextMenu={e => e.preventDefault()}
      >
        <LightGrid variant={gridVariant} />
      </div>
      <div className={styles.questionWell}>{children}</div>
    </div>
  );
}
