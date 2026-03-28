import React, { useState } from 'react';
import './App.css';
import TodoItem from './TodoItem';

function App() {
  // List of todos: each has a unique id and text
  const [todos, setTodos] = useState([]);
  // Text in the "add new todo" box
  const [newTodo, setNewTodo] = useState('');
  // Which todo is being edited (null = none)
  const [editingId, setEditingId] = useState(null);
  // Text while editing (only used when editingId is set)
  const [editText, setEditText] = useState('');

  // Create: add a new todo from the input
  const handleAdd = () => {
    const text = newTodo.trim();
    if (!text) return;

    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text },
    ]);
    setNewTodo('');
  };

  // Allow adding with Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  // Delete: remove one todo by id
  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditText('');
    }
  };

  // Start editing: remember which row and copy its text
  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // Update: save edited text
  const handleSaveEdit = () => {
    const text = editText.trim();
    if (!text || editingId === null) return;

    setTodos((prev) =>
      prev.map((t) => (t.id === editingId ? { ...t, text } : t))
    );
    setEditingId(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="app">
      <main className="app-card">
        <h1 className="app-title">My Todos</h1>

        <div className="add-row">
          <input
            type="text"
            className="todo-input"
            placeholder="What do you need to do?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="button" className="btn btn--primary" onClick={handleAdd}>
            Add
          </button>
        </div>

        <ul className="todo-list">
          {todos.length === 0 ? (
            <li className="todo-empty">No todos yet. Add one above.</li>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isEditing={editingId === todo.id}
                editText={editText}
                onEditTextChange={setEditText}
                onStartEdit={() => handleStartEdit(todo)}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                onDelete={() => handleDelete(todo.id)}
              />
            ))
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
