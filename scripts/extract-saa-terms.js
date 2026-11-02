import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { MAX_QUIZ_DEFINITION_LENGTH } from './apply-definition-chunks.js';

async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const projectRoot = path.resolve(__dirname, '..');
  const sourcePath = path.join(projectRoot, 'src', 'data', 'B', 'SAA-C03.md');
  const outputPath = path.join(projectRoot, 'src', 'data', 'saa-terms.json');
  const cluesPath = path.join(projectRoot, 'src', 'data', 'saa-clues.json');
  const markdown = await fs.readFile(sourcePath, 'utf8');

  const results = [];
  let currentSection = null;
  const headingRegex = /^(#{1,6})\s+(.+?)\s*#*\s*$/;
  const pairRegex = /^(.+?)\s*\/\/\s*(.+)$/;

  for (const line of markdown.split(/\r?\n/)) {
    const heading = line.match(headingRegex);
    if (heading) {
      const level = heading[1].length;
      currentSection = level === 2 ? heading[2].trim() : level < 2 ? null : currentSection;
      continue;
    }

    const cleaned = line.replace(/^\s*[-*+]\s*/, '').trim();
    const pair = cleaned.match(pairRegex);
    if (!pair || !currentSection) continue;

    results.push({
      term: pair[1].trim(),
      definition: pair[2].trim(),
      section: currentSection,
    });
  }

  // Quiz clues are curated per term; the study-guide definition is only used when it is short enough.
  const clues = JSON.parse(await fs.readFile(cluesPath, 'utf8'));
  const expandedResults = [];
  const usedTerms = new Set();
  for (const entry of results) {
    const termClues = clues[entry.term];
    if (termClues) {
      usedTerms.add(entry.term);
      for (const definition of termClues) {
        if (definition.length > MAX_QUIZ_DEFINITION_LENGTH) throw new Error(`Clue for "${entry.term}" exceeds ${MAX_QUIZ_DEFINITION_LENGTH} characters`);
        expandedResults.push({ ...entry, definition });
      }
    } else if (entry.definition.length <= MAX_QUIZ_DEFINITION_LENGTH) {
      expandedResults.push(entry);
    } else {
      throw new Error(`"${entry.term}" needs curated clues in saa-clues.json`);
    }
  }
  for (const term of Object.keys(clues)) {
    if (!usedTerms.has(term)) throw new Error(`Clue entry "${term}" does not match any term in SAA-C03.md`);
  }

  await fs.writeFile(outputPath, JSON.stringify(expandedResults, null, 2), 'utf8');
  console.log(`Wrote ${expandedResults.length} term definition chunk(s) to ${outputPath}`);
}

main().catch((error) => {
  console.error('SAA term extractor failed:', error);
  process.exit(1);
});
