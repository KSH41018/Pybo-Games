const $timer = document.querySelector('#timer');
const $tbody = document.querySelector('#table tbody');
const $result = document.querySelector('#result');
const $form = document.querySelector('#form');

const CODE = {
  NOMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  MINE: -6,
  OPENED: 0,
};

let data;
let row;
let cell;
let mine;
let interval;
let startTime;
let openCount;

$form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  row = parseInt(event.target.row.value);
  cell = parseInt(event.target.cell.value);
  mine = parseInt(event.target.mine.value);
  openCount = 0;
  $tbody.innerHTML = '';
  drawTable();
  firstClick = true;
  searched = null;
  normalCellFound = false;
  startTime = new Date();
  interval = setInterval(() => {
    const time = Math.floor((new Date() - startTime) / 1000);
    $timer.textContent = `${time}초`;
  }, 1000);
}

function plantMine() {
  const candidata = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });
  const shffle = [];
  while (candidata.length > row * cell - mine) {
    const chosen = candidata.splice(
      Math.floor(Math.random() * candidata.length),
      1
    )[0];
    shffle.push(chosen);
  }

  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NOMAL);
    }
  }

  //// ex) shffle = [12,14,72] cell = 10 floor = 소수점 이하 버림
  for (let k = 0; k < shffle.length; k++) {
    const ver = Math.floor(shffle[k] / cell); ///// 12 / 10 = floor(1.2) => 1번째
    const hor = shffle[k] % cell; /////////// 12/10 나머지 => 2번째
    data[ver][hor] = CODE.MINE;
  }
  return data;
}

let normalCellFound = false;
let searched;
let firstClick = true;
function transferMine(rI, cI) {
  if (normalCellFound) return; // 이미 빈칸을 찾았으면 종료
  if (rI < 0 || rI >= row || cI < 0 || cI >= cell) return;
  if (searched[rI][cI]) return; //이미 찾은 칸이면 종료
  if (data[rI][cI] === CODE.NOMAL) {
    //빈칸인 경우
    normalCellFound = true;
    data[rI][cI] = CODE.MINE;
  } else {
    //지뢰 칸인 경우 8방향 탐색
    searched[rI][cI] = true;
    transferMine(rI - 1, cI - 1);
    transferMine(rI - 1, cI);
    transferMine(rI - 1, cI + 1);
    transferMine(rI, cI - 1);
    transferMine(rI, cI + 1);
    transferMine(rI + 1, cI - 1);
    transferMine(rI + 1, cI);
    transferMine(rI + 1, cI + 1);
  }
}

function onRightClick(event) {
  event.preventDefault();
  const target = event.target; /// 누른 칸
  const rowIndex = target.parentNode.rowIndex; /// 누른 칸의 부모 중 row값
  const cellIndex = target.cellIndex; /// 누른 칸의 cell 값
  const cellData = data[rowIndex][cellIndex]; /// row 값과 cell 값으로 2차원 배열에서 출력해와 celldata에 넣음

  /////////우클릭 -> ? -> ! -> '' 순으로 반복
  if (cellData === CODE.MINE) {
    ////////// 지뢰일 경우
    data[rowIndex][cellIndex] = CODE.QUESTION_MINE;
    target.className = 'question';
    target.textContent = '?';
  } else if (cellData === CODE.QUESTION_MINE) {
    ////////// 물음표 지뢰일 경우
    data[rowIndex][cellIndex] = CODE.FLAG_MINE;
    target.className = 'flag';
    target.textContent = '!';
  } else if (cellData === CODE.FLAG_MINE) {
    ////////////// 깃발 지뢰일 경우
    data[rowIndex][cellIndex] = CODE.MINE;
    target.className = '';
    target.textContent = '';
  } else if (cellData === CODE.NOMAL) {
    ////////// 기본 칸일 경우
    data[rowIndex][cellIndex] = CODE.QUESTION;
    target.className = 'question';
    target.textContent = '?';
  } else if (cellData === CODE.QUESTION) {
    ////////// 물음표일 경우
    data[rowIndex][cellIndex] = CODE.FLAG;
    target.className = 'flag';
    target.textContent = '!';
  } else if (cellData === CODE.FLAG) {
    ////////////// 깃발일 경우
    data[rowIndex][cellIndex] = CODE.NOMAL;
    target.className = '';
    target.textContent = '';
  }
}

function countMine(rowIndex, cellIndex) {
  //// 주변 지뢰 확인
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  let i = 0;
  /////includes === 랑 같은 역할
  ////
  //// 1) 1  2  3 row +1 , cell +1, 0, -1
  //// 2) 1 /2/ 3 row cell +1, -1
  //// 3) 1  2  3 row -1 cell +1, 0, -1
  for (r = 1; r > -2; r--) {
    for (c = 1; c > -2; c--) {
      mines.includes(data[rowIndex + r]?.[cellIndex + c]) && i++;
    }
  }
  return i;
}

function open(rowIndex, cellIndex) {
  if (data[rowIndex]?.[cellIndex] >= CODE.OPENED) return;
  const target = $tbody.children[rowIndex]?.children[cellIndex];
  if (!target) {
    return;
  }
  const count = countMine(rowIndex, cellIndex);
  target.textContent = count || '';
  target.className = 'opened';
  data[rowIndex][cellIndex] = count;
  openCount++;
  console.log(openCount);

  if (openCount === row * cell - mine) {
    time = (new Date() - startTime) / 1000;
    clearInterval(interval);
    $tbody.removeEventListener('contextmenu', onRightClick);
    $tbody.removeEventListener('click', onLeftClick);
    setTimeout(() => {
      alert(`승리했습니다! ${time}초가 걸렸습니다.`);
    }, 500);
  }
  return count;
}

function openAround(rI, cI) {
  setTimeout(() => {
    const count = open(rI, cI);
    if (count === 0) {
      openAround(rI - 1, cI - 1);
      openAround(rI - 1, cI);
      openAround(rI - 1, cI + 1);
      openAround(rI, cI - 1);
      openAround(rI, cI + 1);
      openAround(rI + 1, cI - 1);
      openAround(rI + 1, cI);
      openAround(rI + 1, cI + 1);
    }
  }, 0);
}

function showMines() {
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  data.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (mines.includes(cell)) {
        $tbody.children[rowIndex].children[cellIndex].textContent = 'X';
      }
    });
  });
}

function onLeftClick(event) {
  const target = event.target; /// 누른 칸
  const rowIndex = target.parentNode.rowIndex; /// 누른 칸의 부모 중 row값
  const cellIndex = target.cellIndex; /// 누른 칸의 cell 값
  let cellData = data[rowIndex][cellIndex]; /// row 값과 cell 값으로 2차원 배열에서 출력해와 celldata에 넣음

  if (firstClick) {
    firstClick = false;
    searched = Array(row)
      .fill()
      .map(() => []);
    if (cellData === CODE.MINE) {
      //첫 클릭이 지뢰면
      transferMine(rowIndex, cellIndex); //지뢰 옮기기
      data[rowIndex][cellIndex] = CODE.NOMAL; //지금 칸을 빈칸으로
      cellData = CODE.NOMAL;
    }
  }

  if (cellData === CODE.NOMAL) {
    openAround(rowIndex, cellIndex);
  } else if (cellData === CODE.MINE) {
    showMines();
    target.textContent = '펑';
    target.className = 'opened_mine';
    clearInterval(interval);
    $tbody.removeEventListener('contextmenu', onRightClick);
    $tbody.removeEventListener('click', onLeftClick);
  }
}

function drawTable() {
  data = plantMine();
  data.forEach((row) => {
    const $tr = document.createElement('tr');
    row.forEach((cell) => {
      const $td = document.createElement('td');
      if (cell === CODE.MINE) {
        // $td.textContent = 'X'; //////// 나중에 주석 처리
      }
      $tr.append($td);
    });
    $tbody.append($tr);
    $tbody.addEventListener('contextmenu', onRightClick);
    $tbody.addEventListener('click', onLeftClick);
  });
}
