"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Trash2,
} from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";
import {
  deleteTask,
  getTask,
  updateTask,
  Task,
} from "@/lib/api";

export default function TaskDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [task, setTask] = useState<Task | null>(
    null,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTask() {
      try {
        setLoading(true);

        const data = await getTask(id);

        setTask(data);
      } catch (err) {
        console.error(err);
        setError("Task could not be loaded.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadTask();
    }
  }, [id]);

  async function handleStatusChange(
    status: Task["status"],
  ) {
    if (!task) return;

    try {
      const updated = await updateTask(id, {
        status,
      });

      setTask(updated);
    } catch (err) {
      console.error(err);
      setError("Unable to update task.");
    }
  }

  async function handleDelete() {
    if (!task) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    try {
      await deleteTask(id);

      router.push("/tasks");
    } catch (err) {
      console.error(err);
      setError("Unable to delete task.");
    }
  }

  if (loading) {
    return (
      <AppLayout title="Task Details">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-sm text-gray-500">
            Loading task...
          </p>
        </div>
      </AppLayout>
    );
  }

  if (!task) {
    return (
      <AppLayout title="Task Details">
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Task not found
          </h2>

          <button
            onClick={() => router.push("/tasks")}
            className="mt-4 text-sm font-medium text-gray-900 underline"
          >
            Back to tasks
          </button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Task Details">
      <div className="space-y-6">
        <button
          onClick={() => router.push("/tasks")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to Tasks
        </button>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {task.title}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  {task.description ||
                    "No description provided."}
                </p>
              </div>

              <button
                onClick={handleDelete}
                className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-2">
            {/* Status */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                Status
              </p>

              <select
                value={task.status}
                onChange={(e) =>
                  handleStatusChange(
                    e.target.value as Task["status"],
                  )
                }
                className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none"
              >
                <option value="todo">
                  To Do
                </option>

                <option value="doing">
                  Doing
                </option>

                <option value="completed">
                  Completed
                </option>

                <option value="on-hold">
                  On Hold
                </option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                Priority
              </p>

              <div className="flex h-10 items-center rounded-lg border border-gray-200 px-3 text-sm">
                {task.priority}
              </div>
            </div>

            {/* Assignee */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                Assignee
              </p>

              <div className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
                  {task.assigneeInitial ||
                    "A"}
                </span>

                {task.assignee || "Admin"}
              </div>
            </div>

            {/* Due date */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                Due Date
              </p>

              <div className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm">
                <Calendar size={16} />
                {task.dueDate || "No due date"}
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="border-t border-gray-200 p-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
              Labels
            </p>

            <div className="flex flex-wrap gap-2">
              {task.labels?.length ? (
                task.labels.map((label) => (
                  <span
                    key={label}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    {label}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-400">
                  No labels
                </span>
              )}
            </div>
          </div>

          {/* Footer info */}
          <div className="flex flex-wrap gap-6 border-t border-gray-200 p-6 text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <Clock size={14} />
              Created{" "}
              {task.createdAt
                ? new Date(
                    task.createdAt,
                  ).toLocaleDateString()
                : "—"}
            </span>

            <span className="flex items-center gap-2">
              <Check size={14} />
              ID: {task._id || task.id}
            </span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}