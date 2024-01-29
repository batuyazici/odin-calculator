let calculator = {
    firstNumber: 0,
    secondNumber: 0,
    operator: "",
    display: null,
    displayValue: 0,
    displayResult: 0,
    displayOperator: "",
    displayFirstNumber: 0,
    displaySecondNumber: 0,
    buttons: null,
    setDisplay: function(element) {
        this.display = element;
        this.display.textContent = this.displayResult;
    },
    setButton : function(element) {
        this.buttons = element;
    },
    add: function() {
        return this.firstNumber + this.secondNumber;
    },
    subtract: function() {
        return this.firstNumber - this.secondNumber;
    },
    multiply: function() {
        return this.firstNumber * this.secondNumber;
    },
    divide: function() {
        return this.firstNumber / this.secondNumber;
    },
    operate: function() {
        switch(this.operator) {
            case "+":
                this.displayResult = this.sum();
                break;
            case "-":
                this.displayResult = this.subtract();
                break;
            case "*":
                this.displayResult = this.multiply();
                break;
            case "/":
                this.displayResult = this.divide();
                break;
        }
    },
}
let calcInfo = document.querySelector(".calc-container");
let buttons = [...calcInfo.querySelectorAll("button")];
let display = document.querySelector(".display");

calculator.setDisplay(display);
calculator.setButton(buttons);
