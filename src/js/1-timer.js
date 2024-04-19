'use strict';

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const input = document.querySelector('#datetime-picker');
const button = document.querySelector("button");
button.disabled = true;
let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {

      if ( selectedDates[0] > new Date()) {
            userSelectedDate = selectedDates[0];
            button.disabled = false;
        }
        else
      {
          iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
        });
          button.disabled = true;
        }

  },
};

flatpickr(input, options);

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

function addLeadingZero(date) {
    for(let key in date) {
        date[key] = String(date[key]).padStart(2, '0');
    }
    return date;
}
 
function updateTimer(date) {
    const days = document.querySelector('[data-days]'); 
    const hours = document.querySelector('[data-hours]');
    const minutes = document.querySelector('[data-minutes]');
    const seconds = document.querySelector('[data-seconds]');

    days.textContent = date.days;
    hours.textContent = date.hours;
    minutes.textContent = date.minutes;
    seconds.textContent = date.seconds;

}

button.addEventListener('click', () => {
    button.disabled = true;
    input.disabled = true;

    const timerInterval = setInterval(() => {
 
        const currentDate = new Date().getTime();
        if (userSelectedDate - currentDate <= 0) {
          updateTimer(addLeadingZero(convertMs(0)));
          input.disabled = false;
          button.disabled = false;
            clearInterval(timerInterval);
            return;
        }
        updateTimer(addLeadingZero(convertMs(userSelectedDate - currentDate)));
      }, 1000);

});
