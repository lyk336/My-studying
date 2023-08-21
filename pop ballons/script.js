const gameField = document.querySelector('.field');
const title = document.querySelector('.title');
const startButton = document.getElementById('start-game');
const resultElement = document.querySelector('.result');
const timerElement = document.getElementById('timer');
const playAgainButton = document.querySelector('.play-again');
const bestScoreElement = document.getElementById('best-score');
const scoreElement = document.getElementById('score');
const roundElement = document.getElementById('round');
const balloonsCountElement = document.getElementById('balloon-count');

let isGame = false;
let balloons = [];
let balloonsHTML = '';
let round = 1;
let score = 0;

let bestScore = localStorage.getItem('bestScore') || 0;
bestScoreElement.innerHTML = bestScore;

function generateBalloons() {
  let totalBalloonsCount;
  if (round < 7) {
    if (round === 1) {
      totalBalloonsCount = 4;
    } else if (round <= 6) {
      totalBalloonsCount = round * 2;
    }
    for (let i = 0; i < totalBalloonsCount; i++) {
      const randomNum = Math.random();
      if (randomNum < 0.25) {
        balloons.push({
          name: 'left',
          key: 'ArrowLeft',
          secondKey: 'a',
        });
      } else if (randomNum < 0.5) {
        balloons.push({
          name: 'right',
          key: 'ArrowRight',
          secondKey: 'd',
        });
      } else if (randomNum < 0.75) {
        balloons.push({
          name: 'top',
          key: 'ArrowUp',
          secondKey: 'w',
        });
      } else {
        balloons.push({
          name: 'bottom',
          key: 'ArrowDown',
          secondKey: 's',
        });
      }
    }
  } else {
    totalBalloonsCount = 12;
    for (let i = 0; i < totalBalloonsCount; i++) {
      const randomNum = Math.random();

      if (randomNum < 0.2) {
        balloons.push({
          name: 'left',
          key: 'ArrowLeft',
          secondKey: 'a',
        });
      } else if (randomNum < 0.4) {
        balloons.push({
          name: 'right',
          key: 'ArrowRight',
          secondKey: 'd',
        });
      } else if (randomNum < 0.6) {
        balloons.push({
          name: 'top',
          key: 'ArrowUp',
          secondKey: 'w',
        });
      } else if (randomNum < 0.8) {
        balloons.push({
          name: 'bottom',
          key: 'ArrowDown',
          secondKey: 's',
        });
      } else {
        const secondRandomNum = Math.random();
        if (secondRandomNum < 0.25) {
          balloons.push({
            name: 'bomb-left',
            key: ' ',
            secondKey: ' ',
          });
        } else if (secondRandomNum < 0.5) {
          balloons.push({
            name: 'bomb-right',
            key: ' ',
            secondKey: ' ',
          });
        } else if (secondRandomNum < 0.75) {
          balloons.push({
            name: 'bomb-top',
            key: ' ',
            secondKey: ' ',
          });
        } else {
          balloons.push({
            name: 'bomb-bottom',
            key: ' ',
            secondKey: ' ',
          });
        }
      }
    }
  }
  for (let i = 0; i < balloons.length; i++) {
    balloonsHTML += `<div class="balloon ${balloons[i].name}"></div>`;
  }

  gameField.innerHTML = balloonsHTML;
  balloonsCountElement.innerHTML = balloons.length;
}

startButton.addEventListener('click', () => {
  title.classList.add('invisible');
  gameField.classList.remove('invisible');
  resultElement.classList.remove('invisible');
  document.querySelector('.game-statistics').classList.remove('invisible');

  score = 0;
  scoreElement.innerHTML = score;
  round = 1;
  roundElement.innerHTML = round;
  isGame = true;
  generateBalloons();
  resetTimer();
});
playAgainButton.addEventListener('click', () => {
  playAgainButton.classList.add('invisible');

  score = 0;
  scoreElement.innerHTML = score;
  round = 1;
  roundElement.innerHTML = round;
  isGame = true;
  generateBalloons();
  resetTimer();
});

let intervalId;
let time = 6;
function resetTimer() {
  time = 6;
  timerElement.innerHTML = 6;

  intervalId = setInterval(() => {
    time -= 0.1;
    timerElement.innerHTML = time.toFixed(1);
    if (time <= 0.1) {
      gameField.innerHTML = '';
      balloonsHTML = '';
      balloons = [];
      timerElement.innerHTML = 0;
      playAgainButton.classList.remove('invisible');
      isGame = false;
      clearInterval(intervalId);

      if (score > +bestScore) {
        bestScore = score;
        bestScoreElement.innerHTML = bestScore;
        localStorage.setItem('bestScore', `${bestScore}`);
      }
    }
    return time;
  }, 100);
}

// making game interactive

addEventListener('keydown', (event) => {
  let key = event.key;
  if (event.key === 'ц') {
    key = 'w';
  } else if (event.key === 'ф') {
    key = 'a';
  } else if (event.key === 'в') {
    key = 'd';
  } else if (event.key === 'і' || event.key === 'ы') {
    key = 's';
  }

  if (isGame) {
    if (
      key === 'w' ||
      key === 'a' ||
      key === 's' ||
      key === 'd' ||
      key === 'ArrowUp' ||
      key === 'ArrowLeft' ||
      key === 'ArrowDown' ||
      key === 'ArrowRight' ||
      key === ' '
    ) {
      if (key === balloons[0].key || key === balloons[0].secondKey) {
        balloons.shift();
        score++;

        // render html
        balloonsHTML = '';
        for (let i = 0; i < balloons.length; i++) {
          balloonsHTML += `<div class="balloon ${balloons[i].name}"></div>`;
        }
        gameField.innerHTML = balloonsHTML;

        // update score
        scoreElement.innerHTML = score;

        // update ballons count
        balloonsCountElement.innerHTML = balloons.length;

        // go to the next lvl
        if (balloons.length === 0) {
          round++;
          roundElement.innerHTML = round;
          generateBalloons();
          clearInterval(intervalId);
          resetTimer();
          if (round >= 10) {
            time -= round / 50;
            console.log(time);
          }
        }
      } else {
        time -= 0.3;
      }
    }
  }
});
