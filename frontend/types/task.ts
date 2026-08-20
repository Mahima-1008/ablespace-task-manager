export type TaskStatus =
  | "todo"
  | "doing"
  | "completed"
  | "on-hold";

export type TaskPriority =
  | "urgent"
  | "high"
  | "medium"
  | "low"
  | "none";

export interface Task {
  _id?: string;
  id?: string;

  title: string;

  description?: string;

  status: TaskStatus;

  priority: TaskPriority;

  assignee: string;

  assigneeInitial: string;

  dueDate: string;

  labels: string[];

  projectId?: string | null;

  createdAt?: string;
  updatedAt?: string;
}