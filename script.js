// variables
const clearEverything = document.getElementById('clear-everything');
const displayScreen = document.querySelector('.display-screen');
const equalButton = document.getElementById('equal');
const delButton = document.getElementById('backspace');
const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');
const multiplyButton = document.getElementById('multiply');
const divideButton = document.getElementById('divide');

var numbersClicked = [];
var string = '';
var oldString = '';
var result = '';

// event listeners
clearEverything.addEventListener('click', clear);
delButton.addEventListener('click', backspace);

addButton.addEventListener('click', function(e) {
  oldString = string;
  numbersClicked = [];
  operator = e.target.id;
});

equalButton.addEventListener('click', operate);

// the equals button works when I put the operate function inside
// the event listener, but not when I put it as it's own function
// WTFFF
// I don't see the problem, especially because the clear and backspace
// functions work. The operate function doesn't do a THING and says
// numbersClicked = [], while backspace says it's the array of the numbers
// actually clicked

for (i = 0 ; i <= 9 ; i++) {
  let id = i.toString();
  let button = document.getElementById(id);
  button.addEventListener('click', function(e) {
    numbersClicked.push(e.target.value);
    string = numbersClicked.join('').toString();
    displayScreen.innerHTML = string;
  });
}

// functions
function clear() {
  numbersClicked = [];
  displayScreen.innerHTML = '';
}

function backspace() {
  numbersClicked.pop();
  string = numbersClicked.join('').toString();
  displayScreen.innerHTML = string;
}

function operate() {
  if (operator === 'add') {
    result = add(oldString, string);
    displayScreen.innerHTML = result;
  }
}

function add(x,y) {
  return x + y;
}

function subtract(x,y) {
  return x - y;
}

function multiply(x,y) {
  return x * y;
}

function divide(x,y) {
  return x / y;
}

function operate(x, y, operator) {
  if (operator === '+') {
    add(x,y);
  }
  else if (operator === '-') {
    subtract(x,y);
  }
  else if (operator === '*') {
    multiply(x,y);
  }
  else if (operator === '/') {
    divide(x,y);
  }
}
