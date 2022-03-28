import { useState } from "react";
import { fetchAdd, fetchcheckout, fetchDeleteItem, fetchDeleteItems, fetchGetCart, fetchGetOrderList, fetchMinus } from "./services";


function CartList({cart,update}){
    const [err,setErr] = useState('');

    function deleteItem(e){
        e.preventDefault();
        fetchDeleteItem(e.target.dataset.id)
        .then(
            update()
        )
        .catch(err =>{
            console.log('something wrong in delete', err)
        })
    }
    
    function minus(e){
        setErr('')
        e.preventDefault();
        fetchMinus(e.target.dataset.id)
        .catch( error =>{
            console.log('someting with in checkout', error)
            setErr(`${error[`error`]}`);
        })
        .then(
            update()
        )
        .catch(err =>{
            console.log('something wrong in minus', err)
        })
    }

    function add(e){
        setErr('')
        e.preventDefault();
        fetchAdd(e.target.dataset.id)
        .then(
            update()
        )
        .catch(err =>{
            console.log('something wrong in minus', err)
        })
    }

    function checkout() {
        setErr('')
        fetchcheckout()
        .catch( error =>{
            console.log('someting with in checkout', error)
            setErr(`${error[`error`]}`);
            console.log(err[error])
        })
        .then(
            fetchGetOrderList()
        )
        .then(clean())
        .then(update())
    }
    function clean(){
        setErr('')
        console.log('1')
        fetchDeleteItems()
        .catch( error =>{
            console.log('someting with in checkout', error)
            setErr(`${error[`error`]}`);
            console.log(err[error])
        })
        .then( update() )
        .catch( err =>{
            console.log('someting with in clean', err)
        })
    }

return (
    <div className="cart">
        <label>Shopping List:</label>
        {cart == {} ?  <p> nothing in your cartList</p> :''}
        <ul className="cart-list">
            {
            Object.values(cart).map(item=>{
                return(
                    <li className="cart-product" key={item.id}>
                        <label className="cart-name" key={item.name}>
                            {item.name} 
                        </label>
                        <label  className="cart-price">
                            ${item.price}
                        </label>
                        <label className="cart-control" key={item}>
                            <button data-id={item.id} onClick={minus} >⬇️</button>
                            <label >{item.amount}</label>
                            <button data-id={item.id} onClick={add}>⬆️</button>
                        </label>
                        <button className="cart-delete" data-id={item.id} onClick={deleteItem} key={item.id}>🚮</button>
                    </li>
                )
            })
            }
        </ul>
        <button className="cart-checkout" onClick={checkout}>Check Out</button>
        <button className="cart-clean" onClick={clean}>clean up</button>
        <div className="cart-error">
                {err}
        </div>
    </div>
    )    
}
export default CartList;