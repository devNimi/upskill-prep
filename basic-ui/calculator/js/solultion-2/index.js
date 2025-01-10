// please uncomment the code to include this script in the index.html file to test this
class Calculator {
  constructor() {
    this.display = document.getElementById("display-output");
    this.expression = "";
    this.lastResult = "";
    this.isNewCalculation = true;

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Event delegation for calculator buttons
    document.querySelector(".calculator").addEventListener("click", (event) => {
      if (event.target.matches("button")) {
        this.handleInput(event.target.value);
      }
    });

    // Keyboard support
    document.addEventListener("keydown", (event) => {
      this.handleKeyboard(event);
    });
  }

  handleKeyboard(event) {
    const key = event.key;
    const validKeys = /^[0-9.+\-*/()%=]$/;

    if (validKeys.test(key)) {
      event.preventDefault();
      this.handleInput(key);
    } else if (key === "Enter") {
      event.preventDefault();
      this.handleInput("=");
    } else if (key === "Escape") {
      event.preventDefault();
      this.handleInput("AC");
    } else if (key === "Backspace") {
      event.preventDefault();
      this.deleteLastChar();
    }
  }

  handleInput(value) {
    if (this.isNewCalculation && !isNaN(value)) {
      this.expression = "";
      this.isNewCalculation = false;
    }

    switch (value) {
      case "=":
        this.calculate();
        break;
      case "AC":
        this.clear();
        break;
      default:
        if (this.isValidInput(value)) {
          this.appendValue(value);
        }
    }

    this.updateDisplay();
  }

  isValidInput(value) {
    const lastChar = this.expression[this.expression.length - 1];
    const operators = /[+\-*/%]/;

    // Prevent multiple operators in sequence
    if (operators.test(value) && operators.test(lastChar)) {
      return false;
    }

    // Prevent multiple decimal points in a number
    if (value === "." && this.getCurrentNumber().includes(".")) {
      return false;
    }

    // Prevent leading zeros
    if (value === "0" && this.getCurrentNumber() === "0") {
      return false;
    }

    return true;
  }

  getCurrentNumber() {
    return this.expression.split(/[+\-*/%]/).pop() || "";
  }

  appendValue(value) {
    this.expression += value;
  }

  deleteLastChar() {
    this.expression = this.expression.slice(0, -1);
    this.updateDisplay();
  }

  clear() {
    this.expression = "";
    this.lastResult = "";
    this.isNewCalculation = true;
  }

  calculate() {
    if (!this.expression) return;

    try {
      // Validate expression
      this.validateExpression();

      // Replace % with /100 for percentage calculations
      let sanitizedExpression = this.expression.replace(/%/g, "/100");

      // Evaluate expression safely
      const result = this.evaluateExpression(sanitizedExpression);

      // Format and store result
      this.lastResult = this.formatResult(result);
      this.expression = this.lastResult;
      this.isNewCalculation = true;
    } catch (error) {
      this.handleError(error);
    }
  }

  validateExpression() {
    // Check for valid characters
    if (!/^[\d+\-*/(). %]*$/.test(this.expression)) {
      throw new Error("Invalid characters in expression");
    }

    // Check for balanced parentheses
    let parentheses = 0;
    for (let char of this.expression) {
      if (char === "(") parentheses++;
      if (char === ")") parentheses--;
      if (parentheses < 0) throw new Error("Unmatched parentheses");
    }
    if (parentheses !== 0) throw new Error("Unmatched parentheses");
  }

  evaluateExpression(expression) {
    // Split expression into tokens
    const tokens = expression.match(/(\d*\.?\d+|[+\-*/%()])/g) || [];

    // Basic implementation - in a real application, use a proper parser
    // This is simplified for demonstration purposes
    const result = new Function("return " + expression)();

    if (!isFinite(result)) {
      throw new Error("Invalid calculation");
    }

    return result;
  }

  formatResult(result) {
    // Handle different result types
    if (Number.isInteger(result)) {
      return result.toString();
    } else {
      // Round to 8 decimal places to avoid floating-point issues
      return Number(result.toFixed(8)).toString();
    }
  }

  handleError(error) {
    console.error("Calculator error:", error);
    this.expression = "Error";
    this.isNewCalculation = true;
  }

  updateDisplay() {
    // Sanitize display value
    const displayValue = this.expression || "0";

    // Update display with animation
    this.display.textContent = displayValue;

    // Add visual feedback
    this.display.classList.add("update");
    setTimeout(() => this.display.classList.remove("update"), 100);
  }
}

// Initialize calculator
document.addEventListener("DOMContentLoaded", () => {
  window.calculator = new Calculator();
});
