const null_or_empty = (str) => {
    return typeof str === 'undefined' || str === null || str.trim().length === 0;
}

const validate_username = (username) => {
    if(null_or_empty(username)){
        return false;
    }
    username = username.trim();
    return username.length > 0 && username !== 'dog' && (/^[0-9]+$/.test(username) || /^[a-zA-Z]+$/.test(username));
}

module.exports = {
    validate_username,
    null_or_empty
};