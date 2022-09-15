import type { Element } from '../globals';

type linkAttributes = [
  'charSet',
  'crossorigin',
  'disabled',
  'fetchpriority',
  'href',
  'hrefLang',
  'imagesizes',
  'imagesrcset',
  'integrity',
  'media',
  'methods',
  'prefetch',
  'referrerpolicy',
  'rel',
  'rev',
  'sizes',
  'target',
  'title',
  'type'
];

export type linkElement = Element<linkAttributes>;
