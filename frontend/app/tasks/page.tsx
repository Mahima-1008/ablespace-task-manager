import AppLayout from "@/components/layout/AppLayout";
import TaskBoard from "@/components/tasks/TaskBoard";
import { tasks } from "@/lib/constants";

export default function TasksPage() {
  return (
    <AppLayout title="Tasks">
      <div className="space-y-5">
        {/* Page heading */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Tasks
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage and track your workspace tasks.
          </p>
        </div>

        {/* Board */}
        <TaskBoard tasks={tasks} />
      </div>
    </AppLayout>
  );
}