#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var babel = require('@babel/core');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var rollup = require('rollup');
var nodeResolve = require('@rollup/plugin-node-resolve');
var commonjs = require('@rollup/plugin-commonjs');
var rollupPluginTerser = require('rollup-plugin-terser');
var commander = require('commander');
var pluginBabel = require('@rollup/plugin-babel');
var inject = require('@rollup/plugin-inject');
var chalk = require('chalk');
var progress = require('rollup-plugin-progress');
var express = require('express');
var expressWs = require('express-ws');
var chokidar = require('chokidar');
var open = require('open');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var babel__default = /*#__PURE__*/_interopDefaultLegacy(babel);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var glob__default = /*#__PURE__*/_interopDefaultLegacy(glob);
var nodeResolve__default = /*#__PURE__*/_interopDefaultLegacy(nodeResolve);
var commonjs__default = /*#__PURE__*/_interopDefaultLegacy(commonjs);
var inject__default = /*#__PURE__*/_interopDefaultLegacy(inject);
var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);
var progress__default = /*#__PURE__*/_interopDefaultLegacy(progress);
var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var expressWs__default = /*#__PURE__*/_interopDefaultLegacy(expressWs);
var chokidar__default = /*#__PURE__*/_interopDefaultLegacy(chokidar);
var open__default = /*#__PURE__*/_interopDefaultLegacy(open);

const staticServer = (publicPath) => {
    publicPath = path__default["default"].resolve(publicPath);
    const app = express__default["default"]();
    const ws = expressWs__default["default"](app);
    const injectCandidates = [new RegExp('</body>', 'i'), new RegExp('</svg>'), new RegExp('</head>', 'i')];
    let toInject = null;
    const injectContent = fs.readFileSync(path__default["default"].join(__dirname, 'injected.min.js')).toString();
    const injectContentToHTML = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const currentPath = path__default["default"].join(dir, file);
            if (fs.statSync(currentPath).isDirectory()) {
                injectContentToHTML(currentPath);
            }
            else {
                if (path__default["default"].extname(currentPath) !== '.html')
                    continue;
                const htmlContent = fs.readFileSync(currentPath).toString();
                for (const tag of injectCandidates) {
                    const match = tag.exec(htmlContent);
                    if (match) {
                        toInject = match[0];
                        break;
                    }
                }
                const pathObj = path__default["default"].parse(path__default["default"].relative(publicPath, currentPath));
                app.get(path__default["default"].join('/', pathObj.dir, pathObj.name === 'index' ? '' : pathObj.name), (_req, res) => {
                    if (!toInject) {
                        res.send(htmlContent);
                        return;
                    }
                    res.send(htmlContent.replace(new RegExp(toInject, 'i'), `
          <!-- code injected by leafjs -->
          <script>
              ${injectContent}
          </script>
      ${toInject}`));
                });
            }
        }
    };
    app.use('/', express__default["default"].static(publicPath, { index: false }));
    injectContentToHTML(publicPath);
    let socket = null;
    ws.app.ws('/socket', (ws) => {
        socket = ws;
    });
    return {
        start: app.listen,
        update: () => {
            socket === null || socket === void 0 ? void 0 : socket.send(JSON.stringify({ msg: 'reload' }));
        },
        error: (msg) => {
            socket === null || socket === void 0 ? void 0 : socket.send(JSON.stringify({ msg: 'error', data: msg }));
        },
        on: ws.app.on,
    };
};

const babelConfig = {
    presets: [['@babel/preset-env', { modules: false, targets: '> 0.25%, not dead' }]],
    plugins: [['@babel/plugin-transform-react-jsx', { pragma: '___leaf_create_element_react' }]],
    babelHelpers: 'bundled',
};
const program = new commander.Command();
const info = (str) => {
    console.log(`${chalk__default["default"].cyan('[leafjs]')} - ${chalk__default["default"].blue('info')} - ${str}`);
};
const error = (str) => {
    console.log(`${chalk__default["default"].cyan('[leafjs]')} - ${chalk__default["default"].red('error')} - ${str}`);
};
const generateCodeTemplate = (code) => {
    return `
    /** @jsx ___createElement_leaf */
    import { createElementReactStyle as ___createElement_leaf } from '@leaf-web/core';
    
    // user code start
    ${code};
    // user code end
  `;
};
const compileCode = (code) => {
    var _a;
    return ((_a = babel__default["default"].transformSync(generateCodeTemplate(code), babelConfig)) === null || _a === void 0 ? void 0 : _a.code) || '';
};
const transformFilename = (filename) => {
    const JSXExtensions = ['.jsx', '.tsx'];
    // transform file extension
    if (JSXExtensions.includes(path__default["default"].extname(filename))) {
        return filename.substring(0, filename.length - 1);
    }
    return filename;
};
const compileFile = (filePath, outputPath) => {
    const code = fs__default["default"].readFileSync(path__default["default"].resolve(filePath)).toString();
    const result = compileCode(code);
    let absOutputPath = transformFilename(path__default["default"].resolve(outputPath));
    fs__default["default"].writeFileSync(absOutputPath, '// NOTE: This file is generated by Leafjs parser. DO NOT EDIT!\n\n' + result);
    return result;
};
const compileFilesWithGlob = (pattern, outputDir) => {
    glob__default["default"](pattern, (err, matches) => {
        if (err) {
            error(`failed to match glob files.\n${chalk__default["default"].gray(err)}`);
            return;
        }
        matches.forEach((match) => {
            const currentPath = path__default["default"].join(outputDir, match);
            const currentOutputDir = path__default["default"].dirname(currentPath);
            fs__default["default"].mkdir(currentOutputDir, { recursive: true }, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                compileFile(match, currentPath);
            });
        });
    });
};
const bundleFiles = async (entry, outputDir) => {
    const inputOptions = {
        input: entry,
        plugins: [
            nodeResolve__default["default"](),
            commonjs__default["default"](),
            pluginBabel.babel(babelConfig),
            inject__default["default"]({ ___leaf_create_element_react: ['@leaf-web/core', 'createElementReactStyle'] }),
            rollupPluginTerser.terser(),
            // @ts-ignore
            progress__default["default"](),
        ],
    };
    const outputOptions = {
        format: 'iife',
        file: path__default["default"].join(outputDir, 'bundle.min.js'),
    };
    let bundle = null;
    let isError = false;
    try {
        bundle = await rollup.rollup(inputOptions);
        await bundle.write(outputOptions);
    }
    catch (err) {
        isError = true;
        error(`failed to compile.\n${chalk__default["default"].gray(err)}`);
    }
    if (bundle) {
        await bundle.close();
    }
    if (isError) {
        process.exit(1);
    }
};
const buildFromConfig = async (configPath) => {
    const configContent = JSON.parse(fs__default["default"].readFileSync(configPath).toString());
    await bundleFiles(configContent.entry, configContent.outputDir);
};
const startDevServer = (userConfig, port) => {
    const config = JSON.parse(fs__default["default"].readFileSync(userConfig).toString());
    const inputOptions = {
        input: config.entry,
        plugins: [
            nodeResolve__default["default"](),
            commonjs__default["default"](),
            pluginBabel.babel(babelConfig),
            inject__default["default"]({ ___leaf_create_element_react: ['@leaf-web/core', 'createElementReactStyle'] }),
            // @ts-ignore
            progress__default["default"](),
        ],
    };
    const outputOptions = {
        format: 'iife',
        file: path__default["default"].join(config.outputDir, 'bundle.min.js'),
    };
    const watcher = rollup.watch({
        ...inputOptions,
        output: outputOptions,
    });
    let currentError = null;
    const server = staticServer('.');
    server.start(port, async () => {
        info(`started development server on http://localhost:${port}.`);
        await open__default["default"](`http://127.0.0.1:${port}/`);
    });
    server.on('error', (err) => {
        error(`Failed to start development server.\n${chalk__default["default"].gray(err)}`);
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
        }
        else if (event.code === 'END') {
            if (currentError) {
                error('an unexpected error occured while building.');
                server.error(currentError.message);
            }
            else {
                clearScreen();
                info('build successful.');
            }
            isRebuilding = false;
        }
        else if (event.code === 'ERROR') {
            error(`failed to build.\n${chalk__default["default"].gray(event.error)}`);
            currentError = event.error;
        }
        else if (event.code === 'BUNDLE_END') {
            event.result.close();
        }
    });
    const fileSystemWatcher = chokidar__default["default"].watch('.', {
        ignored: ['node_modules', '**/*.jsx', '**/*.tsx'],
    });
    fileSystemWatcher.on('all', () => {
        if (isRebuilding || currentError)
            return;
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
program.parse();

exports.buildFromConfig = buildFromConfig;
exports.bundleFiles = bundleFiles;
exports.compileCode = compileCode;
exports.compileFile = compileFile;
exports.compileFilesWithGlob = compileFilesWithGlob;
exports.error = error;
exports.info = info;
exports.startDevServer = startDevServer;
exports.transformFilename = transformFilename;
//# sourceMappingURL=parser.js.map
