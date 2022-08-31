import { ReactiveObject } from '@leaf-web/reactivity';
import { ElementContent, ElementProps } from './common';
export declare type LeafComponentRenderResult = HTMLElement | HTMLElement[];
export declare type LeafEventHandler = (e: Event) => unknown;
/**
 * Create a new `HTMLElement` with given information.
 * @param tag Element tag.
 * @param content Optional element initial content.
 * @param props Optional element attributes.
 * @returns Created HTML element.
 */
export declare const createElement: (tag: string, content?: ElementContent | ElementProps, props?: ElementProps) => HTMLElement;
/**
 * Create a new `HTMLElement` with given information, `React.createElement` style.
 * @param tag Element tag.
 * @param props Optional element attributes.
 * @param content Optional element initial content.
 * @returns Created HTML element.
 */
export declare const createElementReactStyle: (tag: string, props?: ElementProps, content?: ElementContent) => HTMLElement;
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
export { Reactive } from '@leaf-web/reactivity';
export { HTMLClassElements, HTMLElements } from './baseElements';
export { registerComponent } from './common';
//# sourceMappingURL=index.d.ts.map