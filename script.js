const numberButtons =  document.querySelectorAll('[number-operation]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]'); 
const clearButton = document.querySelector('[data-delete]');
const display = document.querySelector("#display");
let memory = null; 
let memoryUsage = null;
let result = null;
display.textContent = "0"


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        clearButton.textContent = 'C';
    if  (display.textContent == "0" || result == memory) {
        
        display.textContent = button.textContent
        memory = parseInt(button.textContent)
    
    }   
    else if (memory == "Syntax error") {
        display.textContent += ""
    }
    
    
    else {

        display.textContent += button.textContent
        memory += parseInt(button.textContent)
    }
    
        
        
        
        
    });
        
}); 
    
    
    

clearButton.addEventListener('click', () => {
    clearButton.textContent = "AC"
    display.textContent = '0';
    memory = memoryUsage = null;
    
})


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        
    if(memory !== "Syntax error") { 
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
             if (memory !== result && display.textContent !== '' ) {
                 display.textContent += '.';
                 memory += '.';
                
            }  else if (memory !== result && display.textContent == '' ) {
                display.textContent = "0."
                memory += '0.'
            }
                
            else {
                    display.textContent = "0"
                    result = null;
                    memory = "0"
                    }
                break; 
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
            } else{
                display.textContent += ""
            } 
              
            

        
    })
})     
            

                
            
            
        

equalButton.addEventListener('click', () => {
   try {
    result = eval(memory);
    result % 1 !== 0 && result.toString().split('.')[1].length > 9 ? display.textContent = result.toFixed(7) : display.textContent = result;
    result = memory
   }
   catch (err) {
    display.textContent = "Syntax error"
    memory = "Syntax error"
   }
    
})

