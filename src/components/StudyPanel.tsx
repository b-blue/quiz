import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clfStudyMarkdown from '../data/B/CLF-C02.md?raw';
import saaStudyMarkdown from '../data/B/SAA-C03.md?raw';
import styles from './Quiz.module.css';
import QuizHeader from './QuizHeader';

export default function StudyPanel({ mode, onBack }: { mode: 'aws' | 'saa'; onBack: () => void }) {
  const isSaa = mode === 'saa';
  const title = isSaa ? 'SAA-C03 Study Guide' : 'CLF-C02 Study Guide';
  const markdown = isSaa ? saaStudyMarkdown : clfStudyMarkdown;

  return (
    <div className={styles.quizContainer} data-variant={mode}>
      <QuizHeader variant={mode}>
        <div className={styles.studyHeaderContent}>
          <h1 className={styles.studyTitle}>{title}</h1>
          <button
            className={`${styles.studyBackButton} ${styles.btn3d}`}
            onClick={onBack}
            aria-label="Return to quiz"
          >
            ← Back to quiz
          </button>
        </div>
      </QuizHeader>
      <article className={styles.studyContent}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </article>
    </div>
  );
}
