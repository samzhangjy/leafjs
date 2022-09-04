import { Reactive, ReactiveObject } from '@leaf-web/reactivity';
import {
  isNodeListLike,
  isNodeLike,
  appendContentToNode,
  ElementContent,
  ElementProps,
  preservedProps,
} from './common';

export type LeafComponentRenderResult = HTMLElement | HTMLElement[];
export type LeafEventHandler = (e: Event) => unknown;

type EventListener = { name: string; handler: LeafEventHandler };
export type EventListenerMap = WeakMap<HTMLElement, Set<EventListener>>;

export const eventListeners: EventListenerMap = new WeakMap();

export const isEventListener = (propName: string, _propContent: any): _propContent is LeafEventHandler => {
  return propName.startsWith('on');
};

export const isElement = (node: Node): node is HTMLElement => {
  return node.nodeType === Node.ELEMENT_NODE;
};

const _createElement = (
  tag: string,
  props?: Record<string, string | LeafEventHandler>,
  content?: ElementContent | ElementContent[]
): HTMLElement => {
  const element = document.createElement(tag);
  const listeners = new Set<EventListener>();
  for (const prop in props) {
    const propContent = props[prop];
    if (isEventListener(prop, propContent)) {
      const listenerName = prop.substring(2).toLowerCase();
      listeners.add({ name: listenerName, handler: propContent });
      element.addEventListener(listenerName, propContent);
      continue;
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
export const createElement = (
  tag: string,
  content?: ElementContent | ElementContent[] | ElementProps,
  props?: ElementProps
): HTMLElement => {
  if (typeof content === 'undefined') return _createElement(tag);
  if (!isNodeLike(content) && !isNodeListLike(content)) {
    return _createElement(tag, content as ElementProps);
  }
  return _createElement(tag, props, content as ElementContent);
};

/**
 * Create a new `HTMLElement` with given information, `React.createElement` style.
 * @param tag Element tag.
 * @param props Optional element attributes.
 * @param content Optional element initial content.
 * @returns Created HTML element.
 */
export const createElementReactStyle = (
  tag: string,
  props?: ElementProps,
  ...content: ElementContent[]
): HTMLElement => {
  if (!content) return createElement(tag, props ?? {});
  return createElement(tag, content, props ?? {});
};

/**
 * Get event listeners of an element created by `createElement`.
 * @param element Element to check event listner list
 * @returns A set of event listener objects.
 */
export const getEventListenerOf = (element: HTMLElement) => {
  if (!eventListeners.has(element)) return undefined;
  return eventListeners.get(element);
};

export const setEventListenerOf = (element: HTMLElement, listeners?: Set<EventListener>) => {
  eventListeners.set(element, listeners || new Set());
};

export const deleteEventListenerOf = (element: HTMLElement) => {
  return eventListeners.delete(element);
};

/**
 * Invoke a function with either invoking one-by-one through a list or invoking directly.
 * @param elements Element or element list.
 * @param callback Function to invoke.
 */
export const runCallbackOnElements = (
  elements: LeafComponentRenderResult,
  callback: (element: HTMLElement) => void
) => {
  if (isNodeListLike(elements)) {
    for (const ele of elements as HTMLElement[]) {
      if (Array.isArray(ele)) {
        runCallbackOnElements(ele, callback);
        continue;
      }
      callback(ele);
    }
  } else {
    callback(elements as HTMLElement);
  }
};

/**
 * Mount a list of elements to DOM.
 * @param children A list of children to mount.
 * @param container The container DOM element to contain the children.
 */
export const mountElements = (children: Node[], container: Node) => {
  children.forEach((child) => {
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
export const patchElements = (
  oldChildren: (HTMLElement | Node)[],
  newChildren: Node[],
  oldParent: Node,
  newParent: Node
) => {
  if (!oldParent) return;

  let oldLen = oldChildren.length,
    newLen = newChildren.length;
  const commonLength = Math.min(oldLen, newLen);
  let hasPreserved = false;

  if (isElement(oldParent) && isElement(newParent)) {
    // replace event listeners
    const oldEventListener = getEventListenerOf(oldParent);
    const newEventListener = getEventListenerOf(newParent);

    oldEventListener?.forEach((value) => {
      oldParent.removeEventListener(value.name, value.handler);
    });

    newEventListener?.forEach((value) => {
      oldParent.addEventListener(value.name, value.handler);
    });

    // IMPORTANT: update the event listener registery for future use
    setEventListenerOf(oldParent, newEventListener);
    deleteEventListenerOf(newParent);

    // replace attributes
    const oldAttributes = oldParent.attributes;
    const newAttributes = newParent.attributes;

    for (const attr of newAttributes) {
      if (oldParent.getAttribute(attr.name) === attr.value) continue;
      oldParent.setAttribute(attr.name, attr.value);
    }

    for (const attr of oldAttributes) {
      // only remove the attribute if it's not in the new element
      if (newParent.hasAttribute(attr.name)) continue;
      oldParent.removeAttribute(attr.name);
    }
  }

  for (let i = 0; i < commonLength; i++) {
    let oldChild = oldChildren[i];
    const newChild = newChildren[i];

    // IMPORTANT: filter out preserved elements, in this case `<style />` tag
    if (isElement(oldChild) && oldChild.hasAttribute('leaf-preserve')) {
      oldChild = oldChildren[i + 1];
      hasPreserved = true;
    }

    if (isElement(oldChild) && isElement(newChild) && oldChild.tagName !== newChild.tagName) {
      oldChild.outerHTML = oldChild.outerHTML
        .replace(new RegExp(`<${oldChild.tagName.toLowerCase()}(.*?)`, 'g'), `<${newChild.tagName.toLowerCase()}$1`)
        .replace(new RegExp(`</${oldChild.tagName.toLowerCase()}(.*?)`, 'g'), `</${newChild.tagName.toLowerCase()}$1`);

      // IMPORTANT: setting outerHTML will not update the element reference itself,
      // so refreshing the element by accessing it through its parent is needed
      let elementIndex = 0;

      while (oldChild !== null) {
        elementIndex++;
        oldChild = oldChild.previousSibling as HTMLElement;
      }

      oldChild = oldParent.childNodes[elementIndex];
      if (!isElement(oldChild)) continue;
    }

    if (oldChild.nodeType === Node.TEXT_NODE && newChild.nodeType === Node.TEXT_NODE) {
      if (oldChild.textContent === newChild.textContent) continue;
      oldParent.replaceChild(newChild, oldChild);
      continue;
    }

    patchElements(Array.from(oldChild.childNodes), Array.from(newChild.childNodes), oldChild, newChild);
  }

  if (hasPreserved) oldLen--;

  // insert new elements
  if (newLen > oldLen) {
    newChildren.slice(oldLen).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        oldParent.appendChild(child);
        return;
      }
      mountElements([child], oldParent);
    });
    return;
  }

  // remove old elements
  if (newLen < oldLen) {
    oldChildren.slice(newLen).forEach((child, index) => {
      if (child.nodeType === Node.TEXT_NODE) {
        oldParent.removeChild(oldParent.childNodes[index]);
        return;
      }
      oldParent.removeChild(child);
    });
  }
};

/**
 * Core Leaf component class.
 *
 * This class is a thin wrapper of `HTMLElement` class and integrates a shadow DOM within.
 */
export class LeafComponent extends HTMLElement {
  #state: ReactiveObject | null = null;
  #reactiveInstance: Reactive | null = null;

  constructor() {
    super();
  }

  /** Component inner state. */
  get state(): ReactiveObject {
    return this.#state;
  }

  /** {@inheritDoc LeafComponent.state} */
  set state(value: ReactiveObject) {
    if (!this.#state) {
      this.#reactiveInstance = new Reactive();
      this.#state = this.#reactiveInstance.build(value);
      return;
    }
    this.#state = value;
  }

  /**
   * Start component lifecycle.
   *
   * This function is invoked when the first initialization of the component.
   */
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'closed' });
    let renderResult: LeafComponentRenderResult | null = null;
    let previousRenderResult: HTMLElement[] | null = null;
    const styleElement = createElement('style');
    const styler = this.css ?? this.#defaultStyler;

    styleElement.textContent = styler();
    styleElement.setAttribute('leaf-preserve', 'true');
    shadow.appendChild(styleElement);

    const renderComponent = () => {
      renderResult = this.render();
      if (!Array.isArray(renderResult)) renderResult = [renderResult];

      if (!previousRenderResult) {
        mountElements(renderResult, shadow);
        previousRenderResult = renderResult;
        return;
      }

      patchElements(Array.from(shadow.childNodes), Array.from(renderResult), shadow, renderResult[0]);
      previousRenderResult = renderResult;
    };

    if (!this.#reactiveInstance) {
      renderComponent();
      return;
    }

    this.#reactiveInstance?.onStateChange(renderComponent);
  }

  #defaultStyler() {
    return '';
  }

  /**
   * Core rendering logic of a component.
   * @returns HTML element to be rendered and attached.
   */
  render(): LeafComponentRenderResult {
    return this;
  }

  /**
   * Inject CSS stylesheet to component. If not given, leaf will inject an empty string by default.
   *
   * Not to be confused with the builtin prop `style`.
   * @returns CSS stylesheet string.
   */
  css(): string {
    return '';
  }
}

export { Reactive } from '@leaf-web/reactivity';
export { HTMLClassElements, HTMLElements } from './baseElements';
export { registerComponent } from './common';
