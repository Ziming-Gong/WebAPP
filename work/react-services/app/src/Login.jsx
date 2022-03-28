import {useState} from 'react'

import {fetchLogin} from './services'
function Login({onLogin}){
    const [username, setUsername] = useState('')

    function onSubmit(e){
        e.preventDefault();
        if(!username){
            return;
        }
        fetchLogin(username)
        .then(  todos=>{
            onLogin({username,todos});
        })
        .catch(err =>{
            console.log('poop',err);
        });
    }
    return (
        <form className="login" onSubmit={onSubmit}>
            <label >
                <span>username</span>
                <input value={username} onInput={(e)=>setUsername(e.target.value)}/>
            </label>
                <button disabled={!username}>Login</button>
        </form>
    )
}

export default Login