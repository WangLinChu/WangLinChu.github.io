var displayElement = document.getElementById("display");

function appendNumber(number) {
  displayElement.value += number;
}

function appendOperator(operator) {
  displayElement.value += operator;
}

function calculate() {
  try {
    displayElement.value = eval(displayElement.value);
  } catch (error) {
    displayElement.value = "Error";
  }
}

function clearDisplay() {
  displayElement.value = "";
}