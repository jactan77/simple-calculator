var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class CalculatorElements {
    constructor(currentNumber, previousNumber, operations, result) {
        this.currentNumber = currentNumber;
        this.previousNumber = previousNumber;
        this.operations = operations;
        this.result = result;
    }
}
class Display extends CalculatorElements {
    constructor(currentNumber, previousNumber, operations, result, display, displayHistory) {
        super(currentNumber, previousNumber, operations, result);
        this.display = display;
        this.historyDisplay = displayHistory;
    }
    updateDisplay(buttonValue) {
        if (this.display.textContent.length <= 14) {
            if (this.result == null) {
                this.currentNumber[0] == '0' ? this.currentNumber = buttonValue : this.currentNumber += buttonValue;
                this.display.textContent = this.currentNumber;
            }
            else {
                this.result = null;
                this.currentNumber = buttonValue;
                this.display.textContent = this.currentNumber;
            }
        }
        else {
            return;
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
                if (num2 != 0 && num1 != 0) {
                    this.result = num2 / num1;
                }
                else {
                    throw new Error("Division by zero is not allowed");
                }
                break;
            default:
                throw new Error("Invalid operation");
        }
        this.addHistory();
        this.currentNumber = this.result.toString();
        this.currentNumber.length > 16 ? this.display.textContent = this.currentNumber.substring(0, 15) : this.display.textContent = this.currentNumber;
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
    addHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            let history = {
                operation: `${this.previousNumber} ${this.operations} ${this.currentNumber} = ${this.result.toString()}`,
                result: this.result.toString(),
                timestamp: new Date().toISOString()
            };
            try {
                const response = yield fetch('/history', { method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(history)
                });
                if (!response) {
                    console.error('Error fetching history');
                }
            }
            catch (error) {
                console.error(error);
            }
            const historyLi = document.createElement('li');
            historyLi.textContent = history.operation;
            historyLi.dataset.timestamp = history.timestamp;
            this.historyDisplay.appendChild(historyLi);
            historyLi.onclick = () => {
                this.loadHistoryResults(history.timestamp);
            };
        });
    }
    loadHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('history', { method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response) {
                    console.error('Error loading history');
                }
                const history = yield response.json();
                history.forEach(item => {
                    const historyLi = document.createElement('li');
                    historyLi.textContent = item.operation;
                    historyLi.dataset.timestamp = item.timestamp;
                    this.historyDisplay.appendChild(historyLi);
                    historyLi.onclick = () => {
                        this.loadHistoryResults(item.timestamp);
                    };
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    clearHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            while (this.historyDisplay.firstChild) {
                this.historyDisplay.removeChild(this.historyDisplay.firstChild);
            }
            try {
                const response = yield fetch('/history', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response) {
                    console.error("Failed to clear history");
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    loadHistoryResults(timestamp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('/history', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to load history Results");
                }
                const history = yield response.json();
                const selectItem = history.find(entry => entry.timestamp === timestamp);
                if (selectItem) {
                    this.currentNumber = selectItem.result;
                    this.display.textContent = this.currentNumber;
                    this.previousNumber = "";
                    this.operations = "";
                    this.result = null;
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
/* class HistoryDisplay extends CalculatorElements   {
    private history: string[] = []
    private historyDisplay: HTMLDivElement;
    constructor(
        currentNumber:string | null,
        previousNumber:string | null,
        operations:string | null,
        result:number | null,
        history: string[],
        historyDisplay: HTMLDivElement
    ){
        super(currentNumber, previousNumber, operations, result);
        this.history = history
        this.historyDisplay = historyDisplay

}
    addHistory():void{
        this.history.unshift(`${this.previousNumber}${this.operations}${this.currentNumber}`)
        this.historyDisplay.textContent = this.history.join("\n")
    }
    
} */
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
    static clearHistory(calculator) {
        calculator.clearHistory();
    }
    static loadHistory(calculator) {
        calculator.loadHistory();
    }
}
// UI inmplemetation
const numberButtons = document.querySelectorAll('[number-operation]');
const display = document.querySelector(".display");
const operationButtons = document.querySelectorAll('[data-operation]');
const clearButton = document.querySelector('[data-delete]');
const hitoryDisplay = document.querySelector('.history-container');
const historyList = document.querySelector('.history');
const calculator = new Display("", "", null, null, display, historyList);
const clearHistoryButton = document.querySelector('.clear-history');
const dotButton = document.querySelector('[dot-operation]');
const equalButton = document.querySelector('[data-equals]');
const percentButton = document.querySelector('[percent-operation]');
const signButton = document.querySelector('[sign-operation]');
const darkbutton = document.querySelector("#darkbutton");
const icon = document.querySelector("#toggle");
document.addEventListener('DOMContentLoaded', () => {
    Performing.loadHistory(calculator);
});
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
clearHistoryButton.addEventListener('click', () => {
    Performing.clearHistory(calculator);
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
