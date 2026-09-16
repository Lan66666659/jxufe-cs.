import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  { ignores: ['dist', 'legacy', 'node_modules', 'artifacts'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  { files: ['scripts/**/*.mjs', '*.config.js'], languageOptions: { globals: globals.node } },
  {
    files: ['src/components/animate-ui/**/*.{ts,tsx}', 'src/hooks/use-*.tsx'],
    // Keep the upstream distribution's component/hook exports together.
    rules: { 'react-refresh/only-export-components': 'off' },
  },
);
