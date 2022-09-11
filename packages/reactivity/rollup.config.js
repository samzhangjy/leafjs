import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import { babel } from '@rollup/plugin-babel';

const babelConfig = {
  babelHelpers: 'bundled',
  extensions: ['.js', '.ts'],
};

/**
 * @type {import('rollup').RollupOptions}
 */
export default [
  {
    input: './src/index.ts',
    output: {
      format: 'cjs',
      sourcemap: true,
      name: 'leaf',
      file: './dist/reactivity.js',
      esModule: true,
    },

    plugins: [typescript({ outputToFilesystem: false }), nodeResolve(), babel(babelConfig)],
  },
  {
    input: './src/index.ts',
    output: {
      format: 'es',
      sourcemap: true,
      name: 'leaf',
      file: './dist/reactivity.min.js',
    },
    plugins: [typescript({ outputToFilesystem: false }), nodeResolve(), babel(babelConfig), terser()],
  },
  {
    input: './src/index.ts',
    output: {
      format: 'es',
      sourcemap: true,
      dir: './dist/es',
      preserveModules: true,
    },
    plugins: [typescript({ outDir: './dist/es' }), nodeResolve(), babel(babelConfig)],
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
