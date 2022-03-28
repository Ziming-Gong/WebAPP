

import { useContext } from 'react';
import LoginContext from './LoginContext';
import {fetchLogin} from './services'
function Login({username,dispatch}){
    //const [username, setUsername] = useState('')
    //let username = state.username;

    const{onLogin,onLoadTodos}= useContext(LoginContext);

    function onSubmit(e){
        e.preventDefault();
        
        console.log(username);
        if(!username){
            return;
        }
        fetchLogin(username)
        .then(  todos=>{
            //onLogin({username,todos});
            onLoadTodos(todos)
            onLogin(username)
        })
        .catch(err =>{
            console.log('poop',err);
        });
    }
    return (
        <form className="login" onSubmit={onSubmit}>
            <label >
                <span>username</span>
                <input   onInput={(e)=>{
                    username = e.target.value;
                    //console.log(username)
                }}
                />
            </label>
                <button disabled={false}>Login</button>
        </form>
    )
}

export default Login