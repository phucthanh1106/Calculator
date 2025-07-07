// Basic mathe functions
const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
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
let text1 = document.querySelector(".text1");
let text2 = document.querySelector(".text2");
const display = (content, line = 1) => {
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
        // C button
        } else if (button.dataset.clear == "backspace") {
            text1.textContent = text1.textContent.trimEnd();
            text1.textContent = text1.textContent.slice(0, text1.textContent.length - 1);
        // Negate button
        } else if (button.dataset.action) {
            if (op == "") {
                if (num1 == "") {
                    num1 += "-";
                    display("-", 1);
                }
                else if (+num1 > 0) {
                    text1.textContent = "-" + text1.textContent;
                    num1 = "-" + num1;
                } else if (num1.includes("-")) {
                    text1.textContent = text1.textContent.slice(1,);
                    num1 = num1.slice(1,);
                }
            } else if (op == "sub") {
                op = "add";
                index = text1.textContent.indexOf("-");
                text1.textContent = text1.textContent.slice(0, index) + "+" + text1.textContent.slice(index + 1);
            } else if (num1 != "") {
                if (num2 == "") {
                    num2 += "-";
                    display("-", 1);
                }
                else if (!num2.includes("-")) {
                    opIndex = text1.textContent.lastIndexOf(" ");
                    text1.textContent = text1.textContent.slice(0, opIndex + 1) + "-" + text1.textContent.slice(opIndex + 1, );
                    num2 = "-" + num2;
                } else if (num2.includes("-")) {
                    lastIndex = text1.textContent.lastIndexOf("-");
                    text1.textContent = text1.textContent.slice(0, lastIndex) + text1.textContent.slice(lastIndex + 1);
                    num2 = num2.slice(1,);
                }
            }
        // num1 has not been fully written yet
        } else if (num1.length == 0  || (op.length == 0  && ((button.dataset.number || button.dataset.op == "point") && first))) {
            if (button.dataset.number) {
                if ((text1.textContent !== "0" && num1 !== "") || button.dataset.number != 0) {
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
        } else if (button.dataset.op && num2 === "" && button.dataset.op != "point" && button.dataset.op != "equal") {
            if (!first) {
                display(num1, 1);
            }

            if (op == "") {
                display(` ${button.textContent} `, 1);
            } else {
                num1Index = text1.textContent.indexOf(" ");
                text1.textContent = text1.textContent.slice(0, num1Index) + ` ${button.textContent} `;
            }

            op = button.dataset.op;
        // Finishing with the last number
        } else if (op != "" && (button.dataset.number || button.dataset.op == "point")) {
            if (button.dataset.number) {
                if ( num2 !== "" || button.dataset.number != 0) {
                    num2 += button.dataset.number;
                    display(button.dataset.number, 1);
                }    
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
    text1.textContent = "";
    text2.textContent = 0;
    num1 = "";
    num2 = "";
    op = ""
}




