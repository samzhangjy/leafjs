import { ReactiveObject } from '@leaf-web/reactivity';
export { Reactive } from '@leaf-web/reactivity';

declare type ElementContent = Node | string;
declare type ElementProps = Record<string, string>;
/**
 * Register a leaf component to `CustomElementsRegistery`.
 * @param tagName Tag name to use in templates.
 * @param component a defined `LeafComponent` class.
 * @returns A function used to create the custom component.
 */
declare const registerComponent: (tagName: string, component: CustomElementConstructor, props?: ElementDefinitionOptions) => (...args: unknown[]) => HTMLElement;

declare const baseClassComponents: Record<string, typeof HTMLElement>;
declare const baseComponents: Record<string, (...args: unknown[]) => HTMLElement>;

declare type LeafComponentRenderResult = HTMLElement | HTMLElement[];
declare type LeafEventHandler = (e: Event) => unknown;
/**
 * Create a new `HTMLElement` with given information.
 * @param tag Element tag.
 * @param content Optional element initial content.
 * @param props Optional element attributes.
 * @returns Created HTML element.
 */
declare const createElement: (tag: string, content?: ElementContent | ElementProps, props?: ElementProps) => HTMLElement;
/**
 * Invoke a function with either invoking one-by-one through a list or invoking directly.
 * @param elements Element or element list.
 * @param callback Function to invoke.
 */
declare const runCallbackOnElements: (elements: LeafComponentRenderResult, callback: (element: HTMLElement) => void) => void;
/**
 * Core Leaf component class.
 *
 * This class is a thin wrapper of `HTMLElement` class and integrates a shadow DOM within.
 */
declare class LeafComponent extends HTMLElement {
    #private;
    constructor();
    /** Component inner state. */
    get state(): ReactiveObject;
    /** {@inheritDoc LeafComponent.state} */
    set state(value: ReactiveObject);
    /**
     * Start component lifecycle.
     *
     * This function is invoked when the first initialization of the component.
     */
    connectedCallback(): void;
    /**
     * Core rendering logic of a component.
     * @returns HTML element to be rendered and attached.
     */
    render(): LeafComponentRenderResult;
    /**
     * Inject CSS stylesheet to component. If not given, leaf will inject an empty string by default.
     *
     * Not to be confused with the builtin prop `style`.
     * @returns CSS stylesheet string.
     */
    css(): string;
}

export { baseClassComponents as HTMLClassElements, baseComponents as HTMLElements, LeafComponent, LeafComponentRenderResult, LeafEventHandler, createElement, registerComponent, runCallbackOnElements };
