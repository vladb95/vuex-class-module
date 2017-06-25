"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var store = {};
/*export function VuexClass(options?: { modules: {} }) {
  return function ( target: any ) {
    const ModuleClass = target;
    const name = getNameFromClass( ModuleClass );
    if( nameIsNotFound( name ) ) {
      initializeStore( name );
    }
    assignState( ModuleClass, name );
    options && assignModules(options.modules, name);
  }
}*/
function VuexClass(constructor) {
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.store = getNewModule();
            return _this;
        }
        return class_1;
    }(constructor));
}
exports.VuexClass = VuexClass;
function Mutation(target, key, descriptor) {
    if (!target.store)
        throw "You must use VuexClass decorator";
    console.log(target);
    target.store.mutations[key] = target[key];
}
exports.Mutation = Mutation;
function Action(target, key, descriptor) {
    if (!target.store)
        throw "You must use VuexClass decorator";
    target.store.actions[key] = target[key];
}
exports.Action = Action;
function Getter(target, key, descriptor) {
    if (!target.store)
        throw "You must use VuexClass decorator";
    target.store.getters[key] = target[key];
}
exports.Getter = Getter;
function HasGetter(target, propertyKey) {
    if (!target.store)
        throw "You must use VuexClass decorator";
    target.store.getters[propertyKey] = function (state) {
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
    store[name] = getNewModule();
    return store[name];
}
function getNewModule(namespaced) {
    if (namespaced === void 0) { namespaced = true; }
    return {
        namespaced: namespaced,
        state: {},
        mutations: {},
        actions: {},
        getters: {},
        modules: {}
    };
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