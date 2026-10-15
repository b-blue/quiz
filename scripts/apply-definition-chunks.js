export const MAX_QUIZ_DEFINITION_LENGTH = 81;

export function applyDefinitionChunks(entries, overrides, examName) {
  const usedIndexes = new Set();
  const expanded = [];

  for (const [index, entry] of entries.entries()) {
    const chunks = overrides[String(index)];
    if (entry.definition.length <= MAX_QUIZ_DEFINITION_LENGTH) {
      if (chunks) {
        throw new Error(`${examName} chunk override ${index} targets a definition within the length limit`);
      }
      expanded.push(entry);
      continue;
    }

    if (!Array.isArray(chunks) || chunks.length === 0) {
      throw new Error(`${examName} definition ${index} (${entry.term}) needs curated chunks`);
    }

    usedIndexes.add(String(index));
    for (const definition of chunks) {
      if (typeof definition !== 'string' || !definition.trim()) {
        throw new Error(`${examName} definition ${index} has an empty or invalid chunk`);
      }
      if (definition.length > MAX_QUIZ_DEFINITION_LENGTH) {
        throw new Error(`${examName} definition ${index} chunk exceeds ${MAX_QUIZ_DEFINITION_LENGTH} characters (${definition.length})`);
      }
      expanded.push({ ...entry, definition });
    }
  }

  for (const index of Object.keys(overrides)) {
    if (!usedIndexes.has(index)) {
      throw new Error(`${examName} chunk override ${index} is stale or does not reference a long definition`);
    }
  }

  return expanded;
}
