// Constants for clarity and maintainability
const ADD_OPERATOR = '+'
const SUBTRACT_OPERATOR = '-'
const MULTIPLY_OPERATOR = '×'
const DIVIDE_OPERATOR = '÷'

let numberStored = 0
let operatorStored = ''

const buttons = document.querySelectorAll(".button")
const display = document.querySelector(".display")

let newInput = false
let didEqual = false

//function calculation
function add(a,b){
  return a + b
}

function subtract(a,b){
  return a - b
}

function multiply(a,b){
  return a * b
}

function divide(a,b){
  return a / b
}

function clear(){
  numberStored = 0
  operatorStored = ''
  display.textContent = numberStored
}

function storedCal(operator){ //store operator
  if(!numberStored){
    numberStored = display.textContent
  }
  operatorStored = operator
  newInput = true
  didEqual =false
}

function operate(a, operator, b){
  switch(operator) {
    case ADD_OPERATOR : 
      return add(a,b)
      break;
    case SUBTRACT_OPERATOR :
      return subtract(a,b)
      break
    case MULTIPLY_OPERATOR : 
      return multiply(a,b)
      break
    case DIVIDE_OPERATOR : 
      return divide(a,b)
      break;
    default :
      alert("something wrong")
      clear()
  }
}
//setDisplay 
function setDisplay(displayNum){ //Display number operator and result
  if(displayNum.length > 9){
    displayNum = parseFloat(displayNum)
    displayNum = displayNum.toExponential(2)
  }

  display.textContent = displayNum
}

//function add to display
function addTodisPlay(number){  //for check state 
  let displayNum = display.textContent
  if(newInput){ //it mean second number
    newInput = false
    setDisplay(number)
  }else if(displayNum == 0){ //that mean it the fistnumber
    setDisplay(number)
  }else{ //add number for fistnumber or secondnumber
    if (displayNum.includes('e')) {
            displayNum = Number(displayNum);
      }
    displayNum += number
    setDisplay(displayNum)
  }
}

buttons.forEach(button => 
  button.addEventListener("click", (e) =>{
    let input = e.target.textContent

    if(/\d/.test(input)){ //must be 0-9

      if(didEqual){ //calculation after fist tinme
        didEqual = false
        setDisplay(input)
      }else{
        addTodisPlay(input) //calculaton first itme
      }

    }else if(input == "C"){ //if click clear button
      clear()
    }else if(input == "="){ //if click equal button
      if(!numberStored || !operatorStored){ //if numberStored and operatorStored is not ready
        alert("Something wrong")
        clear()
      }else{ // everything is ready call operate function and result store in numberStored after that show result by call
        //setDisplay
        numberStored = operate(Number(numberStored), operatorStored, Number(display.textContent))
        setDisplay(numberStored)
      }
    }else{// click operator function
      storedCal(input)
    }
  }))