import React from 'react';

/**
 * One row in the list: shows text with Edit/Delete,
 * or an input with Save/Cancel when editing.
 */
function TodoItem({
  todo,
  isEditing,
  editText,
  onEditTextChange,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}) {
  if (isEditing) {
    return (
      <li className="todo-item todo-item--editing">
        <input
          type="text"
          className="todo-input todo-input--inline"
          value={editText}
          onChange={(e) => onEditTextChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSaveEdit();
            if (e.key === 'Escape') onCancelEdit();
          }}
          autoFocus
        />
        <div className="todo-actions">
          <button type="button" className="btn btn--primary" onClick={onSaveEdit}>
            Save
          </button>
          <button type="button" className="btn btn--ghost" onClick={onCancelEdit}>
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="todo-item">
      <span className="todo-text">{todo.text}</span>
      <div className="todo-actions">
        <button type="button" className="btn btn--secondary" onClick={onStartEdit}>
          Edit
        </button>
        <button type="button" className="btn btn--danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
