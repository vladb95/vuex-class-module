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
        original.prototype.store.state = this;
        return original.prototype.store;
    };
    f.prototype = original.prototype;
    return f;
};
function Mutation(target, key, descriptor) {
    if (!target.store)
        target.store = getNewModule();
    target.store.mutations[key] = target[key];
}
exports.Mutation = Mutation;
function Action(target, key, descriptor) {
    if (!target.store)
        target.store = getNewModule();
    target.store.actions[key] = target[key];
}
exports.Action = Action;
function Getter(target, key, descriptor) {
    if (!target.store)
        target.store = getNewModule();
    target.store.getters[key] = target[key];
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