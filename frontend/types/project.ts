export interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "on-hold";
  members: string[];
  taskCount: number;
  completedTasks: number;
  dueDate: string;
}