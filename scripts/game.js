function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
    gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'You won! <span id="winner-name">PLAYER NAME</span>';
  gameOverElement.style.display = "none";

  let gameBoardIndex = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameData[i][j] = 0;
      const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
      gameBoardItemElement.textContent = "";
      gameBoardItemElement.classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players!");
    return;
  }

  resetGameStatus();

  activePlayerNameElement.textContent = players[activePlayer].name;
  gameAreaElement.style.display = "block";
}

function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName !== "LI" || gameIsOver) {
    return;
  }

  const selectField = event.target;
  const selectedColumn = selectField.dataset.col - 1;
  const selectedRow = selectField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] !== 0) {
    alert("Please select an empty field!");
    return;
  }

  selectField.textContent = players[activePlayer].symbol;
  selectField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = players[activePlayer].symbol;

  const winnerSymbol = checkForGameOver();
  if (winnerSymbol) {
    endGame(winnerSymbol);
    return;
  }

  currentRound++;
  switchPlayer();
}

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] !== 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][0] === gameData[i][2]
    ) {
      return gameData[i][0];
    }

    if (
      gameData[0][i] !== 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  if (
    gameData[0][0] !== 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[0][0] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  if (
    gameData[0][2] !== 0 &&
    gameData[0][2] === gameData[1][1] &&
    gameData[0][2] === gameData[2][0]
  ) {
    return gameData[0][2];
  }

  if (currentRound === 9) {
    return "draw";
  }

  return null;
}

function endGame(winnerSymbol) {
    gameIsOver = true;
  gameOverElement.style.display = "block";

  if (winnerSymbol === "draw") {
    gameAreaElement.firstElementChild.firstElementChild.textContent =
      "It's a draw!";
  } else {
    const winningPlayer = players.find(
      (player) => player.symbol === winnerSymbol
    );
    gameAreaElement.firstElementChild.firstElementChild.textContent =
      winningPlayer.name + " wins!";
  }
}
