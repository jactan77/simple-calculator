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
    display.textContent = eval(display.textContent); // Wymyśleć coś alternatywnego
});

// ^^^^^^^^^^^^
/* 
w
Gdy wykonuje operację, typu np. 7X9
to: 
[NEW] Explain Console errors by using Copilot in Edge: click 
         to explain an error.

         Chcemy, aby X był traktowany jako "*", że
*/

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        display.textContent += button.textContent;
    })
})

