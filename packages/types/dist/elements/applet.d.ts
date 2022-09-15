import type { Element } from '../globals';

type appletAttributes = [
  'align',
  'alt',
  'archive',
  'code',
  'codebase',
  'datafld',
  'datasrc',
  'height',
  'hspace',
  'mayscript',
  'name',
  'object',
  'src',
  'vspace',
  'width'
];

export type appletElement = Element<appletAttributes>;
