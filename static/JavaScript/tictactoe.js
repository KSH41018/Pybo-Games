const { body } = document; // 구조분해 할당
const $table = document.createElement('table');
const $result = document.createElement('div');
let turn = 'O';
const rows = [];

const checkWinner = (target) => {
  let rowIndex = target.parentNode.rowIndex;
  let cellIndex = target.cellIndex;
  let hasWinner = false;

  if (
    /// 가로줄 검사
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = turn;
  }

  if (
    /// 세로줄 검사
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = turn;
  }

  if (
    /// 대각선 검사 1
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = turn;
  }

  if (
    // 대각선 검사 2
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }
  return hasWinner;
};

const checkWinnerAndDraw = (terget) => {
  const hasWinner = checkWinner(event.target);
  // 승자가 있으면
  if (hasWinner) {
    $result.textContent = `${turn}님이 승리!`;
    $table.removeEventListener('click', callback);
    return;
  }

  //무승부 조건
  let draw = rows
    .flat() /*n차원 배열을 n-1 차원 배열로 바꾼다. (1차원은 이거 해도 1차원)*/
    .every((cell) => cell.textContent); // 하나라도 false가 나오면 중단하고 false 출력
  //some 하나라도 true가 나오면 중단하고 true 출력

  if (draw) {
    $result.textContent = '무승부';
    $table.removeEventListener('click', callback);
    return;
  } // 턴 넘기기
  turn = turn === 'O' ? 'X' : 'O';
};

let clickable = true;
const callback = (event) => {
  if (!clickable) {
    return;
  }
  if (event.target.textContent !== '') {
    console.log('빈칸이 아닙니다.');
    return;
  }
  // 빈칸이면
  console.log('빈칸입니다');
  event.target.textContent = turn;
  checkWinnerAndDraw(event.target);

  // 컴퓨터 턴
  if (turn === 'X') {
    const emptyCells = rows.flat().filter((v) => !v.textContent); //filter 조건에 해당하는 것들을 걸러내줌
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    clickable = false;
    setTimeout(() => {
      randomCell.textContent = 'X';
      clickable = true;
    }, 1000);
    checkWinnerAndDraw(event.target);
  }
};

for (let i = 0; i < 3; i++) {
  const $tr = document.createElement('tr');
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement('td');
    cells.push($td);
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}

$table.addEventListener('click', callback); // 이벤트 버블링 : 이벤트가 발생할 때 부모 태그에도 순차적으로 동일한 이벤트가 발생  이벤트 버블링 막는 방법 : event.stopPropagation
//이벤트 켑쳐링 : 이벤트가 발생할 때 자식 태그에 전달
body.append($table);
body.append($result);
