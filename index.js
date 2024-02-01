let calculator = {
  firstNumber: 0,
  secondNumber: 0,
  operator: "",
  result: 0,
  display: null,
  displayValue: 0,
  displayResult: 0,
  displayOperator: "",
  displayFirstNumber: "",
  displaySecondNumber: "",
  decimalButton: null,
  buttons: null,
  setDisplay: function (element) {
    this.display = element;
    this.display.textContent = this.displayResult;
  },
  setButton: function (element) {
    this.buttons = element;
  },
  isInitialValue: function() {
    this.displayResult === "0"? true : false;
  },
  opendecimalMode: function() { 
    this.decimalButton.classList.add("deactivated");
    this.decimalButton.disabled = true;
  },
  closedecimalMode: function() { 
    
    this.decimalButton.classList.remove("deactivated");
    this.decimalButton.disabled = false;
  },
  setDecimalButton: function(element) {
    this.decimalButton = element;
  },
  hasoneDecimalPoint: function(number) {
        const numberString = number.toString();
        const parts = numberString.split('.');
        return parts.length === 2;
  },
  isDecimal: function(number) {
    if(number%1!==0) {
      return true;
    } else {
      return false;
    }
  },
  add: function () {
    this.result= this.firstNumber + this.secondNumber;
    this.result.toFixed(1);   
  },
  subtract: function () {
    this.result= this.firstNumber - this.secondNumber;
    this.result.toFixed(1); 
  },
  multiply: function () {
    this.result= this.firstNumber * this.secondNumber;
    this.result.toFixed(1);
  },
  divide: function () {
    if(this.secondNumber=== 0) {
      alert("Please enter a valid second number. Don't try to break the calculator!");
      this.result = this.firstNumber;
      this.result.toFixed(1);
    }else {
    this.result= this.firstNumber / this.secondNumber;
    this.result.toFixed(1);
    }
  },
  default: function () {
    if(this.firstNumber!==0 && this.secondNumber===0) {
      this.result = this.firstNumber;
    } 

  },
  operate: function () {
    switch (this.operator) {
      case "+":
        this.displayResult = this.add();
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
      default:
        this.displayResult = this.default();
        break;
    }
  },
};

let calcInfo = document.querySelector(".calc-container");
let buttons = [...calcInfo.querySelectorAll("button")];
let display = document.querySelector(".display");
let isOperatorExist = false;
let isSecondNumberExist = false;
let isDecimalExist = false;
calculator.setDisplay(display);
calculator.setButton(buttons);
const dotButton = document.querySelector(".calc-container .bt-text.dec-button")
calculator.setDecimalButton(dotButton);

calculator.buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    let buttonValue = e.target.textContent;
    if (isNaN(+buttonValue)) {
      if (buttonValue === "C") 
      {
        calculator.closedecimalMode();
        calculator.displayResult = 0;
        calculator.display.textContent = calculator.displayResult;
        calculator.firstNumber = 0;
        calculator.secondNumber = 0;
        calculator.operator = "";
        calculator.displayOperator = "";
        calculator.displayFirstNumber = "";
        calculator.displaySecondNumber = "";
        isDecimalExist = false;
        isOperatorExist = false;
        isSecondNumberExist = false;
        
      } 
      else if (buttonValue === "DEL") 
      {
        
      } 
      else if (buttonValue === "=") 
      {
        calculator.operate();
        isSecondNumberExist = false;
        isOperatorExist = false;
        calculator.firstNumber = calculator.result;
        calculator.secondNumber = 0;
        calculator.operator = "";
        calculator.displayOperator = "";
        calculator.displayFirstNumber = `${calculator.result}`;
        calculator.displaySecondNumber = "";
        calculator.displayResult = `${calculator.result}`;
        calculator.display.textContent = calculator.displayResult;
        calculator.closedecimalMode();
        isDecimalExist = false;
      } 
      else if (buttonValue === "+" || buttonValue === "-" || buttonValue === "*" || buttonValue === "/" )
      {
        if(calculator.firstNumber!== 0 && calculator.operator!==""&& calculator.secondNumber!==0) {
          calculator.operate();
          calculator.firstNumber = calculator.result;
          calculator.secondNumber = 0;
          calculator.displayFirstNumber = `${calculator.result}`;
          calculator.displaySecondNumber = "";
          calculator.operator = buttonValue;
          calculator.displayOperator = buttonValue;
          calculator.displayResult = `${calculator.result}${calculator.displayOperator}`;
          calculator.display.textContent = calculator.displayResult;
          isOperatorExist = true;
          isSecondNumberExist = false;
          calculator.closedecimalMode();
          isDecimalExist = false;
         }
        if(!isOperatorExist) {
            calculator.operator = buttonValue;
            calculator.displayOperator = buttonValue;
            calculator.displayResult += calculator.displayOperator;
            calculator.display.textContent = calculator.displayResult;
            isOperatorExist = true;
            isDecimalExist = false;
            calculator.closedecimalMode();
        }
      } 
      else if (buttonValue === ".") 
      {
        calculator.displayResult += buttonValue;
        calculator.display.textContent = calculator.displayResult;
        calculator.opendecimalMode();
        isDecimalExist = true;
      }
    } else {        
        if(!isOperatorExist) {
          if(!calculator.hasoneDecimalPoint(calculator.displayFirstNumber)) {
            if(isDecimalExist) {
              calculator.displayFirstNumber = calculator.displayResult+buttonValue;
              calculator.firstNumber = +calculator.displayFirstNumber;
              calculator.displayResult = calculator.displayFirstNumber;
              calculator.display.textContent = calculator.displayResult;

            } else {
              calculator.isInitialValue() ? calculator.displayFirstNumber = buttonValue : calculator.displayFirstNumber += buttonValue;
              calculator.firstNumber = +calculator.displayFirstNumber;
              calculator.displayResult = calculator.displayFirstNumber;
              calculator.display.textContent = calculator.displayResult;
            }
          }
        } else if(!isSecondNumberExist && isOperatorExist) {
          if(!calculator.hasoneDecimalPoint(calculator.displaySecondNumber)) {
            if(isDecimalExist) {
              calculator.displaySecondNumber = `${calculator.displaySecondNumber}.${buttonValue}`;
              calculator.secondNumber = +calculator.displaySecondNumber;
              calculator.displayResult += buttonValue;
              calculator.display.textContent = calculator.displayResult;
            } else {
              calculator.displaySecondNumber += buttonValue;
              calculator.secondNumber = +calculator.displaySecondNumber;
              calculator.displayResult += buttonValue;
              calculator.display.textContent = calculator.displayResult;  
            }
          }
        }
    }
  });
});
