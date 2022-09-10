/** An effect to be ran when its dependencies change. */
declare type EffectType = () => void;
/** Objects that can be reactive. */
declare type ReactiveObject = any;
/** Map to store reactive object - dependencies - effects data. */
declare type TargetMap = WeakMap<ReactiveObject, Map<string, Set<EffectType>>>;
/** Callbasks when a trackable object changes. */
interface TrackableCallback {
    onGet: (target: ReactiveObject, key: string, receiver: any) => void;
    onSet: (target: ReactiveObject, key: string, value: ReactiveObject, receiver: any) => void;
    onDeleteProperty: (target: ReactiveObject, key: string) => void;
}
/** Reactive object. */
declare class Reactive {
    /** Currently active running effects. */
    activeEffects: EffectType[];
    /** {@inheritDoc TargetMap} */
    targetMap: TargetMap;
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
     * Track the current running effect's dependencies.
     * @param target The reactive object to track.
     * @param key The key to fetch data from.
     */
    track(target: object, key: string): void;
    /**
     * Trigger effects of certain dependencies.
     * @param target The reactive object to trigger effects.
     * @param key The key to fetch dependencies from.
     */
    trigger(target: ReactiveObject, key: string): void;
    /**
     * Watch an effect's dependencies.
     * @param effect Effect to run when its dependencies changed.
     */
    watchEffect(effect: EffectType): void;
    /**
     * Create a reactive object and enable two-way auto update.
     * @param target The object to be made reactive.
     * @returns The proxied reactive object.
     */
    build(target: ReactiveObject): any;
    /**
     * Create a reactive reference to a plain value.
     * @param raw A raw value to be reactive.
     * @returns The proxied object with `.value` getters and setters.
     */
    ref(raw: ReactiveObject): {
        value: any;
    };
    /**
     * Create a reactive computed value.
     * @note `computed` is built on top of {@link ref} API. Any updates must be using `.value` accessor.
     * @param getter Function to calculate the computed value.
     * @returns A reference object to the computed value.
     */
    computed(getter: () => ReactiveObject): {
        value: any;
    };
    /**
     * Fire an effect when any state changes, regardless of dependencies. This function can only be called once.
     * @param effect Effect to run when state changes.
     */
    onStateChange(effect: EffectType): void;
}

export { EffectType, Reactive, ReactiveObject };
