import { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import Filter from "./Filter";
import Modal from "./Modal";
import type { Task, FilterType } from "../types/Task";
import { addTodo, deleteTodo, fetchTodos } from "../services/todoService";
import { toast } from "react-hot-toast";

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const loadedTasks = await fetchTodos();
        setTasks(loadedTasks);
      } catch {
        console.warn("Using cached tasks or empty fallback");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = async (text: string) => {
    if (text.trim() === "") return;
    setIsAdding(true);
    try {
      let newTask = await addTodo(text.trim());
      while (tasks.some(task => task.id === newTask.id)) {
        newTask = { ...newTask, id: newTask.id + 1 };
      }
      setTasks([newTask, ...tasks]);
      toast.success("Task added successfully!");
    } catch {
      console.error("Error adding task");
      toast.error("Failed to add task!");
    } finally {
      setIsAdding(false);
    }
  };

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
    prevTasks.map((task) => {
      if (task.id !== id) return task;

      const newCompleted = !task.completed;
      toast.success(`Task ${newCompleted ? "completed" : "incomplete"}!`);
      return { ...task, completed: newCompleted };
    })
  );
    
  };

  const requestDeleteTask = (id: number) => {
    setConfirmDeleteId(id);
  };

  const confirmDeleteTask = async () => {
    if (confirmDeleteId !== null) {
      setIsDeleting(true);
      try {
        await deleteTodo(confirmDeleteId);
        toast.success("Task deleted successfully!");
      } catch {
        console.error("Error deleting task");
        toast.error("Failed to delete task!");
      } finally {
        setTasks(tasks.filter((task) => task.id !== confirmDeleteId));
        setConfirmDeleteId(null);
        setIsDeleting(false);
      }
    }
  };

  const cancelDeleteTask = () => {
    setConfirmDeleteId(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const taskToDelete = tasks.find((t) => t.id === confirmDeleteId);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 relative">
      <h1 className="text-3xl font-bold mb-6 mt-4">To-Do List</h1>
      {loading ? (
        <div className="text-lg text-gray-600 mt-8">Loading...</div>
      ) : (
        <>
          <AddTodo onAdd={handleAddTask} isLoading={isAdding} />
          <Filter filter={filter} setFilter={setFilter} />
          <ul className="w-full max-w-md">
            <TodoList
              tasks={filteredTasks}
              toggleTask={toggleTask}
              deleteTask={requestDeleteTask}
            />
          </ul>
          <Modal
            isOpen={confirmDeleteId !== null && !!taskToDelete}
            onClose={cancelDeleteTask}
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Delete
            </h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete the task:
              <br />
              <span className="font-medium">"{taskToDelete?.text}"</span>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 cursor-pointer"
                onClick={cancelDeleteTask}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 cursor-pointer"
                onClick={confirmDeleteTask}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}
