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

  return (
    <div className={styles.headerBar}>
      <div className={styles.gizmoWell} aria-hidden>
        <LightGrid variant={gridVariant} />
      </div>
      <div className={styles.questionWell}>{children}</div>
    </div>
  );
}
