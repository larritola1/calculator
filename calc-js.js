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
    if (operand2 == 0) {
        return "CAN'T DIVIDE BY 0";
    } else {
        return operand1 / operand2;
    }
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
const inputs = document.querySelectorAll("#numberPad .numberRow button, #operators button, #clearButton");
// Detect mouse click per button
inputs.forEach((button) => {
    button.addEventListener("click", () => {
        // Extract text associated with button
        let digit = button.textContent;
        // Collect "screen" div
        const display = document.querySelector("#screen");
        // Clear screen and all variables if "clear" is clicked
        if (digit === "Clear") {
            display.textContent = digit = userInput = number1 = number2 
            = operation = solution = "";
        }
        // Place digit in userInput if number
        if (digit >= 0 || digit < 0) {
            userInput += digit;
        }
        // Handle operator selections
        if ((digit == "+" || digit == "-" || digit == "*" 
            || digit == "/" || digit == "=")) {
             // Run operate() if operation is set up
             if (!Number.isNaN(number1) && operation && (!Number.isNaN(userInput) && userInput !== "")) {
                number2 = parseFloat(userInput);
                solution = operate(number1, number2, operation);
                // Round answer to two decimal places
                solution = Math.round(solution*100) / 100
                // Switch operator to currently selected
                operation = digit;
                // Setup for next inputted number
                userInput = "";
            }    
            // Run saveNumber() if first number exists
            if ((userInput && digit !== "=") || (Number.isFinite(solution) && digit !== "=" && Number.isNaN(parseInt(number1)))) {
                if (userInput) {
                    saveNumber(userInput, digit);
                } else {
                    saveNumber(solution + userInput, digit);
                }
            } else {
                digit = "";
            }
        }
         // Setup display configuration
         if (Number.isFinite(number1) && Number.isFinite(number2) && operation) { // Operation completely setup and evaluated
            // Blank out numbers for future operations
            number1 = ""; 
            number2 = "";

            if (operation === "=") { // Display answer only, no follow up operation
                operation = "";
                display.textContent = solution;
            } else { // Display next operation using current answer
                saveNumber(solution, operation)
                display.textContent = number1 + operation;
            }
        } else if (Number.isFinite(solution) && !(Number.isNaN(parseFloat(userInput)))) { // Selecting new number after completed operation
            display.textContent = solution = "";
            display.textContent += digit;
        }  else { // Setting up operation
            display.textContent += digit;
        }
    });
});

// Save first number and operator
function saveNumber (number, operator) {
    number1 = parseFloat(number);
    operation = operator;
    userInput = "";

    // Reset "solution"
    if (Number.isFinite(solution)) {
        solution = "";
    }
}