import { Task, TaskStatus } from "@/types/task";
import TaskColumn from "./TaskColumn";

interface TaskBoardProps {
  tasks: Task[];
}

const columns: {
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

export default function TaskBoard({ tasks }: TaskBoardProps) {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex min-w-max gap-4">
        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === column.status
          );

          return (
            <TaskColumn
              key={column.status}
              title={column.title}
              tasks={columnTasks}
            />
          );
        })}
      </div>
    </div>
  );
}