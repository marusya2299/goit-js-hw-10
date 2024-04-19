'use strict';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const delayInput = document.querySelector('input[name="delay"]');
    const delay = parseInt(delayInput.value);

    const stateInput = document.querySelector('input[name="state"]:checked');
    const state = stateInput.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(`Fulfilled promise in ${delay}ms`);
            } else {
                reject(`Rejected promise in ${delay}ms`);
            }
        }, delay);
    });

    promise.then(message => {
        iziToast.success({ message: message });
    }).catch(message => {
        iziToast.error({ message: message });
    });
});


