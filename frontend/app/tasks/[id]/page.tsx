import { notFound } from "next/navigation";

import AppLayout from "@/components/layout/AppLayout";
import TaskDetails from "@/components/tasks/TaskDetails";
import { tasks } from "@/lib/constants";

interface TaskDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TaskDetailsPage({
  params,
}: TaskDetailsPageProps) {
  const { id } = await params;

  const task = tasks.find((item) => item.id === id);

  if (!task) {
    notFound();
  }

  return (
    <AppLayout title="Task Details">
      <TaskDetails task={task} />
    </AppLayout>
  );
}