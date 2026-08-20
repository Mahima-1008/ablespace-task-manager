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
  Task as ApiTask,
} from "@/lib/api";

import { Task } from "@/types/task";

function normalizeTask(task: ApiTask): Task {
  const id = task._id || task.id || crypto.randomUUID();

  return {
    id,
    _id: task._id,
    title: task.title,
    description: task.description || "",
    status: task.status,
    priority: task.priority,
    assignee: task.assignee || "Admin",
    assigneeInitial:
      task.assigneeInitial ||
      (task.assignee || "A").charAt(0).toUpperCase(),
    dueDate: task.dueDate || "",
    labels: task.labels || [],
    projectId: task.projectId || null,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
}

export default function TasksPage() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [view, setView] =
    useState<"board" | "list">("board");

  const [search, setSearch] = useState("");

  const [showAddTask, setShowAddTask] =
    useState(false);

  const [visibleFields, setVisibleFields] = useState({
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

  /*
   * Load tasks from backend
   */
  useEffect(() => {
    let mounted = true;

    async function loadTasks() {
      try {
        setLoading(true);
        setError("");

        const data = await getTasks();

        if (!mounted) return;

        setAllTasks(data.map(normalizeTask));
      } catch (err) {
        console.error("Failed to load tasks:", err);

        if (!mounted) return;

        setError(
          "Unable to load tasks. Please make sure the backend is running.",
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadTasks();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * Search + filters
   */
  const filteredTasks = useMemo(() => {
    const query = search.trim().toLowerCase();

    return allTasks.filter((task) => {
      const matchesSearch =
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description
          ?.toLowerCase()
          .includes(query) ||
        task.assignee
          ?.toLowerCase()
          .includes(query) ||
        task.labels?.some((label) =>
          label.toLowerCase().includes(query),
        );

      const matchesStatus =
        filters.status === "all" ||
        task.status === filters.status;

      const matchesPriority =
        filters.priority === "all" ||
        task.priority === filters.priority;

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
  }, [
    allTasks,
    search,
    filters,
  ]);

  /*
   * Create task
   */
  const handleCreateTask = async (
    newTask: Task,
  ) => {
    try {
      setError("");

      const created = await createTask({
        title: newTask.title,
        description: newTask.description || "",
        status: newTask.status,
        priority: newTask.priority,
        assignee: newTask.assignee || "Admin",
        assigneeInitial:
          newTask.assigneeInitial ||
          (newTask.assignee || "A")
            .charAt(0)
            .toUpperCase(),
        dueDate: newTask.dueDate || "",
        labels: newTask.labels || [],
        projectId: newTask.projectId || null,
      });

      const normalized =
        normalizeTask(created);

      setAllTasks((current) => [
        normalized,
        ...current,
      ]);

      setShowAddTask(false);
    } catch (err) {
      console.error(
        "Failed to create task:",
        err,
      );

      setError(
        "Failed to create task. Please try again.",
      );
    }
  };

  return (
    <AppLayout title="Tasks">
      <div className="space-y-5">
        {/* Heading */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Tasks
          </h1>

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
          onAddTask={() =>
            setShowAddTask(true)
          }
        />

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

            <p className="mt-4 text-sm text-gray-500">
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

            {/* Empty state */}
            {filteredTasks.length === 0 && (
              <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                <h3 className="text-base font-semibold text-gray-900">
                  No tasks found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {search ||
                  filters.status !== "all" ||
                  filters.priority !== "all" ||
                  filters.member !== "all"
                    ? "Try changing your search or filters."
                    : "There are no tasks in your workspace yet."}
                </p>
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
        onCreateTask={handleCreateTask}
      />
    </AppLayout>
  );
}