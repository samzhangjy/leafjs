import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
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
        file: './dist/reactivity.min.js',
        esModule: true,
        plugins: [terser()],
      },
      {
        format: 'cjs',
        sourcemap: true,
        name: 'leaf',
        file: './dist/reactivity.js',
        esModule: true,
      },
    ],
    plugins: [
      typescript({ outputToFilesystem: false }),
      nodeResolve(),
      babel({ babelHelpers: 'bundled', extensions: ['.js', '.ts'], presets: [['@babel/preset-env', { loose: true }]] }),
    ],
  },
  {
    input: './dist/src/index.d.ts',
    output: {
      file: './dist/reactivity.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
];
