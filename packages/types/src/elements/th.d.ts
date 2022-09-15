import type { Element } from '../globals';

type unknownAttributes = [
  'abbr',
  'align',
  'axis',
  'bgcolor',
  'char',
  'charoff',
  'colSpan',
  'headers',
  'rowSpan',
  'scope',
  'valign',
  'width'
];

export type unknownElement = Element<unknownAttributes>;
