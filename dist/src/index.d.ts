declare var _default: {
    VuexClass: (options: {
        modules: {};
    }) => (target: any) => void;
    Getter: (target: any, key: string, descriptor: object) => void;
    Mutation: (target: any, key: string, descriptor: object) => void;
    Action: (target: any, key: string, descriptor: object) => void;
    HasGetter: (target: any, propertyKey: string) => void;
    extractVuexModule: (ModuleClass: any) => VuexModule;
};
export default _default;
