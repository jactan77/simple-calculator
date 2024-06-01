const numberButtons =  document.querySelectorAll('[number-operation]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]'); 
const clearButton = document.querySelector('[data-delete]');
const display = document.querySelector("#display");


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        display.textContent += button.textContent;
    });
}); 

clearButton.addEventListener('click', () => {
    display.textContent = '';


})

equalButton.addEventListener('click', () => {
    let result = eval(display.textContent);
    result % 1 !== 0 && result.toString().split('.')[1].length > 9 ? display.textContent = result.toFixed(9) : display.textContent = result;

});



operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        
       
        switch(button.textContent) {
            case 'X':
                display.textContent += '*';
            
                break;
            case '%':
             
            parseInt(display.textContent = display.textContent / 100);  
                break;
            
            case ',':
                display.textContent += '.';
                break;
            case '+/-':
                display.textContent = display.textContent * -1;
                break;
            
            default:
                display.textContent += button.textContent;
                break;
            
                
        }
            

        
    })
})


