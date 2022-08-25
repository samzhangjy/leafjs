import { watchEffect } from './reactive';

export type LeafComponentRenderResult = HTMLElement | HTMLElement[];
export type ElementContent = Node | string | HTMLCollection | NodeList;
export type ElementProps = Record<string, string>;

const isNodeListLike = (content: any) => {
  return (
    HTMLCollection.prototype.isPrototypeOf(content) ||
    NodeList.prototype.isPrototypeOf(content) ||
    Array.isArray(content)
  );
};

const isNodeLike = (content: any) => {
  return typeof content.nodeType !== 'undefined' || typeof content === 'string' || typeof content === 'number';
};

const _createElement = (tag: string, props?: Record<string, string>, content?: ElementContent): HTMLElement => {
  const element = document.createElement(tag);
  for (const prop in props) {
    element.setAttribute(prop, props[prop]);
  }
  if (content) {
    if (isNodeListLike(content)) {
      for (const ele of content as HTMLCollection) {
        element.append(ele);
      }
    } else {
      element.append(content as Node);
    }
  }
  return element;
};

/**
 * Create a new `HTMLElement` with given information.
 * @param tag Element tag.
 * @param props Optional element attributes.
 * @param content Optional element initial content.
 * @returns Created HTML element.
 */
export const createElement = (
  tag: string,
  props?: ElementProps | ElementContent,
  content?: ElementContent
): HTMLElement => {
  if (typeof props === 'undefined') return _createElement(tag);
  if (isNodeLike(props) || isNodeListLike(props)) {
    return _createElement(tag, {}, props as ElementContent);
  }
  return _createElement(tag, props as ElementProps, content);
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
      callback(ele);
    }
  } else {
    callback(elements as HTMLElement);
  }
};

/**
 * Core Leaf component class.
 *
 * This class is a thin wrapper of `HTMLElement` class and integrates a shadow DOM within.
 */
export class LeafComponent extends HTMLElement {
  constructor() {
    super();
  }

  /**
   * Start component lifecycle.
   *
   * This function is invoked when the first initialization of the component.
   */
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    let renderResult: LeafComponentRenderResult | null = null;
    const styleElement = createElement('style');
    const styler = this.css ?? this.#defaultStyler;

    styleElement.textContent = styler();
    shadow.appendChild(styleElement);

    watchEffect(() => {
      if (renderResult) {
        runCallbackOnElements(renderResult, (ele) => shadow.removeChild(ele));
      }

      renderResult = this.render();
      runCallbackOnElements(renderResult, (ele) => shadow.appendChild(ele));
    });
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

/**
 * Register a leaf component to `CustomElementsRegistery`.
 * @param tagName Tag name to use in templates.
 * @param component a defined `LeafComponent` class.
 */
export const registerComponent = (tagName: string, component: CustomElementConstructor) => {
  customElements.define(tagName, component);
};

export { reactive, watchEffect } from './reactive';
