"use client";

import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { Task, TaskPriority, TaskStatus } from "@/types/task";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Task) => void;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onCreateTask,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [assignee, setAssignee] = useState("Admin");
  const [dueDate, setDueDate] = useState("");
  const [labels, setLabels] = useState("");

  if (!isOpen) {
    return null;
  }

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("todo");
    setPriority("medium");
    setAssignee("Admin");
    setDueDate("");
    setLabels("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      assignee,
      assigneeInitial: assignee.charAt(0).toUpperCase(),
      dueDate: dueDate || "No date",
      labels: labels
        .split(",")
        .map((label) => label.trim())
        .filter(Boolean),
    };

    onCreateTask(newTask);

    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Add Task
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Create a new task for your workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Title */}
          <div>
            <label
              htmlFor="task-title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Task title
            </label>

            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter task title"
              autoFocus
              className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              id="task-description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Add a description..."
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="task-status"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Status
              </label>

              <select
                id="task-status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as TaskStatus)
                }
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-gray-400"
              >
                <option value="todo">To Do</option>
                <option value="doing">Doing</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="task-priority"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Priority
              </label>

              <select
                id="task-priority"
                value={priority}
                onChange={(event) =>
                  setPriority(
                    event.target.value as TaskPriority
                  )
                }
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-gray-400"
              >
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="none">No Priority</option>
              </select>
            </div>
          </div>

          {/* Member + Due Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="task-member"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Member
              </label>

              <select
                id="task-member"
                value={assignee}
                onChange={(event) =>
                  setAssignee(event.target.value)
                }
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-gray-400"
              >
                <option value="Admin">Admin</option>
                <option value="QA Team">QA Team</option>
                <option value="Designer">Designer</option>
                <option value="Security">Security</option>
                <option value="Dev Team">Dev Team</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="task-due-date"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Due date
              </label>

              <input
                id="task-due-date"
                type="date"
                value={dueDate}
                onChange={(event) =>
                  setDueDate(event.target.value)
                }
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-gray-400"
              />
            </div>
          </div>

          {/* Labels */}
          <div>
            <label
              htmlFor="task-labels"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Labels
            </label>

            <input
              id="task-labels"
              type="text"
              value={labels}
              onChange={(event) => setLabels(event.target.value)}
              placeholder="e.g. Design, Frontend, Urgent"
              className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />

            <p className="mt-1.5 text-[11px] text-gray-400">
              Separate multiple labels with commas.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!title.trim()}
              className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}