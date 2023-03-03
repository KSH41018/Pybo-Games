const $timer = document.querySelector('#timer');
const $score = document.querySelector('#score');
const $game = document.querySelector('#game');
const $start = document.querySelector('#start');
const $$cells = document.querySelectorAll('.cell');
const $life = document.querySelector('#life');

const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let started = false;
let score = 0;
let time = 0;
let life = 0;
let damege = 0;
let timeId;
let tickId;

$start.addEventListener('click', () => {
  if (started) return;
  started = true;
  time = 60;
  score = 0;
  life = 3;
  damege = 0;
  $life.textContent = '❤'.repeat(life);
  $score.textContent = score;
  console.log('시작');

  timeId = setInterval(() => {
    time = (time * 10 - 1) / 10;
    $timer.textContent = time;
    if (time === 0) {
      setTimeout(() => {
        clearInterval(timeId);
        clearInterval(tickId);
        started = false;
        alert(`게임 오버! 점수는 ${score}점`);
      }, 50);
    }
  }, 100);

  tickId = setInterval(tick, 1000);
  tick();
});

let gopherPercent = 0.3;
let bombPercent = 0.5;

function tick() {
  holes.forEach((hole, index) => {
    if (hole) return;
    const randomValue = Math.random();
    if (randomValue < gopherPercent) {
      const $gopher = $$cells[index].querySelector('.gopher');

      holes[index] = setTimeout(() => {
        $gopher.classList.add('hidden');
        holes[index] = 0;
      }, 1000);
      $gopher.classList.remove('hidden');
    } else if (randomValue < bombPercent) {
      const $bomb = $$cells[index].querySelector('.bomb');
      holes[index] = setTimeout(() => {
        $bomb.classList.add('hidden');
        holes[index] = 0;
      }, 1000);
      $bomb.classList.remove('hidden');
    }
  });
}

$$cells.forEach(($cell, index) => {
  $cell.querySelector('.gopher').addEventListener('click', (event) => {
    if (!event.target.classList.contains('dead')) {
      score++;
      $score.textContent = score;
    }
    event.target.classList.add('dead');
    event.target.classList.add('hidden');
    clearTimeout(holes[index]);
    setTimeout(() => {
      holes[index] = 0;
      event.target.classList.remove('dead');
    }, 1000);
  });

  $cell.querySelector('.bomb').addEventListener('click', (event) => {
    if (!event.target.classList.contains('boom')) {
      life--;
      damege++;
      $life.textContent = '❤'.repeat(life);
      $life.append('♡'.repeat(damege));
    }
    if (damege === 3) {
      setTimeout(() => {
        clearInterval(timeId);
        clearInterval(tickId);
        started = false;
        alert(`게임 오버! 점수는 ${score}점`);
      }, 50);
    }
    event.target.classList.add('boom');
    event.target.classList.add('hidden');
    clearTimeout(holes[index]);
    setTimeout(() => {
      holes[index] = 0;
      event.target.classList.remove('boom');
    }, 1000);
  });
});
