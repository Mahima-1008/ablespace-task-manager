const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5001";

export interface Task {
  _id?: string;
  id?: string;

  title: string;
  description?: string;

  status:
    | "todo"
    | "doing"
    | "completed"
    | "on-hold";

  priority:
    | "urgent"
    | "high"
    | "medium"
    | "low"
    | "none";

  assignee?: string;
  assigneeInitial?: string;

  dueDate?: string;

  labels?: string[];

  projectId?: string | null;

  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  _id?: string;
  id?: string;

  name: string;
  description?: string;

  status:
    | "active"
    | "completed"
    | "on-hold";

  members?: string[];

  taskCount?: number;
  completedTasks?: number;

  dueDate?: string;

  createdAt?: string;
  updatedAt?: string;
}

async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    },
  );

  if (!response.ok) {
    let message =
      `Request failed: ${response.status}`;

    try {
      const error = await response.json();

      if (error?.message) {
        message = Array.isArray(error.message)
          ? error.message.join(", ")
          : error.message;
      }
    } catch {
      // Ignore JSON parsing errors.
    }

    throw new Error(message);
  }

  return response.json();
}

/* =========================
   TASKS
========================= */

export async function getTasks(): Promise<Task[]> {
  return request<Task[]>("/tasks");
}

export async function getTask(
  id: string,
): Promise<Task> {
  return request<Task>(`/tasks/${id}`);
}

export async function createTask(
  task: Partial<Task>,
): Promise<Task> {
  return request<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });
}

export async function updateTask(
  id: string,
  task: Partial<Task>,
): Promise<Task> {
  return request<Task>(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(task),
  });
}

export async function deleteTask(
  id: string,
): Promise<{ message: string }> {
  return request<{ message: string }>(
    `/tasks/${id}`,
    {
      method: "DELETE",
    },
  );
}

/* =========================
   PROJECTS
========================= */

export async function getProjects(): Promise<
  Project[]
> {
  return request<Project[]>("/projects");
}

export async function getProject(
  id: string,
): Promise<Project> {
  return request<Project>(
    `/projects/${id}`,
  );
}

export async function createProject(
  project: Partial<Project>,
): Promise<Project> {
  return request<Project>("/projects", {
    method: "POST",
    body: JSON.stringify(project),
  });
}

export async function updateProject(
  id: string,
  project: Partial<Project>,
): Promise<Project> {
  return request<Project>(
    `/projects/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(project),
    },
  );
}

export async function deleteProject(
  id: string,
): Promise<{ message: string }> {
  return request<{ message: string }>(
    `/projects/${id}`,
    {
      method: "DELETE",
    },
  );
}