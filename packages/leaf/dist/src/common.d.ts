export declare type NodeLike = Node | string | HTMLCollection | NodeList | Node[] | string[];
export declare type ElementContent = Node | string;
export declare type ElementProps = Record<string, string>;
/**
 * Check if element is NodeList-like.
 * @param content Element to check.
 * @returns Is `content` having structures like `NodeList`.
 */
export declare const isNodeListLike: (content: any) => boolean;
/**
 * Check if element is Node-like.
 * @param content Element to check.
 * @returns Is `content` having structures like `Node`.
 */
export declare const isNodeLike: (content: any) => boolean;
/**
 * Register a leaf component to `CustomElementsRegistery`.
 * @param tagName Tag name to use in templates.
 * @param component a defined `LeafComponent` class.
 * @returns A function used to create the custom component.
 */
export declare const registerComponent: (tagName: string, component: CustomElementConstructor, props?: ElementDefinitionOptions) => (...args: unknown[]) => HTMLElement;
/** Preserved element attributes mapping */
export declare const preservedProps: {
    [key: string]: string;
};
/**
 * Insert element or elements to node, depending on the actual type of `content`.
 * @param node Parent node to insert content to.
 * @param content Custom content elements to insert.
 */
export declare const appendContentToNode: (node: HTMLElement, content: ElementContent | ElementContent[]) => void;
//# sourceMappingURL=common.d.ts.map