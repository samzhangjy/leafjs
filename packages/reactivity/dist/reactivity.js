'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/** Reactive object. */
var Reactive = /*#__PURE__*/function () {
  function Reactive() {
    /** Currently active running effects. */
    this.activeEffects = [];
    /** {@inheritDoc TargetMap} */

    this.targetMap = new WeakMap();
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


  var _proto = Reactive.prototype;

  _proto.getTrackableObject = function getTrackableObject(obj, callbacks) {
    for (var key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        obj[key] = this.getTrackableObject(obj[key], callbacks);
      }
    }

    var outerThis = this;
    var proxy = new Proxy(obj, {
      get: function get(target, key, receiver) {
        var result = Reflect.get(target, key, receiver);
        callbacks.onGet(target, key, receiver);
        return result;
      },
      set: function set(target, key, value, receiver) {
        if (typeof value === 'object') {
          value = outerThis.getTrackableObject(value, callbacks);
        }

        var result = Reflect.set(target, key, value, receiver);
        callbacks.onSet(target, key, value, receiver);
        return result;
      },
      deleteProperty: function deleteProperty(target, key) {
        var result = Reflect.deleteProperty(target, key);
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
   * Track the current running effect's dependencies.
   * @param target The reactive object to track.
   * @param key The key to fetch data from.
   */
  ;

  _proto.track = function track(target, key) {
    if (!this.activeEffects.length) return;
    var depsMap = this.targetMap.get(target);

    if (!depsMap) {
      depsMap = new Map();
      this.targetMap.set(target, depsMap);
    }

    var dep = depsMap.get(key);

    if (!dep) {
      // using set assures that no duplicate effects will be stored
      dep = new Set();
      depsMap.set(key, dep);
    }

    this.activeEffects.forEach(function (effect) {
      return dep === null || dep === void 0 ? void 0 : dep.add(effect);
    });
  }
  /**
   * Trigger effects of certain dependencies.
   * @param target The reactive object to trigger effects.
   * @param key The key to fetch dependencies from.
   */
  ;

  _proto.trigger = function trigger(target, key) {
    var depsMap = this.targetMap.get(target);
    if (!depsMap) return;
    var deps = depsMap.get(key);
    if (!deps) return;
    deps.forEach(function (effect) {
      effect();
    });
  }
  /**
   * Watch an effect's dependencies.
   * @param effect Effect to run when its dependencies changed.
   */
  ;

  _proto.watchEffect = function watchEffect(effect) {
    this.activeEffects.push(effect);
    effect();
    this.activeEffects.pop();
  }
  /**
   * Create a reactive object and enable two-way auto update.
   * @param target The object to be made reactive.
   * @returns The proxied reactive object.
   */
  ;

  _proto.build = function build(target) {
    var _this = this;

    var outerThis = this; // workaround for to many rerenders
    // check if it is currently setting a reactive property, watch until it finished setting
    // and then invoke the `onStateChange` handler

    var fireWhenUpdated = function fireWhenUpdated() {
      if (!_this.isSetting) {
        if (_this.onChange) _this.onChange();
      } else {
        setTimeout(fireWhenUpdated, 2);
      }
    };

    this.actualState = this.getTrackableObject(target, {
      onGet: function onGet(target, key) {
        outerThis.track(target, key);
      },
      onSet: function onSet(target, key) {
        if (!outerThis.isSetting) {
          outerThis.isSetting = true;
          fireWhenUpdated();
        }

        outerThis.trigger(target, key);
        outerThis.isSetting = false;
      },
      onDeleteProperty: function onDeleteProperty() {}
    });
    return this.actualState;
  }
  /**
   * Create a reactive reference to a plain value.
   * @param raw A raw value to be reactive.
   * @returns The proxied object with `.value` getters and setters.
   */
  ;

  _proto.ref = function ref(raw) {
    var outerThis = this;
    var r = {
      get value() {
        outerThis.track(r, 'value');
        return raw;
      },

      set value(newVal) {
        if (newVal === raw) return;
        raw = newVal;
        outerThis.trigger(r, 'value');
      }

    };
    return r;
  }
  /**
   * Create a reactive computed value.
   * @note `computed` is built on top of {@link ref} API. Any updates must be using `.value` accessor.
   * @param getter Function to calculate the computed value.
   * @returns A reference object to the computed value.
   */
  ;

  _proto.computed = function computed(getter) {
    var result = this.ref(null);
    this.watchEffect(function () {
      return result.value = getter();
    });
    return result;
  }
  /**
   * Fire an effect when any state changes, regardless of dependencies. This function can only be called once.
   * @param effect Effect to run when state changes.
   */
  ;

  _proto.onStateChange = function onStateChange(effect) {
    this.onChange = effect;
    effect();
  };

  return Reactive;
}();

exports.Reactive = Reactive;
//# sourceMappingURL=reactivity.js.map
