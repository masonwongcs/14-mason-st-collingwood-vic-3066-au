module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'no-empty': 'off',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

    'no-use-before-define': ['error', { functions: false }],
    'no-extra-semi': 'warn',
    'no-return-assign': ['error', 'except-parens'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-nested-ternary': 'warn',
    'no-console': 'warn',
    'consistent-return': 'warn',
    'max-classes-per-file': ['error', 1],
    'prefer-const': 'warn',
    'no-duplicate-imports': 'warn',

    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn'
  }
};
