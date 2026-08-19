import { CalendarDays, MoreHorizontal, Tag } from "lucide-react";
import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* Title */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-medium leading-5 text-gray-900">
          {task.title}
        </h3>

        <button
          type="button"
          className="shrink-0 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          aria-label={`More options for ${task.title}`}
        >
          <MoreHorizontal size={17} />
        </button>
      </div>

      {/* Assignee + Date */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[11px] font-medium text-white">
            {task.assigneeInitial ?? task.assignee.charAt(0)}
          </div>

          <span className="truncate text-xs text-gray-700">
            {task.assignee}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-medium text-red-500">
          <CalendarDays size={12} />
          {task.dueDate}
        </div>
      </div>

      {/* Labels */}
      <div className="mt-4 flex flex-wrap gap-2">
        {task.labels.map((label, index) => (
          <span
            key={`${task.id}-${label}-${index}`}
            className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] text-gray-700"
          >
            <Tag size={11} />
            {label}
          </span>
        ))}
      </div>
    </article>
  );
}