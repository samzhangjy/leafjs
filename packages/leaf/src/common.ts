import { LeafComponent } from './index';

export type NodeLike = Node | string | HTMLCollection | NodeList | Node[] | string[];
export type ElementContent = Node | string;
export type ElementProps = Record<string, string>;
export type CustomComponentMap = WeakMap<typeof LeafComponent, string>;

declare global {
  interface Window {
    componentMap: CustomComponentMap;
  }
}

/**
 * Check if element is NodeList-like.
 * @param content Element to check.
 * @returns Is `content` having structures like `NodeList`.
 */
export const isNodeListLike = (content: any): content is Node[] => {
  return (
    HTMLCollection.prototype.isPrototypeOf(content) ||
    NodeList.prototype.isPrototypeOf(content) ||
    Array.isArray(content)
  );
};

/**
 * Check if element is Node-like.
 * @param content Element to check.
 * @returns Is `content` having structures like `Node`.
 */
export const isNodeLike = (content: any) => {
  return typeof content.nodeType !== 'undefined' || typeof content === 'string' || typeof content === 'number';
};

/**
 * Register a leaf component to `CustomElementsRegistery`.
 * @param tagName Tag name to use in templates.
 * @param component a defined `LeafComponent` class.
 * @param props extra params to pass to `customElements.define`.
 * @param allowMultiple allow multiple registers with the same component for different names.
 * @returns The `component` class.
 */
export const registerComponent = (
  tagName: string,
  component: typeof LeafComponent,
  props?: ElementDefinitionOptions,
  allowMultiple?: boolean
) => {
  // initialize component map
  if (!window.componentMap) {
    window.componentMap = new WeakMap();
  }

  // don't register if component is already registered in the registery
  // IMPORTANT: don't check `customElements` but instead check `componentMap`
  // to ensure one component instance can only register once
  if (!allowMultiple && window.componentMap.get(component)) return component;

  customElements.define(tagName, component, props);
  window.componentMap.set(component, tagName);

  return component;
};

/** Preserved element attributes mapping */
export const preservedProps: { [key: string]: string } = {
  className: 'class',
};

/**
 * Check is a node falsy.
 * @param node Element node to check.
 * @returns Is `node` falsy or not.
 */
export const isFalsyNode = (node: unknown) => {
  return node === false || node === undefined || node === null;
};

/**
 * Insert element or elements to node, depending on the actual type of `content`.
 * @param node Parent node to insert content to.
 * @param content Custom content elements to insert.
 */
export const appendContentToNode = (node: HTMLElement, content: ElementContent | ElementContent[]) => {
  if (isNodeListLike(content)) {
    for (const ele of content) {
      // IMPORTANT: filter falsy nodes out to allow syntaxes like `condition && renderSomething()`
      if (isFalsyNode(ele)) continue;
      if (Array.isArray(ele)) {
        appendContentToNode(node, ele);
        continue;
      }
      node.append(ele);
    }
  } else {
    node.append(content as Node);
  }
};
