/*
import a from 'module';
import { b } from 'module';
import { c, d } from 'module';
import * as e from 'module';
import f, { g, h as i } from 'module';

var x = 1 + 2;
let y = 'Hello World';
const z = true;

var w = 1, v = 2, u;
x = 11;
x = 12, x = 13;

// Assignment operators
x += 5;
x -= 2;
x *= 3;
x /= 2;
x %= 3;
x **= 2;

// Unary operators
const negation = -x.length;
const positive = +y.length;

// Update operators
++x;
--y;
x++;
y--;

// Logical operators
const And = x > 0 && y > 0;
const Or = x < 0 || y > 0;
const Not = !z;

// Comparison operators
const Eq = x == y;
const Id = x === y;
const notEq = x != y;
const notId = x !== y;
const Gr = x > y;
const Ls = x < y;
const GoE = x >= y;
const LoE = x <= y;

function add(a, b) {
  return a + b;
}
function multiply(a, b = 2) {
    return a * b;
}
var sq = function (n) {
  return n * n;
}
let square = n => n * n;
const divide = (a, b) => { return a / b };
divide(1,2);

(function(){
  var a = 1;
})();

async function get(url) { await fetch(url) }
var aget = async function(url){ await fetch(url) }
let agat = async (a) => { await fetch(url) }

function* gen(id) { yield id + 1 }
var genv = function*(id){ yield id + 1 }
async function* agen(id){ yield id + 1 }
var agenv = async function*(id){ yield id + 1 }

var peer = {};
var person = { name: 'Alice', age: 25, eye: {color: 'blue'} };
const { name } = person;
const { age, gender = 'Female' } = person;

const numbers = [1, 2, 3];
const [first, second, third] = numbers;

if(y > 5) y = 0;

*/
if(x > 5){
  x = 5;
} else if (x < 0){
  x = 0
} else {
  x = 2.5;
}
/*

// Ternary conditionals
const max = x > y ? x + 1 : y;

// Switch statement
switch (y) {
  case 'Hello':
    x = y + 1;
    break;
  case 'Goodbye':
    x = 2;
    z = 3;
    break;
  default:
    console.log('Unknown message');
}

// For loop
for (let i = 0; i < 5; i++) {
  console.log('For loop iteration:', i);
}

// While loop
let count = 0;
while (count < 3) {
  console.log('While loop count:', count);
  count++;
}

// Do-while loop
do {
  console.log('Do-while loop count:', count);
  count--;
} while (count > 0);

// For...in loop (enumerate object properties)
for (const key in person) {
  if (person.hasOwnProperty(key)) {
    console.log('Property:', key, 'Value:', person[key]);
  }
}

for (const num of numbers) {
  num + 1;
}

var eh = {c: "Hello", d: "World"};
const is = eh?.c;

// Exception Handling

// Try-catch-finally block
try {
  var x = 1;
  x + 2;
} catch (err) {
  var x = err;
  x + 9;
} finally {
  var x = 5 + 9;
  x + 7;
}

throw "Hello";

// Rest and Spread Operators
// Spread syntax in array literals
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

// Spread syntax in object literals
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };

// Rest parameters in a function
function sumAll(...args) {
    return args.reduce((sum, current) => sum + current, 0);
}
// Classes and Inheritance

// Class declaration
class Animal {
  constructor(name){
    console.log('Animal constructor called');
  }
  static async * speak(){
    console.log('Makes a noise.');
  }
  static get name(){
    console.log("w00t");
  }
  static look = function(at){
    console.log(1);
  }
}

// Subclass with inheritance
class Cat extends Animal {
    speak() {
        console.log(super.speak() + this.name + ' meow.');
    }
}

const cat = new Cat('Rex');
cat.speak();

// Miscellaneous Features

// Regular expressions
const regex = /ab+c/;

// New operator with built-in types
const date = new Date();

// Using Math object
const randomNum = Math.random();

// Using JSON methods
const jsonString = JSON.stringify(person);
const jsonObject = JSON.parse(jsonString);

// Using setTimeout (asynchronous code)
setTimeout(function () {
    console.log('Timeout executed');
}, 1000);

// Working with Promises
const promise = new Promise(function (resolve, reject) {
    setTimeout(() => resolve('Promise resolved'), 500);
});
promise.then(result => console.log(result));

// Using Map and Set
const map = new Map();
map.set('key', 'value');
const set = new Set([1, 2, 3]);

//Symbol type
const sym = Symbol('unique');

// BigInt type
const bigIntNumber = 12345678901234567890n;

// Bitwise operators
const bitwiseResult = 5 & 1;

// Typeof operator
console.log(typeof x); // 'number'

// Delete operator
const obj3 = { prop: 'value' };
delete obj3.prop;

// Void operator
void function () {
    console.log('Void operator used');
}();

// Instanceof operator
console.log(cat instanceof Cat); // true

// In operator
console.log('name' in cat); // true


// Function hoisting
hoistedFunction();
function hoistedFunction() {
    console.log('Function hoisting example');
}

// Variable hoisting (var only)
console.log(hoistedVar); // undefined
var hoistedVar = 'Hoisted variable';

// Using 'this' keyword
const obj4 = {
  name: 'Object',
  getName: function () {
    return this.name;
  }
};
console.log(obj4.getName());

// Closure example
function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log('Outer Variable:', outerVariable);
    console.log('Inner Variable:', innerVariable);
  };
}
const newFunction = outerFunction('outside');
newFunction('inside');

// Immediately resolved Promise
// TODO: esprima/acornjs have property chaining structured backwards.
foo.bar.lol.baz;
foo['bar']['lol']['baz'];
Promise.resolve('Immediate value').then; //(value => console.log(value));

// Chained Promises
Promise.resolve(1)
    .then(value => value + 2)
    .then(value => value + 3)
    .then(value => console.log('Final value:', value));

// Using 'arguments' object in a function
function argumentsExample() {
    console.log('Arguments length:', arguments.length);
}
argumentsExample(1, 2, 3);

// Object methods: Object.keys, Object.values, Object.entries
console.log('Object keys:', Object.keys(person));
console.log('Object values:', Object.values(person));
console.log('Object entries:', Object.entries(person));

// Array methods: map, filter, reduce
const mappedNumbers = numbers.map(n => n * 2);
const filteredNumbers = numbers.filter(n => n > 1);
const reducedNumber = numbers.reduce((acc, n) => acc + n, 0);

// String methods
const upperCaseString = y.toUpperCase();
const replacedString = y.replace('H', 'J');

// Using 'new.target' inside a function
function ConstructorExample() {
    if (!new.target) {
        throw new Error('Must be called with new');
    }
    this.example = 'Example';
}
new ConstructorExample();

// Using eval (caution: can be dangerous)
const code = 'console.log("Evaluated code")';
eval(code);

// Regular expression methods
const S = 'abc';
const R = /a/.test(S);
const M = S.match(/a/ig);

// Labeled statements
zaz = 9;
outerLabel:
  for (let i = 0; i < 5; i++) {
    innerLabel: for (let j = 0; j < 5; j++) {
        if (j === 2) continue outerLabel; 
        if (i === 3) break innerLabel;
    }
}

// Using 'strict mode'
(function () {
    'use strict';
    // Strict mode code here
    // Variables must be declared
    let strictVar = 'Strict mode variable';
})();

// Using 'this' in different contexts
console.log(this); // In global scope, 'this' refers to global object

function globalThisExample() {
    console.log(this); // In non-strict mode, 'this' refers to global object
}
globalThisExample();

const objectWithMethod = {
    method: function () {
        console.log(a); // 'this' refers to objectWithMethod
    }
};
objectWithMethod.method();  

// Unary plus and minus operators
const numString = '123';
const numValue = +numString; // Converts string to number
const negValue = -numValue;

// Bitwise operators
const bitwiseAnd = 5 & 3; // 1
const bitwiseOr = 5 | 3;  // 7
const bitwiseXor = 5 ^ 3; // 6
const bitwiseNot = ~5;    // -6
const leftShift = 5 << 1; // 10
const rightShift = 5 >> 1; // 2
const unsignedRightShift = -5 >>> 1; // Large positive number

// Function with rest parameter and destructuring
function restDestructure({ a, b }, ...rest) {
    console.log('a:', a, 'b:', b, 'rest:', rest);
}
restDestructure({ a: 1, b: 2 }, 3, 4, 5);

// Accessor properties
const accessorExample = {
    _value: 0,
    get value() {
        return this._value;
    },
    set value(val) {
        this._value = val;
    }
};
accessorExample.value = 42;
console.log(accessorExample.value); // 42

// Function with default parameters
function defaultParams(a, b = 10) {
    return a + b;
}
console.log(defaultParams(5)); // 15

// Short-circuit evaluation
const shortCircuit = x > 0 && y.length > 0;
// Optional chaining (ECMAScript 2020)
const optionalChainingResult = obj && obj.nonExistentProp && obj.nonExistentProp.subProp;
// Nullish coalescing operator (ECMAScript 2020)
const nullishValue = null != null ? null : 'Default value';
// Numeric es (ECMAScript 2021)
const largeNumber = 1000000;
// End of code examples
(fn())(args);
obj[computedProperty]();
obj.method(c).chain().calls(b);
//--------------
// Variables
a = 0.1;
let x = 1;
const y = 2;
var z = 3;

// Data Types
let num = 42;
let str = "hello";
let bool = true;
let nul = null;
let und = undefined;
let sym = Symbol("id");
let obj = { a: 1 };
let arr = [1, 2, 3];
let big = 123n;

// Functions
function func() { return 1; }
let arrow = () => 2;

// Operators
let sum = 1 + 2;
let diff = 3 - 1;
let prod = 2 * 3;
let quot = 6 / 2;
let mod = 5 % 2;
let exp = 2 ** 3;

// Comparisons
let eq = 1 === 1;
let neq = 1 !== 2;
let gt = 2 > 1;
let lt = 1 < 2;
let gte = 2 >= 2;
let lte = 1 <= 1;

// Logical
let and = true && false;
let or = true || false;
let not = !true;

// Control Flow

if(true){ a = b; c = d; }

if (true) { let a = 1; }
else { let b = 2; }

switch (x) {
  case 1: break;
  default: break;
}

for (let i = 0; i < 1; i++) {}
while (x > 0) { x--; }
do { z--; } while (z > 0);

// Arrays
arr.push(4);
arr.pop();
arr.map(x => x * 2);

// Objects
obj.b = 2;
delete obj.a;

// Classes
class MyClass {
  constructor() { this.x = 1; }
  method() { return this.x; }
}
let instance = new MyClass();

// Promises
let prom = new Promise((resolve) => resolve(1));

// Async/Await
async function asyncFunc() { return 1; }

// Template Literals

// Destructuring
let [a, b] = [1, 2];
let { c } = { c: 3 };

// Spread/Rest
let spread = [...arr];
let rest = (...args) => args;

// Try/Catch
try { throw new Error(); } catch (e) {}

// Ternary
let tern = true ? 1 : 0;
*/