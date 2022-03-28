const uuid = require('uuid').v4;
const products = require('./products');

function makeCartList(){
    const id1 = uuid();
    const cartList={};
    const items ={
        [id1]: {
            id: id1,
            name: 'potato',
            price: 20,
            amount: 1,
            ordered: false,
        },
    };

    cartList.contains = function contains(id){
        return !!items[id];
    }

    cartList.getItems= function getItems(){
        return items;
    }
    cartList.getItem= function getItem(id){
        return items[id];
    }

    cartList.addItem = function addItem(item){
        const id = item.id;
        if(!!items[id]){
            const amount = items[id].amount;
            items[id].amount = amount+1;
            return id
        }
        const name = item.productName;
        const price = item.price;
        items[id]={
            id,
            name,
            price,
            amount:1,
            ordered: false,
           
        };
        return id;
    }

    cartList.isEmpty = function isEmpty(){
        let n = 1;
        let idList = [];
        Object.values(items).map( item =>{
            idList[n]=[`${item.id}`]
            n++;
        })
        return idList.length <= 1 ? true : false;
    }
    cartList.isZero = function isZero(){
        let n = 1;
        let idList = [];
        Object.values(items).map( item =>{
            if(item.amount != 0){
                idList[n]=[`${item.id}`]
                n++;
            }
        })
        return idList.length <= 1 ? true : false;
    }

    cartList.ordered = function ordered( id, item ){
        items[id].ordered = item.ordered ?? items[id].ordered;
        items[id].name = item.name || items[id].name;
    }

    cartList.deleteItem = function deleteItem(id){
        delete items[id];
    }

    cartList.deleteItems = function deleteItems(){
        let n = 1;
        let idList = [];
        Object.values(items).map( item =>{
            idList[n]=[`${item.id}`]
            n++;
        })
        idList.forEach( Iid =>{
            delete items[Iid];
        })
    }

    cartList.isMin = function isMin(id){
        return items[id].amount === 0
    } 

    cartList.minus = function minusAmount(id){
        const amount = items[id].amount;
        items[id].amount = amount-1;
    }

    cartList.add = function addAmount(id){
        const amount = items[id].amount;
        items[id].amount = amount+1;
    }

    return cartList;
}

module.exports = {
    makeCartList,
}