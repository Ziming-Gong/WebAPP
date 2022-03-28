const uuid = require('uuid').v4;

const id1 = uuid();
const id2 = uuid();
const id3 = uuid();
const id4 = uuid();
const id5 = uuid();
const id6 = uuid();
const id7 = uuid();
const id8 = uuid();
const id9 = uuid();
const id10 = uuid();
const id11 = uuid();
const id12 = uuid();
const ProductList={};

let idList = [`${id1}`,`${id2}`,`${id3}`,`${id4}`,
                `${id5}`,`${id6}`,`${id7}`,`${id8}`,
                `${id9}`,`${id10}`,`${id11}`,`${id12}`];

const productsStorage = {
    [id1] : {
       id: id1,
       productName: 'apple',
       price: 5,
       category:'fruit'    
    },
    [id2]:{
        id: id2,
        productName: 'banana',
        price: 10,
        category:'fruit'
    },
    [id3]:{
        id: id3,
        productName: 'beef',
        price: 10,
        category:'meat'
    },
    [id4]:{
        id: id4,
        productName: 'pork',
        price: 10,
        category:'meat'
    },
    [id5] : {
        id: id5,
        productName: 'chips',
        price: 5,
        category:'snacks'              
    },
    [id6]:{
        id: id6,
        productName: 'cookie',
        price: 10,
        category:'snacks'
    },
    [id7]:{
        id: id7,
        productName: 'popcorn',
        price: 10,
        category:'snacks'
    },
    [id8]:{
        id: id8,
        productName: 'peanuts',
        price: 10,
        category:'snacks'
    },
    [id9] : {
        id: id9,
        productName: 'watermelon',
        price: 5,
        category:'fruit'
            
    },
    [id10]:{
        id: id10,
        productName: 'orange',
        price: 10,
        category:'fruit'
    },
    [id11]:{
        id: id11,
        productName: 'fish',
        price: 10,
        category:'meat'
    },
    [id12]:{
        id: id12,
        productName: 'ham',
        price: 10,
        category:'meat'
    },    
};

    function searchItems(letters){
        const l = letters.toLowerCase();
        const products = {};
        idList.forEach( id =>{
            if(productsStorage[id].productName === l){
                products[id] = productsStorage[id]
            }
            if(productsStorage[id].productName.indexOf(l)>=0){
                products[id] = productsStorage[id]
            }
        })
        return products
    }

    function searchCategory(category){
        const products ={};
        idList.forEach( id =>{
            if(productsStorage[id].category === category){
                products[id] = productsStorage[id]
            }
        })
        return products
    }

    function isContains(name){
        const n = name.toLowerCase();
        let tf = false;
        idList.forEach( id =>{
            if(productsStorage[id].productName === n){
                tf = true
            }
        })
        return tf
    };

     function getProducts(){
        return productsStorage;
    };

    function getProductPrice(productName){
        return productsStorage[productName].price;
    }

     function addProducts(product){
        const id = uuid();
        productsStorage[id]={
            id,
            productName: product.name,
            price: product.price,
            category: product.category,
        };
        idList = [...idList,`${id}`]
    };

    function changeProduct(id,product){
        productsStorage[id].productName = product.name;
        productsStorage[id].price = product.price;
        productsStorage[id].category = product.category;
    }

    function deleteProduct(id){
        delete productsStorage[id];
        for(let i = 0; i< idList.length; i++){
            if(idList[i]===id){
                idList.splice(i,1);
                break;
            }
        }
    }

     function getProduct(productName){
        return productsStorage[productName];
    };    

module.exports = {
    getProduct,
    isContains,
    getProducts,
    addProducts,
    getProductPrice,
    productsStorage,
    searchItems,
    idList,
    searchCategory,
    changeProduct,
    deleteProduct,
};