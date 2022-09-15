#!/usr/bin/env ts-node-esm

import bcd from '@mdn/browser-compat-data' assert { type: 'json' };
import fse from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import HTMLAttributeToJSX from 'html-attribute-to-react';
import HTMLToJSX from 'htmltojsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const HTMLConverter = new HTMLToJSX({ createClass: false });
const selfClosingTagMatcher = /<(\w+).*?\s\/>/;

const getJSXTagName = (tagName: string) => {
  const result = selfClosingTagMatcher.exec(HTMLConverter.convert(`<${tagName}></${tagName}>`));
  if (result) return result[1];
  return 'unknown';
};

const replaceTemplate = (template: string, ...values: string[]) => {
  for (const i in values) {
    template = template.replaceAll(`{${i}}`, values[i]);
  }
  return template;
};

const generateElements = (dir: string) => {
  const elementTemplate = `import type { Element } from '../globals';

type {0}Attributes = [{1}];

export type {0}Element = Element<{0}Attributes>;
`;

  for (const elementName in bcd.html.elements) {
    if (elementName === '__compat') continue;
    const element = bcd.html.elements[elementName];
    const elementNameJSXStyle = getJSXTagName(elementName);
    const attributes = [];
    for (const attrName in element) {
      if (attrName === '__compat') continue;
      attributes.push(`'${HTMLAttributeToJSX(attrName)}'`);
    }
    fse.writeFileSync(
      path.join(dir, `${elementName.toLowerCase()}.d.ts`),
      replaceTemplate(elementTemplate, elementNameJSXStyle, attributes.join(', '))
    );
  }
};

const generateGlobalAttributes = (outputLocation: string) => {
  const globalAttributesTemplate = `type GlobalAttributeNames = [{0}];

export type GlobalAttributes = {
  [key in GlobalAttributeNames[number]]: string;
};
`;

  const globalAttributes = [];

  for (const attrName in bcd.html.global_attributes) {
    if (attrName === '__compat') continue;
    globalAttributes.push(`'${HTMLAttributeToJSX(attrName)}'`);
  }

  fse.writeFileSync(outputLocation, replaceTemplate(globalAttributesTemplate, globalAttributes.join(', ')));
};

export const generateTopLevelTypings = (rootDir: string) => {
  const elementsDirectory = path.join(rootDir, 'elements');

  if (!fse.existsSync(elementsDirectory)) {
    fse.mkdirSync(elementsDirectory);
  }

  generateElements(elementsDirectory);
  generateGlobalAttributes(path.join(rootDir, 'globalAttributes.d.ts'));

  const indexDefinationTemplate = `{0}

declare namespace JSX {
  interface ElementClass {
    render: any;
  }

  interface IntrinsicElements {
{1}
  }
}

export = JSX;
export as namespace JSX;
`;

  const files = fse.readdirSync(elementsDirectory);
  const importStatements: string[] = [];
  const typings: string[] = [];

  files.forEach((fileName) => {
    const fileNameDetails = path.parse(fileName);
    const elementName = fileNameDetails.name;
    const elementNameJSX = getJSXTagName(elementName);
    importStatements.push(`import type { ${elementNameJSX}Element } from './elements/${elementName}';`);
    typings.push(`    ${elementNameJSX}: ${elementNameJSX}Element;`);
  });

  fse.writeFileSync(
    path.join(rootDir, 'index.d.ts'),
    replaceTemplate(indexDefinationTemplate, importStatements.join('\n'), typings.join('\n'))
  );
};

generateTopLevelTypings(path.join(__dirname, '../'));
