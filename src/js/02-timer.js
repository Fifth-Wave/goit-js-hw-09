import '../sass/02-timer.scss';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const el = {
  daysNos: document.querySelector('[data-days]'),
  hoursNos: document.querySelector('[data-hours]'),
  minsNos: document.querySelector('[data-minutes]'),
  secondsNos: document.querySelector('[data-seconds]'),
  //   input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
};

console.log(el.startBtn.hasAttribute('disabled'));

el.startBtn.addEventListener('click', onStartBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr) {
    onInput(selectedDates, dateStr);
  },
};

flatpickr('#datetime-picker', options);

function onInput(selectedDates) {
  if (selectedDates[0].getTime() <= Date.now()) {
    el.startBtn.setAttribute('disabled', true);
    window.alert('Please choose a date in the future');
    return;
  }

  el.startBtn.removeAttribute('disabled');
  setTimer(selectedDates[0].getTime() - Date.now());
}

function setTimer(time) {
  const { days, hours, minutes, seconds } = convertMs(time);
  el.daysNos.textContent = days;
  el.hoursNos.textContent = hours;
  el.minsNos.textContent = minutes;
  el.secondsNos.textContent = seconds;
}

function onStartBtnClick() {}

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