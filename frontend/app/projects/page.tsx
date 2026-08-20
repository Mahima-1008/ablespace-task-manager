"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Check,
  Trash2,
  Users,
} from "lucide-react";

import AppLayout from "@/components/layout/AppLayout";

import {
  deleteProject,
  getProject,
  updateProject,
  Project,
} from "@/lib/api";

export default function ProjectDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [project, setProject] =
    useState<Project | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        setError("");

        const data = await getProject(id);

        setProject(data);
      } catch (err) {
        console.error(err);

        setError(
          "Project could not be loaded.",
        );
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProject();
    }
  }, [id]);

  async function handleStatusChange(
    status: Project["status"],
  ) {
    if (!project) return;

    try {
      setError("");

      const updated =
        await updateProject(id, {
          status,
        });

      setProject(updated);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to update project.",
      );
    }
  }

  async function handleDelete() {
    if (!project) return;

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this project?",
      );

    if (!confirmed) return;

    try {
      await deleteProject(id);

      router.push("/projects");
    } catch (err) {
      console.error(err);

      setError(
        "Unable to delete project.",
      );
    }
  }

  if (loading) {
    return (
      <AppLayout title="Project Details">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-sm text-gray-500">
            Loading project...
          </p>
        </div>
      </AppLayout>
    );
  }

  if (!project) {
    return (
      <AppLayout title="Project Details">
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Project not found
          </h2>

          <button
            onClick={() =>
              router.push("/projects")
            }
            className="mt-4 text-sm font-medium text-gray-900 underline"
          >
            Back to projects
          </button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Project Details">
      <div className="space-y-6">
        {/* Back */}
        <button
          onClick={() =>
            router.push("/projects")
          }
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </button>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Main Card */}
        <div className="rounded-xl border border-gray-200 bg-white">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 p-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {project.name}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                {project.description ||
                  "No description provided."}
              </p>
            </div>

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>

          {/* Properties */}
          <div className="grid gap-6 p-6 md:grid-cols-2">
            {/* Status */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                Status
              </p>

              <select
                value={project.status}
                onChange={(event) =>
                  handleStatusChange(
                    event.target
                      .value as Project["status"],
                  )
                }
                className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none"
              >
                <option value="active">
                  Active
                </option>

                <option value="completed">
                  Completed
                </option>

                <option value="on-hold">
                  On Hold
                </option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                Due Date
              </p>

              <div className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm text-gray-700">
                <Calendar size={16} />

                {project.dueDate ||
                  "No due date"}
              </div>
            </div>

            {/* Tasks */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                Tasks
              </p>

              <div className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 px-3 text-sm text-gray-700">
                <Check size={16} />

                {project.completedTasks || 0}
                {" / "}
                {project.taskCount || 0}
                {" completed"}
              </div>
            </div>

            {/* Members */}
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                Members
              </p>

              <div className="flex min-h-10 items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
                <Users
                  size={16}
                  className="shrink-0 text-gray-500"
                />

                <div className="flex flex-wrap gap-2">
                  {project.members?.length ? (
                    project.members.map(
                      (member) => (
                        <span
                          key={member}
                          className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                        >
                          {member}
                        </span>
                      ),
                    )
                  ) : (
                    <span className="text-sm text-gray-400">
                      No members
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">
                Project Progress
              </p>

              <p className="text-sm text-gray-500">
                {project.taskCount
                  ? Math.round(
                      ((project.completedTasks ||
                        0) /
                        project.taskCount) *
                        100,
                    )
                  : 0}
                %
              </p>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gray-900 transition-all"
                style={{
                  width: `${
                    project.taskCount
                      ? Math.min(
                          100,
                          Math.round(
                            ((project.completedTasks ||
                              0) /
                              project.taskCount) *
                              100,
                          ),
                        )
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap gap-6 border-t border-gray-200 p-6 text-xs text-gray-400">
            <span>
              Project ID:{" "}
              {project._id ||
                project.id}
            </span>

            {project.createdAt && (
              <span>
                Created:{" "}
                {new Date(
                  project.createdAt,
                ).toLocaleDateString()}
              </span>
            )}

            {project.updatedAt && (
              <span>
                Updated:{" "}
                {new Date(
                  project.updatedAt,
                ).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}