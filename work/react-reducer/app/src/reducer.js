export const initialState={
    isLoading: false,
    isLoggedIn: false,
    todos: {},
}

export function reducer(state, action){

        switch(action.type){
            case 'loadTodos':
                return{
                    ...state,
                    isLoading: true,
                    todos: action.todos,
                }
            case 'logout':
                return {...state, isLoading: false,isLoggedIn: false, username:'', todos:{} };
            case 'login':
                return {...state, isLoggedIn: true, username: action.username};
            
            case 'addTodo':
                return {
                    ...state,
                    todos:{
                        ...state.todos,
                        ...action.todo,
                    },
                };
            case 'deleteTodo':
                const newTodos ={...state.todos};
                delete newTodos[action.id];
                return{
                    ...state,
                    todos:{
                        ...newTodos
                    },
                }

            case 'toggleTodo':
                return{
                    ...state,
                    todos:{
                        ...state.todos,
                        [action.id]:{
                            ...state.todos[action.id],
                            done: !state.todos[action.id].done,
                        }
                    },
                };
            default:
                return state;
        }
    }
    
