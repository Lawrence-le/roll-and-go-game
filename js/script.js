console.log("TEST CONSOLE");

// // /_-------------- Constants -------------_/

// // /_---------- Variables (state) ---------_/

const game = {
  players: [
    { Player1: "", currLocation: 0 },
    { Player2: "", currLocation: 0 },
  ],
  playerTurn: 0,
  rollNum: ["", ""],
};

// // /_----- Cached Element References -----_/

// board = {};

const gamePageRoll = document.getElementById("gamePageRollContainer");
const landingPage = document.getElementById("landingPageContainer");
const startGameButton = document.getElementById("startGame");
const submitPlayer1Button = document.getElementById("submitPlayer1");
const submitPlayer2Button = document.getElementById("submitPlayer2");
const greetingPlayer1 = document.getElementById("greetingPlayer1");
const greetingPlayer2 = document.getElementById("greetingPlayer2");
const startPrompt = document.getElementById("startPrompt");

// // /_---------- Render Functions ---------_/

// render();

// // /_-------------- Functions -------------_/

// handleClick();
// handleNameSubmission();
// checkWin();

// resetGame();
// rollDice();

const init = () => {
  gamePageRollContainer.style.display = "none";
  landingPageContainer.style.display = "flex";
  //   render();
};

// const init = () => {
//   gamePageRollContainer.style.display = "flex";
//   landingPageContainer.style.display = "none";
//   //   render();
// };

const handleName1 = () => {
  const playerName = document.getElementById("player1NameInput").value;
  if (playerName.placeholder === `Enter Player 1 Name` || playerName === "") {
    greetingPlayer1.textContent = `Please Enter Player 1 Name to Begin!`;
    console.log(greetingPlayer1.textContent);
  } else {
    greetingPlayer1.textContent = `Welcome, ${playerName} !`;
    game.players[0].Player1 = playerName;
    submitButtons();
  }
  document.getElementById("player1Name").textContent = game.players[0].Player1;
  console.log("Player 1 is", game.players[0].Player1);
  console.log(
    "Player 1 game page is",
    document.getElementById("player1Name").textContent
  );
};

const handleName2 = () => {
  const playerName = document.getElementById("player2NameInput").value;
  if (playerName.placeholder === `Enter Player 2 Name` || playerName === "") {
    greetingPlayer2.textContent = `Please Enter Player 2 Name to Begin!`;
    console.log(greetingPlayer2.textContent);
  } else {
    greetingPlayer2.textContent = `Welcome, ${playerName} !`;
    game.players[1].Player2 = playerName;
    submitButtons();
  }
  document.getElementById("player2Name").textContent = game.players[1].Player2;
  console.log("Player 2 is", game.players[1].Player2);
  console.log(
    "Player 2 game page is",
    document.getElementById("player2Name").textContent
  );
};

const startGame = () => {
  console.log(game.players[1].Player2);
  if (game.players[1].Player2 === "" || game.players[0].Player1 === "") {
    startPrompt.textContent = "Please submit all names to START GAME";
    startPrompt.style.color = "Purple";
    startPrompt.style.fontWeight = "Bold";
  } else {
    gamePageRollContainer.style.display = "flex";
    landingPageContainer.style.display = "none";
  }
};

const submitButtons = () => {
  if (game.players[0].Player1 !== "") {
    submitPlayer1Button.style.backgroundColor = "#8045a0";
  }
  if (game.players[1].Player2 !== "") {
    submitPlayer2Button.style.backgroundColor = "#8045a0";
  }
};

// /_----------- Event Listeners ----------_/

startGameButton.addEventListener("click", () => {
  console.log("Start Button Pressed");
  startGame();
});

submitPlayer1Button.addEventListener("click", () => {
  console.log("Player 1 Submit button clicked!");
  handleName1();
});

submitPlayer2Button.addEventListener("click", () => {
  console.log("Player 2 Submit button clicked!");
  handleName2();
});

init();
