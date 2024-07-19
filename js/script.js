console.log("TEST CONSOLE");

// // /_-------------- Constants -------------_/

// // /_---------- Variables (state) ---------_/

// const game = {
//   players: [
//     { name: "", currLocation: 0 },
//     { name: "", currLocation: 0 },
//   ],
//   playerTurn: 0,
//   rollNum: 0,
// };

// // /_----- Cached Element References -----_/

// board = {};

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

const startGame = () => {};

// /_----------- Event Listeners ----------_/

const gamePageRoll = document.getElementById("gamePageRollContainer");
const landingPage = document.getElementById("landingPageContainer");
const startGameButton = document.getElementById("startGame");

startGameButton.addEventListener("click", () => {
  gamePageRollContainer.style.display = "flex";
  landingPageContainer.style.display = "none";
  console.log("button pressed");
});

init();
