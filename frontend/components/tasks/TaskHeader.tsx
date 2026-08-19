"use client";

import {
  Filter,
  LayoutGrid,
  Plus,
  Search,
  SlidersHorizontal,
  Table2,
  X,
} from "lucide-react";
import { useState } from "react";

interface VisibleFields {
  priority: boolean;
  members: boolean;
  dueDate: boolean;
  labels: boolean;
  status: boolean;
  reporter: boolean;
}

interface TaskHeaderProps {
  view: "board" | "list";
  onViewChange: (view: "board" | "list") => void;
  search: string;
  onSearchChange: (value: string) => void;
  visibleFields: VisibleFields;
  onFieldsChange: (fields: VisibleFields) => void;
}

export default function TaskHeader({
  view,
  onViewChange,
  search,
  onSearchChange,
  visibleFields,
  onFieldsChange,
}: TaskHeaderProps) {
  const [showFields, setShowFields] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleFieldsClick = () => {
    setShowFields((current) => !current);
    setShowFilters(false);
  };

  const handleFilterClick = () => {
    setShowFilters((current) => !current);
    setShowFields(false);
  };

  return (
    <div className="relative flex flex-wrap items-center justify-between gap-3">
      {/* Search */}
      <div className="relative min-w-[220px] max-w-md flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks..."
          className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-200"
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Right-side actions */}
      <div className="flex items-center gap-2">
        {/* Board / List toggle */}
        <div className="flex h-10 overflow-hidden rounded-lg border border-gray-200 bg-white">
          <button
            type="button"
            onClick={() => onViewChange("list")}
            className={`flex items-center gap-2 px-3 text-sm transition ${
              view === "list"
                ? "bg-gray-100 font-medium text-gray-900"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Table2 size={16} />
            <span>List</span>
          </button>

          <button
            type="button"
            onClick={() => onViewChange("board")}
            className={`flex items-center gap-2 px-3 text-sm transition ${
              view === "board"
                ? "bg-gray-100 font-medium text-gray-900"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <LayoutGrid size={16} />
            <span>Board</span>
          </button>
        </div>

        {/* Fields */}
        <div className="relative">
          <button
            type="button"
            onClick={handleFieldsClick}
            className={`flex h-10 items-center gap-2 rounded-lg border px-3 text-sm transition ${
              showFields
                ? "border-gray-300 bg-gray-100 text-gray-900"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            <SlidersHorizontal size={16} />
            <span>Fields</span>
          </button>

          {showFields && (
            <FieldsDropdown
              visibleFields={visibleFields}
              onFieldsChange={onFieldsChange}
            />
          )}
        </div>

        {/* Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={handleFilterClick}
            className={`flex h-10 items-center justify-center rounded-lg border px-3 transition ${
              showFilters
                ? "border-gray-300 bg-gray-100 text-gray-900"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
            aria-label="Filter tasks"
          >
            <Filter size={16} />
          </button>

          {showFilters && <FilterDropdown />}
        </div>

        {/* Add Task */}
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={17} />
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   FIELDS DROPDOWN
========================================================= */

function FieldsDropdown({
  visibleFields,
  onFieldsChange,
}: {
  visibleFields: VisibleFields;
  onFieldsChange: (fields: VisibleFields) => void;
}) {
  const fields: {
    key: keyof VisibleFields;
    name: string;
  }[] = [
    {
      key: "priority",
      name: "Priority",
    },
    {
      key: "members",
      name: "Members",
    },
    {
      key: "dueDate",
      name: "Due Date",
    },
    {
      key: "labels",
      name: "Labels",
    },
    {
      key: "status",
      name: "Status",
    },
    {
      key: "reporter",
      name: "Reporter",
    },
  ];

  const toggleField = (key: keyof VisibleFields) => {
    onFieldsChange({
      ...visibleFields,
      [key]: !visibleFields[key],
    });
  };

  return (
    <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
      {/* View switch inside Fields menu */}
      <div className="mb-2 grid grid-cols-2 overflow-hidden rounded-lg border border-gray-200">
        <button
          type="button"
          className={`flex items-center justify-center gap-2 px-3 py-2 text-sm transition ${
            true
              ? "bg-gray-100 font-medium text-gray-900"
              : "text-gray-600 hover:bg-gray-50"
          }`}
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

      {/* Field options */}
      <div className="space-y-1">
        {fields.map((field) => (
          <label
            key={field.key}
            className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            <span>{field.name}</span>

            <input
              type="checkbox"
              checked={visibleFields[field.key]}
              onChange={() => toggleField(field.key)}
              className="h-4 w-4 cursor-pointer accent-black"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   FILTER DROPDOWN
========================================================= */

function FilterDropdown() {
  const filters = [
    "Status",
    "Priority",
    "Members",
    "Due Date",
    "Teams",
    "Labels",
    "Reporter",
  ];

  return (
    <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition hover:bg-gray-50"
        >
          <span>{filter}</span>

          <span className="text-gray-400">›</span>
        </button>
      ))}
    </div>
  );
}