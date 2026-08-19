import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Flag,
  Users,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import AppLayout from "@/components/layout/AppLayout";
import { projects, tasks } from "@/lib/constants";

interface ProjectDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const statusLabels = {
  active: "Active",
  completed: "Completed",
  "on-hold": "On Hold",
};

const statusStyles = {
  active: "bg-green-50 text-green-700",
  completed: "bg-blue-50 text-blue-700",
  "on-hold": "bg-yellow-50 text-yellow-700",
};

const taskStatusLabels = {
  todo: "To Do",
  doing: "Doing",
  completed: "Completed",
  "on-hold": "On Hold",
};

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { id } = await params;

  const project = projects.find(
    (item) => item.id === id
  );

  if (!project) {
    notFound();
  }

  const progress =
    project.taskCount === 0
      ? 0
      : Math.round(
          (project.completedTasks / project.taskCount) *
            100
        );

  /*
   * For now we display the existing sample tasks.
   * Later these will be connected to the backend
   * and associated with a real project.
   */
  const projectTasks = tasks.slice(0, 5);

  return (
    <AppLayout title="Project Details">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="rounded-2xl border border-gray-200 bg-white">
          <div className="flex flex-wrap items-start justify-between gap-5 border-b border-gray-200 p-6">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-xl font-semibold text-gray-700">
                {project.name.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {project.name}
                  </h1>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[project.status]}`}
                  >
                    {statusLabels[project.status]}
                  </span>
                </div>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                  {project.description}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 divide-x divide-gray-200 sm:grid-cols-4">
            {/* Progress */}
            <div className="p-5">
              <div className="flex items-center gap-2 text-gray-400">
                <CheckCircle2 size={16} />

                <span className="text-xs">
                  Progress
                </span>
              </div>

              <p className="mt-2 text-xl font-semibold text-gray-900">
                {progress}%
              </p>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gray-900"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>

            {/* Tasks */}
            <div className="p-5">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock3 size={16} />

                <span className="text-xs">
                  Tasks
                </span>
              </div>

              <p className="mt-2 text-xl font-semibold text-gray-900">
                {project.taskCount}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                {project.completedTasks} completed
              </p>
            </div>

            {/* Members */}
            <div className="p-5">
              <div className="flex items-center gap-2 text-gray-400">
                <Users size={16} />

                <span className="text-xs">
                  Members
                </span>
              </div>

              <p className="mt-2 text-xl font-semibold text-gray-900">
                {project.members.length}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Assigned members
              </p>
            </div>

            {/* Due Date */}
            <div className="p-5">
              <div className="flex items-center gap-2 text-gray-400">
                <CalendarDays size={16} />

                <span className="text-xs">
                  Due Date
                </span>
              </div>

              <p className="mt-2 text-sm font-semibold text-gray-900">
                {project.dueDate}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Project deadline
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
          {/* Tasks */}
          <section className="rounded-2xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Project Tasks
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Tasks associated with this project.
                </p>
              </div>

              <Link
                href="/tasks"
                className="text-xs font-medium text-gray-500 hover:text-gray-900"
              >
                View all tasks
              </Link>
            </div>

            <div>
              {projectTasks.map((task) => (
                <Link
                  key={task.id}
                  href={`/tasks/${task.id}`}
                  className="flex items-center gap-4 border-b border-gray-100 px-5 py-4 transition last:border-b-0 hover:bg-gray-50"
                >
                  {/* Status icon */}
                  <div className="shrink-0">
                    {task.status === "completed" ? (
                      <CheckCircle2
                        size={18}
                        className="text-green-600"
                      />
                    ) : (
                      <Clock3
                        size={18}
                        className="text-gray-300"
                      />
                    )}
                  </div>

                  {/* Title */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {task.title}
                    </h3>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-gray-400">
                        {task.assignee}
                      </span>

                      {task.labels
                        .slice(0, 2)
                        .map((label) => (
                          <span
                            key={`${task.id}-${label}`}
                            className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-500"
                          >
                            {label}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Priority */}
                  <div className="hidden items-center gap-1.5 sm:flex">
                    <Flag
                      size={13}
                      className="text-gray-400"
                    />

                    <span className="text-[11px] text-gray-500">
                      {task.priority}
                    </span>
                  </div>

                  {/* Status */}
                  <span className="hidden rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-600 md:inline-flex">
                    {taskStatusLabels[task.status]}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Members */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-2">
                <Users
                  size={17}
                  className="text-gray-400"
                />

                <h2 className="text-sm font-semibold text-gray-900">
                  Members
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                {project.members.map((member) => (
                  <div
                    key={member}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-medium text-white">
                      {member.charAt(0).toUpperCase()}
                    </div>

                    <span className="text-sm text-gray-700">
                      {member}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project information */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-gray-900">
                Project Information
              </h2>

              <div className="mt-4 space-y-4">
                <InfoRow
                  label="Status"
                  value={statusLabels[project.status]}
                />

                <InfoRow
                  label="Due Date"
                  value={project.dueDate}
                />

                <InfoRow
                  label="Total Tasks"
                  value={String(project.taskCount)}
                />

                <InfoRow
                  label="Completed"
                  value={String(
                    project.completedTasks
                  )}
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-gray-400">
        {label}
      </span>

      <span className="text-xs font-medium text-gray-700">
        {value}
      </span>
    </div>
  );
}