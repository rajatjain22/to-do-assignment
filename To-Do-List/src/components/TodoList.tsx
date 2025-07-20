import type { Task } from '../types/Task';
import TodoItem from './TodoItem';

export default function TodoList({ tasks, toggleTask, deleteTask }: {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}) {
  if (tasks.length === 0) {
    return <li className="text-gray-500 text-center py-4">No tasks yet!</li>;
  }
  return (
    <>
      {tasks.map(task => (
        <TodoItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
      ))}
    </>
  );
} 