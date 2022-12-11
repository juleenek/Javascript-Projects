const watch = document.querySelector('.watch');

let prevTime,
  stopwatchInterval,
  elapsedTime = 0;

const gameEndTimes = [];

function updateTime() {
  let tempTime = elapsedTime;

  tempTime = Math.floor(tempTime / 1000);
  let seconds = tempTime % 60;
  tempTime = Math.floor(tempTime / 60);
  let minutes = tempTime % 60;
  tempTime = Math.floor(tempTime / 60);
  let secondsText, minutesText;

  seconds < 10 ? (secondsText = `0${seconds}`) : (secondsText = `${seconds}`);
  minutes < 10 ? (minutesText = `0${minutes}`) : (minutesText = `${minutes}`);

  watch.textContent = `${minutesText}:${secondsText}`;
  if (minutes === 59 && seconds === 59) pauseTime();
}

function startTime() {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(function () {
      if (!prevTime) {
        prevTime = Date.now();
      }

      elapsedTime += Date.now() - prevTime;
      prevTime = Date.now();

      updateTime();
    }, 50);
  }
}

function pauseTime() {
  if (stopwatchInterval) {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
  }
  prevTime = null;
}

function resetTime() {
  pauseTime();
  elapsedTime = 0;
  updateTime();
}

export { updateTime, startTime, pauseTime, resetTime, gameEndTimes };
