const gameEndTimes = [];
const timeList = document.querySelector('.times-list');
const timeListBox = document.querySelector('.times-list-box');
const closeLeaderboard = document.querySelector('.close-leaderboard');

const leaderboardEasy = document.querySelector('.leaderboard-easy');
const leaderboardMedium = document.querySelector('.leaderboard-medium');
const leaderboardHard = document.querySelector('.leaderboard-hard');
let listDisplay;

function displayList() {
  listDisplay.sort((a, b) => a.time - b.time);
  timeListBox.classList.remove('invisible');

  for (let index = 0; index < listDisplay.length; index++) {
    let tempTime = listDisplay[index].time;
    tempTime = Math.floor(tempTime / 1000);
    let seconds = tempTime % 60;
    tempTime = Math.floor(tempTime / 60);
    let minutes = tempTime % 60;
    tempTime = Math.floor(tempTime / 60);
    let secondsText, minutesText;

    seconds < 10 ? (secondsText = `0${seconds}`) : (secondsText = `${seconds}`);
    minutes < 10 ? (minutesText = `0${minutes}`) : (minutesText = `${minutes}`);

    const timeElement = document.createElement('p');
    timeElement.classList.add('time-element');
    timeElement.textContent = `${index + 1}. ${minutesText}:${secondsText}`;
    timeList.appendChild(timeElement);
  }
}

function hideList() {
  timeListBox.classList.add('invisible');
}

leaderboardEasy.addEventListener('click', () => {
  leaderboardEasy.classList.add('difficulty-clicked');
  leaderboardMedium.classList.remove('difficulty-clicked');
  leaderboardHard.classList.remove('difficulty-clicked');

  timeList.innerHTML = '';
  listDisplay = gameEndTimes.filter((game) => game.difficulty === 'easy');
  displayList();
});

leaderboardMedium.addEventListener('click', () => {
  leaderboardEasy.classList.remove('difficulty-clicked');
  leaderboardMedium.classList.add('difficulty-clicked');
  leaderboardHard.classList.remove('difficulty-clicked');

  timeList.innerHTML = '';
  listDisplay = gameEndTimes.filter((game) => game.difficulty === 'medium');
  displayList();
});

leaderboardHard.addEventListener('click', () => {
  leaderboardEasy.classList.remove('difficulty-clicked');
  leaderboardMedium.classList.remove('difficulty-clicked');
  leaderboardHard.classList.add('difficulty-clicked');

  timeList.innerHTML = '';
  listDisplay = gameEndTimes.filter((game) => game.difficulty === 'hard');
  displayList();
});

closeLeaderboard.addEventListener('click', () => {
  hideList();
});

export { gameEndTimes, leaderboardEasy, displayList, hideList };
