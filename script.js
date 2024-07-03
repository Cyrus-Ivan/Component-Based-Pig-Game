'use strict';

const numberOfPlayers = 2;
const playersArray = [];
let playerNumber = 0;
let isDone = false;

function initializePlayers() {
  for (let i = 0; i < numberOfPlayers; i++) {
    playersArray[i] = {
      player: `player--${i}`,
      score: 0,
      current: 0,
    };
  }
}
initializePlayers();

function switchActivePlayer() {
  let currentPlayer = document.querySelector(
    `.${playersArray.at(playerNumber).player}`
  );
  // current player's active status gets revoked
  currentPlayer.classList.toggle('player--active');
  // playerNumber gets switched to the next player
  playerNumber = playerNumber + 1 < numberOfPlayers ? playerNumber + 1 : 0;
  // next Player is now assigned as current player and active status is toggled on.
  currentPlayer = document.querySelector(
    `.${playersArray.at(playerNumber).player}`
  );
  currentPlayer.classList.toggle('player--active');
}

// controls
const newGameButton = document.querySelector('.btn--new');
const rollDiceButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');

// event listeners and functions for each control
newGameButton.addEventListener('click', reset);
rollDiceButton.addEventListener('click', roll);
holdButton.addEventListener('click', hold);
document.addEventListener('keypress', keyPressHandler);

// the listeners corresponding functions
function reset() {
  isDone = false;
  initializePlayers();
  document
    .querySelectorAll('.player')
    .forEach(element => element.classList.remove('player--winner'));
  document
    .querySelectorAll('.current-score')
    .forEach(element => (element.textContent = 0));
  document
    .querySelectorAll('.score')
    .forEach(element => (element.textContent = 0));
}

function roll() {
  if (isDone) return true;

  let numberRolled = Math.floor(Math.random() * 6 + 1);
  document.getElementById('dice').src = `dice-${numberRolled}.png`;

  if (numberRolled === 1) {
    playersArray.at(playerNumber).current = 0;
    hold();
  } else {
    playersArray.at(playerNumber).current += numberRolled;
    document.getElementById(`current--${playerNumber}`).textContent =
      playersArray.at(playerNumber).current;
  }
}

function hold() {
  if (isDone) return true;

  playersArray.at(playerNumber).score += playersArray.at(playerNumber).current;
  document.getElementById(`score--${playerNumber}`).textContent =
    playersArray.at(playerNumber).score;

  playersArray.at(playerNumber).current = 0;
  document.getElementById(`current--${playerNumber}`).textContent = 0;
  if (!winCheck()) switchActivePlayer();
}

function keyPressHandler(KeyboardEvent) {
  switch (KeyboardEvent.key) {
    case 'Escape':
      reset();
      break;
    case ' ':
      hold();
      break;
    case '+':
      roll();
      break;
  }
}

// other functions called by the previous primary functions

function winCheck() {
  if (playersArray.at(playerNumber).score >= 100) {
    document
      .querySelector(`.${playersArray.at(playerNumber).player}`)
      .classList.add('player--winner');
    isDone = true;
    return true;
  }
  return false;
}
