export default function reducer(state, action) {
    switch (action.type) {
        case "GET_TODOS":
            return {
                ...state,
                todos: action.payload
            }
        case "ADD_TODO":
            // if (!action.payload) {
            //     alert('Please enter some text');
            //     return state;
            // }
            // if (state.todos.findIndex(t => t.text === action.payload) > -1) {
            //     alert('This To do already exists');
            //     return state;
            // }
            const addedTodos = [...state.todos, action.payload]
            return {
                ...state,
                todos: addedTodos
            }
        case "SET_CURRENT_TODO":
            return {
                ...state,
                currentTodo: action.payload
            }
        case 'TOGGLE_TODO':
            const toggleTodos = state.todos.map(t =>
                t.id === action.payload.id ? action.payload : t);
            return {
                ...state,
                todos: toggleTodos
            }
        case "UPDATE_TODO":
            // if (!action.payload) {
            //     alert('Please enter some text');
            //     return state;
            // }
            // if (state.todos.findIndex(t => t.text === action.payload) > -1) {
            //     alert('Could not be updated. Cannot be the same as previous todo');
            //     return state;
            // }
            const updatedTodo = { ...action.payload }
            const updatedTodoIndex = state.todos.findIndex(t => t.id === state.currentTodo.id)
            const updatedTodos = [
                ...state.todos.slice(0, updatedTodoIndex),
                updatedTodo,
                ...state.todos.slice(updatedTodoIndex + 1)
            ]
            return {
                ...state,
                currentTodo: {},
                todos: updatedTodos
            }
        case 'REMOVE_TODO':
            const filteredTodos = state.todos.filter(t => t.id !== action.payload.id);
            const isRemoveTodo = state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
            return {
                ...state,
                currentTodo: isRemoveTodo,
                todos: filteredTodos
            }
        default:
            return state;
    }
}