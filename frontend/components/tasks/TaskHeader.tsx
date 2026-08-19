"use client";

import {
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  Table2,
  LayoutGrid,
  X,
} from "lucide-react";
import { useState } from "react";

interface TaskHeaderProps {
  view: "board" | "list";
  onViewChange: (view: "board" | "list") => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export default function TaskHeader({
  view,
  onViewChange,
  search,
  onSearchChange,
}: TaskHeaderProps) {
  const [showFields, setShowFields] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="relative flex flex-wrap items-center justify-between gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[220px] max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* View toggle */}
        <div className="flex h-10 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <button
            type="button"
            onClick={() => onViewChange("list")}
            className={`flex items-center gap-2 px-3 text-sm transition ${
              view === "list"
                ? "bg-gray-100 font-medium text-gray-900"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <Table2 size={16} />
            List
          </button>

          <button
            type="button"
            onClick={() => onViewChange("board")}
            className={`flex items-center gap-2 px-3 text-sm transition ${
              view === "board"
                ? "bg-gray-100 font-medium text-gray-900"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <LayoutGrid size={16} />
            Board
          </button>
        </div>

        {/* Fields */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowFields(!showFields);
              setShowFilters(false);
            }}
            className="flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            <SlidersHorizontal size={16} />
            Fields
          </button>

          {showFields && (
            <FieldsDropdown />
          )}
        </div>

        {/* Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowFilters(!showFilters);
              setShowFields(false);
            }}
            className="flex h-10 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-gray-700 transition hover:bg-gray-50"
            aria-label="Filter tasks"
          >
            <Filter size={16} />
          </button>

          {showFilters && (
            <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
              <h3 className="text-sm font-semibold text-gray-900">
                Filters
              </h3>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                Task filters will be added here.
              </p>
            </div>
          )}
        </div>

        {/* Add Task */}
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={17} />
          Add Task
        </button>
      </div>
    </div>
  );
}

function FieldsDropdown() {
  const fields = [
    { name: "Priority", enabled: true },
    { name: "Members", enabled: true },
    { name: "Due Date", enabled: true },
    { name: "Labels", enabled: false },
    { name: "Status", enabled: false },
    { name: "Reporter", enabled: false },
  ];

  return (
    <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
      {/* View options */}
      <div className="mb-2 grid grid-cols-2 overflow-hidden rounded-lg border border-gray-200">
        <button
          type="button"
          className="flex items-center justify-center gap-2 border-r border-gray-200 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900"
        >
          <Table2 size={15} />
          List
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          <LayoutGrid size={15} />
          Board
        </button>
      </div>

      {/* Fields */}
      <div className="space-y-1">
        {fields.map((field) => (
          <label
            key={field.name}
            className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <span>{field.name}</span>

            <input
              type="checkbox"
              defaultChecked={field.enabled}
              className="h-4 w-4 accent-black"
            />
          </label>
        ))}
      </div>
    </div>
  );
}