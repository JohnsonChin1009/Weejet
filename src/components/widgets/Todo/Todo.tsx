"use client";

import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setTodos(prev => [
      {
        id: crypto.randomUUID(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date()
      },
      ...prev
    ]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const clearCompleted = () => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Todo List</h2>
          <form onSubmit={addTodo} className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:border-white/50"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-white/20 rounded-xl text-white font-medium hover:bg-white/30 transition-all"
            >
              Add
            </button>
          </form>
        </div>

        {/* Filters */}
        <div className="flex gap-2 p-4 border-b">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-all",
              filter === 'all'
                ? "bg-purple-100 text-purple-700"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-all",
              filter === 'active'
                ? "bg-purple-100 text-purple-700"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-all",
              filter === 'completed'
                ? "bg-purple-100 text-purple-700"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            Completed
          </button>
          {todos.some(todo => todo.completed) && (
            <button
              onClick={clearCompleted}
              className="px-4 py-2 ml-auto text-gray-600 hover:text-red-600 font-medium transition-colors"
            >
              Clear Completed
            </button>
          )}
        </div>

        {/* Todo List */}
        <div className="divide-y max-h-[400px] overflow-y-auto">
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 group"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                  todo.completed
                    ? "bg-purple-600 border-purple-600"
                    : "border-gray-300 hover:border-purple-600"
                )}
              >
                {todo.completed && (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              <span className={cn(
                "flex-1 transition-all",
                todo.completed && "text-gray-400 line-through"
              )}>
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
          {filteredTodos.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No tasks found
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 text-sm text-gray-600">
          {todos.length} total tasks • {todos.filter(t => !t.completed).length} remaining
        </div>
      </div>
    </div>
  );
};

export default Todo;
