import axios from "axios";

const todosApi = axios.create({
    baseURL: "http://localhost:3500"
})

export const todosApiEndPoint = '/todos'

export const getTodos = async () => {
    const response = await todosApi.get(todosApiEndPoint)
    return response.data
}

export const addTodo = async (initialPost) => {
    const response = await todosApi.post(todosApiEndPoint, initialPost)
    return response.data
}

export const updateTodo = async (todo) => {
    const response = await todosApi.patch(`${todosApiEndPoint}/${todo.id}`, todo)
    return response.data
}

export const deleteTodo = async ({ id }) => {
    const response = await todosApi.delete(`${todosApiEndPoint}/${id}`)
    return response.data
}
