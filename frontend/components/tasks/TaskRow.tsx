"use client";

import {
  CalendarDays,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";

import { Task } from "@/types/task";

interface TaskRowProps {
  task: Task;
  showPriority: boolean;
  showMembers: boolean;
  showDueDate: boolean;
  showLabels: boolean;
  showStatus: boolean;
  showReporter: boolean;
}

const priorityLabels = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
  none: "No Priority",
};

const priorityStyles = {
  urgent: "bg-red-50 text-red-600",
  high: "bg-orange-50 text-orange-600",
  medium: "bg-yellow-50 text-yellow-700",
  low: "bg-gray-100 text-gray-500",
  none: "bg-gray-100 text-gray-400",
};

export default function TaskRow({
  task,
  showPriority,
  showMembers,
  showDueDate,
  showLabels,
  showStatus,
  showReporter,
}: TaskRowProps) {
  const taskId = task._id || task.id;

  const labels = task.labels || [];

  const assignee = task.assignee || "Unassigned";

  const assigneeInitial =
    task.assigneeInitial ||
    assignee.charAt(0).toUpperCase();

  const taskHref = taskId
    ? `/tasks/${taskId}`
    : "/tasks";

  return (
    <div className="grid min-w-[760px] grid-cols-[minmax(260px,1.8fr)_140px_150px_150px_60px] items-center border-t border-gray-200 px-3 py-3 text-sm">
      {/* Task */}
      <div className="min-w-0">
        <Link
          href={taskHref}
          className="block truncate font-medium text-gray-900 hover:text-gray-600"
        >
          {task.title}
        </Link>

        {showLabels &&
          labels.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {labels.map(
                (label, index) => (
                  <span
                    key={`${taskId || "task"}-${label}-${index}`}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600"
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
          )}
      </div>

      {/* Priority */}
      {showPriority ? (
        <div>
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
              priorityStyles[
                task.priority
              ]
            }`}
          >
            {
              priorityLabels[
                task.priority
              ]
            }
          </span>
        </div>
      ) : (
        <div />
      )}

      {/* Members */}
      {showMembers ? (
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[11px] font-medium text-white">
            {assigneeInitial}
          </div>

          <span className="truncate text-xs text-gray-600">
            {assignee}
          </span>
        </div>
      ) : (
        <div />
      )}

      {/* Due date */}
      {showDueDate ? (
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarDays size={14} />

          <span className="text-xs">
            {task.dueDate || "—"}
          </span>
        </div>
      ) : (
        <div />
      )}

      {/* Actions */}
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          aria-label={`Actions for ${task.title}`}
        >
          <MoreHorizontal size={17} />
        </button>
      </div>

      {/* Status */}
      {showStatus && (
        <span className="hidden">
          {task.status}
        </span>
      )}

      {/* Reporter */}
      {showReporter && (
        <span className="hidden">
          {assignee}
        </span>
      )}
    </div>
  );
}