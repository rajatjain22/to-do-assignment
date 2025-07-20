import React, { useState } from "react";
import type { AddTodoProps } from "../types/Task";

export default function AddTodo({ onAdd, isLoading = false }: AddTodoProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4 w-full max-w-md">
      <input
        type="text"
        name="task"
        id="task"
        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 cursor-pointer"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add"}
      </button>
    </form>
  );
} 