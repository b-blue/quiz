# Biology 2 Processed Data Structure

## Overview
This file documents the structure of `biology2-processed.json`, which was generated from `Biology 2.md` following specific processing rules.

## Source Processing Rules

### Items Excluded (8 total)
The following items from Biology 2.md were **excluded** because they contain grandchildren (3+ levels of nesting):
- Item 34: Describe the four stages of DNA replication
- Item 36: State the "Central Dogma"
- Item 40: Explain how mRNA is produced using DNA
- Item 44: Relate the structure of tRNA to its functions in the process of translation
- Item 46: Describe the structure and function of ribosomes
- Item 62: Define RNA interference
- Item 91: Define natural selection
- Item 101: Describe five prezygotic and two postzygotic isolating mechanisms

### Items Included: 93 questions

## Data Structure

```json
[
  {
    "question": "Question text (numbers stripped)",
    "answers": [
      {
        "original": "Original answer text from Biology 2.md",
        "variations": [
          "Variation 1",
          "Variation 2",
          "Variation 3",
          "Variation 4",
          "Variation 5",
          "Variation 6"
        ]
      }
    ]
  }
]
```

## Variation Generation Strategy

Each original answer has 6 generated variations using these strategies:

1. **Variation 1**: Synonym replacement (create→produce, make→form, etc.)
2. **Variation 2**: Passive/active voice transformation
3. **Variation 3**: Add clarifying phrase (", specifically")
4. **Variation 4**: Rephrase with "involving" or "characterized by"
5. **Variation 5**: Replace connectors (and→plus, or→alternatively, but→however)
6. **Variation 6**: Add context prefix ("In biological terms,", "This means", etc.)

## Statistics

- Total questions: 93
- Total original answers: 193 (some questions have multiple child answers)
- Total variations generated: 1,158 (6 per original answer)
- Excluded items: 8

## Key Features

1. **Numbers stripped**: All line numbers (1., 2., etc.) have been removed
2. **Parent-child preserved**: Questions maintain their relationship with their original answers
3. **Variations linked**: Each variation is explicitly linked to its original answer
4. **Separate structure**: Original answers and variations are kept in separate fields for easy access

## Usage

This data structure allows the application to:
- Display original Biology 2 questions
- Test students on original answers
- Test students on variation answers (similar but rephrased)
- Track which type of answer (original vs variation) was used
- Generate quiz questions from either original or variation pool
