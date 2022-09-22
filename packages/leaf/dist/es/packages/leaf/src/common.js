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
 * @param props extra params to pass to `customElements.define`.
 * @param allowMultiple allow multiple registers with the same component for different names.
 * @returns The `component` class.
 */

const registerComponent = (tagName, component, props, allowMultiple) => {
  // initialize component map
  if (!window.componentMap) {
    window.componentMap = new WeakMap();
  } // don't register if component is already registered in the registery
  // IMPORTANT: don't check `customElements` but instead check `componentMap`
  // to ensure one component instance can only register once


  if (!allowMultiple && window.componentMap.get(component)) return component;
  customElements.define(tagName, component, props);
  window.componentMap.set(component, tagName);
  return component;
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

export { appendContentToNode, isFalsyNode, isNodeLike, isNodeListLike, preservedProps, registerComponent };
//# sourceMappingURL=common.js.map
