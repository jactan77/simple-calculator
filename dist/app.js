class CalculatorElements {
    constructor(currentNumber, previousNumber, operations, result) {
        this.currentNumber = currentNumber;
        this.previousNumber = previousNumber;
        this.operations = operations;
        this.result = result;
    }
}
class Display extends CalculatorElements {
    constructor(currentNumber, previousNumber, operations, result, button, display) {
        super(currentNumber, previousNumber, operations, result);
        this.button = button;
        this.display = display;
    }
    UpdateDisplay() {
        if (this.result == null) {
            this.currentNumber = this.button.textContent;
            this.display.textContent = this.currentNumber;
        }
        else {
            this.result = null;
            this.currentNumber = this.button.textContent;
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
    operation() {
        if (this.currentNumber !== "") {
            if (this.previousNumber !== "") {
                this.calculation();
            }
            else {
                this.previousNumber = this.currentNumber;
                this.operations = this.button.textContent;
                this.currentNumber = "";
                this.display.textContent = "";
            }
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
        return this.result;
    }
}
// UI inmplemetation
const button = document.getElementById("button");
const display = document.getElementById("display");
const calculator = new Display("", "", null, null, button, display);
button.addEventListener("click", () => {
    calculator.operation();
    calculator.UpdateDisplay();
});
