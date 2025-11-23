import { useState } from 'react';
import type { QuizQuestion } from '../types';
import { getRandomQuestion } from '../lib/terms';
import styles from './Quiz.module.css';

export default function Quiz() {
  const [question, setQuestion] = useState<QuizQuestion | null>(() => getRandomQuestion());
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  function next() {
    setQuestion(getRandomQuestion());
    setSelected(null);
    setShowAnswer(false);
  }

  if (!question) return <div>No terms available. Run the extractor to generate data.</div>;

  function onSelect(i: number) {
    if (showAnswer) return;
    setSelected(i);
    setShowAnswer(true);
  }

  return (
    <div className={styles.quizContainer}>
      <h2 className={styles.quizTitle}>Which term matches this definition?</h2>
      <p className={styles.quizDefinition}>{question.definition}</p>

      <div className={styles.quizOptions}>
        {question.options.map((opt, i) => {
          const correct = i === question.correctIndex;
          const isSelected = selected === i;

          const classes = [styles.quizOption];
          if (showAnswer) {
            if (correct) classes.push(styles.correct);
            else if (isSelected) classes.push(styles.incorrect);
          }

          return (
            <button
              key={opt}
              onClick={() => onSelect(i)}
              className={classes.join(' ')}
              aria-pressed={isSelected}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <div className={styles.quizFooter}>
        {showAnswer && (
          <div>
            {selected === question.correctIndex ? (
              <strong style={{ color: '#8ce99a' }}>Correct 🎉</strong>
            ) : (
              <strong style={{ color: '#ff9b9b' }}>Incorrect — the correct answer is "{question.options[question.correctIndex]}"</strong>
            )}
          </div>
        )}

        <div style={{ marginLeft: 'auto' }}>
          <button onClick={next} className={styles.quizNext}>Next</button>
        </div>
      </div>
    </div>
  );
}
