import { Reactive, ReactiveObject } from '@leaf-web/reactivity';
export { Reactive } from '@leaf-web/reactivity';

declare type ElementContent = Node | string;
declare type ElementProps = Record<string, string>;
/**
 * Register a leaf component to `CustomElementsRegistery`.
 * @param tagName Tag name to use in templates.
 * @param component a defined `LeafComponent` class.
 * @returns A function used to create the custom component.
 */
declare const registerComponent: (tagName: string, component: typeof LeafComponent, props?: ElementDefinitionOptions) => (props: LeafComponentProps, ...args: unknown[]) => LeafComponent;

declare type LeafComponentRenderResult = HTMLElement | HTMLElement[];
declare type LeafEventHandler = (e: Event) => unknown;
declare type EventListener = {
    name: string;
    handler: LeafEventHandler;
};
declare type EventListenerMap = WeakMap<HTMLElement, Set<EventListener>>;
declare type LeafComponentPropValue = any;
declare type LeafComponentProps = {
    [key: string]: LeafComponentPropValue;
};
declare type LeafComponentAttribute = string | number | boolean;
declare const eventListeners: EventListenerMap;
/** Attributes to be updated specially, such as `input.value` vs `input.attributes.value` */
declare const directPropUpdate: {
    name: string;
    attr: string;
}[];
declare const reactiveInstances: Map<string, Reactive>;
/**
 * Check if an attribute is an event handler.
 * @param propName Attribute name to check.
 * @param _propContent Attribute value to assert.
 * @returns Is this attribute an event handler.
 */
declare const isEventListener: (propName: string, _propContent: any) => _propContent is LeafEventHandler;
/**
 * Check is a node an element node.
 * @param node `Node` object to check.
 * @returns Is `node` an element node.
 */
declare const isElement: (node: Node) => node is HTMLElement;
/**
 * Check is a value a valid Leaf attribute.
 * @param attr Attribute value to check.
 * @returns Is `attr` a valid Leafjs attribute.
 */
declare const isValidAttribute: (attr: any) => attr is LeafComponentAttribute;
/**
 * Create a new `HTMLElement` with given information.
 * @param tag Element tag.
 * @param content Optional element initial content.
 * @param props Optional element attributes.
 * @returns Created HTML element.
 */
declare const createElement: (tag: string | typeof LeafComponent, content?: ElementContent | ElementContent[] | ElementProps, props?: ElementProps) => HTMLElement;
/**
 * Create a new `HTMLElement` with given information, `React.createElement` style.
 * @param tag Element tag.
 * @param props Optional element attributes.
 * @param content Optional element initial content.
 * @returns Created HTML element.
 */
declare const createElementReactStyle: (tag: string | typeof LeafComponent, props?: ElementProps, ...content: ElementContent[]) => HTMLElement;
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
 * Helper function for defining CSS stylesheets.
 * @param styles Stylesheet string.
 * @returns Stylesheet string.
 */
declare const css: (styles: string[], ...keys: string[]) => string;
/**
 * Core Leaf component class.
 *
 * This class is a thin wrapper of `HTMLElement` class and integrates a shadow DOM within.
 */
declare class LeafComponent extends HTMLElement {
    #private;
    props: LeafComponentProps;
    isLeafComponent: boolean;
    isUpdating: boolean;
    /**
     * @see https://github.com/Microsoft/TypeScript/issues/3841#issuecomment-337560146
     */
    ['constructor']: typeof LeafComponent;
    constructor(_props: LeafComponentProps, ..._args: unknown[]);
    static get watchedProps(): string[];
    static get observedAttributes(): string[];
    /** Component inner state. */
    get state(): ReactiveObject;
    /** {@inheritDoc LeafComponent.fireEvent} */
    set state(value: ReactiveObject);
    /** Event listeners attached to component. */
    get listeners(): EventListener[];
    /**
     * Dispatch a custom event to listeners.
     * @param event Event object or name to fire.
     * @param data Extra data to pass to `CustomEvent.detail`.
     * @returns Is the fired event's `preventDefault` hook called.
     */
    fireEvent(event: string | Event, data?: Record<string, any>): boolean;
    /**
     * Rerender the component based on current state.
     */
    rerender(): void;
    /**
     * Callback when the component is mounted.
     */
    onMounted(): void;
    /**
     * Callback when the component is about to perform a rerender.
     */
    onRerender(): void;
    /**
     * Start component lifecycle.
     *
     * This function is invoked when the first initialization of the component.
     */
    connectedCallback(): void;
    attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
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

export { EventListenerMap, LeafComponent, LeafComponentAttribute, LeafComponentPropValue, LeafComponentProps, LeafComponentRenderResult, LeafEventHandler, createElement, createElementReactStyle, css, deleteEventListenerOf, directPropUpdate, eventListeners, getEventListenerOf, isElement, isEventListener, isValidAttribute, mountElements, patchElements, reactiveInstances, registerComponent, runCallbackOnElements, setEventListenerOf };
