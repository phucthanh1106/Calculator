// Basic mathe functions
const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const negate = (a) => a * (-1);
const equal = (a) => a;
const point = (a) => a / 100;

console.log(add(1, 2));

// Defining 3 variables for a calculation and the function for them
let num1 = "";
let num2 = "";
let op = ""; // operator

const operate = (op, num1, num2 = 1) => {
    switch(op) {
        case "add":
            res = add(num1, num2);
            break;
        case "sub":
            res = sub(num1, num2);
            break;
        case "multiply":
            res = multiply(num1, num2);
            break;
        case "divide":
            res = divide(num1, num2);
            break;
        case "negate":
            res = negate(a);
            break;
        case "equal":
            res = equal(num1);
            break;
        case "point":
            res = point(num1);
            break;
        default:
            console.log("Unknown operator");
            break;
    }
    return Math.round(res * 1000) / 1000;
}


// Displaying
const display = (content, line = 1) => {
    let text1 = document.querySelector(".text1");
    let text2 = document.querySelector(".text2");
    if (line == 1 || text1.textContent == "") {
        text1.textContent += content;
    } else {
        text2.textContent += content;
    }
}

// Creating buttons for the calculator
const buttons = document.querySelectorAll("button");
let first = true;
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // AC button
        if (button.dataset.clear == "clear") {
            reset()
        // num1 has not been fully written yet
        } else if (num1.length == 0  || (op.length == 0  && ((button.dataset.number || button.dataset.op == "point") && first))) {
            if (button.dataset.number) {
                if (button.dataset.number != 0) {
                    num1 += button.dataset.number;
                    display(button.dataset.number, 1);
                }  
            } else if (button.dataset.op == "point" && !num1.includes(".")) {
                if (num1 == 0 || num1.length == 0) {
                    display("0.");
                } else {
                    display(".");
                } 
                num1 += ".";
            }
        // Moving on the operator
        } else if (button.dataset.op && op === "" && num2 === "" && button.dataset.op != "point" && button.dataset.op != "equal") {
            if (!first) {
                display(num1, 1);
            }
            op = button.dataset.op;
            display(` ${button.textContent} `, 1);
            console.log(num1,op,num2);
        // Finishing with the last number
        } else if (op != "" && (button.dataset.number || button.dataset.op == "point")) {
            if (button.dataset.number) {
                num2 += button.dataset.number;
                display(button.dataset.number, 1);
            } else if (button.dataset.op == "point" && !num2.includes(".") ) {
                if (num2 == 0 || num2.length == 0) {
                    display("0.");
                } else {
                    display(".");
                }
                num2 += ".";
            }  
        // Calculate the result and then reset every variable back to its default value
        } else if (button.dataset.op == "equal" && num2.length != 0) {
            let ans = operate(op, +num1, +num2);
            let text1 = document.querySelector(".text1");
            let text2 = document.querySelector(".text2");

            text1.textContent = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
            text2.textContent = ans;
            num1 = ans;
            num2 = "";
            op = "";
            first = false;
        }
    })
})


// Create a reset function
const reset = () => {
    first = true;
    let text1 = document.querySelector(".text1");
    let text2 = document.querySelector(".text2");
    text1.textContent = "";
    text2.textContent = 0;
    num1 = "";
    num2 = "";
    op = ""
}



