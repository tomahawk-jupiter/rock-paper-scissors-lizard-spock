const houseChoice = () => {
  const possibleChoices = ["scissors", "paper", "rock", "lizard", "spock"];
  return possibleChoices[Math.floor(Math.random() * 5)];
};

// Buttons
const rulesBtn = document.getElementById("rules-btn");
const closeRulesBtn = document.getElementById("close-rules-btn");
const playAgainBtn = document.getElementById("play-again-btn");

// Game containers
const rulesOverlay = document.getElementById("rules-overlay");
const rulesCard = document.getElementById("rules-card");
const stageOneContainer = document.getElementById("stage-one-container");
const stageTwoContainer = document.getElementById("stage-two-container");
const playerPieceContainer = document.getElementById("player-piece-container");
const housePieceContainer = document.getElementById("house-piece-container");
const outcomeContainer = document.getElementById("outcome-container");
const resultDisplay = document.getElementById("result-display");
const playerRippleContainer = document.getElementById(
  "player-ripple-container"
);
const houseRippleContainer = document.getElementById("house-ripple-container");
const scoreDisplay = document.getElementById("score");

// Retrieve stored score
window.onload = () => {
  const storedScore = localStorage.getItem("score");

  if (storedScore !== null) {
    // Update the scoreDisplay with the stored score
    scoreDisplay.innerText = storedScore;
  }
};

// Game pieces
const choices = ["scissors", "paper", "rock", "lizard", "spock"];

for (const choice of choices) {
  const element = document.getElementById(choice);
  element.addEventListener("click", handlePlayerClickedPiece);
}

// Game logic mostly in this function
function handlePlayerClickedPiece() {
  const playersChoice = this.id;
  const theHouseChose = houseChoice();
  stageOneContainer.style.visibility = "hidden";
  stageTwoContainer.style.visibility = "visible";
  const result = gameOutcome(playersChoice, theHouseChose);
  resultDisplay.textContent = result;

  setTimeout(() => {
    addPlayerPieceToDOM(playersChoice);
  }, 500);

  setTimeout(() => {
    addHousePieceToDom(theHouseChose);
  }, 1000);

  setTimeout(() => {
    outcomeContainer.style.display = "block";
  }, 1500);

  setTimeout(() => {
    updateScore(result);
    applyRippleEffect(result);
  }, 1200);
}

// Events
rulesBtn.addEventListener("click", () => {
  rulesOverlay.style.visibility = "visible";
});

closeRulesBtn.addEventListener("click", () => {
  rulesOverlay.style.visibility = "hidden";
});

// Close rules when off-clicking
rulesOverlay.addEventListener("click", (event) => {
  if (!rulesCard.contains(event.target)) {
    rulesOverlay.style.visibility = "hidden";
  }
});

playAgainBtn.addEventListener("click", () => {
  stageOneContainer.style.visibility = "visible";
  stageTwoContainer.style.visibility = "hidden";
  outcomeContainer.style.display = "none";

  playerRippleContainer.replaceChildren();
  houseRippleContainer.replaceChildren();

  const createEmptySlotElement = () => {
    const iconContainer = document.createElement("div");
    iconContainer.className = "icon-container-s2-empty";

    const innerContainer = document.createElement("div");
    innerContainer.className = "icon-container-inner-s2-empty";

    iconContainer.appendChild(innerContainer);

    return iconContainer;
  };

  playerPieceContainer.replaceChildren(createEmptySlotElement());
  housePieceContainer.replaceChildren(createEmptySlotElement());
});

const addPlayerPieceToDOM = (playersChoice) => {
  const iconContainer = document.createElement("div");
  iconContainer.className = `icon-container-s2 ${playersChoice}-s2`;

  const innerContainer = document.createElement("div");
  innerContainer.className = "icon-container-inner-s2";

  const image = document.createElement("img");
  image.src = `./images/icon-${playersChoice}.svg`;
  image.alt = `Choose ${playersChoice}`;

  innerContainer.appendChild(image);
  iconContainer.appendChild(innerContainer);

  playerPieceContainer.replaceChildren(iconContainer);
};

const addHousePieceToDom = (houseChoice) => {
  const iconContainer = document.createElement("div");
  iconContainer.className = `icon-container-s2 ${houseChoice}-s2`;

  const innerContainer = document.createElement("div");
  innerContainer.className = "icon-container-inner-s2";

  const image = document.createElement("img");
  image.src = `./images/icon-${houseChoice}.svg`;
  image.alt = `Choose ${houseChoice}`;

  innerContainer.appendChild(image);
  iconContainer.appendChild(innerContainer);

  housePieceContainer.replaceChildren(iconContainer);
};

const gameOutcome = (playerChoice, houseChoice) => {
  if (
    (playerChoice === "scissors" &&
      (houseChoice === "paper" || houseChoice === "lizard")) ||
    (playerChoice === "paper" &&
      (houseChoice === "rock" || houseChoice === "spock")) ||
    (playerChoice === "rock" &&
      (houseChoice === "lizard" || houseChoice === "scissors")) ||
    (playerChoice === "lizard" &&
      (houseChoice === "spock" || houseChoice === "paper")) ||
    (playerChoice === "spock" &&
      (houseChoice === "scissors" || houseChoice === "rock"))
  ) {
    return "YOU WIN";
  } else if (
    (playerChoice === "scissors" &&
      (houseChoice === "rock" || houseChoice === "spock")) ||
    (playerChoice === "paper" &&
      (houseChoice === "scissors" || houseChoice === "lizard")) ||
    (playerChoice === "rock" &&
      (houseChoice === "paper" || houseChoice === "spock")) ||
    (playerChoice === "lizard" &&
      (houseChoice === "rock" || houseChoice === "scissors")) ||
    (playerChoice === "spock" &&
      (houseChoice === "paper" || houseChoice === "lizard"))
  ) {
    return "HOUSE WINS";
  } else if (playerChoice === houseChoice) {
    return "DRAW";
  } else {
    return false;
  }
};

const updateScore = (result) => {
  const valueToAdd =
    result === "YOU WIN" ? 1 : result === "HOUSE WINS" ? -1 : 0;

  const currentValue = Number(scoreDisplay.innerText);
  const newValue = String(currentValue + valueToAdd);
  scoreDisplay.innerText = newValue;
  localStorage.setItem("score", newValue.toString());
};

const applyRippleEffect = (result) => {
  const circlesContainer = document.createElement("div");
  circlesContainer.className = "circles-container";

  for (let i = 0; i < 4; i++) {
    const circle = document.createElement("div");
    circle.className = "circle";
    circlesContainer.appendChild(circle);
  }

  if (result === "DRAW") return;

  const rippleContainer =
    result === "YOU WIN" ? playerRippleContainer : houseRippleContainer;

  rippleContainer.appendChild(circlesContainer);
};
