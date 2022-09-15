import type { Element } from '../globals';

type textareaAttributes = [
  'autoComplete',
  'cols',
  'dirname',
  'disabled',
  'form',
  'maxLength',
  'minlength',
  'name',
  'placeholder',
  'readOnly',
  'required',
  'rows',
  'spellCheck',
  'wrap'
];

export type textareaElement = Element<textareaAttributes>;
