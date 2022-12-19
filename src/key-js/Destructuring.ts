/*
 * ==========================================================================
 * Destructuring Arrays
 * ==========================================================================
 * А special syntax that allows us to “unpack” arrays or objects into a bunch of variables
 */

// Example
const arr = ["Parsy James", 18]

// Previously
const name = arr[0]
const age = arr[1]

// With destructuring
const [name, age] = arr;

// Combining with other array methods
let [firstName, lastName] = "Parsy James".split(' ');

/** 
 * It’s called “destructuring assignment,” because it “destructurizes”
 * by copying items into variables. But the array itself is not modified. 
 **/

/** 
 * Ignore elements using commas
 **/

let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];


/** 
 * Assign to anything at the left-side
 **/

let user = {};
[user.firstName, user.lastName] = "John Smith".split(' ');

/** 
 * Swap variables trick
 **/

let guest = "Rogers";
let admin = "Jane";

// Let's swap the values: make guest=Jane, admin=Roger
[guest, admin] = [admin, guest];

console.log(`${guest} ${admin}`); // Jane Rogers

/** 
 * Rest ...
 * Grab the rest of the elements in the array that are not destructured
 **/

let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// The value of rest is the array of the remaining array elements.

/** 
 * Default values
 * If the array is shorter than the list of variables at the left, there’ll be no errors.
 * The missing values are considered undefined.
 **/

let [firstName, lastName] = [];

console.log(firstName); // undefined
console.log(lastName); // undefined

// Overriding missing values
// default values
let [name = "Jane", lastName = "Anonymous"] = ["Robert"];

console.log(name);     // Robert (from array)
console.log(lastName); // Anonymous (default used)



/*
 * ==========================================================================
 * Destructuring Objects
 * ==========================================================================
 */