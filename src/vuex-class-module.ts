export type VuexModule = {
  namespaced: boolean,
  state?: any,
  mutations?: any,
  actions?: any,
  getters?: any,
  modules?: any,
}

export var VuexClass = function (target) {
    let original = target;

    let f = function (...args) {
        original.apply(this, args);
        original.prototype = this;
        return original.prototype.store || this;
    }

    f.prototype = original.prototype;
    return f;
}

export function State (target: any, key: string, descriptor: object) {
  if (!target.store) target.store = getNewModule();
  if (typeof target[key] === "function") {
    throw "State cann't be a function";
  } else {
    target.store.state[key] = target[key];
  }
}

export function Mutation (target: any, key: string, descriptor: object) {
  if (!target.store) target.store = getNewModule();
  target.store.mutations[key] = target[key].bind(target);
}

export function Action(target: any, key: string, descriptor: object) {
  if (!target.store) target.store = getNewModule();
  target.store.actions[key] = target[key].bind(target);
}

export function Getter (target: any, key: string, descriptor: object) {
  if (!target.store) target.store = getNewModule();
  target.store.getters[key] = target[key].bind(target);   
}

export function HasGetter (target: any, propertyKey: string) {
  if (!target.store) target.store = getNewModule();
  target.store.getters[propertyKey] = (state: any) => {
    return state[propertyKey];
  }
}

function getNewModule (namespaced: boolean = true): VuexModule {
  return {
    namespaced,
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {},
  };
}
