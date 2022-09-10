/** An effect to be ran when its dependencies change. */
export type EffectType = () => void;
/** Objects that can be reactive. */
export type ReactiveObject = any;
/** Map to store reactive object - dependencies - effects data. */
type TargetMap = WeakMap<ReactiveObject, Map<string, Set<EffectType>>>;

/** Callbasks when a trackable object changes. */
interface TrackableCallback {
  onGet: (target: ReactiveObject, key: string, receiver: any) => void;
  onSet: (target: ReactiveObject, key: string, value: ReactiveObject, receiver: any) => void;
  onDeleteProperty: (target: ReactiveObject, key: string) => void;
}

/** Reactive object. */
export class Reactive {
  /** Currently active running effects. */
  activeEffects: EffectType[] = [];
  /** {@inheritDoc TargetMap} */
  targetMap: TargetMap = new WeakMap<TargetMap>();

  onChange: EffectType | null = null;
  isSetting: boolean = false;
  actualState: ReactiveObject = undefined;

  /**
   * Get a trackable proxy object and fire certain callbacks on certain events.
   * @param obj The object to track updates.
   * @param callbacks Callbacks to run when certain event was fired.
   * @returns A proxy to the original object.
   */
  getTrackableObject(obj: ReactiveObject, callbacks: TrackableCallback) {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        obj[key] = this.getTrackableObject(obj[key], callbacks);
      }
    }
    const outerThis = this;
    const proxy = new Proxy(obj, {
      get(target: ReactiveObject, key: string, receiver: any) {
        const result = Reflect.get(target, key, receiver);
        callbacks.onGet(target, key, receiver);
        return result;
      },
      set(target: ReactiveObject, key: string, value: object, receiver: any) {
        if (typeof value === 'object') {
          value = outerThis.getTrackableObject(value, callbacks);
        }
        const result = Reflect.set(target, key, value, receiver);
        callbacks.onSet(target, key, value, receiver);
        return result;
      },
      deleteProperty(target: ReactiveObject, key: string) {
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
  track(target: object, key: string) {
    if (!this.activeEffects.length) return;
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
    this.activeEffects.forEach((effect) => dep?.add(effect));
  }

  /**
   * Trigger effects of certain dependencies.
   * @param target The reactive object to trigger effects.
   * @param key The key to fetch dependencies from.
   */
  trigger(target: ReactiveObject, key: string) {
    const depsMap = this.targetMap.get(target);
    if (!depsMap) return;
    const deps = depsMap.get(key);
    if (!deps) return;

    deps.forEach((effect) => {
      effect();
    });
  }

  /**
   * Watch an effect's dependencies.
   * @param effect Effect to run when its dependencies changed.
   */
  watchEffect(effect: EffectType) {
    this.activeEffects.push(effect);
    effect();
    this.activeEffects.pop();
  }

  /**
   * Create a reactive object and enable two-way auto update.
   * @param target The object to be made reactive.
   * @returns The proxied reactive object.
   */
  build(target: ReactiveObject) {
    const outerThis = this;

    // workaround for to many rerenders
    // check if it is currently setting a reactive property, watch until it finished setting
    // and then invoke the `onStateChange` handler
    const fireWhenUpdated = () => {
      if (!this.isSetting) {
        if (this.onChange) this.onChange();
      } else {
        setTimeout(fireWhenUpdated, 2);
      }
    };

    this.actualState = this.getTrackableObject(target, {
      onGet(target, key) {
        outerThis.track(target, key);
      },
      onSet(target, key) {
        if (!outerThis.isSetting) {
          outerThis.isSetting = true;
          fireWhenUpdated();
        }
        outerThis.trigger(target, key);
        outerThis.isSetting = false;
      },
      onDeleteProperty() {},
    });

    return this.actualState;
  }

  /**
   * Create a reactive reference to a plain value.
   * @param raw A raw value to be reactive.
   * @returns The proxied object with `.value` getters and setters.
   */
  ref(raw: ReactiveObject) {
    const outerThis = this;
    const r = {
      get value() {
        outerThis.track(r, 'value');
        return raw;
      },
      set value(newVal) {
        if (newVal === raw) return;
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
  computed(getter: () => ReactiveObject) {
    const result = this.ref(null);
    this.watchEffect(() => (result.value = getter()));
    return result;
  }

  /**
   * Fire an effect when any state changes, regardless of dependencies. This function can only be called once.
   * @param effect Effect to run when state changes.
   */
  onStateChange(effect: EffectType) {
    this.onChange = effect;
    effect();
  }
}
