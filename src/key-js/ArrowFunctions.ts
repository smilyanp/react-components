'use strict mode'
/*
 * Arrow Functions
 */

// ES5
var add = function (x) {
    return function (y) {
        return x + y
    }
};
add(2)(3) // 5

// ES6
let add = x => y => x + y
add(2)(3) // 5

/*
 * Syntax and returning
 */

// return statements can be implied
// {} not required if its only one line of statement
// () not required if you pass only one argument
// _ If there is no arguments


/*
 * Arguments binding
 */

function regular (a, b) {
    console.log(arguments)
}

// vs error

const arrow = (a, b) => {
    console.log(arguments)
}

// or

var arrowArgs = (...args) => {
    console.log(...args)
}


/*
 * this
 */

// Simple Invocation: this equals the global object or maybe undefined if you are using strict mode.
// Method Invocation: this equals the object that owns the method.
// Indirect Invocation: this equals the first argument.
// Constructor Invocation: this equals the newly created instance.

// 1️ Simple Invocation
function simpleInvocation() {
    console.log(this);
}
simpleInvocation();
// Window Object

// 2️ Method Invocation
const methodInvocation = {
  method() {
      console.log(this);
  }
};
methodInvocation.method(); 
// logs methodInvocation object

// 3️ Indirect Invocation
const context = { aVal: 'A', bVal: 'B' };
function indirectInvocation() {
    console.log(this);
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
indirectInvocation.call(context);  // logs { aVal: 'A' }
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
indirectInvocation.apply(context); // logs { bVal: 'A' }


// 4️ Constructor Invocation
function constructorInvocation() {
    console.log(this);
}
new constructorInvocation();
// logs an instance of constructorInvocation


// Arrow functions don’t have their own this,
// Arrow functions don’t redefine the value of this within the function.
// this inside an arrow function always refers to this from the outer context.

var name = "Suprabha"
let newObject = {
    name : "supi",
    arrowFunc: () => {
        console.log(this.name); 
    },
    regularFunc() {
        console.log(this.name); 
    }   
}
newObject.arrowFunc(); // Suprabha
newObject.regularFunc(); // supi



/*
 * new as a Constructor
 */

// Regular functions are constructable
// Arrow functions cannot be constructable
// Jest example when mocking



/*
 * No duplicate named parameters
 */

// Regular functions can have duplicate parameter names and throw an error - expect if you use strict
// Arrow functions can never have duplicate parameter names


/*
 * Hoisting
 */

// Regular functions get hoisted to the top, so you can call them before you initialize them
// Arrow functions get hoisted where you define them, so you cannot call them before you initialize them


/*
 * Methods
 */

// Regular functions can be methods in classes - but you have to bind them to the class
// Arrow functions you don't have to bind to the context, because they already take the outer context as `this`



/*
 * Don't use as object methods as `this` won't be bound to anything
 * and it will inherit the value of `this` from the parent scope
 */

const cangaroo = {
    count: 1,
    jumps: () => {
        this.count++
    }
}