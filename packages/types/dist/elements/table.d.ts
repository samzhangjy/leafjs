import type { Element } from '../globals';

type tableAttributes = [
  'align',
  'bgcolor',
  'border',
  'cellpadding',
  'cellspacing',
  'frame',
  'rules',
  'summary',
  'width'
];

export type tableElement = Element<tableAttributes>;
