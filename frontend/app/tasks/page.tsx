"use client";

import { useEffect, useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskBoard from "@/components/tasks/TaskBoard";
import TaskHeader, {
  TaskFilters,
} from "@/components/tasks/TaskHeader";
import TaskList from "@/components/tasks/TaskList";

import {
  createTask,
  getTasks,
} from "@/lib/api";

import { Task } from "@/types/task";

export default function TasksPage() {
  const [allTasks, setAllTasks] =
    useState<Task[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [view, setView] =
    useState<"board" | "list">("board");

  const [search, setSearch] =
    useState("");

  const [showAddTask, setShowAddTask] =
    useState(false);

  const [visibleFields, setVisibleFields] =
    useState({
      priority: true,
      members: true,
      dueDate: true,
      labels: false,
      status: false,
      reporter: false,
    });

  const [filters, setFilters] =
    useState<TaskFilters>({
      status: "all",
      priority: "all",
      member: "all",
    });

  /* =========================
     LOAD TASKS
  ========================= */

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        setError("");

        const data = await getTasks();

        setAllTasks(data);
      } catch (err) {
        console.error(
          "Failed to load tasks:",
          err,
        );

        setError(
          "Unable to load tasks. Make sure the backend is running on port 5001.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  /* =========================
     FILTER TASKS
  ========================= */

  const filteredTasks = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return allTasks.filter((task) => {
      const labels =
        task.labels || [];

      const assignee =
        task.assignee || "";

      const matchesSearch =
        !query ||
        task.title
          .toLowerCase()
          .includes(query) ||
        assignee
          .toLowerCase()
          .includes(query) ||
        labels.some((label) =>
          label
            .toLowerCase()
            .includes(query),
        );

      const matchesStatus =
        filters.status === "all" ||
        task.status === filters.status;

      const matchesPriority =
        filters.priority === "all" ||
        task.priority ===
          filters.priority;

      const matchesMember =
        filters.member === "all" ||
        assignee === filters.member;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesMember
      );
    });
  }, [
    allTasks,
    search,
    filters,
  ]);

  /* =========================
     CREATE TASK
  ========================= */

  const handleCreateTask = async (
    newTask: Task,
  ) => {
    try {
      const createdTask =
        await createTask(newTask);

      setAllTasks(
        (currentTasks) => [
          createdTask,
          ...currentTasks,
        ],
      );

      setShowAddTask(false);
    } catch (err) {
      console.error(
        "Failed to create task:",
        err,
      );

      setError(
        "Unable to create task. Please try again.",
      );
    }
  };

  return (
    <AppLayout title="Tasks">
      <div className="mx-auto w-full max-w-[1600px] space-y-5">
        {/* Heading */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Tasks
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and track your workspace tasks.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

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
          onAddTask={() =>
            setShowAddTask(true)
          }
        />

        {/* Loading */}
        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

            <p className="mt-3 text-sm text-gray-500">
              Loading tasks...
            </p>
          </div>
        ) : (
          <>
            {/* Board */}
            {view === "board" && (
              <TaskBoard
                tasks={filteredTasks}
              />
            )}

            {/* List */}
            {view === "list" && (
              <TaskList
                tasks={filteredTasks}
                visibleFields={
                  visibleFields
                }
              />
            )}

            {/* Empty State */}
            {filteredTasks.length ===
              0 && (
              <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                <h3 className="text-base font-semibold text-gray-900">
                  No tasks found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {search ||
                  filters.status !==
                    "all" ||
                  filters.priority !==
                    "all" ||
                  filters.member !==
                    "all"
                    ? "Try changing your search or filters."
                    : "Create your first task to get started."}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    setShowAddTask(true)
                  }
                  className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Add Task
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={showAddTask}
        onClose={() =>
          setShowAddTask(false)
        }
        onCreateTask={
          handleCreateTask
        }
      />
    </AppLayout>
  );
}