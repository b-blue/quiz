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
          - `src/data/terms.json` — generated JSON containing term/definition pairs used by the quiz.
          - `scripts/extract-terms.js` — small extractor that parses your Markdown notes and writes `terms.json`.

          Notes extractor behavior
          - The extractor looks for a file named `AWS Notes Summaries.md` (or similar). The file may live in the project root or under `src/data/` — the extractor now searches common locations and will scan `src/data` recursively to find the notes file.
          - The extractor expects term lines in the form `Term // Definition` under headings that end with the word "Summary" (case-insensitive). The heading becomes the `section` for each term.

          How to generate `terms.json`
          1. Place your Markdown notes file somewhere in the repo (recommended locations: project root, or `src/data/` subfolders). Name it `AWS Notes Summaries.md` or similar.
          2. From the project root run:

          ```bash
          npm run extract-terms
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
          - If you move the notes file, the extractor will attempt to find it automatically under `src/data`. If you prefer to keep your notes outside the repo, update `scripts/extract-terms.js` to point to your preferred path or run it from a wrapper script that sets an environment variable.
          - The `extract-terms` script overwrites `src/data/terms.json` every time it runs.

          Questions or issues? Open an issue or edit this README to add details about your note formats.
