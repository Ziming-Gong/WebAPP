const express = require('express');
const cookieParser = require('cookie-parser');
const userService = require('./services/userService');
const gameService = require('./services/gameService');
const pages = require('./views/web');
const app = express();
const PORT = 3000;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (['/', '', '/guess', '/new-game', '/exit'].includes(req.url) && !userService.loggedin(req)) {
    res.send(pages.login_page());
  } else {
    next();
  }
});
app.use(express.static('./public'));


app.get('/', (req, res) => {
  let username = userService.userList[req.cookies['sid']];
  res.send(pages.game_page(username, gameService.last_record(username)));
});

app.post('/new-game', (req, res) => {
  gameService.new_game(userService.userList[req.cookies['sid']]);
  res.redirect('/');
});

app.post('/guess', (req, res) => {
  let guess_word = req.body['word'];
  let username = userService.userList[req.cookies['sid']];
  gameService.guess(username, guess_word);
  res.redirect('/');
});

app.post('/exit', (req, res) => {
  let username = userService.userList[req.cookies['sid']];
  gameService.exit(username);
  res.redirect('/');
});

app.post('/login', (req, res) => {
  userService.login(req, res);
});

app.post('/logout', (req, res) => {
  userService.logout(req, res);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

