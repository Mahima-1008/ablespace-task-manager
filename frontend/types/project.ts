export type ProjectStatus =
  | "active"
  | "completed"
  | "on-hold";

export interface Project {
  _id?: string;
  id?: string;

  name: string;
  description: string;

  status: ProjectStatus;

  members: string[];

  taskCount: number;
  completedTasks: number;

  dueDate: string;

  createdAt?: string;
  updatedAt?: string;
}