// bugs found: strings of operations not working correctly (I think the operators aren't being stored correctly)



// variables
const clearEverything = document.getElementById('clear-everything');
const clearResultButton = document.getElementById('clear-once');
const delButton = document.getElementById('backspace');
const decimalButton = document.getElementById('decimal');
const equalButton = document.getElementById('equal');

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
clearResultButton.addEventListener('click', clearResult);
delButton.addEventListener('click', backspace);

decimalButton.addEventListener('click', function() {
  if (result.includes('.')) {}
  else if (lastKeyPressed === 'equal') {
    clearEverythingFunction();
    result += '.';
  }
  else {
    result += '.';
  }
  resultDisplay.innerHTML = result;
  lastKeyPressed = 'decimal';
});

equalButton.addEventListener('click', function() {
  operate();

  resultDisplay.innerHTML = result;
  oldResultDisplay.innerHTML = '';
  operatorDisplay.innerHTML = '';

  oldResult = result;
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
        oldResult = result;
        oldResultDisplay.innerHTML = oldResult;

        // after operating the previous operation, store the new one clicked
        operator = e.target.id;
      }
      // reset the current input for the querySelector
      result = '';
      resultDisplay.innerHTML = '';
      operatorDisplay.innerHTML = e.target.innerHTML;
    } // end of lastKeyPressed = number if statement

    // if last key pressed was the equal sign
    if (lastKeyPressed === 'equal') {
      operator = e.target.id;
      oldResultDisplay.innerHTML = oldResult;
      resultDisplay.innerHTML = '';
      operatorDisplay.innerHTML = e.target.innerHTML;
    }

    // allow user to replace the operator if they chose the wrong one
    if (lastKeyPressed === 'operator') {
      operator = e.target.id;
      operatorDisplay.innerHTML = e.target.innerHTML;
    }

    console.log(operator, lastKeyPressed, result, oldResult);
    lastKeyPressed = 'operator';
  });
}

  // number buttons
for (i = 0 ; i <= 9 ; i++) {
  let button = document.getElementById(i.toString());
  button.addEventListener('click', function(e) {
    if (lastKeyPressed === '' || lastKeyPressed === 'number' || lastKeyPressed
    === 'operator' || lastKeyPressed === 'decimal') {
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
function clearResult() {
  result = '';
  resultDisplay.innerHTML = '';
}

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
  result = Number(result);
  oldResult = Number(oldResult);
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
}
