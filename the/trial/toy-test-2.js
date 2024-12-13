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
// import { a } from 'module';
// import b from 'another';

// export default function c() {
//   console.log("c");
// }
// // var declaration
// var x = 10;

// // let declaration
// let y = 'Hello World';

// // const declaration
// const z = true;

// // Function Declarations and Expressions

// // Function declaration with parameters and default values
// function add(a, b = 5) {
//     return a + b;
// }

// // Function expression assigned to a variable
// const multiply = function (a, b) {
//     return a * b;
// };

// const sq = function (n) {
//   return n * n;
// }
// const square = n => n * n;

// // Arrow function with implicit return

// // Arrow function with block body
// const divide = (a, b) => {
//     if (b === 0) {
//         throw new Error('Division by zero');
//     }
//     return a / b;
// };

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
// for (const key in person) {
//     if (person.hasOwnProperty(key)) {
//         console.log('Property:', key, 'Value:', person[key]);
//     }
// }

// // For...of loop (iterate over iterable objects)
// for (const num of numbers) {
//     console.log('Number:', num);
// }

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
function outerFunction(outerVariable) {
    return function innerFunction(innerVariable) {
        console.log('Outer Variable:', outerVariable);
        console.log('Inner Variable:', innerVariable);
    };
}
const newFunction = outerFunction('outside');
newFunction('inside');

// // Immediately resolved Promise
// Promise.resolve('Immediate value').then(value => console.log(value));

// // Chained Promises
// Promise.resolve(1)
//     .then(value => value + 1)
//     .then(value => value + 1)
//     .then(value => console.log('Final value:', value));

// // Using 'arguments' object in a function
function argumentsExample() {
    console.log('Arguments length:', arguments.length);
}
argumentsExample(1, 2, 3);

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
// // Numeric es (ECMAScript 2021)
// const largeNumber = 1000000;
// // End of code examples
// (fn())(args);
// obj[computedProperty]();
// obj.method(c).chain().calls(b);

    `;
    code && render.put("code", code);
    var ast = acorn.parse(code,{ecmaVersion: 2022, sourceType: 'module'});
    // var ast = esprima.parse(code);
    ast && render.put("ast", ast);
    render(ast);
  
    // setTimeout(function(){ $('#console').text(code).css({top: 0, left: 0, right: 0, height: '9em', bottom: 'none', 'text-align': 'left'}) },999);
  
  });
  
  
  // Core AST node type groups
  const ASTGroups = {
    Program: {
      types: ['Program', 'BlockStatement'],
      handler: 'body'
    },
    ControlFlow: {
      types: ['IfStatement', 'SwitchStatement', 'TryStatement', 'WithStatement', 'LabeledStatement'],
      handler: 'flow'  
    },
    Loops: {
      types: ['ForStatement', 'WhileStatement', 'DoWhileStatement', 'ForInStatement', 'ForOfStatement'],
      handler: 'loop'
    },
    Declarations: {
      types: ['FunctionDeclaration', 'ClassDeclaration', 'VariableDeclaration'],
      handler: 'declare'
    },
    Expressions: {
      types: [
        'BinaryExpression', 'LogicalExpression', 'UnaryExpression',
        'UpdateExpression', 'MemberExpression', 'CallExpression',
        'AssignmentExpression', 'ConditionalExpression', 'SequenceExpression'
      ],
      handler: 'act'
    },
    Patterns: {
      types: ['ObjectPattern','ObjectExpression', 'ArrayPattern', 'RestElement', 'AssignmentPattern', 'SpreadElement'],
      handler: 'pattern'
    },
    Modules: {
      types: [
        'ImportDeclaration', 'ExportDefaultDeclaration', 'ExportAllDeclaration',
        'ExportNamedDeclaration', 'ImportSpecifier', 'ImportDefaultSpecifier',
        'ImportNamespaceSpecifier', 'ExportSpecifier'
      ],
      handler: 'module'
    },
    Basic: {
      types: ['Literal', 'Identifier', 'ThisExpression'],
      handler: 'act'
    },
  };

  function render(ast) {
    if (!ast) return;
    
    const group = Object.values(ASTGroups).find(g => g.types.includes(ast.type));
    if (group) {
      console.log(group, ast);
      debugger;
      render[group.handler](ast);
    } else {
      render.act(ast);
    }
  }

  render.body = function(ast) {
    if (!ast) return;
    // Ensure the AST node has a body to process
    const bodyContent = ast.body?.body || ast.body;
    if (!bodyContent) {
        console.warn('No body content found for AST node:', ast);
        return;
    }

    if (!ast.up) {
        render.the({
            name: ast.$id + '-start',
            size: [[1, '~'], [1, '~']],
            sort: [0.1, ast.up?.$id],
        });
    }
    ast = render.setup(ast);

    if (ast.id) {
      render.act(ast);
      return;
    }

    // if (ast.up?.params || ast?.param) {
    //     render.list(ast, ast.up.params || ast.params || ast.param, '', ',', '');
    // }

    render.list(ast, bodyContent, '', ';', ';');
  };

  render.flow = function(ast) {
    const types = {
      'IfStatement': 'if',
      'SwitchStatement': 'switch',
      'TryStatement': 'try',
      'WithStatement': 'with',
      'LabeledStatement': 'label'
    };

    ast = render.setup(ast, { type: types[ast.type] });

    if (ast.type === 'IfStatement') {
      render.list(ast, [ast.test], '(', '', ')');
      render.list(ast, [ast.consequent], '{', ';', '}');
      if (ast.alternate) {
        render.list(ast, [ast.alternate], 'else {', ';', '}');
      }
    } else if (ast.type = 'ConditionalExpression') {
      render.list(ast, [ast.test], '(', '', ')');
      render.list(ast, [ast.consequent], '?');
      if (ast.alternate) {
        render.list(ast, [ast.alternate], ':');
      }
    } else if (ast.type === 'SwitchStatement') {
      render.list(ast, [ast.discriminant],'(', '',  ')');
      render.list(ast, ast.cases);
    } else if (ast.type === 'TryStatement') {
      render.list(ast, [ast.block]);
      if (ast.handler) {
        render.list(ast, [ast.handler], 'catch');
      }
      if (ast.finalizer) {
        render.list(ast, [ast.finalizer], 'finally' );
      }
    } else if (ast.type === 'WithStatement' || ast.type === 'LabeledStatement') {
      render.list(ast, [ast.object || ast.label]);
      render.list(ast, [ast.body]);
    }
  };

  render.loop = function(ast) {
    const types = {
      'ForStatement': 'for',
      'WhileStatement': 'while',
      'DoWhileStatement': 'do',
      'ForInStatement': 'for',
      'ForOfStatement': 'for'
    };

    ast = render.setup(ast, { type: types[ast.type] });

    if (ast.type === 'ForStatement') {
      render.list(ast, [ast.init, ast.test, ast.update], '(', ';', ')');
    } else if (ast.type === 'ForInStatement' || ast.type === 'ForOfStatement') {
      render.list(ast, [ast.left, ast.right], '(',
      types[ast.type].split(' ')[1],
       ')'
      );
    } else if (ast.type === 'DoWhileStatement') {
      render.list(ast, [ast.body], '{', ';', '}')
    } else {
      render.list(ast, [ast.test],'(', '', ')');
    }

    if (ast.type === 'DoWhileStatement') {
      render.list(ast, [ast.test], 'while (', '', ')');
    } else {  
      render.list(ast, [ast.body], '{', ';', '}');
    }
  };


  render.setup = function (ast, opt = {}) {
    if (!ast) return;
    
    ast.up = ast.up || '';
    ast.$id = ast.$id || render.id(ast);
    
    render.the({
      name: ast.$id,
      sort: [0.1, ast.up ? ast.up.$id : ''],
      fill: opt.fill || render.fill(ast)
    });

    if (opt.type) {
      render.the({
        name: ast.$id + "-type",
        sort: [0.1, ast.$id],
        fill: opt.type
      });
    }

    return ast;
  };

  render.value = function (ast, value, type = 'text') {
    const val = render.id(ast);
    render.the({
      name: val,
      sort: [0.1, ast.$id],
      // fill: render.fill(ast)
    }).the({
      name: val + '-' + type,
      sort: [0.1, val],
      fill: value
    });
    return val;
  };

  render.list = function(ast, steps, s, b, e){
    if(!ast) return;
    
    if(ast.elements){ s = '[', b = ',', e = ']' }
    if(ast.expression){ s = '', b = ',', e = '' }
    if(ast.declarations){ s = '', b = ',', e = '' }
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
  
    (steps||[]).forEach(function(a, i){
  
      i && render.the({
        name: id+'-'+i,
        sort: [0.1, ast.$id],
        fill: b || ""
      });
  
      if(a?.expression){
        a.expression.back = a;
        a = a.expression; // use the expression, if available.
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

  render.declare = function(ast) {
    if (!ast) return;
    
    if (ast.id && (ast.init || ast.body || ast.params)) {

        const declarator = {
            type: 'VariableDeclarator',
            id: ast.id,
            init: ast.init || {
                type: ast.type.replace('Declaration', 'Expression'),
                ...ast,
                id: null // Remove id from init to avoid duplication
            }
        };
        
        // if (ast.params) {
        //     declarator.init.params = ast.params;
        //     declarator.init.body = ast.body;
        //     declarator.init.async = ast.async;
        //     declarator.init.generator = ast.generator;
        // }
        if (ast.superClass) {
          declarator.init.superClass = ast.superClass;
          render.list(ast, [declarator.init.superClass], '(', '', ')')
        }
        if (ast.async) {
          render.value(ast, 'async', 'modifier');
        }
        if (ast.generator) {
            render.value(ast, '*', 'modifier');
        }
        render.list(ast, [declarator], '', ',', '');
        return;
    }

    if (ast.params) {
      render.list(ast, ast.params, '(', ',', ')');
    }

    // Handle different types of declaration lists
    const items = ast.declarations || // Variable declarations
                 ast.specifiers ||    // Import/Export specifiers
                 ast.init ||         // Direct initialization
                 ast.body?.body ||   // Class/Block body
                 [];

    // Set appropriate delimiters based on declaration context
    const opt = {
        s: ast.kind ? ast.kind + '' : '',  // var/let/const for variables
        b: ',',
        e: ''
    };

    // Handle source for imports/exports
    if (ast.source) {
        render.list(ast, items, opt.s, opt.b, opt.e);
        render.list(ast, [ast.source], 'from');
    } else {
        render.list(ast, items, opt.s, opt.b, opt.e);
    }

    // Handle declaration modifiers
    if (ast.declare) {
        render.value(ast, 'declare', 'modifier');
    }
    if (ast.default) {
        render.value(ast, 'default', 'modifier');
    }
    
  };
  
  render.method = function(ast) {
    if (!ast) return;
    ast = render.setup(ast);
    
    render.the({
        name: ast.$id,
        sort: [0.1, ast.up.$id],
        fill: ast.key.name
    });
    // Handle ast parameters
    if (ast.value && ast.value.params) {
        render.list(ast, ast.value.params, '(', ',', ')');
    }

    // Handle ast body
    if (ast.value && ast.value.body) {
        render.list(ast, ast.value.body.body, '{', ';', '}');
    }
};

  render.pattern = function(ast) {
    ast = render.setup(ast);
    
    if (ast.properties || ast.elements) {
        render.list(ast, ast.properties || ast.elements, 
            ast.properties ? '{' : '[',
            ',',
            ast.properties ? '}' : ']'
        );
        return;
    } 
    
    // Handle assignment patterns
    if (ast.type === 'AssignmentPattern') {
        if (ast.left) {
            ast.left.up = ast;
            render.act(ast.left);
        }
        render.value(ast, '=', 'operator')
        if (ast.right) {
            ast.right.up = ast;
            render.act(ast.right);
        }
        return;
    }
    
    // Handle rest/spread elements
    if (ast.type === 'RestElement' || ast.type === 'SpreadElement') {
        render.the({
            name: ast.$id + '-spread',
            sort: [0.1, ast.$id]
        }).the({
            name: ast.$id + '-spread-text',
            sort: [0.1, ast.$id + '-spread'],
            fill: '...'
        });
        
        if (ast.argument) {
            ast.argument.up = ast;
            render.the({
                name: ast.argument.$id = ast.argument.$id || render.id(ast.argument),
                sort: [0.1, ast.$id + '-spread']
            });
            render.act(ast.argument);
        }
        return;
    }
  }

  render.module = function(ast) {
    ast = render.setup(ast);
    if (ast.type === 'ImportDeclaration') {
      render.value(ast, 'import', 'keyword');
      
      // Handle import specifiers
      if (ast.specifiers.length) {
        let defaultSpecifier = ast.specifiers.find(s => s.type === 'ImportDefaultSpecifier');
        let namespaceSpecifier = ast.specifiers.find(s => s.type === 'ImportNamespaceSpecifier');
        let namedSpecifiers = ast.specifiers.filter(s => s.type === 'ImportSpecifier');
        
        if (defaultSpecifier) {
          render.list(ast, [defaultSpecifier.local])
        }
        
        if (namespaceSpecifier) {
          render.value(ast, '* as', 'operator');
          render.side(namespaceSpecifier.local, ast, 'specifier');
        }
        
        if (namedSpecifiers.length) {
          render.list(ast, namedSpecifiers, defaultSpecifier ? ', {' : '{', ',', '}');
        }
      }
      if (ast.source) {
        render.value(ast, 'from', 'keyword');
        render.side(ast.source, ast, 'source');
      }
      return;

    } else if (ast.type === 'ExportDefaultDeclaration') {
      var e = render.value(ast, 'export default', 'keyword');
      // render.side(ast.declaration, ast, 'declaration');
      ast.declaration.$id = e;
      ast.declaration.up = ast;
      render(ast.declaration)
      return;

    } else if (ast.type === 'ExportAllDeclaration') {
      render.value(ast, 'export *', 'keyword');
      if (ast.source) {
        render.value(ast, 'from', 'keyword');
        render.side(ast.source, ast, 'source');
      }
      return;

    } else if (ast.type === 'ExportNamedDeclaration') {
      render.value(ast, 'export', 'keyword');
      
      if (ast.declaration) {
        render.side(ast.declaration, ast, 'declaration');
      } else {
        render.list(ast, ast.specifiers, '{', ',', '}');
        
        if (ast.source) {
          render.value(ast, 'from', 'keyword');
          render.side(ast.source, ast, 'source');
        }
      }
      return;

    } else if (ast.type === 'ImportSpecifier') {
      if (ast.imported.name !== ast.local.name) {
        render.side(ast.imported, ast, 'imported');
        render.value(ast, 'as', 'keyword');
        render.side(ast.local, ast, 'local');
      } else {
        render.side(ast.local, ast, 'local');
      }
      return;
    } else if (ast.type === 'ExportSpecifier') {
      if (ast.local.name !== ast.exported.name) {
        render.side(ast.local, ast, 'local');
        render.value(ast, 'as', 'keyword');
        render.side(ast.exported, ast, 'exported');
      } else {
        render.side(ast.local, ast, 'local');
      }
      return;
    }
  };

  render.act = function(ast) {
    if (!ast) return;
    // Handle basic nodes (literals and identifiers)
    if (ast.raw || ast.type === 'Identifier' || ast.type === 'Literal') {
      ast.$id = ast.$id || render.id(ast);
      render.the({
        name: ast.$id,
        sort: [0.1, ast?.up?.$id || ast.$id]
      }).the({
        name: ast.$id + '-text',
        sort: [0.1, ast.$id],
        fill: ast.raw || ast.name || ast.value,
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
    if (ast.async) {
      render.the({
        name: ast.$id + '-async',
        fill: "async",
        sort: [0.1, ast.$id],
      });
    }

    // Determine the action structure
    let act;
 
    if (ast.type === 'Pattern' || ast.type === 'ObjectPattern' || ast.type === 'ArrayPattern') {
      render.pattern(ast);
      return;
    } else if (ast.type && ASTGroups.Modules.types.includes(ast.type)) {
      render.module(ast);
      return;
    } else if (ast.type === "MethodDefinition") {
      render.method(ast)
    }else if (ast.left && ast.right) {
      if (!ast.operator) {
        ast.operator = '=';
      }
      act = ast;
    } else if (ast.params) {
      ast.expression.back = ast
      act = { left: ast.params || { property: ast.id }, right: ast.body };
    } else if ("VariableDeclaration" == ast.type || "VariableDeclarator" == ast.type) {
      var op = "=";
      if (ast?.up && (ast?.up.type === "ForInStatement" || ast?.up.type === "ForOfStatement")) {
        op = ast?.up.type === "ForInStatement" ? "in" : "of";
      }
      act = { left: ast.id || ast.declarations?.[0]?.id, operator: op, right: ast.init || ast.declarations?.[0]?.init };
    } else if (ast.callee) {
      ast.callee.back = ast;
      act = { left: ast.callee, operator: '', right: ast.arguments };
    } else if (ast.operator && ast.argument) {
      act = { left: ast.prefix ? null : ast.argument, operator: ast.operator, right: ast.prefix ? ast.argument : null };
    } else if (ast.type === 'MemberExpression') {
      let op =  ast.optional ? '?' : '.'
      act = { left: ast.object, operator: op, right: ast.property };
      if (ast.object.type === "ThisExpression") {
        act.left = {type: "Identifier", name: "this"}
      }
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

    // Setup the node
    ast = render.setup(ast)


    // Detect if this is a chain
    let left = act?.left;
    let right = act?.right;

    if (ast.type === 'FunctionExpression' && !ast.id) {
      if (right) {
          right.up = right.up || ast;
          let path = [];
          let a = { object: right };
          
          while (a = a.object) {
              if (a.callee) { 
                  a.up = ast; 
                  render(a); 
              }
              path.push((a.property || '').name || a.name || '');
          }
          path = path.reverse();
          render.side(right, ast, path, 'right');
      }
      return;
    }
    if (ast.type === 'CallExpression') {
      let isChain = false;
      let current = ast;
      while (current?.callee) {
          if (current.callee.type === 'MemberExpression') {
              isChain = true;
              current = current.callee.object;
          } else {
              break;
          }
      }

      if (isChain) {
          render.chain(ast);
          return;
      }
    }

    
    // Process left side
    if (left) {
      left.up = left.up || ast;
      let path = [];
      let a = { object: left };
      
      while (a = a.object) {
        if (a.callee) { 
          a.up = ast; 
          render(a); 
        }
        path.push((a.property || '').name || a.name || '');
      }
      path = path.reverse();


      
      render.side(left, ast, path, 'left');
    }

    // Process operator
    if (act?.operator) {
      render.the({
        name: ast.$id + '-act',
        sort: [0.1, ast.$id]
      }).the({
        name: ast.$id + '-act-text',
        sort: [0.1, ast.$id + '-act'],
        fill: act.op || act.operator || '',
      });
    }

    // Process right side
    if (right) {
      right.up = right.up || ast;
      let path = [];
      let a = { object: right };
      
      while (a = a.object) {
        if (a.callee) { 
          a.up = ast; 
          render(a); 
        }
        path.push((a.property || '').name || a.name || '');
      }
      path = path.reverse();
      render.side(right, ast, path, 'right');
    }
  };

  
  render.chain = function(ast) {
    ast = render.setup(ast);
    
    let current = ast;
    const chainParts = [];
    
    // Collect all parts of the chain
    while (current) {
        chainParts.unshift(current);
        current = current.callee?.object || current.object;
    }
    
    // Render each part in its own box
    chainParts.forEach((part, index) => {
        // Create container for this part
        part.$id = part.$id || render.id(part);
        part.up = ast;
        
        render.the({
            name: part.$id,
            fill: render.fill(part),
            sort: [0.1, index === 0 ? ast.up.$id : chainParts[index - 1].$id]
        });
        
        if (part.type === 'CallExpression') {
            // Handle method call
            if (part.callee.property) {
                render.the({
                    name: part.$id + '-method',
                    sort: [0.1, part.$id]
                }).the({
                    name: part.$id + '-method-text',
                    sort: [0.1, part.$id + '-method'],
                    fill: part.callee.property.name
                });
            }
            
            // Handle arguments
            if (part.arguments) {
                const argsContainer = render.the({
                    name: part.$id + '-args',
                    sort: [0.1, part.$id]
                });

                part.arguments.forEach(arg => {
                    arg.up = part;
                    if (arg.type === 'FunctionExpression' || arg.type === 'ArrowFunctionExpression') {
                        // Render the callback function within the arguments container
                        render.the({
                            name: arg.$id = arg.$id || render.id(arg),
                            sort: [0.1, argsContainer.name]
                        });
                        render.act(arg);
                    } else {
                        render.list(part, [arg], '(', ',', ')');
                    }
                });
            } else {
                render.the({
                    name: part.$id + '-args',
                    sort: [0.1, part.$id]
                }).the({
                    name: part.$id + '-args-text',
                    sort: [0.1, part.$id + '-args'],
                    fill: '()'
                });
            }
        } else if (part.type === 'MemberExpression') {
            if (part.computed) {
                render.value(part, '[', 'operator');
                render.act(part.property);
                render.value(part, ']', 'operator');
            } else {
                render.the({
                    name: part.$id + '-prop',
                    sort: [0.1, part.$id]
                }).the({
                    name: part.$id + '-prop-text',
                    sort: [0.1, part.$id + '-prop'],
                    fill: part.property.name
                });
            }
        } else if (part.type === 'Identifier') {
            render.the({
                name: part.$id + '-text',
                sort: [0.1, part.$id],
                fill: part.name
            });
        } else if (part.type === 'FunctionExpression' && !part.id) {
            // Handle IIFE
            render.the({
                name: part.$id + '-iife',
                sort: [0.1, part.$id]
            }).the({
                name: part.$id + '-iife-text',
                sort: [0.1, part.$id + '-iife'],
                fill: 'IIFE'
            });
            render.list(part, part.params, '(', ',', ')');
            render.list(part, part.body.body, '{', ';', '}');
        }
        
        // Add dot connector if not last item
        if (index < chainParts.length - 1) {
            render.the({
                name: part.$id + '-dot',
                sort: [0.1, part.$id]
            }).the({
                name: part.$id + '-dot-text',
                sort: [0.1, part.$id + '-dot'],
                fill: '.'
            });
        }
    });
  };

  render.side = function (node, ast, path, side = 'right') {
    if (!node) return;
    // ast = render.setup(ast);
    // if(node.raw || 'Identifier' == node.type){
    //   render.the({
    //     name: ast.$id+'-'+node,
    //     sort: [0.1, ast.$id]
    //   }).the({
    //     name: ast.$id+'-'+node+'-text',
    //     sort: [0.1, ast.$id+'-'+node],
    //     fill: node.raw || node.name || '?'
    //   });
    // } else 
    // if(node.property){
    //   render.the({ // RIGHT
    //     name: ast.$id+'-'+node,
    //     sort: [0.1, ast.$id]
    //   }).the({
    //     name: ast.$id+'-'+node+'-text',
    //     sort: [0.1, ast.$id+'-'+node],
    //     fill: path.join(" . ")
    //   });
    // } else
    // if(node instanceof Array){
    //   render.list(ast, node, '(', ',', ')');
    // } else
    // if(node.callee || node.operator){
    //   node.up = ast;
    //   render(node);
    // } else
    // if(node.body){
    //   node.up = node.up || ast;
    //   node.$id = node.$id || Math.random().toString(32).slice(2);
    //   render.the({ // RIGHT
    //     name: node.$id,
    //     sort: [0.1, node.up.$id],
    //     fill: render.fill(node)
    //   });
    //   render(node);
    // } else 
    // if(node.elements){
    //   render.the({ // make view
    //     name: node.$id = node.$id || render.id(node),
    //     sort: [0.1, ast.$id]
    //   });
    //   render.list(node, node.elements);
    // } else {}
    // return;
    if (node instanceof Array) {
      render.list(ast, node, '(', ',', ')');
      return;
    }

    if (node.type === 'CallExpression') {
      // Check if this is part of a chain
      let isChain = false;
      let current = node;
      while (current?.callee) {
          if (current.callee.type === 'MemberExpression') {
              isChain = true;
              current = current.callee.object;
          } else {
              break;
          }
      }

      if (isChain) {
          node.$id = node.$id || render.id(node);
          render.chain(node);
      } else {
          // Original call expression handling
          node.$id = node.$id || render.id(node);
          render.act(node.callee);
          render.the({
              name: node.$id + '-args',
              sort: [0.1, ast.$id]
          });
          render.list(node, node.arguments, '(', ',', ')');
      }
      return;
    } if (node.type === 'Identifier' || node.type === 'Literal' || node.raw) {
      render.the({
        name: ast.$id + '-' + side ,
        sort: [0.1, ast.$id],
      }).the({
        name: ast.$id + '-' + side + '-text',
        sort: [0.1, ast.$id + '-' + side],
        fill: node.raw || node.name || node.value || '?'
      });
    } else if (node.type === 'MemberExpression') {
      if (node.computed) {
        render.act(node.object);
        render.value(ast, '[', 'operator');
        render.act(node.property);
        render.value(ast, ']', 'operator');
      } else {
        render.act(node);
      }
    } else if (node.type === 'FunctionExpression') { 
      render.the({
        name: node.$id = node.$id || render.id(node),
        sort: [0.1, ast.$id]
      });
      render.declare(node);
    } else if (node.test) {
      render.flow(node)
    }else if (['ObjectPattern', 'ArrayPattern', 'RestElement', 'AssignmentPattern', 'SpreadElement'].includes(node.type)) {
      render.pattern(node);
    } else if (node.type === 'BinaryExpression' || node.type === 'LogicalExpression') {
      render.act(node);
    } else if (node.type === 'AwaitExpression' || node.type === 'ReturnStatement') {
      render.act(node);
    } else if (node.property) {
      render.the({
        name: ast.$id + '-' + side,
        sort: [0.1, ast.$id]
      }).the({
        name: ast.$id + '-' + side + '-text',
        sort: [0.1, ast.$id + '-' + side],
        fill: path.join(" . ")
      });
    } else if (node.type === 'ObjectExpression') {
      node.up = node.up || ast;
      render.list(ast, node.properties,  '{', ',',  '}');
    } else if (node.callee || node.operator) {
      node.up = ast;
      render.act(node);
    }else if(node.body){
      node.up = node.up || ast;
      node.$id = node.$id || Math.random().toString(32).slice(2);
      render.the({ // RIGHT
        name: node.$id,
        sort: [0.1, node.up.$id],
        fill: render.fill(node)
      });
      render(node);
    } else if(node.elements){
      render.the({ // make view
        name: node.$id = node.$id || render.id(node),
        sort: [0.1, ast.$id]
      });
      render.list(node, node.elements);
    } else {
      render.act(node)
    }
  };

  // Utility functions
  render.fill = function() {
    return [Math.random()-0.2, Math.random()-0.2, Math.random()-0.2, 0.3];
  };

  render.id = function(ast) {
    return Math.random().toString(32).slice(2);
  };

  render.the = function(o) {
    window.onmessage({ data: [o] });
    return render;
  };

  render.put = function(key, val) {
    window.onmessage({ data: { put: val, get: key, how: "store" }, target: {id: key} });
  };
  }());