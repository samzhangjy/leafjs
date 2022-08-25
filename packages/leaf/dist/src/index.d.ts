export declare type LeafComponentRenderResult = HTMLElement | HTMLElement[];
export declare type ElementContent = Node | string | HTMLCollection | NodeList;
export declare type ElementProps = Record<string, string>;
/**
 * Create a new `HTMLElement` with given information.
 * @param tag Element tag.
 * @param props Optional element attributes.
 * @param content Optional element initial content.
 * @returns Created HTML element.
 */
export declare const createElement: (tag: string, props?: ElementProps | ElementContent, content?: ElementContent) => HTMLElement;
/**
 * Invoke a function with either invoking one-by-one through a list or invoking directly.
 * @param elements Element or element list.
 * @param callback Function to invoke.
 */
export declare const runCallbackOnElements: (elements: LeafComponentRenderResult, callback: (element: HTMLElement) => void) => void;
/**
 * Core Leaf component class.
 *
 * This class is a thin wrapper of `HTMLElement` class and integrates a shadow DOM within.
 */
export declare class LeafComponent extends HTMLElement {
    #private;
    constructor();
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
/**
 * Register a leaf component to `CustomElementsRegistery`.
 * @param tagName Tag name to use in templates.
 * @param component a defined `LeafComponent` class.
 */
export declare const registerComponent: (tagName: string, component: CustomElementConstructor) => void;
export { reactive, watchEffect } from './reactive';
//# sourceMappingURL=index.d.ts.map