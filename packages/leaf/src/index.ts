import { Reactive, ReactiveObject } from '@leaf-web/reactivity';
import { isNodeListLike, isNodeLike, appendContentToNode, ElementContent, ElementProps } from './common';

export type LeafComponentRenderResult = HTMLElement | HTMLElement[];

const _createElement = (tag: string, props?: Record<string, string>, content?: ElementContent): HTMLElement => {
  const element = document.createElement(tag);
  for (const prop in props) {
    element.setAttribute(prop, props[prop]);
  }
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
  content?: ElementContent | ElementProps,
  props?: ElementProps
): HTMLElement => {
  if (typeof content === 'undefined') return _createElement(tag);
  if (isNodeLike(content) || isNodeListLike(content)) {
    return _createElement(tag, {}, content as ElementContent);
  } else if (!props) {
    return _createElement(tag, content as ElementProps);
  }
  return _createElement(tag, props, content as ElementContent);
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
    const styleElement = createElement('style');
    const styler = this.css ?? this.#defaultStyler;

    styleElement.textContent = styler();
    shadow.appendChild(styleElement);

    const renderComponent = () => {
      if (renderResult) {
        runCallbackOnElements(renderResult, (ele) => shadow.removeChild(ele));
      }

      renderResult = this.render();
      runCallbackOnElements(renderResult, (ele) => shadow.appendChild(ele));
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
export { HTMLElements } from './baseElements';
export { registerComponent } from './common';
