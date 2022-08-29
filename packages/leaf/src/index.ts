import { Reactive, ReactiveObject } from './reactive';

export type LeafComponentRenderResult = HTMLElement | HTMLElement[];
export type ElementContent = Node | string;
export type ElementProps = Record<string, string>;
export type NodeLike = Node | string | HTMLCollection | NodeList | Node[] | string[];
export type HTMLElementProps = Record<string, string>;
export type LeafBaseComponent = { name: string; extends: typeof HTMLElement };

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
    const shadow = this.attachShadow({ mode: 'open' });
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
