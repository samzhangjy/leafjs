import type { Element } from '../globals';

type unknownAttributes = [
  'alink',
  'background',
  'bgcolor',
  'bottommargin',
  'leftmargin',
  'link',
  'rightmargin',
  'text',
  'topmargin',
  'vlink'
];

export type unknownElement = Element<unknownAttributes>;
