import { isNodeLike, isNodeListLike, NodeLike, preservedProps, registerComponent, appendContentToNode } from './common';

export type HTMLElementProps = Record<string, string>;
export type LeafBaseComponent = { name: string; extends: typeof HTMLElement };

// TODO: extend base component list
/** Base HTML elements mapping */
const LeafBaseComponents: LeafBaseComponent[] = [
  { name: 'button', extends: HTMLButtonElement },
  { name: 'div', extends: HTMLDivElement },
  { name: 'input', extends: HTMLInputElement },
  { name: 'h1', extends: HTMLHeadingElement },
  { name: 'h2', extends: HTMLHeadingElement },
  { name: 'h3', extends: HTMLHeadingElement },
  { name: 'h4', extends: HTMLHeadingElement },
  { name: 'h5', extends: HTMLHeadingElement },
  { name: 'h6', extends: HTMLHeadingElement },
  { name: 'p', extends: HTMLParagraphElement },
  { name: 'li', extends: HTMLLIElement },
  { name: 'ul', extends: HTMLUListElement },
  { name: 'ol', extends: HTMLOListElement },
  { name: 'span', extends: HTMLSpanElement },
  { name: 'form', extends: HTMLFormElement },
  { name: 'label', extends: HTMLLabelElement },
  { name: 'a', extends: HTMLAnchorElement },
  { name: 'textarea', extends: HTMLTextAreaElement },
  { name: 'iframe', extends: HTMLIFrameElement },
  { name: 'img', extends: HTMLImageElement },
  { name: 'video', extends: HTMLVideoElement },
];

const baseComponents: Record<string, typeof HTMLElement> = {};

/**
 * Construct a custom `HTMLElement` with given parent to extend from.
 * @param parent `HTMLElement` class to inherit from.
 * @returns Consturcted element subclass.
 */
const makeBaseComponent = (parent: typeof HTMLElement) => {
  return class extends parent {
    constructor(content?: NodeLike | HTMLElementProps, props?: HTMLElementProps) {
      super();
      if (!content) return;

      if (!isNodeLike(content) && !isNodeListLike(content)) {
        for (const propName in content as HTMLElementProps) {
          this.setAttribute(
            propName in preservedProps ? preservedProps[propName] : propName,
            (content as HTMLElementProps)[propName]
          );
        }
        return;
      }
      appendContentToNode(this, [...(content as HTMLCollection)]);
      if (!props) return;

      for (const propName in props) {
        this.setAttribute(propName in preservedProps ? preservedProps[propName] : propName, props[propName]);
      }
    }
  };
};

LeafBaseComponents.forEach((component) => {
  baseComponents[component.name] = makeBaseComponent(component.extends);
  registerComponent(`leaf-${component.name}`, baseComponents[component.name], { extends: component.name });
});

// TODO: find out a way to export components directly using named imports
export { baseComponents as HTMLElements };
