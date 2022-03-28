const words = require('../words');

exports.login_page = () => {
    return `<html lang="en">
    <head>
      <meta charset="UTF-8">
      <title></title>
      <link rel="stylesheet" href="css/client-side.css"/>
    </head>
    <body>
      <div class="body">
        <div class="login">
            <label>
              <p>Username</p>
              <i class="i-message"></i><br>
              <input class="username">
            </label>
            <button type="button" disabled>Login</button>
        </div>
      </div>
      <script src="scripts/client-side.js"></script>  
    </body>
    </html>`;
}

exports.game_page = (username, options) => {
    let words_fragment = '';
    let tmp_words = [];
    for (let i = 0; i < words.length; i++) {
        tmp_words.push(words[i]);
        if (tmp_words.length === 15) {
            words_fragment += `<p>${tmp_words.join(' ')}</p>`;
            tmp_words = [];
        }
    }
    if (tmp_words.length > 0) {
        words_fragment += `<p>${tmp_words.join(' ')}</p>`;
    }
    return `<html lang="en">

    <head>
        <meta charset="UTF-8">
        <title></title>
        <link rel="stylesheet" href="css/client-index.css"/>
    </head>
    
    <body>
        <div class="body">
            <div class="top">
                <form method="post" action="/logout">
                    <input class="logout" type="submit" value="Logout">
                </form>
                <form method="post" action="/exit">
                    <input class="exit" type="submit" value="Exit">
                </form>
                <form method="post" action="/new-game">
                    <input class="new" type="submit" value="New Game">
                </form>
                <span>User: ${username}</span>
            </div>
            <div class="words">
                <h2>All Words</h2>
                ${words_fragment}
            </div>
            ${options.game_status === 3 ? '' :  `<div class="game-state">
                                                        <h1>Valid Guess Times: ${options.times}</h1>
                                                        <h1>${options.last_record ? `Last Guess: ${options.last_record.word}    ${options.last_record.is_valid ? 'Number of letters matched: ' + options.last_record.same_count : 'It is Invalid'}` : 'No Records'}</h1>
                                                    </div>`}
            <div class="guess">
                ${guess_fragment(options)}
            </div>
        </div>
    </body>
        <script src="scripts/client-index.js"></script>
    </html>`;
}

function guess_fragment(statement) {
    switch(statement.game_status){
        case 2: {
            return `<h2>Congratulations on winning!</h2>
            <form method="post" action="/new-game">
                <input type="submit" value="New Game">
            </form>`;
        }
        case 3: {
            return `<h2>Game Exited</h2>
                <form method="post" action="/new-game">
                    <input type="submit" value="New Game">
                </form>`;
        }
        default: {
            if(statement.times === 0){
                return `<i class="i-message"></i><br>
                        <form method="post" action="/guess" id="guess-form">
                            <label>guess </label>
                            <input type="text" name="word">
                            <br>
                            <input type="submit" value="Guess" disabled>
                        </form>`;
            }else{
                return `<p>
                            <button class="guessing">Keep Guessing</button>
                        </p>`;
                
            }
        }
    }
}