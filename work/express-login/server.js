const UUID = require('uuid');
const cookieParser = require('cookie-parser');
const express = require('express'); 
const app = express(); 
const loginFilter = require('./filters/login_filter');
const userValidater = require('./utils/string_utils');
const page = require('./web');
const PORT = 3000;

app.use(cookieParser());  
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const senssionList = loginFilter.idList;
const Letters = {};

app.use(loginFilter.login_filter);

app.get('/',(req,res) => { 
    let sessionId = req.cookies['sessionId'];
    let letter = Letters[senssionList[sessionId]['username']];
    res.send(page.index_html(letter));
});

app.get('/login', (req, res) => {
    res.send(page.login_html());
});

app.post('/handle_login', (req, res) => {
    let username = req.body['username'];
    if(!userValidater.validate_username(username)){
        res.status(401).send(page.username_error_html());
    }else{
        let uuid = UUID.v4();
        senssionList[uuid] = {'username': username};
        Letters[username] = Letters[username] || '';
        res.cookie('sessionId',uuid);
        res.redirect('/');
    }
});

app.post('/modify_letter', (req, res) => {
    let letter = req.body['letter'];
    let sessionId = req.cookies ['sessionId'];
    let username = senssionList[sessionId]['username'];
    Letters[username] = letter;
    res.redirect('/');
});

app.get('/logout', (req, res) => {
    let sessionId = req.cookies ['sessionId'];
    senssionList[sessionId] = undefined;
    res.clearCookie().redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));