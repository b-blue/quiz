import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const projectRoot = path.resolve(__dirname, '..');

  const candidates = [
    path.join(projectRoot, 'Biology.md'),
    path.join(projectRoot, 'src', 'data', 'Biology.md'),
    path.join(projectRoot, 'src', 'data', 'Rhys', 'Biology.md'),
    path.join(projectRoot, 'src', 'data', 'R', 'Biology.md'),
  ];

  async function findFirstExisting(list) {
    for (const p of list) {
      try {
        const stat = await fs.stat(p);
        if (stat.isFile()) return p;
      } catch (e) {
        // ignore
      }
    }

    // scan src/data recursively for a matching file name
    async function walk(dir) {
      let entries;
      try {
        entries = await fs.readdir(dir, { withFileTypes: true });
      } catch (e) {
        return null;
      }
      for (const ent of entries) {
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) {
          const found = await walk(p);
          if (found) return found;
        } else {
          if (/^biology\.md$/i.test(ent.name)) return p;
        }
      }
      return null;
    }

    const scanDir = path.join(projectRoot, 'src', 'data');
    const found = await walk(scanDir);
    if (found) return found;

    return null;
  }

  const mdPath = await findFirstExisting(candidates);
  if (!mdPath) {
    console.error('Could not find Biology.md. Searched common locations under project root.');
    process.exit(1);
  }

  const outDir = path.join(projectRoot, 'src', 'data');
  const outPath = path.join(outDir, 'biology-terms.json');

  const md = await fs.readFile(mdPath, 'utf8');
  const lines = md.split(/\r?\n/);

  const entries = [];
  let currentQ = null;
  let buffer = [];

  function pushCurrent() {
    if (!currentQ) return;
    // Preserve original line breaks and indentation for the answer.
    // Produce `answerLines` as an array of objects so the UI can render
    // each line and its indentation level separately.
    const answerLines = buffer.map((l) => {
      const match = l.match(/^(\s*)([\-\*\+]?\s*)(.*)$/);
      const leading = match ? match[1] : '';
      const marker = match ? match[2] : '';
      const text = match ? match[3] : l;
      return {
        raw: l,
        indent: leading,
        indentLength: leading.length,
        marker: marker.trim() || null,
        text: text,
      };
    });

    entries.push({ question: currentQ.trim(), answerLines });
  }

  for (const line of lines) {
    // detect top-level question: non-empty and starts with non-whitespace
    if (/^\S/.test(line)) {
      // new top-level
      if (currentQ !== null) {
        pushCurrent();
      }
      currentQ = line.trim();
      buffer = [];
      continue;
    }

    // line is empty or indented -> part of answer/notes
    if (currentQ === null) {
      // skip any leading indented lines before the first question
      continue;
    }
    buffer.push(line);
  }

  // push last
  pushCurrent();

  // ensure output dir
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(outPath, JSON.stringify(entries, null, 2), 'utf8');
  console.log(`Wrote ${entries.length} question(s) to ${outPath} (source: ${mdPath})`);
}

main().catch((err) => {
  console.error('Biology extractor failed:', err);
  process.exit(1);
});
