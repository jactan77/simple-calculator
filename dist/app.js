const numberButtons = Array.from(document.querySelectorAll('[number-operation]'));
const operationButtons = Array.from(document.querySelectorAll('[data-operation]'));
const equalButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-delete]');
const percentButton = document.querySelector('[percent-operation]');
const signButton = document.querySelector('[sign-operation]');
const dotButton = document.querySelector('[dot-operation]');
const display = document.querySelector(".display");
const darkbutton = document.querySelector("#darkbutton");
const icon = document.querySelector("#toggle");
let currentNumber = "";
let previousNumber = "";
let operations = null;
let result = null;
let err = null;
display.textContent = "0";
numberButtons.forEach(button => {
    button.onclick = () => {
        clearButton.textContent = "C";
        if (result == null) {
            currentNumber += button.textContent;
            display.textContent = currentNumber;
        }
        else {
            result = null;
            currentNumber = button.textContent;
            display.textContent = currentNumber;
        }
        ;
    };
});
operationButtons.forEach(button => {
    button.onclick = () => {
        if (currentNumber !== "") {
            if (previousNumber !== "") {
                calculate();
            }
            previousNumber = currentNumber;
            operations = button.textContent;
            currentNumber = "";
            display.textContent = "";
        }
    };
});
function calculate() {
    let num1 = parseFloat(previousNumber);
    let num2 = parseFloat(currentNumber);
    switch (operations) {
        case "+":
            result = num1 + num2;
            break;
        case "X":
            result = num1 * num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "/":
            if (num2 == 0) {
                err = "Error: Division by zero";
                display.textContent = err;
                return err;
            }
            else {
                result = num1 / num2;
            }
            break;
        default:
    }
    currentNumber = result.toString();
}
percentButton.onclick = () => {
    if (currentNumber !== "" && currentNumber == display.textContent) {
        let num1 = parseFloat(currentNumber);
        result = num1 * 0.01;
        currentNumber = result.toString();
        result = null;
        display.textContent = currentNumber;
    }
};
signButton.onclick = () => {
    if (currentNumber !== "" && currentNumber == display.textContent) {
        let num1 = parseFloat(currentNumber);
        result = num1 * -1;
        currentNumber = result.toString();
        result = null;
        display.textContent = currentNumber;
    }
};
dotButton.onclick = () => {
    if (currentNumber.includes('.') && display.textContent.includes('.')) {
        if (result !== null) {
            result = null;
            currentNumber = "0.";
            display.textContent = "0.";
        }
        else {
            return;
        }
    }
    else {
        if (currentNumber !== "" && display.textContent == currentNumber) {
            if (result !== null) {
                result = null;
                currentNumber = "0.";
                display.textContent = "0.";
            }
            else {
                currentNumber += ".";
                display.textContent = currentNumber;
            }
        }
        else if (currentNumber == "" && display.textContent == "0") {
            currentNumber = "0.";
            display.textContent = "0.";
        }
    }
};
equalButton.onclick = () => {
    calculate();
    if (currentNumber.includes('.') && currentNumber.toString().split('.')[1].length > 15) {
        display.textContent = parseFloat(currentNumber).toFixed(14);
    }
    else {
        currentNumber.length > 15 ? display.textContent = parseFloat(currentNumber).toFixed(10) : display.textContent = currentNumber;
    }
    previousNumber = "";
    operations = "";
};
clearButton.onclick = () => {
    currentNumber = "";
    previousNumber = "";
    operations = null;
    result = null;
    display.textContent = "0";
    err = null;
    clearButton.textContent = "AC";
};
darkbutton.onclick = () => {
    document.body.classList.toggle("d1");
    document.querySelector('.container').classList.toggle("d2");
    document.querySelector('.display').classList.toggle("d3");
    document.querySelector('.key').classList.toggle("d5");
    document.querySelectorAll('button').forEach(button => {
        button.classList.toggle("d4");
    });
    icon.classList.toggle('bxs-sun');
};
