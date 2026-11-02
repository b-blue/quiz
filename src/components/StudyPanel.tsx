import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clfStudyMarkdown from '../data/B/CLF-C02.md?raw';
import saaStudyMarkdown from '../data/B/SAA-C03.md?raw';
import styles from './Quiz.module.css';
import QuizHeader from './QuizHeader';
import { sectionSlug } from '../lib/studySections';
import type { StudyFocus } from '../lib/studySections';

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (node && typeof node === 'object' && 'props' in node) return textOf((node as { props: { children?: ReactNode } }).props.children);
  return '';
}

function formatTermDefinitions(markdown: string): string {
  return markdown.split(/\r?\n/).map((line) => {
    const match = line.match(/^(\s*)([-*+]\s+)(.+?)\s*\/\/\s*(.+)$/);
    if (!match) return line;

    const [, indentation, marker, term, definition] = match;
    return `${indentation}${marker}**${term.trim()}**\n\n${indentation}  ${definition.trim()}`;
  }).join('\n');
}

interface HastNode { type: string; tagName?: string; value?: string; children?: HastNode[] }

function hastText(n?: HastNode): string {
  if (!n) return '';
  if (n.type === 'text') return n.value ?? '';
  return (n.children ?? []).map(hastText).join('');
}

export default function StudyPanel({ mode, onBack, focus, backLabel }: { mode: 'aws' | 'saa'; onBack: () => void; focus?: StudyFocus; backLabel?: string }) {
  const contentRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const first = contentRef.current?.querySelector('[data-focus="true"]');
    first?.scrollIntoView({ block: 'start' });
  }, []);
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
            aria-label={backLabel ?? 'Return to quiz'}
          >
            {backLabel ?? '← Back to quiz'}
          </button>
        </div>
      </QuizHeader>
      <article className={styles.studyContent} ref={contentRef}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={focus ? {
            h3: ({ children }) => {
              const title = textOf(children);
              const hit = focus.sections.includes(title);
              return <h3 id={sectionSlug(title)} data-focus={hit ? 'true' : undefined} className={hit ? styles.studyFocusHeading : undefined}>{children}</h3>;
            },
            li: ({ node, children, ...rest }) => {
              const kids = (node as HastNode | undefined)?.children ?? [];
              const para = kids.find(k => k.type === 'element' && k.tagName === 'p');
              const strong = para?.children?.find(k => k.type === 'element' && k.tagName === 'strong');
              const hit = !!strong && focus.terms.includes(hastText(strong).trim());
              return <li {...(rest as object)} className={hit ? styles.studyFocusTerm : undefined}>{children}</li>;
            },
          } : {
            h3: ({ children }) => <h3 id={sectionSlug(textOf(children))}>{children}</h3>,
          }}
        >{formatTermDefinitions(markdown)}</ReactMarkdown>
      </article>
    </div>
  );
}
