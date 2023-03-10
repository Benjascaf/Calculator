function add(...nums) {
    return nums
                .reduce((total, number) => total + number);
}

function substract(...nums) {
    return nums
                .reduce((total, number) => total - number);
            
}

function multiply(...nums) {
    return nums 
                .reduce((total, num) => total * num);
}

function divide(...nums) {
    return nums 
                .reduce((total, num) => total / num);
}

function operate(operator, a, b) {
    switch (operator) {
        case "addition":
            return round(add(a,b), 8);
        case "substraction":
            return round(substract(a,b), 8);
        case "multiplication":
            return round(multiply(a,b), 8)
        case "division":
            return round(divide(a, b), 8);
    }
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

function evaluate() {
    if (operator === "division" && currNumber === "0") {
        clear();
        changeDisplay("Quien te crees q sos pa?");
        return;
    }

    let result;
    result = !currNumber ? operate(operator, firstNumber, firstNumber).toString() : operate(operator, firstNumber, parseFloat(currNumber));
    if (result.toString().length > 11) result = result.toExponential(6);
    currNumber = result.toString();
    changeDisplay();
    operator = '';
} 

function toggleDecimal (isDisabled) {
    const decimalButton = document.querySelector(".decimal");
    decimalButton.disabled = isDisabled;
}

function isNumberTooLong() {
    return currNumber && currNumber.length === 11;
}
function receiveInput(button) { 
    switch (true) {
        case [...button.classList].includes("num"): 
            if (isNumberTooLong()) break;
            !currNumber ? currNumber = button.textContent : currNumber += button.textContent;
            changeDisplay();
            break;
        case [...button.classList].includes("operator"):
            if (operator) {
                evaluate();
                break;
            }
            changeDisplay('');
            operator = button.classList[0];
            firstNumber = parseFloat(currNumber);
            currNumber = '';
            break;

        case [...button.classList].includes("clear"):
            clear();
            break;
        case [...button.classList].includes("decimal"):
            if (currNumber.includes('.'))break;
            currNumber += '.';
            changeDisplay();
            break;
        case [...button.classList].includes("delete"):
            currNumber = currNumber.slice(0, -1);
            changeDisplay();
            break;
        default: 
            if (operator) {
                evaluate();
            }
    }
}

function clear() {
    firstNumber = '';
    currNumber = '';
    operator = '';
    changeDisplay();
}

function changeDisplay(tobeDisplayed=currNumber) {
    const display = document.querySelector(".display");
    tobeDisplayed ? display.textContent = tobeDisplayed : display.textContent = 0;
}

function clickButton(event) {
    const button = document.querySelector(`button[data-key=${event.code}]`);
    if (button) button.click();
}

let currNumber;
let firstNumber;
let operator;

changeDisplay();
const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click",() => receiveInput(button)));

window.addEventListener("keydown", e => clickButton(e));