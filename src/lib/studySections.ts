import sectionsRaw from '../data/practice-sections.json';

export interface StudyFocus {
  sections: string[]; // ### sub-heading titles in the SAA-C03 guide
  terms: string[]; // guide terms tied directly to the question
}

export interface StudySectionRef {
  domain: string;
  sub: string;
}

interface Entry { sections: StudySectionRef[]; terms: string[] }

const MAP = sectionsRaw as Record<string, Entry>;

export const SHOW_SECTION_KEY = 'practice:showSection';

export function showSectionEnabled(): boolean {
  try { return localStorage.getItem(SHOW_SECTION_KEY) !== '0'; } catch { return true; }
}

export function getPracticeSections(test: number, id: number): Entry | undefined {
  return MAP[`T${test}Q${id}`];
}

export function sectionSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
