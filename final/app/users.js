const usersCart = {};
const usersOrders ={};

function getUserCart(username){
    return usersCart[username];
}

function addUserLists(username, cartList, orderList){
    usersCart[username] = cartList;
    usersOrders[username] = orderList;
}

function getUserOrders(username){
    return usersOrders[username];
}

function addUserOrderLists(username,orderList){
    usersOrders[username] = orderList;
}

module.exports = {
    getUserCart,
    getUserOrders,
    addUserLists,
    addUserOrderLists,
};