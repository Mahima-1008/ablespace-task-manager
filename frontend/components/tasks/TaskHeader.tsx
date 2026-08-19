"use client";

import {
  Check,
  ChevronRight,
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

export interface TaskFilters {
  status: string;
  priority: string;
  member: string;
}

interface TaskHeaderProps {
  view: "board" | "list";
  onViewChange: (view: "board" | "list") => void;

  search: string;
  onSearchChange: (value: string) => void;

  visibleFields: VisibleFields;
  onFieldsChange: (fields: VisibleFields) => void;

  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
}

export default function TaskHeader({
  view,
  onViewChange,
  search,
  onSearchChange,
  visibleFields,
  onFieldsChange,
  filters,
  onFiltersChange,
}: TaskHeaderProps) {
  const [showFields, setShowFields] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.member !== "all";

  const handleFieldsClick = () => {
    setShowFields((current) => !current);
    setShowFilters(false);
  };

  const handleFilterClick = () => {
    setShowFilters((current) => !current);
    setShowFields(false);
  };

  const clearFilters = () => {
    onFiltersChange({
      status: "all",
      priority: "all",
      member: "all",
    });
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

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Board / List */}
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

        {/* Filters */}
        <div className="relative">
          <button
            type="button"
            onClick={handleFilterClick}
            className={`relative flex h-10 items-center justify-center gap-2 rounded-lg border px-3 transition ${
              showFilters || hasActiveFilters
                ? "border-gray-300 bg-gray-100 text-gray-900"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
            aria-label="Filter tasks"
          >
            <Filter size={16} />
            <span className="hidden sm:inline">Filter</span>

            {hasActiveFilters && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1 text-[10px] font-semibold text-white">
                {
                  [
                    filters.status !== "all",
                    filters.priority !== "all",
                    filters.member !== "all",
                  ].filter(Boolean).length
                }
              </span>
            )}
          </button>

          {showFilters && (
            <FilterDropdown
              filters={filters}
              onFiltersChange={onFiltersChange}
              onClear={clearFilters}
            />
          )}
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
      <div className="mb-2 grid grid-cols-2 overflow-hidden rounded-lg border border-gray-200">
        <button
          type="button"
          className={`flex items-center justify-center gap-2 px-3 py-2 text-sm ${
            visibleFields.priority ||
            visibleFields.members ||
            visibleFields.dueDate
              ? "bg-gray-100 font-medium text-gray-900"
              : "text-gray-600"
          }`}
        >
          <Table2 size={15} />
          List
        </button>

        <button
          type="button"
          onClick={() => {}}
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          <LayoutGrid size={15} />
          Board
        </button>
      </div>

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

function FilterDropdown({
  filters,
  onFiltersChange,
  onClear,
}: {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  onClear: () => void;
}) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const statuses = [
    { value: "all", label: "All Statuses" },
    { value: "todo", label: "To Do" },
    { value: "doing", label: "Doing" },
    { value: "completed", label: "Completed" },
    { value: "on-hold", label: "On Hold" },
  ];

  const priorities = [
    { value: "all", label: "All Priorities" },
    { value: "urgent", label: "Urgent" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
    { value: "none", label: "No Priority" },
  ];

  const members = [
    { value: "all", label: "All Members" },
    { value: "Admin", label: "Admin" },
    { value: "QA Team", label: "QA Team" },
    { value: "Designer", label: "Designer" },
    { value: "Security", label: "Security" },
    { value: "Dev Team", label: "Dev Team" },
  ];

  return (
    <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-2 py-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Filters
          </h3>

          <p className="mt-0.5 text-[11px] text-gray-400">
            Narrow down your tasks
          </p>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="text-xs font-medium text-gray-500 hover:text-gray-900"
        >
          Clear
        </button>
      </div>

      {/* Status */}
      <FilterSection
        title="Status"
        value={
          filters.status === "all"
            ? "Any"
            : statuses.find((item) => item.value === filters.status)
                ?.label ?? "Any"
        }
        isOpen={openSection === "status"}
        onClick={() =>
          setOpenSection(
            openSection === "status" ? null : "status"
          )
        }
      />

      {openSection === "status" && (
        <OptionList
          options={statuses}
          selected={filters.status}
          onSelect={(value) => {
            onFiltersChange({
              ...filters,
              status: value,
            });

            setOpenSection(null);
          }}
        />
      )}

      {/* Priority */}
      <FilterSection
        title="Priority"
        value={
          filters.priority === "all"
            ? "Any"
            : priorities.find(
                (item) => item.value === filters.priority
              )?.label ?? "Any"
        }
        isOpen={openSection === "priority"}
        onClick={() =>
          setOpenSection(
            openSection === "priority" ? null : "priority"
          )
        }
      />

      {openSection === "priority" && (
        <OptionList
          options={priorities}
          selected={filters.priority}
          onSelect={(value) => {
            onFiltersChange({
              ...filters,
              priority: value,
            });

            setOpenSection(null);
          }}
        />
      )}

      {/* Members */}
      <FilterSection
        title="Members"
        value={
          filters.member === "all"
            ? "Any"
            : filters.member
        }
        isOpen={openSection === "member"}
        onClick={() =>
          setOpenSection(
            openSection === "member" ? null : "member"
          )
        }
      />

      {openSection === "member" && (
        <OptionList
          options={members}
          selected={filters.member}
          onSelect={(value) => {
            onFiltersChange({
              ...filters,
              member: value,
            });

            setOpenSection(null);
          }}
        />
      )}

      {/* Remaining filters */}
      <div className="mt-1 border-t border-gray-100 pt-1">
        {["Due Date", "Teams", "Labels", "Reporter"].map(
          (item) => (
            <button
              key={item}
              type="button"
              className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-sm text-gray-500 hover:bg-gray-50"
            >
              <span>{item}</span>
              <ChevronRight size={15} />
            </button>
          )
        )}
      </div>
    </div>
  );
}

/* =========================================================
   FILTER SECTION
========================================================= */

function FilterSection({
  title,
  value,
  isOpen,
  onClick,
}: {
  title: string;
  value: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-lg px-2 py-2.5 text-sm transition hover:bg-gray-50"
    >
      <div className="flex flex-col items-start">
        <span className="font-medium text-gray-800">
          {title}
        </span>

        <span className="text-[11px] text-gray-400">
          {value}
        </span>
      </div>

      <ChevronRight
        size={15}
        className={`text-gray-400 transition-transform ${
          isOpen ? "rotate-90" : ""
        }`}
      />
    </button>
  );
}

/* =========================================================
   OPTION LIST
========================================================= */

function OptionList({
  options,
  selected,
  onSelect,
}: {
  options: {
    value: string;
    label: string;
  }[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="mb-1 rounded-lg bg-gray-50 p-1">
      {options.map((option) => {
        const isSelected = selected === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            className="flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-xs text-gray-700 hover:bg-white"
          >
            <span>{option.label}</span>

            {isSelected && (
              <Check size={14} className="text-gray-900" />
            )}
          </button>
        );
      })}
    </div>
  );
}