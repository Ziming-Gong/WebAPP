import { useEffect, useState } from "react";
import { fetchAddProduct, fetchGetStore } from "./services";


function EmployeeControl({updateStore}){
    const [productname, setProductName] = useState('');
    const [category, setCategory]= useState('');
    const [price,setPrice] = useState(0.00);
    const [err,setErr] = useState('');

    function addProduct(e){
        setErr('');
        const productname = e.target.dataset.name;
        const category = e.target.dataset.category;
        const price = e.target.dataset.price;
        const product = {
            name: productname,
            price: price,
            category: category
        }
        fetchAddProduct(product)
        .catch(error =>{
            console.log('something wrong with adding product', error);
            setErr(`${error[`error`]}`);
        })
        .then(
            updateStore()
        )
        setPrice(0);
        setProductName('');
        setCategory('')

    }
    return(
        <div className="addproduct">
          
            <span className="addproduct-title">Add Products</span>
            <div className="addproduct-setname">Set Name: {productname}
                <div>
                    <input value={productname} onInput={(e) => {setProductName(e.target.value)}}/>  
                </div>
            </div>
            <div className="addproduct-setprice"> Set Price: {price}
                <div>
                    <input value={price} onInput={(e) => {setPrice(e.target.value)}}/>  
                </div>
            </div>
            <div className="addproduct-setcategory">
                <input type="radio" id="meat" name="category" value="meat" onClick={e=>setCategory(e.target.value)}/>
                <label >meat</label> 
                <input type="radio" id="fruit" name="category" value="fruit"onClick={e=>setCategory(e.target.value)}/>
                <label >fruit</label> 
                <input type="radio" id="snacks" name="category" value="snacks"onClick={e=>setCategory(e.target.value)}/>
                <label >snacks</label> 
            </div>
            <div className="addproduct-submit">
                <button  data-name={productname} data-category={category} data-price={price} onClick={addProduct}>submit</button>
            </div>
            <div className="addproduct-error">
                {err}
            </div>
        </div>
    )
}

export default EmployeeControl;