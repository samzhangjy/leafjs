import type { Element } from '../globals';

type marqueeAttributes = [
  'behavior',
  'bgcolor',
  'direction',
  'height',
  'hspace',
  'loop',
  'scrollamount',
  'scrolldelay',
  'truespeed',
  'vspace',
  'width'
];

export type marqueeElement = Element<marqueeAttributes>;
