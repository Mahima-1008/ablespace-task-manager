"use client";

import {
  CalendarDays,
  ChevronRight,
  MoreHorizontal,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Project } from "@/types/project";

interface ProjectRowProps {
  project: Project;
}

const statusStyles = {
  active: "bg-green-50 text-green-700",
  completed: "bg-blue-50 text-blue-700",
  "on-hold": "bg-yellow-50 text-yellow-700",
};

const statusLabels = {
  active: "Active",
  completed: "Completed",
  "on-hold": "On Hold",
};

export default function ProjectRow({
  project,
}: ProjectRowProps) {
  const projectId =
    project._id || project.id;

  const members = project.members || [];

  const taskCount = project.taskCount || 0;

  const completedTasks =
    project.completedTasks || 0;

  const progress =
    taskCount === 0
      ? 0
      : Math.min(
          100,
          Math.round(
            (completedTasks / taskCount) *
              100,
          ),
        );

  const projectHref = projectId
    ? `/projects/${projectId}`
    : "/projects";

  return (
    <div className="flex items-center gap-4 border-b border-gray-100 px-5 py-4 last:border-b-0">
      {/* Project */}
      <Link
        href={projectHref}
        className="min-w-0 flex-1"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-sm font-semibold text-gray-700">
            {project.name
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900 hover:text-gray-600">
              {project.name}
            </h3>

            <p className="mt-0.5 truncate text-xs text-gray-400">
              {project.description ||
                "No description provided"}
            </p>
          </div>
        </div>
      </Link>

      {/* Status */}
      <div className="hidden w-28 shrink-0 sm:block">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
            statusStyles[project.status]
          }`}
        >
          {statusLabels[project.status]}
        </span>
      </div>

      {/* Members */}
      <div className="hidden w-32 shrink-0 md:flex md:items-center md:gap-2">
        <Users
          size={15}
          className="text-gray-400"
        />

        {members.length > 0 ? (
          <>
            <div className="flex -space-x-2">
              {members
                .slice(0, 3)
                .map((member, index) => (
                  <div
                    key={`${member}-${index}`}
                    title={member}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-[9px] font-medium text-white"
                  >
                    {member
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                ))}
            </div>

            {members.length > 3 && (
              <span className="text-[11px] text-gray-400">
                +{members.length - 3}
              </span>
            )}
          </>
        ) : (
          <span className="text-[11px] text-gray-400">
            No members
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="hidden w-32 shrink-0 lg:block">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-gray-500">
            {completedTasks}/{taskCount}
          </span>

          <span className="text-[11px] text-gray-400">
            {progress}%
          </span>
        </div>

        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-gray-900 transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Due date */}
      <div className="hidden w-24 shrink-0 items-center gap-1.5 text-xs text-gray-500 xl:flex">
        <CalendarDays size={14} />

        {project.dueDate || "—"}
      </div>

      {/* Actions */}
      <button
        type="button"
        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        aria-label={`More options for ${project.name}`}
      >
        <MoreHorizontal size={17} />
      </button>

      {/* Open */}
      <Link
        href={projectHref}
        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        aria-label={`Open ${project.name}`}
      >
        <ChevronRight size={17} />
      </Link>
    </div>
  );
}