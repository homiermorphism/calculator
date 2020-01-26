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
var lastKeyPressed = '';
var operators = ['add', 'subtract', 'multiply', 'divide'];

// event listeners
clearEverything.addEventListener('click', clearEverythingFunction);
delButton.addEventListener('click', backspace);
equalButton.addEventListener('click', function() {
  operate();
  resultDisplay.innerHTML = result;
  oldResultDisplay.innerHTML = '';
  operatorDisplay.innerHTML = '';
  result = '';
  lastKeyPressed = 'equal';
  console.log(lastKeyPressed, result, oldResult);
});

  // operator buttons
for (i=0; i < operators.length; i++) {
  let operatorButton = document.getElementById(operators[i]);
  operatorButton.addEventListener('click', function(e) {
    // if the user hasn't entered anything, do nothing
    if (lastKeyPressed === '') {}

    // if last key pressed was a number, act normally
    if (lastKeyPressed === 'number') {
      // if this is the first operator button clicked in the sequence
      if (result != '' && oldResult === '') {
        // display the operator and set the operator for the operate function
        operator = e.target.id;

        // move the last number the user inputted to the top of the screen
        oldResult = result;
        oldResultDisplay.innerHTML = oldResult;
      }

      // else if this is not the first operator button clicked
      else if (oldResult != '') {
        // perform the operation that was clicked before this one
        operate();
        oldResultDisplay.innerHTML = result;

        // after operating the previous operation, store the new one clicked
        operator = e.target.id;

      }
      // reset the current input for the querySelector
      result = '';
      resultDisplay.innerHTML = '';
    }

    // if last key pressed was the equal sign
    if (lastKeyPressed === 'equal') {
      oldResultDisplay.innerHTML = oldResult;
      resultDisplay.innerHTML = '';
    }

    // allow user to replace the operator if they chose the wrong one
    if (lastKeyPressed === 'operator') {
      operator = e.target.id;
    }

    lastKeyPressed = 'operator';
    operatorDisplay.innerHTML = e.target.innerHTML;
  });
}

  // number buttons
for (i = 0 ; i <= 9 ; i++) {
  let button = document.getElementById(i.toString());
  button.addEventListener('click', function(e) {
    if (lastKeyPressed === '' || lastKeyPressed === 'number' || lastKeyPressed === 'operator') {
      result += e.target.value;
      console.log(lastKeyPressed, result, oldResult);
    }

    if (lastKeyPressed === 'equal') {
      clearEverythingFunction();
      result += e.target.value;
      console.log(lastKeyPressed, result, oldResult);
    }
    lastKeyPressed = 'number';
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
  oldResult = parseInt(oldResult);
  if (operator === 'add') {
    result += oldResult;
  }

  if (operator === 'subtract') {
    result = oldResult - result;
  }

  if (operator === 'multiply') {
    result *= oldResult;
  }

  if (operator === 'divide') {
    result = oldResult / result;
  }

  resultDisplay.innerHTML = result;
  oldResult = result;
}
