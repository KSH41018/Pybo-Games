const number = Number(prompt('몇 명이 참가하시나요?'));
const $button = document.querySelector('button');
const $input = document.querySelector('input');
const $word = document.querySelector('#word');
const $order = document.querySelector('#order');

let word; //제시어
let newWord; //입력어
const onClickButton = () => {
  if (!word || word[word.length - 1] === newWord[0]) {
    // 제시어가 비었거나 제시어와 입력어가 제대로 입력 되었는가
    word = newWord;
    $word.textContent = word;
    const order = Number($order.textContent);

    if (order + 1 > number) {
      // 순서가 number보다 큰가?
      $order.textContent = 1; // 순서를 첫번째로 바꾼다.
    } else {
      $order.textContent = order + 1; //다음 순서로 넘긴다.
    }
  } else {
    alert('올바르지 않은 단어입니다.'); //제시어와 입력어가 제대로 되지 않음
  }
  $input.value = '';
  $input.focus();
};
const onInput = (event) => {
  newWord = event.target.value;
};

$button.addEventListener('click', onClickButton);
$input.addEventListener('input', onInput);
