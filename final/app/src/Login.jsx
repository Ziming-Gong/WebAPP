import { useState } from "react";

import { fetchGetOrderList, fetchLogin } from "./services";
import './Login.css'
function Login ({onLogin}){
    const[username, setUsername] = useState('');
    const [err,setErr] = useState('');
    function onSubmit(e){
        setErr('')
        e.preventDefault();
        if(!username){
            return;
        }
        fetchLogin(username)
        .then(  cart=>{
            fetchGetOrderList()
            .then( orders =>{
                onLogin({username,cart,orders});
            })
        })
        .catch(error =>{
            console.log('poop',error);
            setErr(`${error[`error`]}`);
        })
    }

    return (
        <form className="login" onSubmit={onSubmit}>
            <label>
                <span className="login-username">username</span>
                <input value={username} onInput={(e)=>setUsername(e.target.value)} />
            </label>
            <div className="login-submit">
                <button disabled={!username}>Login</button>
            </div>
            <span className="login-message">{err}</span>
        </form>
    ) 
}

export default Login;