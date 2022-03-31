let previousOperand = "";
let currentOperand = "";
let operation = undefined;

let currentElementDisplay = document.querySelector(".current-operand");
let previousElementDisplay = document.querySelector(".previous-operand");
let number_button = document.querySelectorAll("[data-number]");
let operator_button = document.querySelectorAll("[data-operator]");
let data_clear_all = document.querySelector("[data-clear-all]");
let data_clear = document.querySelector("[data-clear]");
let data_equals = document.querySelector("[data-equal]");
let sign_button = document.querySelector("[data-sign]");

Array.from(number_button).forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

Array.from(operator_button).forEach((button) => {
  button.addEventListener("click", () => {
    if (previousElementDisplay.textContent === "") {
      previousElementDisplay.textContent = `${currentOperand} ${button.textContent}`;
    }

    operation = button.innerText;
    previousOperand = currentOperand;
    currentOperand = "";

    updateDisplay();
  });
});

data_equals.addEventListener("click", () => {
  calculate();
  updateDisplay();
  previousElementDisplay.textContent = "";
});

data_clear.addEventListener("click", () => {
  currentOperand = currentOperand.slice(0, -1);
  updateDisplay();
});

data_clear_all.addEventListener("click", () => {
  console.log(previousOperand, currentOperand, operation);

  previousOperand = "";
  currentOperand = "";
  operation = undefined;

  updateDisplay();
  previousElementDisplay.textContent = "";
});

function appendNumber(number) {
  currentOperand += number.toString();
}

function updateDisplay() {
  currentElementDisplay.textContent = currentOperand;
}

function calculate() {
  switch (operation) {
    case "+":
      currentOperand = parseFloat(previousOperand) + parseFloat(currentOperand);
      break;
    case "-":
      currentOperand = parseFloat(previousOperand) - parseFloat(currentOperand);
      break;
    case "x":
      currentOperand = parseFloat(previousOperand) * parseFloat(currentOperand);
      break;
    case "/":
      currentOperand = parseFloat(previousOperand) / parseFloat(currentOperand);
      break;
  }
}
