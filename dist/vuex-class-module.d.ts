export declare type VuexModule = {
    namespaced: boolean;
    state?: any;
    mutations?: any;
    actions?: any;
    getters?: any;
    modules?: any;
};
export declare var VuexClass: (target: any) => (...args: any[]) => any;
export declare function State(target: any, key: string, descriptor: object): void;
export declare function Mutation(target: any, key: string, descriptor: object): void;
export declare function Action(target: any, key: string, descriptor: object): void;
export declare function Getter(target: any, key: string, descriptor: object): void;
export declare function HasGetter(target: any, propertyKey: string): void;
