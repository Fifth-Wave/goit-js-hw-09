import '../sass/02-timer.scss';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const el = {
  daysNos: document.querySelector('[data-days]'),
  hoursNos: document.querySelector('[data-hours]'),
  minsNos: document.querySelector('[data-minutes]'),
  secondsNos: document.querySelector('[data-seconds]'),
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
};

el.startBtn.setAttribute('disabled', true);
el.startBtn.addEventListener('click', onStartBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onInput(selectedDates);
  },
};

var timerTime;
var timerId = null;

flatpickr('#datetime-picker', options);

function onInput(selectedDates) {
  if (timerId) {
    return;
  }

  if (selectedDates[0].getTime() <= Date.now()) {
    el.startBtn.setAttribute('disabled', true);
    window.alert('Please choose a date in the future');
    return;
  }

  el.startBtn.removeAttribute('disabled');
  timerTime = selectedDates[0].getTime() - Date.now();
}

function setTimer(time) {
  const { days, hours, minutes, seconds } = convertMs(time);
  el.daysNos.textContent = addLeadingZero(days);
  el.hoursNos.textContent = addLeadingZero(hours);
  el.minsNos.textContent = addLeadingZero(minutes);
  el.secondsNos.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onStartBtnClick() {
  el.input.setAttribute('disabled', true);
  setTimer(timerTime);
  timerId = setInterval(timerTickDown, 1000);
  el.startBtn.setAttribute('disabled', true);
}

function timerTickDown() {
  if (timerTime < 2000) {
    clearInterval(timerId);
    timerId = null;
    el.input.removeAttribute('disabled');
  }
  timerTime -= 1000;
  setTimer(timerTime);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
