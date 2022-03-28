import {useState} from 'react'
import { fetchLogout, fetchTodos } from './services'
import TodoList from './TodoList'

function Content({username, todos, onLogout}){

    const [newTodos, setNewTodos] = useState({todos})
    
    function quit(){
        fetchLogout()
        .then(()=>{
            onLogout();
        })
        .catch(err =>{
            console.log('poop', err)
        })
    }

    function refresh(){
        fetchTodos()
        .then( newTodos =>{
            setNewTodos(newTodos)
        })
        .catch(err=>{
            console.log('something wrong', err)
        })
    }

    return (
        <div className="content">
            <button onClick={onLogout,quit} >Logout</button>
            <button onClick ={refresh}>Refresh</button>
            {username}
            <TodoList todos={newTodos} refresh={refresh}/>
        </div>
    )
}
export default Content