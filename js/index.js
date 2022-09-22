let runningTotal = 0;
let buffer = "0";
let operation = "0"; //whats on screen
let previousOperator = null;

const screen = document.querySelector('.result');
const upperScreen = document.querySelector('.equation');


function buttonClick(value) {
  
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
  upperScreen.innerText = operation;

  console.log(value);
  console.log('runningTotal', runningTotal);
}



function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;

    

      operation = operation+numberString;
    
   
    
  } else {
    buffer += numberString;
    operation += numberString;
    
  }
 
  // screen.innerText = buffer;
}



function handleSymbol(symbol) {
  
  if (symbol === 'AC') {
    buffer = '0';
    operation = '0';
    runningTotal = 0;
  }

  switch (symbol) {
    case 'AC':
    
       //delete
      buffer = '0';
      operation = '0';
      runningTotal = 0;
      break;

      case '↼':
    if(buffer.length === 1){
      buffer = '0';
    } else{
      buffer = buffer.substring(0, buffer.length - 1);
      operation = operation.substring(0, operation.length - 1);
    }
      break;

    case '+':
    case '×':
    case '÷':
    case '-':
      handleMath(symbol);
      break;

    case"=":
      if (previousOperator === null){
        operation = '0';
        return;
      }

      flushOperation(parseInt(buffer));
      previousOperator = null;
      operation = operation + '=' + runningTotal;
      buffer = runningTotal;
      runningTotal = 0;
      
      break;
    }
}


function handleMath(symbol){
  
  if(buffer === '0'){
    //do nothing
    return;
  }
  
  const intBuffer = parseInt(buffer); //shorthand just works with +buffer
 
  if (runningTotal === 0){
    runningTotal = intBuffer;
  } else {
flushOperation(intBuffer);
  }

  operation = operation + symbol;

  previousOperator = symbol;

  
  buffer = '0';
  
}

function flushOperation(intBuffer){

  if(previousOperator === '+'){
    runningTotal += intBuffer;
  } else if (previousOperator === '-'){
    runningTotal -= intBuffer;}
    else if (previousOperator === '×'){
      runningTotal *= intBuffer;}
      else if (previousOperator === '÷'){
        runningTotal /= intBuffer;}


        console.log('runningTotal', runningTotal);
       
      }



function init() {

  document.querySelector('.calc-buttons')
    .addEventListener('click', function (event) {

      buttonClick(event.target.innerText);
    })

}

init();


{/* <input placeholder="type into me!" class="input-to-copy" />
<p class="p-to-copy-to">Nothing has happened yet.</p>
<script>
  const input = document.querySelector('.input-to-copy');
  const paragraph = document.querySelector('.p-to-copy-to');

  input.addEventListener("keyup", function() {
    paragraph.innerText  = input.value;
  });
</script> */}