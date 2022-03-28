const idList = {};

const login_filter = (req, res, next) => {
    if((req.url ===  '/login' || req.url === '/handle_login') || (typeof req.cookies !== 'undefined' && 
        typeof req.cookies.sessionId !== 'undefined' && typeof idList[req.cookies.sessionId] !== 'undefined')){
        next();
    }else{
        res.redirect('/login');
    }
}

module.exports = {
    login_filter,
    idList
};