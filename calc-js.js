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



let userInput = "";
let number1 = "";
let number2 = "";
let operation = "";
let solution = "";
const inputs = document.querySelectorAll(`#numberPad .numberRow button, 
                                          #operators button, #clearButton,
                                          #backButton`);

inputs.forEach((button) => {
    button.addEventListener("click", () => runCalc(button));
});

window.addEventListener("keydown", (key) => {
    inputs.forEach((button) => {
        const calcButton = button.textContent;
        let inputKey = key.key;

        if (inputKey === "Enter") {
            inputKey = "=";

            // Prevent repeated entries of button selected after click
            key.preventDefault();
        }

        if (calcButton === inputKey) runCalc(button);
    });
});



function runCalc(input) {
    let digit = input.textContent;
    const display = document.querySelector("#screen");

    if (digit === "Clear") {
        display.textContent = digit = userInput = number1 = number2 
        = operation = solution = "";
    }

    if (digit === "Backspace") {
        if (display.textContent !== "") {
            const lastInput = 
                display.textContent.slice(-1);
            let removedLastInput;

            // Last entry was a digit
            if (lastInput === userInput.slice(-1)) {
                removedLastInput = userInput.slice(0, -1);
                userInput = removedLastInput;
                // Removing digit from second number
                if (number1 !== "" && operation !== "") {
                    display.textContent = 
                        `${number1}${operation}${userInput}`;
                } else display.textContent = removedLastInput;
            }
            
            if (lastInput === operation) {
                userInput = String(number1);
                operation = number1 = "";
                display.textContent = userInput;
            }

            // Remove last digit when only solution displayed
            if (solution !== "" && solution == display.textContent) {
                removedLastInput = String(solution).slice(0, -1);
                solution = "";
                display.textContent = userInput = removedLastInput;
            }
        }

        digit = "";
    }

    if (digit == ".") {
        // Case 1: Default for number inputs
        if ((userInput !== "" && userInput.indexOf(".") == -1)
            // Case 2: Only solution displayed
            || (Number.isInteger(solution) && userInput === "")) {
            userInput += digit;
        } else digit = "";
    }

    // Strict sole "0" initial digit for values greater than or equal to 1
    if (digit == "0") {
        if (userInput !== "0" || userInput === "") {
            userInput += digit;
        } else digit = "";
    }

    if (digit > 0 || digit < 0) {
        if (userInput === "0" || userInput === ".") {
            digit = "";
        }
        else userInput += digit;
    }

    if ((digit == "+" || digit == "-" || digit == "*" 
        || digit == "/" || digit == "=")) {
         // Evaluate if operation is set up
         if ((number1 !== "") && operation 
             && (userInput !== "")) {
            number2 = parseFloat(userInput);

            solution = operate(number1, number2, operation);
            
            // Round answer to two decimal places
            if (typeof solution === "number") {
                solution = Math.round(solution * 100) / 100
            }

            // Switch operator to currently selected one
            operation = digit;

            // Set up for next inputted number
            userInput = "";
        }  

        // Save first number and operator
        if ((userInput && digit !== "=") || 
            (Number.isFinite(solution) && digit !== "=" 
             && number1 === "")) {

            if (userInput && solution === "") {
                saveNumber(userInput, digit);
            } else saveNumber(solution + userInput, digit);

        } else digit = "";
    }

    // Display configuration
    if (number1 !== "" && number2 !== "" && operation) {
        number1 = ""; 
        number2 = "";

        if (operation === "=" || typeof solution !== "number") { // No follow up operation or divide-by-zero error
            operation = "";
            display.textContent = solution;
        } else {
            saveNumber(solution, operation)
            display.textContent = number1 + operation;
        }

    // Starting fresh after completed operation
    } else if (solution !== "" && userInput !== ""
               && userInput[0] !== ".") {
        display.textContent = solution = "";
        display.textContent += digit;

    // Setting up current operation
    } else display.textContent += digit;
}



function saveNumber(number, operator) {
    number1 = parseFloat(number);
    operation = operator;
    userInput = "";

    // When current answer becomes first operand
    if (solution !== "") solution = "";
}

