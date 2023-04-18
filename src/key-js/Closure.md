# Closures

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

https://blog.hubspot.com/website/javascript-closure

https://www.w3schools.com/js/js_function_closures.asp

https://www.freecodecamp.org/news/lets-learn-javascript-closures-66feb44f6a44/

_A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function._

_"In JavaScript, closures are created every time a function is created."_

_"A closure is a function having access to the parent scope, even after the parent function has closed."_

**Another way to think about it is that a closure makes the outer scope variables private and local and have access to those variables even when the other function doesn't exist anymore.**

It's important to also note that closures **do not store static values. Instead, they store references to the variables present inside the scope chain.** In this way, even if the outer function dies, the inner function, that is a closure, still has access to its parent variables.

## SCOPING

### LOCAL SCOPE

When a variable is declared with `var` inside of a function.

A local variable is private and hidden from other functions on the page.

_Local variables are created with the function and deleted when it finishes. They have a short life._

A function can access variables in its local scope:

```
function myFunction() {
  var a = 4;
  return a * a;
}

function anotherFunction () {
  console.log(a)
}
```

### GLOBAL SCOPE

When a variable is declared with `var` outside of a function.

The global scope belongs to the page and all other functions or scripts on that page can access and modify the variable.

_Global variables are created when the page loads and are only destroyed when you navigate away from the page or close the window. They have a long life._

The function can also access variables from the global scope:

```
// main.js
var a = 4;
function myFunction() {
  return a * a;
}
myFunction() // 16

// lib.js
function anotherFunction () {
  a = 10
  console.log(a)
}
anotherFunction()
myFunction() // 100

```

### LEXICAL SCOPING

_Describes how a parser resolves variable names when functions are nested._

Function scope example - variable only accessible in the body of the function

```
function init() {
  var age = 15; // name is a local variable created by init
  function getAge() {
    var dob = 12/03/1989
    // getAge() is the inner function, that forms the closure
    console.log(age); // use variable declared in the parent function
  }
  function calculateDob() {
    console.log(dob)
  }
  getAge();
}
init();
```

### CLOSURE

```
function create() {
  const age = 15;
  function displayAge() {
    console.log(age);
  }
  return displayAge;
}

const myFunc = create();
myFunc();
```

This might seem like it shouldn't work (no age should be logged), because when `displayAge` is returned and then called later on, this the `аге` variable won't exist and should not have a value inside of `displayAge`, but in fact it works.

The key is that `displayAge` **is returned from the parent function BEFORE it executes.** The reason it works is because `displayAge` is a closure. The closure consists of the **function scope** and **the lexical environment** in which it was declared.

And that lexical environment (as in the example in the previous section) consists of local variables that were in-scope when the closure was created.

In this case, `create` is a reference to `displayAge`, which when called creates an instance of `displayAge`. When `displayAge` was declared it had a reference to the variable `age` in its lexical environment, so it stores that reference and has access **to the last known value of that reference**.

#### ANOTHER EXAMPLE

```
function sum(x) {
  return function (y) {
    // Closure
    return x + y;
  };
}

const add20 = sum(20); // Closure instance
const add50 = sum(50); // Closure instance

console.log(add20(10)); // 30
console.log(add50(20)); // 70
```

In this example `add20` and `add50` are closures, that have different lexical environments. In one environment `x` will be 20 and in the other `x` will be 50.

### CODE BLOCKS & SCOPING

Blocks with curly brackets do not create scopes, when we use the `var` keyword to declare a variable.

Here `var` is hoisted and becomes available for the console.log so it's part of the global scope. Otherwise, it would thrown an error.

```
if (Math.random() > 0.5) {
  var x = 1;
} else {
  var x = 2;
}

console.log(x);
```

## THE PROBLEM - STALE CLOSURES

[This can create a problem, specially in loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#creating_closures_in_loops_a_common_mistake)

The stale closure captures variables that have outdated values. The setTimeout function creates a closure shared by each loop.

```
for (var i = 0; i < 3; i++) {
  const log = () => {
    console.log(i)
  }
  setTimeout(log, 100)
}
```

or

**Custom hook**

https://jsfiddle.net/dmitri_pavlutin/mhcwxLd3/

```
function createIncrement(incBy) {
  let value = 0;
  function increment() {
    value += incBy;
    console.log(value);
  }
  const message = `Current value is ${value}`;
  function log() {
    console.log(message);
  }

  return [increment, log];
}

const [increment, log] = createIncrement(1);
increment(); // logs 1
increment(); // logs 2
increment(); // logs 3

// Does not work!
log(); // log will be with a value of 0
```

or

**useEffect**

https://codesandbox.io/s/stale-closure-use-effect-broken-2-gyhzk

```
function WatchCount() {
  const [count, setCount] = useState(0);

  useEffect(function() {
    setInterval(function log() {
      console.log(`Count is: ${count}`); // log will always be 0
    }, 2000);
  }, []);

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1) }>
        Increase
      </button>
    </div>
  );
}
```

**useState**

https://codesandbox.io/s/use-state-broken-0q994

https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates#dispatch-function-updates

```
function DelayedCount() {
  const [count, setCount] = useState(0);

  function handleClickAsync() {
    setTimeout(function delay() {
      setCount(count + 1);
    }, 1000);
  }

  return (
    <div>
      {count}
      <button onClick={handleClickAsync}>Increase async</button>
    </div>
  );
}
```

Because of closures and hoisting, the variable `i` will be referenced by setTimeout in the closure (`log`). setTimeout will execute later once the callback queue runs, at that point the reference of `i` will always be the same, or basically the last value of `i`. Which means it will always be 3.

### ES6 SCOPING - let & const

In ES6 finally with let and const blocks of code are treated as scopes, when you use let or const to declare a variable. This means that the variable is scoped to the block of code in which you've declared it and it won't be hoisted.

Another note on scoping in ES6 is that [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) are a new type of scope in themselves.

## PRACTICAL USES

In FE JS we write a lot of event based code. Normally to an event listener we need to attach a callback and that callback needs to associate with the lexical environment (variables, etc.) which we declare when we define that callback, expecting it to execute with them later, when the user triggers that event.

1. Protect state and only expose the part that you want

```
function outer () {
  const state = { name: 'James' }

  function inner () {
    return `Hello, ${state.name}`;
  }
  return inner
}
```

2. Function factories

```
const makeCounter = function () {
  let privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment() {
      changeBy(1);
    },

    decrement() {
      changeBy(-1);
    },

    value() {
      return privateCounter;
    },
  };
};

const counter1 = makeCounter();
const counter2 = makeCounter();

console.log(counter1.value()); // 0.

counter1.increment();
counter1.increment();
console.log(counter1.value()); // 2.

counter1.decrement();
console.log(counter1.value()); // 1.
```

3. React hooks

Hooks heavily rely on closures

**Custom hook**

```
function createIncrement(incBy) {
  let value = 0;
  function increment() {
    value += incBy;
    console.log(value);
  }
  function log() {
    const message = `Current value is ${value}`;
    console.log(message);
  }

  return [increment, log];
}
const [increment, log] = createIncrement(1);

increment(); // logs 1
increment(); // logs 2
increment(); // logs 3

log();
```

another example

**useEffect**

```
function WatchCount() {
  const [count, setCount] = useState(0);

  useEffect(function() {
    const id = setInterval(function log() {
      console.log(`Count is: ${count}`);
    }, 2000);
    return function() {
      clearInterval(id);
    }
  }, [count]);

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1) }>
        Increase
      </button>
    </div>
  );
}
```

**useState**

```
function DelayedCount() {
  const [count, setCount] = useState(0);

  function handleClickAsync() {
    setTimeout(function delay() {
      setCount((previousCount) => previousCount + 1); // function state update
    }, 1000);
  }

  return (
    <div>
      {count}
      <button onClick={handleClickAsync}>Increase async</button>
    </div>
  );
}
```

Any time you need to compute new state based on previous state, use a function update.
