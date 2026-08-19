"use client";

import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import TaskBoard from "@/components/tasks/TaskBoard";
import TaskHeader from "@/components/tasks/TaskHeader";
import { tasks } from "@/lib/constants";

export default function TasksPage() {
  const [view, setView] = useState<"board" | "list">("board");
  const [search, setSearch] = useState("");

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
        {/* Page heading */}
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
        />

        {/* Board */}
        {view === "board" && (
          <TaskBoard tasks={filteredTasks} />
        )}

        {/* Temporary list message */}
        {view === "list" && (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
            <h3 className="text-base font-semibold text-gray-900">
              List View
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              List view is the next part we will build.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}