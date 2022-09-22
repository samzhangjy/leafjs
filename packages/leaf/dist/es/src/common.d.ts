import { LeafComponent } from './index';
export declare type NodeLike = Node | string | HTMLCollection | NodeList | Node[] | string[];
export declare type ElementContent = Node | string;
export declare type ElementProps = Record<string, string>;
export declare type CustomComponentMap = WeakMap<typeof LeafComponent, string>;
declare global {
    interface Window {
        componentMap: CustomComponentMap;
    }
}
/**
 * Check if element is NodeList-like.
 * @param content Element to check.
 * @returns Is `content` having structures like `NodeList`.
 */
export declare const isNodeListLike: (content: any) => content is Node[];
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
 * @param props extra params to pass to `customElements.define`.
 * @param allowMultiple allow multiple registers with the same component for different names.
 * @returns The `component` class.
 */
export declare const registerComponent: (tagName: string, component: typeof LeafComponent, props?: ElementDefinitionOptions, allowMultiple?: boolean) => typeof LeafComponent;
/** Preserved element attributes mapping */
export declare const preservedProps: {
    [key: string]: string;
};
/**
 * Check is a node falsy.
 * @param node Element node to check.
 * @returns Is `node` falsy or not.
 */
export declare const isFalsyNode: (node: unknown) => boolean;
/**
 * Insert element or elements to node, depending on the actual type of `content`.
 * @param node Parent node to insert content to.
 * @param content Custom content elements to insert.
 */
export declare const appendContentToNode: (node: HTMLElement, content: ElementContent | ElementContent[]) => void;
//# sourceMappingURL=common.d.ts.map