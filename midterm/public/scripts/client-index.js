"use strict";

(function() {
    setDomEvent();

    function setDomEvent() {
        let gussing_btn = document.querySelector('.guessing');
        if(gussing_btn){
            gussing_btn.addEventListener('click', () => keepGuessing());
        }
        let guess_form = document.querySelector('#guess-form');
        if(guess_form){
            addEventListenerForGuessForm(guess_form);
        }
    }

    function addEventListenerForGuessForm(form) {
        let input = form.querySelector('input[name=word]');
        let submit_input = form.querySelector('input[type=submit]');
        let message_container = document.querySelector('.i-message');
        let validateGuessWord = (word) => {
            let word_regex = /^[a-zA-Z]{5}$/;
            return word_regex.test(word);
        }
        let input_event_handler = (event) => {
            let word = input.value;
            if(!validateGuessWord(word)){
                message_container.textContent = 'Guess word is invalid';
                event.preventDefault();
            }else{
                message_container.textContent = '';
            }
        };
        input.addEventListener('keyup', () => {
            let guess_word = input.value;
            if(!validateGuessWord(guess_word)){
                submit_input.setAttribute('disabled', true);
            }else{
                submit_input.removeAttribute('disabled');
            }
        });
        input.addEventListener('blur', input_event_handler);
        form.addEventListener('submit', input_event_handler);
    }

    function keepGuessing() {
        let guessEl = document.querySelector('.guess');
        guessEl.innerHTML = `<i class="i-message"></i><br>
                                <form method="post" action="/guess" id="guess-form">
                                    <label>guess </label>
                                    <input type="text" name="word">
                                    <br>
                                    <input type="submit" value="Guess" disabled>
                                </form>`;
        let form = guessEl.querySelector('form');
        addEventListenerForGuessForm(form);
    }
})();