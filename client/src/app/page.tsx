'use client';

import { useEffect, useState } from 'react';
import { getSocket } from '../lib/socket';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const socket = getSocket();

    // Fetch initial todos
    fetch('http://localhost:3001/todos')
      .then((res) => res.json())
      .then(setTodos);

    // Listen for real-time updates
    socket.on('todos', (updated: Todo[]) => {
      setTodos(updated);
    });

    return () => {
      socket.off('todos');
    };
  }, []);

  const createTodo = async () => {
    if (!title.trim()) return;
    await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    setTitle('');
  };

  const toggleTodo = async (id: number) => {
    await fetch(`http://localhost:3001/todos/${id}/toggle`, {
      method: 'POST',
    });
  };

  const deleteTodo = async (id: number) => {
    await fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE',
    });
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>TODO App (Real-Time + App Router)</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='New task' />
      <button onClick={createTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
