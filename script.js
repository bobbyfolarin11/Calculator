let totalCalc = document.querySelector("#total");
const inputEl = document.querySelector("#user-input");
const btnEl = document.querySelectorAll("button");

let userInput = "";

btnEl.forEach((button) => {
  button.addEventListener("click", () => {
    const currentInput = button.innerHTML.trim();

    if (currentInput === "AC") {
      userInput = "";
      totalCalc.textContent = 0;
    } else if (currentInput === "DEL") {
      userInput = userInput.substring(0, userInput.length - 1);
    } else if (currentInput === "x<sup>y</sup>") {
      userInput += "^";
    } else if (currentInput === "%") {
      userInput = eval(userInput) / 100;
      totalCalc.textContent = userInput;
    } else if (currentInput == "√") {
      userInput = Math.sqrt(eval(userInput));
      totalCalc.textContent = formatResult(userInput);
    } else if (currentInput == "log<sub>10</sub>") {
      userInput = Math.log10(eval(userInput));
      totalCalc.textContent = formatResult(userInput);
    } else if (currentInput === "=") {
      exponentialFunc();
      arithmeticFunc();
    } else if (/\d/.test(currentInput) || (/\d/.test(userInput.slice(-1)) && /[+\-*/^]/.test(currentInput))) {
      userInput += currentInput;
      totalCalc.textContent = userInput;
    }

    inputEl.value = 0;
  });
});

const exponentialFunc = () => {
  if (userInput.includes("^")) {
    const [base, exponent] = userInput.split("^");

    try {
      const result = Math.pow(eval(base), eval(exponent));
      totalCalc.textContent = formatResult(result);
      userInput = result;
    } catch (error) {
      userInput = "";
      totalCalc.textContent = "Error";
    }
  }
}

const arithmeticFunc = () => {
  try {
    const result = eval(userInput);
    totalCalc.textContent = formatResult(result);
  } catch (error) {
    userInput = "";
    totalCalc.textContent = "Error";
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (/[\d\+\-\*\/\(\)\.\^]/.test(key) || (/\d/.test(userInput.slice(-1)) && /[+\-*/^]/.test(key))) {
    userInput += key;
    inputEl.value = userInput;
  } else if (key === "Backspace") {
    userInput = userInput.substring(0, userInput.length - 1);
    inputEl.value = userInput;
  } else if (key === "Enter") {
    try {
      const result = eval(userInput);
      totalCalc.textContent = formatResult(result);
    } catch (error) {
      userInput = "Error";
      totalCalc.textContent = "Error";
    }
  }

  event.preventDefault();
});

function formatResult(result) {
  if (result.toString().length > 10) {
    return result.toFixed(3);
  } else {
    return result;
  }
}
