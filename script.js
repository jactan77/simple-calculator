const numberButtons =  document.querySelectorAll('[number-operation]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]'); 
const clearButton = document.querySelector('[data-delete]');
const display = document.querySelector("#display");
let memory = null; 
let memoryUsage = null;

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        clearButton.textContent = 'C';
        display.textContent += button.textContent;
        memory += parseInt(button.textContent)
    });
        
}); 
    
    
    

clearButton.addEventListener('click', () => {
    clearButton.textContent = "AC"
    display.textContent = '';
    memory = memoryUsage = null;
    
})


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        
       
        switch(button.textContent) {
            case 'X':
                memoryUsage = eval(memory)
                memory = null
                display.textContent = '';
                memory =  memoryUsage + '*' 
                break;
            case '%':
                memoryUsage = eval(memory) * 0.01
                display.textContent = display.textContent / 100
                memory = memoryUsage
                break; 
            case ',':
                display.textContent += '.';
                memory += '.';
                break
            case '+/-':
                memoryUsage = eval(memory) * -1;
                display.textContent = display.textContent * -1; 
                memory = memoryUsage;
                break;
            
            case '+':
                display.textContent = " ";
                memory += "+"
                break;
            case '-':
                display.textContent = " ";
                memory += "-"
                break;
            case '/':    
                display.textContent = " ";
                memory += "/"
                break;        
               }    
                
            

        
    })
})     
            

                
            
            
        

equalButton.addEventListener('click', () => {
    let result = eval(memory);
    result % 1 !== 0 && result.toString().split('.')[1].length > 9 ? display.textContent = result.toFixed(7) : display.textContent = result;
    memory = result;
    
})

