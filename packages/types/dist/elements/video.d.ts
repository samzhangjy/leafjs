import type { Element } from '../globals';

type videoAttributes = [
  'aspect_ratio_computed_from_attributes',
  'autoPlay',
  'controls',
  'crossorigin',
  'height',
  'loop',
  'muted',
  'poster',
  'preload',
  'src',
  'width'
];

export type videoElement = Element<videoAttributes>;
