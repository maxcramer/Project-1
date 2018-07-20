window.addEventListener('DOMContentLoaded', () => {
  //GLOBAL VARIABLES
  const playArea = document.querySelector('.playArea');
  const score = document.querySelector('#score');
  const scoreFinal = document.querySelector('#scoreFinal');
  const restartButton = document.querySelector('#restart');
  const bullCountDisplay = document.querySelector('#bullCount');
  const startBtn = document.querySelector('.startBtn');
  const timerDisplay = document.querySelector('#timerScreen');
  const playing = document.querySelector('.playArea');
  const grandking = document.querySelector('#grandking');
  const animation = ['runAcross', 'runAcross2', 'runAcross3', 'runAcross4', 'runAcross5', 'runAcross6', 'runAcross7', 'runAcross8', 'runAcross9'];
  const title = document.querySelector('#title');
  const gameOverDisplay = document.querySelector('.gameOverDisplay');

  // LOCAL VARIABLES
  let backgroundTrackAudio;
  let playerScore = 0; // tried changing this to 0
  let playerBullets = 3;
  // Logic for timer
  let timeRemaining = 30;
  let isRunning = false;
  let timerIntervalId;

  // For character movement in relation to mouse

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
  // DISPLAYS GAME OVER DIV
  function displayGameOver() {
    gameOverDisplay.style.visibility = 'visible';
  }

  const charTargets = [
    { className: 'firstTarget', imageSrc: './Characters/billc.png', audioSrc: './Sounds/bill.mp3' },
    { className: 'secondTarget', imageSrc: './Characters/caytlinj.png', audioSrc: './Sounds/caytlinj.mp3' },
    { className: 'thirdTarget', imageSrc: './Characters/hillary.png', audioSrc: './Sounds/hillary.mp3'},
    { className: 'fourthTarget', imageSrc: './Characters/manBearPig.png', audioSrc: './Sounds/manbearpig.mp3' },
    { className: 'fifthTarget', imageSrc: './Characters/mrslave.png', audioSrc: './Sounds/mrslave.mp3' },
    { className: 'sixthTarget', imageSrc: './Characters/trump.png', audioSrc: './Sounds/trump.mp3' }
  ];

  addTargetsToPlayArea(charTargets);
  const targets = document.querySelectorAll('.targetDiv');

  playArea.addEventListener('click', handlePlayAreaClick);

  // Target onClick addEventListener
  const handleTargetClick = function(event) {
    if(isRunning) {
      const target = event.target;
      target.style.visibility = 'hidden';
      startBtn.style.visibility = 'hidden';
      setTimeout(() => {
        target.style.visibility = 'visible';
      },1000);
    }
  };

  // GENERATES RANDOM SPEEDS AND PATHS THAT CHARACTERS FOLLOW
  targets.forEach(target => {
    target.addEventListener('click', handleTargetClick);
    target.style.animationName = `${generateRandomAnimation()}`;
    target.style.animationDuration = `${Math.floor(Math.random()*10) + 5}s`;
  });


  // RESTART BUTTON
  restartButton.addEventListener('click', function() {
    console.log('this is isrunning at restart button ->', isRunning);
    playerBullets = 3;
    playerScore = 0;
    timeRemaining = 30;
    bullCountDisplay.innerHTML = playerBullets;
    score.innerHTML = playerScore;
    timerDisplay.innerHTML = timeRemaining;
    isRunning = false;
    backgroundTrackAudio.pause();
    backgroundTrackAudio = null;
    clearInterval(timerIntervalId); // Stop the timer
    gameOverDisplay.style.visibility = 'hidden';
    startTimer();
  });


  // SCOREBOARD LOGIC
  function increaseScore() {
    playerScore ++;
    score.innerHTML = playerScore;
    isRunning = true;
  }

  function displayBulletCount() {
    bullCountDisplay.innerHTML = playerBullets;
  }

  function getAudioFromTarget(element) {
    const imgSrc = element.getAttribute('src');
    const target = charTargets.filter(target => target.imageSrc === imgSrc)[0];
    console.log(target.audioSrc);
    if(target) {
      return target.audioSrc;
    } else {
      return null;
    }
  }
  //SOUND EFFECTS FOR CHARACTERS WHEN HIT
  function playAudio(element) {
    const audio = new Audio();
    audio.src = getAudioFromTarget(element);
    audio.volume = 1;
    console.log(audio);
    audio.play();
  }

  // Player bullet count
  function handlePlayAreaClick(event) {
    console.log('Is running?', isRunning);
    if(isRunning) {
      document.querySelector('.playArea').classList.add('shoot-cursor');
      setTimeout(() => document.querySelector('.playArea').classList.remove('shoot-cursor'), 150);
      console.log('What is the target class?', event.target.classList);
      if (event.target.classList.contains('targetImage')) {
        console.log('----->', event.target);
        playAudio(event.target);
        //add sound soundEffect
        increaseScore();
        bullCountDisplay.innerHTML = playerBullets;
        playerBullets += 0;
      } else {
        console.log('MISS!');
        playerBullets -= 1;
        displayBulletCount();
        // change this to be minusing points
        if (playerBullets === 0) {
          gameOver();
        }
      }
    }
  }

  function gameOver() {
    clearInterval(timerIntervalId);
    isRunning = false;
    timeRemaining = 30;
    playerBullets = 3;
    backgroundTrackAudio.src = '';
    scoreFinal.innerHTML = playerScore;
    displayGameOver();
  }

  function startTimer() {
    if (!backgroundTrackAudio) {
      backgroundTrackAudio = new Audio('./Sounds/backingTrack.mp3');
      backgroundTrackAudio.volume = 0.4;
      backgroundTrackAudio.play();
    }
    if (!isRunning) {
      isRunning = true;
      title.style.visibility = 'hidden';
      startBtn.style.display = 'none';
      restartButton.style.display = 'block';
      timerIntervalId = setInterval(() => {
        timeRemaining -= 1;
        document.querySelector('#timerScreen').innerHTML = timeRemaining;
        if (timeRemaining === 0) {
          gameOver();
        }
      }, 1000);
    } else {
      clearInterval(timerIntervalId);
      isRunning = false;
    }
  }

  // START BUTTON & TIMER
  startBtn.addEventListener('click', startTimer);


  // GENERATES RANDOM PATH & SPEED (LOOKS AT KEYFRAMES IN ARRAY)
  function generateRandomAnimation() {
    const randomIndex = Math.floor(Math.random()*animation.length);
    return animation[randomIndex];
  }
});
