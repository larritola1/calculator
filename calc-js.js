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
const inputs = document.querySelectorAll("#numberPad .numberRow button, #operators button, #clearButton, #backButton");
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
        // Delete last entry on screen
        if (digit === "Backspace") {
             // Run only when display occupied
            if (display.textContent !== "") {
                const lastInput = display.textContent[display.textContent.length-1];
                let removeLastInput;
                 // Last entry was a digit
                 if (lastInput === userInput[userInput.length-1]) {
                    removeLastInput = userInput.slice(0, -1);
                    userInput = removeLastInput;
                    if (number1 !== "" && operation !== "") { // Removing digit from second number
                        display.textContent = `${number1}${operation}${userInput}`;
                    } else {
                        display.textContent = removeLastInput;
                    }
                }
            }
            digit = "";
        }
        // Allow decimal entry
        if (digit == ".") {
            if ((userInput !== "" && userInput.indexOf(".") == -1) // Case 1: No solution prior to first number assignment or any number 2 assignment
                || (Number.isInteger(solution) && userInput == "")) { // Case 2: Solution exists
                userInput += digit;
            } else {
                digit = "";
            }
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
                if (typeof solution === "number") {
                    solution = Math.round(solution*100) / 100
                }
                // Switch operator to currently selected
                operation = digit;
                // Setup for next inputted number
                userInput = "";
            }    
            // Run saveNumber() if first number exists
            if ((userInput && digit !== "=") || (Number.isFinite(solution) && digit !== "=" && Number.isNaN(parseInt(number1)))) {
                if (userInput && !Number.isFinite(solution)) {
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
        } else if (Number.isFinite(solution) && !Number.isNaN(parseFloat(userInput)) && userInput[0] !== ".") { // Selecting new number after completed operation
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