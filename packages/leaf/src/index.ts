import { Reactive, ReactiveObject } from '@leaf-web/reactivity';
import {
  appendContentToNode,
  componentMap,
  ElementContent,
  ElementProps,
  isNodeLike,
  isNodeListLike,
  preservedProps,
} from './common';

export type LeafComponentRenderResult = HTMLElement | HTMLElement[];
export type LeafEventHandler = (e: Event) => unknown;

type EventListener = { name: string; handler: LeafEventHandler };
export type EventListenerMap = WeakMap<HTMLElement, Set<EventListener>>;

export type LeafComponentProps = { [key: string]: any };

export const eventListeners: EventListenerMap = new WeakMap();
/** Attributes to be updated specially, such as `input.value` vs `input.attributes.value` */
export const directPropUpdate = [{ name: 'value', attr: 'value' }];

/**
 * Check if an attribute is an event handler.
 * @param propName Attribute name to check.
 * @param _propContent Attribute value to assert.
 * @returns Is this attribute an event handler.
 */
export const isEventListener = (propName: string, _propContent: any): _propContent is LeafEventHandler => {
  return propName.startsWith('on');
};

/**
 * Check is a node an element node.
 * @param node `Node` object to check.
 * @returns Is `node` an element node.
 */
export const isElement = (node: Node): node is HTMLElement => {
  return node.nodeType === Node.ELEMENT_NODE;
};

const _createElement = (
  tag: string | typeof LeafComponent,
  props?: Record<string, string | LeafEventHandler>,
  content?: ElementContent | ElementContent[]
): HTMLElement => {
  if (typeof tag !== 'string') {
    const tagName = componentMap.get(tag);
    if (!tagName) throw new Error('Unable to fetch component from registery.');
    else tag = tagName;
  }

  const element = document.createElement(tag);
  const listeners = new Set<EventListener>();
  for (const prop in props) {
    const propContent = typeof props[prop] === 'object' ? JSON.stringify(props[prop]) : props[prop];

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
  tag: string | typeof LeafComponent,
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
  tag: string | typeof LeafComponent,
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
      for (const specialProp of directPropUpdate) {
        if (specialProp.name !== attr.name) continue;
        // @ts-ignore
        oldParent[specialProp.name] = attr.value;
      }
    }

    for (const attr of oldAttributes) {
      // only remove the attribute if it's not in the new element
      if (newParent.hasAttribute(attr.name)) continue;
      oldParent.removeAttribute(attr.name);
    }
  }

  let i, j;

  for (i = 0, j = 0; Math.max(i, j) < Math.min(oldLen, newLen); i++, j++) {
    let oldChild = oldChildren[i];
    const newChild = newChildren[j];

    // IMPORTANT: filter out preserved elements, in this case `<style />` tag
    if (isElement(oldChild) && oldChild.hasAttribute('leaf-preserve')) {
      oldChild = oldChildren[++i];
      oldLen--;
    }

    if (isElement(oldChild) && isElement(newChild) && oldChild.tagName !== newChild.tagName) {
      let referenceElement = oldChild.previousSibling;

      oldChild.outerHTML = oldChild.outerHTML
        .replace(new RegExp(`<${oldChild.tagName.toLowerCase()}(.*?)`, 'g'), `<${newChild.tagName.toLowerCase()}$1`)
        .replace(new RegExp(`</${oldChild.tagName.toLowerCase()}(.*?)`, 'g'), `</${newChild.tagName.toLowerCase()}$1`);

      // IMPORTANT: setting outerHTML will not update the element reference itself,
      // so refreshing the element by a reference element is needed
      if (referenceElement) {
        oldChild = referenceElement.nextSibling as Node;
      } else {
        oldChild = oldParent.firstChild as Node;
      }

      if (!isElement(oldChild)) continue;
    }

    if (oldChild.nodeType === Node.TEXT_NODE && newChild.nodeType === Node.TEXT_NODE) {
      if (oldChild.textContent === newChild.textContent) continue;
      oldParent.replaceChild(newChild, oldChild);
      continue;
    }

    patchElements(Array.from(oldChild.childNodes), Array.from(newChild.childNodes), oldChild, newChild);
  }

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
    oldChildren.slice(newLen).forEach((child) => {
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
  #previousRenderResult: HTMLElement[] | null = null;
  #shadow: ShadowRoot | null = null;

  // static observedAttributes = ['value'];

  constructor(_props: LeafComponentProps, ..._args: unknown[]) {
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

  /** Component props. */
  get props(): LeafComponentProps {
    const props: LeafComponentProps = {};
    for (const attr of this.attributes) {
      props[attr.name] = attr.value;
    }
    return props;
  }

  /** Event listeners attached to component. */
  get listeners(): EventListener[] {
    return Array.from(getEventListenerOf(this) || []);
  }

  /**
   * Dispatch a custom event to listeners.
   * @param event Event object or name to fire.
   * @param data Extra data to pass to `CustomEvent.detail`.
   * @returns Is the fired event's `preventDefault` hook called.
   */
  fireEvent(event: string | Event, data?: Record<string, any>): boolean {
    if (event instanceof Event) {
      // stop bubbling to prevent multiple invokation of the event
      event.stopPropagation();
      return this.fireEvent(event.type, data);
    }
    const toDispatch = new CustomEvent(event, { detail: data });
    return this.dispatchEvent(toDispatch);
  }

  /**
   * Rerender the component based on current state.
   */
  rerender() {
    if (!this.#shadow) return;

    let renderResult = this.render();
    if (!Array.isArray(renderResult)) renderResult = [renderResult];

    if (!this.#previousRenderResult) {
      mountElements(renderResult, this.#shadow);
      this.#previousRenderResult = renderResult;
      return;
    }

    patchElements(Array.from(this.#shadow.childNodes), Array.from(renderResult), this.#shadow, renderResult[0]);
    this.#previousRenderResult = renderResult;
  }

  /**
   * Start component lifecycle.
   *
   * This function is invoked when the first initialization of the component.
   */
  connectedCallback() {
    this.#shadow = this.attachShadow({ mode: 'closed' });
    const styleElement = createElement('style');
    const styler = this.css ?? this.#defaultStyler;

    styleElement.textContent = styler();
    styleElement.setAttribute('leaf-preserve', 'true');
    this.#shadow.appendChild(styleElement);

    if (!this.#reactiveInstance) {
      this.rerender();
      return;
    }

    this.#reactiveInstance?.onStateChange(() => this.rerender());
  }

  attributeChangedCallback() {
    // rerender when attributes changed
    this.rerender();
  }

  #defaultStyler() {
    return '';
  }

  /**
   * Core rendering logic of a component.
   * @returns HTML element to be rendered and attached.
   */
  render(): LeafComponentRenderResult {
    throw new Error('Render function of `LeafComponent` must be overrided.');
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
