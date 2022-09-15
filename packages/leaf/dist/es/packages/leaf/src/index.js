import { __classPrivateFieldGet, __classPrivateFieldSet } from '../../../node_modules/tslib/tslib.es6.js';
import { Reactive } from '../../reactivity/dist/es/index.js';
export { Reactive } from '../../reactivity/dist/es/index.js';
import { isNodeLike, isNodeListLike, componentMap, preservedProps, appendContentToNode } from './common.js';
export { registerComponent } from './common.js';

var _LeafComponent_instances, _LeafComponent_state, _LeafComponent_reactiveInstance, _LeafComponent_previousRenderResult, _LeafComponent_shadow, _LeafComponent_key, _LeafComponent_isMounted, _LeafComponent_defaultStyler;
const eventListeners = new WeakMap();
/** Attributes to be updated specially, such as `input.value` vs `input.attributes.value` */

const directPropUpdate = [{
  name: 'value',
  attr: 'value'
}];
const reactiveInstances = new Map();
/**
 * Check if an attribute is an event handler.
 * @param propName Attribute name to check.
 * @param _propContent Attribute value to assert.
 * @returns Is this attribute an event handler.
 */

const isEventListener = (propName, _propContent) => {
  return propName.startsWith('on');
};
/**
 * Check is a node an element node.
 * @param node `Node` object to check.
 * @returns Is `node` an element node.
 */

const isElement = node => {
  return node.nodeType === Node.ELEMENT_NODE;
};

const isLeafComponent = element => {
  return element.isLeafComponent === true;
};

const isTextNode = node => {
  return node.nodeType === Node.TEXT_NODE;
};
/**
 * Check is a value a valid Leaf attribute.
 * @param attr Attribute value to check.
 * @returns Is `attr` a valid Leafjs attribute.
 */


const isValidAttribute = attr => {
  return typeof attr === 'string' || typeof attr === 'number' || typeof attr === 'boolean';
};

const _createElement = (tag, props, content) => {
  if (typeof tag !== 'string') {
    const tagName = componentMap.get(tag);
    if (!tagName) throw new Error('Unable to fetch component from registery.');else tag = tagName;
  }

  const element = document.createElement(tag);
  const listeners = new Set();

  for (const prop in props) {
    const propContent = props[prop];

    if (isEventListener(prop)) {
      const listenerName = prop.substring(2).toLowerCase();
      listeners.add({
        name: listenerName,
        handler: propContent
      });
      element.addEventListener(listenerName, propContent);
      continue;
    }

    if (isLeafComponent(element)) {
      element.props[prop] = propContent;
      if (!isValidAttribute(propContent)) continue;
    }

    if (prop in preservedProps) {
      element.setAttribute(preservedProps[prop], propContent);
    } else {
      element.setAttribute(prop, propContent);
    }
  }

  eventListeners.set(element, listeners);

  if (content) {
    appendContentToNode(element, content);
  }

  return element;
};
/**
 * Create a new `HTMLElement` with given information.
 * @param tag Element tag.
 * @param content Optional element initial content.
 * @param props Optional element attributes.
 * @returns Created HTML element.
 */


const createElement = (tag, content, props) => {
  if (typeof content === 'undefined') return _createElement(tag);

  if (!isNodeLike(content) && !isNodeListLike(content)) {
    return _createElement(tag, content);
  }

  return _createElement(tag, props, content);
};
/**
 * Create a new `HTMLElement` with given information, `React.createElement` style.
 * @param tag Element tag.
 * @param props Optional element attributes.
 * @param content Optional element initial content.
 * @returns Created HTML element.
 */

const createElementReactStyle = (tag, props, ...content) => {
  if (!content) return createElement(tag, props !== null && props !== void 0 ? props : {});
  return createElement(tag, content, props !== null && props !== void 0 ? props : {});
};
/**
 * Get event listeners of an element created by `createElement`.
 * @param element Element to check event listner list
 * @returns A set of event listener objects.
 */

const getEventListenerOf = element => {
  if (!eventListeners.has(element)) return undefined;
  return eventListeners.get(element);
};
const setEventListenerOf = (element, listeners) => {
  eventListeners.set(element, listeners || new Set());
};
const deleteEventListenerOf = element => {
  return eventListeners.delete(element);
};
/**
 * Invoke a function with either invoking one-by-one through a list or invoking directly.
 * @param elements Element or element list.
 * @param callback Function to invoke.
 */

const runCallbackOnElements = (elements, callback) => {
  if (isNodeListLike(elements)) {
    for (const ele of elements) {
      if (Array.isArray(ele)) {
        runCallbackOnElements(ele, callback);
        continue;
      }

      callback(ele);
    }
  } else {
    callback(elements);
  }
};
/**
 * Mount a list of elements to DOM.
 * @param children A list of children to mount.
 * @param container The container DOM element to contain the children.
 */

const mountElements = (children, container) => {
  children.forEach(child => {
    container.appendChild(child);
  });
};
/**
 * Patch an element from one state to another.
 * @param oldChildren Children of `oldParent`.
 * @param newChildren Children of `newParent`.
 * @param oldParent The previously existing DOM element to patch.
 * @param newParent The newly generated element, unattached to DOM.
 */

const patchElements = (oldChildren, newChildren, oldParent, newParent) => {
  if (!oldParent) return;
  let oldLen = oldChildren.length,
      newLen = newChildren.length;

  if (isElement(oldParent) && isElement(newParent)) {
    // replace event listeners
    const oldEventListener = getEventListenerOf(oldParent);
    const newEventListener = getEventListenerOf(newParent);
    oldEventListener === null || oldEventListener === void 0 ? void 0 : oldEventListener.forEach(value => {
      oldParent.removeEventListener(value.name, value.handler);
    });
    newEventListener === null || newEventListener === void 0 ? void 0 : newEventListener.forEach(value => {
      oldParent.addEventListener(value.name, value.handler);
    }); // IMPORTANT: update the event listener registery for future use

    setEventListenerOf(oldParent, newEventListener);
    deleteEventListenerOf(newParent);
  }

  for (let i = 0, j = 0; Math.max(i, j) < Math.min(oldLen, newLen); i++, j++) {
    let oldChild = oldChildren[i];
    const newChild = newChildren[j]; // IMPORTANT: filter out preserved elements, in this case `<style />` tag

    if (isElement(oldChild) && oldChild.hasAttribute('leaf-preserve')) {
      oldChild = oldChildren[++i];
      oldLen--;
    } // special optimizing for Leaf components


    if (isLeafComponent(oldChild)) oldChild.isUpdating = true;
    if (isLeafComponent(newChild)) newChild.isUpdating = true; // process attributes here so `connectedCallback` will receive the correct attribute

    if (isElement(oldChild) && isElement(newChild)) {
      // replace attributes
      const oldAttributes = Array.prototype.slice.call(oldChild.attributes);
      const newAttributes = Array.prototype.slice.call(newChild.attributes);

      for (const attr of newAttributes) {
        // don't assign objects to attributes, assign to properties only
        if (!isValidAttribute(attr.value) || oldChild.getAttribute(attr.name) === attr.value) continue;
        oldChild.setAttribute(attr.name, attr.value);

        for (const specialProp of directPropUpdate) {
          if (specialProp.name !== attr.name) continue; // @ts-ignore

          oldChild[specialProp.name] = attr.value;
        }
      }

      for (const attr of oldAttributes) {
        // only remove the attribute if it's not in the new element
        if (newChild.hasAttribute(attr.name)) continue;
        oldChild.removeAttribute(attr.name);
      }
    }

    if (isElement(oldChild) && isElement(newChild) && oldChild.tagName !== newChild.tagName) {
      let referenceElement = oldChild.previousSibling;
      oldChild.outerHTML = oldChild.outerHTML.replace(new RegExp(`<${oldChild.tagName.toLowerCase()}(.*?)`, 'g'), `<${newChild.tagName.toLowerCase()}$1`).replace(new RegExp(`</${oldChild.tagName.toLowerCase()}(.*?)`, 'g'), `</${newChild.tagName.toLowerCase()}$1`); // IMPORTANT: setting outerHTML will not update the element reference itself,
      // so refreshing the element by a reference element is needed

      if (referenceElement) {
        oldChild = referenceElement.nextSibling;
      } else {
        oldChild = oldParent.firstChild;
      }

      if (!isElement(oldChild)) continue;
      if (isLeafComponent(oldChild)) oldChild.isUpdating = true;
    } // update properties for Leaf components


    if (isLeafComponent(oldChild) && isLeafComponent(newChild)) {
      // always keep attributes and props in-sync
      for (const attr of newChild.attributes) {
        // property is higher than attributes
        if (attr.name in newChild.props) continue;
        oldChild.props[attr.name] = attr.value;
      }

      for (const prop in newChild.props) {
        oldChild.props[prop] = newChild.props[prop];
      }

      for (const prop in oldChild.props) {
        if (prop in newChild.props || newChild.hasAttribute(prop)) continue;
        delete oldChild.props[prop];
      }
    }

    if (isTextNode(oldChild) && isTextNode(newChild)) {
      if (oldChild.textContent === newChild.textContent) continue;
      oldParent.replaceChild(newChild, oldChild);
      continue;
    }

    if (isTextNode(oldChild) && isElement(newChild)) {
      oldParent.replaceChild(newChild, oldChild);
      oldChild = newChild;
      if (isLeafComponent(oldChild)) oldChild.isUpdating = true;
    }

    if (isElement(oldChild) && isTextNode(newChild)) {
      oldParent.replaceChild(newChild, oldChild);
      continue;
    }

    patchElements(Array.from(oldChild.childNodes), Array.from(newChild.childNodes), oldChild, newChild);

    if (isLeafComponent(oldChild)) {
      oldChild.isUpdating = false;
      oldChild.rerender();
    }
  } // insert new elements


  if (newLen > oldLen) {
    newChildren.slice(oldLen).forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        oldParent.appendChild(child);
        return;
      }

      mountElements([child], oldParent);
    });
    return;
  } // remove old elements


  if (newLen < oldLen) {
    oldChildren.slice(newLen).forEach(child => {
      oldParent.removeChild(child);
    });
  }
};
/**
 * Helper function for defining CSS stylesheets.
 * @param styles Stylesheet string.
 * @returns Stylesheet string.
 */

const css = (styles, ...keys) => {
  let constructedStyle = '';
  let curKeyIndex = 0;
  styles.forEach(style => {
    constructedStyle += style + keys[curKeyIndex++];
  });
  return constructedStyle;
};
/**
 * Core Leaf component class.
 *
 * This class is a thin wrapper of `HTMLElement` class and integrates a shadow DOM within.
 */

class LeafComponent extends HTMLElement {
  constructor() {
    super();

    _LeafComponent_instances.add(this);

    _LeafComponent_state.set(this, null);

    _LeafComponent_reactiveInstance.set(this, null);

    _LeafComponent_previousRenderResult.set(this, null);

    _LeafComponent_shadow.set(this, null);

    _LeafComponent_key.set(this, undefined);

    _LeafComponent_isMounted.set(this, false);

    this.props = {};
    this.isLeafComponent = true;
    this.isUpdating = false;
    const props = {}; // initialize properties

    for (const attr of this.constructor.observedAttributes) {
      props[attr] = null;
    }

    const outerThis = this;

    const checkIsPropValid = (key, value) => {
      if (!this.constructor.observedAttributes.includes(key)) {
        // throw an error if `key` isn't defined by the component
        throw new Error(`Unknown property ${key}. Expected one of ${this.constructor.observedAttributes.map(attr => `'${attr}'`).join(', ')}.`);
      }

      if (Array.isArray(this.constructor.watchedProps) || !(key in this.constructor.watchedProps) || value === undefined || value === null || this.isUpdating) return;

      if (this.constructor.watchedProps[key] !== value.constructor) {
        throw new TypeError(`Types of property '${key}' unmatch: expected ${this.constructor.watchedProps[key].name}, got ${value.constructor.name}`);
      }
    };

    const previousPropChange = {
      name: '',
      value: null
    };
    this.props = new Proxy(props, {
      get(target, key, receiver) {
        checkIsPropValid(key);
        return Reflect.get(target, key, receiver);
      },

      set(target, key, value, receiver) {
        checkIsPropValid(key, value);
        const result = Reflect.set(target, key, value, receiver);

        if (__classPrivateFieldGet(outerThis, _LeafComponent_isMounted, "f") && key !== 'key' && (previousPropChange.name !== key || previousPropChange.value !== value)) {
          outerThis.onPropChange(key, value);
          previousPropChange.name = key;
          previousPropChange.value = value;
        }

        if (__classPrivateFieldGet(outerThis, _LeafComponent_isMounted, "f")) outerThis.rerender();
        return result;
      },

      has(_target, key) {
        return outerThis.constructor.observedAttributes.includes(key);
      },

      deleteProperty(target, key) {
        checkIsPropValid(key);
        return Reflect.deleteProperty(target, key);
      }

    });
  }

  static get observedAttributes() {
    const userProps = [];

    if (!Array.isArray(this.watchedProps)) {
      for (const key in this.watchedProps) {
        userProps.push(key);
      }
    } else {
      userProps.push(...this.watchedProps);
    }

    return [...userProps, 'key'];
  }

  setState(newState) {
    __classPrivateFieldSet(this, _LeafComponent_state, newState, "f");
  }

  getState() {
    if (!__classPrivateFieldGet(this, _LeafComponent_isMounted, "f")) return {};
    return __classPrivateFieldGet(this, _LeafComponent_state, "f");
  }
  /** Component inner state. */


  get state() {
    return this.getState();
  }
  /** {@inheritDoc LeafComponent.state} */


  set state(value) {
    this.setState(value);
  }
  /** Event listeners attached to component. */


  get listeners() {
    return Array.from(getEventListenerOf(this) || []);
  }
  /**
   * Dispatch a custom event to listeners.
   * @param event Event object or name to fire.
   * @param data Extra data to pass to `CustomEvent.detail`.
   * @returns Is the fired event's `preventDefault` hook called.
   */


  fireEvent(event, data) {
    if (event instanceof Event) {
      // stop bubbling to prevent multiple invokation of the event
      event.stopPropagation();
      return this.fireEvent(event.type, data);
    }

    const toDispatch = new CustomEvent(event, {
      detail: data
    });
    return this.dispatchEvent(toDispatch);
  }
  /**
   * Rerender the component based on current state.
   */


  rerender() {
    var _a;

    if (!__classPrivateFieldGet(this, _LeafComponent_shadow, "f") || this.isUpdating || !__classPrivateFieldGet(this, _LeafComponent_isMounted, "f") || ((_a = __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f")) === null || _a === void 0 ? void 0 : _a.isSetting)) return;
    if (__classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f")) __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f").isSetting = true;

    if (!__classPrivateFieldGet(this, _LeafComponent_previousRenderResult, "f")) {
      this.onMounted();
    } else {
      this.onRerender();
    }

    let renderResult = this.render();
    if (!Array.isArray(renderResult)) renderResult = [renderResult];
    if (__classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f")) __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f").isSetting = false;

    if (!__classPrivateFieldGet(this, _LeafComponent_previousRenderResult, "f")) {
      mountElements(renderResult, __classPrivateFieldGet(this, _LeafComponent_shadow, "f"));

      __classPrivateFieldSet(this, _LeafComponent_previousRenderResult, renderResult, "f");

      return;
    }

    patchElements(Array.from(__classPrivateFieldGet(this, _LeafComponent_shadow, "f").childNodes), Array.from(renderResult), __classPrivateFieldGet(this, _LeafComponent_shadow, "f"), renderResult[0]);

    __classPrivateFieldSet(this, _LeafComponent_previousRenderResult, renderResult, "f");
  }
  /**
   * Callback when the component is mounted.
   */


  onMounted() {
    return;
  }
  /**
   * Callback when the component is about to perform a rerender.
   */


  onRerender() {
    return;
  }
  /**
   * Callback when a property of the component has changed.
   * @param name Name of changed property.
   * @param newValue The updated value of property.
   */


  onPropChange(name, newValue) {
    return;
  }
  /**
   * Start component lifecycle.
   *
   * This function is invoked when the first initialization of the component.
   */


  connectedCallback() {
    var _a, _b, _c, _d, _e;

    __classPrivateFieldSet(this, _LeafComponent_isMounted, true, "f");

    __classPrivateFieldSet(this, _LeafComponent_shadow, this.attachShadow({
      mode: 'closed'
    }), "f");

    const styleElement = createElement('style');
    const styler = (_a = this.css) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _LeafComponent_instances, "m", _LeafComponent_defaultStyler);
    styleElement.textContent = styler();
    styleElement.setAttribute('leaf-preserve', 'true');

    __classPrivateFieldGet(this, _LeafComponent_shadow, "f").appendChild(styleElement);

    const currentInstance = reactiveInstances.get(__classPrivateFieldGet(this, _LeafComponent_key, "f") || ''); // adopt the previous reactive data, if any

    if (currentInstance) __classPrivateFieldSet(this, _LeafComponent_reactiveInstance, currentInstance, "f"); // or create a new one
    else __classPrivateFieldSet(this, _LeafComponent_reactiveInstance, new Reactive(), "f");

    if ((_b = __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f")) === null || _b === void 0 ? void 0 : _b.actualState) {
      __classPrivateFieldSet(this, _LeafComponent_state, __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f").actualState, "f");
    } else {
      __classPrivateFieldSet(this, _LeafComponent_state, (_c = __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f")) === null || _c === void 0 ? void 0 : _c.build((_d = __classPrivateFieldGet(this, _LeafComponent_state, "f")) !== null && _d !== void 0 ? _d : {}), "f");
    } // IMPORTANT: only set the current `Reactive` instance when the key is valid


    if (__classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f") && __classPrivateFieldGet(this, _LeafComponent_key, "f")) reactiveInstances.set(__classPrivateFieldGet(this, _LeafComponent_key, "f"), __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f"));
    (_e = __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f")) === null || _e === void 0 ? void 0 : _e.onStateChange(() => this.rerender());
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return; // handle keying

    if (name === 'key') {
      __classPrivateFieldSet(this, _LeafComponent_key, newVal, "f");
    } // rerender when attributes changed


    if (!Array.isArray(this.constructor.watchedProps)) {
      if (this.constructor.watchedProps[name] === Number) this.props[name] = parseFloat(newVal);else this.props[name] = newVal;
    } else {
      this.props[name] = newVal;
    }
  }
  /**
   * Core rendering logic of a component.
   * @returns HTML element to be rendered and attached.
   */


  render() {
    throw new Error('Render function of `LeafComponent` must be overrided.');
  }
  /**
   * Inject CSS stylesheet to component. If not given, leaf will inject an empty string by default.
   *
   * Not to be confused with the builtin prop `style`.
   * @returns CSS stylesheet string.
   */


  css() {
    return '';
  }

}
_LeafComponent_state = new WeakMap(), _LeafComponent_reactiveInstance = new WeakMap(), _LeafComponent_previousRenderResult = new WeakMap(), _LeafComponent_shadow = new WeakMap(), _LeafComponent_key = new WeakMap(), _LeafComponent_isMounted = new WeakMap(), _LeafComponent_instances = new WeakSet(), _LeafComponent_defaultStyler = function _LeafComponent_defaultStyler() {
  return '';
};
LeafComponent.watchedProps = [];

export { LeafComponent, createElement, createElementReactStyle, css, deleteEventListenerOf, directPropUpdate, eventListeners, getEventListenerOf, isElement, isEventListener, isValidAttribute, mountElements, patchElements, reactiveInstances, runCallbackOnElements, setEventListenerOf };
//# sourceMappingURL=index.js.map
