import type { Task, ApiTodo } from "../types/Task";

const API_BASE = "https://dummyjson.com/todos";

export const fetchTodos = async (limit: number = 50): Promise<Task[]> => {
  const cached = localStorage.getItem("tasks");
  if (cached) {
    const parsed: Task[] = JSON.parse(cached);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  }

  const response = await fetch(`${API_BASE}?limit=${limit}`);
  if (!response.ok) {
    console.error("Failed to fetch from API");
    return [];
  }

  const data = await response.json();
  const tasks = data.todos.map((t: ApiTodo) => ({
    id: t.id,
    text: t.todo,
    completed: t.completed,
  }));

  return tasks;
};

export const addTodo = async (text: string): Promise<Task> => {
  const response = await fetch(`${API_BASE}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todo: text, completed: false, userId: 1 }),
  });
  const data = await response.json();
  return {
    id: data.id,
    text: data.todo,
    completed: data.completed,
  };
};

export const deleteTodo = async (id: number): Promise<void> => {
  await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
};
