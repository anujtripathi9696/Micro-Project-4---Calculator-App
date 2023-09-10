document.addEventListener("DOMContentLoaded", function () {
  const displayElement = document.getElementById("display");
  const digitButtons = document.querySelectorAll(".digit-button");
  const operatorButtons = document.querySelectorAll(".operator-button");
  const equalButton = document.querySelector(".equal-button");
  const resetButton = document.querySelector(".reset-button");
  const deleteButton = document.querySelector(".delete-button");

  let displayValue = "0";
  let decimalAdded = false;

  digitButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-value");
      appendToDisplay(value);
    });
  });

  operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const value = button.getAttribute("data-value");
      appendToDisplay(value);
    });
  });

  equalButton.addEventListener("click", calculateResult);

  resetButton.addEventListener("click", () => {
    clearDisplay();
  });

  deleteButton.addEventListener("click", () => {
    deleteFromDisplay();
  });

  function appendToDisplay(value) {
    if (value === "." && decimalAdded) return;

    if (/[+\-*/]/.test(value)) decimalAdded = false;

    if (displayValue === "0" && value !== ".") {
      displayValue = value;
    } else {
      if (displayValue.length < 18) {
        // Added this line
        displayValue += value;
      }
    }

    if (value === ".") decimalAdded = true;

    displayElement.textContent = displayValue;
  }

  function clearDisplay() {
    displayValue = "0";
    decimalAdded = false;
    displayElement.textContent = displayValue;
  }

  function deleteFromDisplay() {
    displayValue = displayValue.slice(0, -1);
    if (displayValue === "") {
      displayValue = "0";
    }
    if (!displayValue.includes(".")) decimalAdded = false;
    displayElement.textContent = displayValue;
  }

  function calculateResult() {
    try {
      if (/\/0/.test(displayValue)) throw new Error("Cannot divide by zero");
      let result = eval(displayValue);
      if (result.toString().length > 18) throw new Error("Result is too large");
      displayValue = result.toString();
      displayElement.textContent = displayValue;
    } catch (error) {
      displayValue = error.message;
      displayElement.textContent = displayValue;
      setTimeout(clearDisplay, 2000);
    }
  }

  document.addEventListener("keydown", function (event) {
    const key = event.key;
    if ((key >= 0 && key <= 9) || key === ".") {
      const button = document.querySelector(
        `.digit-button[data-value="${key}"]`
      );
      if (button) button.click();
    } else if (
      key === "+" ||
      key === "-" ||
      key === "*" ||
      key === "/" ||
      key === "="
    ) {
      const button = document.querySelector(
        `.operator-button[data-value="${key}"]`
      );
      if (button) button.click();
    } else if (key.toLowerCase() === "c") {
      const button = document.querySelector(".reset-button");
      if (button) button.click();
    }
  });
});
