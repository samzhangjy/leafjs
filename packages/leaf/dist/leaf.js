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
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

class t{constructor(){this.activeEffects=[],this.targetMap=new WeakMap,this.onChange=null;}getTrackableObject(t,e){for(const r in t)"object"==typeof t[r]&&(t[r]=this.getTrackableObject(t[r],e));const r=this,a=new Proxy(t,{get(t,r,a){const c=Reflect.get(t,r,a);return e.onGet(t,r,a),c},set(t,a,c,n){"object"==typeof c&&(c=r.getTrackableObject(c,e));const s=Reflect.set(t,a,c,n);return e.onSet(t,a,c,n),r.onChange&&r.onChange(),s},deleteProperty(t,r){const a=Reflect.deleteProperty(t,r);return e.onDeleteProperty(t,r),a}});return Array.isArray(t)&&Object.setPrototypeOf(a,Array.prototype),a}track(t,e){if(!this.activeEffects.length)return;let r=this.targetMap.get(t);r||(r=new Map,this.targetMap.set(t,r));let a=r.get(e);a||(a=new Set,r.set(e,a)),this.activeEffects.forEach((t=>null==a?void 0:a.add(t)));}trigger(t,e){const r=this.targetMap.get(t);if(!r)return;const a=r.get(e);a&&a.forEach((t=>{t();}));}watchEffect(t){this.activeEffects.push(t),t(),this.activeEffects.pop();}build(t){const e=this;return this.getTrackableObject(t,{onGet(t,r){e.track(t,r);},onSet(t,r){e.trigger(t,r);},onDeleteProperty(){}})}ref(t){const e=this,r={get value(){return e.track(r,"value"),t},set value(a){a!==t&&(t=a,e.trigger(r,"value"));}};return r}computed(t){const e=this.ref(null);return this.watchEffect((()=>e.value=t())),e}onStateChange(t){this.onChange=t,t();}}

/**
 * Check if element is NodeList-like.
 * @param content Element to check.
 * @returns Is `content` having structures like `NodeList`.
 */
const isNodeListLike = (content) => {
    return (HTMLCollection.prototype.isPrototypeOf(content) ||
        NodeList.prototype.isPrototypeOf(content) ||
        Array.isArray(content));
};
/**
 * Check if element is Node-like.
 * @param content Element to check.
 * @returns Is `content` having structures like `Node`.
 */
const isNodeLike = (content) => {
    return typeof content.nodeType !== 'undefined' || typeof content === 'string' || typeof content === 'number';
};
/**
 * Register a leaf component to `CustomElementsRegistery`.
 * @param tagName Tag name to use in templates.
 * @param component a defined `LeafComponent` class.
 * @returns A function used to create the custom component.
 */
const registerComponent = (tagName, component, props) => {
    customElements.define(tagName, component, props);
    return (...args) => {
        return new component(...args);
    };
};
/** Preserved element attributes mapping */
const preservedProps = {
    className: 'class',
};
/**
 * Insert element or elements to node, depending on the actual type of `content`.
 * @param node Parent node to insert content to.
 * @param content Custom content elements to insert.
 */
const appendContentToNode = (node, content) => {
    if (isNodeListLike(content)) {
        // IMPORTANT: filter falsy nodes out to allow syntaxes like `condition && renderSomething()`
        content = [...content].filter((node) => node);
        for (const ele of content) {
            if (Array.isArray(ele)) {
                appendContentToNode(node, ele);
                continue;
            }
            node.append(ele);
        }
    }
    else {
        node.append(content);
    }
};

/** Base HTML elements mapping */
const LeafBaseComponents = [
    { name: 'button', extends: HTMLButtonElement },
    { name: 'div', extends: HTMLDivElement },
    { name: 'input', extends: HTMLInputElement },
    { name: 'h1', extends: HTMLHeadingElement },
    { name: 'h2', extends: HTMLHeadingElement },
    { name: 'h3', extends: HTMLHeadingElement },
    { name: 'h4', extends: HTMLHeadingElement },
    { name: 'h5', extends: HTMLHeadingElement },
    { name: 'h6', extends: HTMLHeadingElement },
    { name: 'p', extends: HTMLParagraphElement },
    { name: 'li', extends: HTMLLIElement },
    { name: 'ul', extends: HTMLUListElement },
    { name: 'ol', extends: HTMLOListElement },
    { name: 'span', extends: HTMLSpanElement },
    { name: 'form', extends: HTMLFormElement },
    { name: 'label', extends: HTMLLabelElement },
    { name: 'a', extends: HTMLAnchorElement },
    { name: 'textarea', extends: HTMLTextAreaElement },
    { name: 'iframe', extends: HTMLIFrameElement },
    { name: 'img', extends: HTMLImageElement },
    { name: 'video', extends: HTMLVideoElement },
];
const baseClassComponents = {};
const baseComponents = {};
/**
 * Construct a custom `HTMLElement` with given parent to extend from.
 * @param parent `HTMLElement` class to inherit from.
 * @returns Consturcted element subclass.
 */
const makeBaseClassComponent = (parent) => {
    return class extends parent {
        constructor(content, props) {
            super();
            if (!content)
                return;
            if (!isNodeLike(content) && !isNodeListLike(content)) {
                for (const propName in content) {
                    this.setAttribute(propName in preservedProps ? preservedProps[propName] : propName, content[propName]);
                }
                return;
            }
            appendContentToNode(this, [...content]);
            if (!props)
                return;
            for (const propName in props) {
                this.setAttribute(propName in preservedProps ? preservedProps[propName] : propName, props[propName]);
            }
        }
    };
};
LeafBaseComponents.forEach((component) => {
    baseComponents[component.name] = (content, props) => {
        return createElement(component.name, content, props);
    };
    baseClassComponents[component.name] = makeBaseClassComponent(component.extends);
    registerComponent(`leaf-__${component.name}`, baseClassComponents[component.name], { extends: component.name });
});

var _LeafComponent_instances, _LeafComponent_state, _LeafComponent_reactiveInstance, _LeafComponent_defaultStyler;
const _createElement = (tag, props, content) => {
    const element = document.createElement(tag);
    for (const prop in props) {
        if (prop.startsWith('on')) {
            element.addEventListener(prop.substring(2).toLowerCase(), props[prop]);
            continue;
        }
        element.setAttribute(prop, props[prop]);
    }
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
const createElement = (tag, content, props) => {
    if (typeof content === 'undefined')
        return _createElement(tag);
    if (!isNodeLike(content) && !isNodeListLike(content)) {
        return _createElement(tag, content);
    }
    return _createElement(tag, props, content);
};
/**
 * Invoke a function with either invoking one-by-one through a list or invoking directly.
 * @param elements Element or element list.
 * @param callback Function to invoke.
 */
const runCallbackOnElements = (elements, callback) => {
    if (isNodeListLike(elements)) {
        for (const ele of elements) {
            if (Array.isArray(ele)) {
                runCallbackOnElements(ele, callback);
                continue;
            }
            callback(ele);
        }
    }
    else {
        callback(elements);
    }
};
/**
 * Core Leaf component class.
 *
 * This class is a thin wrapper of `HTMLElement` class and integrates a shadow DOM within.
 */
class LeafComponent extends HTMLElement {
    constructor() {
        super();
        _LeafComponent_instances.add(this);
        _LeafComponent_state.set(this, null);
        _LeafComponent_reactiveInstance.set(this, null);
    }
    /** Component inner state. */
    get state() {
        return __classPrivateFieldGet(this, _LeafComponent_state, "f");
    }
    /** {@inheritDoc LeafComponent.state} */
    set state(value) {
        if (!__classPrivateFieldGet(this, _LeafComponent_state, "f")) {
            __classPrivateFieldSet(this, _LeafComponent_reactiveInstance, new t(), "f");
            __classPrivateFieldSet(this, _LeafComponent_state, __classPrivateFieldGet(this, _LeafComponent_reactiveInstance, "f").build(value), "f");
            return;
        }
        __classPrivateFieldSet(this, _LeafComponent_state, value, "f");
    }
    /**
     * Start component lifecycle.
     *
     * This function is invoked when the first initialization of the component.
     */
    connectedCallback() {
        var _a, _b;
        const shadow = this.attachShadow({ mode: 'closed' });
        let renderResult = null;
        const styleElement = createElement('style');
        const styler = (_a = this.css) !== null && _a !== void 0 ? _a : __classPrivateFieldGet(this, _LeafComponent_instances, "m", _LeafComponent_defaultStyler);
        styleElement.textContent = styler();
        shadow.appendChild(styleElement);
        const renderComponent = () => {
            if (renderResult) {
                runCallbackOnElements(renderResult, (ele) => shadow.removeChild(ele));
            }
            renderResult = this.render();
            runCallbackOnElements(renderResult, (ele) => shadow.appendChild(ele));
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
    render() {
        return this;
    }
    /**
     * Inject CSS stylesheet to component. If not given, leaf will inject an empty string by default.
     *
     * Not to be confused with the builtin prop `style`.
     * @returns CSS stylesheet string.
     */
    css() {
        return '';
    }
}
_LeafComponent_state = new WeakMap(), _LeafComponent_reactiveInstance = new WeakMap(), _LeafComponent_instances = new WeakSet(), _LeafComponent_defaultStyler = function _LeafComponent_defaultStyler() {
    return '';
};

export { baseClassComponents as HTMLClassElements, baseComponents as HTMLElements, LeafComponent, t as Reactive, createElement, registerComponent, runCallbackOnElements };
//# sourceMappingURL=leaf.js.map
