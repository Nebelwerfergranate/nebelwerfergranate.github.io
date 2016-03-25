"use strict";

class Component {
    constructor(options) {
        this._el = options.element;
    }

    get element(){
        return this._el;
    }

    hide() {
        this._el.classList.add('js-hidden');
    }

    show(phoneDetails) {
        this._el.classList.remove('js-hidden');
    }

    on(eventName, handler) {
        this._el.addEventListener(eventName, handler);
    }

    _trigger(eventName, data, options) {
        options = options || {};

        if (data !== undefined && data !== null) {
            options.detail = data;
        }

        let event = new CustomEvent(eventName, options);

        this._el.dispatchEvent(event);
    }
}