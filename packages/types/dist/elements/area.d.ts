import type { Element } from '../globals';

type areaAttributes = [
  'accessKey',
  'alt',
  'coords',
  'download',
  'href',
  'hrefLang',
  'implicit_noopener',
  'media',
  'name',
  'nohref',
  'ping',
  'referrerpolicy',
  'rel',
  'shape',
  'tabIndex',
  'target',
  'type'
];

export type areaElement = Element<areaAttributes>;
