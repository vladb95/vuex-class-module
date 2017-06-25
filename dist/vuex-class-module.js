"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VuexClass = function (target) {
    var original = target;
    var f = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        original.apply(this, args);
        original.prototype = this;
        return original.prototype.store || this;
    };
    f.prototype = original.prototype;
    return f;
};
function State(target, key, descriptor) {
    if (!target.store)
        target.store = getNewModule();
    if (typeof target[key] === "function") {
        throw "State cann't be a function";
    }
    else {
        target.store.state[key] = target[key];
    }
}
exports.State = State;
function Mutation(target, key, descriptor) {
    if (!target.store)
        target.store = getNewModule();
    target.store.mutations[key] = target[key].bind(target);
}
exports.Mutation = Mutation;
function Action(target, key, descriptor) {
    if (!target.store)
        target.store = getNewModule();
    target.store.actions[key] = target[key].bind(target);
}
exports.Action = Action;
function Getter(target, key, descriptor) {
    if (!target.store)
        target.store = getNewModule();
    target.store.getters[key] = target[key].bind(target);
}
exports.Getter = Getter;
function HasGetter(target, propertyKey) {
    if (!target.store)
        target.store = getNewModule();
    target.store.getters[propertyKey] = function (state) {
        return state[propertyKey];
    };
}
exports.HasGetter = HasGetter;
function getNewModule(namespaced) {
    if (namespaced === void 0) { namespaced = true; }
    return {
        namespaced: namespaced,
        state: {},
        mutations: {},
        actions: {},
        getters: {},
        modules: {},
    };
}
//# sourceMappingURL=vuex-class-module.js.map