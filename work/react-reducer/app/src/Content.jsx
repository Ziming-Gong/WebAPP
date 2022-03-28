import {useContext, useState} from 'react'
import ContentContext from './ContentContext'
import { fetchLogout, fetchTodos } from './services'
import TodoList from './TodoList'
import TodoListContext from './TodoListContext'

function Content({username,todos, dispatch}){

    //const [newTodos, setNewTodos] = useState({todos})
    const {onLogout, onRefresh, onAddTodo, onToggle, onDelete} = useContext(ContentContext);
    
    
    function quit(){
        fetchLogout()
        .then(()=>{
            // onLogout();
            onLogout();
        })
        .catch(err =>{
            console.log('poop', err)
        })
    }

    function refresh(){
        fetchTodos()
        .then( todos =>{
            onRefresh(todos)
        })
        .catch(err=>{
            console.log('something wrong', err)
        })
    }

    return (
        <div className="content">
            <button onClick={quit} >Logout</button>
            <button onClick ={refresh}>Refresh</button>
            {username}
            <TodoListContext.Provider value={{
                onToggle,
                onDelete,
                onAddTodo,
            }}>
                <TodoList todos={todos} dispatch={dispatch} refresh={refresh}/>
            </TodoListContext.Provider>
            
        </div>
    )
}
export default Content