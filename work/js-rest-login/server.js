const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;
const app = express();
const PORT = 3000;



const userList = {};
const sessionList = {};
app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

app.get('/api/v1/session', (req,res) =>{
  const sid = req.cookies.sid;
  const username = sid ? (sessionList[sid]?.username) : '';
  if(!sid || !username){
      res.status(400).json({ error: 'invalid username'});
      return;
  }
  res.json({username})
})

app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;
  if(!username) {
    res.status(400).json({ error: 'name required' });
    return;
  }
  if(username === 'dog') {
    res.status(403).json({ error: 'invalid username' });
    return;
  }
  const sid = uuid();
  sessionList[sid] = {
    username,
  };
  userList[username] = username;
  res.cookie('sid', sid);
  res.json(  userList[username]);
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? (sessionList[sid]?.username) : '';
  if(sid) {
    res.clearCookie('sid');
  }
  if(username) {
    delete sessionList[sid];
  }
  res.json({ username });
});



app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

