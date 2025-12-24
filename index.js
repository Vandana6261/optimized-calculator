// let input = document.getElementById("inputText");
// let result = document.getElementById("result");
// let container = document.getElementById("container");
// let main = document.getElementById("main");
// let enter = document.getElementById("enter");

// enter.addEventListener("click", () => {
//   let val = input.value;
// //   let reg = /^(?=.*\d)(?!.*[+\-*^./]{2})[0-9+\-*^./]+$/g;
//   let reg = /^(?=.*\d)(?!.*[+\-*^./]{2})[0-9+\-*^./\s]+$/;

//   val = val.replaceAll(" ", "")
//   if (!reg.test(val)) {
//     alert("Please enter a valid regex");
//   }
//   console.log(val);
//   console.log(val)
//   let result = startCalculation(val);
//   console.log(result)
// });



function startCalculation(arr) {
  let operatorStack = [];
  let operandStack = [];
  for (let i = 0; i < arr.length; i++) {

    // if the val is numeric value
    if (!operatorsArr.includes(arr[i])) {
      operandStack.push(arr[i]);
    } else {
      if (
        operandStack.length == 0 ||
        mp.get(arr[i]) > mp.get(operatorStack[operatorStack.length - 1])
        ) {
        operatorStack.push(arr[i]);
      } else {
        while (
          operatorStack.length > 0 ||
          mp.get(arr[i]) <= mp.get(operatorStack[operatorStack.length - 1])
        ) {
          let operand1 = operandStack.pop();
          let operand2 = operandStack.pop();
          let operator = operatorStack.pop();
          let result = calculate(operand1, operand2, operator);
          operandStack.push(result);
        }
        operatorStack.push(arr[i]);
      }
    }
  }

  while (operatorStack.length > 0) {
    // console.log("61")
    let operand1 = operandStack.pop();
    let operand2 = operandStack.pop();
    let operator = operatorStack.pop();
    let result = calculate(operand1, operand2, operator);
    operandStack.push(result);
  }

  return operandStack[operandStack.length - 1];
}

function calculate(operand1, operand2, operator) {
    operand1 = Number(operand1)
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

const mp = new Map([
  ["^", 3],
  ["*", 2],
  ["/", 2],
  ["+", 1],
  ["-", 1],
]);

let operatorsArr = ["*", "/", "+", "-", "^"];

let hello = "10-3/4";
let arr = [];
let num;
for(let i=0; i<hello.length; i++) {
    if(!isNaN(hello[i]) || hello[i] == ".") {
        if(typeof num === "undefined") num = hello[i];
        else num = num + hello[i];
    } 
    else {
        if(typeof num !== "undefined") {
            arr.push(num);
            num = undefined;
        }
        arr.push(hello[i]);
    }
    if(i == hello.length - 1) if(!isNaN(hello[i])) arr.push(hello[i])
}
if(isNaN(arr[arr.length - 1])) arr.pop();
console.log(arr)
console.log(startCalculation(arr))




