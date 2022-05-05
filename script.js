"use strict";
//Variables

const title = document.querySelector(".name");
const cardPl0 = document.querySelector("#cardPl0");
const cardPl1 = document.querySelector("#cardPl1");
const scorePl0El = document.querySelector("#score-pl0");
const scorePl1El = document.querySelector("#score-pl1");
const currentPl0El = document.querySelector("#current-pl0");
const currentPl1El = document.querySelector("#current-pl1");
const dice = document.querySelector(".dice--img");
const btnRoll = document.querySelector("#roll-btn");
const btnHold = document.querySelector("#hold-btn");
const btnReset = document.querySelector("#reset-btn");

//Starter conditions
let thisRoundDice;
let activePlayer = 0;
const currentScores = [0, 0];
const scores = [0, 0];

//FUN(ctions)
const diceRandom = function () {
  thisRoundDice = Math.trunc(Math.random() * 6 + 1);
  dice.src = `img/dice-${thisRoundDice}.png`;
  if (thisRoundDice !== 1) {
    currentScores[activePlayer] += thisRoundDice;
    currentPl0El.textContent = currentScores[0];
    currentPl1El.textContent = currentScores[1];
  } else {
    currentScores[activePlayer] = 0;
    currentPl0El.textContent = currentScores[0];
    currentPl1El.textContent = currentScores[1];
    switchPlayer();
  }
};

const holdScore = function () {
  scores[activePlayer] += currentScores[activePlayer];
  scorePl0El.textContent = scores[0];
  scorePl1El.textContent = scores[1];
  currentScores[activePlayer] = 0;
  currentPl0El.textContent = currentScores[0];
  currentPl1El.textContent = currentScores[1];
  if (scores[activePlayer] >= 100) {
    title.textContent = `Player ${scores[0] > scores[1] ? "1" : "2"} wins!`;
    btnHold.classList.add("hidden");
    btnRoll.classList.add("hidden");
  } else {
    switchPlayer();
  }
};

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  cardPl0.classList.toggle("active");
  cardPl0.classList.toggle("inactive");
  cardPl1.classList.toggle("active");
  cardPl1.classList.toggle("inactive");
};

btnRoll.addEventListener("click", diceRandom);

btnHold.addEventListener("click", holdScore);

btnReset.addEventListener("click", function () {
  activePlayer = 0;
  currentScores[0] = 0;
  currentScores[1] = 0;
  scores[0] = 0;
  scores[1] = 0;
  scorePl0El.textContent = 0;
  scorePl1El.textContent = 0;
  currentPl0El.textContent = 0;
  currentPl1El.textContent = 0;
  cardPl0.classList.add("active");
  cardPl0.classList.remove("inactive");
  cardPl1.classList.remove("active");
  cardPl1.classList.add("inactive");
  title.textContent = "Pig game!";
  dice.src = "img/dice-1.png";

  btnHold.classList.remove("hidden");
  btnRoll.classList.remove("hidden");
});
