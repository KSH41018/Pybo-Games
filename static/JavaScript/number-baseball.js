const $input = document.querySelector('#input');
const $form = document.querySelector('#form');
const $logs = document.querySelector('#logs');

const numbers = []; //// 1~9의 베열 생성
for (let n = 0; n < 9; n++) {
  numbers.push(n + 1);
}

const answer = []; //// 정답 생성
for (let n = 0; n < 4; n++) {
  const index = Math.floor(Math.random() * numbers.length);
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}
console.log(answer);

const tries = [];
function checkInput(input) {
  //// 검사 시작
  if (input.length !== 4) {
    return alert('4자리 숫자를 입력해주세요.');
  }
  if (new Set(input).size !== 4) {
    return alert('중복되지 않게 입력해 주세요');
  }
  if (tries.includes(input)) {
    return alert('이미 시도한 값 입니다.');
  }
  return true;
} //// 검사 끝

let out = 0;

function defeated() {
  const message = document.createTextNode(`패배! 정답은 ${answer.join('')}`);
  $logs.appendChild(message);
}
$form.addEventListener('submit', (event) => {
  //// 입력 완료 후 버튼 클릭
  event.preventDefault();
  const value = $input.value;
  $input.value = '';
  if (!checkInput(value)) {
    return;
  }
  if (answer.join('') === value) {
    $logs.textContent = '홈런!';
    return;
  }
  if (tries.length >= 9) {
    defeated();
    return;
  }
  let strike = 0;
  let ball = 0;
  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]);
    if (index > -1) {
      if (index === i) {
        strike += 1;
      } else {
        ball += 1;
      }
    }
  }
  if (strike === 0 && ball === 0) {
    out++;
    $logs.append(`${value} ${out} 아웃!`, document.createElement('br'));
  } else {
    $logs.append(
      `${value}: ${strike} 스트라이크 ${ball} 볼`,
      document.createElement('br')
    );
  }

  if (out === 3) {
    defeated();
    return;
  }
  tries.push(value);
});
