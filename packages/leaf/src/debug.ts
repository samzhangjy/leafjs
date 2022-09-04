/**
 * Debugging utilities for Leafjs.
 * !!! THIS FILE SHOULD NOT BE BUNDLED !!!
 */
import { isElement } from './index';

/**
 * Convert an element to a JSON-serializable object.
 * @param element Element or Node to convert.
 * @returns The converted plain JavaScript object.
 */
const stringifyElement = (element: Node) => {
  let obj: { name: string; attributes: any[]; children: any[] } = {
    name: isElement(element) ? element.localName : '#text',
    attributes: [],
    children: [],
  };

  if (isElement(element)) {
    Array.from(element.attributes).forEach((a) => {
      obj.attributes.push({ name: a.name, value: a.value });
    });
    Array.from(element.childNodes).forEach((c) => {
      obj.children.push(stringifyElement(c));
    });
  } else {
    obj.children.push(element.textContent);
  }

  return obj;
};

/**
 * Deep clone a HTML element / node.
 * @param element Element to convert.
 * @returns The converted deep clone of `element`.
 */
export const getElementObject = (element: Node) => {
  return JSON.parse(JSON.stringify(stringifyElement(element)));
};
