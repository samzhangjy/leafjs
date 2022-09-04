import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import nodeResolve from '@rollup/plugin-node-resolve';
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
        file: './dist/create-leaf-app.min.js',
        esModule: true,
        plugins: [terser()],
        banner: '#!/usr/bin/env node',
      },
      {
        format: 'cjs',
        sourcemap: true,
        name: 'leaf',
        file: './dist/create-leaf-app.js',
        esModule: true,
        banner: '#!/usr/bin/env node',
      },
    ],
    plugins: [typescript({ outputToFilesystem: false }), commonjs(), nodeResolve(), json()],
    external: ['commander', 'fs-extra', 'path', 'ora'],
  },
  {
    input: './dist/src/index.d.ts',
    output: {
      file: './dist/create-leaf-app.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];
