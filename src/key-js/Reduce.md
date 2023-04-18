# Array Reduce

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

The reduce function expects a user defined reducer callback, the ultimate result is a single value after the reducer callback has ran on all elements in the array.

In other words, Reduce takes an array of items ([1, 2, 3]) and reduces it to a single value - 6 (for example).

```
reduce(callbackFn, initialValue)
```

## Callback function

Its return value becomes the value of the accumulator parameter on the next invocation. For the last invocation, the return value becomes the return value of reduce().

```
reduce((accumulator, currentValue, currentIndex, array) => { /* … */ }, initialValue)
```

`initialValue` - This is what will be passed as the value of the `accumulator` the first time reduce runs (e.g., if you're trying to get the total value from an array, and the initialValue is 0, you start with 0 adding up from there)

`accumulator` - The thing we are trying to reduce our array to (e.g., the total value)

`currentValue` - The current value in the array (the same as `item` in `.map((item) => {})` )

`currentIndex` - The index of the current value in the array (the same as `item` in `.map((item, index) => {})` )

`array` - The whole array we are running reduce on

**Whatever you return in the callback function will become the next value of the accumulator.** This is the most important thing to remember about reduce.

## Example uses

Getting the total value

```
const items = [
    { name: "Apples", price: 10 },
    { name: "Lemons", price: 15 },
    { name: "Courgettes", price: 22 },
    { name: "Paprika", price: 123 },
]

let totalPrice = 0
items.forEach((item, index) => {
    totalPrice += item.price
})

// const totalPrice = items.reduce((total, item) => {
//     return total + item.price
// }, 0)

console.log(totalPrice)
```

Remove duplicates

```
const ages = [18, 21, 1, 1, 51, 18, 21, 5, 18, 7, 10];

const uniqueAges = ages.reduce((unique, age) => {
  if (unique.indexOf(age) === -1) {
    unique.push(age);
  }
  return unique;
}, []);

console.log(uniqueAges)
```

Group together

```
const items = [
  { name: "Apples", price: 10 },
  { name: "Lemons", price: 15 },
  { name: "Courgettes", price: 22 },
  { name: "Paprika", price: 22 },
  { name: "Oranges", price: 15 },
]

const grouped = items.reduce((obj, { name, price }) => {
    if (obj[price] == null) {
        obj[price] = []
    }
    obj[price].push(name)
    return obj
}, {})

console.log(grouped)
```

Flatten an array of arrays

```
const arr = [
  [0, 1],
  [2, 3],
  [4, 5],
]
const flattened = arr.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
console.log(flattened)

```

Implementing .map()

```
// Leave just the names in a new array

const items = [
  { name: "Apples", price: 10 },
  { name: "Lemons", price: 15 },
  { name: "Courgettes", price: 22 },
  { name: "Paprika", price: 22 },
  { name: "Oranges", price: 15 },
]

const names = items.reduce((arr, { name }) => {
    arr.push(name)

    // .push() returns the length of the new array
    // not an array, so we need to separate the two
    return arr
}, [])

console.log(names)
```

Implementing .filter()

```
// Remove items with the price above 15

const items = [
  { name: "Apples", price: 10 },
  { name: "Lemons", price: 15 },
  { name: "Courgettes", price: 22 },
  { name: "Paprika", price: 30 },
  { name: "Oranges", price: 16 },
]

const filteredItems = items.reduce((arr, item) => {
    if (item.price < 16) {
        arr.push(item)
    }

    // .push() returns the length of the new array
    // not an array, so we need to separate the two
    return arr
}, [])

console.log(filteredItems)
```

Concatenate arrays contained in an array of objects

```
// friends - an array of objects
// where object field "books" is a list of favorite books
const friends = [
  {
    name: "Anna",
    books: ["Bible", "Harry Potter"],
    age: 21,
  },
  {
    name: "Bob",
    books: ["War and peace", "Romeo and Juliet"],
    age: 26,
  },
  {
    name: "Alice",
    books: ["The Lord of the Rings", "The Shining"],
    age: 18,
  },
];

// allbooks - list which will contain all friends' books +
// additional list contained in initialValue
const allbooks = friends.reduce(
  (accumulator, currentValue) => [...accumulator, ...currentValue.books],
  ["Alphabet"],
);
console.log(allbooks);
```

Function composition enabling piping

```
// Building-blocks to use for composition
const double = (x) => 2 * x;
const triple = (x) => 3 * x;
const quadruple = (x) => 4 * x;

// Function composition enabling pipe functionality
const pipe =
  (...functions) =>
  (initialValue) =>
    functions.reduce((acc, fn) => fn(acc), initialValue);

// Composed functions for multiplication of specific values
const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);

// Usage
multiply6(6); // 36
multiply9(9); // 81
multiply16(16); // 256
multiply24(10); // 240
```

### Notes

The callback function is invoked only for array indexes which **have assigned values**. It is not invoked for empty slots in sparse arrays. However, it does not skip `undefined` values:

```
console.log([1, 2, , 4].reduce((a, b) => a + b)); // 7
console.log([1, 2, undefined, 4].reduce((a, b) => a + b)); // NaN
```

Reduce does not change the original array, it returns a new value (which doesn't have to be an array)

Reduce returns a single new value

If initialValue is provided and the array is not empty, then the reduce method will always invoke the callback function starting at index 0.

## Edge cases

1. With initial value, and array length of 1 or > 1

- the callback is invoked for each element in the array starting at index 0

```
const arr = [1, 2]

const sum = arr.reduce((total, item, index) => {
    console.log('item', item, index)
}, 0)

console.log(sum)

// or

const arr = [1]

const sum = arr.reduce((total, item, index) => {
    console.log('item', item, index)
}, 0)

console.log(sum)
```

1. No initial value, and array length of > 1

- the callback is invoked once for element at index 1

```
const arr = [1, 2]

const sum = arr.reduce((total, item, index) => {
    console.log('item', item, index)
})

console.log(sum)
```

3. Not calling the callback at all

a) Array only has one element (regardless of position) and no initialValue is provided,

b) or initialValue is provided but the array is empty

- the solo value will be returned without calling tge callback.

```
const arr = [1]

const sum = arr.reduce((total, item) => {
    console.log('item', item)
})

console.log(sum)

// or

const arr = []

const sum = arr.reduce((total, item) => {
    console.log('item', item)
}, 0)


const final = arr.filter(removeDuplicates).map(addGuid).reduce(flattenArray)

console.log(sum)
```

## Functional programming

reduce() is a central concept in functional programming, where it's not possible to mutate any value, so in order to accumulate all values in an array, one must return a new accumulator value on every iteration. This convention propagates to JavaScript's reduce(): you should use spreading or other copying methods where possible to create new arrays and objects as the accumulator, rather than mutating the existing one. If you decided to mutate the accumulator instead of copying it, remember to still return the modified object in the callback, or the next iteration will receive undefined.

```
const arr = [1, 2, 3]

const sum = arr.reduce((total, item) => {
    total = total + item
    // return total
}, 0)
```

## When not to use

Recursive functions like reduce() can be powerful but sometimes difficult to understand, especially for less-experienced JavaScript developers. If code becomes clearer when using other array methods, developers must weigh the readability tradeoff against the other benefits of using reduce(). In cases where reduce() is the best choice, documentation and semantic variable naming can help mitigate readability drawbacks.
