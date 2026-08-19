"use client";

import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import TaskBoard from "@/components/tasks/TaskBoard";
import TaskHeader from "@/components/tasks/TaskHeader";
import TaskList from "@/components/tasks/TaskList";
import { tasks } from "@/lib/constants";

export default function TasksPage() {
  const [view, setView] = useState<"board" | "list">("board");

  const [search, setSearch] = useState("");

  const [visibleFields, setVisibleFields] = useState({
    priority: true,
    members: true,
    dueDate: true,
    labels: false,
    status: false,
    reporter: false,
  });

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return tasks;
    }

    return tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(query) ||
        task.assignee.toLowerCase().includes(query) ||
        task.labels.some((label) =>
          label.toLowerCase().includes(query)
        )
      );
    });
  }, [search]);

  return (
    <AppLayout title="Tasks">
      <div className="space-y-5">
        {/* Heading */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Tasks
          </h2>
        </div>

        {/* Toolbar */}
        <TaskHeader
          view={view}
          onViewChange={setView}
          search={search}
          onSearchChange={setSearch}
          visibleFields={visibleFields}
          onFieldsChange={setVisibleFields}
        />

        {/* Board */}
        {view === "board" && (
          <TaskBoard tasks={filteredTasks} />
        )}

        {/* List */}
        {view === "list" && (
          <TaskList
            tasks={filteredTasks}
            visibleFields={visibleFields}
          />
        )}
      </div>
    </AppLayout>
  );
}