import { useState } from 'react'
import './App.css'
import Login from './Login'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  function addTodo() {
    if (inputValue === '') return
    setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }])
    setInputValue('')
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function toggleComplete(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  function startEdit(todo) {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  function saveEdit(id) {
    if (editText.trim() === '') return
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    ))
    setEditingId(null)
    setEditText('')
  }

  function cancelEdit() {
    setEditingId(null)
    setEditText('')
  }

  return (
    <div className="container">
      <h1>Todo App</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter todo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">

            {todo.id === editingId ? (
              <div className="edit-mode">
                <input
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit(todo.id)
                    if (e.key === 'Escape') cancelEdit()
                  }}
                  autoFocus
                />
                <IconButton onClick={() => saveEdit(todo.id)} sx={{ color: '#4caf50', padding: '4px' }}>
                  <SaveIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={cancelEdit} sx={{ color: '#aaa', padding: '4px' }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            ) : (
              <div className="view-mode">
                <span
                  className={todo.completed ? 'completed' : ''}
                  onClick={() => toggleComplete(todo.id)}
                >
                  {todo.text}
                </span>
                <div className="btn-group">
                  <IconButton onClick={() => startEdit(todo)} sx={{ color: '#64b5f6', padding: '4px' }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
                </div>
              </div>
            )}

          </li>
        ))}
      </ul>
    </div>
  )
}