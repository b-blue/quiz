import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clfStudyMarkdown from '../data/B/CLF-C02.md?raw';
import saaStudyMarkdown from '../data/B/SAA-C03.md?raw';
import styles from './Quiz.module.css';
import QuizHeader from './QuizHeader';
import { sectionSlug } from '../lib/studySections';
import type { StudyFocus } from '../lib/studySections';
import { patchStudy } from '../lib/appState';
import type { StudyState } from '../lib/appState';

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (node && typeof node === 'object' && 'props' in node) return textOf((node as { props: { children?: ReactNode } }).props.children);
  return '';
}

interface HastNode { type: string; tagName?: string; value?: string; children?: HastNode[] }

function hastText(n?: HastNode): string {
  if (!n) return '';
  if (n.type === 'text') return n.value ?? '';
  return (n.children ?? []).map(hastText).join('');
}

function formatTermDefinitions(markdown: string): string {
  return markdown.split(/\r?\n/).map((line) => {
    const match = line.match(/^(\s*)([-*+]\s+)(.+?)\s*\/\/\s*(.+)$/);
    if (!match) return line;

    const [, indentation, marker, term, definition] = match;
    return `${indentation}${marker}**${term.trim()}**\n\n${indentation}  ${definition.trim()}`;
  }).join('\n');
}

// Keeps matching term entries and the headings above them; a query that matches a heading keeps its whole section.
function filterMarkdown(markdown: string, query: string): string {
  const q = query.trim().toLowerCase();
  if (!q) return markdown;
  const lines = markdown.split(/\r?\n/);
  const out: string[] = [];
  const entryStart = /^([-*+]|\d+\.)\s/;
  let domain: string | null = null;
  let domainEmitted = false;
  let domainHit = false;
  let section: { title: string | null; titleHit: boolean; body: string[] } | null = null;

  const flush = () => {
    if (section && section.body.length > 0) {
      if (domain && !domainEmitted) { out.push(domain, ''); domainEmitted = true; }
      if (section.title) out.push(section.title, '');
      out.push(...section.body);
    }
    section = null;
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      flush();
      domain = line; domainEmitted = false; domainHit = line.toLowerCase().includes(q);
      section = { title: null, titleHit: domainHit, body: [] };
      i++; continue;
    }
    if (line.startsWith('### ')) {
      flush();
      section = { title: line, titleHit: domainHit || line.toLowerCase().includes(q), body: [] };
      i++; continue;
    }
    if (section && entryStart.test(line)) {
      const entry = [line];
      i++;
      while (i < lines.length && !entryStart.test(lines[i]) && (/^\s+\S/.test(lines[i]) || lines[i].trim() === '')) { entry.push(lines[i]); i++; }
      if (section.titleHit || entry.join(' ').toLowerCase().includes(q)) section.body.push(...entry, '');
      continue;
    }
    i++;
  }
  flush();
  return out.join('\n');
}

function highlight(children: ReactNode, query: string): ReactNode {
  const q = query.trim();
  if (!q) return children;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
  const walk = (n: ReactNode): ReactNode => {
    if (typeof n === 'string') {
      return n.split(re).map((part, idx) => (idx % 2 === 1 ? <mark key={idx} className={styles.studyMark}>{part}</mark> : part));
    }
    if (Array.isArray(n)) return n.map((c, idx) => <span key={idx} style={{ display: 'contents' }}>{walk(c)}</span>);
    return n;
  };
  return walk(children);
}

export default function StudyPanel({ mode, onBack, focus, restore }: { mode: 'aws' | 'saa'; onBack: () => void; focus?: StudyFocus; restore?: StudyState }) {
  const isSaa = mode === 'saa';
  const title = isSaa ? 'SAA-C03 Study Guide' : 'CLF-C02 Study Guide';
  const markdown = isSaa ? saaStudyMarkdown : clfStudyMarkdown;
  const contentRef = useRef<HTMLElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [query, setQuery] = useState(restore?.query ?? '');

  const filtered = useMemo(() => filterMarkdown(markdown, query), [markdown, query]);
  const rendered = useMemo(() => formatTermDefinitions(filtered), [filtered]);
  const noMatches = query.trim() !== '' && filtered.trim() === '';

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (restore?.scroll) el.scrollTop = restore.scroll;
    else el.querySelector('[data-focus="true"]')?.scrollIntoView({ block: 'start' });
    // Runs once when the guide opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    let t: number | undefined;
    const onScroll = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => patchStudy({ scroll: el.scrollTop }), 200);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.clearTimeout(t); el.removeEventListener('scroll', onScroll); };
  }, []);

  function onQuery(v: string) {
    setQuery(v);
    patchStudy({ query: v, scroll: 0 });
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }

  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  }
  function onTouchEnd(e: React.TouchEvent) {
    const s = touch.current;
    touch.current = null;
    if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x;
    const dy = t.clientY - s.y;
    if (dx > 70 && dx > Math.abs(dy) * 1.5) onBack();
  }

  const focusComponents = focus ? {
    h3: ({ children }: { children?: ReactNode }) => {
      const t = textOf(children);
      const hit = focus.sections.includes(t);
      return <h3 id={sectionSlug(t)} data-focus={hit ? 'true' : undefined} className={hit ? styles.studyFocusHeading : undefined}>{children}</h3>;
    },
    li: ({ node, children }: { node?: unknown; children?: ReactNode }) => {
      const kids = (node as HastNode | undefined)?.children ?? [];
      const para = kids.find(k => k.type === 'element' && k.tagName === 'p');
      const strong = para?.children?.find(k => k.type === 'element' && k.tagName === 'strong');
      const hit = !!strong && focus.terms.includes(hastText(strong).trim());
      return <li className={hit ? styles.studyFocusTerm : undefined}>{children}</li>;
    },
  } : {
    h3: ({ children }: { children?: ReactNode }) => <h3 id={sectionSlug(textOf(children))}>{children}</h3>,
  };

  return (
    <div className={styles.quizContainer} data-variant={mode} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <QuizHeader variant={mode}>
        <div className={styles.studyHeaderContent}>
          <h1 className={styles.studyTitle}>{title}</h1>
          <input
            type="search"
            className={styles.studySearch}
            value={query}
            onChange={e => onQuery(e.target.value)}
            placeholder="Search terms and definitions"
            aria-label="Search the study guide"
          />
        </div>
      </QuizHeader>
      <article className={styles.studyContent} ref={contentRef}>
        {noMatches ? <p>No terms match “{query.trim()}”.</p> : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              ...focusComponents,
              p: ({ children }) => <p>{highlight(children, query)}</p>,
              strong: ({ children }) => <strong>{highlight(children, query)}</strong>,
            }}
          >
            {rendered}
          </ReactMarkdown>
        )}
      </article>
    </div>
  );
}
