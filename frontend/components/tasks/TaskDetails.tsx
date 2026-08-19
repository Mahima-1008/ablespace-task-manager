"use client";

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Flag,
  MoreHorizontal,
  Pencil,
  Tag,
  User,
} from "lucide-react";
import Link from "next/link";

import { Task } from "@/types/task";
import Subtasks from "./Subtasks";
import Comments from "./Comments";

interface TaskDetailsProps {
  task: Task;
}

const statusLabels = {
  todo: "To Do",
  doing: "Doing",
  completed: "Completed",
  "on-hold": "On Hold",
};

const priorityLabels = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
  none: "No Priority",
};

export default function TaskDetails({
  task,
}: TaskDetailsProps) {
  return (
    <div className="mx-auto max-w-5xl">
      {/* Back */}
      <Link
        href="/tasks"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
      >
        <ArrowLeft size={16} />
        Back to Tasks
      </Link>

      {/* Main card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-5">
          <div className="min-w-0">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
              Task
            </p>

            <h1 className="text-2xl font-semibold text-gray-900">
              {task.title}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Task ID: #{task.id}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
              aria-label="Edit task"
            >
              <Pencil size={17} />
            </button>

            <button
              type="button"
              className="rounded-lg border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
              aria-label="More options"
            >
              <MoreHorizontal size={17} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">
          {/* Main */}
          <div className="border-b border-gray-200 p-6 lg:border-b-0 lg:border-r">
            {/* Description */}
            <section>
              <h2 className="text-sm font-semibold text-gray-900">
                Description
              </h2>

              <div className="mt-3 rounded-xl bg-gray-50 p-4">
                {task.description ? (
                  <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
                    {task.description}
                  </p>
                ) : (
                  <p className="text-sm italic text-gray-400">
                    No description added.
                  </p>
                )}
              </div>
            </section>

            {/* Subtasks */}
            <Subtasks />

            {/* Comments */}
            <Comments />
          </div>

          {/* Properties */}
          <aside className="p-6">
            <h2 className="text-sm font-semibold text-gray-900">
              Properties
            </h2>

            <div className="mt-4 space-y-1">
              {/* Status */}
              <PropertyRow
                icon={<Clock3 size={16} />}
                label="Status"
              >
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                  {statusLabels[task.status]}
                </span>
              </PropertyRow>

              {/* Priority */}
              <PropertyRow
                icon={<Flag size={16} />}
                label="Priority"
              >
                <span className="text-xs font-medium text-gray-700">
                  {priorityLabels[task.priority]}
                </span>
              </PropertyRow>

              {/* Member */}
              <PropertyRow
                icon={<User size={16} />}
                label="Member"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[10px] font-medium text-white">
                    {task.assigneeInitial ??
                      task.assignee.charAt(0).toUpperCase()}
                  </div>

                  <span className="text-xs text-gray-700">
                    {task.assignee}
                  </span>
                </div>
              </PropertyRow>

              {/* Due date */}
              <PropertyRow
                icon={<CalendarDays size={16} />}
                label="Due Date"
              >
                <span className="text-xs text-gray-700">
                  {task.dueDate}
                </span>
              </PropertyRow>

              {/* Labels */}
              <PropertyRow
                icon={<Tag size={16} />}
                label="Labels"
              >
                <div className="flex max-w-[160px] flex-wrap justify-end gap-1.5">
                  {task.labels.length > 0 ? (
                    task.labels.map((label, index) => (
                      <span
                        key={`${task.id}-${label}-${index}`}
                        className="rounded-full bg-gray-100 px-2 py-1 text-[10px] text-gray-600"
                      >
                        {label}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">
                      None
                    </span>
                  )}
                </div>
              </PropertyRow>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function PropertyRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-12 items-center justify-between gap-4 rounded-lg px-2 py-2 hover:bg-gray-50">
      <div className="flex items-center gap-2 text-gray-400">
        {icon}

        <span className="text-xs text-gray-500">
          {label}
        </span>
      </div>

      <div className="text-right">
        {children}
      </div>
    </div>
  );
}