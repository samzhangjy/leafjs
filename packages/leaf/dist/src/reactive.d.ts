/** An effect to be ran when its dependencies change. */
export declare type EffectType = () => void;
/** Objects that can be reactive. */
export declare type ReactiveType = any;
/** Map to store reactive object - dependencies - effects data. */
declare type TargetMap = WeakMap<ReactiveType, Map<string, Set<EffectType>>>;
/** {@inheritDoc TargetMap} */
export declare const targetMap: TargetMap;
/** Callbasks when a trackable object changes. */
interface TrackableCallback {
    onGet: (target: ReactiveType, key: string, receiver: any) => void;
    onSet: (target: ReactiveType, key: string, value: ReactiveType, receiver: any) => void;
    onDeleteProperty: (target: ReactiveType, key: string) => void;
}
/**
 * Get a trackable proxy object and fire certain callbacks on certain events.
 * @param obj The object to track updates.
 * @param callbacks Callbacks to run when certain event was fired.
 * @returns A proxy to the original object.
 */
export declare const getTrackableObject: (obj: ReactiveType, callbacks: TrackableCallback) => any;
/**
 * Track the current running effect's dependencies.
 * @param target The reactive object to track.
 * @param key The key to fetch data from.
 */
export declare const track: (target: object, key: string) => void;
/**
 * Trigger effects of certain dependencies.
 * @param target The reactive object to trigger effects.
 * @param key The key to fetch dependencies from.
 */
export declare const trigger: (target: ReactiveType, key: string) => void;
/**
 * Watch an effect's dependencies.
 * @param effect Effect to run when its dependencies changed.
 */
export declare const watchEffect: (effect: EffectType) => void;
/**
 * Create a reactive object and enable two-way auto update.
 * @param target The object to be made reactive.
 * @returns The proxied reactive object.
 */
export declare const reactive: <T extends unknown>(target: T) => T;
/**
 * Create a reactive reference to a plain value.
 * @param raw A raw value to be reactive.
 * @returns The proxied object with `.value` getters and setters.
 */
export declare const ref: (raw: ReactiveType) => {
    value: any;
};
/**
 * Create a reactive computed value.
 * @note `computed` is built on top of {@link ref} API. Any updates must be using `.value` accessor.
 * @param getter Function to calculate the computed value.
 * @returns A reference object to the computed value.
 */
export declare const computed: (getter: () => ReactiveType) => {
    value: any;
};
export {};
//# sourceMappingURL=reactive.d.ts.map