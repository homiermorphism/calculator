// variables
const clearEverythingButton = document.getElementById('clear-everything');
const clearResultButton = document.getElementById('clear-once');
const delButton = document.getElementById('backspace');
const decimalButton = document.getElementById('decimal');
const equalButton = document.getElementById('equal');
const plusMinusButton = document.getElementById('plus-minus');

const oldResultDisplay = document.querySelector('.old-result');
const operatorDisplay = document.querySelector('.operator');
const resultDisplay = document.querySelector('.result');

var oldResult = '';
var result = '';
var operator = '';
var lastKeyPressed = '';
var operators = ['add', 'subtract', 'multiply', 'divide'];

// event listeners
clearEverythingButton.addEventListener('click', clearEverything);
clearResultButton.addEventListener('click', clearResult);
delButton.addEventListener('click', backspace);
plusMinusButton.addEventListener('click', plusMinus);
decimalButton.addEventListener('click', decimal);
equalButton.addEventListener('click', equal);

// keyboard support
document.addEventListener('keydown', function(e) {
  // clear buttons
  if (e.key === 'Delete') {
    clearResultButton.classList.toggle('button-active');
    clearResultButton.click();
  }
  if (e.key === 'Escape') {
    clearEverythingButton.classList.toggle('button-active');
    clearEverythingButton.click();
  }
  if (e.key === 'Backspace') {
    delButton.classList.toggle('button-active');
    delButton.click();
  }
  // operators
  if (e.key === '+') {
    document.getElementById('add').classList.toggle('button-active');
    document.getElementById('add').click();
  }
  if (e.key === '-') {
    document.getElementById('subtract').click();
    document.getElementById('subtract').classList.toggle('button-active');
  }
  if (e.key === '*') {
    document.getElementById('multiply').click();
    document.getElementById('multiply').classList.toggle('button-active');
  }
  if (e.key === '/') {
    document.getElementById('divide').click();
    document.getElementById('divide').classList.toggle('button-active');
  }
  if (e.key === '=' || e.key === 'Enter') {
    equalButton.classList.toggle('button-active');
    equalButton.click();
  }
  // numbers
  for (i=0; i <= 9; i++) {
    if (e.key === i.toString()) {
      document.getElementById(i.toString()).classList.toggle('button-active');
      document.getElementById(i.toString()).click();
    }
  }
  // decimal
  if (e.key === '.') {
    decimalButton.classList.toggle('button-active');
    decimalButton.click();
  }
});

document.addEventListener('keyup', function(e) {
  // clear buttons
  if (e.key === 'Delete') {clearResultButton.classList.toggle('button-active');;}
  if (e.key === 'Escape') {clearEverythingButton.classList.toggle('button-active');;}
  if (e.key === 'Backspace') {delButton.classList.toggle('button-active');}
  // operators
  if (e.key === '+') {document.getElementById('add').classList.toggle('button-active');}
  if (e.key === '-') {document.getElementById('subtract').classList.toggle('button-active');}
  if (e.key === '*') {document.getElementById('multiply').classList.toggle('button-active');}
  if (e.key === '/') {document.getElementById('divide').classList.toggle('button-active');}
  if (e.key === '=' || e.key === 'Enter') {equalButton.classList.toggle('button-active');}
  // numbers
  for (i=0; i <= 9; i++) {
    if (e.key === i.toString())
      {document.getElementById(i.toString()).classList.toggle('button-active');}
  }
  // decimal
  if (e.key === '.') {decimalButton.classList.toggle('button-active');}
});

// operator buttons
for (i=0; i < operators.length; i++) {
  let operatorButton = document.getElementById(operators[i]);
  operatorButton.className = 'operator-button';
  operatorButton.addEventListener('click', operatorDisplayFunction);
}

// number buttons
for (i = 0 ; i <= 9 ; i++) {
  let numberButton = document.getElementById(i.toString());
  numberButton.className = 'number-button';
  numberButton.addEventListener('click', function(e) {
    if (result.length < 12 &&
    ['', 'number', 'operator', 'decimal'].includes(lastKeyPressed)) {
      result += e.target.value;
    }
    if (lastKeyPressed === 'equal') {
      clearEverything();
      result += e.target.value;
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

function clearEverything() {
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

function plusMinus() {
  if (lastKeyPressed === 'equal') {
    result = oldResult;
    oldResult = '';
  }
  if (result != '') {
    result = Number(result);
    result = 0 - result;
    resultDisplay.innerHTML = result;
    lastKeyPressed = 'number';
  }
}


function decimal() {
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
}

function equal() {
  operate();

  resultDisplay.innerHTML = result;
  oldResultDisplay.innerHTML = '';
  operatorDisplay.innerHTML = '';

  oldResult = result;
  result = '';
  lastKeyPressed = 'equal';
}

function operatorDisplayFunction(e) {
  // if the user hasn't entered anything, do nothing
  if (oldResult === '') {}
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
  if (lastKeyPressed === 'operator' && oldResult != '') {
    operator = e.target.id;
    operatorDisplay.innerHTML = e.target.innerHTML;
  }
  lastKeyPressed = 'operator';
} // end of operator function
