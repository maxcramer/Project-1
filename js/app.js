window.addEventListener('DOMContentLoaded', () => {
  // FOURTH ATTEMPT - TARGETS DISSAPEAR ON CLICK THEN REAPEAR AFTER 2.5 SECONDS
  // TARGETS NOT MOVING OUT OUF SPACE
  const playArea = document.querySelector('.playArea');
  playArea.addEventListener('click', function () {
    playArea.style.visibility = 'hidden';
    updateScore();
    updateBullCount();
    setTimeout(() => {
      playArea.style.visibility = 'visible';
    },1000);
  });


  const targets = document.querySelectorAll('.target');
  targets.forEach(target => target.addEventListener('click', function () {
    target.style.visibility = 'hidden';
    setTimeout(() => {
      target.style.visibility = 'visible';
    },1000);
  })
  );





  // const secondTarget = document.querySelector('.secondTarget');
  // secondTarget.addEventListener('click', function () {
  //   secondTarget.style.visibility = 'hidden';
  //   updateScore();
  //   updateBullCount();
  //   setTimeout(() => {
  //     secondTarget.style.visibility = 'visible';
  //   },1000);
  // });
  //
  //
  //
  // const thirdTarget = document.querySelector('.thirdTarget');
  // thirdTarget.addEventListener('click', function () {
  //   thirdTarget.style.visibility = 'hidden';
  //   updateScore();
  //   updateBullCount();
  //   setTimeout(() => {
  //     thirdTarget.style.visibility = 'visible';
  //   },1000);
  // });
  //
  //
  //
  // const fourthTarget = document.querySelector('.fourthTarget');
  // fourthTarget.addEventListener('click', function () {
  //   fourthTarget.style.visibility = 'hidden';
  //   updateScore();
  //   updateBullCount();
  //   setTimeout(() => {
  //     fourthTarget.style.visibility = 'visible';
  //   },1000);
  // });
  //
  //
  //
  // const fithTarget = document.querySelector('.fithTarget');
  // // We are hooking this function to the click event.
  // // This only needs to be hooked on once!
  // fithTarget.addEventListener('click', function () {
  //   fithTarget.style.visibility = 'hidden';
  //   updateScore();
  //   updateBullCount();
  //   setTimeout(() => {
  //     fithTarget.style.visibility = 'visible';
  //   },1000);
  // });
  //
  //
  //
  // const sixthTarget = document.querySelector('.sixthTarget');
  // sixthTarget.addEventListener('click', function () {
  //   sixthTarget.style.visibility = 'hidden';
  //   updateScore();
  //   updateBullCount();
  //   setTimeout(() => {
  //     sixthTarget.style.visibility = 'visible';
  //   },1000);
  // });

  playArea.addEventListener('click', updateBullCount);
  // Logic for restart button
  // This should be outside the click event listener (line 74)


  const restartButton = document.querySelector('#restart');
  restartButton.addEventListener('click', function () {
    document.querySelector('#bullCount').innerHTML = playerBullets;
    document.querySelector('#score').innerHTML = playerScore;
    document.querySelector('#timerScreen').innerHTML = timeRemaining;
    playerScore = 0;
    playerBullets = 3;
    timeRemaining = 30;
  });


  // SCOREBOARD LOGIC
  let playerScore = 1; // tried changing this to 0
  const score = document.querySelector('#score');
  function updateScore() {
    score.innerHTML = playerScore;
    playerScore ++; // tried taking these out
  }

  let playerBullets = 3;
  const bullCount = document.querySelector('#bullCount');
  function updateBullCount() {
    // ROB: Put all bullet logic here
    // ROB: Set the value of playerBullets then display it
    // ROB: Include this logic in updateBulletCount
    // Logic for adding and minusing bullets whether it hits a target or misses
    if (event.target.classList.contains('target')) {
      console.log('HIT!');
      bullCount.innerHTML = playerBullets;
      playerBullets += 0;
    } else {
      console.log('MISS!');
      playerBullets -= 1;
      bullCount.innerHTML = playerBullets;
      // change this to be minusing points
      if (playerBullets === 0) {
        console.log('GAME OVER!');
        clearInterval(intervalId);
        // can't get it to stop at 0
        playArea.removeEventListener('click', updateBullCount);
      }
    }


    // attempted to turn above into if else statement, bellow
    // was the code i was trying to get to make the bullCount
    // stop at 0
    //****************************************************
    // else {
    //   clearInterval(intervalId);
    //   playerBullets = false;
    //   window.alert('Game Over');
    // }
  }

  // Logic for timer
  let timeRemaining = 30;
  let isRunning = false;
  let intervalId;

  const startBtn = document.querySelector('.timer');
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

});
