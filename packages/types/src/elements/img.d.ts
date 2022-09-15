import type { Element } from '../globals';

type imgAttributes = [
  'align',
  'alt',
  'aspect_ratio_computed_from_attributes',
  'border',
  'crossorigin',
  'decoding',
  'fetchpriority',
  'height',
  'hspace',
  'ismap',
  'loading',
  'longdesc',
  'name',
  'onerror',
  'referrerpolicy',
  'sizes',
  'src',
  'srcSet',
  'useMap',
  'vspace',
  'width'
];

export type imgElement = Element<imgAttributes>;
