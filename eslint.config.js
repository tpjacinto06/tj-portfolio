import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  { files: ['src/**/*.{js,jsx}'], ...react.configs.flat.recommended },
  { files: ['src/**/*.{js,jsx}'], ...react.configs.flat['jsx-runtime'] },
  { files: ['src/**/*.{js,jsx}'], ...reactHooks.configs.flat.recommended },
  { files: ['src/**/*.{js,jsx}'], ...jsxA11y.flatConfigs.recommended },
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: { globals: globals.browser },
    settings: { react: { version: 'detect' } },
    rules: { 'react/prop-types': 'off' },
  },
  {
    files: ['scripts/**/*.cjs'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
  },
  { files: ['*.config.js'], languageOptions: { globals: globals.node } },
  prettier,
];
