document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => handleButtonClick(button.value));
});

// Improve accessibility with additional keyboard support:
document.addEventListener("keydown", (event) => {
  const validKeys = "0123456789+-*/.=()AC".split("");
  if (validKeys.includes(event.key)) handleButtonClick(event.key);
});

let expression = "";
function handleButtonClick(value) {
  expression += value;

  switch (value) {
    case "=":
      let str = expression.split("=")[0];
      let evaluateExp = new Function("", `return ${str}`); // Safer with a library or manual parsing
      expression = evaluateExp();
      break;

    case "AC":
      expression = "0";

    default:
  }

  document.getElementById("display-output").innerHTML = expression;
}
