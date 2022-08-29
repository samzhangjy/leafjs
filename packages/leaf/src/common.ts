export type NodeLike = Node | string | HTMLCollection | NodeList | Node[] | string[];
export type ElementContent = Node | string;
export type ElementProps = Record<string, string>;

/**
 * Check if element is NodeList-like.
 * @param content Element to check.
 * @returns Is `content` having structures like `NodeList`.
 */
export const isNodeListLike = (content: any) => {
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
 */
export const registerComponent = (
  tagName: string,
  component: CustomElementConstructor,
  props?: ElementDefinitionOptions
) => {
  customElements.define(tagName, component, props);
};

/** Preserved element attributes mapping */
export const preservedProps: { [key: string]: string } = {
  className: 'class',
};

/**
 * Insert element or elements to node, depending on the actual type of `content`.
 * @param node Parent node to insert content to.
 * @param content Custom content elements to insert.
 */
export const appendContentToNode = (node: HTMLElement, content: ElementContent | ElementContent[]) => {
  if (isNodeListLike(content)) {
    // IMPORTANT: filter falsy nodes out to allow syntaxes like `condition && renderSomething()`
    content = [...(content as Node[])].filter((node) => node);
    for (const ele of content) {
      node.append(ele);
    }
  } else {
    node.append(content as Node);
  }
};
