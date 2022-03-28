const gameState = {};
const words = require('../words')

const PLAYING = 1, WIN = 2, ENDED = 3;

exports.new_game = (username) => {
  let statement = {};
  let secret_word = words[Math.floor(Math.random() * words.length)]
  statement.secret_word = secret_word;
  statement.history = [];
  statement.status = PLAYING;
  gameState[username] = statement;
  console.log(`username: ${username}, secret word: ${statement.secret_word}`)
}

exports.start_or_continue_game = (username) => {
  if (!gameState[username]) {
    this.new_game(username);
  }
}

exports.exit = (username) => {
  gameState[username].status = ENDED;
}

exports.guess = (username, guess) => {
  let cur_statement = gameState[username];
  let secret_word = cur_statement['secret_word'];
  if (!/^[a-zA-Z]{5}$/.test(guess)) {
    secret_word.history.push({
      is_valid: false,
      word: guess
    })
  } else {
    let same_count = compare(secret_word, guess);
    cur_statement.history.push({
      is_valid: true,
      word: guess,
      same_count: same_count
    })
    if(same_count === secret_word.length){
      cur_statement.status = WIN;
    }
  }
  return cur_statement.history[cur_statement.history.length - 1];
}

exports.last_record = (username) => {
  let cur_statement = gameState[username];
  let last_record = cur_statement.history.length === 0 ? undefined : cur_statement.history[cur_statement.history.length - 1];
  let result = {
    times: cur_statement.history.filter(record => record.is_valid).length,
    last_record: last_record,
    game_status: cur_statement.status
  };
  return result;
}

function compare(word, guess) {
  let sum = 0;

  let CompWord = word.toUpperCase();
  let CompGuess = guess.toUpperCase();

  let index = [];

  let bool = Boolean(true);

  for (let i = CompWord.length - 1; i >= 0; i--) {
    for (let j = CompGuess.length - 1; j >= 0; j--) {
      let a = CompWord[i];
      let b = CompGuess[j];

      if (CompWord[i] === CompGuess[j]) {

        for (let k = 0; k <= index.length; k++) {
          if (j === index[k]) {
            bool = Boolean(false);
          }
        }
        if (bool == true) {
          sum++;
          index.push(j);
          i--;
        }
        bool => Boolean(true);
      }
    }
  }

  return sum;
}

exports.ENDED = ENDED
