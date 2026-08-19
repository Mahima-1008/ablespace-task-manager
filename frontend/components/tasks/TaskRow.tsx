import { CalendarDays, MoreHorizontal } from "lucide-react";
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

const priorityStyles = {
  urgent: "text-red-500",
  high: "text-red-500",
  medium: "text-orange-500",
  low: "text-gray-400",
  none: "text-gray-400",
};

const priorityLabels = {
  urgent: "Urgent",
  high: "High",
  medium: "Medium",
  low: "Low",
  none: "No Priority",
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
  return (
    <div className="grid min-w-[760px] grid-cols-[minmax(260px,1.8fr)_140px_150px_150px_60px] items-center border-t border-gray-200 px-3 py-3 text-sm">
      {/* Task */}
      <div className="min-w-0">
        <p className="truncate font-medium text-gray-900">
          {task.title}
        </p>

        {showLabels && task.labels.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {task.labels.map((label, index) => (
              <span
                key={`${task.id}-${label}-${index}`}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Priority */}
      {showPriority ? (
        <div
          className={`flex items-center gap-1.5 ${priorityStyles[task.priority]}`}
        >
          <span className="text-xs">▂▅</span>
          <span>{priorityLabels[task.priority]}</span>
        </div>
      ) : (
        <div />
      )}

      {/* Members */}
      {showMembers ? (
        <div className="flex items-center">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-[11px] font-medium text-gray-700">
            {task.assigneeInitial ?? task.assignee.charAt(0)}
          </div>
        </div>
      ) : (
        <div />
      )}

      {/* Due Date */}
      {showDueDate ? (
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarDays size={14} />
          <span>{task.dueDate}</span>
        </div>
      ) : (
        <div />
      )}

      {/* Actions */}
      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          aria-label={`Actions for ${task.title}`}
        >
          <MoreHorizontal size={17} />
        </button>
      </div>

      {/* Prevent unused prop warnings while we prepare filters */}
      {showStatus && <span className="hidden">{task.status}</span>}
      {showReporter && <span className="hidden">{task.assignee}</span>}
    </div>
  );
}