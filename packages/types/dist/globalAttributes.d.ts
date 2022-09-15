type GlobalAttributeNames = [
  'accessKey',
  'autocapitalize',
  'autoComplete',
  'autoFocus',
  'className',
  'contentEditable',
  'contextmenu',
  'data_attributes',
  'dir',
  'draggable',
  'enterkeyhint',
  'exportparts',
  'hidden',
  'id',
  'inert',
  'inputmode',
  'is',
  'itemid',
  'itemprop',
  'itemref',
  'itemscope',
  'itemtype',
  'lang',
  'nonce',
  'part',
  'slot',
  'spellCheck',
  'style',
  'tabIndex',
  'title',
  'translate'
];

export type GlobalAttributes = {
  [key in GlobalAttributeNames[number]]: string;
};
