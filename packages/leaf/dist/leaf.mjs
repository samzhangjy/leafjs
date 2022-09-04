function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}

var reactivity_min = {};

var Reactive;

function t(t, e, r, n) {
  if ("a" === r && !n) throw new TypeError("Private accessor was defined without a getter");
  if ("function" == typeof e ? t !== e || !n : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return "m" === r ? n : "a" === r ? n.call(t) : n ? n.value : e.get(t);
}

function e(t, e, r, n, a) {
  if ("m" === n) throw new TypeError("Private method is not writable");
  if ("a" === n && !a) throw new TypeError("Private accessor was defined without a setter");
  if ("function" == typeof e ? t !== e || !a : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return "a" === n ? a.call(t, r) : a ? a.value = r : e.set(t, r), r;
}

var r;
Object.defineProperty(reactivity_min, "__esModule", {
  value: !0
});

var n = function () {
  function n() {
    this.activeEffects = [], this.targetMap = new WeakMap(), this.onChange = null, r.set(this, !1);
  }

  var a = n.prototype;
  return a.getTrackableObject = function (t, e) {
    for (var r in t) {
      "object" == typeof t[r] && (t[r] = this.getTrackableObject(t[r], e));
    }

    var n = this,
        a = new Proxy(t, {
      get: function get(t, r, n) {
        var a = Reflect.get(t, r, n);
        return e.onGet(t, r, n), a;
      },
      set: function set(t, r, a, o) {
        "object" == typeof a && (a = n.getTrackableObject(a, e));
        var i = Reflect.set(t, r, a, o);
        return e.onSet(t, r, a, o), i;
      },
      deleteProperty: function deleteProperty(t, r) {
        var n = Reflect.deleteProperty(t, r);
        return e.onDeleteProperty(t, r), n;
      }
    });
    return Array.isArray(t) && Object.setPrototypeOf(a, Array.prototype), a;
  }, a.track = function (t, e) {
    if (this.activeEffects.length) {
      var r = this.targetMap.get(t);
      r || (r = new Map(), this.targetMap.set(t, r));
      var n = r.get(e);
      n || (n = new Set(), r.set(e, n)), this.activeEffects.forEach(function (t) {
        return null == n ? void 0 : n.add(t);
      });
    }
  }, a.trigger = function (t, e) {
    var r = this.targetMap.get(t);

    if (r) {
      var n = r.get(e);
      n && n.forEach(function (t) {
        t();
      });
    }
  }, a.watchEffect = function (t) {
    this.activeEffects.push(t), t(), this.activeEffects.pop();
  }, a.build = function (n) {
    var a = this,
        o = this,
        i = function e() {
      t(a, r, "f") ? setTimeout(e, 2) : a.onChange && a.onChange();
    };

    return this.getTrackableObject(n, {
      onGet: function onGet(t, e) {
        o.track(t, e);
      },
      onSet: function onSet(n, a) {
        t(o, r, "f") || (e(o, r, !0, "f"), i()), o.trigger(n, a), e(o, r, !1, "f");
      },
      onDeleteProperty: function onDeleteProperty() {}
    });
  }, a.ref = function (t) {
    var e = this,
        r = {
      get value() {
        return e.track(r, "value"), t;
      },

      set value(n) {
        n !== t && (t = n, e.trigger(r, "value"));
      }

    };
    return r;
  }, a.computed = function (t) {
    var e = this.ref(null);
    return this.watchEffect(function () {
      return e.value = t();
    }), e;
  }, a.onStateChange = function (t) {
    this.onChange = t, t();
  }, n;
}();

r = new WeakMap(), Reactive = reactivity_min.Reactive = n;

/**
 * Check if element is NodeList-like.
 * @param content Element to check.
 * @returns Is `content` having structures like `NodeList`.
 */
var isNodeListLike = function isNodeListLike(content) {
  return HTMLCollection.prototype.isPrototypeOf(content) || NodeList.prototype.isPrototypeOf(content) || Array.isArray(content);
};
/**
 * Check if element is Node-like.
 * @param content Element to check.
 * @returns Is `content` having structures like `Node`.
 */

var isNodeLike = function isNodeLike(content) {
  return typeof content.nodeType !== 'undefined' || typeof content === 'string' || typeof content === 'number';
};
/**
 * Register a leaf component to `CustomElementsRegistery`.
 * @param tagName Tag name to use in templates.
 * @param component a defined `LeafComponent` class.
 * @returns A function used to create the custom component.
 */

var registerComponent = function registerComponent(tagName, component, props) {
  customElements.define(tagName, component, props);
  return function (props) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return _construct(component, [props].concat(args));
  };
};
/** Preserved element attributes mapping */

var preservedProps = {
  className: 'class'
};
/**
 * Insert element or elements to node, depending on the actual type of `content`.
 * @param node Parent node to insert content to.
 * @param content Custom content elements to insert.
 */

var appendContentToNode = function appendContentToNode(node, content) {
  if (isNodeListLike(content)) {
    // IMPORTANT: filter falsy nodes out to allow syntaxes like `condition && renderSomething()`
    content = [].concat(content).filter(function (node) {
      return !(node === false || node === undefined || node === null);
    });

    for (var _iterator = _createForOfIteratorHelperLoose(content), _step; !(_step = _iterator()).done;) {
      var ele = _step.value;

      if (Array.isArray(ele)) {
        appendContentToNode(node, ele);
        continue;
      }

      node.append(ele);
    }
  } else {
    node.append(content);
  }
};

/** Base HTML elements mapping */

var LeafBaseComponents = [{
  name: 'button',
  extends: HTMLButtonElement
}, {
  name: 'div',
  extends: HTMLDivElement
}, {
  name: 'input',
  extends: HTMLInputElement
}, {
  name: 'h1',
  extends: HTMLHeadingElement
}, {
  name: 'h2',
  extends: HTMLHeadingElement
}, {
  name: 'h3',
  extends: HTMLHeadingElement
}, {
  name: 'h4',
  extends: HTMLHeadingElement
}, {
  name: 'h5',
  extends: HTMLHeadingElement
}, {
  name: 'h6',
  extends: HTMLHeadingElement
}, {
  name: 'p',
  extends: HTMLParagraphElement
}, {
  name: 'li',
  extends: HTMLLIElement
}, {
  name: 'ul',
  extends: HTMLUListElement
}, {
  name: 'ol',
  extends: HTMLOListElement
}, {
  name: 'span',
  extends: HTMLSpanElement
}, {
  name: 'form',
  extends: HTMLFormElement
}, {
  name: 'label',
  extends: HTMLLabelElement
}, {
  name: 'a',
  extends: HTMLAnchorElement
}, {
  name: 'textarea',
  extends: HTMLTextAreaElement
}, {
  name: 'iframe',
  extends: HTMLIFrameElement
}, {
  name: 'img',
  extends: HTMLImageElement
}, {
  name: 'video',
  extends: HTMLVideoElement
}];
var baseClassComponents = {};
var baseComponents = {};
/**
 * Construct a custom `HTMLElement` with given parent to extend from.
 * @param parent `HTMLElement` class to inherit from.
 * @returns Consturcted element subclass.
 */

var makeBaseClassComponent = function makeBaseClassComponent(parent) {
  return /*#__PURE__*/function (_parent) {
    _inheritsLoose(_class, _parent);

    function _class(content, props) {
      var _this;

      _this = _parent.call(this) || this;
      if (!content) return _assertThisInitialized(_this);

      if (!isNodeLike(content) && !isNodeListLike(content)) {
        for (var propName in content) {
          _this.setAttribute(propName in preservedProps ? preservedProps[propName] : propName, content[propName]);
        }

        return _assertThisInitialized(_this);
      }

      appendContentToNode(_assertThisInitialized(_this), [].concat(content));
      if (!props) return _assertThisInitialized(_this);

      for (var _propName in props) {
        _this.setAttribute(_propName in preservedProps ? preservedProps[_propName] : _propName, props[_propName]);
      }

      return _this;
    }

    return _class;
  }(parent);
};

LeafBaseComponents.forEach(function (component) {
  baseComponents[component.name] = function (content, props) {
    return createElement(component.name, content, props);
  };

  baseClassComponents[component.name] = makeBaseClassComponent(component.extends);
  customElements.define("leaf-__" + component.name, baseClassComponents[component.name], {
    extends: component.name
  });
}); // TODO: find out a way to export components directly using named imports

var _LeafComponent_instances, _LeafComponent_state, _LeafComponent_reactiveInstance, _LeafComponent_defaultStyler;
var eventListeners = new WeakMap();
var isEventListener = function isEventListener(propName, _propContent) {
  return propName.startsWith('on');
};
var isElement = function isElement(node) {
  return node.nodeType === Node.ELEMENT_NODE;
};

var _createElement = function _createElement(tag, props, content) {
  if (typeof tag !== 'string') {
    return new tag(_extends({}, props, {
      children: content
    }));
  }

  var element = document.createElement(tag);
  var listeners = new Set();

  for (var prop in props) {
    var propContent = props[prop];

    if (isEventListener(prop)) {
      var listenerName = prop.substring(2).toLowerCase();
      listeners.add({
        name: listenerName,
        handler: propContent
      });
      element.addEventListener(listenerName, propContent);
      continue;
    }

    if (prop in preservedProps) {
      element.setAttribute(preservedProps[prop], propContent);
    } else {
      element.setAttribute(prop, propContent);
    }
  }

  eventListeners.set(element, listeners);

  if (content) {
    appendContentToNode(element, content);
  }

  return element;
};
/**
 * Create a new `HTMLElement` with given information.
 * @param tag Element tag.
 * @param content Optional element initial content.
 * @param props Optional element attributes.
 * @returns Created HTML element.
 */


var createElement = function createElement(tag, content, props) {
  if (typeof content === 'undefined') return _createElement(tag);

  if (!isNodeLike(content) && !isNodeListLike(content)) {
    return _createElement(tag, content);
  }

  return _createElement(tag, props, content);
};
/**
 * Create a new `HTMLElement` with given information, `React.createElement` style.
 * @param tag Element tag.
 * @param props Optional element attributes.
 * @param content Optional element initial content.
 * @returns Created HTML element.
 */

var createElementReactStyle = function createElementReactStyle(tag, props) {
  for (var _len = arguments.length, content = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    content[_key - 2] = arguments[_key];
  }

  if (!content) return createElement(tag, props !== null && props !== void 0 ? props : {});
  return createElement(tag, content, props !== null && props !== void 0 ? props : {});
};
/**
 * Get event listeners of an element created by `createElement`.
 * @param element Element to check event listner list
 * @returns A set of event listener objects.
 */

var getEventListenerOf = function getEventListenerOf(element) {
  if (!eventListeners.has(element)) return undefined;
  return eventListeners.get(element);
};
var setEventListenerOf = function setEventListenerOf(element, listeners) {
  eventListeners.set(element, listeners || new Set());
};
var deleteEventListenerOf = function deleteEventListenerOf(element) {
  return eventListeners.delete(element);
};
/**
 * Invoke a function with either invoking one-by-one through a list or invoking directly.
 * @param elements Element or element list.
 * @param callback Function to invoke.
 */

var runCallbackOnElements = function runCallbackOnElements(elements, callback) {
  if (isNodeListLike(elements)) {
    for (var _iterator = _createForOfIteratorHelperLoose(elements), _step; !(_step = _iterator()).done;) {
      var ele = _step.value;

      if (Array.isArray(ele)) {
        runCallbackOnElements(ele, callback);
        continue;
      }

      callback(ele);
    }
  } else {
    callback(elements);
  }
};
/**
 * Mount a list of elements to DOM.
 * @param children A list of children to mount.
 * @param container The container DOM element to contain the children.
 */

var mountElements = function mountElements(children, container) {
  children.forEach(function (child) {
    container.appendChild(child);
  });
};
/**
 * Patch an element from one state to another.
 * @param oldChildren Children of `oldParent`.
 * @param newChildren Children of `newParent`.
 * @param oldParent The previously existing DOM element to patch.
 * @param newParent The newly generated element, unattached to DOM.
 */

var patchElements = function patchElements(oldChildren, newChildren, oldParent, newParent) {
  if (!oldParent) return;
  var oldLen = oldChildren.length,
      newLen = newChildren.length;
  var commonLength = Math.min(oldLen, newLen);
  var hasPreserved = false;

  if (isElement(oldParent) && isElement(newParent)) {
    // replace event listeners
    var oldEventListener = getEventListenerOf(oldParent);
    var newEventListener = getEventListenerOf(newParent);
    oldEventListener === null || oldEventListener === void 0 ? void 0 : oldEventListener.forEach(function (value) {
      oldParent.removeEventListener(value.name, value.handler);
    });
    newEventListener === null || newEventListener === void 0 ? void 0 : newEventListener.forEach(function (value) {
      oldParent.addEventListener(value.name, value.handler);
    }); // IMPORTANT: update the event listener registery for future use

    setEventListenerOf(oldParent, newEventListener);
    deleteEventListenerOf(newParent); // replace attributes

    var oldAttributes = oldParent.attributes;
    var newAttributes = newParent.attributes;

    for (var _iterator2 = _createForOfIteratorHelperLoose(newAttributes), _step2; !(_step2 = _iterator2()).done;) {
      var attr = _step2.value;
      if (oldParent.getAttribute(attr.name) === attr.value) continue;
      oldParent.setAttribute(attr.name, attr.value);
    }

    for (var _iterator3 = _createForOfIteratorHelperLoose(oldAttributes), _step3; !(_step3 = _iterator3()).done;) {
      var _attr = _step3.value;
      // only remove the attribute if it's not in the new element
      if (newParent.hasAttribute(_attr.name)) continue;
      oldParent.removeAttribute(_attr.name);
    }
  }

  for (var i = 0; i < commonLength; i++) {
    var oldChild = oldChildren[i];
    var newChild = newChildren[i]; // IMPORTANT: filter out preserved elements, in this case `<style />` tag

    if (isElement(oldChild) && oldChild.hasAttribute('leaf-preserve')) {
      oldChild = oldChildren[i + 1];
      hasPreserved = true;
    }

    if (isElement(oldChild) && isElement(newChild) && oldChild.tagName !== newChild.tagName) {
      oldChild.outerHTML = oldChild.outerHTML.replace(new RegExp("<" + oldChild.tagName.toLowerCase() + "(.*?)", 'g'), "<" + newChild.tagName.toLowerCase() + "$1").replace(new RegExp("</" + oldChild.tagName.toLowerCase() + "(.*?)", 'g'), "</" + newChild.tagName.toLowerCase() + "$1"); // IMPORTANT: setting outerHTML will not update the element reference itself,
      // so refreshing the element by accessing it through its parent is needed

      var elementIndex = 0;

      while (oldChild !== null) {
        elementIndex++;
        oldChild = oldChild.previousSibling;
      }

      oldChild = oldParent.childNodes[elementIndex];
      if (!isElement(oldChild)) continue;
    }

    if (oldChild.nodeType === Node.TEXT_NODE && newChild.nodeType === Node.TEXT_NODE) {
      if (oldChild.textContent === newChild.textContent) continue;
      oldParent.replaceChild(newChild, oldChild);
      continue;
    }

    patchElements(Array.from(oldChild.childNodes), Array.from(newChild.childNodes), oldChild, newChild);
  }

  if (hasPreserved) oldLen--; // insert new elements

  if (newLen > oldLen) {
    newChildren.slice(oldLen).forEach(function (child) {
      if (child.nodeType === Node.TEXT_NODE) {
        oldParent.appendChild(child);
        return;
      }

      mountElements([child], oldParent);
    });
    return;
  } // remove old elements


  if (newLen < oldLen) {
    oldChildren.slice(newLen).forEach(function (child, index) {
      if (child.nodeType === Node.TEXT_NODE) {
        oldParent.removeChild(oldParent.childNodes[index]);
        return;
      }

      oldParent.removeChild(child);
    });
  }
};
/**
 * Core Leaf component class.
 *
 * This class is a thin wrapper of `HTMLElement` class and integrates a shadow DOM within.
 */

var LeafComponent = /*#__PURE__*/function (_HTMLElement) {
  _inheritsLoose(LeafComponent, _HTMLElement);

  function LeafComponent(_props) {
    var _this;

    _this = _HTMLElement.call(this) || this;

    _LeafComponent_instances.add(_assertThisInitialized(_this));

    _LeafComponent_state.set(_assertThisInitialized(_this), null);

    _LeafComponent_reactiveInstance.set(_assertThisInitialized(_this), null);

    return _this;
  }
  /** Component inner state. */


  var _proto = LeafComponent.prototype;

  /**
   * Start component lifecycle.
   *
   * This function is invoked when the first initialization of the component.
   */
  _proto.connectedCallback = function connectedCallback() {
    var _this2 = this;

    var _a, _b;

    var shadow = this.attachShadow({
      mode: 'closed'
    });
    var renderResult = null;
    var previousRenderResult = null;
    var styleElement = createElement('style');
    var styler = (_a = this.css) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _LeafComponent_instances, "m", _LeafComponent_defaultStyler);
    styleElement.textContent = styler();
    styleElement.setAttribute('leaf-preserve', 'true');
    shadow.appendChild(styleElement);

    var renderComponent = function renderComponent() {
      renderResult = _this2.render();
      if (!Array.isArray(renderResult)) renderResult = [renderResult];

      if (!previousRenderResult) {
        mountElements(renderResult, shadow);
        previousRenderResult = renderResult;
        return;
      }

      patchElements(Array.from(shadow.childNodes), Array.from(renderResult), shadow, renderResult[0]);
      previousRenderResult = renderResult;
    };

    if (!__classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f")) {
      renderComponent();
      return;
    }

    (_b = __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f")) === null || _b === void 0 ? void 0 : _b.onStateChange(renderComponent);
  }
  /**
   * Core rendering logic of a component.
   * @returns HTML element to be rendered and attached.
   */
  ;

  _proto.render = function render() {
    return this;
  }
  /**
   * Inject CSS stylesheet to component. If not given, leaf will inject an empty string by default.
   *
   * Not to be confused with the builtin prop `style`.
   * @returns CSS stylesheet string.
   */
  ;

  _proto.css = function css() {
    return '';
  };

  _createClass(LeafComponent, [{
    key: "state",
    get: function get() {
      return __classPrivateFieldGet(this, _LeafComponent_state, "f");
    }
    /** {@inheritDoc LeafComponent.state} */
    ,
    set: function set(value) {
      if (!__classPrivateFieldGet(this, _LeafComponent_state, "f")) {
        __classPrivateFieldSet(this, _LeafComponent_reactiveInstance, new Reactive(), "f");

        __classPrivateFieldSet(this, _LeafComponent_state, __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f").build(value), "f");

        return;
      }

      __classPrivateFieldSet(this, _LeafComponent_state, value, "f");
    }
  }]);

  return LeafComponent;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
_LeafComponent_state = new WeakMap(), _LeafComponent_reactiveInstance = new WeakMap(), _LeafComponent_instances = new WeakSet(), _LeafComponent_defaultStyler = function _LeafComponent_defaultStyler() {
  return '';
};

export { baseClassComponents as HTMLClassElements, baseComponents as HTMLElements, LeafComponent, Reactive, createElement, createElementReactStyle, deleteEventListenerOf, eventListeners, getEventListenerOf, isElement, isEventListener, mountElements, patchElements, registerComponent, runCallbackOnElements, setEventListenerOf };
//# sourceMappingURL=leaf.mjs.map
