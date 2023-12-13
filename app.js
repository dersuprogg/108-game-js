const newGameBtn = document.querySelector(".btn-new-game");
const rollDiceBtn = document.querySelector(".btn-roll-dice");
const holdBtn = document.querySelector(".btn-hold");
const player1TotalScore = document.querySelector(".player-1-score");
const player2TotalScore = document.querySelector(".player-2-score");
let player1CurrentScore = document.querySelector(".player-1-current-score");
let player2CurrentScore = document.querySelector(".player-2-current-score");
const player1Board = document.querySelector(".player-1-board");
const player2Board = document.querySelector(".player-2-board");
const diceImg = document.querySelector(".dice");

let scores, currentScore, activePlayer, playing, winningScore;

function init() {
  winningScore = 108;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 1;
  playing = true;

  player1TotalScore.textContent = 0;
  player2TotalScore.textContent = 0;
  player1CurrentScore.textContent = 0;
  player2CurrentScore.textContent = 0;

  player1Board.classList.remove("winner");
  player2Board.classList.remove("winner");
  player1Board.classList.add("active");
  player2Board.classList.remove("active");
  diceImg.classList.add("hidden");
  console.log("aaaa");
}

init();

function switchPlayer() {
  document.querySelector(
    `.player-${activePlayer}-current-score`
  ).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1Board.classList.toggle("active");
  player2Board.classList.toggle("active");
}

rollDiceBtn.addEventListener("click", function () {
  if (playing) {
    const dice = Math.floor(Math.random() * 6) + 1;
    diceImg.setAttribute("src", `img/dice${dice}.png`);
    diceImg.classList.remove("hidden");

    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.querySelector(
        `.player-${activePlayer}-current-score`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener("click", function () {
  if (playing) {
    // add current score to active player's score
    scores[activePlayer - 1] += currentScore;
    document.querySelector(`.player-${activePlayer}-score`).textContent =
      scores[activePlayer - 1];

    if (scores[activePlayer - 1] >= winningScore) {
      document
        .querySelector(`.player-${activePlayer}-board`)
        .classList.add("winner");
      playing = false;
      diceImg.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener("click", init);
