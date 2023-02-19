// CallStack


// Error - prints stack trace
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

// Infinite loop - max stack size exceeded
function foo () {
    foo()
}
foo()

// Slow - blocking - waiting - cant interact (alert)

var foo = $.getSync('//something.com')
var bar = $.getSync('//something.com')

console.log(foo)
console.log(bar)

// Async - console.log is done later

console.log('one')

// set timeout 0 - defer something until the stack is clear
setTimeout(() => {
    console.log('two')
}, 0)

console.log('three')

// =======

// Document add event listener

console.log('Start')

$.on('button', 'click', function onClick () {
    console.log('Clicked')
}, 500)

setTimeout(function onTimeout () {
    console.log('Timeout finished')
})

console.log('Done')

// =======

setTimeout(function timeout () {
    console.log('what')
}, 1000)
setTimeout(function timeout () {
    console.log('what')
}, 1000)
setTimeout(function timeout () {
    console.log('what')
}, 1000)


// Sync loop callback

[1, 2, 3, 4].forEach(function (i) {
    console.log(i)
})


// Async loop callback - heavy re-rendering or processing

function asyncForEach (array, callback) {
    array.forEach(function () {
        setTimeout(callback, 0)
    })
}
asyncForEach([1, 2, 3, 4], function (i) {
    console.log(i)
})

// Re-painting / re-rendering
// - Browser tries to do it every 60 frames per second
// But it cannot do a render if there's currently a call on the stack
// The render is like a callback itself and needs to wait for the stack to clear
// It has a higher priority though, so if something is waiting in the queue, it will render first before picking from the queue


// Scroll

function animate () {
    delay()
}
$.on('document', 'scroll', animate)