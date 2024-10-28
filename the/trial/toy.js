;(function(){
  console.log("Hello Experiments! Do whatever you want in this folder or files!");

  function load(src, cb){
      var script = document.createElement('script');
      script.onload = cb; script.src = src;
      document.head.appendChild(script);
  }

  load('trial/jquery.js', () => {
    load('trial/meta.js', commands)
  })

  load('trial/esprima.js', function(){

    var code = `
// Variable Declarations

// var declaration
var x = 10;

// let declaration
let y = 'Hello World!';

// const declaration
const z = true;

// Function Declarations and Expressions

// Function declaration with parameters and default values
function add(a, b = 5) {
    return a + b;
}

// // Function expression assigned to a variable
const multiply = function (a, b) {
    return a * b;
};

const sq = function (n) {
  return n * n;
}
const square = n => n * n;

// Arrow function with implicit return

// Arrow function with block body
// const divide = (a, b) => {
//     if (b === 0) {
//         throw new Error('Division by zero');
//     }
//     return a / b;
// };

// Immediately Invoked Function Expression (IIFE)
// (function () {
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
const numbers = [1, 2, 3];
// const [first, second, third] = numbers;

// // Rest and Spread Operators

// // Rest parameters in a function
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
if (x > 5) {
    console.log('x is greater than 5');
} else {
    console.log('x is less than or equal to 5');
}

// // Switch statement
switch (y) {
    case 'Hello':
        console.log('Greeting detected');
        break;
    case 'Goodbye':
        console.log('Farewell detected');
        break;
    default:
        console.log('Unknown message');
}

// For loop
for (let i = 0; i < 5; i++) {
    console.log('For loop iteration:', i);
}

// // While loop
let count = 0;
while (count < 3) {
    console.log('While loop count:', count);
    count++;
}

// // Do-while loop
do {
    console.log('Do-while loop count:', count);
    count--;
} while (count > 0);

// // For...in loop (enumerate object properties)
for (const key in person) {
    if (person.hasOwnProperty(key)) {
        console.log('Property:', key, 'Value:', person[key]);
    }
}

// // For...of loop (iterate over iterable objects)
for (const num of numbers) {
    console.log('Number:', num);
}

// // Exception Handling

// // Try-catch-finally block
try {
  console.log('Try block executed');
  throw new Error('An error occurred');
} catch (error) {
  console.error('Caught error:', error.message);
} finally {
  console.log('Finally block executed');
}

// // Classes and Inheritance

// // Class declaration
// class Animal {
//     constructor(name) {
//         this.name = name;
//     }
//     speak() {
//         console.log(this.name + ' makes a noise.');
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
// setTimeout(function () {
//     console.log('Timeout executed');
// }, 1000);

// // Working with Promises
// const promise = new Promise(function (resolve, reject) {
//     setTimeout(() => resolve('Promise resolved'), 500);
// });
// promise.then(result => console.log(result));

// // Using Map and Set
// const map = new Map();
// map.set('key', 'value');
// const set = new Set([1, 2, 3]);

// // Symbol type
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
// const max = x > y.length ? x : y.length;

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

// // Using 'with' statement (not recommended, not allowed in strict mode)
// (function () {
//     var obj = { a: 1, b: 2 };
//     with (obj) {
//         console.log('a + b =', a + b);
//     }
// })();

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
//         console.log(this); // 'this' refers to objectWithMethod
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
// const nullishValue = null != null ? null : 'Default value';

// // Numeric separators (ECMAScript 2021)
// const largeNumber = 1000000;

// // End of code examples

    `;
    try {
      var ast = esprima.parseScript(code);
      render(ast);
    } catch (err) {
      console.error("Parsing Error:", err);
    }
  
    setTimeout(function(){ $('#console').text(code).css({top: 0, left: 0, right: 0, height: '9em', bottom: 'none', 'text-align': 'left'}) },999);
  
  });
  
  const conditionTexts = {
    if: 'if',
    elseIf: 'else if',
    else: 'else',
  };
  
  function render(ast) {
    if (!ast) { return; }
    if (ast.type === 'Program' || ast.type === 'BlockStatement') {
      render.body(ast);
    } else if (ast.test && (ast.consequent || ast.alternate)) {
      render.conditionals(ast);
    } else if ((ast.init || ast.test || ast.update || ast.left || ast.right) && ast.body) {
      render.loops(ast);
    } else if (ast.discriminant && ast.cases) {
      render.switch(ast);
    } else if (ast.operator && ast.argument) {
      render.update(ast);
    } else if (ast.body) {
      render.body(ast);
    } else if (ast.declarations || ast.expressions || ast.elements) {
      render.declare(ast);
    } else if (ast.block && ast.handler || ast.finalizer) {
      render.exception(ast);
    } else {
      render.act(ast);
    }
  }

  render.exception = function (ast) {
    console.log("EXCEPTION", ast);
    ast.$id = ast.$id || render.id(ast);
    ast.up = ast.up || '';
  
    render.the({
      name: ast.$id,
      sort: [0.1, ast.up ? ast.up.$id : ''],
      fill: render.fill(ast)
    });
  
    render.the({
      name: ast.$id + "-type",
      sort: [0.1, ast.$id],
      fill: 'try'
    });
  
    if (ast.block) {
      ast.block.up = ast;
      render.prop(ast, 'block');
    }
  
    if (ast.handler) {
      render.the({
        name:  render.id(ast.handler) + "-catch",
        sort: [0.1, ast.$id],
        fill: 'catch'
      });
      ast.handler.up = ast;
      render.prop(ast, 'handler');
    }
  
    if (ast.finalizer) {
      render.the({
        name:  render.id(ast.finalizer) + "-catch",
        sort: [0.1, ast.$id],
        fill: 'finaly'
      });
      ast.finalizer.up = ast;
      render.prop(ast, 'finalizer');
    }
  }
  
  // Utility function to render bodies of nodes
  render.prop = function (ast, prop) {
    if (ast[prop]) {
      ast[prop].up = ast;
      render(ast[prop]);
    }
  }
  
  render.conditionals = function(ast, options = {}) {
  
    ast.$id = ast.$id || render.id(ast);
    ast.up = ast.up || '';
  
    const texts = {
      if: options.ifText || conditionTexts.if,
      elseIf: options.elseIfText || conditionTexts.elseIf,
      else: options.elseText || conditionTexts.else,
    };
  
    ['test', 'consequent', 'alternate'].forEach(prop => {
      if (ast[prop]) {
        ast[prop].up = ast;
      }
    });
  
    render.the({
      name: ast.$id,
      sort: [0.1, ast.up ? ast.up.$id : ''],
      fill: render.fill(ast)
    });
  
    let conditionType = texts.if;
    if (ast.up && ast.up.alternate === ast) {
      conditionType = ast.test ? texts.elseIf : texts.else;
    }
  
    render.the({
      name: ast.$id + "-type",
      sort: [0.1, ast.$id],
      fill: conditionType
    });
  
    if (ast.test) {
      render.act(ast.test);
    }
  
    if (ast.consequent) {
      render.prop(ast, 'consequent');
    }
  
    if (ast.alternate) {
      if (ast.alternate.type === 'IfStatement') {
        ast.alternate.up = ast;
        render.conditionals(ast.alternate, options);
      } else {
        let elseId = render.id(ast.alternate);
        render.the({
          name: elseId,
          sort: [0.1, ast.$id],
          fill: texts.else
        });
  
        ast.alternate.up = ast;
        render.prop(ast, 'alternate');
      }
    }
  };
  
  render.loops = function(ast) {
    ast.$id = ast.$id || render.id(ast);
    ast.up = ast.up || '';
  
    const loopTypes = {
      'ForStatement': 'for',
      'ForInStatement': 'for',
      'ForOfStatement': 'for',
      'WhileStatement': 'while',
      'DoWhileStatement': 'do while',
    };
  
    let loopType = loopTypes[ast.type] || ast.type;
  
    render.the({
      name: ast.$id,
      sort: [0.1, ast.up.$id],
      fill: render.fill(ast)
    });
  
    render.the({
      name: ast.$id + "-type",
      sort: [0.1, ast.$id],
      fill: loopType
    });
  
    ['init', 'left', 'test', 'right', 'update', 'body'].forEach(prop => {
      if (ast[prop]) {
        ast[prop].up = ast;
      }
    });
  
    ['init', 'left', 'test', 'right', 'update'].forEach(prop => {
      if (ast[prop]) {
        render.act(ast[prop]);
      }
    });
  
    if (ast.body) {
      render.prop(ast, 'body');
    }
  };
  
  render.switch = function(ast) {
    ast.$id = ast.$id || render.id(ast);
    ast.up = ast.up || '';
  
    render.the({
      name: ast.$id,
      sort: [0.1, ast.up ? ast.up.$id : ''],
      fill: render.fill(ast)
    });
  
    render.the({
      name: ast.$id + "-type",
      sort: [0.1, ast.$id],
      fill: 'switch'
    });
  
    if (ast.discriminant) {
      ast.discriminant.up = ast;
      render.act(ast.discriminant);
    }
  
    if (ast.cases && ast.cases.length > 0) {
      ast.cases.forEach(switchCase => {
        switchCase.up = ast;
        render.case(switchCase);
      });
    }
  };
  
  render.case = function(switchCase) {
    switchCase.$id = switchCase.$id || render.id(switchCase);
  
    render.the({
      name: switchCase.$id,
      sort: [0.1, switchCase.up.$id],
      fill: render.fill(switchCase)
    });
  
    let caseLabel = switchCase.test ? 'case' : 'default';
    render.the({
      name: switchCase.$id + "-label",
      sort: [0.1, switchCase.$id],
      fill: caseLabel
    });
  
    if (switchCase.test) {
      switchCase.test.up = switchCase;
      render.act(switchCase.test);
    }
  
    if (switchCase.consequent && switchCase.consequent.length > 0) {
      render.list(switchCase, switchCase.consequent, '', '', '');
    }
  };
  
  render.update = function(ast) {
    ast.$id = ast.$id || render.id(ast);
  
    render.the({
      name: ast.$id,
      sort: ast.up ? [0.1, ast.up.$id] : [0.1],
      fill: render.fill(ast)
    });
  
    if (ast.argument) {
      ast.argument.up = ast;
      render.act(ast.argument);
    }
    render.the({
      name: ast.$id + "-operator",
      sort: [0.1, ast.$id],
      fill: ast.operator
    });
  };
  
  render.body = function(ast){
    if(ast.id){ // named function, convert to left/right:
      render.act(ast);
      return;
    }
    ast.up = ast.up || '';
    ast.$id = ast.$id || render.id(ast);
    if(!ast.up){
      render.the({
        name: ast.$id+'-start',
        size: [[1,'~'],[1,'~']],
        sort: [0.1, ast.up.$id],
      });
    }
    render.the({
      name: ast.$id,
      size: [[1,'~'],[1,'~']],
      sort: [0.1, ast.up.$id],
      fill: ast.up ? render.fill(ast) : undefined
    });
    if(ast.up.params || ast.params || ast?.param){
      render.list(ast, ast.up.params || ast.params || ast.param, '(', ',', ')');
    }
    render.list(ast, ast.body.body || ast.body, '', ';', '');
  }
  
  render.act = function (ast) {
    if (!ast) { return; }
  
    if (ast.raw || 'Identifier' == ast.type || ast.type === 'Literal') { // end!
      ast.$id = ast.$id || render.id(ast);
  
      render.the({
        name: ast.$id,
        fill: render.fill(ast),
        sort: [0.1, ast?.up?.$id || ast.$id]
      }).the({
        name: ast.$id + '-text',
        sort: [0.1, ast.$id],
        fill: ast.raw || ast.name || ast.value,
      });
  
      return;
    }
  
    if (ast.async) {
      render.the({
        name: ast.$id + '-async',
        fill: "async",
        sort: [0.1, ast.$id],
      });
    }
    var act;
    if (ast.left && ast.right) {
      if (!ast.operator) {
        ast.operator = '=';
      }
      act = ast;
    } else if (ast.expression) {
      ast.expression.back = ast;
      act = ast = ast.expression;
    } else if (ast.params) {
      ast.body.up = ast;
      act = { left: { property: ast.id }, operator: "=", right: ast.body };
    } else if ("VariableDeclaration" == ast.type || "VariableDeclarator" == ast.type) {
      var op = "=";
      if (ast?.up && (
        ast?.up.type === "ForInStatement" || 
        ast?.up.type === "ForOfStatement")) {
        op = ast?.up.type === "ForInStatement" ? "in" : "of";
      }
      act = { left: ast.id || ast.declarations[0].id, operator: op, right: ast.init || ast.declarations[0].init };
    } else if (ast.callee) {
      ast.callee.back = ast;
      act = { left: ast.callee, operator: '', right: ast.arguments };
    } else if (ast.operator && ast.argument) {
      act = { left: ast.argument, operator: ast.operator, right: null };
    } else if (ast.type === 'MemberExpression') {
      act = { left: ast.object, operator: '.', right: ast.property };
    } else if (ast.type === 'AssignmentPattern'){
      act = { left: ast.left, operator: '=', right: ast.right };
    } else if (ast.type === 'ReturnStatement'){
      act = { operator: 'return', right: ast.argument };
    } else if (ast.body) {
      act = { operator: 'return', right: ast.body };
    } else {
      act = ast;
    }
    ast.up = ast.up || '';
    ast.$id = ast.$id || render.id(ast);
  
    // Process left side
    if (act?.left) {
      var left = act.left, a = {object: left}, path = [];
      while(a = a.object){
        if(a.callee){ a.up = ast; render(a); }
        path.push((a.property||'').name||a.name||'');
      }
      path = path.reverse();
      // if(path.length > 3){ path = [path[0], String.fromCharCode(8230)].concat(path.slice(-2)); }
  
      render.the({
        name: ast.$id,
        fill: render.fill(ast),
        sort: [0.1, ast.up.$id]
      });
      
      render.side(left, ast, path, 'left');
    }
  
    if (act?.operator) {
      act.operator && render.the({
        name: ast.$id+'-act',
        sort: [0.1, ast.$id]
      }).the({
        name: ast.$id+'-act-text',
        sort: [0.1, ast.$id+'-act'],
        fill: act.op || act.operator || '',
      });
    }
    
    if (act?.right) {
      var right = act.right;
      if (right) {
        right.up = right.up || ast;
        a = {object: right};
        path = [];
        while(a = a.object){
          if(a.callee){ a.up = ast; render(a); }
          path.push((a.property||'').name||a.name||'');
        }
        path = path.reverse();
  
        render.side(right, ast, path);
      }
    }
  }
  
  render.side = function(right, ast, path, t){
    if(right.type === 'CallExpression'){
      right.up = right.up || ast;
      right.$id = right.$id || render.id(right);
  
      render.act(right.callee);
  
      render.the({
        name: right.$id + '-args',
        sort: [0.1, ast.$id]
      });
      render.list(right, right.arguments, '(', ',', ')');
      return;
    }

    if(right.raw || 'Identifier' == right.type || right.type === 'Literal'){
      render.the({
        name: ast.$id+'-'+(t||'right'),
        sort: [0.1, ast.$id]
      }).the({
        name: ast.$id+'-'+(t||right)+'-text',
        sort: [0.1, ast.$id+'-'+(t||'right')],
        fill: right.raw || right.name || right.value || '?'
      });
    } else if(right.property){
      render.the({
        name: ast.$id+'-'+(t||'right'),
        sort: [0.1, ast.$id]
      }).the({
        name: ast.$id+'-'+(t||'right')+'-text',
        sort: [0.1, ast.$id+'-'+(t||'right')],
        fill: path.join(" . ")
      });
    } else if (right.type === 'MemberExpression') {
      render.act(right);
    } else if (right.type === 'BinaryExpression' || right.type === 'LogicalExpression') {
      render.act(right);
    } else if ('AwaitExpression' == right.type || 'ReturnStatement' == right.type){
      render.keyword(right);
    } else if(right instanceof Array){
      render.list(ast, right, '(', ',', ')');
    } else if(right.callee || right.operator){
      right.up = ast;
      render.act(right);
    } else if(right.body){
      right.up = right.up || ast;
      right.$id = right.$id || render.id(right);
      render.the({
        name: right.$id,
        sort: [0.1, right.up.$id],
        fill: render.fill(right)
      });
      render(right);
    } else if(right.elements){
      render.the({
        name: right.$id = right.$id || render.id(right),
        sort: [0.1, ast.$id]
      });
      render.list(right, right.elements);
    }
  }
  
  render.list = function(ast, steps, s, b, e){
    if(ast.elements){ s = '[', b = ',', e = ']' }
    if(ast.expression){ s = '', b = ',', e = '' }
    if(ast.declarations){ s = '' || '', b = ',', e = '' }
  
    var id = render.id();
    if(s){
      render.the({
        name: id,
        sort: [0.1, ast.$id],
      }).the({
        name: id+'-text',
        sort: [0.1, id],
        fill: s
      });
    }

    if (steps?.length) {
      (steps || []).forEach(function (a, i) {
        i && render.the({
          name: id + '-' + i,
          sort: [0.1, ast.$id],
          fill: b || ""
        });
    
        if (a.expression) {
          a.expression.back = a;
          a = a.expression; // use the expression, if available.
        }
    
        a.up = ast;
        render.the({
          name: a.$id = a.$id || render.id(a),
          size: [[1, '~'], [1, '~']],
          sort: [0.1, ast.$id]
        });
        render(a);
      });
    } else {
      steps && (steps.up = ast);
      render.act(steps);
    }
      
  
    if(e){
      render.the({
        name: id+'-end',
        sort: [0.1, ast.$id],
      }).the({
        name: id+'-end-text',
        sort: [0.1, id+'-end'],
        fill: e
      })
    }
  }
  
  render.flow = function(ast) {
    if (!ast) { return; }
    ast.$id = ast.$id || render.id(ast);
    render.the({
      name: ast.$id,
      sort: [0.1, ast.up ? ast.up.$id : ''],
      fill: render.fill(ast)
    });
    if (ast.body) {
      render(ast.body);
    }
  };
  
  render.declare = function(ast) {
    ast.up = ast.up || "";
    ast.$id = ast.$id || render.id(ast);
  
    render.list(
      ast,
      ast.declarations || ast.expressions || ast.elements
    );
  };
  
  render.keyword = function(ast) {
    if (!ast) { return; }
    ast.$id = ast.$id || render.id(ast);
  
    render.the({
      name: ast.$id,
      sort: ast.up ? [0.1, ast.up.$id] : [0.1],
      fill: render.fill(ast)
    });
  
    let statementType = ast.type.replace('Expression', '').replace('Statement', '').toLowerCase();
  
    render.the({
      name: ast.$id + "-type",
      sort: [0.1, ast.$id],
      fill: statementType
    });
    if (ast.argument) {
      ast.argument.up = ast;
      render.act(ast.argument);
    }
  };
  
  render.class = function(ast) {
    if (!ast) { return; }
    ast.up = ast.up || '';
    ast.$id = ast.$id || render.id(ast);
    
    render.the({
      name: ast.$id,
      sort: [0.1, ast.up ? ast.up.$id : ''],
      fill: render.fill(ast)
    });
    if (ast.body) {
      render(ast.body);
    }
  };
  
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
  
  function hashToColor(hash) {
    const r = ((hash >> 16) & 0xFF) / 255;
    const g = ((hash >> 8) & 0xFF) / 255;
    const b = (hash & 0xFF) / 255;
    return [r, g, b, 0.3];
  }

  render.fill = function (ast) {
    // const hash = hashString(ast.type);
    // return hashToColor(hash);
    return [Math.random()-0.2, Math.random()-0.2, Math.random()-0.2, 0.3];
  }
  render.id = function(ast) {
    return Math.random().toString(32).slice(2);
  }

  // var foldStates = new Map();

  render.the = function(o){
    // var element = map.get(o.name);
    // if(!element && o.name) {
    //   // Create new element
    //   element = document.createElement(o.fill && typeof o.fill === 'string' ? 'p' : 'div');
    //   element.id = 'v' + o.name.replace(aZ09, '');
    //   map.set(o.name, element);
      
    //   // Add click handler for folding
    //   element.addEventListener('click', function(e) {
    //     e.stopPropagation();
    //     var currentState = foldStates.get(o.name) || false;
    //     foldStates.set(o.name, !currentState);
        
    //     // Toggle visibility of immediate children
    //     var children = Array.from(element.children);
    //     children.forEach(function(child) {
    //       child.style.display = !currentState ? 'none' : '';
    //     });
        
    //     // Update folding indicator
    //     element.style.backgroundColor = !currentState ? 'rgba(0,0,0,0.1)' : '';
    //   });
    // }
  
    // // Set up the basic element properties
    // if(o.sort) {
    //   var target = map.get(o.sort[1] || 'SecureRender');
    //   if(target) {
    //     target.insertAdjacentElement(place[o.sort[0]], element);
    //   }
    // }
  
    // // Apply fold state if it exists
    // if(foldStates.has(o.name)) {
    //   var isFolded = foldStates.get(o.name);
    //   Array.from(element.children).forEach(function(child) {
    //     child.style.display = isFolded ? 'none' : '';
    //   });
    //   element.style.backgroundColor = isFolded ? 'rgba(0,0,0,0.1)' : '';
    // }

    window.onmessage({data:[o]});
    return render;
  }
  }());
  