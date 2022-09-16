const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
let canvas;
function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
}

const boardArea = (canvasWidth / 3.14);
const cellSize = boardArea / 3;
const X = canvasHeight / 2 - boardArea / 2;
const Y = canvasWidth / 2 - boardArea / 2;
let nextPlayer;
const playerX = 'X';
const playerO = 'O';
nextPlayer = playerO;
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]
let winner = null;

function draw() {
  fill(255)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (j !== 0) {
        line(Y + cellSize * j, X, Y + cellSize * j, X + boardArea)
      }
    }
    if (i !== 0)
      line(Y, X + cellSize * i, Y + boardArea, X + cellSize * i)
  }
  canvas.mouseClicked(() => {
    const x = mouseX;
    const y = mouseY;
    const j = Math.floor((x - Y) / cellSize);
    const i = Math.floor((y - X) / cellSize);
    if (isPositionAvailable(x, y) && !board[i][j] && winner == null) {
      strokeWeight(2)
      if (nextPlayer === playerO) {
        nextPlayer = playerX;
        board[i][j] = playerO;
        const x = Y + (cellSize * j) + cellSize / 2;
        const y = X + (cellSize) * i + (cellSize / 2);
        const radius = cellSize / 2
        ellipse(x, y, radius)
      } else {
        const x1 = (Y + cellSize * j) + cellSize / 4;
        const y1 = (X + cellSize * i) + cellSize / 4;
        const x2 = x1 + cellSize / 2;
        const y2 = y1 + cellSize / 2;
        line(x1, y1, x2, y2);
        line(x2, y1, x1, y2);
        nextPlayer = playerO;
        board[i][j] = playerX;
      }
      strokeWeight(0)

    }
    winner = checkWinner();
    if (winner && winner !== 'tie') {
      alert(`${winner} is the Winner`)
    }
  })
}

const checkWinner = () => {
  // Horizontal  
  if (equals3(board[0][0], board[0][1], board[0][2])) {
    winner = board[0][0];
  }
  if (equals3(board[1][0], board[1][1], board[1][2])) {
    winner = board[1][0];
  }
  if (equals3(board[2][0], board[2][1], board[2][2])) {
    winner = board[2][0];
  }

  // Vertical 
  if (equals3(board[0][0], board[1][0], board[2][0])) {
    winner = board[0][0];
  }
  if (equals3(board[0][1], board[1][1], board[2][1])) {
    winner = board[0][1];
  }
  if (equals3(board[0][2], board[1][2], board[2][2])) {
    winner = board[0][2];
  }

  // diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[0][2], board[1][1], board[2][0])) {
    winner = board[0][2];
  }
  return winner === "" ? null : winner;
}

function equals3(a, b, c) {
  return a == b && b == c;
}
function isPositionAvailable(x, y) {
  if (x >= Y && y >= X && x <= boardArea + Y && y <= boardArea + X) {
    return true
  }
}