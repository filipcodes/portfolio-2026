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

import { noHardcodedLinksPlugin } from './eslint-rules/no-hardcoded-links.ts'
import { noPlaceholderLinksPlugin } from './eslint-rules/no-placeholder-links.ts'

const restrictedImportPaths = [
  {
    name: '@tanstack/react-router',
    importNames: ['Link'],
    message:
      "Import { Link } from '@/shared/components/Link' — the wrapper preserves type-safe routing while owning styling.",
  },
]

const restrictedImportPatterns = [
  {
    regex: '^\\.',
    message:
      "Use the '@/' alias instead of relative imports for ease of refactoring.",
  },
]

const colocatedRoutePrivateFolders = [
  { folder: '@/routes/-home/', allowedImporter: 'src/routes/index.tsx' },
  { folder: '@/routes/-not-found/', allowedImporter: 'src/routes/__root.tsx' },
]

export default defineConfig([
  globalIgnores([
    'dist',
    'src/routeTree.gen.ts',
    'eslint.config.ts',
    'eslint-rules/**',
  ]),
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
      'no-hardcoded-links': noHardcodedLinksPlugin,
      'no-placeholder-links': noPlaceholderLinksPlugin,
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

      'no-hardcoded-links/no-hardcoded-links': 'error',

      'no-placeholder-links/no-placeholder-links': 'error',

      // TanStack Router signals notFound()/redirect() by throwing plain objects.
      '@typescript-eslint/only-throw-error': [
        'error',
        {
          allow: [
            {
              from: 'package',
              package: '@tanstack/router-core',
              name: 'NotFoundError',
            },
            {
              from: 'package',
              package: '@tanstack/router-core',
              name: 'Redirect',
            },
          ],
        },
      ],

      // eslint-plugin-tailwindcss@3.x is incompatible with ESLint 10
      'tailwindcss/classnames-order': 'off',

      'tailwindcss/no-custom-classname': 'off',

      // Force all local imports through the @/ alias (no ./ or ../).
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: restrictedImportPaths,
          patterns: restrictedImportPatterns,
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
    files: ['src/routes/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },

  // Enforce co-location: each routes/-<name>/ folder is importable only by it's owning page
  ...colocatedRoutePrivateFolders.flatMap(({ folder, allowedImporter }) => {
    const folderGlob = folder.replace(/^@\//, 'src/') + '**'
    return defineConfig({
      files: ['**/*.{ts,tsx}'],
      ignores: [allowedImporter, folderGlob],
      rules: {
        '@typescript-eslint/no-restricted-imports': [
          'error',
          {
            paths: restrictedImportPaths,
            patterns: [
              ...restrictedImportPatterns,
              {
                regex: `^${folder}`,
                message: `Components in '${folder}' are colocated to a single page. Promote to '@/shared/components/' if reuse is needed elsewhere.`,
              },
            ],
          },
        ],
      },
    })
  }),
])
