import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  // Next.js recommended rules (Core Web Vitals + TypeScript)
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Project-specific rule overrides
  {
    rules: {
      // TypeScript strictness
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      // JavaScript strictness
      'no-var': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
    },
  },

  // Ignore build output, deps, and auto-generated files
  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**', 'out/**', 'next-env.d.ts'],
  },
]

export default eslintConfig
