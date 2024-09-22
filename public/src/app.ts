abstract class CalculatorElements {
   
    constructor( 
        protected currentNumber:string ,  
        protected previousNumber:string,  
        protected operations:string | null, 
        protected result:number | null
    ){

    }

}
interface HistoryItem {
    operation: string;
    result: string;
    timestamp: string;
}
class Display extends CalculatorElements {
    
    private display:HTMLDivElement
    private historyDisplay: HTMLUListElement;
    private socket:WebSocket
    constructor(
        currentNumber:string | null, 
        previousNumber:string | null, 
        operations:string | null,  
        result:number | null,
        display:HTMLDivElement,
        displayHistory:HTMLUListElement,
        
    ) {
        super(currentNumber, previousNumber, operations, result);
        this.display = display;
        this.historyDisplay = displayHistory;
        this.socket = new WebSocket(`ws://${window.location.host}`)
        this.initializeWebSocket()
} 
     
private initializeWebSocket(){
    this.socket.onopen = () => {
        console.log('WebSocket connected');
    };

    this.socket.onmessage = (event)=> {
        const message = JSON.parse(event.data);
        if(message.type === 'new-history'){
            this.addHisotryUI(message.data);
        } else if(message.type === 'clear-history'){
            this.clearHistoryUI();
        }
    }
    
    this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
    
    this.socket.onclose = () => {
        console.log('WebSocket disconnected');
    };

}

private sendMessage(type: string, data: any = {}):void{
    if(this.socket.readyState === WebSocket.OPEN){
        this.socket.send(JSON.stringify({ type, data }));
    }else{
        console.error('WebSocket is not connected');
    }
}

private addHisotryUI(history: HistoryItem): void {
    const historyLi = document.createElement('li');
        historyLi.textContent = history.operation;
        historyLi.dataset.timestamp = history.timestamp;
        this.historyDisplay.appendChild(historyLi);
        historyLi.onclick = () => {
            this.loadHistoryResults(history.timestamp);
        }
}    

private clearHistoryUI(): void {
    while (this.historyDisplay.firstChild) {
        this.historyDisplay.removeChild(this.historyDisplay.firstChild);
    } 
}

updateDisplay(buttonValue:string):void {
        if(this.display.textContent.length <= 14){     
            if (this.result == null) {
                this.currentNumber[0] == '0' ? this.currentNumber = buttonValue : this.currentNumber += buttonValue;
                this.display.textContent = this.currentNumber;
            }
            else {
                this.result = null;
                this.currentNumber = buttonValue;
                this.display.textContent = this.currentNumber;
            }
        } else {
                return;
            }
        }
    clearDisplay():void {
        this.currentNumber = "";
        this.previousNumber = "";
        this.operations = null;
        this.result = null;
        this.display.textContent = "0";
    }
    operation(buttonValue:string):void{
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
                if(num2!=0 && num1!=0){
                    this.result = num2 / num1;
                } else {
                    throw new Error("Division by zero is not allowed");
                }
                break;
            default:
                throw new Error("Invalid operation");
        }
        
        this.addHistory() 
        this.currentNumber = this.result.toString() 
        this.currentNumber.length > 16 ? this.display.textContent = this.currentNumber.substring(0,15): this.display.textContent = this.currentNumber
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
            this.display.textContent = this.currentNumber;}
        } else if(this.currentNumber == "" && this.display.textContent ==  "0" ){
            this.currentNumber = "0.";
            this.display.textContent = "0.";
        } 
    
    }
        
    
}

    percent():void{
        if(this.currentNumber !== "" && this.currentNumber == this.display.textContent){
            this.result = parseFloat(this.currentNumber) * 0.01
            this.currentNumber = this.result.toString();
            this.result = null
            this.display.textContent = this.currentNumber;
           }
        }
    signOperation():void{
        if(this.currentNumber !== "" && this.currentNumber==display.textContent){
            
            this.result = parseFloat(this.currentNumber) * -1
            this.currentNumber = this.result.toString();
            this.result = null
            display.textContent = this.currentNumber;
        }
    }
    async addHistory(): Promise<void> {
        let history:HistoryItem = {
            operation: `${this.previousNumber} ${this.operations} ${this.currentNumber} = ${this.result.toString()}`,
            result: this.result.toString(),
            timestamp: new Date().toISOString()
        }
        this.addHisotryUI(history); 
       try {
           
            await this.fetchRequest('/history', 'POST', history)
            this.sendMessage('new-history', history);
        } catch (error){
            console.error('Error adding history:', error);
        }
    }

    private async fetchRequest(url:string, method:string, body?:any): Promise<Response> {
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body ? JSON.stringify(body) : null
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
        } catch (error) {
            console.error(`Error with ${method} request to ${url}:`, error);
            throw error;
        }
    

    }

     
    
    async loadHistory(): Promise<void> {
        try {
            const response = await this.fetchRequest('/history', 'GET')
            const history: HistoryItem[] = await response.json();
            this.historyDisplay.innerHTML = ''
            history.forEach(item =>this.addHisotryUI(item));
        } catch(error){
            console.error('Error loading history:', error);
        }
    }


    async clearHistory(): Promise <void> {
        this.clearHistoryUI();
        const response = await this.fetchRequest('/history', 'DELETE')
      
                  
        }
        async loadHistoryResults(timestamp: string): Promise<void> {
            try {
                const response = await this.fetchRequest('/history', 'GET');
                const history: HistoryItem[] = await response.json();
                const selectedItem = history.find(entry => entry.timestamp === timestamp);
    
                if (selectedItem) {
                    this.currentNumber = selectedItem.result;
                    this.display.textContent = this.currentNumber;
                    this.previousNumber = "";
                    this.operations = "";
                    this.result = null;
                }
            } catch (error) {
                console.error('Failed to load history result:', error);
            }
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
    static resetCalculator(calculator:Display){
        calculator.clearDisplay();
    }
    static performOperation(calculation:Display, buttonValue:HTMLButtonElement):void{
        calculation.operation(buttonValue.textContent)

    }

    static percentOperation(calculator:Display):void{
        calculator.percent()
    }

    static signPerform(calculator:Display):void{
        calculator.signOperation();
    }
    static clearHistory(calculator:Display):void{
        calculator.clearHistory()
    }
    static loadHistory(calculator:Display):void{
        calculator.loadHistory()
    }
    
} 

// UI inmplemetation

const numberButtons = document.querySelectorAll('[number-operation]') as NodeListOf<HTMLButtonElement>;
const display: HTMLDivElement = document.querySelector(".display") as HTMLDivElement
const operationButtons = document.querySelectorAll('[data-operation]') as NodeListOf<HTMLButtonElement>;
const clearButton: HTMLButtonElement = document.querySelector('[data-delete]');
const hitoryDisplay: HTMLDivElement = document.querySelector('.history-container')
const historyList: HTMLUListElement = document.querySelector('.history')
const calculator: Display = new Display("", "", null, null,display,historyList)
const clearHistoryButton = document.querySelector('.clear-history')
const dotButton: HTMLButtonElement = document.querySelector('[dot-operation]');
const equalButton: HTMLButtonElement = document.querySelector('[data-equals]');
const percentButton: HTMLButtonElement = document.querySelector('[percent-operation]')
const signButton: HTMLButtonElement = document.querySelector('[sign-operation]');
const darkbutton: HTMLButtonElement = document.querySelector("#darkbutton");
const icon: HTMLElement = document.querySelector("#toggle");

document.addEventListener('DOMContentLoaded', () =>{
    Performing.loadHistory(calculator);
})

numberButtons.forEach((button: HTMLButtonElement) => {
    button.addEventListener('click', () => {
        clearButton.textContent = 'C'
        calculator.updateDisplay(button.textContent);
    })
})

clearButton.addEventListener('click', () => {
    Performing.resetCalculator(calculator);
    clearButton.textContent = 'AC'
})
clearHistoryButton.addEventListener('click', () => {
    Performing.clearHistory(calculator);
})

operationButtons.forEach((button: HTMLButtonElement) => {
    button.addEventListener('click', () => {
        Performing.performOperation(calculator, button);
        
    })
})
signButton.addEventListener('click', () => {
    Performing.signPerform(calculator);
});

percentButton.addEventListener('click', () => {
    Performing.percentOperation(calculator);
})

dotButton.addEventListener('click', () => {
    calculator.dotOperation();
})

equalButton.addEventListener('click', () => {
    
    calculator.calculation();
})

darkbutton.onclick = () => {
    document.body.classList.toggle("d1")
  
    document.querySelector('.container').classList.toggle("d2");
    document.querySelector('.display').classList.toggle("d3");
    document.querySelector('.key').classList.toggle("d5");
    document.querySelectorAll('button').forEach(button => {
        button.classList.toggle("d4");
    })
    
    
    icon.classList.toggle('bxs-sun');
}

