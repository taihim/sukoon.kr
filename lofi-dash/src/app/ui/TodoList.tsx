'use client';

import { useState, useEffect } from 'react';
import { FaTasks } from 'react-icons/fa';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('todos');
        if (stored) setTodos(JSON.parse(stored));
    }, []);

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        const todo = {
            id: Date.now().toString(),
            text: newTodo.trim(),
            completed: false
        };

        const updatedTodos = [...todos, todo];
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setNewTodo('');
    };

    const toggleTodo = (id: string) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const deleteTodo = (id: string) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    return (
        <div className="fixed right-8 top-6 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`absolute right-0 top-0 p-2 rounded-lg bg-zinc-900/90 border border-zinc-800 hover:bg-zinc-800/90 transition-colors ${
                    isOpen ? 'text-zinc-400' : 'text-white'
                }`}
            >
                <FaTasks size={20} />
            </button>

            <div className={`
                absolute right-0 top-12 w-80 
                bg-zinc-900/90 backdrop-blur-sm rounded-lg p-4 
                shadow-lg border border-zinc-800
                transition-all duration-300 ease-in-out origin-top
                ${isOpen 
                    ? 'scale-y-100 opacity-100' 
                    : 'scale-y-0 opacity-0 pointer-events-none'
                }
            `}>
                <h2 className="text-white font-vt323 text-xl mb-4">Todo List</h2>
                
                <form onSubmit={addTodo} className="mb-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-600 font-vt323"
                            placeholder="Add a task..."
                        />
                        <button
                            type="submit"
                            className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 rounded-md transition-colors font-vt323"
                        >
                            +
                        </button>
                    </div>
                </form>

                <div className="space-y-2 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
                    {todos.map(todo => (
                        <div
                            key={todo.id}
                            className="flex items-start gap-2 bg-zinc-800/50 p-2 rounded-md group min-w-0"
                        >
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                className="w-4 h-4 mt-1 shrink-0 rounded border-zinc-600 text-zinc-500 focus:ring-zinc-600 bg-zinc-700"
                            />
                            <div className="flex-1 min-w-0">
                                <span
                                    className={`block font-vt323 text-white break-words ${
                                        todo.completed ? 'line-through text-zinc-500' : ''
                                    }`}
                                >
                                    {todo.text}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="text-zinc-500 hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 