"use client";

import { Plus, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import AppLayout from "@/components/layout/AppLayout";
import AddProjectModal from "@/components/projects/AddProjectModal";
import ProjectList from "@/components/projects/ProjectList";

import {
  createProject,
  getProjects,
} from "@/lib/api";

import { Project } from "@/types/project";

function normalizeProject(
  project: {
    _id?: string;
    id?: string;
    name: string;
    description?: string;
    status: "active" | "completed" | "on-hold";
    members?: string[];
    taskCount?: number;
    completedTasks?: number;
    dueDate?: string;
  },
): Project {
  return {
    id:
      project.id ??
      project._id ??
      crypto.randomUUID(),

    name: project.name,

    description:
      project.description ?? "",

    status: project.status,

    members:
      project.members ?? [],

    taskCount:
      project.taskCount ?? 0,

    completedTasks:
      project.completedTasks ?? 0,

    dueDate:
      project.dueDate ?? "",
  };
}

export default function ProjectsPage() {
  const [allProjects, setAllProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [showAddProject, setShowAddProject] =
    useState(false);

  /* =========================
     LOAD PROJECTS
  ========================= */

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        setError("");

        const data = await getProjects();

        setAllProjects(
          data.map(normalizeProject),
        );
      } catch (err) {
        console.error(
          "Failed to load projects:",
          err,
        );

        setError(
          "Unable to load projects. Make sure the backend is running on port 5001.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  /* =========================
     SEARCH
  ========================= */

  const filteredProjects = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return allProjects;
    }

    return allProjects.filter(
      (project) => {
        return (
          project.name
            .toLowerCase()
            .includes(query) ||
          project.description
            .toLowerCase()
            .includes(query) ||
          project.members.some(
            (member) =>
              member
                .toLowerCase()
                .includes(query),
          )
        );
      },
    );
  }, [allProjects, search]);

  /* =========================
     CREATE PROJECT
  ========================= */

  const handleCreateProject = async (
    newProject: Project,
  ) => {
    try {
      setError("");

      const createdProject =
        await createProject(
          newProject,
        );

      const normalizedProject =
        normalizeProject(
          createdProject,
        );

      setAllProjects(
        (currentProjects) => [
          normalizedProject,
          ...currentProjects,
        ],
      );

      setShowAddProject(false);
    } catch (err) {
      console.error(
        "Failed to create project:",
        err,
      );

      setError(
        "Unable to create project. Please try again.",
      );
    }
  };

  return (
    <AppLayout title="Projects">
      <div className="mx-auto w-full max-w-[1600px] space-y-6">
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
            onClick={() =>
              setShowAddProject(true)
            }
            className="flex h-10 items-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Plus size={17} />
            Add Project
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

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

        {/* Loading */}
        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

            <p className="mt-3 text-sm text-gray-500">
              Loading projects...
            </p>
          </div>
        ) : (
          <>
            {/* Project list */}
            {filteredProjects.length > 0 ? (
              <ProjectList
                projects={filteredProjects}
              />
            ) : (
              <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
                <h3 className="text-base font-semibold text-gray-900">
                  No projects found
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {search
                    ? "Try changing your search."
                    : "Create your first project to get started."}
                </p>

                {!search && (
                  <button
                    type="button"
                    onClick={() =>
                      setShowAddProject(true)
                    }
                    className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                  >
                    Add Project
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={showAddProject}
        onClose={() =>
          setShowAddProject(false)
        }
        onCreateProject={
          handleCreateProject
        }
      />
    </AppLayout>
  );
}