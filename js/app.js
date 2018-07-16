window.addEventListener('DOMContentLoaded', () => {

  const playArea = document.querySelector('.playArea');
  const targets = document.querySelectorAll('.target');
  const score = document.querySelector('#score');
  const restartButton = document.querySelector('#restart');
  const bullCount = document.querySelector('#bullCount');
  const startBtn = document.querySelector('.timer');
  const timerDisplay = document.querySelector('#timerScreen');

  let playerScore = 0; // tried changing this to 0
  let playerBullets = 3;
  const animation = ['runAcross', 'runAcross2'];

  // Logic for timer
  let timeRemaining = 30;
  let isRunning = false;
  let intervalId;

  playArea.addEventListener('click', updateBullCount);

  // Target onClick addEventListener
  const handleTargetClick = function(event) {
    if(isRunning) {
      const target = event.target;
      target.style.visibility = 'hidden';
      setTimeout(() => {
        target.style.visibility = 'visible';
      },1000);
    }
  };

  targets.forEach(target => {
    target.addEventListener('click', handleTargetClick);
    target.style.animationName = `${generateRandomAnimation()}`;
    target.style.animationDuration = `${Math.floor(Math.random()*10) + 5}s`;
  });

  restartButton.addEventListener('click', function() {
    console.log('Restarting!');
    playerBullets = 3;
    playerScore = 0;
    timeRemaining = 30;
    bullCount.innerHTML = playerBullets;
    score.innerHTML = playerScore;
    timerDisplay.innerHTML = timeRemaining;
    // TODO: Update the DOM to reflect timeRemaining!
  });


  // SCOREBOARD LOGIC
  function increaseScore() {
    playerScore ++;
    score.innerHTML = playerScore;
    isRunning = true;
  }

  function displayBulletCount() {
    bullCount.innerHTML = playerBullets;
  }

  function updateBullCount() {
    if(isRunning) {
      if (event.target.classList.contains('target')) {
        console.log('HIT!');
        increaseScore();
        bullCount.innerHTML = playerBullets;
        playerBullets += 0;
      } else {
        console.log('MISS!');
        playerBullets -= 1;
        displayBulletCount();
        // change this to be minusing points
        if (playerBullets === 0) {
          clearInterval(intervalId);
          isRunning = false;
          window.alert('Game Over - Please CLick Restart');
        }
      }
    }
  }


  startBtn.addEventListener('click', function() {
    if (!isRunning) {
      isRunning = true;
      intervalId = setInterval(() => {
        timeRemaining -= 1;
        document.querySelector('#timerScreen').innerHTML = timeRemaining;
        if (timeRemaining === 0) {
          clearInterval(intervalId);
          return window.alert('Game Over');
          // isRunning = false;
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
      isRunning = false;
    }
  });

 function generateRandomAnimation() {
    const randomIndex = Math.floor(Math.random()*animation.length);
    return animation[randomIndex];
  }


});
