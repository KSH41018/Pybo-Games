let numOne = '';
let operator = '';
let numTwo = '';
let negative = '';

const $operator = document.querySelector('#operator');
const $result = document.querySelector('#result');

const onClickNumber = (event) => {
  if (!operator) {
    //연산자가 비었을 떄
    numOne += negative + event.target.textContent;
    $result.value += negative + event.target.textContent;
    negative = '';
    return;
  }
  if (!numTwo) {
    // 두번째 숫자가 입력되지 않았는가
    $result.value = '';
  }
  numTwo += event.target.textContent;
  $result.value += event.target.textContent;
};

document.querySelector('#num-0').addEventListener('click', onClickNumber);
document.querySelector('#num-1').addEventListener('click', onClickNumber);
document.querySelector('#num-2').addEventListener('click', onClickNumber);
document.querySelector('#num-3').addEventListener('click', onClickNumber);
document.querySelector('#num-4').addEventListener('click', onClickNumber);
document.querySelector('#num-5').addEventListener('click', onClickNumber);
document.querySelector('#num-6').addEventListener('click', onClickNumber);
document.querySelector('#num-7').addEventListener('click', onClickNumber);
document.querySelector('#num-8').addEventListener('click', onClickNumber);
document.querySelector('#num-9').addEventListener('click', onClickNumber);

const onClickOperator = (op) => () => {
  if (numTwo) {
    ////////////더하기/////////////
    if (operator === '+') {
      $result.value = parseInt(numOne) + parseInt(numTwo);
      operator = op;
    }

    ////////////빼기/////////////
    if (operator === '-') {
      $result.value = numOne - numTwo;
      operator = op;
    }

    ////////////나누기/////////////
    if (operator === '/') {
      $result.value = numOne / numTwo;
      operator = op;
    }

    ////////////곱하기/////////////
    if (operator === 'x') {
      $result.value = numOne * numTwo;
      operator = op;
    }
  } else if (numOne) {
    operator = op;
    $operator.value = op;
  }
  if (!numOne && op === '-') {
    negative = op;
  }

  numOne = $result.value;
  numTwo = '';
};

document.querySelector('#plus').addEventListener('click', onClickOperator('+'));
document
  .querySelector('#minus')
  .addEventListener('click', onClickOperator('-'));
document
  .querySelector('#divide')
  .addEventListener('click', onClickOperator('/'));
document
  .querySelector('#multiply')
  .addEventListener('click', onClickOperator('x'));

document.querySelector('#calculate').addEventListener('click', () => {
  if (numTwo) {
    ////////////더하기/////////////
    if (operator === '+') {
      $result.value = parseInt(numOne) + parseInt(numTwo);
    }

    ////////////빼기/////////////
    if (operator === '-') {
      $result.value = numOne - numTwo;
    }

    ////////////나누기/////////////
    if (operator === '/') {
      $result.value = numOne / numTwo;
    }

    ////////////곱하기/////////////
    if (operator === 'x') {
      $result.value = numOne * numTwo;
    }
  } else {
    alert('숫자를 먼저 입력하세요');
  }
  numOne = $result.value;
  numTwo = '';
  operator = '';
  $operator.value = '';
  negative = '';
});

document.querySelector('#clear').addEventListener('click', () => {
  numOne = '';
  operator = '';
  numTwo = '';
  negative = '';
  $result.value = '';
  $operator.value = '';
});

// document.querySelector('#q').addEventListener('click', () => {
//   console.log(`연산자 : ${operator}`);
//   console.log(`값 1 : ${numOne}`);
//   console.log(`값 2 : ${numTwo}`);
//   console.log(`음수 확인 : ${negative}`);
//   console.log(`화면 값 : ${$result.value}`);
// });
