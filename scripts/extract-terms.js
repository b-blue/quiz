import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

async function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Project root is one level above scripts directory
  const projectRoot = path.resolve(__dirname, '..');

  // The notes file may have been moved. Try to find it in a few locations
  const candidates = [
    path.join(projectRoot, 'AWS Notes Summaries.md'),
    path.join(projectRoot, 'AWS Notes Summarized.md'),
    path.join(projectRoot, 'src', 'data', 'AWS Notes Summaries.md'),
    path.join(projectRoot, 'src', 'data', 'B', 'AWS Notes Summaries.md'),
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

    // fallback: scan src/data recursively for a file matching name
    async function walk(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const ent of entries) {
        const p = path.join(dir, ent.name);
        if (ent.isDirectory()) {
          const found = await walk(p);
          if (found) return found;
        } else {
          if (/^AWS Notes Summaries\.md$/i.test(ent.name) || /^AWS Notes Summariz/.test(ent.name)) return p;
        }
      }
      return null;
    }

    const scanDir = path.join(projectRoot, 'src', 'data');
    try {
      const found = await walk(scanDir);
      if (found) return found;
    } catch (e) {
      // ignore
    }

    return null;
  }

  const mdPath = await findFirstExisting(candidates);
  if (!mdPath) {
    console.error('Could not find AWS Notes file. Searched common locations under project root.');
    process.exit(1);
  }
  const outDir = path.join(projectRoot, 'src', 'data');
  const outPath = path.join(outDir, 'terms.json');

  const md = await fs.readFile(mdPath, 'utf8');
  const lines = md.split(/\r?\n/);

  const headingRegex = /^#{1,6}\s*(.+)$/;
  const summaryEndingRegex = /summary\s*$/i; // heading ends with 'Summary' (case-insensitive)
  const pairRegex = /(.+?)\s*\/\/\s*(.+)$/; // Term // Definition at end of line

  let results = [];
  let currentHeading = null;
  let inSummary = false;

  for (const line of lines) {
    const hMatch = line.match(headingRegex);
    if (hMatch) {
      currentHeading = hMatch[1].trim();
      inSummary = summaryEndingRegex.test(currentHeading);
      continue;
    }

    if (!inSummary) continue;

    // Trim list markers and whitespace
    const cleaned = line.replace(/^\s*[-*+]\s*/, '').trim();
    if (!cleaned) continue;

    const match = cleaned.match(pairRegex);
    if (match) {
      const term = match[1].trim();
      const definition = match[2].trim();
      results.push({ term, definition, section: currentHeading });
    }
  }

  // Ensure output directory exists
  await fs.mkdir(outDir, { recursive: true });

  // Write JSON (overwrite)
  await fs.writeFile(outPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Wrote ${results.length} term(s) to ${outPath}`);
}

main().catch(err => {
  console.error('Extractor failed:', err);
  process.exit(1);
});
