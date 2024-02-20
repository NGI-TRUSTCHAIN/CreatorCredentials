const path = require('path');

module.exports = {
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    node: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    tailwindcss: {
      callees: ['classnames', 'clsx', 'clsxm'],
      config: path.join(__dirname, 'tailwind.config.ts'),
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: './',
      },
    },
  },
  plugins: ['import', 'no-only-tests'],
  extends: [
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'next/core-web-vitals',
  ],
  rules: {
    'prettier/prettier': 'warn',
    'no-debugger': 'error',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    quotes: ['warn', 'single', { allowTemplateLiterals: true }],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { vars: 'all', args: 'all', argsIgnorePattern: '^_' },
    ],
    'import/newline-after-import': 'error',
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
      },
    ],
    'no-return-await': 'error',
    'require-await': 'error',
    'no-only-tests/no-only-tests': 'error',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react-i18next',
            message: 'Import from "next-i18next".',
          },
          {
            name: 'axiosNest',
            message: 'Import from "@/api/axiosNest".',
          },
          {
            name: 'axiosSSRNest',
            message: 'Import from "@/api/axiosSSRNest".',
          },
          {
            name: 'react-hot-toast',
            message: 'Use "@/shared/utils/useToast" instead.',
          },
          {
            name: 'clsx',
            message: 'Use "@/shared/utils/clsxm" instead.',
          },
          {
            name: 'tailwind-merge',
            message: 'Use "@/shared/utils/clsxm" instead.',
          },
        ],
      },
    ],
    'import/no-cycle': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
    },
  ],
};
