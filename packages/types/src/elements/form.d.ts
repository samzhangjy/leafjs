import type { Element } from '../globals';

type formAttributes = [
  'accept',
  'acceptCharset',
  'action',
  'autocapitalize',
  'autoComplete',
  'encType',
  'method',
  'name',
  'noValidate',
  'target'
];

export type formElement = Element<formAttributes>;
