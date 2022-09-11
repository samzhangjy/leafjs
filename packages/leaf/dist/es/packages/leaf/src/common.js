const componentMap = new WeakMap();
/**
 * Check if element is NodeList-like.
 * @param content Element to check.
 * @returns Is `content` having structures like `NodeList`.
 */

const isNodeListLike = content => {
  return HTMLCollection.prototype.isPrototypeOf(content) || NodeList.prototype.isPrototypeOf(content) || Array.isArray(content);
};
/**
 * Check if element is Node-like.
 * @param content Element to check.
 * @returns Is `content` having structures like `Node`.
 */

const isNodeLike = content => {
  return typeof content.nodeType !== 'undefined' || typeof content === 'string' || typeof content === 'number';
};
/**
 * Register a leaf component to `CustomElementsRegistery`.
 * @param tagName Tag name to use in templates.
 * @param component a defined `LeafComponent` class.
 * @returns A function used to create the custom component.
 */

const registerComponent = (tagName, component, props) => {
  customElements.define(tagName, component, props);
  componentMap.set(component, tagName);
  return (props, ...args) => {
    return new component(props, ...args);
  };
};
/** Preserved element attributes mapping */

const preservedProps = {
  className: 'class'
};
/**
 * Check is a node falsy.
 * @param node Element node to check.
 * @returns Is `node` falsy or not.
 */

const isFalsyNode = node => {
  return node === false || node === undefined || node === null;
};
/**
 * Insert element or elements to node, depending on the actual type of `content`.
 * @param node Parent node to insert content to.
 * @param content Custom content elements to insert.
 */

const appendContentToNode = (node, content) => {
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
    node.append(content);
  }
};

export { appendContentToNode, componentMap, isFalsyNode, isNodeLike, isNodeListLike, preservedProps, registerComponent };
//# sourceMappingURL=common.js.map
