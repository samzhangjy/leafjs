#!/usr/bin/env ts-node-esm

import { execSync } from 'child_process';
import fse from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
// @ts-ignore
import { generateTopLevelTypings } from './index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../../dist');
const rootPath = path.join(__dirname, '../');

const copyResultsToDist = () => {
  const toCopy = ['elements', 'globalAttributes.d.ts', 'globals.d.ts', 'index.d.ts'] as const;
  toCopy.forEach((filename) => {
    fse.copySync(path.join(rootPath, filename), path.join(distPath, filename));
  });
};

export const build = () => {
  generateTopLevelTypings(rootPath);
  execSync('yarn lint');
  copyResultsToDist();
};

build();
