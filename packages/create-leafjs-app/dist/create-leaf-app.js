#!/usr/bin/env node
'use strict';

var commander = require('commander');
var ora = require('ora');
var fs = require('fs-extra');
var path = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ora__default = /*#__PURE__*/_interopDefaultLegacy(ora);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

const program = new commander.Command();
program.name('create-leaf-app').description('Bootstrap a new Leafjs web application.');
program
    .argument('<name>', 'Project name')
    .option('-t, --template <string>', 'Project template to create from.', 'default')
    .action((name, options) => {
    const spinner = ora__default["default"](`Generating template '${options.template}'...`);
    const templateSourcePath = path__default["default"].join(__dirname, '../templates', options.template.toLowerCase());
    const userDestPath = path__default["default"].join(process.cwd(), name);
    if (!fs__default["default"].existsSync(templateSourcePath)) {
        spinner.fail(`Cannot find template ${options.template}.`);
        return;
    }
    if (fs__default["default"].existsSync(userDestPath) && fs__default["default"].readdirSync(userDestPath).length !== 0) {
        spinner.fail(`Project path ${userDestPath} already exists and is not empty.`);
        return;
    }
    fs__default["default"].copySync(templateSourcePath, userDestPath);
    spinner.succeed(`Successfully created ${name} in ${userDestPath}.`);
    console.log('\nFirst, run:\n');
    console.log(`$ cd ./${name}\n`);
    console.log('To enter the project directory. Then run:\n');
    console.log('$ npm i\n\n# or\n\n$ yarn\n');
    console.log('To install the required packages.\n');
    console.log('Use `npm run dev` or `yarn dev` to start a hot-reloading devleopment server.\n');
    console.log('Use `npm run build` or `yarn build` to create an optimized production build.\n');
    console.log('For more information, please refer to Leafjs docs: https://leafjs.samzhangjy.com/');
});
program.parse();
//# sourceMappingURL=create-leaf-app.js.map
