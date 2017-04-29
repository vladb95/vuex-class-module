"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store = {};
function VuexClass(options) {
    console.log(options.modules);
    return function (target) {
        const ModuleClass = target;
        const name = getNameFromClass(ModuleClass);
        if (nameIsNotFound(name)) {
            initializeStore(name);
        }
        assignState(ModuleClass, name);
        assignModules(options.modules, name);
    };
}
exports.VuexClass = VuexClass;
function Mutation(target, key, descriptor) {
    const name = getNameFromTarget(target);
    if (nameIsNotFound(name)) {
        initializeStore(name);
    }
    store[name].mutations[key] = target[key];
}
exports.Mutation = Mutation;
function Action(target, key, descriptor) {
    const name = getNameFromTarget(target);
    if (nameIsNotFound(name)) {
        initializeStore(name);
    }
    store[name].actions[key] = target[key];
}
exports.Action = Action;
function Getter(target, key, descriptor) {
    const name = getNameFromTarget(target);
    if (nameIsNotFound(name)) {
        initializeStore(name);
    }
    store[name].getters[key] = target[key];
}
exports.Getter = Getter;
function HasGetter(target, propertyKey) {
    const name = getNameFromTarget(target);
    if (nameIsNotFound(name)) {
        initializeStore(name);
    }
    store[name].getters[propertyKey] = function (state) {
        return state[propertyKey];
    };
}
exports.HasGetter = HasGetter;
function extractVuexModule(ModuleClass) {
    const name = ModuleClass.name;
    return store[name];
}
exports.extractVuexModule = extractVuexModule;
function assignState(ModuleClass, moduleName) {
    let vModule = store[moduleName];
    const classModule = new ModuleClass();
    const allProps = Object.getOwnPropertyNames(classModule);
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
    const vmodule = {
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