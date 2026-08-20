"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CheckSquare,
  FolderKanban,
  Settings,
  User,
  ChevronDown,
  LogOut,
} from "lucide-react";

const navigationItems = [
  {
    label: "Tasks",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("ablespace_auth");
    localStorage.removeItem("ablespace_user");

    router.replace("/login");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Workspace */}
      <div className="shrink-0 border-b border-gray-100 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-sm font-semibold text-white">
            D
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900">
              Dexter
            </p>

            <button
              type="button"
              className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900"
            >
              Workspace
              <ChevronDown size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-[11px] font-medium uppercase tracking-wider text-gray-400">
          Workspace
        </p>

        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-gray-100 font-medium text-gray-900"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={17} strokeWidth={1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom navigation - stays at bottom */}
      <div className="shrink-0 border-t border-gray-100 bg-white p-3">
        <Link
          href="/profile"
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
            pathname === "/profile"
              ? "bg-gray-100 font-medium text-gray-900"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <User size={17} strokeWidth={1.8} />
          Profile
        </Link>

        <Link
          href="/settings"
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
            pathname === "/settings"
              ? "bg-gray-100 font-medium text-gray-900"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Settings size={17} strokeWidth={1.8} />
          Settings
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={17} strokeWidth={1.8} />
          Logout
        </button>
      </div>
    </aside>
  );
}