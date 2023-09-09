import React, { useEffect } from 'react';
import '../../styles/todoPage/styles.css'
import { useState } from 'react'
import NewTodoForm from './NewTodoForm';
import TodoList from './TodoList';
import { useLocation } from 'react-router-dom'
import axios from 'axios';


const getUsername = () => {
    const location = useLocation();
    const username = location.state.user.username;
    return username;
}


function Todo(){
    const username = getUsername();
    console.log(username);
    // get default value todos from api call and set it to state
    // make api call to get todos
    let [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/todos/'+ username,{
            params: {
                username: username
            }
        })
        .then(function (response) {
            console.log(response.data.todos);
            setTodos(response.data.todos);
            return response.data.todos;
        })
    }, []);
 
    function addTodo(title){
        // make api call to add todo
        let id = crypto.randomUUID();
        let note ={title:title, completed:false, id:id};
        axios.post('http://localhost:3000/todos/add',{
            username: username,
            todoItem: note
        })
        .then(function (response) {
            console.log(response.data);
            return response.data;
        })
          
        setTodos(currentTodos => {
            
            return [
                ...currentTodos,
                {id: id, title, completed: false},
            ]
        })
    }

    function toggleTodo(id, completed){

        // make api call to update todo
        axios.put('http://localhost:3000/todos/update',{
            username: username,
            todoId: id,
            completed: completed
        })
        .then(function (response) {
            console.log(response.data);
            return response.data;
        })
        
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                if(todo.id === id){
                    todo.completed = completed;
                    return {...todo, completed}
                }
                return todo;
            })
        })
    }

    function deleteTodo(id){
        // make api call to delete todo
        fetch('http://localhost:3000/todos/delete/'+ username + "/" + id, {
            method: 'DELETE'
        }).then((res) => {
            console.log(res);
        })

        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== id)
        })
    }
    return(
        <>
        <div className = "todo-container">
            <NewTodoForm onSubmit={addTodo}/>
            <h1 className = 'header'>Todo List</h1>
            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>

        </div>
        </>
    )
}

export default Todo;