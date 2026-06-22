import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginRouter from '@tanstack/eslint-plugin-router'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintPluginTailwindCSS from 'eslint-plugin-tailwindcss'
import eslintConfigPrettier from 'eslint-config-prettier'

export default defineConfig([
  globalIgnores(['dist', 'src/routeTree.gen.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      pluginRouter.configs['flat/recommended'],
      eslintPluginTailwindCSS.configs['flat/recommended'],
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      jsxA11y.flatConfigs.recommended,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
      eslintConfigPrettier,
    ],

    plugins: {
      'simple-import-sort': simpleImportSort,
    },

    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    settings: {
      react: { version: '19.2' },
      tailwindcss: {
        config: false,
      },
    },

    rules: {
      // react-hooks rules increased from "warning"
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/incompatible-library': 'error',
      'react-hooks/unsupported-syntax': 'error',

      // Curated picks from eslint-plugin-react beyond flat/recommended.
      'react/no-array-index-key': 'error',
      'react/self-closing-comp': 'error',

      // Import/export ordering — autofixable.
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // eslint-plugin-tailwindcss@3.x is incompatible with ESLint 10
      'tailwindcss/classnames-order': 'off',

      'tailwindcss/no-custom-classname': 'off',

      // Force all local imports through the @/ alias (no ./ or ../).
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^\\.',
              message:
                "Use the '@/' alias instead of relative imports for ease of refactoring.",
            },
          ],
        },
      ],

      // Prefer named exports — easier to refactor, grep, and tree-shake.
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportDefaultDeclaration',
          message:
            'Prefer named exports over default exports. Override this rule per-file only when the framework requires a default export (e.g. config files).',
        },
      ],
    },
  },
  {
    // Build/config files where the tool demands a default export.
    files: ['**/*.config.{ts,js,mjs,cjs}'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },
  {
    // TanStack Router file-based routes export a `Route` constant alongside
    // a local component function — that mixed-export shape conflicts with
    // react-refresh/only-export-components, but it's the framework's required
    // pattern. The router's HMR integration handles refresh for these files.
    files: ['src/routes/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
])
