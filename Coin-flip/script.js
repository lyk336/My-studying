const coin = document.getElementById('coins');
const headsButton = document.getElementById('heads');
const tailsButton = document.getElementById('tails');
const resetButton = document.getElementById('reset');
const resultElement = document.getElementById('choice__result');
const scoreElement = document.getElementById('score');
let score = 0;

// adding score when the site start
score = JSON.parse(localStorage.getItem('score'));
scoreElement.innerText = score;

function guessSide(choice) {
  // checking if there is already class with animation
  // and resetting result element
  if (coin.classList.contains('heads--flip')) {
    coin.classList.remove('heads--flip');
  } else if (coin.classList.contains('tails--flip')) {
    coin.classList.remove('tails--flip');
  }

  if (resultElement.innerText.length > 0) {
    resultElement.innerText = '';
  }

  // random side selecting
  let coinSide;

  Math.random() < 0.5 ? (coinSide = 'heads') : (coinSide = 'tails');
  coin.classList.add(`${coinSide}--flip`);

  // checking result
  let result;

  resultColorReset();
  if (choice === coinSide) {
    result = `${coinSide}, you guessed it!`;
    resultElement.classList.add('choice__result--correct');
    score++;
  } else {
    result = `${coinSide}, you didn't guess.`;
    resultElement.classList.add('choice__result--incorrect');
  }

  // save score
  saveScore(score);

  // adding result and actual score to html element
  setTimeout(displayResult, 3000, [result], [score]);

  function displayResult(result, score) {
    resultElement.innerText = result;
    scoreElement.innerText = score;
  }
}
// saving score in local storage function
function saveScore(score) {
  localStorage.setItem('score', JSON.stringify(score));
}
// adding reset button function
function reset() {
  score = 0;
  scoreElement.innerText = score;
  saveScore(score);
}
// adding red or green color for result element
function resultColorReset() {
  if (
    resultElement.classList.contains('choice__result--correct') ||
    resultElement.classList.contains('choice__result--incorrect')
  ) {
    resultElement.className = '';
  }
}

// adding functions to buttons
headsButton.addEventListener('click', () => {
  guessSide('heads');
});
tailsButton.addEventListener('click', () => {
  guessSide('tails');
});

resetButton.addEventListener('click', reset);
