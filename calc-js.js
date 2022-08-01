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

// Create display variable to collect user input
let userInput;

// Populate display with clicked digits
    // Collect number pad buttons
    const numberPad = document.querySelectorAll("#numberPad .numberRow button");
    // Detect mouse click per button
    numberPad.forEach((button) => {
        button.addEventListener("click", () => {
            // Run function
            // Collect button info
            // Extract digit associated with button
            // Place digit in display variable
            // Add display variable to calc display
        });
    });

