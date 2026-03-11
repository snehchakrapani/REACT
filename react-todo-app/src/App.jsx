import { useState } from 'react'
import './App.css'

export default function App() {
    const [inpuValue, setInputValue] = useState('')
  return (
    <div className="container">
      <h1>Todo App</h1>

      <div className = "input-box">
        <input 
        type = "text"
        placeholder = "Enter todo..."
        value={inpuValue}
        onChange={(e) => setInputValue(e.target.value)}
    />
    <button>Add</button>
    </div>
    </div>
  )
}