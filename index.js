let input = document.getElementById("inputText");
let result = document.getElementById("result");
let container = document.querySelector(".container");
let main = document.getElementById("main");
let enter = document.getElementById("enter");
let button = document.querySelectorAll("button")

let filter_val = ["enter", "back", "clear"];

console.log(button)
console.log(container)
container.addEventListener("click", (e) => {
  let clickedVal = e.target.textContent;
  if(!filter_val.includes(clickedVal.toLowerCase())) {
    input.value += clickedVal;
  }
})




enter.addEventListener("click", () => {
  let val = input.value;
  console.log(val)
//   let reg = /^(?=.*\d)(?!.*[+\-*^./]{2})[0-9+\-*^./]+$/g;
  let reg = /^(?=.*\d)(?!.*[+\-*^./]{2})[0-9+\-*^./\s]+$/;

  val = val.replaceAll(" ", "")
  if (!reg.test(val)) {
    alert("Please enter a valid regex");
  }
  console.log(val);
  let arrOfEquation = strToArr(val);
  console.log(new Solve().startCalculation(arrOfEquation))
  console.log(arrOfEquation)

});

class Solve {
  constructor() {
    this.operatorsArr = ["*", "/", "+", "-", "^"];
    this.mp = new Map([
      ["^", 3],
      ["*", 2],
      ["/", 2],
      ["+", 1],
      ["-", 1],
    ]);
    this.operatorStack = [];
    this.operandStack = [];
    // this.startCalculation(arr);
  }

  startCalculation(arr) {
    for (let i = 0; i < arr.length; i++) {
      // if the val is numeric value
      if (!this.operatorsArr.includes(arr[i])) {
        this.operandStack.push(arr[i]);
      } else {
        if (
          this.operandStack.length == 0 ||
          this.mp.get(arr[i]) > this.mp.get(this.operatorStack[this.operatorStack.length - 1])
        ) {
          this.operatorStack.push(arr[i]);
        } else {
          while (
            this.operatorStack.length > 0 ||
            this.mp.get(arr[i]) <= this.mp.get(this.operatorStack[this.operatorStack.length - 1])
          ) {
            let operand1 = this.operandStack.pop();
            let operand2 = this.operandStack.pop();
            let operator = this.operatorStack.pop();
            let result = this.calculate(operand1, operand2, operator);
            this.operandStack.push(result);
          }
          this.operatorStack.push(arr[i]);
        }
      }
    }

    while (this.operatorStack.length > 0) {
      let operand1 = this.operandStack.pop();
      let operand2 = this.operandStack.pop();
      let operator = this.operatorStack.pop();
      let result = this.calculate(operand1, operand2, operator);
      this.operandStack.push(result);
    }

    return this.operandStack[this.operandStack.length - 1];
  }

  calculate(operand1, operand2, operator) {
    operand1 = Number(operand1);
    operand2 = Number(operand2);

    if (operator == "+") {
      return operand2 + operand1;
    } else if (operator == "-") {
      return operand2 - operand1;
    } else if (operator == "/") {
      return operand2 / operand1;
    } else if (operator == "*") {
      return operand2 * operand1;
    } else if (operator == "^") {
      return Math.pow(operand2, operand1);
    }
  }
}


// const solve = new Solve(arr);
// console.log(solve.startCalculation(arr));

function strToArr(str) {
    let arr = [];
    let num;
    for(let i=0; i<str.length; i++) {
        if(!isNaN(str[i]) || str[i] == ".") {
            if(typeof num === "undefined") num = str[i];
            else num = num + str[i];
        } else {
            if(typeof num !== "undefined") {
                arr.push(num);
                num = undefined;
            }
            arr.push(str[i]);
        }
        if(i == str.length - 1 && !isNaN(str[i])) arr.push(num)
      }
    return arr;
}



// 10-3/4 :- [ '10', '-', '3', '/', '4' ]



