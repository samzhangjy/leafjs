import type { Element } from '../globals';

type objectAttributes = [
  'archive',
  'border',
  'classid',
  'codebase',
  'codetype',
  'data',
  'declare',
  'form',
  'height',
  'name',
  'standby',
  'tabIndex',
  'type',
  'useMap',
  'width'
];

export type objectElement = Element<objectAttributes>;
