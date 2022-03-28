import { useState } from "react";
import {fetchChangeProduct, fetchDeleteProduct} from'./services';

function ProductChange({product,updateStore}){
    const [productname, setProductName] = useState(product.productName);
    const [category, setCategory]= useState(product.category);
    const [price,setPrice] = useState(product.price);
    const [err, setErr] = useState('')

    function changeProduct(e) {
        setErr('');
        const id = e.target.dataset.id;
        const productname = e.target.dataset.name;
        const category = e.target.dataset.category;
        const price = e.target.dataset.price;
        const product = {
            name: productname,
            price: price,
            category: category
        }

        fetchChangeProduct(id,product)
        .catch(error =>{
            console.log('something wrong with adding product', err);
            setErr(`${error[`error`]}`);
        })
        .then(
            updateStore()
        )
        
    }
    function deleteProduct(e){
        const id = e.target.dataset.id;
        fetchDeleteProduct(id)
        .catch(err =>{
            console.log('something wrong in deleting product',err)
        })
        .then(
            updateStore()
        )
    }

    return(
        <div className="change-product">
            <div className="change-name">Set Name <br/>
                <input value={productname} onInput={(e) => {setProductName(e.target.value)}}/>  
            </div>
            <div className="change-price"> Set Price <br/>
                <input value={price} onInput={(e) => {setPrice(e.target.value)}}/>  
            </div>
            <div className="change-category">
                <input type="radio" id="meat" name="category" value="meat" onClick={e=>setCategory(e.target.value)}/>
                <label >meat</label> 
                <input type="radio" id="fruit" name="category" value="fruit"onClick={e=>setCategory(e.target.value)}/>
                <label >fruit</label> 
                <input type="radio" id="snacks" name="category" value="snacks"onClick={e=>setCategory(e.target.value)}/>
                <label >snacks</label> 
            </div>
            <div className="change-control">
                <button className="change-changeBtn" data-id={product.id} data-name={productname} data-category={category} data-price={price} onClick={changeProduct}>Change it</button>
                <button className="change-deleteBtn" data-id={product.id} onClick={deleteProduct}>delete</button>
            </div>
            <div className="change-error">
                {err}
            </div>
        </div>
    )
}

export default ProductChange