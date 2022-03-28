"use strict";

(function () {

  addAbilityToLogin();

  function showMessage(message) {
    let messageEl = document.querySelector('.i-message');
    messageEl.textContent = message || '';
  }

  function addAbilityToLogin() {
    let buttonEl = document.querySelector('.login button');
    let usernameEl = document.querySelector('.username');

    usernameEl.addEventListener('keyup', () => {
      if (usernameEl.value.trim().length !== 0) {
        buttonEl.removeAttribute('disabled');
      } else {
        buttonEl.setAttribute('disabled', true);
      }
    });

    buttonEl.addEventListener('click', (e) => {
      let username = usernameEl.value;
      fetch('/login', {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json'
        }),
        body: JSON.stringify({ username: username }),
      })
        .then(res => {
          if (res.ok) {
            window.location.href = '/';
          }
          return res.json();
        }).then((response) => {
          showMessage(response.message);
        });
    });
  }
})();
