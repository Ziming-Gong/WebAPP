import {useEffect, useState} from 'react';
import {fetchGetCart, fetchLogout,fetchGetOrderList} from './services'
import Store from './Store';
import CartList from './CartList'
import OrderList from './OrderList'
function Content({username,cart,onLogout,orders}){
    const [newOrders, setNewOrders] = useState({orders})
    const [newCart, setNewCart] = useState({cart})
    useEffect(
        ()=>{
            fetchGetCart()
            .then( newCart =>{
                fetchGetOrderList()
                .then(newOrders=>{
                    setNewOrders(newOrders);
                    setNewCart(newCart)
                })
                
            })
            .catch(err => {console.log('something wrong in updating',err)})
            console.log('completing the useeffect in content.jsx')
        },[]
      )
    function Logout(){
        fetchLogout()
        .then(()=>{
            onLogout();
        })
        .catch(err =>{
            console.log('error', err)
        })
    }
    function update(){
        fetchGetCart()
        .then( newCart =>{
            fetchGetOrderList()
            .then(newOrders =>{
                setNewOrders(newOrders);
                setNewCart(newCart)
            })
        })
        .catch(err => {console.log('something wrong in updating',err)})
    }
    
    return (
        <div className="content">
            <button className="content-logout" onClick={onLogout, Logout}>Logout</button>
            
            <p className="content-welcome">Welcome {username}</p>
            <Store cart={cart} update={update} username={username}/>
            {username.indexOf('employee') === -1 && <CartList cart={newCart} update={update}/>}
            {username.indexOf('employee') === -1 && <OrderList orders ={newOrders}/>}
        </div>
    )
}

export default Content;

