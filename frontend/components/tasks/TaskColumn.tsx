import { MoreHorizontal, Plus } from "lucide-react";
import { Task } from "@/types/task";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
}

export default function TaskColumn({
  title,
  tasks,
}: TaskColumnProps) {
  return (
    <section className="w-[320px] shrink-0 rounded-xl border border-gray-200 bg-gray-50 p-2.5">
      {/* Column header */}
      <div className="flex items-center justify-between px-2 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">
            {title}
          </span>

          <span className="text-xs text-gray-400">
            {tasks.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-md p-1 text-gray-500 hover:bg-gray-200"
            aria-label={`Add task to ${title}`}
          >
            <Plus size={17} />
          </button>

          <button
            type="button"
            className="rounded-md p-1 text-gray-500 hover:bg-gray-200"
            aria-label={`More options for ${title}`}
          >
            <MoreHorizontal size={17} />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-2.5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Add task */}
      <button
        type="button"
        className="mt-2 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-600 hover:bg-gray-200"
      >
        <Plus size={16} />
        Add Task
      </button>
    </section>
  );
}