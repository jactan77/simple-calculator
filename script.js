const numberButtons =  document.querySelectorAll('[number-operation]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]'); 
const clearButton = document.querySelector('[data-delete]');
const display = document.querySelector(".display");
const darkbutton = document.querySelector("#darkbutton");
const icon  = document.querySelector("#toggle");

let memory = null; 
let memoryUsage = null;
let result = null;
display.textContent = "0"


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        clearButton.textContent = 'C';
    if  (display.textContent == "0" || result == memory) {
        
        display.textContent = button.textContent
        memory = button.textContent
    
    }   
    else if (memory == "Syntax error") {
        display.textContent += ""
    }
    
    
    else {

        display.textContent += button.textContent
        memory += button.textContent
    }
    
        
        
        
        
    });
        
}); 
    
    
    

clearButton.addEventListener('click', () => {
    clearButton.textContent = "AC"
    display.textContent = '0';
    memory = memoryUsage = result = null;
    
})


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        
    if(memory !== "Syntax error" ) { 
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
                    
                    if (memory !== result && display.textContent !== '') {
                        
                        if (!display.textContent.includes('.')) {
                            display.textContent += '.';
                            memory += '.';
                        }
                    } else if (memory !== result && display.textContent === '') {
                        display.textContent = "0.";
                        memory += '0.';
                    } else if (memory === result && display.textContent === '0') {
                        display.textContent = "0.";
                        memory = '0.';
                    } else {
                        display.textContent = "0";
                        result = null;
                        memory = "0";
                    }
                    break;
            case '+/-':
                memoryUsage = eval(memory) * -1;
                display.textContent = display.textContent * -1; 
                memory = memoryUsage;
                break;
            
            case '+':
                memoryUsage = eval(memory)
                memory = null
                display.textContent = '';
                memory =  memoryUsage + '+' 
                break;
            case '-':
                memoryUsage = eval(memory)
                memory = null
                display.textContent = '';
                memory =  memoryUsage + '-' 
                break;
            case '/':    
                memoryUsage = eval(memory)
                memory = null
                display.textContent = '';
                memory =  memoryUsage + '/' 
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
        result = memory;
        display.classList.add('adding-text'); 
        setTimeout(() => {
            display.classList.remove('adding-text');
        }, 300); 
    } catch (err) {
        display.textContent = "Syntax error";
        memory = "Syntax error";
    }
});

darkbutton.addEventListener('click', () => {
    document.body.classList.toggle("d1")
    document.querySelector('.container').classList.toggle("d2");
    document.querySelector('.display').classList.toggle("d3");
    document.querySelector('.key').classList.toggle("d5");
    document.querySelectorAll('button').forEach(button => {
        button.classList.toggle("d4");
    })
    
    
    icon.classList.toggle('bxs-sun');
    
})
