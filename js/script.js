console.log("TEST CONSOLE");

// /_-------------- Constants -------------_/
rollCounter = 0;
// /_---------- Variables (state) ---------_/

const game = {
  players: [
    { Name: "", currLocation: 1, diceRollTotal: 0 },
    { Name: "", currLocation: 1, diceRollTotal: 0 },
  ],
  gridItems: {
    balloon: [19, 28, 55, 65],
    bomb: [8, 35, 56, 78],
    nuclearBomb: [80],
    grenade: [16, 24, 50, 76],
  },
  playerTurn: 1,
  rollNum: ["", ""],
};
let rollTotal = 0;

// /_----- Cached Element References -----_/

// board = {};

const resetButton = document.getElementById("resetGame");
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
const gameMessageA = document.getElementById("gameMessageA");
const diceResultP1round1 = document.getElementById("diceResultP1round1");
const diceResultP1round2 = document.getElementById("diceResultP1round2");
const diceResultP2round1 = document.getElementById("diceResultP2round1");
const diceResultP2round2 = document.getElementById("diceResultP2round2");
const markerPlayer1Win = document.getElementById("markerPlayer1Win");
const markerPlayer2Win = document.getElementById("markerPlayer2Win");

// /_---------- Render Functions ---------_/
// Initialisation of the game loading page.

const init = () => {
  // without loading page
  // gamePageRollContainer.style.display = "flex";
  // landingPageContainer.style.display = "none";
  // diceRolledContainer.style.display = "none";
  // markerPlayer1Win.style.display = "none";
  // markerPlayer2Win.style.display = "none";

  gamePageRollContainer.style.display = "none";
  landingPageContainer.style.display = "flex";
  diceRolledContainer.style.display = "none";
  markerPlayer1Win.style.display = "none";
  markerPlayer2Win.style.display = "none";

  renderPlayerTurn();
  moveMarkers();
};
const render = () => {
  recordPlayerDice();
  diceRolledTotalAnimationOn();
};

const resetGame = () => {
  // Reset game state
  game.players = [
    { Name: "", currLocation: 1, diceRollTotal: 0 },
    { Name: "", currLocation: 1, diceRollTotal: 0 },
  ];
  game.playerTurn = 1;
  game.rollNum = ["", ""];
  rollCounter = 0;
  rollTotal = 0;

  greetingPlayer1.textContent = "";
  greetingPlayer2.textContent = "";
  diceResultP1round1.textContent = "";
  diceResultP1round2.textContent = "";
  diceResultP2round1.textContent = "";
  diceResultP2round2.textContent = "";
  gameMessageA.textContent = "";
  gameMessageB.textContent = "";
  currentPositionP1.textContent = "";
  currentPositionP2.textContent = "";

  markerPlayer1Win.style.display = "none";
  markerPlayer2Win.style.display = "none";

  submitPlayer1Button.style.backgroundColor = "";
  submitPlayer2Button.style.backgroundColor = "";

  moveMarkers();

  landingPageContainer.style.display = "flex";
  gamePageRollContainer.style.display = "none";
  diceRolledContainer.style.display = "none";

  rollButton.disabled = false;

  console.log("Game has been reset");
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
  markerPlayer1.style.left = `${target.left - 10}px`;
  markerPlayer1.style.top = `${target.top - 8}px`;
  // currentPositionP1.innerHTML = `${game.players[0].currLocation}`;
  currentPositionP1.innerHTML = position;
};

//renderPlayer2Markers, marker of player 2 is moved here

const renderPlayer2Markers = (position) => {
  if (position > gridItems.length) {
    position = gridItems.length;
  }
  const targetGridItem = document.getElementById(`grid-item-${position}`);
  const target = targetGridItem.getBoundingClientRect();
  markerPlayer2.style.left = `${target.left + 6}px`;
  markerPlayer2.style.top = `${target.top - 5}px`;
  currentPositionP2.innerHTML = position;
};

const renderWinner1 = () => {
  const goTo = 41;
  const targetGridItem = document.getElementById(`grid-item-${goTo}`);

  if (targetGridItem) {
    const target = targetGridItem.getBoundingClientRect();
    markerPlayer1Win.classList.add("markerFadeIn");
    setTimeout(() => {
      markerPlayer1Win.style.display = "block";
      markerPlayer1Win.classList.add("show");
      markerPlayer1Win.style.transform = "scale(8)";
      markerPlayer1Win.style.left = `${target.left}px`;
      markerPlayer1Win.style.top = `${target.top}px`;
    }, 300);
  }
};

const renderWinner2 = () => {
  const goTo = 41;
  const targetGridItem = document.getElementById(`grid-item-${goTo}`);

  if (targetGridItem) {
    const target = targetGridItem.getBoundingClientRect();
    markerPlayer2Win.classList.add("markerFadeIn");
    setTimeout(() => {
      markerPlayer2Win.style.display = "block";
      markerPlayer2Win.classList.add("show");
      markerPlayer2Win.style.transform = "scale(8)";
      markerPlayer2Win.style.left = `${target.left + 6}px`;
      markerPlayer2Win.style.top = `${target.top - 5}px`;
    }, 300);
  }
};

const renderClearPlayerRolls = () => {
  if (
    game.players[0].currLocation === 1 &&
    game.players[1].currLocation === 1
  ) {
    console.log("nothing to clear");
  } else if (game.playerTurn === 1) {
    diceResultP1round1.textContent = "";
    diceResultP1round2.textContent = "";
    console.log("clear player 1 dice");
  } else {
    diceResultP2round1.textContent = "";
    diceResultP2round2.textContent = "";
    console.log("clear player 2 dice");
  }
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
    submitPlayer1Button.style.backgroundColor = "#76448A";
  }
  if (game.players[1].Name !== "") {
    submitPlayer2Button.style.backgroundColor = "#76448A";
  }
};

// startGame function controls:
// 1. Check that all names are submitted before startGame can be activated
// 2. If all names are submitted, Game Page will be loaded.

const startGame = () => {
  if (game.players[1].Name === "" || game.players[0].Name === "") {
    startPrompt.textContent = "Please submit all names to START GAME";
    startPrompt.style.fontWeight = "";
  } else {
    gamePageRollContainer.style.display = "flex";
    landingPageContainer.style.display = "none";
    gameMessageA.textContent = `<- ${game.players[0].Name} Start Rolling`;
  }
  checkWinner();
  console.log(game); // check if game object has logged the names
};

// playerTurn function control switch player turn

const playerTurn = () => {
  checkGridItems();

  if (game.playerTurn === 1) {
    game.playerTurn = 2;
    console.log("PLAYERTURN", game.playerTurn);
  } else {
    game.playerTurn = 1;
    console.log("PLAYERTURN", game.playerTurn);
  }
  checkWinner();
};

// rollDice function roll dice twice and record the total number in rollTotal

const rollDice = () => {
  gameMessageB.textContent = "";
  rollCounter += 1;
  const rolledNum = Math.floor(Math.random() * 6) + 1;

  //!For First Roll
  if (rollCounter === 1) {
    console.log(`Now is Player ${game.playerTurn} turn to roll dice`);
    game.rollNum[0] = rolledNum;
    if (game.playerTurn === 1) {
      diceResultP1round1.textContent = rolledNum;
    } else {
      diceResultP2round1.textContent = rolledNum;
    }

    //! For Second Roll
  } else if (rollCounter === 2) {
    game.rollNum[1] = rolledNum;
    rollCounter = 0;
    rollTotal = 0;
    for (let i = 0; i < game.rollNum.length; i++) {
      rollTotal += game.rollNum[i];
    }
    if (game.playerTurn === 1) {
      diceResultP1round2.textContent = rolledNum;
    } else {
      diceResultP2round2.textContent = rolledNum;
    }

    recordPlayerDice();
    // game.rollNum = ["", ""]; //reset rollNum after every 2 dice rolls.
    // console.log(
    //   `END OF DICE ROLL | Player 1 Rolled Total ${game.players[0].diceRollTotal}`
    // );
    // console.log(
    //   `END OF DICE ROLL | Player 2 Rolled Total ${game.players[1].diceRollTotal}`
    // );
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
      if (
        game.players[0].currLocation >= gridItems.length ||
        game.players[1].currLocation >= gridItems.length
      ) {
        rollButton.disabled = true;
      } else {
        rollButton.disabled = false;
        console.log("disabled");

        renderPlayerTurn();

        if (game.playerTurn === 1) {
          gameMessageA.textContent = `<- ${game.players[0].Name} Your Turn to Roll`; // remove the previous player game message
          gameMessageA.style.color = "#ebedef";
        } else {
          gameMessageA.textContent = `${game.players[1].Name} Your Turn to Roll ->`;
          gameMessageA.style.color = "#ebedef";
        }
      }
    }, 400);
  }, 500);
  renderClearPlayerRolls();
};

// recordPlayerDice records the total dice rolled and record in the current location key
const recordPlayerDice = () => {
  if (game.playerTurn === 1) {
    game.players[0].diceRollTotal = rollTotal; //1
    game.players[0].currLocation += rollTotal; //2
    console.log("Player 1 Roll total:", game.players[0].diceRollTotal);
    console.log(game);
    console.log("Player 1 Move :", game.players[0].currLocation);
  } else if (game.playerTurn === 2) {
    game.players[1].diceRollTotal = rollTotal; //1
    game.players[1].currLocation += rollTotal; //2
    console.log("Player 2 Roll total:", game.players[1].diceRollTotal);
    console.log(game);
    console.log("Player 2 Move :", game.players[1].currLocation);
  }
  rollButton.disabled = true;
  diceRolledTotalAnimationOn();
};

// checkWinner check to see if there are winner else continue checking until there is a winner
const checkWinner = () => {
  // console.log(`CHECK WINNER OPERATING`);
  if (game.players[0].currLocation >= gridItems.length) {
    console.log(`Player 1, ${game.players[0].Name} wins!`);
    gameMessageA.innerHTML = `Player 1, <strong> ${game.players[0].Name} </strong> Wins!`;
    moveMarkers();
    renderWinner1();
    rollButton.disabled = true;
  } else if (game.players[1].currLocation >= gridItems.length) {
    console.log(`Player 2, ${game.players[1].Name} wins!`);
    gameMessageA.innerHTML = `Player 2, <strong> ${game.players[1].Name} </strong> Wins!`;
    moveMarkers();
    renderWinner2();
    rollButton.disabled = true;
  } else {
    moveMarkers();
    // console.log("NO WINNER YET");
  }
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
          case "balloon": //! BALLOON
            if (currentPlayer.currLocation === 65) {
              currentPlayer.currLocation += 15;
            } else {
              currentPlayer.currLocation += 17;
            }
            gameMessageB.innerHTML = `<strong>${currentPlayer.Name}<strong>, you got a Boost! Progress to ${currentPlayer.currLocation}`;
            console.log(`Location After Update: ${currentPlayer.currLocation}`);
            break;
          case "bomb": //! BOMB
            currentPlayer.currLocation -= 6;
            gameMessageB.innerHTML = `<strong>${currentPlayer.Name}<strong>, stepped on a BOMB! Back to grid ${currentPlayer.currLocation}`;
            console.log(`Location After Update: ${currentPlayer.currLocation}`);
            break;

          case "nuclearBomb": //! NUCLEAR BOMB
            currentPlayer.currLocation = 41;
            gameMessageB.innerHTML = `<strong>${currentPlayer.Name}<strong>, stepped on a Nuclear BOMB! Back to grid ${currentPlayer.currLocation}`;
            console.log(`Location After Update: ${currentPlayer.currLocation}`);
            break;

          case "grenade": //! GRENADE
            currentPlayer.currLocation -= 3;
            gameMessageB.innerHTML = `<strong>${currentPlayer.Name}<strong>, found a rigged Grenade! Back to grid ${currentPlayer.currLocation}`;
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

resetButton.addEventListener("click", () => {
  resetGame();
});

//Noticing that afer window resizing the marker will misalign with gridItems therefore
//we need to listen for moveMarker after every window resize to ensure the marker is aligned to the grid
window.addEventListener("resize", () => {
  // moveMarkers();
  checkWinner();
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
const borderStyle = "5px solid #17202A";

const applyWall = (borderStyle, totalGrid) => {
  for (let i = 1; i <= totalGrid; i++) {
    if (i % Math.sqrt(totalGrid) !== 0 && (i < 73 || i > 80)) {
      const item = `#grid-item-${i}`;
      const element = document.querySelector(item);
      if (element) {
        element.style.borderTop = borderStyle;
      }
    }
  }
};

applyWall(borderStyle, totalGrid);

// const applyDiceResultPlayer1 = () => {
//   if(row)
// };

//============================== Apply Styles to Grid Items ==========================

const applyStylesToGridItems = (balloonIcon, bombIcon, nuclearIcon) => {
  const balloonGridItemIds = [
    "grid-item-19",
    "grid-item-28",
    "grid-item-55",
    "grid-item-65",
  ];

  const bombGridItemIds = [
    "grid-item-8",
    "grid-item-35",
    "grid-item-56",
    "grid-item-78",
  ];

  const nuclearGridItemIds = ["grid-item-80"];

  const grenadeGridItemIds = [
    "grid-item-16",
    "grid-item-24",
    "grid-item-50",
    "grid-item-76",
  ];

  balloonGridItemIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.background = balloonIcon;
      element.style.backgroundSize = "30px 30px";
      element.style.backgroundColor = "#03A9F4";
      element.style.color = "transparent";
    }
  });

  bombGridItemIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.background = bombIcon;
      element.style.backgroundSize = "35px 35px";
      element.style.backgroundColor = "#EF5350"; /*"#1C2833"*/
      element.style.color = "transparent";
    }
  });
  nuclearGridItemIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.background = nuclearIcon;
      element.style.backgroundSize = "30px 30px";
      element.style.backgroundColor = "#CC0033";
      element.style.color = "transparent";
    }
  });
  grenadeGridItemIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.background = grenadeIcon;
      element.style.backgroundSize = "30px 30px";
      element.style.backgroundColor = "";
      element.style.color = "transparent";
    }
  });
};

const balloonIcon =
  "url('css/assets-game/balloon.png') no-repeat center center";
const bombIcon = "url('css/assets-game/bomb.png') no-repeat center center";
const nuclearIcon =
  "url('css/assets-game/nuclear-bomb.png') no-repeat center center";
const grenadeIcon =
  "url('css/assets-game/grenade.png') no-repeat center center";

applyStylesToGridItems(balloonIcon, bombIcon, nuclearIcon, grenadeIcon);

// ========================= TEST LOG ==========================
console.log("PlayerTurn Now is:", game.playerTurn); // Output: 9
