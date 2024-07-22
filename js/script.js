console.log("TEST CONSOLE");

// /_-------------- Constants -------------_/
rollCounter = 0;
// /_---------- Variables (state) ---------_/

const game = {
  players: [
    { Name: "", currLocation: 1, diceRollTotal: 0, bombCounter: 0 },
    { Name: "", currLocation: 1, diceRollTotal: 0, bombCounter: 0 },
  ],
  gridItems: {
    balloon: [19, 28, 55, 65],
    minusMove: [26, 45],
    addMove: [55, 15],
  },
  playerTurn: 1,
  rollNum: ["", ""],
};
let rollTotal = 0;

// /_----- Cached Element References -----_/

// board = {};

const gamePageRoll = document.getElementById("gamePageRollContainer");
const landingPage = document.getElementById("landingPageContainer");
const startGameButton = document.getElementById("startGame");
const submitPlayer1Button = document.getElementById("submitPlayer1");
const submitPlayer2Button = document.getElementById("submitPlayer2");
const greetingPlayer1 = document.getElementById("greetingPlayer1");
const greetingPlayer2 = document.getElementById("greetingPlayer2");
const startPrompt = document.getElementById("startPrompt");
const rollButton = document.getElementById("rollDice");
const diceRolledContainer = document.getElementById("diceRolledContainer");
const diceRolledTotal = document.getElementById("diceRolledTotal");
const triangleLeft = document.getElementById("triangleLeft");
const triangleRight = document.getElementById("triangleRight");
const markerPlayer1 = document.getElementById("markerPlayer1");
const markerPlayer2 = document.getElementById("markerPlayer2");
const gridItems = document.querySelectorAll(".grid-item-fixed");
const currentPositionP1 = document.getElementById("currentPositionP1");
const currentPositionP2 = document.getElementById("currentPositionP2");
const gameMessage = document.getElementById("gameMessage");

// /_---------- Render Functions ---------_/
// Initialisation of the game loading page.

// const init = () => {
//   gamePageRollContainer.style.display = "flex";
//   landingPageContainer.style.display = "none";
//   // diceRolledContainer.style.display = "flex";
//   renderPlayerTurn();
//   moveMarkers();
//   console.log("Marker Moved");
// };

const init = () => {
  gamePageRollContainer.style.display = "flex";
  landingPageContainer.style.display = "none";
  diceRolledContainer.style.display = "none";
  renderPlayerTurn();
  moveMarkers();
};

const render = () => {
  recordPlayerDice();
  diceRolledTotalAnimationOn();
  // renderPlayerTurn();
};
// /_-------------- Functions -------------_/
// handleName1, handleName2 function controls:
// 1. Check that all names are submitted. If empty string submitted, user will be prompt to enter names.
// 2. If all names are submitted, welcome message will appear.
const handleName1 = () => {
  const playerName = document.getElementById("player1NameInput").value;
  if (playerName.placeholder === `Enter Player 1 Name` || playerName === "") {
    greetingPlayer1.textContent = `Please Enter Player 1 Name to Begin!`;
    console.log(greetingPlayer1.textContent);
  } else {
    greetingPlayer1.textContent = `Welcome, ${playerName} !`;
    game.players[0].Name = playerName;
    submitButtons();
  }
  document.getElementById("player1Name").textContent = game.players[0].Name;
};

const handleName2 = () => {
  const playerName = document.getElementById("player2NameInput").value;
  if (playerName.placeholder === `Enter Player 2 Name` || playerName === "") {
    greetingPlayer2.textContent = `Please Enter Player 2 Name to Begin!`;
    console.log(greetingPlayer2.textContent);
  } else {
    greetingPlayer2.textContent = `Welcome, ${playerName} !`;
    game.players[1].Name = playerName;
    submitButtons();
  }
  document.getElementById("player2Name").textContent = game.players[1].Name;
};

// submitButtons function controls:
// 1. Clicked submit button will change color after name input.
const submitButtons = () => {
  if (game.players[0].Name !== "") {
    submitPlayer1Button.style.backgroundColor = "#8045a0";
  }
  if (game.players[1].Name !== "") {
    submitPlayer2Button.style.backgroundColor = "#8045a0";
  }
};

// startGame function controls:
// 1. Check that all names are submitted before startGame can be activated
// 2. If all names are submitted, Game Page will be loaded.
const startGame = () => {
  if (game.players[1].Name === "" || game.players[0].Name === "") {
    startPrompt.textContent = "Please submit all names to START GAME";
    startPrompt.style.color = "Purple";
    startPrompt.style.fontWeight = "Bold";
  } else {
    gamePageRollContainer.style.display = "flex";
    landingPageContainer.style.display = "none";
  }
  checkWinner();
  console.log(game); // check if game object has logged the names
};

//todo PLAYER TURN ========================================================================

// playerTurn function control switch player turn
const playerTurn = () => {
  checkGridItems();
  if (game.playerTurn === 1) {
    game.playerTurn = 2;
  } else {
    game.playerTurn = 1;
  }
  checkWinner();
};

//todo PLAYER TURN ========================================================================

// rollDice function roll dice twice and record the total number in rollTotal

const rollDice = () => {
  rollCounter += 1;
  const rolledNum = Math.floor(Math.random() * 6) + 1;

  //!For First Roll
  if (rollCounter === 1) {
    console.log(`Now is Player ${game.playerTurn} turn to roll dice`);
    game.rollNum[0] = rolledNum;
    document.getElementById(
      "diceRolled"
    ).textContent = `1st Roll: ${rolledNum}`;

    //! For Second Roll
  } else if (rollCounter === 2) {
    game.rollNum[1] = rolledNum;
    document.getElementById(
      "diceRolled"
    ).textContent = `2nd Roll: ${rolledNum}`;
    rollCounter = 0;
    rollTotal = 0;
    for (let i = 0; i < game.rollNum.length; i++) {
      rollTotal += game.rollNum[i];
    }
    recordPlayerDice();
    game.rollNum = ["", ""]; //reset rollNum after every 2 dice rolls.
    console.log(
      `END OF DICE ROLL | Player 1 Rolled Total ${game.players[0].diceRollTotal}`
    );
    console.log(
      `END OF DICE ROLL | Player 2 Rolled Total ${game.players[1].diceRollTotal}`
    );
  }
};

// diceRolledTotalAnimationOn adds total roll number overlay with animation

const diceRolledTotalAnimationOn = () => {
  diceRolledContainer.style.display = "block";
  diceRolledContainer.classList.remove("fadeOut"); // remove the fadeOut in css to remove the effect
  diceRolledContainer.classList.add("fadeIn"); // add the fadeIn in css to remove the effect
  diceRolledTotal.textContent = rollTotal;
  setTimeout(diceRolledTotalAnimationOff, 1500);
};

const diceRolledTotalAnimationOff = () => {
  rollButton.disabled = true;
  diceRolledContainer.classList.remove("fadeIn");
  diceRolledContainer.classList.add("fadeOut");
  //ref https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
  setTimeout(() => {
    playerTurn();
    console.log(
      `END OF DICE ROLL | Player Turn Next, Player ${game.playerTurn}`
    );
    checkGridItems();
    checkWinner();

    setTimeout(() => {
      rollButton.disabled = false;
      console.log("disabled");

      renderPlayerTurn();
    }, 800);

    // renderPlayerTurn();
  }, 500);
};

// renderPlayerTurn render player turn symbol (arrow) on the webpage
const renderPlayerTurn = () => {
  triangleLeft.style.visibility = "visible";
  triangleRight.style.visibility = "hidden";
  console.log("Render Turn Symbol");
  if (game.playerTurn === 1) {
    triangleRight.style.visibility = "hidden";
  } else {
    triangleLeft.style.visibility = "hidden";
    triangleRight.style.visibility = "visible";
  }
};

// recordPlayerDice records the total dice rolled and record in the current location key
const recordPlayerDice = () => {
  if (game.playerTurn === 1) {
    game.players[0].diceRollTotal = rollTotal; //1
    game.players[0].currLocation += rollTotal; //2
    console.log("Player 1 Roll total:", game.players[0].diceRollTotal);
    console.log(game);
    currentPositionP1.textContent = `Player 1, Curr Loc: ${game.players[0].currLocation} , Total Roll: ${rollTotal}`;
    console.log("Player 1 Move :", game.players[0].currLocation);
  } else if (game.playerTurn === 2) {
    game.players[1].diceRollTotal = rollTotal; //1
    game.players[1].currLocation += rollTotal; //2
    console.log("Player 2 Roll total:", game.players[1].diceRollTotal);
    console.log(game);
    currentPositionP2.textContent = `Player 2 Curr Loc: ${game.players[1].currLocation} , Total Roll: ${rollTotal}`;
    console.log("Player 2 Move :", game.players[1].currLocation);
  }
  rollButton.disabled = true;
  diceRolledTotalAnimationOn();
};

// checkWinner check to see if there are winner else continue checking until there is a winner
const checkWinner = () => {
  // console.log(`CHECK WINNER OPERATING`);
  if (game.players[0].currLocation >= gridItems.length) {
    console.log(`Player ${game.players[0].Name} wins!`);
    gameMessage.textContent = `Player 1, ${game.players[0].Name} wins!`;
    moveMarkers();
    rollButton.disabled = true;
  } else if (game.players[1].currLocation >= gridItems.length) {
    console.log(`Player ${game.players[1].Name} wins!`);
    gameMessage.textContent = `Player 2, ${game.players[1].Name} wins!`;
    moveMarkers();
    rollButton.disabled = true;
  } else {
    moveMarkers();
    // console.log("NO WINNER YET");
  }
};

//ref https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
//ref https://medium.com/@belloquadriolawale/the-getboundingclientrect-method-5cd13e206bcf

//renderPlayer1Markers, marker of player 1 is moved here

const renderPlayer1Markers = (position) => {
  if (position > gridItems.length) {
    position = gridItems.length;
  }
  const targetGridItem = document.getElementById(`grid-item-${position}`);
  const target = targetGridItem.getBoundingClientRect();
  // markerPlayer1.style.transition = `linear all .5s`;
  markerPlayer1.style.left = `${target.left}px`;
  markerPlayer1.style.top = `${target.top - 8}px`;
};

//renderPlayer2Markers, marker of player 2 is moved here

const renderPlayer2Markers = (position) => {
  if (position > gridItems.length) {
    position = gridItems.length;
  }
  const targetGridItem = document.getElementById(`grid-item-${position}`);
  const target = targetGridItem.getBoundingClientRect();
  markerPlayer2.style.left = `${target.left + 10}px`;
  markerPlayer2.style.top = `${target.top - 5}px`;
};

//moveMarker, determine when to move the marker

const moveMarkers = () => {
  if (
    game.players[0].currLocation === 1 &&
    game.players[1].currLocation === 1
  ) {
    renderPlayer1Markers(game.players[0].currLocation);
    renderPlayer2Markers(game.players[1].currLocation);
  } else {
    renderPlayer1Markers(game.players[0].currLocation);
    renderPlayer2Markers(game.players[1].currLocation);
  }
};

//checkGridItems, check for availability of grid items to apply

const checkGridItems = () => {
  const currentPlayerIndex = game.playerTurn - 1;
  const currentPlayer = game.players[currentPlayerIndex];

  Object.keys(game.gridItems).forEach((key) => {
    const positions = game.gridItems[key];

    positions.forEach((position) => {
      if (currentPlayer.currLocation === position) {
        switch (key) {
          case "balloon":
            if (currentPlayer.currLocation === 65) {
              currentPlayer.currLocation += 15;
            } else {
              currentPlayer.currLocation += 17;
            }
            console.log(
              `Player ${
                currentPlayerIndex + 1
              } hit a balloon at position ${position}! Moving to ${
                currentPlayer.currLocation
              }.`
            );
            gameMessage.textContent = `${currentPlayer.Name} got a balloon boost!`;
            console.log(`Location After Update: ${currentPlayer.currLocation}`);
            break;
        }
      }
    });
  });
  checkWinner();
};

// /_----------- Event Listeners ----------_/

startGameButton.addEventListener("click", () => {
  console.log("Start Button Pressed");
  startGame();
});

submitPlayer1Button.addEventListener("click", () => {
  handleName1();
});

submitPlayer2Button.addEventListener("click", () => {
  handleName2();
});

rollButton.addEventListener("click", () => {
  rollDice();
});

//Noticing that afer window resizing the marker will misalign with gridItems therefore
//we need to listen for moveMarker after every window resize to ensure the marker is aligned to the grid
window.addEventListener("resize", () => {
  moveMarkers();
  console.log("resizing browser");
});

init();

// ===================================== CSS =========================================

//ref : https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle

const getGridSize = (container, gridSystem) => {
  const gridContainer = document.querySelector(container);
  if (gridContainer) {
    const style = getComputedStyle(gridContainer);
    const gridValue = style.getPropertyValue(gridSystem);

    // Extract "repeat(9, 1fr)")
    const getX = gridValue.match(/repeat\((\d+),/);
    if (getX) {
      return parseInt(getX[1], 10); // Convert the matched string to an integer
    }
  }
};

const numberOfColumns = getGridSize("#grid-container", "grid-template-columns");
const totalGrid = numberOfColumns ** 2;
const borderStyle = "4px solid white";

const applyWall = (borderStyle, totalGrid) => {
  for (let i = 1; i <= totalGrid; i++) {
    if (i % Math.sqrt(totalGrid) !== 0) {
      const item = `#grid-item-${i}`;
      const element = document.querySelector(item);
      if (element) {
        element.style.borderTop = borderStyle;
      }
    }
  }
};

applyWall(borderStyle, totalGrid);

//============================== Apply Styles to Grid Items ==========================

const applyStylesToGridItems = () => {
  const gridItemIds = [
    "grid-item-19",
    "grid-item-28",
    "grid-item-55",
    "grid-item-65",
  ];

  gridItemIds.forEach((index) => {
    const element = document.getElementById(index);
    if (element) {
      element.style.background =
        "url('css/assets-game/balloon.png') no-repeat center center";
      element.style.backgroundSize = "35px 35px";
      element.style.backgroundColor = "pink";
      element.style.color = "transparent";
    }
  });
};

applyStylesToGridItems();

// ========================= TEST LOG ==========================
console.log("PlayerTurn Now is:", game.playerTurn); // Output: 9
