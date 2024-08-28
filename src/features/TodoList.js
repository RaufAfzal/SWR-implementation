import { useState } from 'react';
import useSWR from 'swr';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    todosApiEndPoint as cacheKey
} from '../api/todoapi';

import {
    addTodoOption,
    updateTodoOptions,
    deleteTodoOptions
} from '../api/todoSWROption';


const TodoList = () => {
    const [newTodo, setNewTodo] = useState("");

    const {
        isLoading,
        error,
        data: todos,
        mutate
    } = useSWR(cacheKey, getTodos, {
        onSuccess: data => data.sort((a, b) => b.id - a.id)
    });

    const addTodoMutation = async (newTodo) => {
        try {
            await mutate(
                addTodo(newTodo),
                addTodoOption(newTodo)
            );
            toast.success('Item added successfully!');
        } catch (err) {
            toast.error('Failed to add Item: ' + err.message);
        }
    };

    const updateTodoMutation = async (todo) => {
        try {
            await mutate(
                updateTodo(todo),
                updateTodoOptions(todo)
            );
            toast.success('Item updated successfully!');
        } catch (err) {
            toast.error('Failed to update Item: ' + err.message);
        }
    };

    const deleteTodoMutation = async ({ id }) => {
        try {
            await mutate(
                deleteTodo({ id }),
                deleteTodoOptions({ id })
            );
            toast.success('Item deleted successfully!');
        } catch (err) {
            toast.error('Failed to delete Item: ' + err.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodoMutation({ title: newTodo, completed: false, userId: 1 });
        setNewTodo('');
    };

    let selectedItems = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="todo">Enter a new Todo</label>
            <input
                type="text"
                id="todo"
                placeholder='please add an item'
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)} />
            <button> Please Click it </button>
        </form>
    );

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (error) {
        content = <p>{error.message}</p>;
    } else {
        content = todos.map((todo, index) => {
            return (
                <article key={index}>
                    <div className="todo">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() =>
                                updateTodoMutation({ ...todo, completed: !todo.completed })
                            }
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <button className="trash" onClick={() => deleteTodoMutation({ id: todo.id })}>
                        Delete
                    </button>
                </article>
            );
        });
    }

    return (
        <>
            {selectedItems}
            {content}
            <ToastContainer />
        </>
    );
}

export default TodoList;
