export type VuexModule = {
  namespaced: boolean,
  state?: any,
  mutations?: any,
  actions?: any,
  getters?: any,
  modules?: any,
}

const store:any = {}

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

export function VuexClass<T extends {new(...args:any[]):{}}>(constructor: T): any {
    return class extends constructor {
        store = getNewModule();
    }
}

export function Mutation( target:any, key:string, descriptor:object ) {
  if (!target.store) throw "You must use VuexClass decorator";
  target.store.mutations[ key ] = target[ key ];
}

export function Action( target:any, key:string, descriptor:object ) {
  if (!target.store) throw "You must use VuexClass decorator";
  target.store.actions[ key ] = target[ key ];
}

export function Getter( target:any, key:string, descriptor:object) {
  if (!target.store) throw "You must use VuexClass decorator";
  target.store.getters[ key ] = target[ key ];   
}

export function HasGetter( target:any, propertyKey:string) {
  if (!target.store) throw "You must use VuexClass decorator";
  target.store.getters[propertyKey] = function(state:any) {
    return state[ propertyKey ];
  }     
}

export function extractVuexModule( ModuleClass:any ): VuexModule {
  const name = ModuleClass.name;
  return store[ name ];
}

function assignState( ModuleClass: any, moduleName?: string ) {
  let vModule = store[ moduleName ];
  const classModule = new ModuleClass();
  const allProps = Object.getOwnPropertyNames( classModule );
  allProps.forEach( function( prop) {
    if( prop == moduleName ) return;
    vModule.state[ prop ] = classModule[ prop ];
  })
}

function assignModules( modules:object, moduleName:string ) {
  store[ moduleName ].modules = modules;
}


function initializeStore( name: string ): VuexModule {
  store[ name ] = getNewModule();
  return store[ name ];
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

function getNameFromTarget( target:any ):string {
  return target.constructor.name;
}

function getNameFromClass( Class:any ): string {
  return Class.name;
}

function nameIsNotFound( name: string ): boolean {
  return store[ name ] == undefined;
}