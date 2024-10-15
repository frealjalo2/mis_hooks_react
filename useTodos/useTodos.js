import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const init = () => JSON.parse(localStorage.getItem('todos')) || [];

export const useTodos = () => {

    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    
    }, [todos])
    

    const handNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        };
        dispatch(action);
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] delete Todo',
            payload: id
        });
    }

    const handleTodoDone = (id) => {
        dispatch({
            type: '[TODO] toggle Todo',
            payload: id
        });
    }

    return {
        todosCount: todos.length,
        todosPending: todos.filter(todo => !todo.done).length,
        handNewTodo,
        handleDeleteTodo,
        handleTodoDone,
        todos
    }

}