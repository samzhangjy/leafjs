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
declare type EventListener = {
    name: string;
    handler: LeafEventHandler;
};
declare type EventListenerMap = WeakMap<HTMLElement, Set<EventListener>>;
declare const eventListeners: EventListenerMap;
declare const isEventListener: (propName: string, _propContent: any) => _propContent is LeafEventHandler;
declare const isElement: (node: Node) => node is HTMLElement;
/**
 * Create a new `HTMLElement` with given information.
 * @param tag Element tag.
 * @param content Optional element initial content.
 * @param props Optional element attributes.
 * @returns Created HTML element.
 */
declare const createElement: (tag: string, content?: ElementContent | ElementContent[] | ElementProps, props?: ElementProps) => HTMLElement;
/**
 * Create a new `HTMLElement` with given information, `React.createElement` style.
 * @param tag Element tag.
 * @param props Optional element attributes.
 * @param content Optional element initial content.
 * @returns Created HTML element.
 */
declare const createElementReactStyle: (tag: string, props?: ElementProps, ...content: ElementContent[]) => HTMLElement;
/**
 * Get event listeners of an element created by `createElement`.
 * @param element Element to check event listner list
 * @returns A set of event listener objects.
 */
declare const getEventListenerOf: (element: HTMLElement) => Set<EventListener> | undefined;
declare const setEventListenerOf: (element: HTMLElement, listeners?: Set<EventListener>) => void;
declare const deleteEventListenerOf: (element: HTMLElement) => boolean;
/**
 * Invoke a function with either invoking one-by-one through a list or invoking directly.
 * @param elements Element or element list.
 * @param callback Function to invoke.
 */
declare const runCallbackOnElements: (elements: LeafComponentRenderResult, callback: (element: HTMLElement) => void) => void;
/**
 * Mount a list of elements to DOM.
 * @param children A list of children to mount.
 * @param container The container DOM element to contain the children.
 */
declare const mountElements: (children: Node[], container: Node) => void;
/**
 * Patch an element from one state to another.
 * @param oldChildren Children of `oldParent`.
 * @param newChildren Children of `newParent`.
 * @param oldParent The previously existing DOM element to patch.
 * @param newParent The newly generated element, unattached to DOM.
 */
declare const patchElements: (oldChildren: (HTMLElement | Node)[], newChildren: Node[], oldParent: Node, newParent: Node) => void;
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

export { EventListenerMap, baseClassComponents as HTMLClassElements, baseComponents as HTMLElements, LeafComponent, LeafComponentRenderResult, LeafEventHandler, createElement, createElementReactStyle, deleteEventListenerOf, eventListeners, getEventListenerOf, isElement, isEventListener, mountElements, patchElements, registerComponent, runCallbackOnElements, setEventListenerOf };
