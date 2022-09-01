import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

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
      },
      {
        format: 'esm',
        sourcemap: true,
        file: './dist/leaf.mjs',
      },
    ],
    plugins: [
      typescript({ outputToFilesystem: false }),
      nodeResolve({ browser: true, preferBuiltins: false }),
      commonjs(),
      babel({ babelHelpers: 'bundled', extensions: ['.js', '.ts'], presets: [['@babel/preset-env', { loose: true }]] }),
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
