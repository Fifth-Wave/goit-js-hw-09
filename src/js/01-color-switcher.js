const btnStart = document.querySelector('button[data-start]');
btnStart.addEventListener('click', onStartClick);

const btnStop = document.querySelector('button[data-stop]');
btnStop.addEventListener('click', onStopClick);

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartClick() {
  timerId = setInterval(changeColor, 1000);
  btnStart.setAttribute('disabled', 'true');
  btnStop.removeAttribute('disabled');
}

function onStopClick() {
  clearInterval(timerId);
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', 'true');
}

function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
