"use strict";

(function() {


  readyToLogin();
  addAbilityToLogin();
  addAbilityToLogout();

  const loginEl = document.querySelector('.body')


  function readyToLogin() {
    fetch('/api/v1/session', {
      method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'Error' }) )
    .then( res => {
      if (res.ok) {
        return res.json();
      }
      return res.json()
      .then( err => Promise.reject(err) );
    })
    .catch( () => {
      loginEl.classList.add('not-logged-in');
      loginEl.classList.remove('logged-in');
    } );
  }

  function addAbilityToLogin() {
    const buttonEl = document.querySelector('.login button');
    const usernameEl = document.querySelector('.username');
    buttonEl.addEventListener('click', (e) => {
      const username = usernameEl.value;
      fetch('/api/v1/session', {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json'
        }),
        body: JSON.stringify({ username }),
      })
      .catch( () => Promise.reject({ error: 'Error' }) )
      .then( res => {
        if (res.ok) {
          return res.json();
        }
        return res.json()
        .then( err => Promise.reject(err) );
      })
      .then( () =>{
      loginEl.classList.remove('not-logged-in');
      loginEl.classList.add('logged-in');
      } )
    });
  }

  function addAbilityToLogout() {
    const buttonEl = document.querySelector('.logout');
    buttonEl.addEventListener('click', (e) => {

      fetch('/api/v1/session', {
        method: 'DELETE',
      })
      .catch( () => Promise.reject({ error: 'networkError' }) )
      .then( res => {
        if (res.ok) {
          return res.json();
        }
        return res.json()
        .then( err => Promise.reject(err) );
      })
      .then( () => {
        loginEl.classList.add('not-logged-in');
        loginEl.classList.remove('logged-in');
      } )

    });
  }

  

})();
