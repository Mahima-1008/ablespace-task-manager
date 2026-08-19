import { Plus } from "lucide-react";
import { Task, TaskStatus } from "@/types/task";
import TaskRow from "./TaskRow";

interface TaskListProps {
  tasks: Task[];
  visibleFields: {
    priority: boolean;
    members: boolean;
    dueDate: boolean;
    labels: boolean;
    status: boolean;
    reporter: boolean;
  };
}

const groups: {
  title: string;
  status: TaskStatus;
}[] = [
  {
    title: "To Do",
    status: "todo",
  },
  {
    title: "Doing",
    status: "doing",
  },
  {
    title: "Completed",
    status: "completed",
  },
  {
    title: "On Hold",
    status: "on-hold",
  },
];

export default function TaskList({
  tasks,
  visibleFields,
}: TaskListProps) {
  return (
    <div className="space-y-5">
      {groups.map((group) => {
        const groupTasks = tasks.filter(
          (task) => task.status === group.status
        );

        return (
          <section key={group.status}>
            {/* Group heading */}
            <div className="mb-2 flex items-center gap-2 px-1">
              <span className="text-xs">▼</span>

              <h3 className="text-sm font-medium text-gray-900">
                {group.title}
              </h3>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
              {/* Header */}
              <div className="grid min-w-[760px] grid-cols-[minmax(260px,1.8fr)_140px_150px_150px_60px] items-center bg-gray-50 px-3 py-3 text-xs font-medium text-gray-700">
                <div>Task</div>

                <div>
                  {visibleFields.priority && "Priority"}
                </div>

                <div>
                  {visibleFields.members && "Members"}
                </div>

                <div>
                  {visibleFields.dueDate && "Due Date"}
                </div>

                <div className="text-right">
                  Actions
                </div>
              </div>

              {/* Rows */}
              {groupTasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  showPriority={visibleFields.priority}
                  showMembers={visibleFields.members}
                  showDueDate={visibleFields.dueDate}
                  showLabels={visibleFields.labels}
                  showStatus={visibleFields.status}
                  showReporter={visibleFields.reporter}
                />
              ))}

              {/* Add task */}
              <button
                type="button"
                className="flex w-full items-center gap-2 border-t border-gray-200 px-3 py-3 text-sm text-gray-600 hover:bg-gray-50"
              >
                <Plus size={16} />
                Add Task
              </button>
            </div>
          </section>
        );
      })}
    </div>
  );
}