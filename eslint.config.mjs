import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import jestDomPlugin from 'eslint-plugin-jest-dom';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...testingLibraryPlugin,
  ...jestDomPlugin,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
