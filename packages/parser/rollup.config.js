import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  {
    input: './src/index.ts',
    output: [
      {
        format: 'cjs',
        sourcemap: true,
        name: 'leaf',
        file: './dist/parser.min.js',
        esModule: true,
        plugins: [terser()],
      },
      {
        format: 'cjs',
        sourcemap: true,
        name: 'leaf',
        file: './dist/parser.js',
        esModule: true,
      },
    ],
    plugins: [typescript({ outputToFilesystem: false }), commonjs(), json(), dynamicImportVars()],
    external: [
      '@babel/core',
      'glob',
      'path',
      'rollup',
      'fs',
      '@rollup/plugin-node-resolve',
      '@rollup/plugin-commonjs',
      'rollup-plugin-terser',
      'commander',
    ],
  },
  {
    input: './dist/src/index.d.ts',
    output: {
      file: './dist/parser.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];
