let previousOperand = "";
let currentOperand = "";
let operation = undefined;
let logs = [];
let current_operation = [];

let currentElementDisplay = document.querySelector(".current-operand");
let previousElementDisplay = document.querySelector(".previous-operand");
let number_button = document.querySelectorAll("[data-number]");
let operator_button = document.querySelectorAll("[data-operator]");
let data_clear_all = document.querySelector("[data-clear-all]");
let data_clear = document.querySelector("[data-clear]");
let data_equals = document.querySelector("[data-equal]");
let sign_button = document.querySelector("[data-sign]");
let data_point = document.querySelector("[data-pointer]");
let checkbox = document.querySelector("#checkbox");
let expand_logs = document.querySelector(".expand");
let log_windows = document.querySelector(".logs_windows");
let log_box = document.querySelector(".logs");
let minimice_log_box = document.querySelector(".minimize");
let clear_button_logs = document.querySelector(".clear_button button");

let main = document.querySelector(".main");
let main_top = document.querySelector(".main-top");
let output = document.querySelector(".output");
let check_label = document.querySelector("#check-label");

minimice_log_box.addEventListener("click", () => {
  if (log_box.style.display === "block") {
    log_box.style.display = "none";
  }
});

clear_button_logs.addEventListener("click", () => {
  while (log_windows.firstChild) {
    log_windows.removeChild(log_windows.firstChild);
  }
});

expand_logs.addEventListener("click", () => {
  updateLogs();

  logs.length > 0
    ? (log_box.style.cssText =
        "display: flex;flex-direction: column;justify-content: space-between;")
    : alert("No hay operaciones para mostrar");
});

Array.from(number_button).forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

Array.from(operator_button).forEach((button) => {
  button.addEventListener("click", () => {
    if (currentElementDisplay.textContent === "") return;
    if (previousElementDisplay.textContent === "") {
      previousElementDisplay.textContent = `${currentOperand} ${button.textContent}`;
    }
    if (
      previousElementDisplay.textContent !== "" &&
      currentElementDisplay.textContent !== ""
    ) {
      previousElementDisplay.textContent = `${currentOperand} ${button.textContent}`;
      calculate();
    }
    current_operation.push(button.innerText);
    operation = button.innerText;
    previousOperand = currentOperand;
    currentOperand = "";

    updateDisplay();
  });
});

data_equals.addEventListener("click", () => {
  calculate();
  updateDisplay();

  if (currentOperand === "" || previousOperand === "") return;

  previousElementDisplay.textContent = "";
  current_operation.push("=", currentOperand);
  logs.push(current_operation);
  current_operation = [];
  updateLogs();
  console.log(logs);
});

data_clear.addEventListener("click", () => {
  currentOperand = currentOperand.slice(0, -1);
  updateDisplay();
});

data_clear_all.addEventListener("click", () => {
  previousOperand = "";
  currentOperand = "";
  operation = undefined;

  updateDisplay();
  previousElementDisplay.textContent = "";
});

sign_button.addEventListener("click", () => {
  if (currentOperand < 0 || currentOperand > 0) {
    currentOperand = currentOperand * -1;
  }
  updateDisplay();
});

data_point.addEventListener("click", () => {
  currentOperand = currentOperand + ".";

  updateDisplay();
});

checkbox.addEventListener("click", () => {
  if (checkbox.checked == true) {
    main.style.backgroundColor = "#2E3851";
    main_top.style.backgroundColor = "#212C42";
    output.style.backgroundColor = "#212C42";
    log_box.style.backgroundColor = "#2E3851";
    log_box.style.color = "white";

    Array.from(number_button).forEach((button) => {
      button.style.color = "white";
    });

    Array.from(operator_button).forEach((button) => {
      button.style.color = "#10A985";
    });

    currentElementDisplay.style.color = "#10A985";
    previousElementDisplay.style.color = "#10A985";

    data_clear_all.style.color = "#10A985";
    data_clear.style.color = "#10A985";
    data_equals.style.color = "#10A985";
    sign_button.style.color = "#10A985";
    data_point.style.color = "white";

    check_label.style.backgroundColor = "#5D6E99";
  } else if (checkbox.checked == false) {
    main.style.backgroundColor = "white";
    main_top.style.backgroundColor = "#f4fdfc";
    output.style.backgroundColor = "#f4fdfc";
    log_box.style.backgroundColor = "white";
    log_box.style.color = "black";

    Array.from(number_button).forEach((button) => {
      button.style.color = "black";
    });

    Array.from(operator_button).forEach((button) => {
      button.style.color = "black";
    });

    currentElementDisplay.style.color = "black";
    previousElementDisplay.style.color = "black";

    data_clear_all.style.color = "black";
    data_clear.style.color = "black";
    data_equals.style.color = "black";
    sign_button.style.color = "black";
    data_point.style.color = "black";

    check_label.style.backgroundColor = "transparent";
  }
});

function appendNumber(number) {
  currentOperand += number.toString();
  current_operation.push(number);
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
    case "%":
      currentOperand = parseFloat(previousOperand) % parseFloat(currentOperand);
      break;
  }
}

function updateLogs() {
  while (log_windows.firstChild) {
    log_windows.removeChild(log_windows.firstChild);
  }
  logs.forEach((log) => {
    let list = document.createElement("li");
    list.textContent = log.join(" ");
    log_windows.appendChild(list);
  });
}
