'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

Object.defineProperty(reactivity_min, "__esModule", {
  value: !0
});

var t = function () {
  function t() {
    this.activeEffects = [], this.targetMap = new WeakMap(), this.onChange = null, this.isSetting = !1, this.actualState = void 0;
  }

  var e = t.prototype;
  return e.getTrackableObject = function (t, e) {
    for (var n in t) {
      t[n] && "object" == typeof t[n] && (t[n] = this.getTrackableObject(t[n], e));
    }

    var r = this,
        i = new Proxy(t, {
      get: function get(t, n, r) {
        var i = Reflect.get(t, n, r);
        return e.onGet(t, n, r), i;
      },
      set: function set(t, n, i, a) {
        "object" == typeof i && (i = r.getTrackableObject(i, e));
        var c = Reflect.set(t, n, i, a);
        return e.onSet(t, n, i, a), c;
      },
      deleteProperty: function deleteProperty(t, n) {
        var r = Reflect.deleteProperty(t, n);
        return e.onDeleteProperty(t, n), r;
      }
    });
    return Array.isArray(t) && Object.setPrototypeOf(i, Array.prototype), i;
  }, e.track = function (t, e) {
    if (this.activeEffects.length) {
      var n = this.targetMap.get(t);
      n || (n = new Map(), this.targetMap.set(t, n));
      var r = n.get(e);
      r || (r = new Set(), n.set(e, r)), this.activeEffects.forEach(function (t) {
        return null == r ? void 0 : r.add(t);
      });
    }
  }, e.trigger = function (t, e) {
    var n = this.targetMap.get(t);

    if (n) {
      var r = n.get(e);
      r && r.forEach(function (t) {
        t();
      });
    }
  }, e.watchEffect = function (t) {
    this.activeEffects.push(t), t(), this.activeEffects.pop();
  }, e.build = function (t) {
    var e = this,
        n = this,
        r = function t() {
      e.isSetting ? setTimeout(t, 2) : e.onChange && e.onChange();
    };

    return this.actualState = this.getTrackableObject(t, {
      onGet: function onGet(t, e) {
        n.track(t, e);
      },
      onSet: function onSet(t, e) {
        n.isSetting || (n.isSetting = !0, r()), n.trigger(t, e), n.isSetting = !1;
      },
      onDeleteProperty: function onDeleteProperty() {}
    }), this.actualState;
  }, e.ref = function (t) {
    var e = this,
        n = {
      get value() {
        return e.track(n, "value"), t;
      },

      set value(r) {
        r !== t && (t = r, e.trigger(n, "value"));
      }

    };
    return n;
  }, e.computed = function (t) {
    var e = this.ref(null);
    return this.watchEffect(function () {
      return e.value = t();
    }), e;
  }, e.onStateChange = function (t) {
    this.onChange = t, t();
  }, t;
}();

var Reactive = reactivity_min.Reactive = t;

var componentMap = new WeakMap();
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
  componentMap.set(component, tagName);
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
 * Check is a node falsy.
 * @param node Element node to check.
 * @returns Is `node` falsy or not.
 */

var isFalsyNode = function isFalsyNode(node) {
  return node === false || node === undefined || node === null;
};
/**
 * Insert element or elements to node, depending on the actual type of `content`.
 * @param node Parent node to insert content to.
 * @param content Custom content elements to insert.
 */

var appendContentToNode = function appendContentToNode(node, content) {
  if (isNodeListLike(content)) {
    for (var _iterator = _createForOfIteratorHelperLoose(content), _step; !(_step = _iterator()).done;) {
      var ele = _step.value;
      // IMPORTANT: filter falsy nodes out to allow syntaxes like `condition && renderSomething()`
      if (isFalsyNode(ele)) continue;

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

var _LeafComponent_instances, _LeafComponent_state, _LeafComponent_reactiveInstance, _LeafComponent_previousRenderResult, _LeafComponent_shadow, _LeafComponent_key, _LeafComponent_isMounted, _LeafComponent_defaultStyler;
var eventListeners = new WeakMap();
/** Attributes to be updated specially, such as `input.value` vs `input.attributes.value` */

var directPropUpdate = [{
  name: 'value',
  attr: 'value'
}];
var reactiveInstances = new Map();
/**
 * Check if an attribute is an event handler.
 * @param propName Attribute name to check.
 * @param _propContent Attribute value to assert.
 * @returns Is this attribute an event handler.
 */

var isEventListener = function isEventListener(propName, _propContent) {
  return propName.startsWith('on');
};
/**
 * Check is a node an element node.
 * @param node `Node` object to check.
 * @returns Is `node` an element node.
 */

var isElement = function isElement(node) {
  return node.nodeType === Node.ELEMENT_NODE;
};

var isLeafComponent = function isLeafComponent(element) {
  return element.isLeafComponent === true;
};

var isTextNode = function isTextNode(node) {
  return node.nodeType === Node.TEXT_NODE;
};
/**
 * Check is a value a valid Leaf attribute.
 * @param attr Attribute value to check.
 * @returns Is `attr` a valid Leafjs attribute.
 */


var isValidAttribute = function isValidAttribute(attr) {
  return typeof attr === 'string' || typeof attr === 'number' || typeof attr === 'boolean';
};

var _createElement = function _createElement(tag, props, content) {
  if (typeof tag !== 'string') {
    var tagName = componentMap.get(tag);
    if (!tagName) throw new Error('Unable to fetch component from registery.');else tag = tagName;
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

    if (isLeafComponent(element)) {
      element.props[prop] = propContent;
      if (!isValidAttribute(propContent)) continue;
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
    deleteEventListenerOf(newParent);
  }

  for (var i = 0, j = 0; Math.max(i, j) < Math.min(oldLen, newLen); i++, j++) {
    var oldChild = oldChildren[i];
    var newChild = newChildren[j]; // IMPORTANT: filter out preserved elements, in this case `<style />` tag

    if (isElement(oldChild) && oldChild.hasAttribute('leaf-preserve')) {
      oldChild = oldChildren[++i];
      oldLen--;
    } // special optimizing for Leaf components


    if (isLeafComponent(oldChild)) oldChild.isUpdating = true;
    if (isLeafComponent(newChild)) newChild.isUpdating = true; // process attributes here so `connectedCallback` will receive the correct attribute

    if (isElement(oldChild) && isElement(newChild)) {
      // replace attributes
      var oldAttributes = Array.prototype.slice.call(oldChild.attributes);
      var newAttributes = Array.prototype.slice.call(newChild.attributes);

      for (var _iterator2 = _createForOfIteratorHelperLoose(newAttributes), _step2; !(_step2 = _iterator2()).done;) {
        var attr = _step2.value;
        // don't assign objects to attributes, assign to properties only
        if (!isValidAttribute(attr.value) || oldChild.getAttribute(attr.name) === attr.value) continue;
        oldChild.setAttribute(attr.name, attr.value);

        for (var _iterator4 = _createForOfIteratorHelperLoose(directPropUpdate), _step4; !(_step4 = _iterator4()).done;) {
          var specialProp = _step4.value;
          if (specialProp.name !== attr.name) continue; // @ts-ignore

          oldChild[specialProp.name] = attr.value;
        }
      }

      for (var _iterator3 = _createForOfIteratorHelperLoose(oldAttributes), _step3; !(_step3 = _iterator3()).done;) {
        var _attr = _step3.value;
        // only remove the attribute if it's not in the new element
        if (newChild.hasAttribute(_attr.name)) continue;
        oldChild.removeAttribute(_attr.name);
      }
    }

    if (isElement(oldChild) && isElement(newChild) && oldChild.tagName !== newChild.tagName) {
      var referenceElement = oldChild.previousSibling;
      oldChild.outerHTML = oldChild.outerHTML.replace(new RegExp("<" + oldChild.tagName.toLowerCase() + "(.*?)", 'g'), "<" + newChild.tagName.toLowerCase() + "$1").replace(new RegExp("</" + oldChild.tagName.toLowerCase() + "(.*?)", 'g'), "</" + newChild.tagName.toLowerCase() + "$1"); // IMPORTANT: setting outerHTML will not update the element reference itself,
      // so refreshing the element by a reference element is needed

      if (referenceElement) {
        oldChild = referenceElement.nextSibling;
      } else {
        oldChild = oldParent.firstChild;
      }

      if (!isElement(oldChild)) continue;
      if (isLeafComponent(oldChild)) oldChild.isUpdating = true;
    } // update properties for Leaf components


    if (isLeafComponent(oldChild) && isLeafComponent(newChild)) {
      // always keep attributes and props in-sync
      for (var _iterator5 = _createForOfIteratorHelperLoose(newChild.attributes), _step5; !(_step5 = _iterator5()).done;) {
        var _attr2 = _step5.value;
        oldChild.props[_attr2.name] = _attr2.value;
      }

      for (var prop in newChild.props) {
        oldChild.props[prop] = newChild.props[prop];
      }

      for (var _prop in oldChild.props) {
        if (_prop in newChild.props || newChild.hasAttribute(_prop)) continue;
        delete oldChild.props[_prop];
      }
    }

    if (isTextNode(oldChild) && isTextNode(newChild)) {
      if (oldChild.textContent === newChild.textContent) continue;
      oldParent.replaceChild(newChild, oldChild);
      continue;
    }

    if (isTextNode(oldChild) && isElement(newChild)) {
      oldParent.replaceChild(newChild, oldChild);
      oldChild = newChild;
      if (isLeafComponent(oldChild)) oldChild.isUpdating = true;
    }

    if (isElement(oldChild) && isTextNode(newChild)) {
      oldParent.replaceChild(newChild, oldChild);
      continue;
    }

    patchElements(Array.from(oldChild.childNodes), Array.from(newChild.childNodes), oldChild, newChild);

    if (isLeafComponent(oldChild)) {
      oldChild.isUpdating = false;
      oldChild.rerender();
    }
  } // insert new elements


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
    oldChildren.slice(newLen).forEach(function (child) {
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

    _LeafComponent_previousRenderResult.set(_assertThisInitialized(_this), null);

    _LeafComponent_shadow.set(_assertThisInitialized(_this), null);

    _LeafComponent_key.set(_assertThisInitialized(_this), undefined);

    _LeafComponent_isMounted.set(_assertThisInitialized(_this), false);

    _this.isLeafComponent = true;
    _this.isUpdating = false;
    var props = {}; // initialize properties

    for (var _iterator6 = _createForOfIteratorHelperLoose(_this.constructor.observedAttributes), _step6; !(_step6 = _iterator6()).done;) {
      var attr = _step6.value;
      props[attr] = null;
    }

    var outerThis = _assertThisInitialized(_this);

    var checkIsPropNameValid = function checkIsPropNameValid(key) {
      if (!_this.constructor.observedAttributes.includes(key)) {
        // throw an error if `key` isn't defined by the component
        throw new Error("Unknown property " + key + ". Expected one of " + _this.constructor.observedAttributes.map(function (attr) {
          return "'" + attr + "'";
        }).join(', ') + ".");
      }
    };

    _this.props = new Proxy(props, {
      get: function get(target, key, receiver) {
        checkIsPropNameValid(key);
        return Reflect.get(target, key, receiver);
      },
      set: function set(target, key, value, receiver) {
        checkIsPropNameValid(key);

        if (isValidAttribute(value)) {
          outerThis.setAttribute(key, value.toString());
        }

        var result = Reflect.set(target, key, value, receiver);
        if (__classPrivateFieldGet(outerThis, _LeafComponent_isMounted, "f")) outerThis.rerender();
        return result;
      },
      has: function has(_target, key) {
        return outerThis.constructor.observedAttributes.includes(key);
      },
      deleteProperty: function deleteProperty(target, key) {
        checkIsPropNameValid(key);
        return Reflect.deleteProperty(target, key);
      }
    });
    return _this;
  }

  var _proto = LeafComponent.prototype;

  /**
   * Dispatch a custom event to listeners.
   * @param event Event object or name to fire.
   * @param data Extra data to pass to `CustomEvent.detail`.
   * @returns Is the fired event's `preventDefault` hook called.
   */
  _proto.fireEvent = function fireEvent(event, data) {
    if (event instanceof Event) {
      // stop bubbling to prevent multiple invokation of the event
      event.stopPropagation();
      return this.fireEvent(event.type, data);
    }

    var toDispatch = new CustomEvent(event, {
      detail: data
    });
    return this.dispatchEvent(toDispatch);
  }
  /**
   * Rerender the component based on current state.
   */
  ;

  _proto.rerender = function rerender() {
    var _a;

    if (!__classPrivateFieldGet(this, _LeafComponent_shadow, "f") || this.isUpdating || !__classPrivateFieldGet(this, _LeafComponent_isMounted, "f") || ((_a = __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f")) === null || _a === void 0 ? void 0 : _a.isSetting)) return;
    if (__classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f")) __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f").isSetting = true;
    this.onMounted();
    var renderResult = this.render();
    if (!Array.isArray(renderResult)) renderResult = [renderResult];
    if (__classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f")) __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f").isSetting = false;

    if (!__classPrivateFieldGet(this, _LeafComponent_previousRenderResult, "f")) {
      mountElements(renderResult, __classPrivateFieldGet(this, _LeafComponent_shadow, "f"));

      __classPrivateFieldSet(this, _LeafComponent_previousRenderResult, renderResult, "f");

      return;
    }

    patchElements(Array.from(__classPrivateFieldGet(this, _LeafComponent_shadow, "f").childNodes), Array.from(renderResult), __classPrivateFieldGet(this, _LeafComponent_shadow, "f"), renderResult[0]);

    __classPrivateFieldSet(this, _LeafComponent_previousRenderResult, renderResult, "f");
  }
  /**
   * Callback when the component is mounted / re-mounted.
   */
  ;

  _proto.onMounted = function onMounted() {
    return;
  }
  /**
   * Start component lifecycle.
   *
   * This function is invoked when the first initialization of the component.
   */
  ;

  _proto.connectedCallback = function connectedCallback() {
    var _this2 = this;

    var _a, _b, _c, _d;

    __classPrivateFieldSet(this, _LeafComponent_isMounted, true, "f");

    __classPrivateFieldSet(this, _LeafComponent_shadow, this.attachShadow({
      mode: 'closed'
    }), "f");

    var styleElement = createElement('style');
    var styler = (_a = this.css) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _LeafComponent_instances, "m", _LeafComponent_defaultStyler);
    styleElement.textContent = styler();
    styleElement.setAttribute('leaf-preserve', 'true');

    __classPrivateFieldGet(this, _LeafComponent_shadow, "f").appendChild(styleElement);

    var currentInstance = reactiveInstances.get(__classPrivateFieldGet(this, _LeafComponent_key, "f") || ''); // adopt the previous reactive data, if any

    if (currentInstance) __classPrivateFieldSet(this, _LeafComponent_reactiveInstance, currentInstance, "f"); // or create a new one
    else if (__classPrivateFieldGet(this, _LeafComponent_state, "f")) __classPrivateFieldSet(this, _LeafComponent_reactiveInstance, new Reactive(), "f");

    if ((_b = __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f")) === null || _b === void 0 ? void 0 : _b.actualState) {
      __classPrivateFieldSet(this, _LeafComponent_state, __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f").actualState, "f");
    } else if (__classPrivateFieldGet(this, _LeafComponent_state, "f")) {
      __classPrivateFieldSet(this, _LeafComponent_state, (_c = __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f")) === null || _c === void 0 ? void 0 : _c.build(__classPrivateFieldGet(this, _LeafComponent_state, "f")), "f");
    } // IMPORTANT: only set the current `Reactive` instance when the key is valid


    if (__classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f") && __classPrivateFieldGet(this, _LeafComponent_key, "f")) reactiveInstances.set(__classPrivateFieldGet(this, _LeafComponent_key, "f"), __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f"));

    if (!__classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f")) {
      this.rerender();
      return;
    }

    (_d = __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f")) === null || _d === void 0 ? void 0 : _d.onStateChange(function () {
      return _this2.rerender();
    });
  };

  _proto.attributeChangedCallback = function attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return; // handle keying

    if (name === 'key') {
      __classPrivateFieldSet(this, _LeafComponent_key, newVal, "f");
    } // rerender when attributes changed


    this.rerender();
  }
  /**
   * Core rendering logic of a component.
   * @returns HTML element to be rendered and attached.
   */
  ;

  _proto.render = function render() {
    throw new Error('Render function of `LeafComponent` must be overrided.');
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
    get:
    /** Component inner state. */
    function get() {
      if (!__classPrivateFieldGet(this, _LeafComponent_isMounted, "f")) return;
      return __classPrivateFieldGet(this, _LeafComponent_state, "f");
    }
    /** {@inheritDoc LeafComponent.fireEvent} */
    ,
    set: function set(value) {
      __classPrivateFieldSet(this, _LeafComponent_state, value, "f");
    }
    /** Event listeners attached to component. */

  }, {
    key: "listeners",
    get: function get() {
      return Array.from(getEventListenerOf(this) || []);
    }
  }], [{
    key: "watchedProps",
    get: function get() {
      return [];
    }
  }, {
    key: "observedAttributes",
    get: function get() {
      return [].concat(this.watchedProps, ['key']);
    }
  }]);

  return LeafComponent;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
_LeafComponent_state = new WeakMap(), _LeafComponent_reactiveInstance = new WeakMap(), _LeafComponent_previousRenderResult = new WeakMap(), _LeafComponent_shadow = new WeakMap(), _LeafComponent_key = new WeakMap(), _LeafComponent_isMounted = new WeakMap(), _LeafComponent_instances = new WeakSet(), _LeafComponent_defaultStyler = function _LeafComponent_defaultStyler() {
  return '';
};

exports.HTMLClassElements = baseClassComponents;
exports.HTMLElements = baseComponents;
exports.LeafComponent = LeafComponent;
exports.Reactive = Reactive;
exports.createElement = createElement;
exports.createElementReactStyle = createElementReactStyle;
exports.deleteEventListenerOf = deleteEventListenerOf;
exports.directPropUpdate = directPropUpdate;
exports.eventListeners = eventListeners;
exports.getEventListenerOf = getEventListenerOf;
exports.isElement = isElement;
exports.isEventListener = isEventListener;
exports.isValidAttribute = isValidAttribute;
exports.mountElements = mountElements;
exports.patchElements = patchElements;
exports.reactiveInstances = reactiveInstances;
exports.registerComponent = registerComponent;
exports.runCallbackOnElements = runCallbackOnElements;
exports.setEventListenerOf = setEventListenerOf;
//# sourceMappingURL=leaf.js.map
