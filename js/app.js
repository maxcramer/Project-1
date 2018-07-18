window.addEventListener('DOMContentLoaded', () => {

  const playArea = document.querySelector('.playArea');
  const score = document.querySelector('#score');
  const restartButton = document.querySelector('#restart');
  const bullCount = document.querySelector('#bullCount');
  const startBtn = document.querySelector('.startBtn');
  const timerDisplay = document.querySelector('#timerScreen');

  let playerScore = 0; // tried changing this to 0
  let playerBullets = 3;
  const animation = ['runAcross', 'runAcross2', 'runAcross3', 'runAcross4', 'runAcross5', 'runAcross6', 'runAcross7', 'runAcross8', 'runAcross9'];
  let title = document.querySelector('#title');
  // Logic for timer
  let timeRemaining = 30;
  let isRunning = false;
  let intervalId;


  // For character movement in relation to mouse
  const playing = document.querySelector('.playArea');

  const grandking = document.querySelector('#grandking');

  playing.addEventListener('mousemove', (event) => {
    grandking.style.left = event.clientX + 'px';
  });

  // Adds targets to playArea
  function addTargetsToPlayArea(targets) {
    for(let i = 0; i < targets.length; i++) {
      const target = targets[i];
      const targetDiv = document.createElement('div');
      const targetImage = document.createElement('img');
      targetImage.setAttribute('src', target.imageSrc);
      targetImage.classList = 'targetImage';
      targetDiv.classList = `targetDiv ${target.className}`;
      targetDiv.append(targetImage);
      document.getElementById('playArea').append(targetDiv);
    }
  }

  const level1Targets = [
    {className: 'firstTarget', imageSrc: './Characters/billc.png'},
    {className: 'secondTarget', imageSrc: './Characters/caytlinj.png'},
    {className: 'thirdTarget', imageSrc: './Characters/hillary.png'},
    {className: 'fourthTarget', imageSrc: './Characters/manBearPig.png'},
    {className: 'fifthTarget', imageSrc: './Characters/mrslave.png'},
    {className: 'sixthTarget', imageSrc: './Characters/trump.png'}
  ];

  addTargetsToPlayArea(level1Targets);
  const targets = document.querySelectorAll('.targetDiv');

  playArea.addEventListener('click', handlePlayAreaClick);

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


  // RESTART BUTTON
  restartButton.addEventListener('click', function() {
    console.log('Restarting!');
    playerBullets = 3;
    playerScore = 0;
    timeRemaining = 30;
    bullCount.innerHTML = playerBullets;
    score.innerHTML = playerScore;
    timerDisplay.innerHTML = timeRemaining;
    return('startBtn');
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
  // Player bullet count
  function handlePlayAreaClick(event) {
    console.log('Is running?', isRunning);
    if(isRunning) {
      console.log('What is the target class?', event.target.classList);
      if (event.target.classList.contains('targetImage')) {
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

  // START BUTTON & TIMER
  startBtn.addEventListener('click', function() {
    if (!isRunning) {
      isRunning = true;
      title.style.visibility = 'hidden';
      startBtn.style.visibility = 'hidden';
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


  // GENERATES RANDOM PATH & SPEED (LOOKS AT KEYFRAMES IN ARRAY)
  function generateRandomAnimation() {
    const randomIndex = Math.floor(Math.random()*animation.length);
    return animation[randomIndex];
  }


});
