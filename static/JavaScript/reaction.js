const $screen = document.querySelector('#screen');
const $result = document.querySelector('#result');

let startTime;
let endTime;
let timeoutId;
const record = [];
$screen.addEventListener('click', (event) => {
  if (event.target.classList.contains('waiting')) {
    $screen.classList.remove('waiting');
    $screen.classList.add('ready');
    $screen.textContent = '초록색이 되면 클릭하세요';
    timeoutId = setTimeout(function () {
      startTime = new Date();
      $screen.classList.remove('ready');
      $screen.classList.add('now');
      $screen.textContent = '클릭하세요!';
    }, Math.floor(Math.random() * 1000) + 2000);
  } else if (event.target.classList.contains('ready')) {
    clearTimeout(timeoutId);
    $screen.classList.remove('ready');
    $screen.classList.add('waiting');
    $screen.textContent = '너무 성급하시군요!';
  } else if (event.target.classList.contains('now')) {
    endTime = new Date();
    const time = endTime - startTime;
    record.push(time);
    const average = record.reduce((a, b) => a + b) / record.length;
    $result.textContent = `현재 ${time}ms, 평균 : ${average}ms`;
    const topFive = record.sort((a, b) => a - b).slice(0, 5);
    topFive.forEach((top, index) => {
      $result.append(document.createElement('br'), `${index + 1}위: ${top}ms`);
    });
    startTime = null;
    endTime = null;
    $screen.classList.remove('now');
    $screen.classList.add('waiting');
    $screen.textContent = '클릭해서 시작하세요';
  }
});
