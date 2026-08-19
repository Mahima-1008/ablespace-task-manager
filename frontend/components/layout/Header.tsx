"use client";

import { Bell, Search, Plus } from "lucide-react";

interface HeaderProps {
  title: string;
  onAdd?: () => void;
}

export default function Header({ title, onAdd }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="hidden h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 sm:flex"
          aria-label="Search"
        >
          <Search size={18} />
        </button>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            className="flex items-center gap-2 rounded-lg bg-black px-3.5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Plus size={16} />
            Add
          </button>
        )}
      </div>
    </header>
  );
}