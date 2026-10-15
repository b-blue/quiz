import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { applyDefinitionChunks } from './apply-definition-chunks.js';

async function main() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const projectRoot = path.resolve(__dirname, '..');
  const sourcePath = path.join(projectRoot, 'src', 'data', 'B', 'SAA-C03.md');
  const outputPath = path.join(projectRoot, 'src', 'data', 'saa-terms.json');
  const chunksPath = path.join(projectRoot, 'src', 'data', 'saa-definition-chunks.json');
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

  const chunkOverrides = JSON.parse(await fs.readFile(chunksPath, 'utf8'));
  const expandedResults = applyDefinitionChunks(results, chunkOverrides, 'SAA-C03');

  await fs.writeFile(outputPath, JSON.stringify(expandedResults, null, 2), 'utf8');
  console.log(`Wrote ${expandedResults.length} term definition chunk(s) to ${outputPath}`);
}

main().catch((error) => {
  console.error('SAA term extractor failed:', error);
  process.exit(1);
});
