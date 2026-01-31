"use client";

import { useState } from "react";
import Image from "next/image";
import { Todo } from "@/types/todo";
import TodoInput from "@/components/TodoInput";
import TodoSection from "@/components/TodoSection";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: inputValue,
        completed: false,
        createdAt: new Date(),
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const handleMemoUpdate = (id: string, memo: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, memo } : todo
      )
    );
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Bar */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 flex justify-center">
          <div style={{ width: '100%', maxWidth: '1184px' }}>
            <div className="block md:hidden cursor-pointer" onClick={() => window.location.reload()}>
              <Image
                src="/Size=Small.svg"
                alt="Logo"
                width={80}
                height={30}
                className="object-contain"
              />
            </div>
            <div className="hidden md:block cursor-pointer" onClick={() => window.location.reload()}>
              <Image
                src="/Size=Large@2x.png"
                alt="Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 pt-12 pb-8">
        {/* Input */}
        {!selectedTodoId && (
          <div className="flex justify-center mb-12">
            <TodoInput
              value={inputValue}
              onChange={setInputValue}
              onAdd={handleAddTodo}
            />
          </div>
        )}

        {/* Todo Sections */}
        {selectedTodoId ? (
          <div className="flex justify-center">
            <div className="w-full" style={{ maxWidth: '980px' }}>
              <TodoSection
                title="TO DO"
                todos={activeTodos}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
                onMemoUpdate={handleMemoUpdate}
                color="green"
                selectedTodoId={selectedTodoId}
                onSelectTodo={setSelectedTodoId}
              />
              <TodoSection
                title="DONE"
                todos={completedTodos}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
                onMemoUpdate={handleMemoUpdate}
                color="purple"
                selectedTodoId={selectedTodoId}
                onSelectTodo={setSelectedTodoId}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="flex flex-col items-center lg:items-start lg:grid lg:grid-cols-2 gap-5 w-full" style={{ maxWidth: '1196px' }}>
              <TodoSection
                title="TO DO"
                todos={activeTodos}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
                onMemoUpdate={handleMemoUpdate}
                color="green"
                selectedTodoId={selectedTodoId}
                onSelectTodo={setSelectedTodoId}
              />
              <TodoSection
                title="DONE"
                todos={completedTodos}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
                onEdit={handleEditTodo}
                onMemoUpdate={handleMemoUpdate}
                color="purple"
                selectedTodoId={selectedTodoId}
                onSelectTodo={setSelectedTodoId}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
