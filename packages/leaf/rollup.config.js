import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import commonjs from '@rollup/plugin-commonjs';

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
        file: './dist/leaf.min.js',
        plugins: [terser()],
      },
      {
        format: 'cjs',
        sourcemap: true,
        name: 'leaf',
        file: './dist/leaf.js',
        esModule: true,
      },
      {
        format: 'esm',
        sourcemap: true,
        file: './dist/leaf.mjs',
        esModule: true,
      },
    ],
    plugins: [
      typescript({ outputToFilesystem: false }),
      nodeResolve({ browser: true, preferBuiltins: false }),
      commonjs(),
    ],
  },
  {
    input: './dist/src/index.d.ts',
    output: {
      file: './dist/leaf.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];
