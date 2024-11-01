; (function () {
  console.log("Hello Experiments! Do whatever you want in this folder or files!");

  function load(src, cb) {
    var script = document.createElement('script');
    script.onload = cb; script.src = src;
    document.head.appendChild(script);
  }


  load('trial/acorn.js', function () {

    var code = `
    
// // Variable Declarations
// import { a, b, c } from 'module';
// import d from 'module';
// import * as e from 'module';
// import f, { g, h as i } from 'module';
// // var declaration
// var x = 10;

// // let declaration
// let y = 'Hello World';

// // const declaration
// const z = true;

// // Function Declarations and Expressions

// // Function declaration with parameters and default values
function add(a, b = 5) {
    return a + b;
}

// // Function expression assigned to a variable
function multiply (a, b) {
    return a * b;
};

const sq = function (n) {
  return n * n;
}
const square = n => n * n;

// // Arrow function with implicit return

// // Arrow function with block body
const divide = (a, b) => {
    if (b === 0) {
        throw new Error('Division by zero');
    }
    return a / b;
};

// // Immediately Invoked Function Expression (IIFE)
// (function () {
// var a = 1;
//     console.log('IIFE executed');
// })();

// // Generator function
// function* idGenerator() {
//     let id = 0;
//     while (true) {
//         yield id++;
//     }
// }

// // Async function
// async function fetchData(url) {
//     try {
//         let response = await fetch(url);
//         let data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.error(error);
//     }
// }

// // Object and Array Destructuring

// // Object destructuring with default values
// const person = { name: 'Alice', age: 25 };
// const { name, age, gender = 'Female' } = person;

// // Array destructuring
// const numbers = [1, 2, 3];
// const [first, second, third] = numbers;

// // Rest and Spread Operators

// // Rest parameters in a function
// TODO: Need to fix this
// function sumAll(...args) {
//     return args.reduce((sum, current) => sum + current, 0);
// }

// // Spread syntax in array literals
// const arr1 = [1, 2, 3];
// const arr2 = [...arr1, 4, 5];

// // Spread syntax in object literals
// const obj1 = { a: 1, b: 2 };
// const obj2 = { ...obj1, c: 3 };

// // Control Flow Statements

// // If-else statement
// if (!(x > 5)) {
//     console.log('x is greater than 5');
// } else {
//  console.log('x is less than 5');
// }

// var b = {c: "Hello", d: "World"};
// const somethin = b?.c;

// // Switch statement
//TODO: Need to fix this
// switch (y) {
//     case 'Hello':
//         console.log('Greeting detected');
//         break;
//     case 'Goodbye':
//         console.log('Farewell detected');
//         break;
//     default:
//         console.log('Unknown message');
// }

// // For loop
// for (let i = 0; i < 5; i++) {
//     console.log('For loop iteration:', i);
// }

// // While loop
// let count = 0;
// while (count < 3) {
//     console.log('While loop count:', count);
//     count++;
// }

// // // Do-while loop
// do {
//     console.log('Do-while loop count:', count);
//     count--;
// } while (count > 0);

// // For...in loop (enumerate object properties)
for (const key in person) {
    if (person.hasOwnProperty(key)) {
        console.log('Property:', key, 'Value:', person[key]);
    }
}

// // For...of loop (iterate over iterable objects)
//TODO: Need to fix this
for (const num of numbers) {
    console.log('Number:', num);
}

// // Exception Handling

// // Try-catch-finally block
// try {
//   console.log('Try block executed');
//   throw new Error('An error occurred');
// } catch (error) {
//   console.error('Caught error:', error.message);
// } finally {
//   console.log('Finally block executed');
// }

// // Classes and Inheritance

// // Class declaration
//TODO: Need to fix this
// class Animal {
//     constructor(name) {
//         console.log('Animal constructor called');
//     }
//     speak() {
//         console.log('Makes a noise.');
//     }
// }

// // Subclass with inheritance
// class Dog extends Animal {
//     speak() {
//         console.log(this.name + ' barks.');
//     }
// }

// const dog = new Dog('Rex');
// dog.speak();

// // Miscellaneous Features

// // Regular expressions
// const regex = /ab+c/;

// // New operator with built-in types
// const date = new Date();

// // Using Math object
// const randomNum = Math.random();

// // Using JSON methods
// const jsonString = JSON.stringify(person);
// const jsonObject = JSON.parse(jsonString);

// // Using setTimeout (asynchronous code)
setTimeout(function () {
    console.log('Timeout executed');
}, 1000);

// // Working with Promises
// const promise = new Promise(function (resolve, reject) {
//     setTimeout(() => resolve('Promise resolved'), 500);
// });
// promise.then(result => console.log(result));

// // Using Map and Set
//TODO: Need to fix this
// const map = new Map();
// map.set('key', 'value');
// const set = new Set([1, 2, 3]);

// Symbol type
// const sym = Symbol('unique');

// // BigInt type
// const bigIntNumber = 12345678901234567890n;

// // Bitwise operators
// const bitwiseResult = 5 & 1;

// // Typeof operator
// console.log(typeof x); // 'number'

// // Delete operator
// const obj3 = { prop: 'value' };
// delete obj3.prop;

// // Void operator
// void function () {
//     console.log('Void operator used');
// }();

// // Instanceof operator
// console.log(dog instanceof Dog); // true

// // In operator
// console.log('name' in dog); // true

// // Conditional (ternary) operator
// TODO: Need to fix this
const max = x > y.length ? x : y.length;

// // Logical operators
// const logicalAnd = x > 0 && y.length > 0;
// const logicalOr = x < 0 || y.length > 0;
// const logicalNot = !z;

// // Assignment operators
// x += 5;
// x -= 2;
// x *= 3;
// x /= 2;
// x %= 3;
// x **= 2;

// // Unary operators
// const negation = -x;
// const positive = +y.length;

// // Comparison operators
// const isEqual = x == y.length;
// const isIdentical = x === y.length;
// const isNotEqual = x != y.length;
// const isNotIdentical = x !== y.length;
// const isGreater = x > y.length;
// const isLess = x < y.length;
// const isGreaterOrEqual = x >= y.length;
// const isLessOrEqual = x <= y.length;

// // Comma operator
// let a, b, c;
// a = (b = 1, c = 2);

// // Function hoisting
// hoistedFunction();
// function hoistedFunction() {
//     console.log('Function hoisting example');
// }

// // Variable hoisting (var only)
// console.log(hoistedVar); // undefined
// var hoistedVar = 'Hoisted variable';

// // Using 'this' keyword
// const obj4 = {
//     name: 'Object',
//     getName: function () {
//         return this.name;
//     }
// };
// console.log(obj4.getName());

// // Closure example
// function outerFunction(outerVariable) {
//     return function innerFunction(innerVariable) {
//         console.log('Outer Variable:', outerVariable);
//         console.log('Inner Variable:', innerVariable);
//     };
// }
// const newFunction = outerFunction('outside');
// newFunction('inside');

// // Immediately resolved Promise
// Promise.resolve('Immediate value').then(value => console.log(value));

// // Chained Promises
// Promise.resolve(1)
//     .then(value => value + 1)
//     .then(value => value + 1)
//     .then(value => console.log('Final value:', value));

// // Using 'arguments' object in a function
// function argumentsExample() {
//     console.log('Arguments length:', arguments.length);
// }
// argumentsExample(1, 2, 3);

// // Object methods: Object.keys, Object.values, Object.entries
// console.log('Object keys:', Object.keys(person));
// console.log('Object values:', Object.values(person));
// console.log('Object entries:', Object.entries(person));

// // Array methods: map, filter, reduce
// const mappedNumbers = numbers.map(n => n * 2);
// const filteredNumbers = numbers.filter(n => n > 1);
// const reducedNumber = numbers.reduce((acc, n) => acc + n, 0);

// // String methods
// const upperCaseString = y.toUpperCase();
// const replacedString = y.replace('H', 'J');

// // Using 'new.target' inside a function
// function ConstructorExample() {
//     if (!new.target) {
//         throw new Error('Must be called with new');
//     }
//     this.example = 'Example';
// }
// new ConstructorExample();

// // Using eval (caution: can be dangerous)
// const code = 'console.log("Evaluated code")';
// eval(code);

// // Regular expression methods
// const testString = 'abc';
// const testResult = /a/.test(testString);
// const matchResult = testString.match(/a/);

// // Labeled statements
// outerLabel: for (let i = 0; i < 5; i++) {
//     innerLabel: for (let j = 0; j < 5; j++) {
//         if (j === 2) continue outerLabel; 
//         if (i === 3) break innerLabel;
//     }
// }

// // Using 'strict mode'
// (function () {
//     'use strict';
//     // Strict mode code here
//     // Variables must be declared
//     let strictVar = 'Strict mode variable';
// })();

// // Using 'this' in different contexts
// console.log(this); // In global scope, 'this' refers to global object

// function globalThisExample() {
//     console.log(this); // In non-strict mode, 'this' refers to global object
// }
// globalThisExample();

// const objectWithMethod = {
//     method: function () {
//         console.log(a); // 'this' refers to objectWithMethod
//     }
// };
// objectWithMethod.method();  

// // Unary plus and minus operators
// const numString = '123';
// const numValue = +numString; // Converts string to number
// const negValue = -numValue;

// // Bitwise operators
// const bitwiseAnd = 5 & 3; // 1
// const bitwiseOr = 5 | 3;  // 7
// const bitwiseXor = 5 ^ 3; // 6
// const bitwiseNot = ~5;    // -6
// const leftShift = 5 << 1; // 10
// const rightShift = 5 >> 1; // 2
// const unsignedRightShift = -5 >>> 1; // Large positive number

// // Function with rest parameter and destructuring
// function restDestructure({ a, b }, ...rest) {
//     console.log('a:', a, 'b:', b, 'rest:', rest);
// }
// restDestructure({ a: 1, b: 2 }, 3, 4, 5);

// // Accessor properties
//TODO: Need to fix this
// const accessorExample = {
//     _value: 0,
//     get value() {
//         return this._value;
//     },
//     set value(val) {
//         this._value = val;
//     }
// };
// accessorExample.value = 42;
// console.log(accessorExample.value); // 42

// // Function with default parameters
// function defaultParams(a, b = 10) {
//     return a + b;
// }
// console.log(defaultParams(5)); // 15

// // Short-circuit evaluation
// const shortCircuit = x > 0 && y.length > 0;
// // Optional chaining (ECMAScript 2020)
// const optionalChainingResult = obj && obj.nonExistentProp && obj.nonExistentProp.subProp;
// // Nullish coalescing operator (ECMAScript 2020)
//TODO: Need to fix this
// const nullishValue = null != null ? null : 'Default value';
// // Numeric es (ECMAScript 2021)
// const largeNumber = 1000000;
// // End of code examples
//TODO: Need to fix this
// (fn())(args);
// obj[computedProperty]();
// obj.method(c).chain().calls(b);

    //     `;

    code && render.put("code", code);
    var ast = acorn.parse(code,{ecmaVersion: 2022, sourceType: 'module'});
    // var ast = esprima.parse(code);
    ast && render.put("ast", JSON.stringify(ast, null, "\t"));
    render(ast);
  
    // setTimeout(function(){ $('#console').text(code).css({top: 0, left: 0, right: 0, height: '9em', bottom: 'none', 'text-align': 'left'}) },999);
  
  });

  function render(ast) {
    
    if (!ast) { return }
    console.log("AST:", ast);
    // Renders body
    if(ast.body && !(ast.left || ast.right) && !(ast.test || ast.init || ast.update)){
      if(ast.id){ // named function, convert to left/right:
        render.act(ast);
        return;
      }
      ast.up = ast.up || '';
      ast.$id = ast.$id || render.id(ast);
      if(!ast.up){
        //render.the({name: ast.$id, fill: [1,1,1,0]});
        render.the({
          name: ast.$id+'-start',
          size: [[1, '~'], [1, '~']],
          sort: [0.1, ast.up.$id]
        }).the({ // make label
          name: ast.$id+'-start-text',
          sort: [0.1, ast.$id+'-start'],
          fill: "",
        });
      }
      render.the({ // make view
        name: ast.$id,
        size: [[1,'~'],[1,'~']],
        sort: [0.1, ast.up.$id],
        fill: ast.up? render.fill(ast) : undefined
      });
  
      if((ast.up.params || ast.params)/* && (ast.params || ast.up.params || '').length > 0*/){ // treat parameters as first line.
        render.list(ast, ast.up.params || ast.params, '(', ',', ') ⇒');
      }
      render.list(ast, ast.body.body || ast.body, '', '', '');
      return;
    }

    if(ast.declarations || ast.expressions || ast.elements){
  
      ast.up = ast.up || '';
      ast.$id = ast.$id || render.id(ast);
  
      render.list(ast, ast.declarations||ast.expressions||ast.elements);
      return;
    }
    render.flow(ast);
    render.act(ast);
  }
  
  render.act = function(ast){
    if(!ast){ return }
  
    //if(ast.raw){ // end!
    // Handle basic nodes (literals and identifiers)
    if(ast.raw || 'Identifier' == ast.type || ast.local || ast.imported){ // end!
      ast.$id = ast.$id || render.id(ast);
      render.the({ // make view
        name: ast.$id,
        fill: render.fill(ast),
        sort: [0.1, ast.up.$id]
      }).the({
        name: ast.$id+'-text',
        sort: [0.1, ast.$id],
        fill: (ast.local || ast.imported || '').name || ast.raw || ast.name,
      });
      return;
    }

    if (ast.type === 'ThisExpression') {
      render.the({
        name: ast.$id,
        fill: render.fill(ast),
        sort: [0.1, ast?.up?.$id || ast.$id]
      }).the({
        name: ast.$id + '-text',
        sort: [0.1, ast.$id],
        fill: "this",
      });
      // console.log("***AST:", ast)
    }
    
    if (ast.async) { // handle async
      render.the({
        name: ast.$id + '-async',
        fill: "async",
        sort: [0.1, ast.$id],
      });
    }
    // handle class
    if (ast.type === 'ClassDeclaration') {
      render.the({
        name: ast.$id + '-class',
        fill: "class",
        sort: [0.1, ast.$id],
      });
    }
    var act = render.actify(ast);
    
    ast.up = ast.up || '';
    ast.$id = ast.$id || render.id(ast);

    var left = act?.left,
      op = act?.operator,
      right = act?.right

    render.expression(ast, left, op, right);
  }

  render.actify = function (ast) {
    if (ast.left && ast.right) {
      act = ast;
      act.operator = ast.operator || '=';
    } else if (ast.key && ast.value) { 
      act = { left: { property: ast.key }, operator: '=', right: ast.value}
    } else if (ast.expression) {
      ast.expression.back = ast;
      act = ast = ast.expression;
    }  else if (ast.params) {
      ast.body.up = ast;
      act = { left: { property: ast.id }, operator: "=", right: ast.body };
    } else if ("VariableDeclaration" == ast.type || "VariableDeclarator" == ast.type) {
      let l =  ast.id || ast.declarations?.[0]?.id, r = ast.init || ast.declarations?.[0]?.init;
      act = { left: l, operator: l && r ? "=" : '', right:r};
    } else if (ast.type === 'ClassDeclaration') {
      let l = {
        up: ast,
        left: ast.id,
        operator: ast.superClass ? 'extends': '',
        right: ast.superClass ? ast.superClass : {},
      }
      act = {
        left: l, operator: '=',
        right: ast.body,
      };
     } else if (ast.callee) {
      ast.callee.back = ast;
      console.log("AST:", ast);
      act = { left: ast.body || ast.callee, operator: ''/*String.fromCharCode(8594)*/, right: ast.arguments };
      //ast = ast.callee; // is this buggy for path?
    } else if (ast.source && ast.specifiers) {
      act = { left: ast.specifiers, operator: 'from', right: ast.source };
    } else if (ast.declaration) { 
      act  = { operator: 'export', right: ast.declaration };
    } else if (ast.operator && ast.argument) {
      act = { left: ast.prefix ? null : ast.argument, operator: ast.operator, right: ast.prefix ? ast.argument : null };
    } else if (ast.type === 'AwaitExpression') { 
      act = { operator: "await", right: ast.argument };
    } else if (ast.type === 'YieldExpression') {
      act = { operator: "yield", right: ast.argument };
    } else if (ast.type === 'MemberExpression') {
      let op =  ast.optional ? '?' : '.'
      act = { left: ast.object, operator: op, right: ast.property };
      if (ast.object.type === "ThisExpression") {
        act.left = {type: "Identifier", name: "this"}
      }
    } else if (ast.type === 'SpreadElement' || ast.type === 'RestElement') {
      act = { operator: '...', right: ast.argument };
    } else if (ast.type === "ThisExpression") {
      act = {left: "this"}
    } else if (ast.type === 'AssignmentPattern') {
      act = { left: ast.left, operator: '=', right: ast.right };
    } else if (ast.type === 'ReturnStatement') {
      act = { operator: 'return', right: ast.argument };
    } else if (ast.type === 'ThrowStatement') {
      act = { operator: 'throw', right: ast.argument };
    } else if (ast.superClass) {
      act = {operator: 'extends', right: ast.superClass}
    }else if (ast.type === 'Property') {
      var s = !ast.shorthand && ast.kind === 'init';
      var k = ast.kind !== 'init';
      act = { left: ast.key, operator: s && ':' || k &&  ast.kind , right: (s || k) && ast.value};
    } else if (ast.body) {
      act = { operator: 'return', right: ast.body };
    } else {
      act = ast;
    } 
    return act;
  }
  render.view = function (ast) {
    render.the({ // make view
      name: ast.$id,
      fill: render.fill(ast),
      sort: [0.1, ast.up.$id]
    })
  }
  
  render.flow = function (ast) {
    if (!ast) return;
    ast.$id = ast.$id || render.id(ast);
    
    if (ast.block) {
      ast.block.up = ast;
      render.view(ast);
      render.the({
        name: ast.$id + '-text',
        sort: [0.1, ast.block.up.$id],
        fill: 'try',
      });
      render(ast.block);
      if (ast.handler) {
        render.view(ast);
        render.list(ast, [ast.handler], 'catch');
      }
      if (ast.finalizer) {
        render.view(ast);
        render.list(ast, [ast.finalizer], 'finally');
      }
    } else if (ast.discriminant && ast.cases) {
      ast.discriminant.up = ast;
      render.view(ast);
      render.the({
        name: ast.$id + '-text',
        sort: [0.1, ast.discriminant.up.$id],
        fill: 'switch',
      });
      render.list(ast, [ast.discriminant], '(', '', ')');
      render.list(ast, ast.cases);
    } else if (ast.init && ast.test && ast.update) {
      render.view(ast);
      render.list(ast, [ast.init, ast.test, ast.update], 'for (', ';', ')');
    } else if (ast.type === 'DoWhileStatement') {
      ast.test.up = ast;
      render.view(ast);
      render.list(ast, [ast.test], 'while (', '', ')');
      render.list(ast, ast.body.body || ast.body, 'do ', '', '');
    } else if (ast.body && ast.left && ast.right) {
      render.view(ast);
      render.list(ast, [ast.left, ast.right], 'for (',(ast?.type === "ForInStatement" || ast?.type === "ForOfStatement") ? 'in' : 'for', ')');
      render.list(ast, ast.body.body || ast.body, '{', '', '}');
      // render.list(ast, [ast.left, ast.right], 'for (', '', ')');
    } else if (ast.test && (ast.alternate || ast.consequent)) {
      render.view(ast);
      render.list(ast, [ast.test], 'if (', '', ')');
      render.list(ast, [ast.consequent], '{', '', '}');
      if (ast.alternate) {
        render.view(ast);
        render.list(ast, [ast.alternate], 'else', '', '');
      }
    } else if (ast.test) {
      render.view(ast);
      render.list(ast, [ast.test], 'while (', '', ')');
    } 
  };

  render.expression = function (ast, left, operator, right) {
    render.view(ast);
    if (left) {
      path = render.path(ast, {object: left})
      //if(path.length > 3){ path = [path[0], String.fromCharCode(8230)].concat(path.slice(-2)) } // FEATURE!
      left.up = ast;
      render.side(left, ast, path, 'left');
    }
    //act.operator = ('=' == act.operator? ':' : act.operator);
    operator && render.the({
      name: ast.$id+'-act',
      sort: [0.1, ast.$id]
    }).the({
      name: ast.$id+'-act-text',
      sort: [0.1, ast.$id+'-act'],
      fill:  operator || '',
    });
  
    if (right) {
      right.up = right.up || ast;
      path = render.path(ast, {object: right})
      render.side(right, ast, path);
    }
  }

  render.path = function (ast, a) {
    var path = [];
    while(a = a.object){
      if (a.callee) { a.up = ast; render(a) }
      // property.name, property.raw, name, raw
      path.push((a.property||'').name||a.name||'');
    }
    return path.reverse();
  }

  render.side = function(right, ast, path, t){
    if (right.raw || 'Identifier' == right.type) {
      render.the({
        name: ast.$id + '-' + (t || 'right'),
        sort: [0.1, ast.$id]
      }).the({
        name: ast.$id + '-' + (t || right) + '-text',
        sort: [0.1, ast.$id + '-' + (t || 'right')],
        fill: right.raw || right.name || '?'
      });
    } else if (right.async) {
      render.the({
        name: ast.$id + '-async',
        fill: "async",
        sort: [0.1, ast.$id],
      });
    } else if (right.type === 'ClassDeclaration') {
      render.the({
        name: ast.$id + '-class',
        fill: "class",
        sort: [0.1, ast.$id],
      });
      
    } else if (right.property) {
      if (right?.object?.type === "ThisExpression") {
        console.log("ThisExpression:", right);
        // render.list(right, [right.object, right.property], '', '.', '');
        right.up = ast;
        render(right)
      } else {
        render.the({ // RIGHT
          name: ast.$id + '-' + (t || 'right'),
          sort: [0.1, ast.$id]
        }).the({
          name: ast.$id + '-' + (t || 'right') + '-text',
          sort: [0.1, ast.$id + '-' + (t || 'right')],
          fill: path.join(" . ")
        });
      }
      } else if (right instanceof Array) {
        render.list(ast, right, '(', ',', ')');
    } else if (right.argument && right.operator) {
        right.$id = right.$id || render.id(right);
        right.up = ast;
      
        render.expression(right, right.prefix ? null: right.argument, right.operator, right.prefix ? right.argument: null);
      } else if (right.callee || right.operator) {
        right.up = ast;
        render(right);
      } else if (right.elements) {
        render.the({ // make view
          name: right.$id = right.$id || render.id(right),
          sort: [0.1, ast.$id]
        });
        render.list(right, right.elements);
      } else if (right.properties) {
        render.the({ // make view
          name: right.$id = right.$id || render.id(right),
          sort: [0.1, ast.$id]
        });
        render.list(right, right.properties, '{', ',', '}');
      } else if (right.body) {
        right.up = right.up || ast
        right.$id = right.$id || render.id(right);
        render.the({ // RIGHT
          name: right.$id,
          sort: [0.1, right.up.$id],
          fill: render.fill(right)
        });
        render(right);
      } else if (right.argument) {
        right.up = right.up || ast
        right.$id = right.$id || render.id(right);
        render.the({ // RIGHT
          name: right.$id,
          sort: [0.1, right.up.$id],
          fill: render.fill(right)
        });
        render(right);
      }
  }

  render.list = function(ast, steps, s, b, e){
    if (!ast) return;
    if (!(steps instanceof Array)) {
      steps = [steps] || [];
    }

    if(ast.elements){ s = '[', b = ',', e = ']' }
    // if(ast.expression){ s = '(', b = ',', e = ') => ' }
    if (ast.declarations) { s = '', b = ',', e = '' }
    if (ast.specifiers) { s = 'import {', b = ',', e = '}' }
    //if(ast.params){ s = '<', b = '&', e = '>' }
  
    // console.log("???", s,b,e, ast.$id);
    var id = render.id(ast);
    if(s){
      render.the({ // ACT
        name: id, 
        sort: [0.1, ast.$id],
      }).the({
        name: id+'-text',
        sort: [0.1, id],
        fill: s
      });
    }
    steps.forEach(function(a, i){
  
      i && render.the({
        name: id+'-'+i,
        sort: [0.1, ast.$id],
        fill: b || ""
      });
  
      if(a?.expression && a.expression !== true){
        a.expression.up = a;
        a = a.expression;
      }
  
      a.up = ast;
      render.the({
        name: a.$id = a.$id || render.id(a),
        size: [[1,'~'],[1,'~']],
        sort: [0.1, ast.$id]
      });
      render(a);
    });

    if(e){
      console.log("???--", ast.$id, s,b,e);  
      render.the({ // ACT
        name: id+'-end',
        sort: [0.1, ast.$id],
      }).the({
        name: id+'-end-text',
        sort: [0.1, id+'-end'],
        fill: e
      });
    }
  }

  // Utility functions
  render.fill = function() {
    return [Math.random()-0.2, Math.random()-0.2, Math.random()-0.2, 0.3];
  };

  render.uid = function () {
    return Math.random().toString(32).slice(2);
  };

  render.id = function (ast) {
    const name = ast && ast.type || ast || "node";
    return name + "-" + render.uid();
  };

  render.the = function (o) {
    window.onmessage({ data: [o] });
    return render;
  };

  render.put = function(key, val) {
    window.onmessage({ data: { put: val, get: key, how: "store" }, target: {id: key} });
  };
  }());