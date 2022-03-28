import { useEffect, useReducer} from 'react'

import Login from './Login'
import Content from './Content'
import { fetchSession ,fetchTodos} from './services';
import {reducer, initialState} from './reducer';

import LoginContext from './LoginContext';
import ContentContext from './ContentContext'
function App() {

  const [state, dispatch]= useReducer(reducer, initialState);

  const onDelete = (id)=>{
    dispatch({
      type : 'deleteTodo',
      id,
    });
  }
  const onToggle = (id)=>{
    dispatch({
      type:'toggleTodo',
      id,
    })
  }
  const onLogin= (username)=>{
    dispatch({
      type:'login',
      username,
    })
  }
  const onLoadTodos=(todos)=>{
    dispatch({
      type:'loadTodos',
      todos,
  })
  }

  const onLogout = ()=>{
    dispatch({
      type: 'logout',
  })
  }

  const onRefresh = (todos)=>{
    dispatch({
      type:'loadTodos',
      todos,
  })
  }
  const onAddTodo = (todo)=>{
    dispatch({
      type:'addTodo',
      todo,
  })
  }
  
  console.log(state);

  useEffect(
    ()=>{
      fetchSession()
      .then(session =>{
        fetchTodos()
        .then( results=>{
          dispatch({
            type: 'loadTodos',
            todos:results,
          })
        })
        .catch(
          err=>{
            console.log('poop',err)
          }
        )
        .finally(()=>{
          dispatch({
            type:'login',
            username:session.username
            
          })
        })
      })
    },[]
  )


  return (
    <div className="App">
      <LoginContext.Provider value={{
        onLogin,
        onLoadTodos,
      }}>
        {!state.username &&!state.isLoggedIn  && <Login username={state.username} dispatch={dispatch}/>}
      </LoginContext.Provider>
      <ContentContext.Provider value={{
        onDelete,
        onLogout,
        onRefresh,
        onToggle,
        onAddTodo,
      }}>
        {state.username && state.isLoggedIn&&<Content username={state.username} todos={state.todos} dispatch={dispatch}/>}
      </ContentContext.Provider>
    </div>
  );
}

export default App;
