"use client";

import { Plus, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import AddProjectModal from "@/components/projects/AddProjectModal";
import ProjectList from "@/components/projects/ProjectList";
import { projects as initialProjects } from "@/lib/constants";
import { Project } from "@/types/project";

export default function ProjectsPage() {
  const [allProjects, setAllProjects] =
    useState<Project[]>(initialProjects);

  const [search, setSearch] = useState("");

  const [showAddProject, setShowAddProject] =
    useState(false);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return allProjects;
    }

    return allProjects.filter((project) => {
      return (
        project.name.toLowerCase().includes(query) ||
        project.description
          .toLowerCase()
          .includes(query)
      );
    });
  }, [allProjects, search]);

  const handleCreateProject = (
    newProject: Project
  ) => {
    setAllProjects((currentProjects) => [
      newProject,
      ...currentProjects,
    ]);
  };

  return (
    <>
      <AppLayout title="Projects">
        <div className="space-y-6">
          {/* Heading */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Projects
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage and track all your projects.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddProject(true)}
              className="flex h-10 items-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              <Plus size={17} />
              Add Project
            </button>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search projects..."
              className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-100"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Project list */}
          <ProjectList projects={filteredProjects} />
        </div>
      </AppLayout>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={showAddProject}
        onClose={() => setShowAddProject(false)}
        onCreateProject={handleCreateProject}
      />
    </>
  );
}