const stringExample = "Hello PLP Coder";
const numberExample = 100;
const booleanExample = true;
let undefinedExample;
const nullExample = null;
const regexpExample = /ab+c/;

console.log("String Example:", stringExample);
console.log("Number Example:", numberExample);
console.log("Boolean Example:", booleanExample);
console.log("Undefined Example:", undefinedExample);
console.log("Null Example:", nullExample);
console.log("RegExp Example:", regexpExample);

// Loose Typing
let looseTypedVar = "I am a string";
console.log("Loose Typed Variable (string):", looseTypedVar);
looseTypedVar = 100;
console.log("Loose Typed Variable (number):", looseTypedVar);

const obj = {
    authorName: 'PLP Coder',
    language: 'Node.js'
}
console.log("Object Literal:", obj);

function display(x) {
    console.log("Function Argument:", x);
}
display(200);

const buffer = Buffer.from('Hello, World!', 'utf-8');
console.log("Buffer Content:", buffer.toString());


// Process Object
console.log("Node.js Executable Path:", process.execPath);
console.log("Process ID:", process.pid);
console.log("Current Working Directory:", process.cwd());

globalThis.myGlobalVar = "This is a plp global variable";
console.log("Global Variable:", global.myGlobalVar);

const logger = require('./logger');
logger.log.console('Hello from the other side')

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is your name? ', (name) => {
    console.log(`Hello, ${name}!`);
    rl.close();
});

