const uuid = require('uuid').v4;

function makeOrderList(){
    const id1 = uuid();
    const id2 = uuid();
    const id3 = uuid();

    const orderList = {};
    let number =1;
    const orders ={
        [id1]:{
            id:id1,
            ordername:`order${number}`,
            items:{
                [id2]:{
                id:id2,
                name: 'chicken',
                },
                [id3]:{
                    id: id3,
                    name: 'pork',
                }
            },
        },
    };

    orderList.getOrders = function getOrders(){
        return orders;
    }

    orderList.addOrder = function addOrder(items){
        number ++;
        const ordername = `order${number}`;
        const id = uuid();
        let idList = [];
        let n =1;
        Object.values(items).map( item =>{
            if(item.amount != 0){
                idList[n] = [`${item.id}`]
                n++; 
            }
        })
        orders[id]={
            id,
            ordername,
        }
        idList.forEach(pid =>{
            orders[id]= {
                ...orders[id],
                items: {
                    ...orders[id].items,
                    [pid]:{
                        id: pid,
                       name: items[pid].name,
                    }
                }
            }
        })
    }

    orderList.getInformation = function getInformation(id){
        return orders[id].items;
    }

    return orderList;
    
}

module.exports = {
    makeOrderList,
}