import type { Element } from '../globals';

type unknownAttributes = [
  'async',
  'crossorigin',
  'defer',
  'fetchpriority',
  'integrity',
  'language',
  'nomodule',
  'referrerpolicy',
  'src',
  'text',
  'type'
];

export type unknownElement = Element<unknownAttributes>;
