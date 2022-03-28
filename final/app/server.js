const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 4000;

const products = require('./products');
const sessions = require('./session');
const users = require('./users');
const carts = require('./purchase');
const orders = require('./order')

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

app.get('/api/session', (req,res) =>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid):'';
    if(!sid || !username){
        res.status(401).json({error: 'username or session missing'});
        return;
    }
    res.json({username});
})

app.post('/api/session', (req,res) =>{
    const {username} = req.body;
    if(!username){
        res.status(400).json({error: 'username missing'});
        return;
    }
    if(username === 'dog'){
        res.status(403).json({error: 'invalid username'});
        return;
    }
    const sid = sessions.addSession(username);
    const existingCart = users.getUserCart(username);
    if(!existingCart){
        users.addUserLists(username, carts.makeCartList(),orders.makeOrderList());
    }
    res.cookie('sid', sid);
    res.json(users.getUserCart(username).getItems());
})

app.get('/api/orders', (req,res) =>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid):'';
    if( !sid || !username){
        res.status(401).json({error :'missing username or sid when get orders'})
        return;
    }
    res.json(users.getUserOrders(username).getOrders());
})

app.get('/api/products',(req, res) =>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
        res.status(401).json({ error: 'missing' });
        return;
      }
    res.json(products.getProducts());
})

app.delete('/api/session', (req,res) =>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid):'';
    if(sid){
        res.clearCookie('sid');
    }
    if(username){
        sessions.deleteSession(sid);
    }
    res.json({username});
})

app.get('/api/cart', (req,res)=>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) :'';
    if(!sid || !username){
        res.status(401).json({error: 'missing username'})
        return;
    }
    res.json(users.getUserCart(username).getItems());
});

app.post('/api/addtocart',(req,res) =>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid):'';
    if(!sid || !username){
        res.status(401).json({ error: 'missing sid' });
        return;
    }
    const{productID} = req.body;
    if(!productID){
        res.status(400).json({ error: 'missing product name' });
        return;
    }
    const cartList = users.getUserCart(username);
    const product = products.getProduct(productID);
    const id = cartList.addItem(product);
    res.json(cartList.getItem(id))
})

app.delete('/api/cart/:id',(req,res)=>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) :'';
    if(!sid || !username){
        res.status(401).json({error : 'sid or username missing'});
        return;
    }
    const {id}= req.params;
    const cartList = users.getUserCart(username);
    const item = cartList.getItem(id);
    const exist = cartList.contains(id);
    if(exist){
        cartList.deleteItem(id);
    }
    res.json({message: exist ? `item ${id} has deleted` : ` item ${id} did not exist`})

})

app.get('/api/cart/clean', (req,res) =>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) :'';
    if(!sid || !username){
        res.status(401).json({error : 'sid or username missing'});
        return;
    }
    const cartList = users.getUserCart(username);
    if( cartList.isEmpty()){
        res.status(400).json({error: 'cart can not be empty'})
        return;
    }
    cartList.deleteItems();
    res.json({message: cartList ? `cart has deleted` : ` item cart did not exist`})
})



app.patch('/api/cart/minus/:id', (req,res)=>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid):'';
    if(!sid || !username){
        res.status(401).json({error: 'missing username or sid in patch server'});
        return;
    }
    const {id} = req.params;
    const cartList = users.getUserCart(username);
    if(!cartList.contains(id)){
        res.status(404).json({error: `invalidID`, message:`can not minus`});
        return;
    }
    if(cartList.isMin(id)){
        res.status(400).json({error: 'the product you select could not lower than 0'})
        return;
    }

    cartList.minus(id);
    res.json(cartList.getItems(id))


})

app.patch('/api/cart/add/:id', (req,res)=>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid):'';
    if(!sid || !username){
        res.status(401).json({error: 'missing username or sid in patch server'});
        return;
    }
    const {id} = req.params;
    const cartList = users.getUserCart(username);
    if(!cartList.contains(id)){
        res.status(404).json({error: `invalidID`, message:`can not minus`});
        return;
    }
    cartList.add(id);
    res.json(cartList.getItems(id))
})

app.post('/api/products/:category', (req,res) =>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
        res.status(401).json({ error: 'missing' });
        return;
    }
    const {category} = req.params;
    const newList = products.searchCategory(category);
    res.json(newList);
})

app.post('/api/products/search/:letters',(req,res)=>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
        res.status(401).json({ error: 'missing' });
        return;
    }
    const {letters} = req.params;
    const newList = products.searchItems(letters);
    res.json(newList);
})

app.get('/api/orders', (req,res) =>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid):'';
    if( !sid || !username){
        res.status(401).json({error :'missing username or sid when get orders'})
        return;
    }
    res.json(users.getUserOrders(username).getOrders());
})

app.get('/api/cart/chectout', (req,res) =>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
        res.status(401).json({ error: 'missing' });
        return;
    }
    const cartList = users.getUserCart(username);
    const items = cartList.getItems();
    if( cartList.isEmpty()){
        res.status(400).json({error: 'cart can not be empty'})
        return;
    }
    if(cartList.isZero()){
        res.status(400).json({error: 'your shopping list should contain one item to checkout'})
        return;
    }
    const orderList = users.getUserOrders(username);
    orderList.addOrder(items)
    res.json(users.getUserOrders(username).getOrders())
})

app.post('/api/orders/:id',(req,res)=>{
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid):'';
    if(!sid || !username){
        res.status(401).json({error: 'missing for getting inofrmation in server'})
        return;
    }
    const{id} = req.params;
    const orderList = users.getUserOrders(username);
    const information =orderList.getInformation(id);
    res.json(information);
})

app.post('/api/store/addproduct',(req,res) =>{
    const{product} = req.body;
    if(product.name === ''){
        res.status(400).json({error: 'name cannot be null'})
        return;
    }
    if(isNaN(product.price)){
        res.status(400).json({error: 'Price must be a number'})
        return;
    };
    if(product.price ===''){
        res.status(400).json({error: 'Price cannot be null'})
        return;
    };
    
    if(product.category ===''){
        res.status(400).json({error: 'category cannot be null'})
        return;
    };
    if(products.isContains(product.name)){
        res.status(400).json({error: 'your product is existing'})
        return;
    }

    products.addProducts(product);
    res.json(products.getProducts());
})
app.post('/api/store/changeproduct/:id',(req,res) =>{
    
    const {id} = req.params;
    const{product} = req.body;
    if(product.name === ''){
        res.status(400).json({error: 'name cannot be null'})
        return;
    }
    if(isNaN(product.price)){
        res.status(400).json({error: 'Price must be a number'})
        return;
    };
    if(product.price ===''){
        res.status(400).json({error: 'Price cannot be null'})
        return;
    };
    
    if(product.category ===''){
        res.status(400).json({error: 'category cannot be null'})
        return;
    };
    if(!products.productsStorage[id].productName === product.name){
        if(products.isContains(product.name)){
            res.status(400).json({error: 'your product is existing'})
            return;
        }
    }
    products.changeProduct(id,product);
    res.json(products.getProducts());
})
app.delete('/api/store/delete/:id',(req,res)=>{
    const {id} = req.params;
    products.deleteProduct(id);
    res.json(products.getProducts());
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));