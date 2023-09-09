import Todo from ".";
import TodoItem from "./TodoItem";
function TodoList({todos, toggleTodo, deleteTodo}){
    return(
        <ul className = 'list'>
        {todos.length === 0 && "No tasks yet!"}
        {todos.map(todo => {
              return (
                <TodoItem 
                completed={todo.completed} 
                id={todo.id} title={todo.title} 
                key={todo.id}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                />
            )
        })}
    </ul>

    )

}

export default TodoList;