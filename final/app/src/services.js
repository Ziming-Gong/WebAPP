
export function fetchLogin(username){
  return fetch('/api/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ username }),
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}

export function fetchLogout() {
    return fetch('/api/session', {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
}

export function fetchSession() {
    return fetch('/api/session', {
      method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
}

export function fetchGetStore(){
  return fetch('/api/products')
  .catch( ()=> Promise.reject({error:' can not get products'}))
  .then(response => {
    if(response.ok){
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({error}))
    .then(err => Promise.reject(err));
  })
}

export function fetchGetCart(){
  return fetch ('/api/cart')
  .catch( ()=> Promise.reject({error:' can not get cart'}))
  .then(response => {
    if(response.ok){
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({error}))
    .then(err => Promise.reject(err));
  })
}


export function fetchAddItem(productID){
  return fetch('/api/addtocart',{
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({productID}),
  })
  .catch( () => Promise.reject({error: 'netError'}))
  .then(response =>{
    if(response.ok){
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({error}))
    .then(err => Promise.reject(err));
  })
}

export function fetchDeleteItem(id){
  return fetch(`/api/cart/${id}` ,{
    method: 'DELETE',
  })
  .catch( () => Promise.reject({error: 'network Error in delete'}))
  .then( response =>{
    if(response.ok){
      return response.json();
    }
    return response.json()
    .catch(error => Promise.reject({error}))
    .then( err => Promise.reject(err));
  })
}

export function fetchDeleteItems(){
  return fetch('/api/cart/clean')
  .catch( () => Promise.reject({error: 'network Error in delete'}))
  .then( response =>{
    if(response.ok){
      return response.json();
    }
    return response.json()
    .catch(error => Promise.reject({error}))
    .then( err => Promise.reject(err));
  })
}

export function fetchMinus(id){
  return fetch(`/api/cart/minus/${id}`,{
    method: 'PATCH',
    headers: new Headers({
      'content-type': 'application/json',
    }),
  })
  .catch( ()=> Promise.reject({error: 'networkError'}))
  .then( response =>{
    if(response.ok){
      return response.json();
    }
    return response.json()
    .catch(error => Promise.reject({error}))
    .then(err => Promise.reject(err))
  })
}
  export function fetchAdd(id){
    return fetch(`/api/cart/add/${id}`,{
      method: 'PATCH',
      headers: new Headers({
        'content-type': 'application/json',
      }),
    })
    .catch( ()=> Promise.reject({error: 'networkError'}))
    .then( response =>{
      if(response.ok){
        return response.json();
      }
      return response.json()
      .catch(error => Promise.reject({error}))
      .then(err => Promise.reject(err))
    })
  }

export function fetchGetStoreByCategory(category){
  return fetch(`/api/products/${category}`,{
    method: 'POST',
  })
  .catch(()=> Promise.reject({error: 'server side error'}))
  .then(response =>{
    if(response.ok){
      return response.json()
    }
    return response.json()
    .catch(error => Promise.reject({error}))
    .then( err => Promise.reject(err))
  })

}

export function fetchGetStoreByLetters(letters){
  return fetch(`/api/products/search/${letters}`,{
    method: 'POST',
  })
  .catch(()=> Promise.reject({error: 'server side error'}))
  .then(response =>{
    if(response.ok){
      return response.json()
    }
    return response.json()
    .catch(error => Promise.reject({error}))
    .then( err => Promise.reject(err))
  })
}

export function fetchGetOrderList(){
  return fetch('/api/orders',{
    method: 'GET',
    headers: new Headers({
      'content-type': 'application/json',
    }),
  })
  .catch(()=> Promise.reject({error :'network is not working'}))
  .then( response =>{
    if(response.ok){
      return response.json()
    }
    return response.json()
    .catch(error => Promise.reject({ error}))
    .then(err => console.log(err));
  })
}

export function fetchcheckout(){
  return  fetch('/api/cart/chectout',{
  method:"GET",
  headers: new Headers({
    'content-type': 'application/json',
  }),
  })
  .catch( () => Promise.reject({error : 'net'}))
  .then(response =>{
  if(response.ok){
    return response.json();
  }
  return  response.json()
  .catch(error => Promise.reject({error}))
  .then( err => Promise.reject(err));
  })
}

export function fetchGetInformation(id){
  return fetch(`/api/orders/${id}`,{
    method: 'POST',
  })
  .catch( ()=> Promise.reject({ error :'net not work'}))
  .then( response =>{
    if(response.ok){
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({error}))
    .then( err => Promise.reject(err))
  })
}

export function fetchAddProduct(product){
  return fetch('/api/store/addproduct',{
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({product}),
  })
  .catch( () => Promise.reject({error:'networkError'}))
  .then( response=>{
    if(response.ok){
      return response.json();
    }
    return response.json()
    .catch(error => Promise.reject({error}))
    .then( err => Promise.reject(err));
  })

}

export function fetchChangeProduct(id,product){
  return fetch(`/api/store/changeproduct/${id}`,{
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({product}),
  })
  .catch( () => Promise.reject({error:'networkError'}))
  .then( response=>{
    if(response.ok){
      return response.json();
    }
    return response.json()
    .catch(error => Promise.reject({error}))
    .then( err => Promise.reject(err));
  })
}

export function fetchDeleteProduct(id){
  return fetch(`/api/store/delete/${id}`,{
    method: 'DELETE',
  })
  .catch( () => Promise.reject({error:'networkError'}))
  .then( response=>{
    if(response.ok){
      return response.json();
    }
    return response.json()
    .catch(error => Promise.reject({error}))
    .then( err => Promise.reject(err));
  })
}