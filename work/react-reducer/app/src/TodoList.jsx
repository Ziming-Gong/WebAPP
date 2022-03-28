
import {useContext, useEffect} from 'react';
import { fetchAddTodo, fetchDeleteTodo, fetchUpdateTodo } from './services';
import TodoListContext from './TodoListContext';


function TodoList({todos, dispatch,refresh}){
    const {onToggle,onDelete, onAddTodo}= useContext(TodoListContext);

    let task ='';
    useEffect( ()=>{
        refresh()
    },[])
    
    function removetodos(e){
        e.preventDefault();
        fetchDeleteTodo(e.target.dataset.id)
        .then(
           onDelete(e.target.dataset.id)
           //refresh()
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
        .then(todo=>
            onAddTodo(todo),
            refresh()
        )
        .catch(err=>
            console.log('something wrong when adding',err)
        )
    }    

    function tocompelete(e){
       
        const id = e.target.dataset.id;
        fetchUpdateTodo(id, {done: !todos[id].done})
        .then( id=> {
            ontoggle(id)
        }   
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
                                    <span  classname={todo.done?"complete" :"nocomplete"} data-id={todo.id}>                                  
                                        {todo.task}
                                    </span>
                                    <span className={todo.done} data-id={todo.id}>
                                        {todo.done?"    ✅": ""}
                                    </span>        
                                </label>
                                    <button
                                        className="todo__delete" 
                                        data-id={todo.id} onClick={removetodos} >X</button>
                            </li>
                        </label>
                )    
                })
            }
            </ul>
            <form className="add_todos" onSubmit={addtodos}>
                <span>AddTast:</span>
                <input  onInput={(e)=>{
                    task=e.target.value
                    }} />
                <button disabled={false}>Add</button>
            </form>
        </div>
        
    )
}

export default TodoList;
