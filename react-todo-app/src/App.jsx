import { useState } from 'react'
import './App.css'

export default function App() {
    const [inpuValue, setInputValue] = useState('')
    const [todos, setTodos] = useState([])

    function addTodo(){
        if(inpuValue === '')return
        setTodos([...todos,{id:Date.now(),text:inpuValue,completed:false}])
        setInputValue('')
    }

  return (
    <div className="container">
      <h1>Todo App</h1>

      <div className = "input-box">
        <input 
        type = "text"
        placeholder = "Enter todo..."
        value={inpuValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown = {(e)=> e.key === 'Enter' && addTodo()}    
    />
    <button onClick={addTodo}>Add</button>
    </div>

    <ul className="todo list">
        {todos.map(todo =>
            <li key = {todo.id} className="todo-item">
                <span>{todo.text}</span>
                </li>
        )}
        </ul>
    </div>
  )
}