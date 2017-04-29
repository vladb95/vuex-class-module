export type VuexModule = {
  namespaced: boolean,
  state?: any,
  mutations?: any,
  actions?: any,
  getters?: any,
  modules?: any,
}

const store:any = {}

export function VuexClass(options:{ modules: {} }) {
  return function ( target:any ) {
    const ModuleClass = target
    const name = getNameFromClass( ModuleClass );
    if( nameIsNotFound( name ) ) {
      initializeStore( name );
    }
    assignState( ModuleClass, name );
    assignModules( options.modules, name );
  }
}

export function Mutation( target:any, key:string, descriptor:object ) {
  const name = getNameFromTarget( target );
  if( nameIsNotFound(name) ) {
    initializeStore( name );
  }
  store[ name ].mutations[ key ] = target[ key ];
}

export function Action( target:any, key:string, descriptor:object ) {
  const name = getNameFromTarget( target );
  if( nameIsNotFound(name) ) {
    initializeStore( name );
  }
  store[ name ].actions[ key ] = target[ key ];
}

export function Getter( target:any, key:string, descriptor:object) {
  const name = getNameFromTarget( target );
  if( nameIsNotFound(name) ) {
      initializeStore(name);
  }
  store[ name ].getters[ key ] = target[ key ];   
}

export function HasGetter( target:any, propertyKey:string) {
  const name = getNameFromTarget( target );
  if( nameIsNotFound(name) ) {
    initializeStore(name);
  }
  store[ name ].getters[propertyKey] = function(state:any) {
    return state[ propertyKey ];
  }     
}

export function extractVuexModule( ModuleClass:any ): VuexModule {
  const name = ModuleClass.name;
  return store[ name ];
}

function assignState( ModuleClass:any, moduleName?:string ) {
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
  const vmodule = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {},
  };
  store[ name ] = vmodule;
  return store[ name ]; 
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