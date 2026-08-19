"use client";

import { Check, Circle, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface SubtasksProps {
  initialSubtasks?: Subtask[];
}

export default function Subtasks({
  initialSubtasks = [],
}: SubtasksProps) {
  const [subtasks, setSubtasks] =
    useState<Subtask[]>(initialSubtasks);

  const [newSubtask, setNewSubtask] = useState("");

  const addSubtask = () => {
    const title = newSubtask.trim();

    if (!title) {
      return;
    }

    const subtask: Subtask = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    setSubtasks((current) => [...current, subtask]);
    setNewSubtask("");
  };

  const toggleSubtask = (id: string) => {
    setSubtasks((current) =>
      current.map((subtask) =>
        subtask.id === id
          ? {
              ...subtask,
              completed: !subtask.completed,
            }
          : subtask
      )
    );
  };

  const deleteSubtask = (id: string) => {
    setSubtasks((current) =>
      current.filter((subtask) => subtask.id !== id)
    );
  };

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Subtasks
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            Break this task into smaller steps.
          </p>
        </div>

        {subtasks.length > 0 && (
          <span className="text-xs text-gray-400">
            {subtasks.filter((item) => item.completed).length}/
            {subtasks.length} completed
          </span>
        )}
      </div>

      {/* Subtask list */}
      <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
        {subtasks.length > 0 ? (
          <div>
            {subtasks.map((subtask) => (
              <div
                key={subtask.id}
                className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() => toggleSubtask(subtask.id)}
                  className="shrink-0 text-gray-400 transition hover:text-gray-900"
                  aria-label={
                    subtask.completed
                      ? "Mark subtask incomplete"
                      : "Mark subtask complete"
                  }
                >
                  {subtask.completed ? (
                    <Check
                      size={18}
                      className="text-green-600"
                    />
                  ) : (
                    <Circle size={18} />
                  )}
                </button>

                <span
                  className={`min-w-0 flex-1 text-sm ${
                    subtask.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-700"
                  }`}
                >
                  {subtask.title}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    deleteSubtask(subtask.id)
                  }
                  className="rounded-md p-1.5 text-gray-300 transition hover:bg-red-50 hover:text-red-500"
                  aria-label="Delete subtask"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-4 py-5 text-center">
            <p className="text-sm text-gray-400">
              No subtasks yet.
            </p>
          </div>
        )}

        {/* Add subtask */}
        <div className="flex items-center gap-2 border-t border-gray-200 bg-gray-50 p-3">
          <Plus size={16} className="shrink-0 text-gray-400" />

          <input
            type="text"
            value={newSubtask}
            onChange={(event) =>
              setNewSubtask(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addSubtask();
              }
            }}
            placeholder="Add a subtask..."
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />

          <button
            type="button"
            onClick={addSubtask}
            disabled={!newSubtask.trim()}
            className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add
          </button>
        </div>
      </div>
    </section>
  );
}