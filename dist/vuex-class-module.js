"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store = {};
function VuexClass(options) {
    return function (target) {
        var ModuleClass = target;
        var name = getNameFromClass(ModuleClass);
        if (nameIsNotFound(name)) {
            initializeStore(name);
        }
        assignState(ModuleClass, name);
        assignModules(options.modules, name);
    };
}
exports.VuexClass = VuexClass;
function Mutation(target, key, descriptor) {
    var name = getNameFromTarget(target);
    if (nameIsNotFound(name)) {
        initializeStore(name);
    }
    store[name].mutations[key] = target[key];
}
exports.Mutation = Mutation;
function Action(target, key, descriptor) {
    var name = getNameFromTarget(target);
    if (nameIsNotFound(name)) {
        initializeStore(name);
    }
    store[name].actions[key] = target[key];
}
exports.Action = Action;
function Getter(target, key, descriptor) {
    var name = getNameFromTarget(target);
    if (nameIsNotFound(name)) {
        initializeStore(name);
    }
    store[name].getters[key] = target[key];
}
exports.Getter = Getter;
function HasGetter(target, propertyKey) {
    var name = getNameFromTarget(target);
    if (nameIsNotFound(name)) {
        initializeStore(name);
    }
    store[name].getters[propertyKey] = function (state) {
        return state[propertyKey];
    };
}
exports.HasGetter = HasGetter;
function extractVuexModule(ModuleClass) {
    var name = ModuleClass.name;
    return store[name];
}
exports.extractVuexModule = extractVuexModule;
function assignState(ModuleClass, moduleName) {
    var vModule = store[moduleName];
    var classModule = new ModuleClass();
    var allProps = Object.getOwnPropertyNames(classModule);
    allProps.forEach(function (prop) {
        if (prop == moduleName)
            return;
        vModule.state[prop] = classModule[prop];
    });
}
function assignModules(modules, moduleName) {
    store[moduleName].modules = modules;
}
function initializeStore(name) {
    var vmodule = {
        namespaced: true,
        state: {},
        mutations: {},
        actions: {},
        getters: {},
        modules: {},
    };
    store[name] = vmodule;
    return store[name];
}
function getNameFromTarget(target) {
    return target.constructor.name;
}
function getNameFromClass(Class) {
    return Class.name;
}
function nameIsNotFound(name) {
    return store[name] == undefined;
}
//# sourceMappingURL=vuex-class-module.js.map