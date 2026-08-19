"use client";

import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { Project } from "@/types/project";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: Project) => void;
}

export default function AddProjectModal({
  isOpen,
  onClose,
  onCreateProject,
}: AddProjectModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] =
    useState<Project["status"]>("active");
  const [dueDate, setDueDate] = useState("");

  if (!isOpen) {
    return null;
  }

  const resetForm = () => {
    setName("");
    setDescription("");
    setStatus("active");
    setDueDate("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      status,
      members: ["Admin"],
      taskCount: 0,
      completedTasks: 0,
      dueDate: dueDate || "No date",
    };

    onCreateProject(newProject);

    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Add Project
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Create a new project for your workspace.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="project-name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Project name
            </label>

            <input
              id="project-name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter project name"
              autoFocus
              className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="project-description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              id="project-description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Describe the project..."
              rows={4}
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
            />
          </div>

          {/* Status + Due Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="project-status"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Status
              </label>

              <select
                id="project-status"
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as Project["status"]
                  )
                }
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-gray-400"
              >
                <option value="active">Active</option>
                <option value="completed">
                  Completed
                </option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="project-due-date"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Due date
              </label>

              <input
                id="project-due-date"
                type="date"
                value={dueDate}
                onChange={(event) =>
                  setDueDate(event.target.value)
                }
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-gray-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!name.trim()}
              className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}