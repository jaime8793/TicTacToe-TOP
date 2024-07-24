const GameBoard = (function () {
  const rows = 3;
  let gameBoardArray = [];

  const makeCells = function () {
    for (i = 0; i < rows; i++) {
      let array = [3, 3, 3];
      gameBoardArray.push(array);
    }
  };
  return { gameBoardArray, makeCells };
})();

const Players = function (name, marker) {
  let score = 0;
  function increaseScore() {
    score++;
    return score;
  }
  function decreaseScore() {
    score--;
    return score;
  }
  return { name, marker, increaseScore, decreaseScore };
};

const CellChoice = (function () {
  GameBoard.makeCells();
  //console.log(GameBoard.gameBoardArray);
  console.log(GameBoard.gameBoardArray[0][1]);
  const chooseCell = function (array, index, marker) {
    if (GameBoard.gameBoardArray[array].index !== 3) {
      console.log("Already used that cell");
    } else {
      return GameBoard.gameBoardArray[array].splice(index, 1, marker);
    }
  };
  return { chooseCell };
})();

const CheckWinner = (function () {
  if (GameBoard.gameBoardArray[0][1] === GameBoard.gameBoardArray[array] || GameBoard.gameBoardArray[array].index || GameBoard.gameBoardArray[array].index) {
    
  } else if (GameBoard.gameBoardArray[array].index || GameBoard.gameBoardArray[array].index ) {
    
  }
}
return{}
)()

function playGame() {
  let Player1 = Players(
    prompt("Please enter your name"),
    prompt("please choose your sign ")
  );
  let Player2 = Players(
    prompt("Please enter your name"),
    prompt("please choose your sign ")
  );
  console.log(Player1);
  console.log(Player2);
  for (i = 1; i <= 9; i++) {
    if (i % 2 === 0) {
      CellChoice.chooseCell(
        prompt("which row?"),
        prompt("Which index?"),
        Player1.marker
      );
      console.log(GameBoard.gameBoardArray);
    } else {
      CellChoice.chooseCell(
        prompt("which row?"),
        prompt("Which index?"),
        Player2.marker
      );
      console.log(GameBoard.gameBoardArray);
    }
    console.log(GameBoard.gameBoardArray);
  }
}

playGame();
//playGame.chooseCell(1, 1);
//console.log(GameBoard.gameBoardArray);
