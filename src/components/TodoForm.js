import React, { useState, useContext, useEffect } from 'react';
import TodosContext from '../context';
import uuidv4 from 'uuid/v4';
import Axios from 'axios';
const TodoForm = () => {
    const [todo, setTodo] = useState("");
    const { state: { currentTodo = {} }, dispatch } = useContext(TodosContext);
    useEffect(() => {
        if (currentTodo.text) {
            setTodo(currentTodo.text)
        } else {
            setTodo('');
        }
    }, [currentTodo.id])


    const handleSubmit = async e => {
        e.preventDefault();
        if (currentTodo.text) {
            const response = Axios.patch(`https://todos-api-nddiunpfpl.now.sh/todos/${currentTodo.id}`, {
                text: todo
            })
            dispatch({ type: "UPDATE_TODO", payload: response.data })
        } else {
            const response = await Axios.post(`https://todos-api-nddiunpfpl.now.sh/todos`, {
                id: uuidv4(),
                text: todo,
                complete: false
            })
            dispatch({ type: "ADD_TODO", payload: response.data });
        }
        setTodo("");

    }


    return (
        <form onSubmit={handleSubmit} className='flex justify-center p-5'>
            <input value={todo} onChange={e => setTodo(e.target.value)} type="text" className='border-black border-solid border-2' />
        </form>
    )
}

export default TodoForm;