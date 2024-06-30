'use strict';

const numberOfPlayers = 2;

//dice image
const dice = document.getElementById('dice');

// current total of active playyer
let activeCurrent = 0;
// players score tally
let player1Score = 0;
let player2Score = 0;

// current player manipulator
let playerNumber = 0;
let currentPlayer = document.querySelector(`.player--${playerNumber}`);
function switchActivePlayer() {
  // current player's active status gets revoked
  currentPlayer.classList.toggle('player--active');
  // playerNumber gets switched to the next player
  playerNumber = playerNumber + 1 < numberOfPlayers ? playerNumber + 1 : 0;
  // next Player is now assigned as current player and active status is toggled on.
  currentPlayer = document.querySelector(`.player--${playerNumber}`);
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
document.addEventListener('keydown', keyPressHandler);

// the listeners corresponding functions
function reset() {
  player1Score = 0;
  player2Score = 0;
  document.querySelectorAll('.current').textContent = 0;
  DocumentTimeline.querySelectorAll('.player').textContent = 0;
}
function roll() {
  console.log('roll');

  let numberRolled = Math.floor(Math.random() * 6 + 1);
  dice.src = `dice-${numberRolled}.png`;

  document.getElementById(`current--${playerNumber}`).textContent;
}
function hold() {
  console.log('\nhold');
  addToTotal();
  winCheck();
  switchActivePlayer();
}
function keyPressHandler(KeyboardEvent) {
  if (KeyboardEvent.key === 'Escape') reset();
  else if (KeyboardEvent.key === 'Enter') roll();
  else if (KeyboardEvent.key === ' ') hold();
}

// other functions called by the previous primary functions

function addToTotal() {}

function winCheck() {
  console.log('check');
}
