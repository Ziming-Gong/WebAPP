import {useState, useEffect} from 'react'

import Login from './Login'
import Content from './Content'
import { fetchSession ,fetchTodos} from './services';
function App() {
  const [username, setUsername] = useState('');
  const [todos,setTodos] = useState({});
  useEffect(
    ()=>{
      fetchSession()
      .then(session =>{
        fetchTodos()
        .then( results=>{
          setTodos(results);
          setUsername(session.username)
        })
        .catch(
          err=>{
            console.log('poop',err)
          }
        )
      })
    },[]

  )

  function onLogin({username,todos}){
    setUsername(username);
    setTodos(todos);
  }
  function onLogout(){
    setUsername('');
    setTodos({})
  }
  return (
    <div className="App">
      {!username && <Login onLogin ={onLogin}/>}
      {username && <Content username ={username} todos={todos} onLogout={onLogout}/>}
    </div>
  );
}

export default App;
