document.addEventListener("DOMContentLoaded", function () {
  let button1 = document.querySelector("#submit-button1");
  let button2 = document.querySelector("#submit-button2");
  let gameStatus = document.querySelector("#game-status");
  let resetButton = document.querySelector("#reset-game");

  let player1, player2, currentPlayer;

  const GameBoard = (function () {
    const rows = 3;
    let gameBoardArray = [];

    const makeCells = function () {
      gameBoardArray = Array(rows)
        .fill()
        .map(() => Array(rows).fill(null));
    };

    const resetBoard = function () {
      makeCells();
      document.querySelectorAll(".columns").forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("winner");
      });
    };

    return { gameBoardArray, makeCells, resetBoard };
  })();

  function Players(name, marker) {
    let score = 0;
    return { name, marker, score };
  }

  function checkWinner(board) {
    const winPatterns = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        board[a[0]][a[1]] &&
        board[a[0]][a[1]] === board[b[0]][b[1]] &&
        board[a[0]][a[1]] === board[c[0]][c[1]]
      ) {
        return { winner: currentPlayer, pattern };
      }
    }

    if (board.every((row) => row.every((cell) => cell !== null))) {
      return { winner: "tie" };
    }

    return null;
  }

  function highlightWinnerCells(pattern) {
    pattern.forEach(([row, col]) => {
      document
        .querySelector(`.columns[data-row="${row}"][data-col="${col}"]`)
        .classList.add("winner");
    });
  }

  function updateGameStatus(result) {
    if (result.winner === "tie") {
      gameStatus.textContent = "It's a tie!";
    } else {
      gameStatus.textContent = `${result.winner.name} wins!`;
      result.winner.score++;
      highlightWinnerCells(result.pattern);
    }
    document
      .querySelectorAll(".columns")
      .forEach((cell) => cell.removeEventListener("click", cellClickHandler));
  }

  function cellClickHandler() {
    let row = parseInt(this.dataset.row);
    let col = parseInt(this.dataset.col);
    if (GameBoard.gameBoardArray[row][col] === null) {
      GameBoard.gameBoardArray[row][col] = currentPlayer.marker;
      this.textContent = currentPlayer.marker;

      let result = checkWinner(GameBoard.gameBoardArray);
      if (result) {
        updateGameStatus(result);
      } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        gameStatus.textContent = `${currentPlayer.name}'s turn`;
      }
    }
  }

  function startGame() {
    if (!player1 || !player2) {
      gameStatus.textContent =
        "Please set both players before starting the game.";
      return;
    }
    GameBoard.resetBoard();
    currentPlayer = player1;
    gameStatus.textContent = `${currentPlayer.name}'s turn`;
    document.querySelectorAll(".columns").forEach((cell) => {
      cell.addEventListener("click", cellClickHandler);
    });
  }

  button1.addEventListener("click", function (event) {
    event.preventDefault();
    let inputName1 = document.getElementById("player-1name");
    let inputSign1 = document.getElementById("player1-sign");
    player1 = Players(inputName1.value, inputSign1.value);
    inputName1.value = "";
    inputSign1.value = "";
    gameStatus.textContent = "Player 1 set. Please set Player 2.";
  });

  button2.addEventListener("click", function (event) {
    event.preventDefault();
    let inputName2 = document.getElementById("player-2name");
    let inputSign2 = document.getElementById("player2-sign");
    player2 = Players(inputName2.value, inputSign2.value);
    inputName2.value = "";
    inputSign2.value = "";
    startGame();
  });

  resetButton.addEventListener("click", function () {
    GameBoard.resetBoard();
    player1 = null;
    player2 = null;
    currentPlayer = null;
    gameStatus.textContent = "Game reset. Please set players again.";
    document.querySelectorAll(".columns").forEach((cell) => {
      cell.removeEventListener("click", cellClickHandler);
    });
  });

  // Initialize the game board
  GameBoard.makeCells();
});