import { useState } from 'react';
import { SHOW_SECTION_KEY, showSectionEnabled } from '../lib/studySections';
import { showScoreEnabled, saveShowScore } from '../lib/appState';
import styles from './Quiz.module.css';
import QuizHeader from './QuizHeader';
import { PRACTICE_TEST_NUMBERS } from '../lib/practiceTests';

type QuizMode = 'aws' | 'saa';

const QUIZZES: { mode: QuizMode; label: string }[] = [
  { mode: 'aws', label: 'CLF-C02' },
  { mode: 'saa', label: 'SAA-C03' },
];

export default function Hub({ onStartQuiz, onStartPractice }: { onStartQuiz: (mode: QuizMode) => void; onStartPractice: (test: number) => void }) {
  const [showSection, setShowSection] = useState(showSectionEnabled());
  const [muted, setMutedState] = useState(localStorage.getItem('quiz:muted') === '1');
  const [showScore, setShowScore] = useState(showScoreEnabled());

  function setMuted(next: boolean) {
    try { localStorage.setItem('quiz:muted', next ? '1' : '0'); } catch { /* storage unavailable */ }
    setMutedState(next);
  }

  return (
    <div className={styles.quizContainer} data-variant="settings">
      <QuizHeader variant="settings">
        <div className={styles.questionText}>AWS Test Hub</div>
      </QuizHeader>

      <div className={styles.settingsCard} style={{ marginTop: 12, padding: '1rem' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700 }}>Quiz Mode</div>
          <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Flashcard-style: match each clue to the right service</div>
          <div className={styles.hubQuizGrid}>
            {QUIZZES.map(q => (
              <button key={q.mode} className={`${styles.timedBtn} ${styles.btn3d}`} onClick={() => onStartQuiz(q.mode)}>{q.label}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700 }}>Practice Test Mode</div>
          <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Take a full 65-question practice test in random order</div>
          <div className={styles.ptTestGrid}>
            {PRACTICE_TEST_NUMBERS.map(n => (
              <button key={n} className={`${styles.timedBtn} ${styles.btn3d}`} onClick={() => onStartPractice(n)}>Test {n}</button>
            ))}
          </div>
        </div>

        <div style={{ fontWeight: 700, fontSize: '1.1rem', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 12, marginBottom: 8 }}>Settings</div>

        <div className={styles.settingsMuteSection}>
          <div>
            <div style={{ fontWeight: 700 }}>Practice test score</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Show the running score during a test (also toggled by tapping it)</div>
          </div>
          <button
            className={`${styles.timedBtn} ${showScore ? styles.timedBtnActive : ''} ${styles.btn3d}`}
            onClick={() => { const next = !showScore; saveShowScore(next); setShowScore(next); }}
            aria-pressed={showScore}
          >
            {showScore ? 'Shown' : 'Hidden'}
          </button>
        </div>

        <div className={styles.settingsMuteSection}>
          <div>
            <div style={{ fontWeight: 700 }}>Study guide topic</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Show each practice question's study-guide section</div>
          </div>
          <button
            className={`${styles.timedBtn} ${showSection ? styles.timedBtnActive : ''} ${styles.btn3d}`}
            onClick={() => { const next = !showSection; try { localStorage.setItem(SHOW_SECTION_KEY, next ? '1' : '0'); } catch { /* storage unavailable */ } setShowSection(next); }}
            aria-pressed={showSection}
          >
            {showSection ? 'On' : 'Off'}
          </button>
        </div>

        <div className={styles.settingsMuteSection}>
          <div>
            <div style={{ fontWeight: 700 }}>Audio</div>
            <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Toggle quiz sound effects</div>
          </div>
          <button
            className={`${styles.muteBtn} ${styles.settingsMuteButton} ${styles.btn3d}`}
            onClick={() => setMuted(!muted)}
            aria-label={muted ? 'Sound is muted. Click to unmute.' : 'Sound is on. Click to mute.'}
            title={muted ? 'Sound is muted' : 'Sound is on'}
          >
            <span aria-hidden="true">{muted ? '🔇' : '🔊'}</span>
            {muted ? 'Muted' : 'Sound on'}
          </button>
        </div>
      </div>
    </div>
  );
}
