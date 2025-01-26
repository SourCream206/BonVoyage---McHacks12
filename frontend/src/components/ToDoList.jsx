import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/todos/') // Adjust API URL if needed
      .then((response) => setTodos(response.data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
