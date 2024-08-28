export const addTodoOption = (newTodo) => {
    return {
        optimisticData: (todos) => [...todos, newTodo].sort((a, b) => b.id - a.id),
        rollbackOnError: true,
        populateCache: (added, todos) => [...todos, added].sort((a, b) => b.id - a.id),
        revalidate: false
    }
}

export const updateTodoOptions = (updateTodo) => {
    return {
        optimisticData: (todos) => {
            const previousTodo = todos.filter(todo => {
                return todo.id !== updateTodo.id
            })
            return [...previousTodo, updateTodo].sort((a, b) => b.id - a.id)
        },
        rollbackOnError: true,
        populateCache: (updated, todos) => {
            const prevTodos = todos.filter(todo => {
                return todo.id !== updateTodo.id
            })
            return [...prevTodos, updated]
                .sort((a, b) => b.id - a.id)
        },
        revalidate: false,
    }
}


export const deleteTodoOptions = ({ id }) => {
    return {
        optimisticData: (todos) => {
            return todos.filter(todo => {
                return todo.id !== id
            })
        },
        rollbackOnError: true,
        populateCache: (emptyResponseObj, todos) => {
            return todos.filter(todo => {
                return todo.id !== id
            })
        },
        revalidate: false,
    }
}