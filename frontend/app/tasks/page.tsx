"use client";

import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import TaskBoard from "@/components/tasks/TaskBoard";
import TaskHeader, {
  TaskFilters,
} from "@/components/tasks/TaskHeader";
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

  const [filters, setFilters] = useState<TaskFilters>({
    status: "all",
    priority: "all",
    member: "all",
  });

  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tasks.filter((task) => {
      /* Search */
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.assignee.toLowerCase().includes(query) ||
        task.labels.some((label) =>
          label.toLowerCase().includes(query)
        );

      /* Status */
      const matchesStatus =
        filters.status === "all" ||
        task.status === filters.status;

      /* Priority */
      const matchesPriority =
        filters.priority === "all" ||
        task.priority === filters.priority;

      /* Member */
      const matchesMember =
        filters.member === "all" ||
        task.assignee === filters.member;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesMember
      );
    });
  }, [search, filters]);

  return (
    <AppLayout title="Tasks">
      <div className="space-y-5">
        {/* Heading */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Tasks
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage and track your workspace tasks.
          </p>
        </div>

        {/* Toolbar */}
        <TaskHeader
          view={view}
          onViewChange={setView}
          search={search}
          onSearchChange={setSearch}
          visibleFields={visibleFields}
          onFieldsChange={setVisibleFields}
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Results */}
        {view === "board" && (
          <TaskBoard tasks={filteredTasks} />
        )}

        {view === "list" && (
          <TaskList
            tasks={filteredTasks}
            visibleFields={visibleFields}
          />
        )}

        {/* Empty state */}
        {filteredTasks.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <h3 className="text-base font-semibold text-gray-900">
              No tasks found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}