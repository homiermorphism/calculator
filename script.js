// variables
const clearEverything = document.getElementById('clear-everything');
const equalButton = document.getElementById('equal');
const delButton = document.getElementById('backspace');
const oldResultDisplay = document.querySelector('.old-result');
const operatorDisplay = document.querySelector('.operator');
const resultDisplay = document.querySelector('.result');

var oldResult = '';
var result = '';
var operator = '';
var operators = ['add', 'subtract', 'multiply', 'divide'];

// event listeners
clearEverything.addEventListener('click', clearEverythingFunction);
delButton.addEventListener('click', backspace);
equalButton.addEventListener('click', function() {
  operate();
  resultDisplay.innerHTML = result;
  oldResult = parseInt(result);
  oldResultDisplay.innerHTML = '';
  operatorDisplay.innerHTML = '';
  result = '';
});

  // operator buttons
for (i=0; i < operators.length; i++) {
  let operatorButton = document.getElementById(operators[i]);
  operatorButton.addEventListener('click', function(e) {
    // if the user hasn't entered anything, do nothing
    if (result === '' && oldResult === '') {}

    // else if this is the first operator button clicked in the sequence
    else if (result != '' && oldResult === '') {
      // display the operator and set the operator for the operate function
      operatorDisplay.innerHTML = e.target.innerHTML;
      operator = e.target.id;

      // move the last number the user inputted to the top of the screen
      oldResult = parseInt(result);
      oldResultDisplay.innerHTML = oldResult;

      // reset the current input for the user
      result = '';
      resultDisplay.innerHTML = '';
    }

    // else if this is not the first operator button clicked
    else if (oldResult != '') {
      // perform the operation that was clicked before this one
      operate();
      oldResultDisplay.innerHTML = result;

      // after operating the previous operation, store the new one clicked
      operator = e.target.id;
      operatorDisplay.innerHTML = e.target.innerHTML;

      // reset the current input for the querySelector
      result = '';
      resultDisplay.innerHTML = '';
    }
  });
}

  // number buttons
for (i = 0 ; i <= 9 ; i++) {
  let button = document.getElementById(i.toString());
  button.addEventListener('click', function(e) {
    result += e.target.value;
    resultDisplay.innerHTML = result;
  });
}

// functions
function clearEverythingFunction() {
  result = '';
  oldResult = '';
  operator = '';
  resultDisplay.innerHTML = '';
  operatorDisplay.innerHTML = '';
  oldResultDisplay.innerHTML = '';
}

function backspace() {
  result = result.slice(0,-1);
  resultDisplay.innerHTML = result;
}

function operate() {
  result = parseInt(result);
  if (operator != '') {
    let oldResult = result;
  }
  if (operator === 'add') {
    result += oldResult;
  }
  resultDisplay.innerHTML = result;
  oldResult = result;
}
