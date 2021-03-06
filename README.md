# Vuex Class Module

This is a simple class that utilizes ES7 decorators to provide Syntatic Sugar which enables you declare Vuex Modules using ES6 Classes. 

## Dependencies
   * Vue
   * Vuex
   * ES7 Decorators
 

## Installation
```
npm install --save-dev vuex-class-module
```

## Updates
* Removed global state
* Added ability to extend classes
* Removed implicit using, now you can use an object of class

## How to use

We can first define a module class

```
import { Mutation, Action, Getter, HasGetter, VuexClass } from "vuex-module-class";

@VuexClass
class MyModule {
  
  // Defines a vuex state and also a getter with the same name.
  @HasGetter firstname = "John";
  
  // Define a vuex state.
  lastname = "Doe";

  // Define a vuex mutation
  @Mutation changeFirstName(state, firstname) {
    state.firstname = firstname;
  }

  // yet another vuex mutation
  @Mutation changeLastName(state, lastname) {
    state.lastname = lastname;
  }

  // Define an cction
  @Action doAsync(context) {
    console.log("This should be an async process")
  }

  // Define a getter
  @Getter fullname(state) {
    return state.name + " " + state.lastname;
  }
}
```

Since all this is just using syntatic sugar for vuex modules, we can extract this as follows.

```
// It can then be exported as an object as:
export default new MyModule();
```

This will output
```
  const myModule = {
    state: {
      firstname: "John",
      lastname: "Doe",
    },
    mutations: {
      changeFirstName: function(state, firstname) {
        state.firstname = firstname;
      },
      changeLastName: function(state, lastname) {
        state.lastname = lastname;
      },
    },
    actions: {
      doAsync: function(context) {
        console.log("This should be an async process")
      },      
    },
    getters: {
      firstname: function(state) {
        return state.firstname;
      },
      fullname: function(state) {
        return state.name + " " + state.lastname;
      }      
    }
  }
```


## Advantages
   * Works well with normal vuex store.

   * Easy to read and intuitive.

