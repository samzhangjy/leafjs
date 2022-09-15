import type { Element } from '../globals';

type buttonAttributes = [
  'autoComplete',
  'disabled',
  'form',
  'formAction',
  'formenctype',
  'formmethod',
  'formnovalidate',
  'formtarget',
  'name',
  'type',
  'value'
];

export type buttonElement = Element<buttonAttributes>;
