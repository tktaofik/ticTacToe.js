const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const player = { x: 'x', o: 'o' }
let plays = 1;
let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];

function play(user) {
  if (plays == 9){
    restartGame()
  }
  displayBoard();

  let row, col;
  rl.question('Enter your row index: ', (input) => {
    row = input;
    rl.question('Enter your column index: ', (input) => {
      col = input;
      game(user, row, col)
    });
  });
}

function restartGame(){
  board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
}

function displayBoard() {
  console.log(`\n`)
  for (let i = 0; i < 3; i++) {
    console.log(`${board[i][0]}|${board[i][1]}|${board[i][2]}`)
    if (i == 0 || i == 1) {
      console.log(`_ _ _`)
    }
  }
  console.log(`\n`)
}

function game(user, row, col) {
  if (row <= 2 && row >= 0 && col <= 2 && col >= 0 && board[row][col] == " ") {
    if (user === player.x) {
      board[row][col] = player.x;
    }
    else if (user === player.o) {
      board[row][col] = player.o
    }

    let gameWon = isGameWon(user)
    if (!gameWon) {
      user = user === player.x ? player.o : player.x
      plays ++;
      play(user);
    }
    else {
      displayBoard()
      console.log('\n ## Game won by ' + user + ' ##');
      rl.close();
    }
  }
  else {
    console.log('\n ## Try again space occupied / wrong index entered ##')
    play(user);
  }
}

function isGameWon(user) {
  // Row Set
  for (let row = 0; row < 3; row++) {
    let rowSet = [];
    for (let col = 0; col < 3; col++) {
      rowSet.push(board[row][col]);
    }
    if (rowSet.every(r => r === user)) { return true }
  }

  // Column Set
  for (let col = 0; col < 3; col++) {
    let colSet = [];
    for (let row = 0; row < 3; row++) {
      colSet.push(board[row][col]);
    }
    if (colSet.every(r => r === user)) { return true }
  }

  // Diagonal Set
  let diagonal1 = [];
  let diagonal2 = [];
  for (let i = 0; i < 3; i++) {
    diagonal1.push(board[i][2 - i]);
    diagonal2.push(board[i][i]);
  }
  if (diagonal1.every(r => r === user)) { return true }
  if (diagonal2.every(r => r === user)) { return true }

  return false
}

play(player.x);
