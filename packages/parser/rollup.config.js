import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

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
        banner: '#!/usr/bin/env node',
      },
      {
        format: 'cjs',
        sourcemap: true,
        name: 'leaf',
        file: './dist/parser.js',
        esModule: true,
        banner: '#!/usr/bin/env node',
      },
    ],
    plugins: [typescript({ outputToFilesystem: false }), commonjs(), json()],
    external: [
      '@babel/core',
      'glob',
      'path',
      'rollup',
      'fs',
      '@rollup/plugin-node-resolve',
      '@rollup/plugin-commonjs',
      'rollup-plugin-terser',
      '@rollup/plugin-inject',
      '@rollup/plugin-babel',
      'commander',
      'chalk',
      'nollup',
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
  {
    input: './src/injected.ts',
    output: {
      file: './dist/injected.min.js',
      format: 'iife',
    },
    plugins: [typescript({ outputToFilesystem: false }), terser()],
  },
];
