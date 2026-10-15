# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  ````markdown
  # React + TypeScript + Vite

  This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

  Currently, two official plugins are available:


  ## React Compiler

  The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

  ## Expanding the ESLint configuration

  If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

  ```js
  export default defineConfig([
    globalIgnores(['dist']),
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        // Other configs...

        // Remove tseslint.configs.recommended and replace with this
        tseslint.configs.recommendedTypeChecked,
        // Alternatively, use this for stricter rules
        tseslint.configs.strictTypeChecked,
        // Optionally, add this for stylistic rules
        tseslint.configs.stylisticTypeChecked,

        // Other configs...
      ],
      languageOptions: {
        parserOptions: {
          # Quiz — AWS Notes

          This project is a small quiz app that generates flashcard-style multiple-choice questions from a Markdown notes file and provides a lightweight UI for practicing terms.

          Key files
          - `src/data/terms.json` — generated CLF-C02 JSON containing term/definition pairs used by the quiz.
          - `src/data/saa-terms.json` — generated SAA-C03 JSON containing term/definition pairs used by the quiz.
          - `src/data/clf-definition-chunks.json` and `src/data/saa-definition-chunks.json` — curated standalone quiz definitions for source definitions longer than 81 characters; the study panels continue to show the full Markdown.
          - `scripts/extract-terms.js` and `scripts/extract-saa-terms.js` — extract quiz terms from the corresponding study Markdown files.

          Notes extractor behavior
          - The CLF-C02 extractor looks for `CLF-C02.md`; the SAA-C03 extractor reads `src/data/B/SAA-C03.md`.
          - The CLF extractor expects term lines in the form `Term // Definition` under headings ending with "Summary". The SAA extractor parses `Term // Definition` entries under second-level section headings.
          - Quiz prompts are at most 81 characters. Long source definitions are represented by multiple concise quiz chunks. Terms are selected uniformly before choosing a chunk so longer definitions do not increase a term's question frequency.

          How to generate `terms.json`
          1. Keep `CLF-C02.md` and `SAA-C03.md` in `src/data/B/`.
          2. From the project root run:

          ```bash
          npm run extract-terms
          npm run extract-saa-terms
          ```

          You should see output like:

          ```
          Wrote N term(s) to /path/to/quiz/src/data/terms.json
          ```

          If the extractor cannot find the notes file it will print a helpful error listing the locations it searched.

          Running the app
          1. Install dependencies:

          ```bash
          npm install
          ```

          2. Start the dev server:

          ```bash
          npm run dev
          ```

          3. Open `http://localhost:5173` in your browser.

          Further notes
          - The extractors overwrite their corresponding JSON files whenever they run.

          Questions or issues? Open an issue or edit this README to add details about your note formats.
