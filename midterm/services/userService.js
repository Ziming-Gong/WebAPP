const userList = {};
const uuid = require('uuid').v4;
const start_or_continue_game = require('./gameService').start_or_continue_game;

function validate_username(username) {
    if (!username) {
        return 'required-username';
    } else if (username === 'dog') {
        return 'auth-insufficient';
    }
    return undefined;
}

exports.login = (req, res) => {
    let username = req.body.username;
    let err_message = validate_username(username);
    if (err_message) {
        res.status(403).json({
            success: false,
            message: err_message
        });
    } else {
        let session_id = uuid();
        userList[session_id] = username;
        start_or_continue_game(username);
        res.cookie('sid', session_id);
        res.json({
            success: true
        });
    }
}

exports.logout = (req, res) => {
    let session_id = req.cookies['sid'];
    delete userList[session_id];
    res.clearCookie('sid');
    res.redirect('/');
}

exports.loggedin = (req) => {
    return req.cookies && req.cookies.sid && userList[req.cookies.sid];
}

exports.userList = userList