"use client";

import ProjectRow from "./ProjectRow";
import { Project } from "@/types/project";

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({
  projects,
}: ProjectListProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="hidden grid-cols-[minmax(0,2fr)_140px_160px_120px] border-b border-gray-200 bg-gray-50 px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-400 md:grid">
        <div>Project</div>
        <div>Status</div>
        <div>Progress</div>
        <div>Due Date</div>
      </div>

      {/* Projects */}
      <div>
        {projects.map((project) => {
          const projectId =
            project._id || project.id;

          if (!projectId) {
            return null;
          }

          return (
            <ProjectRow
              key={projectId}
              project={project}
            />
          );
        })}
      </div>
    </div>
  );
}