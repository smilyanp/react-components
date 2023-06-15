# Single-threaded concurrent

Single threaded - the V8 engine can only do one thing at a time on the stack
Concurrent - we can use the browser APIs to do async work in parallel

The browser is more than just the runtime. It provides additional APIs (DOM, setTimeout, XHR) that we can call and run code concurrently.

# CallStack

## Stepping into each method

Adds to the top of the stack and the removes from the top - one at a time

```
function foo (a, b) {
    return a + b
}
function bar () {
    foo(1, 2);
}
function baz() {
    bar();
}
baz()
```

## Error - prints stack trace

```
function foo () {
    throw new Error('Something went wrong')
}
function bar () {
    foo();
}
function baz() {
    bar();
}
baz()
```

## Infinite loop - max stack size exceeded

```
function foo () {
    foo()
}
foo()
```

## Slow - blocking (means slow) - waiting - cant interact (alert)

Simulates if async requests were synchronous. This is a problem because it doesn't let us interact with the browser.

```

var foo = $.getSync('//something.com')
var bar = $.getSync('//something.com')

console.log(foo)
console.log(bar)
```

## Async - console.log is done later

The solution to blocking is to just make something run **when there is free capacity to run it**. So we provide a callback that executes that piece of code when the stack is clear.

```
console.log('one')

// set timeout 0 - defer something until the stack is clear
setTimeout(() => {
    console.log('two')
}, 0)

console.log('three')
```

## Concurrency

One thing at a time is what javascript allows us to do with the stack, but actually we can access the web APIs and essentially use them for concurrent tasks or another stack.

However, when that code completes it can't just modify the application and intervene, so this is where we use the event loop and the task queue to bring back that code.

## setTimeout 0 - deferring to later

Essentially we use setTimeout to take a piece of code from the stack, go through the task queue and the event loop and then go back to the bottom of the stack once everything else has finished

---

## Document add event listener

```
console.log('Start')

$.on('button', 'click', function onClick () {
    console.log('Clicked')
})

setTimeout(function onTimeout () {
    console.log('Timeout finished')
})

console.log('Done')

```

---

## Multiple async calls

```
setTimeout(function timeout () {
    console.log('what')
}, 1000)
setTimeout(function timeout () {
    console.log('what')
}, 1000)
setTimeout(function timeout () {
    console.log('what')
}, 1000)
```

## Sync loop callback

```

[1, 2, 3, 4].forEach(function (i) {
console.log(i)
delay()
})

```

## Async loop callback - heavy re-rendering or processing

`function asyncForEach (array, callback) {
    array.forEach(function () {
        setTimeout(callback, 0)
    })
}
asyncForEach([1, 2, 3, 4], function (i) {
    console.log(i)
})`

## Re-painting / re-rendering

- Browser tries to do it every 60 frames per second
- But it cannot do a render if there's currently a call on the stack
- The render is like a callback itself and needs to wait for the stack to clear
- It has a higher priority though, so if something is waiting in the queue, it will render first before picking from the queue

## Scroll

```
function animate () {
    delay()
}
$.on('document', 'scroll', animate)
```
