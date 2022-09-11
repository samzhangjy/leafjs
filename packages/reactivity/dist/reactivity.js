'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/** Reactive object. */
class Reactive {
  constructor() {
    /** Currently active running effects. */
    this.activeEffects = [];
    this.onChange = null;
    this.isSetting = false;
    this.actualState = undefined;
  }
  /**
   * Get a trackable proxy object and fire certain callbacks on certain events.
   * @param obj The object to track updates.
   * @param callbacks Callbacks to run when certain event was fired.
   * @returns A proxy to the original object.
   */


  getTrackableObject(obj, callbacks) {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
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
        return result;
      },

      deleteProperty(target, key) {
        const result = Reflect.deleteProperty(target, key);
        callbacks.onDeleteProperty(target, key);
        return result;
      }

    });

    if (Array.isArray(obj)) {
      Object.setPrototypeOf(proxy, Array.prototype);
    }

    return proxy;
  }
  /**
   * Create a reactive object and enable two-way auto update.
   * @param target The object to be made reactive.
   * @returns The proxied reactive object.
   */


  build(target) {
    const outerThis = this; // workaround for to many rerenders
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
      onGet() {},

      onSet() {
        if (!outerThis.isSetting) {
          outerThis.isSetting = true;
          fireWhenUpdated();
        }

        outerThis.isSetting = false;
      },

      onDeleteProperty() {}

    });
    return this.actualState;
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

exports.Reactive = Reactive;
//# sourceMappingURL=reactivity.js.map
