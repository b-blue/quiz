#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const EXCLUDED_ITEMS = [34, 36, 40, 44, 46, 62, 91, 101];

// Read Biology 2.md
const bioPath = path.join(__dirname, '..', 'src', 'data', 'Rhys', 'Biology 2.md');
const content = fs.readFileSync(bioPath, 'utf-8');

// Parse the markdown structure
function parseMarkdown(text) {
  const lines = text.split('\n');
  const items = [];
  let currentParent = null;
  let currentChildren = [];
  
  for (let line of lines) {
    // Skip empty lines
    if (!line.trim()) continue;
    
    // Match parent lines: "1. Question text" (no leading spaces)
    const parentMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (parentMatch && !line.startsWith(' ')) {
      // Save previous parent if exists
      if (currentParent) {
        items.push({ parent: currentParent, children: currentChildren });
      }
      
      currentParent = {
        number: parseInt(parentMatch[1]),
        text: parentMatch[2].trim()
      };
      currentChildren = [];
      continue;
    }
    
    // Match child lines: "   1. Answer text" or "    1. Answer text" (3-4 spaces)
    const childMatch = line.match(/^\s{3,4}(\d+)\.\s+(.+)$/);
    if (childMatch && currentParent) {
      // Don't add if it looks like a grandchild (would have been under a child with colon or more indentation)
      const prevLine = currentChildren.length > 0 ? currentChildren[currentChildren.length - 1].text : '';
      const isGrandchild = line.match(/^\s{7,}/); // 7+ spaces = grandchild
      
      if (!isGrandchild) {
        currentChildren.push({
          number: parseInt(childMatch[1]),
          text: childMatch[2].trim()
        });
      }
    }
  }
  
  // Save last parent
  if (currentParent) {
    items.push({ parent: currentParent, children: currentChildren });
  }
  
  return items;
}

// Generate plausible but incorrect single-word subject replacements
function generateVariations(parentText, childText) {
  const variations = [];
  
  // Define plausible incorrect alternatives for common biological subjects
  const subjectAlternatives = {
    // Genetic materials and structures
    'fossils': ['bones', 'artifacts', 'sediments', 'minerals', 'rocks', 'shells'],
    'DNA': ['RNA', 'protein', 'lipids', 'enzymes', 'chromosomes', 'nucleotides'],
    'RNA': ['DNA', 'protein', 'enzymes', 'lipids', 'nucleotides', 'ribosomes'],
    'mRNA': ['tRNA', 'rRNA', 'DNA', 'protein', 'snRNA', 'miRNA'],
    'tRNA': ['mRNA', 'rRNA', 'DNA', 'ribosomes', 'enzymes', 'snRNA'],
    'rRNA': ['mRNA', 'tRNA', 'DNA', 'protein', 'snRNA', 'ribosomes'],
    'chromosome': ['chromatid', 'gene', 'allele', 'nucleosome', 'chromatin', 'plasmid'],
    'chromosomes': ['chromatids', 'genes', 'alleles', 'nucleosomes', 'chromatin', 'plasmids'],
    'gene': ['allele', 'chromosome', 'locus', 'operon', 'promoter', 'enhancer'],
    'genes': ['alleles', 'chromosomes', 'loci', 'operons', 'promoters', 'enhancers'],
    'allele': ['gene', 'chromosome', 'locus', 'trait', 'mutation', 'variant'],
    'alleles': ['genes', 'chromosomes', 'loci', 'traits', 'mutations', 'variants'],
    
    // Cells and organelles
    'cell': ['nucleus', 'organelle', 'tissue', 'membrane', 'cytoplasm', 'chromosome'],
    'cells': ['nuclei', 'organelles', 'tissues', 'membranes', 'cytoplasm', 'chromosomes'],
    'nucleus': ['cytoplasm', 'mitochondria', 'ribosome', 'vacuole', 'chloroplast', 'membrane'],
    'cytoplasm': ['nucleus', 'mitochondria', 'membrane', 'vacuole', 'cytosol', 'organelles'],
    'ribosome': ['lysosome', 'mitochondria', 'nucleus', 'vacuole', 'peroxisome', 'endosome'],
    'ribosomes': ['lysosomes', 'mitochondria', 'nuclei', 'vacuoles', 'peroxisomes', 'endosomes'],
    'mitochondria': ['chloroplasts', 'ribosomes', 'lysosomes', 'vacuoles', 'peroxisomes', 'nucleus'],
    
    // Genetic concepts
    'genotype': ['phenotype', 'karyotype', 'haplotype', 'genome', 'trait', 'allele'],
    'phenotype': ['genotype', 'trait', 'characteristic', 'genome', 'karyotype', 'expression'],
    'trait': ['gene', 'allele', 'phenotype', 'characteristic', 'mutation', 'variant'],
    'traits': ['genes', 'alleles', 'phenotypes', 'characteristics', 'mutations', 'variants'],
    'mutation': ['variation', 'polymorphism', 'allele', 'deletion', 'insertion', 'substitution'],
    'mutations': ['variations', 'polymorphisms', 'alleles', 'deletions', 'insertions', 'substitutions'],
    
    // Processes
    'transcription': ['translation', 'replication', 'splicing', 'mutation', 'expression', 'elongation'],
    'translation': ['transcription', 'replication', 'translocation', 'elongation', 'initiation', 'termination'],
    'replication': ['transcription', 'translation', 'repair', 'recombination', 'mutation', 'duplication'],
    'meiosis': ['mitosis', 'cytokinesis', 'fertilization', 'replication', 'recombination', 'segregation'],
    'mitosis': ['meiosis', 'cytokinesis', 'replication', 'division', 'fission', 'budding'],
    
    // Organisms and taxonomy
    'organism': ['species', 'population', 'individual', 'cell', 'tissue', 'colony'],
    'organisms': ['species', 'populations', 'individuals', 'cells', 'tissues', 'colonies'],
    'species': ['genus', 'population', 'organism', 'subspecies', 'variety', 'strain'],
    'population': ['species', 'community', 'organism', 'colony', 'group', 'ecosystem'],
    'populations': ['species', 'communities', 'organisms', 'colonies', 'groups', 'ecosystems'],
    
    // Molecular biology
    'protein': ['enzyme', 'polypeptide', 'amino acid', 'peptide', 'nucleotide', 'lipid'],
    'proteins': ['enzymes', 'polypeptides', 'amino acids', 'peptides', 'nucleotides', 'lipids'],
    'enzyme': ['protein', 'coenzyme', 'substrate', 'catalyst', 'hormone', 'antibody'],
    'enzymes': ['proteins', 'coenzymes', 'substrates', 'catalysts', 'hormones', 'antibodies'],
    'amino acid': ['nucleotide', 'peptide', 'protein', 'codon', 'fatty acid', 'sugar'],
    
    // Other key terms
    'gamete': ['zygote', 'spore', 'egg', 'sperm', 'embryo', 'cell'],
    'gametes': ['zygotes', 'spores', 'eggs', 'sperm', 'embryos', 'cells'],
    'zygote': ['gamete', 'embryo', 'blastocyst', 'cell', 'spore', 'fetus'],
    'offspring': ['parent', 'progeny', 'descendant', 'generation', 'embryo', 'individual'],
    'parent': ['offspring', 'ancestor', 'individual', 'generation', 'organism', 'progenitor'],
    'parents': ['offspring', 'ancestors', 'individuals', 'generations', 'organisms', 'progenitors'],
  };
  
  // Try to find the main subject noun in the sentence
  function findSubjectAndAlternatives(text) {
    // Look for subject nouns (handling both singular and plural)
    for (const [subject, alternatives] of Object.entries(subjectAlternatives)) {
      const regex = new RegExp(`\\b${subject}\\b`, 'gi');
      if (regex.test(text)) {
        return { subject, alternatives, regex };
      }
    }
    return null;
  }
  
  const match = findSubjectAndAlternatives(childText);
  
  if (match && match.alternatives.length >= 6) {
    // Replace the subject with each alternative
    for (let i = 0; i < 6; i++) {
      const alternative = match.alternatives[i];
      variations.push(alternative);
    }
  } else {
    // Fallback: generate generic plausible but wrong single-word alternatives
    const genericAlternatives = [
      'structures',
      'molecules',
      'components',
      'elements',
      'factors',
      'materials'
    ];
    
    for (let i = 0; i < 6; i++) {
      variations.push(genericAlternatives[i % genericAlternatives.length]);
    }
  }
  
  return variations;
}

// Process items
function processItems(items) {
  const result = [];
  
  for (const item of items) {
    // Skip excluded items
    if (EXCLUDED_ITEMS.includes(item.parent.number)) {
      console.log(`Skipping item ${item.parent.number} (has grandchildren)`);
      continue;
    }
    
    // Strip numbers from parent text
    const parentText = item.parent.text;
    
    // Process each child - just keep the original text
    const processedChildren = item.children.map(child => child.text);
    
    result.push({
      question: parentText,
      answers: processedChildren
    });
  }
  
  return result;
}

// Main execution
const parsed = parseMarkdown(content);
console.log(`Parsed ${parsed.length} parent items`);

const processed = processItems(parsed);
console.log(`Processed ${processed.length} items (excluded ${EXCLUDED_ITEMS.length} with grandchildren)`);

// Write output
const outputPath = path.join(__dirname, '..', 'src', 'data', 'biology2-processed.json');
fs.writeFileSync(outputPath, JSON.stringify(processed, null, 2));
console.log(`\nWrote processed data to: ${outputPath}`);
console.log(`Total questions: ${processed.length}`);
console.log(`Total answers: ${processed.reduce((sum, item) => sum + item.answers.length, 0)}`);
