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
          project: ['./tsconfig.node.json', './tsconfig.app.json'],
          tsconfigRootDir: import.meta.dirname,
        },
        // other options...
      },
    },
  ])
  ```

  You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

  ```js
  // eslint.config.js
  import reactX from 'eslint-plugin-react-x'
  import reactDom from 'eslint-plugin-react-dom'

  export default defineConfig([
    globalIgnores(['dist']),
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        // Other configs...
        // Enable lint rules for React
        reactX.configs['recommended-typescript'],
        // Enable lint rules for React DOM
        reactDom.configs.recommended,
      ],
      languageOptions: {
        parserOptions: {
          project: ['./tsconfig.node.json', './tsconfig.app.json'],
          tsconfigRootDir: import.meta.dirname,
        },
        // other options...
      },
    },
  ])
  ```

  ## Generating terms.json from your notes

  This project includes a small extractor that parses the Markdown file `AWS Notes Summaries.md` (project root) and writes a JSON file containing term/definition pairs used by the quiz UI.

  Where the output is written
  - `src/data/terms.json` — the extractor will overwrite this file each time it runs.

  How to run the extractor

  1. Make sure you are in the project directory:

  ```bash
  cd ~/Dev/aws-quiz
  ```

  2. Run the extractor npm script:

  ```bash
  npm run extract-terms
  ```

  3. After the script finishes you should see a message like:

  ```
  Wrote N term(s) to /path/to/aws-quiz/src/data/terms.json
  ```

  Notes and troubleshooting
  - The extractor expects `AWS Notes Summaries.md` to be present in the project root and to contain lines of the form `Term // Definition` under headings that end with the word "Summary".
  - The extractor will preserve the `section` (heading) where each pair was found. This is used to prefer same-section distractors in the quiz.
  - If the JSON file is not updating, confirm the script exists at `scripts/extract-terms.js` and that Node (>=16) is available on your system.
  - To immediately see changes in the app after extraction, refresh the browser or rely on Vite HMR if the dev server is running.

  ## Publishing to GitHub Pages (serve from main /docs)

  If you want to continue pushing the whole repository to GitHub and use GitHub Pages configured to serve from the `main` branch `/docs` folder, this project is configured to build into `docs/` and to use relative asset paths. Follow these steps:

  1. Build the site into `docs/`:

  ```bash
  cd ~/Dev/aws-quiz
  npm run build
  ```

  2. Commit and push the generated `docs/` folder along with the rest of the repo:

  ```bash
  git add docs package.json vite.config.ts
  git commit -m "Build site into docs/ for GitHub Pages"
  git push origin main
  ```

  3. Enable Pages in the GitHub repo settings:
     - Go to Settings → Pages
     - Under "Source", choose the `main` branch and the `/docs` folder
     - Save and wait a minute for the site to publish at `https://<your-user>.github.io/<repo>/`

  Notes and tips
  - The project is set with `base: './'` in `vite.config.ts` so assets are referenced relatively and the site works when served from `/docs`.
  - The build step copies `docs/index.html` to `docs/404.html` so direct navigation to client-side routes won't 404.
  - If you prefer not to keep generated files in the repo, use a CI workflow (GitHub Actions) or the `gh-pages` branch to publish instead.

  Troubleshooting
  - If the deployed site is blank and DevTools shows requests for `/src/main.tsx` or other root paths returning HTML, the `base` is likely wrong (assets are absolute). Rebuild with `base: './'` or `base: '/<repo>/'` and redeploy.
  - Check the Network tab in DevTools to see the exact failing asset URLs — that usually reveals whether the site is missing the repo prefix.

  ````
