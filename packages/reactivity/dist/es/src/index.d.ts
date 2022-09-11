/** An effect to be ran when its dependencies change. */
export declare type EffectType = () => void;
/** Objects that can be reactive. */
export declare type ReactiveObject = any;
/** Callbasks when a trackable object changes. */
interface TrackableCallback {
    onGet: (target: ReactiveObject, key: string, receiver: any) => void;
    onSet: (target: ReactiveObject, key: string, value: ReactiveObject, receiver: any) => void;
    onDeleteProperty: (target: ReactiveObject, key: string) => void;
}
/** Reactive object. */
export declare class Reactive {
    /** Currently active running effects. */
    activeEffects: EffectType[];
    onChange: EffectType | null;
    isSetting: boolean;
    actualState: ReactiveObject;
    /**
     * Get a trackable proxy object and fire certain callbacks on certain events.
     * @param obj The object to track updates.
     * @param callbacks Callbacks to run when certain event was fired.
     * @returns A proxy to the original object.
     */
    getTrackableObject(obj: ReactiveObject, callbacks: TrackableCallback): any;
    /**
     * Create a reactive object and enable two-way auto update.
     * @param target The object to be made reactive.
     * @returns The proxied reactive object.
     */
    build(target: ReactiveObject): any;
    /**
     * Fire an effect when any state changes, regardless of dependencies. This function can only be called once.
     * @param effect Effect to run when state changes.
     */
    onStateChange(effect: EffectType): void;
}
export {};
//# sourceMappingURL=index.d.ts.map