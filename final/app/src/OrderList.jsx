import { useEffect, useState } from 'react';
import { fetchGetInformation } from './services';
import Info from './info';

function OrderList({orders}){
    const [open,setOpen] = useState(false)
    const [orderOpen,setOrderOpen] = useState({})

    function getOrder(e){
        const id = e.target.dataset.id;
        setOpen(!open);
        setOrderOpen({[id]: open})
    }
    
    return(
        <div className="orders">
            <p>History Order:</p>
            <ul className="order-list">
            {
            Object.values(orders).map(order=>{
                return(                  
                    <label key={order.id}>
                        <li className="order-item" key={order.name} data-id={order.id} onClick={getOrder} >
                             {order.ordername}
                        </li>
                        {orderOpen[order.id] && <Info id= {order.id}/>}
                    </label>
                )
            })
            }
        </ul>
        </div>
    )
}
export default OrderList;
