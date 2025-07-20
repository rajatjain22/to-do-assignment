import type { ReactNode } from "react";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export interface AddTodoProps {
  onAdd: (text: string) => void;
  isLoading?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export type FilterType = "all" | "completed" | "pending";

export type ApiTodo = { id: number; todo: string; completed: boolean };
