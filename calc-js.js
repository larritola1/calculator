// Add operations for calculator
function add(operand1, operand2) {
    return operand1 + operand2;
}

function subtract(operand1, operand2) {
    return operand1 - operand2;
}

function multiply(operand1, operand2) {
    return operand1 * operand2;
}

function divide(operand1, operand2) {
    return operand1 / operand2;
}

// Select operation to run
function operate(operand1, operand2, operator) {
    switch (operator) {
        case "+":
            return add(operand1, operand2);
        case "-":
            return subtract(operand1, operand2);
        case "*":
            return multiply(operand1, operand2);
        case "/":
            return divide(operand1, operand2);
    }
}

// Create variables to collect user input
let userInput = "";
let number1 = "";
let number2 = "";
let operation = "";
let solution = "";

// Populate display with clicked digits
// Collect number pad buttons
const numberPad = document.querySelectorAll("#numberPad .numberRow button");
// Detect mouse click per button
numberPad.forEach((button) => {
    button.addEventListener("click", () => {
        // Extract text associated with button
        const digit = button.textContent;
        // Place digit in display variable if number
        if (digit >= 0) {
            userInput += digit;
        }
        // Add display variable to calc display
        const display = document.querySelector("#screen");
        display.textContent = userInput;
    });
});

