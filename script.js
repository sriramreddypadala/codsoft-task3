let displayValue = '0';
let pendingValue = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
}

function clearAll() {
    displayValue = '0';
    pendingValue = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function clearEntry() {
    displayValue = '0';
    updateDisplay();
}

function deleteLast() {
    if (!shouldResetDisplay) {
        displayValue = displayValue.slice(0, -1);
        if (displayValue === '') displayValue = '0';
        updateDisplay();
    }
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        displayValue = String(number);
        shouldResetDisplay = false;
    } else {
        displayValue = displayValue === '0' ? String(number) : displayValue + number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) calculateResult();
    pendingValue = displayValue;
    operator = op;
    shouldResetDisplay = true;
}

function appendDecimal() {
    if (shouldResetDisplay) {
        displayValue = '0.';
        shouldResetDisplay = false;
    } else if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

function calculateResult() {
    if (operator === null) return;

    const currentValue = parseFloat(displayValue);
    const previousValue = parseFloat(pendingValue);

    let result = 0;

    switch (operator) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '*':
            result = previousValue * currentValue;
            break;
        case '/':
            result = previousValue / currentValue;
            break;
        case '%':
            result = previousValue % currentValue;
            break;
    }

    displayValue = String(result);
    operator = null;
    pendingValue = null;
    shouldResetDisplay = true;
    updateDisplay();
}
