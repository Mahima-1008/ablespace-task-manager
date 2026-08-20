"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CheckSquare,
  FolderKanban,
  ListTodo,
  Plus,
  Settings,
  User,
} from "lucide-react";

const stats = [
  {
    label: "Total Tasks",
    value: "15",
    description: "Tasks in your workspace",
    icon: ListTodo,
  },
  {
    label: "Projects",
    value: "5",
    description: "Active workspace projects",
    icon: FolderKanban,
  },
  {
    label: "Completed",
    value: "6",
    description: "Tasks completed",
    icon: CheckCircle2,
  },
];

const quickLinks = [
  {
    title: "Tasks",
    description:
      "Manage, filter and track all workspace tasks.",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    title: "Projects",
    description:
      "View projects, progress and team members.",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Profile",
    description:
      "Manage your personal workspace information.",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    description:
      "Manage application preferences.",
    href: "/settings",
    icon: Settings,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top navigation */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-sm font-semibold text-white">
              D
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                AbleSpace
              </p>

              <p className="text-[11px] text-gray-400">
                Task Manager
              </p>
            </div>
          </Link>

          <Link
            href="/tasks"
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <CheckSquare size={16} />
            Open Tasks
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero */}
        <section className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-12">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              Workspace Dashboard
            </span>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-gray-900 md:text-5xl">
              Manage your work.
              <br />
              <span className="text-gray-400">
                Stay in control.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-500">
              Welcome to AbleSpace, a simple workspace
              for managing tasks, projects and team
              progress in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tasks"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                View Tasks
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                View Projects
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Icon
                      size={19}
                      className="text-gray-700"
                    />
                  </div>

                  <span className="text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </span>
                </div>

                <h2 className="mt-5 text-sm font-semibold text-gray-900">
                  {stat.label}
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* Quick Access */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-gray-900">
              Quick access
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Jump directly to the workspace area you
              need.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {quickLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group rounded-xl border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <Icon
                        size={19}
                        className="text-gray-700"
                      />
                    </div>

                    <ArrowRight
                      size={17}
                      className="text-gray-300 transition group-hover:translate-x-1 group-hover:text-gray-700"
                    />
                  </div>

                  <h3 className="mt-5 text-sm font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10 rounded-xl border border-gray-200 bg-gray-900 p-7 text-white">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-semibold">
                Ready to manage your tasks?
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Create, organize and track your work
                from the Tasks dashboard.
              </p>
            </div>

            <Link
              href="/tasks"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-100"
            >
              <Plus size={16} />
              Go to Tasks
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}