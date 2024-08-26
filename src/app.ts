abstract class CalculatorElements {
   
    constructor( 
        protected currentNumber:string,  
        protected previousNumber:string,  
        protected operations:string, 
        protected result:number){

    }

}




class Display extends CalculatorElements {
    private button:HTMLButtonElement
    private display:HTMLDivElement

    constructor(currentNumber:string, previousNumber:string, operations:string, result:number, button:HTMLButtonElement, display:HTMLDivElement) {
        super(currentNumber, previousNumber, operations, result);
        this.button = button;
        this.display = display;
    } 
     UpdateDisplay():void {
        if(this.result == null){
            this.currentNumber = this.button.textContent;
            this.display.textContent = this.currentNumber;
        } else {
            this.result = null;
            this.currentNumber = this.button.textContent;
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
    operation():void{
        if(this.currentNumber !== ""){
            if(this.previousNumber !== ""){
               this.calculation(); 
            }else{
            this.previousNumber = this.currentNumber;
            this.operations = this.button.textContent;
            this.currentNumber = ""
            this.display.textContent = ""
            
        }
    }
    }
    calculation():number{
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
        return this.result;
    }

    
}

// UI inmplemetation

const button: HTMLButtonElement = document.getElementById("button") as HTMLButtonElement
const display: HTMLDivElement = document.getElementById("display") as HTMLDivElement

const calculator: Display = new Display("", "", null, null, button, display)

button.addEventListener("click", () => {
    calculator.operation();
    calculator.UpdateDisplay();
})


