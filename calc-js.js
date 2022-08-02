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
// Collect all input buttons
const inputs = document.querySelectorAll("#numberPad .numberRow button, #operators button");
// Detect mouse click per button
inputs.forEach((button) => {
    button.addEventListener("click", () => {
        // Extract text associated with button
        let digit = button.textContent;
        // Place digit in userInput if number
        if (digit >= 0) {
            userInput += digit;
        }
        // Handle operator selections
        if ((digit == "+" || digit == "-" || digit == "*" 
            || digit == "/" || digit == "=")) {
             // Run operate() if operation is set up
             if (number1 && operation) {
                number2 = parseInt(userInput);
                solution = operate(number1, number2, operation);
                // Switch operator if another operation is being setup
                if (operation !== "=") {    
                    operation = digit;
                }
                // Setup for next inputted number
                userInput = "";
            }    
            // Run saveNumber() if number exists
            if (userInput && digit !== "=") {
                saveNumber(userInput, digit);
            } else {
                digit = "";
            }
        }

        // Collect "screen" div
        const display = document.querySelector("#screen");

         // Setup display configuration
         if (number1 && number2 && operation) { // Operation completely setup and evaluated
            // Blank out numbers for future operations
            number1 = ""; 
            number2 = "";

            if (operation === "=") { // Display answer only, no follow up operation
                operation = "";
                userInput = solution;
                display.textContent = solution;
            } else { // Display next operation using current answer
                number1 = solution;
                display.textContent = solution + operation;
            }
         } else if (solution && !operation) { // Selecting new number after completed operation
            display.textContent = solution = number1 = "";
            display.textContent = digit;
        }  else { // Setting up operation
            display.textContent += digit;
        }
    });
});

// Save first number and operator
function saveNumber (number, operator) {
    number1 = parseInt(number);
    operation = operator;
    userInput = "";
}