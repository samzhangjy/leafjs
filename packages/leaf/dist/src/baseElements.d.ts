export declare type HTMLElementProps = Record<string, string>;
export declare type LeafBaseComponent = {
    name: string;
    extends: typeof HTMLElement;
};
declare const baseClassComponents: Record<string, typeof HTMLElement>;
declare const baseComponents: Record<string, (...args: unknown[]) => HTMLElement>;
export { baseComponents as HTMLElements, baseClassComponents as HTMLClassElements };
//# sourceMappingURL=baseElements.d.ts.map