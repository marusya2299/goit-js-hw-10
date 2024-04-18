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

    switch (state)
    {
        case 'fulfilled':

            setTimeout(() => {
                iziToast.success({ message: `Fulfilled promise in ${delay}ms` });
            }, delay);
            break;
        
        case 'rejected':

            setTimeout(() => {
                iziToast.error({ message: `Rejected promise in ${delay}ms`});
            }, delay);
            break;
    }
});


