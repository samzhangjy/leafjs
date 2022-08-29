/** Reactive object. */
class Reactive {
    constructor() {
        /** Currently active running effects. */
        this.activeEffects = [];
        /** {@inheritDoc TargetMap} */
        this.targetMap = new WeakMap();
        this.onChange = null;
    }
    /**
     * Get a trackable proxy object and fire certain callbacks on certain events.
     * @param obj The object to track updates.
     * @param callbacks Callbacks to run when certain event was fired.
     * @returns A proxy to the original object.
     */
    getTrackableObject(obj, callbacks) {
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                obj[key] = this.getTrackableObject(obj[key], callbacks);
            }
        }
        const outerThis = this;
        const proxy = new Proxy(obj, {
            get(target, key, receiver) {
                const result = Reflect.get(target, key, receiver);
                callbacks.onGet(target, key, receiver);
                return result;
            },
            set(target, key, value, receiver) {
                if (typeof value === 'object') {
                    value = outerThis.getTrackableObject(value, callbacks);
                }
                const result = Reflect.set(target, key, value, receiver);
                callbacks.onSet(target, key, value, receiver);
                if (outerThis.onChange)
                    outerThis.onChange();
                return result;
            },
            deleteProperty(target, key) {
                const result = Reflect.deleteProperty(target, key);
                callbacks.onDeleteProperty(target, key);
                return result;
            },
        });
        if (Array.isArray(obj)) {
            Object.setPrototypeOf(proxy, Array.prototype);
        }
        return proxy;
    }
    /**
     * Track the current running effect's dependencies.
     * @param target The reactive object to track.
     * @param key The key to fetch data from.
     */
    track(target, key) {
        if (!this.activeEffects.length)
            return;
        let depsMap = this.targetMap.get(target);
        if (!depsMap) {
            depsMap = new Map();
            this.targetMap.set(target, depsMap);
        }
        let dep = depsMap.get(key);
        if (!dep) {
            // using set assures that no duplicate effects will be stored
            dep = new Set();
            depsMap.set(key, dep);
        }
        this.activeEffects.forEach((effect) => dep === null || dep === void 0 ? void 0 : dep.add(effect));
    }
    /**
     * Trigger effects of certain dependencies.
     * @param target The reactive object to trigger effects.
     * @param key The key to fetch dependencies from.
     */
    trigger(target, key) {
        const depsMap = this.targetMap.get(target);
        if (!depsMap)
            return;
        const deps = depsMap.get(key);
        if (!deps)
            return;
        deps.forEach((effect) => {
            effect();
        });
    }
    /**
     * Watch an effect's dependencies.
     * @param effect Effect to run when its dependencies changed.
     */
    watchEffect(effect) {
        this.activeEffects.push(effect);
        effect();
        this.activeEffects.pop();
    }
    /**
     * Create a reactive object and enable two-way auto update.
     * @param target The object to be made reactive.
     * @returns The proxied reactive object.
     */
    build(target) {
        const outerThis = this;
        return this.getTrackableObject(target, {
            onGet(target, key) {
                outerThis.track(target, key);
            },
            onSet(target, key) {
                outerThis.trigger(target, key);
            },
            onDeleteProperty() { },
        });
    }
    /**
     * Create a reactive reference to a plain value.
     * @param raw A raw value to be reactive.
     * @returns The proxied object with `.value` getters and setters.
     */
    ref(raw) {
        const outerThis = this;
        const r = {
            get value() {
                outerThis.track(r, 'value');
                return raw;
            },
            set value(newVal) {
                if (newVal === raw)
                    return;
                raw = newVal;
                outerThis.trigger(r, 'value');
            },
        };
        return r;
    }
    /**
     * Create a reactive computed value.
     * @note `computed` is built on top of {@link ref} API. Any updates must be using `.value` accessor.
     * @param getter Function to calculate the computed value.
     * @returns A reference object to the computed value.
     */
    computed(getter) {
        const result = this.ref(null);
        this.watchEffect(() => (result.value = getter()));
        return result;
    }
    /**
     * Fire an effect when any state changes, regardless of dependencies. This function can only be called once.
     * @param effect Effect to run when state changes.
     */
    onStateChange(effect) {
        this.onChange = effect;
        effect();
    }
}

export { Reactive };
//# sourceMappingURL=reactivity.js.map
