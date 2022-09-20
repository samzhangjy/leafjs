import { babel as rollupBabelPlugin, RollupBabelInputPluginOptions } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import inject from '@rollup/plugin-inject';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import chalk from 'chalk';
import chokidar from 'chokidar';
import { Command } from 'commander';
import fs from 'fs';
import open from 'open';
import path from 'path';
import { OutputOptions, rollup, RollupError, RollupOptions, RollupWatchOptions, watch } from 'rollup';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import postcss from 'rollup-plugin-postcss';
import progress from 'rollup-plugin-progress';
import { terser } from 'rollup-plugin-terser';
import { injectToHTML } from './common';
import { staticServer } from './server';

const program = new Command();

export const info = (str: string) => {
  console.log(`${chalk.cyan('[leafjs]')} - ${chalk.blue('info')} - ${str}`);
};

export const error = (str: string) => {
  console.log(`${chalk.cyan('[leafjs]')} - ${chalk.red('error')} - ${str}`);
};

export const bundleFiles = async (entry: string, outputDir: string, typescriptDetails?: string) => {
  let bundleExtensions = ['js', 'jsx'];
  if (typescriptDetails) bundleExtensions = [...bundleExtensions, 'ts', 'tsx'];

  const babelConfig: RollupBabelInputPluginOptions = {
    presets: [['@babel/preset-env', { modules: false, targets: '> 0.25%, not dead' }]],
    plugins: [['@babel/plugin-transform-react-jsx', { pragma: '___leaf_create_element_react' }]],
    babelHelpers: 'bundled',
    extensions: bundleExtensions,
  };

  const inputOptions: RollupOptions = {
    input: entry,
    plugins: [
      minifyHTML(),
      postcss(),
      typescriptDetails ? typescript({ tsconfig: typescriptDetails }) : null,
      rollupBabelPlugin(babelConfig),
      nodeResolve(),
      commonjs(),
      inject({ ___leaf_create_element_react: ['@leaf-web/core', 'createElementReactStyle'] }),
      terser({
        compress: {
          passes: 5,
        },
      }),
      // @ts-ignore
      progress(),
    ],
  };

  const outputPath = 'js/bundle.min.js';
  const outputOptions: OutputOptions = {
    format: 'iife',
    file: path.join(outputDir, outputPath),
  };
  let bundle = null;
  let isError = false;

  try {
    bundle = await rollup(inputOptions);
    await bundle.write(outputOptions);
  } catch (err) {
    isError = true;
    error(`failed to compile.\n${chalk.gray(err)}`);
  }

  if (bundle) {
    await bundle.close();
  }

  if (isError) {
    process.exit(1);
  }
  return outputPath;
};

export const getConfigWithDefault = (userConfig: Record<string, string | null>) => {
  return {
    entry: userConfig.entry ?? './src/index.jsx',
    outputDir: userConfig.outputDir ?? './dist',
    entryHTML: userConfig.entryHTML ?? 'index.html',
    typescript: userConfig.typescript || undefined,
  };
};

export const buildFromConfig = async (configPath: string) => {
  const config = getConfigWithDefault(JSON.parse(fs.readFileSync(configPath).toString()));
  const entryHTMLContent = fs.readFileSync(config.entryHTML).toString();
  const outputHTMLPath = 'index.html';
  const outputPath = await bundleFiles(config.entry, config.outputDir, config.typescript);

  fs.writeFileSync(
    path.join(config.outputDir, outputHTMLPath),
    injectToHTML(entryHTMLContent, `<script src='${outputPath}'></script>`, [
      new RegExp('</head>', 'i'),
      new RegExp('</body>', 'i'),
    ])
  );
};

export const DEV_SERVER_ROOT = './.leaf';

export const startDevServer = (userConfig: any, port: number) => {
  if (!fs.existsSync(DEV_SERVER_ROOT)) {
    fs.mkdirSync(DEV_SERVER_ROOT);
  }

  const config = getConfigWithDefault(JSON.parse(fs.readFileSync(userConfig).toString()));
  const bundleOutputPath = 'js/bundle.js';
  const outputHTMLPath = 'index.html';
  const entryHTMLContent = fs.readFileSync(config.entryHTML).toString();

  fs.writeFileSync(
    path.join(DEV_SERVER_ROOT, outputHTMLPath),
    injectToHTML(entryHTMLContent, `<script src='${bundleOutputPath}'></script>`, [
      new RegExp('</head>', 'i'),
      new RegExp('</body>', 'i'),
    ])
  );

  let bundleExtensions = ['js', 'jsx'];
  if (config.typescript) bundleExtensions = [...bundleExtensions, 'ts', 'tsx'];

  const babelConfig: RollupBabelInputPluginOptions = {
    presets: [['@babel/preset-env', { modules: false, targets: '> 0.25%, not dead' }]],
    plugins: [['@babel/plugin-transform-react-jsx', { pragma: '___leaf_create_element_react' }]],
    babelHelpers: 'bundled',
    extensions: bundleExtensions,
  };

  const inputOptions: RollupOptions = {
    input: config.entry,
    plugins: [
      config.typescript
        ? typescript({
            tsconfig: config.typescript,
          })
        : null,
      postcss(),
      nodeResolve(),
      commonjs(),
      rollupBabelPlugin(babelConfig),
      inject({ ___leaf_create_element_react: ['@leaf-web/core', 'createElementReactStyle'] }),
      // @ts-ignore
      progress(),
    ],
  };

  const outputOptions: OutputOptions = {
    format: 'iife',
    file: path.join(DEV_SERVER_ROOT, bundleOutputPath),
  };

  const rollupConfig: RollupWatchOptions[] = [
    {
      ...inputOptions,
      output: outputOptions,
    },
  ];

  const watcher = watch(rollupConfig);

  let currentError: RollupError | null = null;

  const server = staticServer(DEV_SERVER_ROOT);

  server.start(port, async () => {
    info(`started development server on http://localhost:${port}.`);
    await open(`http://127.0.0.1:${port}/`);
  });

  server.on('error', (err) => {
    error(`Failed to start development server.\n${chalk.gray(err)}`);
    return;
  });

  const clearScreen = () => {
    process.stdout.moveCursor(0, -10000);
    process.stdout.cursorTo(0);
    process.stdout.clearScreenDown();
  };

  let isRebuilding = true;

  watcher.on('event', (event) => {
    if (event.code === 'START') {
      isRebuilding = true;
      clearScreen();
      info('building...');
      currentError = null;
    } else if (event.code === 'END') {
      if (currentError) {
        error('an unexpected error occured while building.');
        server.error(currentError.message);
      } else {
        clearScreen();
        info('build successful.');
      }
      isRebuilding = false;
    } else if (event.code === 'ERROR') {
      error(`failed to build.\n${chalk.gray(event.error)}`);
      currentError = event.error;
    } else if (event.code === 'BUNDLE_END') {
      event.result.close();
    }
  });

  const fileSystemWatcher = chokidar.watch('.', {
    ignored: ['node_modules', '**/*.jsx', '**/*.tsx'],
  });

  fileSystemWatcher.on('all', () => {
    if (isRebuilding || currentError) return;
    info('change detected to filesystem. reloading...');
    server.update();
    clearScreen();
    info('waiting for changes...');
  });
};

program.name('leaf').description('Leafjs helper CLI.');

program
  .command('build')
  .description('Build and bundle a Leafjs application.')
  .option('-c, --config <string>', 'Config file location.', './leaf.config.json')
  .action(async (options) => {
    info('compiling...');
    await buildFromConfig(options.config);
    info('compiled successfully.');
  });

program
  .command('dev')
  .description('Start a development server.')
  .option('-c, --config <string>', 'Config file location.', './leaf.config.json')
  .option('-p, --port <number>', 'Port to start the development server.', '8080')
  .action((options) => {
    startDevServer(options.config, parseInt(options.port));
  });

program
  .command('start')
  .description('Start a Nodejs file server for `build` folder.')
  .option('-p, --port <number>', 'Port to start the server', '8080')
  .option('-d, --dir <string>', 'Directory to serve.', './dist')
  .action((options) => {
    if (!fs.existsSync(options.dir)) {
      error(`Unable to locate directory ${options.dir}.`);
      process.exit(1);
    }
    const server = staticServer(options.dir);
    server.start(parseInt(options.port), async () => {
      info(`Started server on http://localhost:${options.port}`);
      await open(`http://localhost:${options.port}`);
    });
  });

program.parse();
