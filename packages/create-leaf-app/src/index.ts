import { Command } from 'commander';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';

const program = new Command();

program.name('create-leaf-app').description('Bootstrap a new Leafjs web application.');

program
  .argument('<name>', 'Project name')
  .option('-t, --template <string>', 'Project template to create from.', 'default')
  .action((name, options) => {
    const spinner = ora(`Generating template '${options.template}'...`);
    const templateSourcePath = path.join(__dirname, '../templates', options.template.toLowerCase());
    const userDestPath = path.join(process.cwd(), name);

    if (!fs.existsSync(templateSourcePath)) {
      spinner.fail(`Cannot find template ${options.template}.`);
      return;
    }

    if (fs.existsSync(userDestPath) && fs.readdirSync(userDestPath).length !== 0) {
      spinner.fail(`Project path ${userDestPath} already exists and is not empty.`);
      return;
    }

    fs.copySync(templateSourcePath, userDestPath);
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
