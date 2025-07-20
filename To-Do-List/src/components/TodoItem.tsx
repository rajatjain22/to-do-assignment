import type { Task } from '../types/Task';

export default function TodoItem({ task, toggleTask, deleteTask }: {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}) {
  return (
    <li
      className="flex items-center justify-between bg-white p-3 mb-2 rounded shadow"
    >
      <span
        className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}
        onClick={() => toggleTask(task.id)}
      >
        {task.text}
      </span>
      <button
        className="ml-4 text-red-500 hover:text-red-700 cursor-pointer"
        onClick={() => deleteTask(task.id)}
        aria-label="Delete task"
      >
        &#10005;
      </button>
    </li>
  );
} 