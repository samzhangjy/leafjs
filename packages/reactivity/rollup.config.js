import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: './src/index.ts',
  output: {
    file: './dist/reactivity.min.js',
    format: 'module',
    sourcemap: true,
    name: 'leaf',
  },
  plugins: [typescript({ outputToFilesystem: false }), terser()],
};
