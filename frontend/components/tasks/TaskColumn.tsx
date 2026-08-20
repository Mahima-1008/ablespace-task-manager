"use client";

import {
  MoreHorizontal,
  Plus,
} from "lucide-react";

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
      {/* Column Header */}
      <div className="flex items-center justify-between px-2 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">
            {title}
          </span>

          <span className="rounded-md bg-gray-200 px-1.5 py-0.5 text-xs text-gray-500">
            {tasks.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-md p-1 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
            aria-label={`Add task to ${title}`}
          >
            <Plus size={17} />
          </button>

          <button
            type="button"
            className="rounded-md p-1 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
            aria-label={`More options for ${title}`}
          >
            <MoreHorizontal size={17} />
          </button>
        </div>
      </div>

      {/* Task Cards */}
      <div className="space-y-2.5">
        {tasks.map((task) => {
          const taskId =
            task._id || task.id;

          return (
            <TaskCard
              key={taskId}
              task={task}
            />
          );
        })}

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-200 bg-white px-4 py-8 text-center">
            <p className="text-xs text-gray-400">
              No tasks
            </p>
          </div>
        )}
      </div>

      {/* Add Task */}
      <button
        type="button"
        className="mt-2 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-600 transition hover:bg-gray-200 hover:text-gray-900"
      >
        <Plus size={16} />
        Add Task
      </button>
    </section>
  );
}