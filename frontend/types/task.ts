export type TaskStatus = "todo" | "doing" | "completed" | "on-hold";

export type TaskPriority = "urgent" | "high" | "medium" | "low" | "none";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  assigneeInitial?: string;
  dueDate: string;
  labels: string[];
}