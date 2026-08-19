"use client";

import { FolderKanban } from "lucide-react";

import { Project } from "@/types/project";
import ProjectRow from "./ProjectRow";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({
  projects,
}: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
          <FolderKanban
            size={22}
            className="text-gray-400"
          />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-gray-900">
          No projects found
        </h3>

        <p className="mt-1 text-sm text-gray-400">
          Try changing your search.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-200 bg-gray-50 px-5 py-3 text-xs font-medium text-gray-500">
        <div className="min-w-0 flex-1">
          Project
        </div>

        <div className="hidden w-28 shrink-0 sm:block">
          Status
        </div>

        <div className="hidden w-32 shrink-0 md:block">
          Members
        </div>

        <div className="hidden w-32 shrink-0 lg:block">
          Progress
        </div>

        <div className="hidden w-24 shrink-0 xl:block">
          Due Date
        </div>

        <div className="w-8 shrink-0" />
        <div className="w-8 shrink-0" />
      </div>

      {/* Projects */}
      {projects.map((project) => (
        <ProjectRow
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
}