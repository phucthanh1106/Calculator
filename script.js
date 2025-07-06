// Basic mathe functions
const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const equal = (a) => a;

console.log(add(1, 2));

// Defining 3 variables for an equation
let num1;
let num2;
let op; // operator

const operate = (op, num1, num2) => {
    switch(op) {
        case "+":
            add(num1, num2);
            break;
        case "-":
            sub(num1, num2);
            break;
        case "*":
            multiply(num1, num2);
            break;
        case "/":
            divide(num1, num2);
            break;
        default:
            console.log("Unknown operator");
            break;
    }
}

// Creating buttons for the calculator
clear = document.querySelectorAll(".clear");
ops = document.querySelectorAll(".opeators");


