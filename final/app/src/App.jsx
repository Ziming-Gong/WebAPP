import { fetchGetCart, fetchGetOrderList, fetchGetStore, fetchSession } from './services';
import { useEffect, useState } from 'react';
import Login from './Login';
import Content from './Content'
import './App.css'


function App() {
  const [username, setUsername]= useState('');
  const [cart, setCart]= useState({});
  const [store, setStore]= useState({});
  const [orders,setOrders] = useState({});

  useEffect(
    ()=>{
      fetchGetStore()
      .then(store =>{
        fetchSession()
        .then(session =>{
          fetchGetCart()
          .then(cart =>{
            fetchGetOrderList()
            .then( orders =>{
              setOrders(orders)
              setCart(cart);
              setUsername(session.username);
              setStore(store)
            })
          })
          .catch(
            err => {console.log('error:',err)}
          )
        })
      })
      
    },[]
  )

  function onLogin({username, cart, orders}){
    setUsername(username);
    setCart(cart);
    setStore(store);
    setOrders(orders);
  }

  function onLogout(){
    setUsername('');
    setCart({});
    setStore({});
  }

  return (
    <div className="App">
      {!username && <Login onLogin = {onLogin} /> }
      {username && <Content username = {username} cart={cart} onLogout ={onLogout} orders={orders}/>}
      
    </div>
  );
}

export default App;