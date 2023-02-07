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
            return add(a,b);
        case "substraction":
            return substract(a,b);
        case "multiplication":
            return multiply(a,b)
        case "division":
            return divide(a, b);
    }
}

function evaluate() {
    result = operate(operator, firstNumber, parseFloat(currNumber)).toString();
    currNumber = result;
    changeDisplay();
    operator = '';
} 

function toggleDecimal (isDisabled) {
    const decimalButton = document.querySelector(".decimal");
    decimalButton.disabled = isDisabled;
}
function receiveInput(button) { 
    /*if ([...button.classList].includes("num")) {
        !currNumber ? currNumber = button.textContent : currNumber += button.textContent;
        changeDisplay();
    } else if ([...button.classList].includes("operator")){
        if (operator) {
            evaluate();
            return;
        }
        changeDisplay('');
        operator = button.classList[0];
        firstNumber = parseFloat(currNumber);
        currNumber = '';
    }  else if ([...button.classList].includes("clear")) {
        changeDisplay('');
        firstNumber = '';
        currNumber = '';
        operator = '';
    } else  {
        if (operator) {
            evaluate();
        }
    } */
    switch (true) {
        case [...button.classList].includes("num"): 
            !currNumber ? currNumber = button.textContent : currNumber += button.textContent;
            changeDisplay();
            break;
        case [...button.classList].includes("operator"):
            if (operator) {
                evaluate();
                toggleDecimal(false);
                break;
            }
            changeDisplay('');
            operator = button.classList[0];
            firstNumber = parseFloat(currNumber);
            currNumber = '';
            toggleDecimal(false);
            break;

        case [...button.classList].includes("clear"):
            changeDisplay('');
            firstNumber = '';
            currNumber = '';
            operator = '';
            toggleDecimal(false)
            break;
        case [...button.classList].includes("decimal"):
            currNumber += '.';
            changeDisplay();
            toggleDecimal(true);
            break;
        default: 
            if (operator) {
                evaluate();
                toggleDecimal(false);
            }
    }
}

function changeDisplay(tobeDisplayed=currNumber) {
    const display = document.querySelector(".display");
    display.textContent = tobeDisplayed;
}

let currNumber;
let firstNumber;
let operator;

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click",() => receiveInput(button)));