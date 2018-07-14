window.addEventListener('DOMContentLoaded', () => {
  // FOURTH ATTEMPT - TARGETS DISSAPEAR ON CLICK THEN REAPEAR AFTER 2.5 SECONDS
  // TARGETS NOT MOVING OUT OUF SPACE
  const firstTarget = document.querySelector('.firstTarget');
  firstTarget.addEventListener('click', function () {
    firstTarget.style.visibility = 'hidden';
    updateScore();
    updateBullCount();
    setTimeout(() => {
      firstTarget.style.visibility = 'visible';
    },1000);
  });




  const secondTarget = document.querySelector('.secondTarget');
  secondTarget.addEventListener('click', function () {
    secondTarget.style.visibility = 'hidden';
    updateScore();
    updateBullCount();
    setTimeout(() => {
      secondTarget.style.visibility = 'visible';
    },1000);
  });



  const thirdTarget = document.querySelector('.thirdTarget');
  thirdTarget.addEventListener('click', function () {
    thirdTarget.style.visibility = 'hidden';
    updateScore();
    updateBullCount();
    setTimeout(() => {
      thirdTarget.style.visibility = 'visible';
    },1000);
  });



  const fourthTarget = document.querySelector('.fourthTarget');
  fourthTarget.addEventListener('click', function () {
    fourthTarget.style.visibility = 'hidden';
    updateScore();
    updateBullCount();
    setTimeout(() => {
      fourthTarget.style.visibility = 'visible';
    },1000);
  });



  const fithTarget = document.querySelector('.fithTarget');
  fithTarget.addEventListener('click', function () {
    fithTarget.style.visibility = 'hidden';
    updateScore();
    updateBullCount();
    setTimeout(() => {
      fithTarget.style.visibility = 'visible';
    },1000);
  });



  const sixthTarget = document.querySelector('.sixthTarget');
  sixthTarget.addEventListener('click', function () {
    sixthTarget.style.visibility = 'hidden';
    updateScore();
    updateBullCount();
    setTimeout(() => {
      sixthTarget.style.visibility = 'visible';
    },1000);
  });

  const playArea = document.querySelector('.targets');
  playArea.addEventListener('click', function () {
    console.log(event.target);

    // Logic for restart button
    const restartButton = document.querySelector('#restart');
    console.log(restartButton);
    restartButton.addEventListener('click', function () {
      document.querySelector('#bullCount').innerHTML = playerBullets;
      document.querySelector('#score').innerHTML = playerScore;
      playerScore = 0;
      playerBullets = 3;
    });


    if (event.target.classList.contains('target')) {
      bullCount.innerHTML = playerBullets;
      playerBullets += 1;
    } else {
      bullCount.innerHTML = playerBullets;
      playerBullets -= 1;
      // change this to be minusing points
    }
  });



  // SCOREBOARD LOGIC
  let playerScore = 1;
  const score = document.querySelector('#score');
  function updateScore() {
    score.innerHTML = playerScore;
    playerScore ++;
  }


  // BULLET COUNT (WILL MINUS 1 EVERY TIME SHOOTING)
  let playerBullets = 3;
  const bullCount = document.querySelector('#bullCount');
  function updateBullCount() {
    bullCount.innerHTML = playerBullets;
    playerBullets --;
  }




});
