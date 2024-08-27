abstract class CalculatorElements {
   
    constructor( 
        protected currentNumber:string ,  
        protected previousNumber:string,  
        protected operations:string | null, 
        protected result:number | null
    ){

    }

}




class Display extends CalculatorElements {
    
    private display:HTMLDivElement

    constructor(
        currentNumber:string | null, 
        previousNumber:string | null, 
        operations:string | null,  
        result:number | null,
        display:HTMLDivElement 
    ) {
        super(currentNumber, previousNumber, operations, result);
        this.display = display;
        
        
    } 
     UpdateDisplay(buttonValue:string):void {
        if(this.result == null){
            this.currentNumber += buttonValue;
            this.display.textContent = this.currentNumber;
        } else {
            this.result = null;
            this.currentNumber = buttonValue;
            this.display.textContent = this.currentNumber;
        }
 }
    clearDisplay():void {
        this.currentNumber = "";
        this.previousNumber = "";
        this.operations = null;
        this.result = null;
        this.display.textContent = "0";
    }
    operation(buttonValue):void{
        if(this.currentNumber !== ""){
            if(this.previousNumber !== ""){
               this.calculation(); 
            }
            this.previousNumber = this.currentNumber;
            this.operations = buttonValue;
            this.currentNumber = ""
            this.display.textContent = ""
            
        }
    
    }
    calculation():void{
        const num1:number = parseFloat(this.currentNumber)
        const num2:number = parseFloat(this.previousNumber)
        switch(this.operations){
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
                if(num2!=0){
                    this.result = num1 / num2;
                } else {
                    throw new Error("Division by zero is not allowed");
                }
                break;
            default:
                throw new Error("Invalid operation");
        }
        this.currentNumber = this.result.toString()
        this.display.textContent = this.currentNumber 
        this.previousNumber = "";
        this.operations = ""
    }
    dotOperation():void{
        if(this.currentNumber.includes('.') && this.display.textContent.includes('.')){
            if(this.result !== null){
                this.result = null
                this.currentNumber = "0."
                this.display.textContent = "0.";
            } else {
                return
            }
        }else{
        if(this.currentNumber !== "" && this.display.textContent == this.currentNumber ){
            if(this.result !== null){
                this.result = null
                this.currentNumber = "0."
                display.textContent = "0.";
            } else {
            
            this.currentNumber += ".";
            display.textContent = this.currentNumber;}
        } else if(this.currentNumber == "" && display.textContent ==  "0" ){
            this.currentNumber = "0.";
            display.textContent = "0.";
        } 
    
    }
}
   
    
}
class Perfroming extends Display {
    static resetCalculator(calculator:Display){
        calculator.clearDisplay();
    }
    static performOperation(calculation:Display, buttonValue:HTMLButtonElement):void{
        calculation.operation(buttonValue.textContent)

    }
    
}
// UI inmplemetation

const numberButtons = document.querySelectorAll('[number-operation]') as NodeListOf<HTMLButtonElement>;
const display: HTMLDivElement = document.querySelector(".display") as HTMLDivElement
const operationButtons = document.querySelectorAll('[data-operation]') as NodeListOf<HTMLButtonElement>;
const clearButton: HTMLButtonElement = document.querySelector('[data-delete]');
const calculator: Display = new Display("", "", null, null,display)
const dotButton: HTMLButtonElement = document.querySelector('[dot-operation]');
const equalButton: HTMLButtonElement = document.querySelector('[data-equals]');

numberButtons.forEach((button: HTMLButtonElement) => {
    button.addEventListener('click', () => {
        calculator.UpdateDisplay(button.textContent);
    })
})

clearButton.addEventListener('click', () => {
    Perfroming.resetCalculator(calculator);
})

operationButtons.forEach((button: HTMLButtonElement) => {
    button.addEventListener('click', () => {
        Perfroming.performOperation(calculator, button);
        
    })
})

dotButton.addEventListener('click', () => {
    calculator.dotOperation();
})

equalButton.addEventListener('click', () => {
    calculator.calculation();
    
    
})