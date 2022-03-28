import './TodoList.css'
import {useState, useEffect} from 'react';
import { fetchAddTodo, fetchDeleteTodo, fetchTodos, fetchUpdateTodo } from './services';


function TodoList({todos, refresh}){
    const [task,setTask] = useState('')
    const [complete,setComplete]= useState(true)
    useEffect( ()=>{
        refresh()
    },[])
    
    function removetodos(e){
        e.preventDefault();
        fetchDeleteTodo(e.target.dataset.id)
        .then(
           //add populate work
           refresh()
        )
        .catch(err=>{
            console.log('something wrong in delete',err)
        })
        
    }

    function addtodos(e)  {
        e.preventDefault();
        if(!task){
            return;
        }
        fetchAddTodo(task)
        .then(
            //add ppopulate
            refresh()
        )
        .catch(err=>
            console.log('something wrong when adding',err)
        )
    }    

    function tocompelete(e){
       
        const id = e.target.dataset.id;
        // console.log(e.target);
        // console.log(todos[id])
        console.log(todos[id].done)
        console.log(e.target.className)
        fetchUpdateTodo(id, {done: !todos[id].done})
        .then( todo=>
            todos[id]=todo,
            setComplete(todos[id].done)
        )
        .then(
            refresh()
        )
        .catch(err=>{
            console.log('something wrong with compelete',err);
        })
    }
    

    return(
        <div className="todos">
            <ul className="todolist">
            {
                Object.values(todos).map(todo=>{
                    return (
                        <label className="todo">
                        <li key={todo.id}>
                        <label  className="todo_task" onClick={tocompelete}>
                                    <span  classname={complete?"complete" :"nocomplete"} data-id={todo.id}>
                                        
                                        {todo.task}

                                    </span>
                                    <span className={complete} data-id={todo.id}>

                                        {todo.done?"    ✅": ""}
                                    </span>
                                    
                        </label>
                            <button data-id={todo.id} onClick={removetodos} >X</button>
                        </li>
                        </label>
                )    
                })
            }
            </ul>
            <form className="add_todos" onSubmit={addtodos}>
                <span>AddTast:</span>
                <input value = {task} onInput={(e)=>{setTask(e.target.value)}} />
                <button disabled={!task}>Add</button>
            </form>
        </div>
        
    )
}

export default TodoList;
