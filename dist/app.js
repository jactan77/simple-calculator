class CalculatorElements {
    constructor(currentNumber, previousNumber, operations, result) {
        this.currentNumber = currentNumber;
        this.previousNumber = previousNumber;
        this.operations = operations;
        this.result = result;
    }
}
class Display extends CalculatorElements {
    constructor(currentNumber, previousNumber, operations, result, display) {
        super(currentNumber, previousNumber, operations, result);
        this.display = display;
    }
    updateDisplay(buttonValue) {
        if (this.result == null) {
            this.currentNumber += buttonValue;
            this.display.textContent = this.currentNumber;
        }
        else {
            this.result = null;
            this.currentNumber = buttonValue;
            this.display.textContent = this.currentNumber;
        }
    }
    clearDisplay() {
        this.currentNumber = "";
        this.previousNumber = "";
        this.operations = null;
        this.result = null;
        this.display.textContent = "0";
    }
    operation(buttonValue) {
        if (this.currentNumber !== "") {
            if (this.previousNumber !== "") {
                this.calculation();
            }
            this.previousNumber = this.currentNumber;
            this.operations = buttonValue;
            this.currentNumber = "";
            this.display.textContent = "";
        }
    }
    calculation() {
        const num1 = parseFloat(this.currentNumber);
        const num2 = parseFloat(this.previousNumber);
        switch (this.operations) {
            case "+":
                this.result = num1 + num2;
                break;
            case "-":
                this.result = num2 - num1;
                break;
            case "X":
                this.result = num1 * num2;
                break;
            case "/":
                if (num2 != 0) {
                    this.result = num1 / num2;
                }
                else {
                    throw new Error("Division by zero is not allowed");
                }
                break;
            default:
                throw new Error("Invalid operation");
        }
        this.currentNumber = this.result.toString();
        this.display.textContent = this.currentNumber;
        this.previousNumber = "";
        this.operations = "";
    }
    dotOperation() {
        if (this.currentNumber.includes('.') && this.display.textContent.includes('.')) {
            if (this.result !== null) {
                this.result = null;
                this.currentNumber = "0.";
                this.display.textContent = "0.";
            }
            else {
                return;
            }
        }
        else {
            if (this.currentNumber !== "" && this.display.textContent == this.currentNumber) {
                if (this.result !== null) {
                    this.result = null;
                    this.currentNumber = "0.";
                    display.textContent = "0.";
                }
                else {
                    this.currentNumber += ".";
                    this.display.textContent = this.currentNumber;
                }
            }
            else if (this.currentNumber == "" && this.display.textContent == "0") {
                this.currentNumber = "0.";
                this.display.textContent = "0.";
            }
        }
    }
    percent() {
        if (this.currentNumber !== "" && this.currentNumber == this.display.textContent) {
            this.result = parseFloat(this.currentNumber) * 0.01;
            this.currentNumber = this.result.toString();
            this.result = null;
            this.display.textContent = this.currentNumber;
        }
    }
    signOperation() {
        if (this.currentNumber !== "" && this.currentNumber == display.textContent) {
            this.result = parseFloat(this.currentNumber) * -1;
            this.currentNumber = this.result.toString();
            this.result = null;
            display.textContent = this.currentNumber;
        }
    }
}
class Performing extends Display {
    static resetCalculator(calculator) {
        calculator.clearDisplay();
    }
    static performOperation(calculation, buttonValue) {
        calculation.operation(buttonValue.textContent);
    }
    static percentOperation(calculator) {
        calculator.percent();
    }
    static signPerform(calculator) {
        calculator.signOperation();
    }
}
// UI inmplemetation
const numberButtons = document.querySelectorAll('[number-operation]');
const display = document.querySelector(".display");
const operationButtons = document.querySelectorAll('[data-operation]');
const clearButton = document.querySelector('[data-delete]');
const calculator = new Display("", "", null, null, display);
const dotButton = document.querySelector('[dot-operation]');
const equalButton = document.querySelector('[data-equals]');
const percentButton = document.querySelector('[percent-operation]');
const signButton = document.querySelector('[sign-operation]');
const darkbutton = document.querySelector("#darkbutton");
const icon = document.querySelector("#toggle");
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        clearButton.textContent = 'C';
        calculator.updateDisplay(button.textContent);
    });
});
clearButton.addEventListener('click', () => {
    Performing.resetCalculator(calculator);
    clearButton.textContent = 'AC';
});
operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        Performing.performOperation(calculator, button);
    });
});
signButton.addEventListener('click', () => {
    Performing.signPerform(calculator);
});
percentButton.addEventListener('click', () => {
    Performing.percentOperation(calculator);
});
dotButton.addEventListener('click', () => {
    calculator.dotOperation();
});
equalButton.addEventListener('click', () => {
    calculator.calculation();
});
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
