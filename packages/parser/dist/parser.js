#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pluginBabel = require('@rollup/plugin-babel');
var commonjs = require('@rollup/plugin-commonjs');
var inject = require('@rollup/plugin-inject');
var nodeResolve = require('@rollup/plugin-node-resolve');
var typescript = require('@rollup/plugin-typescript');
var chalk = require('chalk');
var chokidar = require('chokidar');
var commander = require('commander');
var fs = require('fs');
var open = require('open');
var path = require('path');
var rollup = require('rollup');
var minifyHTML = require('rollup-plugin-minify-html-literals');
var postcss = require('rollup-plugin-postcss');
var progress = require('rollup-plugin-progress');
var rollupPluginTerser = require('rollup-plugin-terser');
var express = require('express');
var expressWs = require('express-ws');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var commonjs__default = /*#__PURE__*/_interopDefaultLegacy(commonjs);
var inject__default = /*#__PURE__*/_interopDefaultLegacy(inject);
var nodeResolve__default = /*#__PURE__*/_interopDefaultLegacy(nodeResolve);
var typescript__default = /*#__PURE__*/_interopDefaultLegacy(typescript);
var chalk__default = /*#__PURE__*/_interopDefaultLegacy(chalk);
var chokidar__default = /*#__PURE__*/_interopDefaultLegacy(chokidar);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var open__default = /*#__PURE__*/_interopDefaultLegacy(open);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var minifyHTML__default = /*#__PURE__*/_interopDefaultLegacy(minifyHTML);
var postcss__default = /*#__PURE__*/_interopDefaultLegacy(postcss);
var progress__default = /*#__PURE__*/_interopDefaultLegacy(progress);
var express__default = /*#__PURE__*/_interopDefaultLegacy(express);
var expressWs__default = /*#__PURE__*/_interopDefaultLegacy(expressWs);

const injectToHTML = (HTMLContent, injectContent, canidates = [new RegExp('</body>', 'i'), new RegExp('</svg>'), new RegExp('</head>', 'i')]) => {
    let tagToInject = null;
    for (const tag of canidates) {
        const match = tag.exec(HTMLContent);
        if (match) {
            tagToInject = match[0];
            break;
        }
    }
    if (!tagToInject)
        return HTMLContent;
    return HTMLContent.replace(new RegExp(tagToInject, 'i'), `${injectContent}\n${tagToInject}`);
};

const staticServer = (publicPath) => {
    publicPath = path__default["default"].resolve(publicPath);
    const app = express__default["default"]();
    const ws = expressWs__default["default"](app);
    const injectContent = fs.readFileSync(path__default["default"].join(__dirname, 'injected.min.js')).toString();
    const injectWatchScriptToHTML = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const currentPath = path__default["default"].join(dir, file);
            if (fs.statSync(currentPath).isDirectory()) {
                injectWatchScriptToHTML(currentPath);
            }
            else {
                if (path__default["default"].extname(currentPath) !== '.html')
                    continue;
                const htmlContent = fs.readFileSync(currentPath).toString();
                const pathObj = path__default["default"].parse(path__default["default"].relative(publicPath, currentPath));
                app.get(path__default["default"].join('/', pathObj.dir, pathObj.name === 'index' ? '' : pathObj.name), (_req, res) => {
                    res.send(injectToHTML(htmlContent, `
          <!-- code injected by leafjs -->
          <script>
              ${injectContent}
          </script>`));
                });
            }
        }
    };
    app.use('/', express__default["default"].static(publicPath, { index: false }));
    injectWatchScriptToHTML(publicPath);
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

const program = new commander.Command();
const info = (str) => {
    console.log(`${chalk__default["default"].cyan('[leafjs]')} - ${chalk__default["default"].blue('info')} - ${str}`);
};
const error = (str) => {
    console.log(`${chalk__default["default"].cyan('[leafjs]')} - ${chalk__default["default"].red('error')} - ${str}`);
};
const warn = (str) => {
    console.log(`${chalk__default["default"].cyan('[leafjs]')} - ${chalk__default["default"].yellow('warn')} - ${str}`);
};
const bundleFiles = async (config) => {
    let bundleExtensions = ['js', 'jsx'];
    if (config.typescript)
        bundleExtensions = [...bundleExtensions, 'ts', 'tsx'];
    const babelConfig = {
        presets: [['@babel/preset-env', { modules: false, targets: '> 0.25%, not dead' }]],
        plugins: [['@babel/plugin-transform-react-jsx', { pragma: '___leaf_create_element_react' }]],
        babelHelpers: 'bundled',
        extensions: bundleExtensions,
    };
    let bundle = null;
    let isError = false;
    for (const format of config.formats) {
        info(`transpiling to format ${format.format}...`);
        const inputOptions = {
            input: config.entry,
            plugins: [
                minifyHTML__default["default"](),
                postcss__default["default"](),
                config.typescript ? typescript__default["default"]({ tsconfig: config.typescript }) : null,
                pluginBabel.babel(babelConfig),
                nodeResolve__default["default"](),
                commonjs__default["default"](),
                inject__default["default"]({ ___leaf_create_element_react: ['@leaf-web/core', 'createElementReactStyle'] }),
                rollupPluginTerser.terser({
                    compress: {
                        passes: 5,
                    },
                }),
                // @ts-ignore
                progress__default["default"](),
            ],
            external: format.external,
        };
        const outputPath = 'bundle.min.js';
        const outputOptions = {
            format: format.format,
            file: path__default["default"].join(config.outputDir, format.path, outputPath),
        };
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
    }
};
const getConfigWithDefault = (userConfig) => {
    var _a, _b, _c, _d, _e, _f;
    const userFormats = userConfig.formats || ['iife'];
    const formats = [];
    for (const format of userFormats) {
        if (typeof format === 'string') {
            formats.push({
                format: format,
                external: [],
                path: format,
            });
            continue;
        }
        formats.push({
            format: (_a = format.format) !== null && _a !== void 0 ? _a : 'iife',
            external: (_b = format.external) !== null && _b !== void 0 ? _b : [],
            path: (_c = format.path) !== null && _c !== void 0 ? _c : format.format,
        });
    }
    return {
        entry: (_d = userConfig.entry) !== null && _d !== void 0 ? _d : './src/index.jsx',
        outputDir: (_e = userConfig.outputDir) !== null && _e !== void 0 ? _e : './dist',
        entryHTML: (_f = userConfig.entryHTML) !== null && _f !== void 0 ? _f : 'index.html',
        typescript: userConfig.typescript || undefined,
        formats,
    };
};
const buildFromConfig = async (configPath) => {
    const config = getConfigWithDefault(JSON.parse(fs__default["default"].readFileSync(configPath).toString()));
    const entryHTMLContent = fs__default["default"].readFileSync(config.entryHTML).toString();
    const outputHTMLPath = 'index.html';
    const outputPath = await bundleFiles(config);
    fs__default["default"].writeFileSync(path__default["default"].join(config.outputDir, outputHTMLPath), injectToHTML(entryHTMLContent, `<script src='${outputPath}'></script>`, [
        new RegExp('</head>', 'i'),
        new RegExp('</body>', 'i'),
    ]));
};
const DEV_SERVER_ROOT = './.leaf';
const startDevServer = (userConfig, port) => {
    if (!fs__default["default"].existsSync(DEV_SERVER_ROOT)) {
        fs__default["default"].mkdirSync(DEV_SERVER_ROOT);
    }
    const config = getConfigWithDefault(JSON.parse(fs__default["default"].readFileSync(userConfig).toString()));
    const bundleOutputPath = 'js/bundle.js';
    const outputHTMLPath = 'index.html';
    const entryHTMLContent = fs__default["default"].readFileSync(config.entryHTML).toString();
    if (config.formats.length > 2 || config.formats[0].format !== 'iife') {
        warn('You are bundling in development mode. ALL format options will be ignored and only IIFE bundle will be generated. Use `leaf build` to generate bundles you specified.');
    }
    fs__default["default"].writeFileSync(path__default["default"].join(DEV_SERVER_ROOT, outputHTMLPath), injectToHTML(entryHTMLContent, `<script src='${bundleOutputPath}'></script>`, [
        new RegExp('</head>', 'i'),
        new RegExp('</body>', 'i'),
    ]));
    let bundleExtensions = ['js', 'jsx'];
    if (config.typescript)
        bundleExtensions = [...bundleExtensions, 'ts', 'tsx'];
    const babelConfig = {
        presets: [['@babel/preset-env', { modules: false, targets: '> 0.25%, not dead' }]],
        plugins: [['@babel/plugin-transform-react-jsx', { pragma: '___leaf_create_element_react' }]],
        babelHelpers: 'bundled',
        extensions: bundleExtensions,
    };
    const inputOptions = {
        input: config.entry,
        plugins: [
            config.typescript
                ? typescript__default["default"]({
                    tsconfig: config.typescript,
                })
                : null,
            postcss__default["default"](),
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
        file: path__default["default"].join(DEV_SERVER_ROOT, bundleOutputPath),
    };
    const rollupConfig = [
        {
            ...inputOptions,
            output: outputOptions,
        },
    ];
    const watcher = rollup.watch(rollupConfig);
    let currentError = null;
    const server = staticServer(DEV_SERVER_ROOT);
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
program
    .command('start')
    .description('Start a Nodejs file server for `build` folder.')
    .option('-p, --port <number>', 'Port to start the server', '8080')
    .option('-d, --dir <string>', 'Directory to serve.', './dist')
    .action((options) => {
    if (!fs__default["default"].existsSync(options.dir)) {
        error(`Unable to locate directory ${options.dir}.`);
        process.exit(1);
    }
    const server = staticServer(options.dir);
    server.start(parseInt(options.port), async () => {
        info(`Started server on http://localhost:${options.port}`);
        await open__default["default"](`http://localhost:${options.port}`);
    });
});
program.parse();

exports.DEV_SERVER_ROOT = DEV_SERVER_ROOT;
exports.buildFromConfig = buildFromConfig;
exports.bundleFiles = bundleFiles;
exports.error = error;
exports.getConfigWithDefault = getConfigWithDefault;
exports.info = info;
exports.startDevServer = startDevServer;
exports.warn = warn;
//# sourceMappingURL=parser.js.map
