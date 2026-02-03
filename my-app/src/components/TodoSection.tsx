"use client";

import Image from "next/image";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoSectionProps {
  title: string;
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onMemoUpdate: (id: string, memo: string) => void;
  color: "green" | "purple";
  selectedTodoId: string | null;
  onSelectTodo: (id: string | null) => void;
}

export default function TodoSection({
  title,
  todos,
  onToggle,
  onDelete,
  onEdit,
  onMemoUpdate,
  color,
  selectedTodoId,
  onSelectTodo,
}: TodoSectionProps) {
  const imageSrc = color === "green" ? "/todo.svg" : "/done.svg";
  const emptyImageLargeSrc = color === "green" ? "/Type=Todo, Size=Large.svg" : "/Type=Done, Size=Large.svg";
  const emptyImageSmallSrc = color === "green" ? "/Type=Todo, Size=Small.svg" : "/Type=Done, Size=Small.svg";
  const emptyMessage = color === "green" 
    ? "할 일이 없어요.\nTODO를 새롭게 추가해주세요!" 
    : "아직 다 한 일이 없어요.\n해야 할 일을 체크해보세요!";

  return (
    <div className="mb-6 flex flex-col items-center md:items-start">
      {!selectedTodoId && (
        <div className="mb-4">
          <Image
            src={imageSrc}
            alt={title}
            width={101}
            height={36}
            style={{ width: '101px', height: '36px' }}
            className="object-contain"
          />
        </div>
      )}
      <div className="flex flex-col items-center md:items-start w-full">
        {selectedTodoId ? (
          todos
            .filter(todo => todo.id === selectedTodoId)
            .map((todo) => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                onMemoUpdate={onMemoUpdate}
                isSelected={selectedTodoId === todo.id}
                onSelect={onSelectTodo}
              />
            ))
        ) : todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="block md:hidden">
              <Image
                src={emptyImageSmallSrc}
                alt="Empty"
                width={120}
                height={120}
                className="object-contain mb-4"
                style={{ width: '120px', height: '120px' }}
              />
            </div>
            <div className="hidden md:block">
              <Image
                src={emptyImageLargeSrc}
                alt="Empty"
                width={240}
                height={240}
                className="object-contain mb-4"
                style={{ width: '240px', height: '240px' }}
              />
            </div>
            <p className="text-center text-gray-400 whitespace-pre-line text-sm">
              {emptyMessage}
            </p>
          </div>
        ) : selectedTodoId ? (
          todos
            .filter(todo => todo.id === selectedTodoId)
            .map((todo) => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                onMemoUpdate={onMemoUpdate}
                isSelected={selectedTodoId === todo.id}
                onSelect={onSelectTodo}
              />
            ))
        ) : (
          todos.map((todo) => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
              onMemoUpdate={onMemoUpdate}
              isSelected={selectedTodoId === todo.id}
              onSelect={onSelectTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}
