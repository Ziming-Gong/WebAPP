import { fetchAddItem, fetchGetCart, fetchGetStore, fetchGetStoreByCategory, fetchGetStoreByLetters } from './services';
import { useEffect, useState } from 'react';
import EmployeeControl from './EmployeeControl';
import ProductChange from './ProductChange';

function StoreDisPlay({cart,update,username}){
    const [products, setProducts] = useState({});
    const [category, setCategory]= useState('');
    const [letters, setLetters] = useState('');
    const [open,setOpen]= useState(false);
    const [productShow, setProductShow] = useState({});
    useEffect(
        ()=>{
        fetchGetStore()
        .then(results => {
            setProducts(results);
        })
        .catch(
            err=>{console.log('poop', err)}
        )
        },[]
    )

    function updateStore(){
      fetchGetStore()
        .then(results => {
            setProducts(results);
        })
        .catch(
            err=>{console.log('poop', err)}
        )
    }

    useEffect(
      () =>{
        if(category === 'all' || category ===''){
          fetchGetStore()
          .then(results => {
              setProducts(results);
          })
          .catch(
              err=>{console.log('poop', err)}
          )
        }else{
          fetchGetStoreByCategory(category)
          .then(results =>{
            setProducts(results);
          })
          .catch(
            err => {console.log('poop',err)}
          )
        }

      },[category]
    )

    useEffect(
      () =>{
        if(letters === 'please type a product name' || letters ===''){
          fetchGetStore()
          .then(results => {
              setProducts(results);
          })
          .catch(
              err=>{console.log('poop', err)}
          )
        }else{
          fetchGetStoreByLetters(letters)
          .then(results =>{
            setProducts(results);
          })
          .catch(err =>{console.log('poop', err)})
          }

      },[letters]
    )

    function addCart(e){
      const id = e.target.dataset.id;
      fetchAddItem(id)
      .then(
        update()
      )
      .catch(err =>console.log('something wrong with adding to cart', err));
    } 

    function getOpen(e) {
      const id = e.target.dataset.id;
      setOpen(!open);
      setProductShow({[id]: open})
    }

    return (
      <div className="store">
        <p className="store-title">Products </p>
        <div className="store-control">
          <input type="radio" id="all" name="category" value="all"  onClick={e=>setCategory(e.target.value)}/>
          <label >all</label> 
          <input type="radio" id="meat" name="category" value="meat" onClick={e=>setCategory(e.target.value)}/>
          <label >meat</label> 
          <input type="radio" id="fruit" name="category" value="fruit"onClick={e=>setCategory(e.target.value)}/>
          <label >fruit</label> 
          <input type="radio" id="snacks" name="category" value="snacks"onClick={e=>setCategory(e.target.value)}/>
          <label >snacks</label> 
        </div>
        <div className="store-search">
          <input className="store-searchbox" type="text" defaultValue={'product name'} onInput={(e) => setLetters(e.target.value)}/>
        </div>
        <div className="store-product">
          <ul className="store-list">
          {
            Object.values(products).map(product =>{
              return (
                <ul className="store-productdetail" key={product.id}>
                  <label className="products" >
                    <div className="store-productname" data-id={product.id}onClick={getOpen}>
                      {product.productName} 
                    </div>
                    {username.indexOf('employee') > -1 && productShow[product.id] && <ProductChange product={product} updateStore={updateStore}/>}
                    {username.indexOf('employee') === -1 &&<div className="store-productprice">
                      ${product.price}
                    </div>}
                  {username.indexOf('employee') === -1 && <button className="store-tocart" data-id={product.id} onClick={addCart}>
                    add to cart</button>}
                  </label>
                </ul>
              )
            })
          }
        </ul>
        </div>
        {username.indexOf('employee') >-1 && <EmployeeControl updateStore={updateStore} />}
      </div>
    )
}

export default StoreDisPlay;